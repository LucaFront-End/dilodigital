/**
 * ================================================================
 * DILO CHECKOUT — VISTA #/checkout
 * ----------------------------------------------------------------
 * Pasarela de pago propia, independiente de Wix. Flujo:
 *   1. Datos del cliente (+ CFDI opcional)  → crea intención de pago
 *   2. Método de pago (Stripe o simulado)    → confirma
 *   3. Redirige a #/checkout/exito           → Purchase + fulfillment
 * ================================================================
 */

import { priceCart, formatMXN } from '../checkout/catalog.js';
import { checkoutApi } from '../checkout/api.js';
import { readDraft, updateDraft, rememberOrder, buildCheckoutHash } from '../checkout/session.js';
import { trackPixel, setPixelUserData, getTrackingContext } from '../checkout/pixel.js';
import { esc, icons } from '../checkout/ui.js';
import { createSimulatedProvider } from '../checkout/providers/simulated.js';
import { saveLeadToCms } from '../utils/LeadCms.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RFC_RE = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/;

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

// ── Helpers ─────────────────────────────────────────────────────

function resolveRequest(params) {
  const draft = readDraft() || {};
  const urlItems = (params.get('items') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const items = urlItems.length ? urlItems : draft.items || [];
  const sameCart = Array.isArray(draft.items) && draft.items.join(',') === items.join(',');
  const plan = params.get('plan') || (sameCart ? draft.plan : null) || undefined;
  return { items, plan, draft: sameCart || !urlItems.length ? draft : { customer: draft.customer } };
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
      <a href="https://wa.me/525592441070" target="_blank" rel="noopener">Ayuda por WhatsApp</a>
    </footer>`;
}

export { renderHeader as renderCheckoutHeader };

function renderTotals(pricing) {
  return `
    <div class="dco-total-row"><span>Subtotal</span><span>${formatMXN(pricing.subtotalCents)}</span></div>
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

  const c = req.draft.customer || {};
  const b = req.draft.billing || {};
  const returnPath = req.draft.returnPath || pricing.returnPath;
  const showPlans = pricing.availablePlans.length > 1;

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
                  <input id="dco-name" name="name" class="dco-input" autocomplete="name" placeholder="Ej. Ana Lucía Morales" value="${esc(c.name || '')}" required>
                  <span class="dco-field-error" data-error-for="name"></span>
                </div>
                <div class="dco-row-2">
                  <div class="dco-field">
                    <label for="dco-email">Correo electrónico</label>
                    <input id="dco-email" name="email" type="email" class="dco-input" autocomplete="email" placeholder="tu@correo.com" value="${esc(c.email || '')}" required>
                    <span class="dco-field-error" data-error-for="email"></span>
                  </div>
                  <div class="dco-field">
                    <label for="dco-phone">WhatsApp</label>
                    <div class="dco-input-prefix">
                      <span>+52</span>
                      <input id="dco-phone" name="phone" type="tel" class="dco-input" autocomplete="tel-national" inputmode="tel" placeholder="55 1234 5678" value="${esc(c.phone || '')}" required>
                    </div>
                    <span class="dco-field-error" data-error-for="phone"></span>
                  </div>
                </div>

                ${
                  showPlans
                    ? `<fieldset class="dco-plans">
                        <legend>Esquema de pago</legend>
                        ${pricing.availablePlans
                          .map((p) => {
                            const alt = priceCart({ items: pricing.items, plan: p.id });
                            return `
                              <label class="dco-plan ${p.id === pricing.plan ? 'is-selected' : ''}">
                                <input type="radio" name="plan" value="${p.id}" ${p.id === pricing.plan ? 'checked' : ''}>
                                <span class="dco-plan-radio"></span>
                                <span class="dco-plan-text"><strong>${esc(p.label)}</strong><small>Pagas hoy ${formatMXN(alt.totalCents)}</small></span>
                              </label>`;
                          })
                          .join('')}
                      </fieldset>`
                    : ''
                }

                <label class="dco-checkbox">
                  <input type="checkbox" id="dco-need-invoice" ${b.rfc ? 'checked' : ''}>
                  <span class="dco-checkbox-box">${icons.check(12)}</span>
                  <span>Necesito factura (CFDI 4.0)</span>
                </label>

                <div class="dco-invoice" id="dco-invoice-fields" ${b.rfc ? '' : 'hidden'}>
                  <div class="dco-row-2">
                    <div class="dco-field">
                      <label for="dco-rfc">RFC</label>
                      <input id="dco-rfc" class="dco-input dco-upper" maxlength="13" placeholder="XAXX010101000" value="${esc(b.rfc || '')}">
                      <span class="dco-field-error" data-error-for="rfc"></span>
                    </div>
                    <div class="dco-field">
                      <label for="dco-cp">C.P. fiscal</label>
                      <input id="dco-cp" class="dco-input" inputmode="numeric" maxlength="5" placeholder="06600" value="${esc(b.cp || '')}">
                      <span class="dco-field-error" data-error-for="cp"></span>
                    </div>
                  </div>
                  <div class="dco-field">
                    <label for="dco-razon">Razón social (como aparece en tu constancia)</label>
                    <input id="dco-razon" class="dco-input dco-upper" placeholder="Nombre o razón social" value="${esc(b.razonSocial || '')}">
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
                  Al confirmar aceptas nuestros términos de servicio y aviso de privacidad. Los datos de tu tarjeta se procesan directamente por la pasarela certificada PCI DSS; Dilo Digital nunca los almacena.
                </p>
              </div>
            </section>
          </div>

          <!-- RESUMEN -->
          <aside class="dco-summary" id="dco-summary">
            <button type="button" class="dco-summary-toggle" id="dco-summary-toggle" aria-expanded="false" aria-controls="dco-summary-body">
              <span>${icons.receipt(16)} Ver resumen del pedido</span>
              <strong>${formatMXN(pricing.totalCents)}</strong>
            </button>
            <div class="dco-summary-body" id="dco-summary-body">
              <div class="dco-summary-head">
                <span>${icons.receipt(18)} Resumen del pedido</span>
                <span class="dco-summary-badge">${esc(pricing.categoryLabel)}</span>
              </div>
              <ul class="dco-lines">
                ${pricing.lines
                  .map(
                    (l) => `
                  <li class="dco-line ${l.kind === 'addon' ? 'is-addon' : ''}">
                    <div class="dco-line-text">
                      <strong>${l.kind === 'addon' ? '+ ' : ''}${esc(l.name)}</strong>
                      <small>${esc(l.description)}</small>
                    </div>
                    <span class="dco-line-price">${formatMXN(l.amountCents)}</span>
                  </li>`
                  )
                  .join('')}
              </ul>
              ${req.draft.meta?.brandName ? `<div class="dco-summary-meta">Marca / proyecto: <strong>${esc(req.draft.meta.brandName)}</strong></div>` : ''}
              <div class="dco-totals" id="dco-totals">${renderTotals(pricing)}</div>
              <div class="dco-guarantee">${icons.shield(18)}<p>${esc(GUARANTEES[pricing.category] || '')}</p></div>
              <ul class="dco-trust">
                <li>${icons.lock(14)} Cifrado TLS 256-bit</li>
                <li>${icons.shield(14)} 3D Secure</li>
                <li>${icons.receipt(14)} Factura CFDI 4.0</li>
              </ul>
              <div class="dco-paylogos" aria-label="Métodos aceptados">
                <span>VISA</span><span>Mastercard</span><span>AMEX</span><span>SPEI</span><span>OXXO</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      ${renderCheckoutFooter()}

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

export function initCheckoutEvents(params) {
  const page = document.getElementById('dco-page');
  if (!page) return; // estado vacío

  document.title = 'Pago seguro · Dilo Digital';

  const req = resolveRequest(params);
  let pricing = priceCart({ items: req.items, plan: req.plan });
  if (!pricing.ok) return;

  const state = { config: null, provider: null, intent: null, customer: null, billing: null, busy: false };
  const $ = (id) => document.getElementById(id);

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
  const payLabel = $('dco-pay-label');
  const payError = $('dco-pay-error');
  const legal = $('dco-legal');
  const processing = $('dco-processing');
  const invoiceToggle = $('dco-need-invoice');
  const invoiceFields = $('dco-invoice-fields');

  trackPixel('InitiateCheckout', pixelParams(pricing));

  // Configuración del servidor (modo de pasarela)
  const configPromise = checkoutApi
    .config()
    .then((cfg) => {
      state.config = cfg;
      renderTestBanner(cfg);
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
        <span>${label}: no se realizan cargos reales. Usa la tarjeta <code>4242 4242 4242 4242</code>, cualquier fecha futura y cualquier CVC.</span>
        <button type="button" class="dco-test-more" id="dco-test-more" aria-expanded="false">Ver tarjetas de prueba</button>
      </div>
      <ul class="dco-test-cards" id="dco-test-cards" hidden>
        ${TEST_CARDS.map(([n, d]) => `<li><code>${n}</code><span>${d}</span></li>`).join('')}
        <li><code>SPEI / OXXO</code><span>Genera instrucciones y simula la acreditación</span></li>
      </ul>`;
    banner.hidden = false;
    $('dco-test-more')?.addEventListener('click', (e) => {
      const list = $('dco-test-cards');
      list.hidden = !list.hidden;
      e.currentTarget.setAttribute('aria-expanded', String(!list.hidden));
      e.currentTarget.textContent = list.hidden ? 'Ver tarjetas de prueba' : 'Ocultar';
    });
  }

  // Resumen colapsable en móvil
  $('dco-summary-toggle')?.addEventListener('click', (e) => {
    const summary = $('dco-summary');
    const open = !summary.classList.contains('is-open');
    summary.classList.toggle('is-open', open);
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  // Factura
  invoiceToggle?.addEventListener('change', () => {
    invoiceFields.hidden = !invoiceToggle.checked;
    if (invoiceToggle.checked) $('dco-rfc')?.focus();
  });
  page.querySelectorAll('.dco-upper').forEach((el) =>
    el.addEventListener('input', () => {
      const pos = el.selectionStart;
      el.value = el.value.toUpperCase();
      el.setSelectionRange(pos, pos);
    })
  );
  $('dco-cp')?.addEventListener('input', (e) => (e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5)));
  $('dco-phone')?.addEventListener('input', (e) => (e.target.value = e.target.value.replace(/[^\d\s+()-]/g, '')));

  // Esquema de pago
  form.querySelectorAll('input[name="plan"]').forEach((radio) =>
    radio.addEventListener('change', () => {
      pricing = priceCart({ items: pricing.items, plan: radio.value });
      form.querySelectorAll('.dco-plan').forEach((l) => l.classList.toggle('is-selected', l.contains(radio)));
      $('dco-totals').innerHTML = renderTotals(pricing);
      document.querySelector('#dco-summary-toggle strong').textContent = formatMXN(pricing.totalCents);
      updatePayLabel();
      updateDraft({ plan: pricing.plan });
      history.replaceState(null, '', `${location.pathname}${location.search}${buildCheckoutHash({ items: pricing.items, plan: pricing.plan })}`);
    })
  );

  // Limpia errores al escribir
  form.querySelectorAll('.dco-input').forEach((el) =>
    el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      const key = el.closest('.dco-field')?.querySelector('[data-error-for]');
      if (key) key.textContent = '';
    })
  );

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
    const customer = {
      name: $('dco-name').value.trim(),
      email: $('dco-email').value.trim().toLowerCase(),
      phone: $('dco-phone').value.trim()
    };
    const errors = {};
    if (customer.name.length < 3) errors.name = 'Ingresa tu nombre completo.';
    if (!EMAIL_RE.test(customer.email)) errors.email = 'Ingresa un correo válido.';
    const digits = customer.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) errors.phone = 'Ingresa un WhatsApp de 10 dígitos.';

    let billing = null;
    if (invoiceToggle.checked) {
      billing = {
        required: true,
        rfc: $('dco-rfc').value.trim().toUpperCase(),
        razonSocial: $('dco-razon').value.trim(),
        regimen: $('dco-regimen').value,
        usoCfdi: $('dco-uso').value,
        cp: $('dco-cp').value.trim()
      };
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
    const amount = formatMXN(pricing.totalCents);
    payLabel.textContent =
      method === 'spei'
        ? `Generar CLABE para pagar ${amount}`
        : method === 'oxxo'
          ? `Generar referencia OXXO por ${amount}`
          : `Pagar ${amount}`;
  }

  function setBusy(button, busy, busyText) {
    state.busy = busy;
    button.disabled = busy;
    button.classList.toggle('is-loading', busy);
    if (busy) {
      button.dataset.original = button.innerHTML;
      button.innerHTML = `<span class="dco-spinner is-small"></span><span>${esc(busyText)}</span>`;
    } else if (button.dataset.original) {
      button.innerHTML = button.dataset.original;
    }
  }

  function lockPayment() {
    state.provider?.destroy();
    state.provider = null;
    state.intent = null;
    paymentCard.classList.add('is-locked');
    paymentCard.setAttribute('aria-disabled', 'true');
    placeholder.hidden = false;
    payBtn.hidden = true;
    legal.hidden = true;
    payError.textContent = '';
    mount.innerHTML = '';
  }

  function showContactSummary(customer, billing) {
    contactSummary.innerHTML = `
      <div class="dco-contact-line"><strong>${esc(customer.name)}</strong></div>
      <div class="dco-contact-line">${esc(customer.email)} · +52 ${esc(customer.phone)}</div>
      ${billing ? `<div class="dco-contact-line is-muted">Factura: ${esc(billing.rfc)} · ${esc(billing.razonSocial)}</div>` : ''}
      ${pricing.availablePlans.length > 1 ? `<div class="dco-contact-line is-muted">Esquema: ${esc(pricing.planLabel)}</div>` : ''}`;
    form.hidden = true;
    contactSummary.hidden = false;
    editBtn.hidden = false;
    contactCard.classList.add('is-complete');
  }

  editBtn.addEventListener('click', () => {
    if (state.busy) return;
    lockPayment();
    form.hidden = false;
    contactSummary.hidden = true;
    editBtn.hidden = true;
    contactCard.classList.remove('is-complete');
    setStep(1);
    $('dco-name').focus();
  });

  function whatsappFallbackUrl(customer) {
    const phone = state.config?.supportWhatsApp || '525592441070';
    const text =
      `¡Hola Dilo Digital! Quiero completar mi orden:\n\n` +
      pricing.lines.map((l) => `• ${l.name} — ${formatMXN(l.amountCents)}`).join('\n') +
      `\n\n*Total hoy:* ${formatMXN(pricing.totalCents)} (${pricing.planLabel})` +
      (req.draft.meta?.brandName ? `\n*Marca:* ${req.draft.meta.brandName}` : '') +
      `\n*Nombre:* ${customer.name}\n*Correo:* ${customer.email}\n*WhatsApp:* ${customer.phone}\n\n¿Me envían el enlace de pago?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  // ── Paso 1 → 2 ────────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.busy) return;
    contactError.textContent = '';
    const { customer, billing, errors } = collectContact();
    if (Object.keys(errors).length) return setFieldErrors(errors);
    setFieldErrors({});

    setBusy(continueBtn, true, 'Preparando pago seguro…');
    try {
      const cfg = (await configPromise) || state.config;
      if (cfg && !cfg.available) {
        throw Object.assign(new Error('gateway_not_configured'), { code: 'gateway_not_configured' });
      }

      const intent = await checkoutApi.createIntent({
        items: pricing.items,
        plan: pricing.plan,
        customer,
        billing,
        meta: req.draft.meta || {},
        tracking: getTrackingContext()
      });

      state.intent = intent;
      state.customer = customer;
      state.billing = billing;
      pricing = priceCart({ items: pricing.items, plan: intent.pricing.plan });
      if (pricing.totalCents !== intent.pricing.totalCents) {
        // El servidor es la fuente de verdad del monto
        pricing = { ...pricing, ...intent.pricing };
        $('dco-totals').innerHTML = renderTotals(pricing);
      }

      rememberOrder(intent.orderId, { clientSecret: intent.clientSecret, items: pricing.items, plan: pricing.plan, status: 'created' });
      updateDraft({ items: pricing.items, plan: pricing.plan, customer, billing: billing || null });
      setPixelUserData(customer);

      // Lead para recuperación de carrito abandonado (una vez por carrito/correo)
      const leadKey = `dilo_checkout_lead_${customer.email}_${pricing.items.join(',')}_${pricing.plan}`;
      try {
        if (!sessionStorage.getItem(leadKey)) {
          sessionStorage.setItem(leadKey, '1');
          saveLeadToCms({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            brandName: req.draft.meta?.brandName || pricing.primaryName,
            type: 'checkout',
            statusScenario: 'amarillo',
            notes: `Checkout iniciado ${intent.orderId} · ${pricing.items.join(', ')} · ${formatMXN(pricing.totalCents)} (${pricing.planLabel})`,
            source: '#/checkout'
          });
        }
      } catch {}

      showContactSummary(customer, billing);
      await mountProvider();
    } catch (err) {
      if (err.code === 'gateway_not_configured') {
        showContactSummary(customer, billing);
        paymentCard.classList.remove('is-locked');
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
      } else if (err.fields) {
        setFieldErrors(err.fields);
        contactError.textContent = err.message;
      } else {
        contactError.textContent = err.message || 'No pudimos preparar tu pago. Intenta de nuevo.';
      }
    } finally {
      setBusy(continueBtn, false);
    }
  });

  async function mountProvider() {
    const { intent, customer } = state;
    paymentCard.classList.remove('is-locked');
    paymentCard.removeAttribute('aria-disabled');
    placeholder.hidden = true;
    mount.innerHTML = '<div class="dco-mount-loading"><span class="dco-spinner is-small"></span> Cargando métodos de pago seguros…</div>';

    try {
      if (intent.mode === 'simulated') {
        state.provider = createSimulatedProvider({ container: mount, clientSecret: intent.clientSecret, totalCents: pricing.totalCents, customer });
      } else {
        const { createStripeProvider } = await import('../checkout/providers/stripe.js');
        state.provider = await createStripeProvider({
          container: mount,
          publishableKey: intent.publishableKey,
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

    state.provider.onMethodChange(() => {
      payError.textContent = '';
      updatePayLabel();
    });
    updatePayLabel();
    payBtn.hidden = false;
    legal.hidden = false;
    setStep(2);
    trackPixel('AddPaymentInfo', pixelParams(pricing));
    paymentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Paso 2 → 3 ────────────────────────────────────────────────
  payBtn.addEventListener('click', async () => {
    if (state.busy || !state.provider || !state.intent) return;
    payError.textContent = '';
    setBusy(payBtn, true, 'Procesando…');
    processing.hidden = false;

    try {
      const result = await state.provider.confirm();
      if (result.status === 'invalid') {
        if (result.message) payError.textContent = result.message;
        return;
      }

      if (result.clientSecret) state.intent.clientSecret = result.clientSecret;
      rememberOrder(state.intent.orderId, { clientSecret: state.intent.clientSecret, status: result.status });

      if (['succeeded', 'processing', 'requires_action'].includes(result.status)) {
        setStep(3);
        window.location.hash = `#/checkout/exito?cs=${encodeURIComponent(state.intent.clientSecret)}`;
        return;
      }

      payError.textContent = result.message || 'El pago no fue aprobado. Verifica tus datos o usa otro método.';
    } catch (err) {
      payError.textContent = err.message || 'Ocurrió un error al procesar el pago. No se realizó ningún cargo.';
    } finally {
      processing.hidden = true;
      if (document.body.contains(payBtn)) {
        setBusy(payBtn, false);
        updatePayLabel();
      }
    }
  });
}
