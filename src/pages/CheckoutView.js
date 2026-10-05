/**
 * ================================================================
 * DILO CHECKOUT — VISTA #/checkout
 * ----------------------------------------------------------------
 * Pasarela de pago propia, independiente de Wix. Flujo:
 *   1. Datos del cliente (+ CFDI opcional)  → crea intención de pago
 *   2. Método de pago (Stripe o simulado)    → confirma
 *   3. Redirige a #/checkout/exito           → Purchase + fulfillment
 *
 * El carrito es editable en vivo (complementos, esquema de pago y
 * cupón). Cualquier cambio después de preparar el pago invalida la
 * intención y se vuelve a preparar automáticamente con el monto nuevo.
 * ================================================================
 */

import { priceCart, formatMXN, getSuggestedAddons, PRODUCTS, normalizeCouponCode } from '../checkout/catalog.js';
import { checkoutApi } from '../checkout/api.js';
import {
  readDraft,
  updateDraft,
  rememberOrder,
  buildCheckoutHash,
  readSavedContact,
  saveContact,
  intentSignature,
  getCachedIntent,
  cacheIntent,
  updateCachedIntentSecret,
  forgetIntent
} from '../checkout/session.js';
import { trackPixel, setPixelUserData, getTrackingContext } from '../checkout/pixel.js';
import { esc, icons } from '../checkout/ui.js';
import { paymentLogos } from '../checkout/logos.js';
import { createSimulatedProvider } from '../checkout/providers/simulated.js';
import { saveLeadToCms } from '../utils/LeadCms.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RFC_RE = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/;
const SUPPORT_WA = '525592441070';

const REGIMENES = [
  ['601', 'General de Ley Personas Morales'],
  ['603', 'Personas Morales con Fines no Lucrativos'],
  ['605', 'Sueldos y Salarios'],
  ['606', 'Arrendamiento'],
  ['612', 'Personas Físicas con Actividades Empresariales y Profesionales'],
  ['616', 'Sin obligaciones fiscales'],
  ['621', 'Incorporación Fiscal'],
  ['625', 'Actividades Empresariales con ingresos a través de Plataformas Tecnológicas'],
  ['626', 'Régimen Simplificado de Confianza (RESICO)']
];

const USOS_CFDI = [
  ['G03', 'Gastos en general'],
  ['G01', 'Adquisición de mercancías'],
  ['I08', 'Otra maquinaria y equipo'],
  ['S01', 'Sin efectos fiscales'],
  ['CP01', 'Pagos']
];

const GUARANTEES = {
  impi: 'Abogados con cédula profesional. Si tu marca no es viable en el dictamen, te asesoramos sin costo para encontrar una alternativa registrable.',
  branding: 'Iteraciones ilimitadas sobre la línea gráfica elegida hasta la aprobación formal del manual de identidad.'
};

const TEST_CARDS = [
  ['4242 4242 4242 4242', 'Aprobada'],
  ['4000 0025 0000 3155', 'Pide 3D Secure'],
  ['4000 0000 0000 9995', 'Fondos insuficientes'],
  ['4000 0000 0000 0002', 'Rechazada']
];

const EMAIL_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'yahoo.com.mx',
  'hotmail.es',
  'outlook.es',
  'live.com.mx',
  'prodigy.net.mx'
];

// Estado de módulo para poder limpiar al salir de la ruta
let activeCleanup = null;

// ── Helpers puros ───────────────────────────────────────────────

/** Formatea un celular mexicano: "55 1234 5678" / "222 123 4567". */
export function formatPhoneMX(value) {
  let d = String(value || '').replace(/\D/g, '');
  if (d.length > 10 && d.startsWith('52')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  d = d.slice(0, 10);
  const parts = /^(55|56|33|81)/.test(d) ? [d.slice(0, 2), d.slice(2, 6), d.slice(6)] : [d.slice(0, 3), d.slice(3, 6), d.slice(6)];
  return parts.filter(Boolean).join(' ');
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

/** Sugiere corrección de dominios comunes mal escritos (gmial.com → gmail.com). */
export function suggestEmail(email) {
  const [user, domain] = String(email || '').toLowerCase().split('@');
  if (!user || !domain || EMAIL_DOMAINS.includes(domain)) return null;
  let best = null;
  let bestDist = 3;
  for (const cand of EMAIL_DOMAINS) {
    const dist = levenshtein(domain, cand);
    if (dist < bestDist) {
      best = cand;
      bestDist = dist;
    }
  }
  return best && bestDist > 0 && bestDist <= 2 ? `${user}@${best}` : null;
}

function hasAny(obj) {
  return Boolean(obj && Object.values(obj).some((v) => String(v || '').trim()));
}

function resolveRequest(params) {
  const draft = readDraft() || {};
  const urlItems = (params.get('items') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const items = urlItems.length ? urlItems : draft.items || [];
  const sameCart = Array.isArray(draft.items) && [...draft.items].sort().join(',') === [...items].sort().join(',');
  const plan = params.get('plan') || (sameCart ? draft.plan : null) || undefined;
  const coupon = normalizeCouponCode(params.get('coupon') || (sameCart ? draft.coupon : '') || '');
  const saved = readSavedContact() || {};
  const customer = hasAny(draft.customer) ? draft.customer : saved.customer || {};
  const billing = draft.billing?.rfc ? draft.billing : saved.billing || null;
  return {
    items,
    plan,
    coupon,
    meta: sameCart || !urlItems.length ? draft.meta || {} : {},
    returnPath: draft.returnPath,
    customer,
    billing
  };
}

function pixelParams(pricing) {
  return {
    value: Number((pricing.totalCents / 100).toFixed(2)),
    currency: 'MXN',
    content_ids: pricing.items,
    contents: pricing.items.map((id) => ({ id, quantity: 1 })),
    content_type: 'product',
    content_category: pricing.categoryLabel,
    num_items: pricing.items.length
  };
}

// ── Plantillas compartidas ──────────────────────────────────────

function renderHeader(returnPath) {
  return `
    <header class="dco-header">
      <div class="dco-header-inner">
        <a href="${esc(returnPath)}" class="dco-back" id="dco-back-link">${icons.arrowLeft(16)}<span>Volver</span></a>
        <a href="#/" class="dco-logo" aria-label="Dilo Digital — Inicio">
          <img src="/brand/dilo-logo-dark.png" alt="Dilo Digital" width="70" height="38">
        </a>
        <span class="dco-secure-pill">${icons.lock(14)}<span>Pago seguro</span></span>
      </div>
    </header>`;
}

export function renderCheckoutFooter() {
  return `
    <footer class="dco-footer">
      <span>© ${new Date().getFullYear()} Dilo Digital MX</span>
      <span class="dco-footer-dot">·</span>
      <span>${icons.lock(12)} Conexión cifrada TLS</span>
      <span class="dco-footer-dot">·</span>
      <a href="#/terminos" target="_blank" rel="noopener" id="dco-footer-terms">Términos</a>
      <span class="dco-footer-dot">·</span>
      <a href="#/aviso-de-privacidad" target="_blank" rel="noopener" id="dco-footer-privacy">Privacidad</a>
      <span class="dco-footer-dot">·</span>
      <a href="https://wa.me/${SUPPORT_WA}" target="_blank" rel="noopener">Ayuda por WhatsApp</a>
    </footer>`;
}

export { renderHeader as renderCheckoutHeader };

function renderTotals(pricing) {
  return `
    <div class="dco-total-row"><span>Subtotal</span><span>${formatMXN(pricing.subtotalCents)}</span></div>
    ${
      pricing.couponDiscountCents
        ? `<div class="dco-total-row is-discount" id="dco-coupon-row"><span>Cupón ${esc(pricing.couponCode)}</span><span>−${formatMXN(pricing.couponDiscountCents)}</span></div>`
        : ''
    }
    ${pricing.discountCents ? `<div class="dco-total-row is-discount"><span>Descuento pago de contado (5%)</span><span>−${formatMXN(pricing.discountCents)}</span></div>` : ''}
    <div class="dco-total-main">
      <span>${pricing.balanceCents ? 'Pagas hoy (50%)' : 'Total a pagar'}</span>
      <strong id="dco-total-amount">${formatMXN(pricing.totalCents)}</strong>
    </div>
    ${pricing.balanceCents ? `<div class="dco-balance-note">${icons.clock(14)} Saldo de ${formatMXN(pricing.balanceCents)} contra entrega del proyecto.</div>` : ''}
    <div class="dco-total-row is-muted"><span>Incluye IVA (16%)</span><span>${formatMXN(pricing.ivaCents)}</span></div>
    <div class="dco-total-row is-muted"><span>Moneda</span><span>MXN · Pesos mexicanos</span></div>`;
}

function renderEmptyState(message) {
  return `
    <main class="dco-page">
      ${renderHeader('#/')}
      <div class="dco-container dco-result-container">
        <div class="dco-result-card">
          <div class="dco-result-icon is-error">${icons.alert(30)}</div>
          <h1 class="dco-result-title">No pudimos cargar tu orden</h1>
          <p class="dco-result-text">${esc(message)}</p>
          <div class="dco-result-actions">
            <a href="#/registro-marca" class="dco-btn dco-btn-primary">Registro de marca</a>
            <a href="#/branding" class="dco-btn dco-btn-ghost">Branding</a>
          </div>
        </div>
      </div>
      ${renderCheckoutFooter()}
    </main>`;
}

// ── Render ──────────────────────────────────────────────────────

export function renderCheckoutView(params) {
  const req = resolveRequest(params);
  const pricing = priceCart({ items: req.items, plan: req.plan });
  if (!pricing.ok) return renderEmptyState(pricing.error);

  const c = req.customer || {};
  const b = req.billing || {};
  const returnPath = req.returnPath || pricing.returnPath;

  return `
    <main class="dco-page" id="dco-page" data-category="${esc(pricing.category)}">
      ${renderHeader(returnPath)}
      <div class="dco-test-banner" id="dco-test-banner" hidden></div>

      <div class="dco-container">
        <div class="dco-title-row">
          <h1 class="dco-title">Finaliza tu compra</h1>
          <p class="dco-subtitle">${esc(pricing.categoryLabel)} · Tus datos de pago están protegidos con cifrado bancario.</p>
        </div>

        <ol class="dco-steps" id="dco-steps" aria-label="Progreso del pago">
          <li class="is-active" data-step="1"><span class="dco-step-dot">1</span><span>Datos</span></li>
          <li data-step="2"><span class="dco-step-dot">2</span><span>Pago</span></li>
          <li data-step="3"><span class="dco-step-dot">3</span><span>Confirmación</span></li>
        </ol>

        <div class="dco-grid">
          <div class="dco-main">

            <!-- 1. DATOS -->
            <section class="dco-card" id="dco-contact-card">
              <div class="dco-card-head">
                <span class="dco-card-num">1</span>
                <div class="dco-card-head-text">
                  <h2>Tus datos</h2>
                  <p>Enviaremos tu comprobante y el seguimiento de tu orden aquí.</p>
                </div>
                <button type="button" class="dco-link-btn" id="dco-edit-contact" hidden>${icons.edit(14)} Editar</button>
              </div>

              <form id="dco-contact-form" novalidate>
                <div class="dco-field">
                  <label for="dco-name">Nombre completo</label>
                  <input id="dco-name" name="name" class="dco-input" autocomplete="name" placeholder="Ej. Ana Lucía Morales" value="${esc(c.name || '')}" maxlength="120" required>
                  <span class="dco-field-error" data-error-for="name"></span>
                </div>
                <div class="dco-row-2">
                  <div class="dco-field">
                    <label for="dco-email">Correo electrónico</label>
                    <input id="dco-email" name="email" type="email" class="dco-input" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" placeholder="tu@correo.com" value="${esc(c.email || '')}" maxlength="160" required>
                    <button type="button" class="dco-email-suggest" id="dco-email-suggest" hidden></button>
                    <span class="dco-field-error" data-error-for="email"></span>
                  </div>
                  <div class="dco-field">
                    <label for="dco-phone">WhatsApp</label>
                    <div class="dco-input-prefix">
                      <span>+52</span>
                      <input id="dco-phone" name="phone" type="tel" class="dco-input" autocomplete="tel-national" inputmode="tel" placeholder="55 1234 5678" value="${esc(formatPhoneMX(c.phone || ''))}" required>
                    </div>
                    <span class="dco-field-error" data-error-for="phone"></span>
                  </div>
                </div>

                <div id="dco-plans-slot"></div>

                <label class="dco-checkbox">
                  <input type="checkbox" id="dco-need-invoice" ${b.rfc ? 'checked' : ''}>
                  <span class="dco-checkbox-box">${icons.check(12)}</span>
                  <span>Necesito factura (CFDI 4.0)</span>
                </label>

                <div class="dco-invoice" id="dco-invoice-fields" ${b.rfc ? '' : 'hidden'}>
                  <div class="dco-row-2">
                    <div class="dco-field">
                      <label for="dco-rfc">RFC</label>
                      <input id="dco-rfc" class="dco-input dco-upper" maxlength="13" autocomplete="off" placeholder="XAXX010101000" value="${esc(b.rfc || '')}">
                      <span class="dco-field-error" data-error-for="rfc"></span>
                    </div>
                    <div class="dco-field">
                      <label for="dco-cp">C.P. fiscal</label>
                      <input id="dco-cp" class="dco-input" inputmode="numeric" maxlength="5" autocomplete="postal-code" placeholder="06600" value="${esc(b.cp || '')}">
                      <span class="dco-field-error" data-error-for="cp"></span>
                    </div>
                  </div>
                  <div class="dco-field">
                    <label for="dco-razon">Razón social (como aparece en tu constancia)</label>
                    <input id="dco-razon" class="dco-input dco-upper" placeholder="Nombre o razón social" maxlength="200" value="${esc(b.razonSocial || '')}">
                    <span class="dco-field-error" data-error-for="razonSocial"></span>
                  </div>
                  <div class="dco-row-2">
                    <div class="dco-field">
                      <label for="dco-regimen">Régimen fiscal</label>
                      <select id="dco-regimen" class="dco-input dco-select">
                        <option value="">Selecciona…</option>
                        ${REGIMENES.map(([v, l]) => `<option value="${v}" ${b.regimen === v ? 'selected' : ''}>${v} · ${l}</option>`).join('')}
                      </select>
                      <span class="dco-field-error" data-error-for="regimen"></span>
                    </div>
                    <div class="dco-field">
                      <label for="dco-uso">Uso del CFDI</label>
                      <select id="dco-uso" class="dco-input dco-select">
                        ${USOS_CFDI.map(([v, l]) => `<option value="${v}" ${(b.usoCfdi || 'G03') === v ? 'selected' : ''}>${v} · ${l}</option>`).join('')}
                      </select>
                      <span class="dco-field-error" data-error-for="usoCfdi"></span>
                    </div>
                  </div>
                </div>

                <div class="dco-form-error" id="dco-contact-error" role="alert"></div>
                <button type="submit" class="dco-btn dco-btn-primary dco-btn-block" id="dco-continue-btn">
                  <span>Continuar al pago</span>${icons.arrowRight(16)}
                </button>
                <p class="dco-form-note">${icons.lock(12)} Guardamos tus datos solo en este dispositivo para que no tengas que escribirlos de nuevo.</p>
              </form>

              <div class="dco-contact-summary" id="dco-contact-summary" hidden></div>
            </section>

            <!-- 2. PAGO -->
            <section class="dco-card is-locked" id="dco-payment-card" aria-disabled="true">
              <div class="dco-card-head">
                <span class="dco-card-num">2</span>
                <div class="dco-card-head-text">
                  <h2>Método de pago</h2>
                  <p>Todas las transacciones son seguras y cifradas.</p>
                </div>
              </div>
              <div class="dco-payment-body">
                <p class="dco-payment-placeholder" id="dco-payment-placeholder">${icons.lock(16)} Completa tus datos para elegir cómo pagar.</p>
                <div id="dco-payment-mount"></div>
                <div class="dco-form-error" id="dco-pay-error" role="alert"></div>
                <button type="button" class="dco-btn dco-btn-pay dco-btn-block" id="dco-pay-btn" hidden>
                  ${icons.lock(16)}<span id="dco-pay-label">Pagar ${formatMXN(pricing.totalCents)}</span>
                </button>
                <p class="dco-legal" id="dco-legal" hidden>
                  Al confirmar aceptas los <a href="#/terminos" target="_blank" rel="noopener" id="dco-legal-terms">Términos de servicio</a> y el
                  <a href="#/aviso-de-privacidad" target="_blank" rel="noopener" id="dco-legal-privacy">Aviso de privacidad</a>.
                  Los datos de tu tarjeta se procesan directamente por la pasarela certificada PCI DSS; Dilo Digital nunca los almacena.
                </p>
              </div>
            </section>
          </div>

          <!-- RESUMEN -->
          <aside class="dco-summary" id="dco-summary">
            <button type="button" class="dco-summary-toggle" id="dco-summary-toggle" aria-expanded="false" aria-controls="dco-summary-body">
              <span>${icons.receipt(16)} Ver resumen del pedido</span>
              <strong id="dco-summary-toggle-total">${formatMXN(pricing.totalCents)}</strong>
            </button>
            <div class="dco-summary-body" id="dco-summary-body">
              <div class="dco-summary-head">
                <span>${icons.receipt(18)} Resumen del pedido</span>
                <span class="dco-summary-badge">${esc(pricing.categoryLabel)}</span>
              </div>
              <div id="dco-summary-dynamic"></div>
              ${req.meta?.brandName ? `<div class="dco-summary-meta">Marca / proyecto: <strong>${esc(req.meta.brandName)}</strong></div>` : ''}
              <div class="dco-guarantee">${icons.shield(18)}<p>${esc(GUARANTEES[pricing.category] || '')}</p></div>
              <ul class="dco-trust">
                <li>${icons.lock(14)} Cifrado TLS 256-bit</li>
                <li>${icons.shield(14)} 3D Secure</li>
                <li>${icons.receipt(14)} Factura CFDI 4.0</li>
              </ul>
              <div class="dco-paylogos" aria-label="Métodos aceptados">${paymentLogos(undefined, { width: 40 })}</div>
            </div>
          </aside>
        </div>
      </div>

      ${renderCheckoutFooter()}

      <div class="dco-mobilebar" id="dco-mobilebar" hidden>
        <div class="dco-mobilebar-total">
          <small id="dco-mobilebar-label">Total a pagar</small>
          <strong id="dco-mobilebar-amount">${formatMXN(pricing.totalCents)}</strong>
        </div>
        <button type="button" class="dco-btn dco-btn-pay" id="dco-mobilebar-btn">${icons.lock(15)}<span>Continuar</span></button>
      </div>

      <div class="dco-toast" id="dco-toast" role="status" aria-live="polite" hidden></div>

      <div class="dco-processing" id="dco-processing" hidden>
        <div class="dco-processing-card">
          <span class="dco-spinner"></span>
          <strong>Procesando tu pago de forma segura…</strong>
          <small>No cierres ni recargues esta página.</small>
        </div>
      </div>
    </main>`;
}

// ── Lógica ──────────────────────────────────────────────────────

/** Llamar al salir de la ruta: quita listeners globales y observadores. */
export function cleanupCheckout() {
  if (activeCleanup) activeCleanup();
  activeCleanup = null;
}

export function initCheckoutEvents(params) {
  cleanupCheckout();
  const page = document.getElementById('dco-page');
  if (!page) return; // estado vacío

  document.title = 'Pago seguro · Dilo Digital';

  const req = resolveRequest(params);
  const initial = priceCart({ items: req.items, plan: req.plan });
  if (!initial.ok) return;

  const state = {
    items: initial.items,
    plan: initial.plan,
    pricing: initial,
    coupon: null, // { code, label, discountCents, itemsKey }
    couponOpen: false,
    couponError: '',
    couponBusy: false,
    pendingCoupon: req.coupon,
    config: null,
    provider: null,
    intent: null,
    customer: null,
    billing: null,
    stage: 'contact',
    busy: false,
    paying: false,
    notices: initial.notices || [],
    trackedPaymentInfo: new Set()
  };
  const $ = (id) => document.getElementById(id);
  const disposers = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    disposers.push(() => target.removeEventListener(type, fn, opts));
  };

  const form = $('dco-contact-form');
  const contactCard = $('dco-contact-card');
  const contactSummary = $('dco-contact-summary');
  const editBtn = $('dco-edit-contact');
  const continueBtn = $('dco-continue-btn');
  const contactError = $('dco-contact-error');
  const paymentCard = $('dco-payment-card');
  const placeholder = $('dco-payment-placeholder');
  const mount = $('dco-payment-mount');
  const payBtn = $('dco-pay-btn');
  const payError = $('dco-pay-error');
  const legal = $('dco-legal');
  const processing = $('dco-processing');
  const invoiceToggle = $('dco-need-invoice');
  const invoiceFields = $('dco-invoice-fields');
  const summary = $('dco-summary');
  const summaryDynamic = $('dco-summary-dynamic');
  const plansSlot = $('dco-plans-slot');
  const mobileBar = $('dco-mobilebar');
  const mobileBtn = $('dco-mobilebar-btn');
  const toast = $('dco-toast');

  const itemsKey = () => [...state.items].sort().join(',');

  // ── Precios ───────────────────────────────────────────────────

  /** Precio local; si hay cupón validado para este carrito, se aplica tal cual lo calculó el servidor. */
  function localPrice(items = state.items, plan = state.plan) {
    const key = [...items].sort().join(',');
    const cp = state.coupon && state.coupon.itemsKey === key ? state.coupon : null;
    return priceCart({
      items,
      plan,
      coupon: cp?.code,
      coupons: cp ? { [cp.code]: { amount: cp.discountCents / 100, label: cp.label } } : undefined
    });
  }

  let quoteSeq = 0;
  /**
   * Recalcula precios. Si hay cupón y cambió el carrito, lo revalida en
   * el servidor (los porcentajes dependen del subtotal).
   */
  async function reprice({ couponCode = state.coupon?.code || '', reason = '' } = {}) {
    const seq = ++quoteSeq;
    const needsQuote = Boolean(couponCode) && (!state.coupon || state.coupon.code !== couponCode || state.coupon.itemsKey !== itemsKey());
    if (needsQuote) {
      state.couponBusy = true;
      renderSummary();
      try {
        const { pricing } = await checkoutApi.quote({ items: state.items, plan: state.plan, coupon: couponCode });
        if (seq !== quoteSeq) return false;
        state.coupon = { code: pricing.couponCode, label: pricing.couponLabel, discountCents: pricing.couponDiscountCents, itemsKey: itemsKey() };
        state.couponError = '';
      } catch (err) {
        if (seq !== quoteSeq) return false;
        const wasApplied = Boolean(state.coupon);
        state.coupon = null;
        state.couponError =
          err.code === 'invalid_coupon'
            ? wasApplied && reason === 'cart'
              ? `El cupón ${couponCode} ya no aplica a este carrito: ${err.message}`
              : err.message
            : 'No pudimos validar el cupón. Revisa tu conexión e intenta de nuevo.';
        state.couponOpen = true;
      } finally {
        if (seq === quoteSeq) state.couponBusy = false;
      }
    } else if (!couponCode) {
      state.coupon = null;
    }
    const next = localPrice();
    if (!next.ok) return false;
    state.pricing = next;
    state.items = next.items;
    state.plan = next.plan;
    renderPricing();
    persistCart();
    return true;
  }

  function persistCart() {
    updateDraft({ items: state.items, plan: state.plan, coupon: state.coupon?.code || '' });
    history.replaceState(
      null,
      '',
      `${location.pathname}${location.search}${buildCheckoutHash({ items: state.items, plan: state.plan, coupon: state.coupon?.code || '' })}`
    );
  }

  // ── Render dinámico ───────────────────────────────────────────

  function renderPlans() {
    const p = state.pricing;
    if (p.availablePlans.length < 2) {
      plansSlot.innerHTML = '';
      return;
    }
    plansSlot.innerHTML = `
      <fieldset class="dco-plans" id="dco-plans">
        <legend>Esquema de pago</legend>
        ${p.availablePlans
          .map((plan) => {
            const alt = localPrice(state.items, plan.id);
            const selected = plan.id === p.plan;
            return `
            <label class="dco-plan ${selected ? 'is-selected' : ''}">
              <input type="radio" name="plan" value="${plan.id}" ${selected ? 'checked' : ''}>
              <span class="dco-plan-radio"></span>
              <span class="dco-plan-text"><strong>${esc(plan.label)}</strong><small>Pagas hoy ${formatMXN(alt.totalCents)}${alt.balanceCents ? ` · saldo ${formatMXN(alt.balanceCents)} al entregar` : ''}</small></span>
              ${plan.id === 'full-5off' ? `<span class="dco-plan-badge">Ahorras ${formatMXN(alt.discountCents)}</span>` : ''}
            </label>`;
          })
          .join('')}
      </fieldset>`;
  }

  function renderCoupon() {
    if (!state.config?.couponsEnabled) return '';
    if (state.coupon) {
      return `
        <div class="dco-coupon is-applied" id="dco-coupon">
          <span class="dco-coupon-chip">${icons.receipt(13)} ${esc(state.coupon.code)}</span>
          <span class="dco-coupon-label">${esc(state.coupon.label)}</span>
          <button type="button" class="dco-coupon-remove" id="dco-coupon-remove" aria-label="Quitar cupón">Quitar</button>
        </div>`;
    }
    return `
      <div class="dco-coupon" id="dco-coupon">
        <button type="button" class="dco-coupon-toggle" id="dco-coupon-toggle" aria-expanded="${state.couponOpen}" ${state.couponOpen ? 'hidden' : ''}>¿Tienes un código de descuento?</button>
        <form class="dco-coupon-form" id="dco-coupon-form" ${state.couponOpen ? '' : 'hidden'} novalidate>
          <input id="dco-coupon-input" class="dco-coupon-input" placeholder="Código de descuento" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" aria-label="Código de descuento">
          <button type="submit" class="dco-coupon-apply" id="dco-coupon-apply" ${state.couponBusy ? 'disabled' : ''}>${state.couponBusy ? '<span class="dco-spinner is-small"></span>' : 'Aplicar'}</button>
        </form>
        <p class="dco-coupon-error" id="dco-coupon-error" role="alert">${esc(state.couponError)}</p>
      </div>`;
  }

  function renderUpsell() {
    const suggestions = getSuggestedAddons(state.pricing.baseSku).filter((sku) => !state.items.includes(sku));
    if (!suggestions.length) return '';
    return `
      <div class="dco-upsell" id="dco-upsell">
        <div class="dco-upsell-head">${icons.shield(14)} Complementos recomendados</div>
        <ul class="dco-upsell-list">
          ${suggestions
            .map((sku) => {
              const p = PRODUCTS[sku];
              return `
              <li class="dco-upsell-item">
                <div class="dco-upsell-text">
                  <strong>${esc(p.name)}</strong>
                  <small>${esc(p.pitch || p.description)}</small>
                </div>
                <button type="button" class="dco-upsell-add" data-add="${esc(sku)}" id="dco-add-${esc(sku)}" aria-label="Agregar ${esc(p.name)}">
                  <span class="dco-upsell-plus">${icons.plus(10)}</span>${formatMXN(Math.round(p.price * 100))}
                </button>
              </li>`;
            })
            .join('')}
        </ul>
      </div>`;
  }

  function renderSummary() {
    const p = state.pricing;
    // Conserva lo que el usuario estaba escribiendo en el cupón
    const typed = $('dco-coupon-input')?.value || '';
    const hadFocus = document.activeElement?.id === 'dco-coupon-input';
    summaryDynamic.innerHTML = `
      <ul class="dco-lines" id="dco-lines">
        ${p.lines
          .map(
            (l) => `
          <li class="dco-line ${l.kind === 'addon' ? 'is-addon' : ''}" data-sku="${esc(l.sku)}">
            <div class="dco-line-text">
              <strong>${l.kind === 'addon' ? '+ ' : ''}${esc(l.name)}</strong>
              <small>${esc(l.description)}</small>
              ${l.kind === 'addon' ? `<button type="button" class="dco-line-remove" data-remove="${esc(l.sku)}" id="dco-remove-${esc(l.sku)}" aria-label="Quitar ${esc(l.name)}">Quitar</button>` : ''}
            </div>
            <span class="dco-line-price">${formatMXN(l.amountCents)}</span>
          </li>`
          )
          .join('')}
      </ul>
      ${state.notices.length ? `<div class="dco-notice" id="dco-notice">${icons.alert(14)}<div>${state.notices.map((n) => `<p>${esc(n)}</p>`).join('')}</div></div>` : ''}
      ${renderUpsell()}
      ${renderCoupon()}
      <div class="dco-totals" id="dco-totals">${renderTotals(p)}</div>`;
    const input = $('dco-coupon-input');
    if (input) {
      input.value = typed;
      if (hadFocus) input.focus();
    }
    summary.classList.toggle('is-busy', state.busy || state.paying);
  }

  function renderPricing() {
    renderSummary();
    renderPlans();
    const total = formatMXN(state.pricing.totalCents);
    $('dco-summary-toggle-total').textContent = total;
    $('dco-mobilebar-amount').textContent = total;
    $('dco-mobilebar-label').textContent = state.pricing.balanceCents ? 'Pagas hoy (50%)' : 'Total a pagar';
    updatePayLabel();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => (toast.hidden = true), 300);
    }, 3200);
  }

  // ── Configuración del servidor ────────────────────────────────

  const configPromise = checkoutApi
    .config()
    .then((cfg) => {
      state.config = cfg;
      renderTestBanner(cfg);
      if (cfg.couponsEnabled && state.pendingCoupon) {
        const code = state.pendingCoupon;
        state.pendingCoupon = '';
        reprice({ couponCode: code });
      } else {
        renderSummary();
      }
      return cfg;
    })
    .catch(() => null);

  function renderTestBanner(cfg) {
    const banner = $('dco-test-banner');
    if (!banner || !cfg || cfg.mode === 'stripe-live' || !cfg.available) return;
    const label = cfg.mode === 'simulated' ? 'Pasarela simulada' : 'Stripe en modo prueba';
    banner.innerHTML = `
      <div class="dco-test-inner">
        <span class="dco-test-tag">${icons.flask(14)} MODO PRUEBA</span>
        <span class="dco-test-long">${label}: no se realizan cargos reales. Usa la tarjeta <code>4242 4242 4242 4242</code>, cualquier fecha futura y cualquier CVC.</span>
        <span class="dco-test-short">Sin cargos reales · tarjeta <code>4242 4242 4242 4242</code></span>
        <button type="button" class="dco-test-more" id="dco-test-more" aria-expanded="false">Ver tarjetas de prueba</button>
      </div>
      <ul class="dco-test-cards" id="dco-test-cards" hidden>
        ${TEST_CARDS.map(([n, d]) => `<li><code>${n}</code><span>${d}</span></li>`).join('')}
        <li><code>SPEI / OXXO</code><span>Genera instrucciones y simula la acreditación</span></li>
        ${cfg.couponsEnabled ? '<li><code>PRUEBA10</code><span>Cupón de prueba (10%)</span></li>' : ''}
      </ul>`;
    banner.hidden = false;
    $('dco-test-more')?.addEventListener('click', (e) => {
      const list = $('dco-test-cards');
      list.hidden = !list.hidden;
      e.currentTarget.setAttribute('aria-expanded', String(!list.hidden));
      e.currentTarget.textContent = list.hidden ? 'Ver tarjetas de prueba' : 'Ocultar';
    });
  }

  // ── Interacciones del resumen (delegadas) ─────────────────────

  on($('dco-summary-toggle'), 'click', (e) => {
    const open = !summary.classList.contains('is-open');
    summary.classList.toggle('is-open', open);
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  async function changeCart(nextItems, message) {
    if (state.busy || state.paying) return;
    const prevItems = state.items;
    const check = priceCart({ items: nextItems, plan: state.plan });
    if (!check.ok) return;
    state.items = check.items;
    state.notices = check.notices || [];
    const ok = await reprice({ reason: 'cart' });
    if (!ok) {
      state.items = prevItems;
      return;
    }
    if (message) showToast(message);
    await onCartChanged();
  }

  on(summaryDynamic, 'click', (e) => {
    const add = e.target.closest('[data-add]');
    const remove = e.target.closest('[data-remove]');
    if (add) {
      const sku = add.dataset.add;
      const product = PRODUCTS[sku];
      if (!product || state.items.includes(sku)) return;
      trackPixel('AddToCart', {
        value: product.price,
        currency: 'MXN',
        content_ids: [sku],
        contents: [{ id: sku, quantity: 1 }],
        content_name: product.name,
        content_type: 'product'
      });
      changeCart([...state.items, sku], `Agregaste ${product.name}`);
    } else if (remove) {
      const sku = remove.dataset.remove;
      changeCart(
        state.items.filter((s) => s !== sku),
        `Quitaste ${PRODUCTS[sku]?.name || 'el complemento'}`
      );
    } else if (e.target.closest('#dco-coupon-toggle')) {
      state.couponOpen = true;
      renderSummary();
      $('dco-coupon-input')?.focus();
    } else if (e.target.closest('#dco-coupon-remove')) {
      if (state.busy || state.paying) return;
      state.coupon = null;
      state.couponError = '';
      reprice({ couponCode: '' }).then(() => {
        showToast('Cupón eliminado');
        onCartChanged();
      });
    }
  });

  on(summaryDynamic, 'submit', async (e) => {
    if (e.target.id !== 'dco-coupon-form') return;
    e.preventDefault();
    if (state.busy || state.paying || state.couponBusy) return;
    const code = normalizeCouponCode($('dco-coupon-input')?.value);
    if (!code) {
      state.couponError = 'Escribe tu código de descuento.';
      renderSummary();
      return;
    }
    const ok = await reprice({ couponCode: code });
    if (ok && state.coupon) {
      showToast(`Cupón ${state.coupon.code} aplicado`);
      await onCartChanged();
    }
  });

  on(summaryDynamic, 'input', (e) => {
    if (e.target.id === 'dco-coupon-input') {
      e.target.value = e.target.value.toUpperCase();
      if (state.couponError) {
        state.couponError = '';
        const el = $('dco-coupon-error');
        if (el) el.textContent = '';
      }
    }
  });

  // Esquema de pago (delegado: el bloque se re-renderiza)
  on(plansSlot, 'change', async (e) => {
    if (e.target.name !== 'plan') return;
    if (state.busy || state.paying) {
      renderPlans();
      return;
    }
    state.plan = e.target.value;
    await reprice();
    await onCartChanged();
  });

  /** Después de preparar el pago, cualquier cambio de monto requiere una intención nueva. */
  async function onCartChanged() {
    if (state.stage !== 'payment' || !state.customer) return;
    lockPayment({ keepPlaceholder: false });
    await prepareIntent({ auto: true });
  }

  // ── Formulario de datos ───────────────────────────────────────

  on(invoiceToggle, 'change', () => {
    invoiceFields.hidden = !invoiceToggle.checked;
    if (invoiceToggle.checked) $('dco-rfc')?.focus();
    scheduleSave();
  });
  page.querySelectorAll('.dco-upper').forEach((el) =>
    on(el, 'input', () => {
      const pos = el.selectionStart;
      el.value = el.value.toUpperCase();
      el.setSelectionRange(pos, pos);
    })
  );
  on($('dco-cp'), 'input', (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5)));

  const phoneInput = $('dco-phone');
  on(phoneInput, 'input', () => {
    const caretDigits = phoneInput.value.slice(0, phoneInput.selectionStart ?? phoneInput.value.length).replace(/\D/g, '').length;
    const formatted = formatPhoneMX(phoneInput.value);
    if (formatted === phoneInput.value) return;
    phoneInput.value = formatted;
    let pos = 0;
    let seen = 0;
    while (pos < formatted.length && seen < caretDigits) {
      if (/\d/.test(formatted[pos])) seen++;
      pos++;
    }
    try {
      phoneInput.setSelectionRange(pos, pos);
    } catch {}
  });

  const emailInput = $('dco-email');
  const emailSuggest = $('dco-email-suggest');
  function refreshEmailSuggestion() {
    const suggestion = suggestEmail(emailInput.value.trim());
    emailSuggest.hidden = !suggestion;
    if (suggestion) {
      emailSuggest.dataset.value = suggestion;
      emailSuggest.innerHTML = `¿Quisiste decir <strong>${esc(suggestion)}</strong>?`;
    }
  }
  on(emailInput, 'blur', refreshEmailSuggestion);
  on(emailInput, 'input', () => {
    if (!emailSuggest.hidden) refreshEmailSuggestion();
  });
  on(emailSuggest, 'click', () => {
    emailInput.value = emailSuggest.dataset.value || emailInput.value;
    emailSuggest.hidden = true;
    emailInput.classList.remove('is-invalid');
    const err = form.querySelector('[data-error-for="email"]');
    if (err) err.textContent = '';
    scheduleSave();
    phoneInput.focus();
  });

  // Limpia errores al escribir
  form.querySelectorAll('.dco-input').forEach((el) =>
    on(el, 'input', () => {
      el.classList.remove('is-invalid');
      const key = el.closest('.dco-field')?.querySelector('[data-error-for]');
      if (key) key.textContent = '';
    })
  );

  // Borrador persistente (debounced)
  let saveTimer = null;
  function readFormRaw() {
    return {
      customer: { name: $('dco-name').value.trim(), email: emailInput.value.trim().toLowerCase(), phone: phoneInput.value.trim() },
      billing: invoiceToggle.checked
        ? { rfc: $('dco-rfc').value.trim().toUpperCase(), razonSocial: $('dco-razon').value.trim(), regimen: $('dco-regimen').value, usoCfdi: $('dco-uso').value, cp: $('dco-cp').value.trim() }
        : null
    };
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const raw = readFormRaw();
      saveContact(raw);
      updateDraft(raw);
    }, 400);
  }
  on(form, 'input', scheduleSave);
  on(form, 'change', scheduleSave);

  function setFieldErrors(errors) {
    form.querySelectorAll('[data-error-for]').forEach((el) => {
      const msg = errors[el.dataset.errorFor] || '';
      el.textContent = msg;
      el.closest('.dco-field')?.querySelector('.dco-input')?.classList.toggle('is-invalid', Boolean(msg));
    });
    const first = form.querySelector('.dco-input.is-invalid');
    if (first) first.focus();
  }

  function collectContact() {
    const { customer, billing: rawBilling } = readFormRaw();
    customer.phone = formatPhoneMX(customer.phone);
    const errors = {};
    if (customer.name.length < 3 || !/\p{L}/u.test(customer.name)) errors.name = 'Ingresa tu nombre completo.';
    if (!EMAIL_RE.test(customer.email)) errors.email = 'Ingresa un correo válido.';
    if (customer.phone.replace(/\D/g, '').length !== 10) errors.phone = 'Ingresa un WhatsApp de 10 dígitos.';

    let billing = null;
    if (rawBilling) {
      billing = { required: true, ...rawBilling };
      if (!RFC_RE.test(billing.rfc)) errors.rfc = 'RFC inválido (12 o 13 caracteres).';
      if (billing.razonSocial.length < 3) errors.razonSocial = 'Ingresa la razón social.';
      if (!billing.regimen) errors.regimen = 'Selecciona tu régimen fiscal.';
      if (!/^\d{5}$/.test(billing.cp)) errors.cp = 'Código postal de 5 dígitos.';
    }
    return { customer, billing, errors };
  }

  function setStep(n) {
    document.querySelectorAll('#dco-steps li').forEach((li) => {
      const s = Number(li.dataset.step);
      li.classList.toggle('is-active', s === n);
      li.classList.toggle('is-done', s < n);
    });
  }

  function updatePayLabel() {
    const method = state.provider?.getMethod?.() || 'card';
    const amount = formatMXN(state.pricing.totalCents);
    const label =
      method === 'spei' ? `Generar CLABE para pagar ${amount}` : method === 'oxxo' ? `Generar referencia OXXO por ${amount}` : `Pagar ${amount}`;
    const payLabel = $('dco-pay-label');
    if (payLabel) payLabel.textContent = label;
    const mobileLabel = mobileBtn.querySelector('span');
    if (mobileLabel) mobileLabel.textContent = state.stage === 'payment' ? (method === 'card' ? `Pagar ${amount}` : 'Generar referencia') : 'Continuar al pago';
  }

  function setBusy(button, busy, busyText) {
    state.busy = busy;
    summary.classList.toggle('is-busy', busy || state.paying);
    if (!button) return;
    button.disabled = busy;
    button.classList.toggle('is-loading', busy);
    if (busy) {
      button.dataset.original = button.innerHTML;
      button.innerHTML = `<span class="dco-spinner is-small"></span><span>${esc(busyText)}</span>`;
    } else if (button.dataset.original) {
      button.innerHTML = button.dataset.original;
      delete button.dataset.original;
    }
  }

  function lockPayment({ keepPlaceholder = true } = {}) {
    state.provider?.destroy();
    state.provider = null;
    state.intent = null;
    paymentCard.classList.add('is-locked');
    paymentCard.setAttribute('aria-disabled', 'true');
    placeholder.hidden = !keepPlaceholder;
    payBtn.hidden = true;
    legal.hidden = true;
    payError.textContent = '';
    mount.innerHTML = keepPlaceholder ? '' : '<div class="dco-mount-loading"><span class="dco-spinner is-small"></span> Actualizando el monto de tu pago…</div>';
    updateMobileBar();
  }

  function showContactSummary(customer, billing) {
    contactSummary.innerHTML = `
      <div class="dco-contact-line"><strong>${esc(customer.name)}</strong></div>
      <div class="dco-contact-line">${esc(customer.email)} · +52 ${esc(customer.phone)}</div>
      ${billing ? `<div class="dco-contact-line is-muted">Factura: ${esc(billing.rfc)} · ${esc(billing.razonSocial)}</div>` : ''}`;
    form.hidden = true;
    contactSummary.hidden = false;
    editBtn.hidden = false;
    contactCard.classList.add('is-complete');
  }

  on(editBtn, 'click', () => {
    if (state.busy || state.paying) return;
    lockPayment();
    state.stage = 'contact';
    form.hidden = false;
    contactSummary.hidden = true;
    editBtn.hidden = true;
    contactCard.classList.remove('is-complete');
    setStep(1);
    updatePayLabel();
    updateMobileBar();
    $('dco-name').focus();
  });

  function whatsappFallbackUrl(customer) {
    const phone = state.config?.supportWhatsApp || SUPPORT_WA;
    const p = state.pricing;
    const text =
      `¡Hola Dilo Digital! Quiero completar mi orden:\n\n` +
      p.lines.map((l) => `• ${l.name} — ${formatMXN(l.amountCents)}`).join('\n') +
      (p.couponCode ? `\n*Cupón:* ${p.couponCode} (−${formatMXN(p.couponDiscountCents)})` : '') +
      `\n\n*Total hoy:* ${formatMXN(p.totalCents)} (${p.planLabel})` +
      (req.meta?.brandName ? `\n*Marca:* ${req.meta.brandName}` : '') +
      `\n*Nombre:* ${customer.name}\n*Correo:* ${customer.email}\n*WhatsApp:* ${customer.phone}\n\n¿Me envían el enlace de pago?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  function showUnavailable(customer, billing) {
    showContactSummary(customer, billing);
    paymentCard.classList.remove('is-locked');
    paymentCard.removeAttribute('aria-disabled');
    placeholder.hidden = true;
    mount.innerHTML = `
      <div class="dco-unavailable">
        ${icons.clock(22)}
        <div>
          <strong>Estamos activando los pagos en línea</strong>
          <p>Un asesor te enviará tu enlace de pago seguro por WhatsApp en minutos. Tu orden y precio quedan reservados.</p>
          <a class="dco-btn dco-btn-whatsapp" id="dco-wa-fallback" href="${whatsappFallbackUrl(customer)}" target="_blank" rel="noopener">${icons.whatsapp(18)} Completar por WhatsApp</a>
        </div>
      </div>`;
  }

  /** Obtiene (o reutiliza) la intención de pago para el carrito y datos actuales. */
  async function obtainIntent(customer, billing, mode) {
    const signature = intentSignature({ items: state.items, plan: state.plan, coupon: state.coupon?.code, customer, billing, mode });
    const cached = getCachedIntent(signature);
    if (cached?.clientSecret) {
      try {
        const { order } = await checkoutApi.orderStatus(cached.clientSecret);
        if (order.status === 'requires_payment_method' && order.amountCents === cached.pricing?.totalCents) return { ...cached, reused: true };
      } catch {
        /* sesión vencida o inválida: se crea una nueva */
      }
      forgetIntent(cached.orderId);
    }
    const intent = await checkoutApi.createIntent({
      items: state.items,
      plan: state.plan,
      coupon: state.coupon?.code || undefined,
      customer,
      billing,
      meta: req.meta || {},
      tracking: getTrackingContext()
    });
    const record = {
      orderId: intent.orderId,
      clientSecret: intent.clientSecret,
      mode: intent.mode,
      publishableKey: intent.publishableKey || null,
      pricing: intent.pricing
    };
    cacheIntent(signature, record);
    return record;
  }

  async function prepareIntent({ auto = false, retried = false } = {}) {
    const customer = state.customer;
    const billing = state.billing;
    setBusy(auto ? null : continueBtn, true, 'Preparando pago seguro…');
    try {
      const cfg = (await configPromise) || state.config;
      if (cfg && !cfg.available) {
        state.stage = 'payment';
        showUnavailable(customer, billing);
        return;
      }

      const intent = await obtainIntent(customer, billing, cfg?.mode);
      state.intent = intent;

      // El servidor es la fuente de verdad del monto
      if (intent.pricing && intent.pricing.totalCents !== state.pricing.totalCents) {
        state.pricing = { ...state.pricing, ...intent.pricing };
        renderPricing();
      }

      rememberOrder(intent.orderId, { clientSecret: intent.clientSecret, items: state.items, plan: state.plan, status: 'created' });
      updateDraft({ items: state.items, plan: state.plan, coupon: state.coupon?.code || '', customer, billing: billing || null });
      saveContact({ customer, billing });
      setPixelUserData(customer);

      // Lead para recuperación de carrito abandonado (una vez por carrito/correo)
      const leadKey = `dilo_checkout_lead_${customer.email}_${itemsKey()}_${state.plan}`;
      try {
        if (!sessionStorage.getItem(leadKey)) {
          sessionStorage.setItem(leadKey, '1');
          saveLeadToCms({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            brandName: req.meta?.brandName || state.pricing.primaryName,
            type: 'checkout',
            statusScenario: 'amarillo',
            notes: `Checkout iniciado ${intent.orderId} · ${state.items.join(', ')} · ${formatMXN(state.pricing.totalCents)} (${state.pricing.planLabel})${state.coupon ? ` · cupón ${state.coupon.code}` : ''}`,
            source: '#/checkout'
          });
        }
      } catch {}

      state.stage = 'payment';
      showContactSummary(customer, billing);
      await mountProvider({ scroll: !auto });
    } catch (err) {
      if (err.code === 'invalid_coupon' && !retried) {
        const code = state.coupon?.code;
        state.coupon = null;
        state.couponError = `El cupón ${code || ''} ya no es válido: ${err.message}`.trim();
        state.couponOpen = true;
        await reprice({ couponCode: '' });
        setBusy(auto ? null : continueBtn, false);
        return await prepareIntent({ auto, retried: true });
      }
      if (err.fields && !auto) {
        setFieldErrors(err.fields);
        contactError.textContent = err.message;
      } else if (auto) {
        mount.innerHTML = '';
        placeholder.hidden = true;
        paymentCard.classList.remove('is-locked');
        payError.innerHTML = `${esc(err.message || 'No pudimos actualizar tu pago.')} <button type="button" class="dco-inline-retry" id="dco-retry-prepare">Reintentar</button>`;
        $('dco-retry-prepare')?.addEventListener('click', () => {
          payError.textContent = '';
          prepareIntent({ auto: true });
        });
      } else {
        contactError.textContent = err.message || 'No pudimos preparar tu pago. Intenta de nuevo.';
      }
    } finally {
      setBusy(auto ? null : continueBtn, false);
      updateMobileBar();
    }
  }

  // ── Paso 1 → 2 ────────────────────────────────────────────────
  on(form, 'submit', async (e) => {
    e.preventDefault();
    if (state.busy || state.paying) return;
    contactError.textContent = '';
    const { customer, billing, errors } = collectContact();
    if (Object.keys(errors).length) return setFieldErrors(errors);
    setFieldErrors({});
    phoneInput.value = customer.phone;
    emailSuggest.hidden = true;
    state.customer = customer;
    state.billing = billing;
    await prepareIntent();
  });

  async function mountProvider({ scroll = true } = {}) {
    const { intent, customer } = state;
    paymentCard.classList.remove('is-locked');
    paymentCard.removeAttribute('aria-disabled');
    placeholder.hidden = true;
    payError.textContent = '';
    mount.innerHTML = '<div class="dco-mount-loading"><span class="dco-spinner is-small"></span> Cargando métodos de pago seguros…</div>';

    try {
      if (intent.mode === 'simulated') {
        state.provider = createSimulatedProvider({ container: mount, clientSecret: intent.clientSecret, totalCents: state.pricing.totalCents, customer });
      } else {
        const { createStripeProvider } = await import('../checkout/providers/stripe.js');
        state.provider = await createStripeProvider({
          container: mount,
          publishableKey: intent.publishableKey || state.config?.publishableKey,
          clientSecret: intent.clientSecret,
          customer,
          returnUrl: `${location.origin}${location.pathname}#/checkout/exito`
        });
      }
    } catch (err) {
      mount.innerHTML = '';
      payError.textContent = err.message || 'No se pudo cargar el formulario de pago.';
      return;
    }
    if (!document.body.contains(mount)) return;

    state.provider.onMethodChange(() => {
      payError.textContent = '';
      updatePayLabel();
    });
    updatePayLabel();
    payBtn.hidden = false;
    legal.hidden = false;
    setStep(2);
    if (!state.trackedPaymentInfo.has(intent.orderId)) {
      state.trackedPaymentInfo.add(intent.orderId);
      trackPixel('AddPaymentInfo', pixelParams(state.pricing));
    }
    if (scroll) paymentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateMobileBar();
  }

  // ── Paso 2 → 3 ────────────────────────────────────────────────
  const beforeUnload = (e) => {
    if (!state.paying) return;
    e.preventDefault();
    e.returnValue = '';
  };
  on(window, 'beforeunload', beforeUnload);

  on(payBtn, 'click', async () => {
    if (state.busy || state.paying || !state.provider || !state.intent) return;
    payError.textContent = '';
    state.paying = true;
    setBusy(payBtn, true, 'Procesando…');
    processing.hidden = false;
    let renew = false;

    try {
      const result = await state.provider.confirm();
      if (result.status === 'invalid') {
        if (result.message) payError.textContent = result.message;
        return;
      }

      if (result.clientSecret) {
        state.intent.clientSecret = result.clientSecret;
        updateCachedIntentSecret(state.intent.orderId, result.clientSecret);
      }
      rememberOrder(state.intent.orderId, { clientSecret: state.intent.clientSecret, status: result.status });

      if (['succeeded', 'processing', 'requires_action'].includes(result.status)) {
        forgetIntent(state.intent.orderId);
        setStep(3);
        state.paying = false;
        window.location.hash = `#/checkout/exito?cs=${encodeURIComponent(state.intent.clientSecret)}`;
        return;
      }

      payError.textContent = result.message || 'El pago no fue aprobado. Verifica tus datos o usa otro método.';
    } catch (err) {
      if (['session_expired', 'invalid_session', 'invalid_state'].includes(err.code)) {
        forgetIntent(state.intent?.orderId);
        renew = true;
      } else {
        payError.textContent = err.message || 'Ocurrió un error al procesar el pago. No se realizó ningún cargo.';
      }
    } finally {
      state.paying = false;
      processing.hidden = true;
      if (document.body.contains(payBtn)) {
        setBusy(payBtn, false);
        updatePayLabel();
      }
    }

    if (renew && document.body.contains(payBtn)) {
      lockPayment({ keepPlaceholder: false });
      await prepareIntent({ auto: true });
      payError.textContent = 'Tu sesión de pago se renovó por seguridad. No se realizó ningún cargo; intenta de nuevo.';
    }
  });

  // ── Barra fija en móvil ───────────────────────────────────────
  const visible = { continue: true, pay: false };
  function updateMobileBar() {
    const target = state.stage === 'payment' ? payBtn : continueBtn;
    const targetShown = !target.hidden && !target.closest('[hidden]');
    const inView = state.stage === 'payment' ? visible.pay : visible.continue;
    const show = targetShown && !inView && !state.paying;
    mobileBar.hidden = !show;
    page.classList.toggle('has-mobilebar', show);
  }
  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.target === payBtn) visible.pay = en.isIntersecting;
        if (en.target === continueBtn) visible.continue = en.isIntersecting;
      });
      updateMobileBar();
    });
    observer.observe(payBtn);
    observer.observe(continueBtn);
  }
  on(mobileBtn, 'click', () => {
    if (state.stage === 'payment') payBtn.click();
    else form.requestSubmit ? form.requestSubmit() : continueBtn.click();
  });

  // ── Primer render ─────────────────────────────────────────────
  renderPricing();
  updateMobileBar();
  if (state.notices.length) persistCart();
  trackPixel('InitiateCheckout', pixelParams(state.pricing));

  activeCleanup = () => {
    disposers.forEach((d) => d());
    observer?.disconnect();
    clearTimeout(saveTimer);
    clearTimeout(showToast.timer);
    state.provider?.destroy?.();
  };
}
