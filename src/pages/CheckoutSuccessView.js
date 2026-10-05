/**
 * ================================================================
 * DILO CHECKOUT — VISTA #/checkout/exito
 * ----------------------------------------------------------------
 * Consulta el estado real de la orden en el servidor (nunca confía
 * en el navegador) y muestra:
 *   - succeeded        → confirmación + Purchase (1 sola vez) + alta
 *   - requires_action  → instrucciones SPEI / OXXO (con polling)
 *   - processing       → en proceso (con polling)
 *   - fallido          → mensaje + reintento
 * También recibe el retorno de Stripe (?payment_intent_client_secret)
 * después de 3D Secure u otros métodos con redirección.
 * ================================================================
 */

import { priceCart, formatMXN, PRODUCTS } from '../checkout/catalog.js';
import { checkoutApi } from '../checkout/api.js';
import { buildCheckoutHash, readDraft, rememberOrder, forgetIntent } from '../checkout/session.js';
import { trackPixel } from '../checkout/pixel.js';
import { esc, icons, copyToClipboard } from '../checkout/ui.js';
import { paymentLogo } from '../checkout/logos.js';
import { renderCheckoutHeader, renderCheckoutFooter } from './CheckoutView.js';
import { saveLeadToCms } from '../utils/LeadCms.js';
import { createNewTramite } from '../data/tramitesStore.js';

const POLL_MS = 6000;
const SUPPORT_WA = '525592441070';
let pollTimer = null;
let countdownTimer = null;

const BRAND_LABELS = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners',
  jcb: 'JCB',
  unionpay: 'UnionPay',
  carnet: 'Carnet'
};

const NEXT_STEPS = {
  impi: [
    ['Confirmación inmediata', 'Te enviamos el comprobante y tu folio a tu correo y WhatsApp.'],
    ['Abogado asignado (24 h hábiles)', 'Un especialista revisa tu marca, clase de Niza y documentación.'],
    ['Seguimiento en tu portal', 'Consulta cada etapa del trámite ante el IMPI en tiempo real.']
  ],
  branding: [
    ['Confirmación inmediata', 'Te enviamos el comprobante y tu folio a tu correo y WhatsApp.'],
    ['Kick-off (48 h hábiles)', 'Agendamos la sesión de descubrimiento con tu director creativo.'],
    ['Primeras propuestas', 'Recibes las rutas creativas según el calendario de tu paquete.']
  ]
};

function stopPolling() {
  if (pollTimer) clearTimeout(pollTimer);
  pollTimer = null;
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
}

function isOnSuccessRoute() {
  return window.location.hash.startsWith('#/checkout/exito');
}

/** Obtiene el client_secret desde el hash o desde el retorno de Stripe. */
function resolveClientSecret(params) {
  const fromHash = params.get('cs');
  if (fromHash) return fromHash;
  const search = new URLSearchParams(window.location.search);
  const fromStripe = search.get('payment_intent_client_secret') || params.get('payment_intent_client_secret');
  if (fromStripe) {
    // Limpia la URL: deja solo el hash con la referencia
    history.replaceState(null, '', `${window.location.pathname}#/checkout/exito?cs=${encodeURIComponent(fromStripe)}`);
    return fromStripe;
  }
  return '';
}

function methodLabel(order) {
  if (order.method === 'card' || order.cardLast4) {
    const brand = BRAND_LABELS[order.cardBrand] || 'Tarjeta';
    const msi = order.installments > 1 ? ` · ${order.installments} meses sin intereses` : '';
    return `${brand}${order.cardLast4 ? ` •••• ${order.cardLast4}` : ''}${msi}`;
  }
  if (order.method === 'customer_balance' || order.pending?.method === 'spei') return 'Transferencia SPEI';
  if (order.method === 'oxxo' || order.pending?.method === 'oxxo') return 'Efectivo en OXXO';
  return order.method || '—';
}

function methodLogo(order) {
  if (order.cardBrand && ['visa', 'mastercard', 'amex'].includes(order.cardBrand)) return paymentLogo(order.cardBrand, { width: 30 });
  if (order.method === 'customer_balance' || order.pending?.method === 'spei') return paymentLogo('spei', { width: 30 });
  if (order.method === 'oxxo' || order.pending?.method === 'oxxo') return paymentLogo('oxxo', { width: 30 });
  return '';
}

function orderPricing(order) {
  const p = priceCart({ items: order.items, plan: order.plan });
  return p.ok ? p : null;
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

function timeLeft(iso) {
  const ms = Date.parse(iso) - Date.now();
  if (!(ms > 0)) return 'Vencida';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return d > 0 ? `${d} d ${h} h ${m} min` : h > 0 ? `${h} h ${m} min` : `${Math.max(m, 1)} min`;
}

function shell(inner, returnPath = '#/') {
  return `
    <main class="dco-page dco-result-page" id="dco-result-page">
      ${renderCheckoutHeader(returnPath)}
      <div class="dco-test-banner" id="dco-test-banner" hidden></div>
      <div class="dco-print-head" aria-hidden="true">
        <img src="/brand/dilo-logo-dark.png" alt="" width="70" height="38">
        <div><strong>Comprobante de pago</strong><span>Dilo Digital MX · hola@dilodigitalmx.com · WhatsApp +52 55 9244 1070</span></div>
      </div>
      <div class="dco-container dco-result-container" id="dco-result-root">${inner}</div>
      ${renderCheckoutFooter()}
    </main>`;
}

function loadingCard(text = 'Confirmando tu pago con el banco…') {
  return `
    <div class="dco-result-card is-loading" id="dco-result-loading">
      <span class="dco-spinner"></span>
      <p class="dco-result-text">${esc(text)}</p>
    </div>`;
}

export function renderCheckoutSuccessView() {
  return shell(loadingCard());
}

// ── Plantillas por estado ───────────────────────────────────────

function renderOrderLines(order, pricing) {
  if (!pricing) return '';
  return `
    <ul class="dco-lines is-light">
      ${pricing.lines
        .map(
          (l) => `
        <li class="dco-line ${l.kind === 'addon' ? 'is-addon' : ''}">
          <div class="dco-line-text"><strong>${l.kind === 'addon' ? '+ ' : ''}${esc(l.name)}</strong></div>
          <span class="dco-line-price">${formatMXN(l.amountCents)}</span>
        </li>`
        )
        .join('')}
      ${
        order.couponDiscountCents
          ? `<li class="dco-line is-discount"><div class="dco-line-text"><strong>Cupón ${esc(order.couponCode)}</strong></div><span class="dco-line-price">−${formatMXN(order.couponDiscountCents)}</span></li>`
          : ''
      }
    </ul>`;
}

function balanceOf(order, pricing) {
  if (typeof order.balanceCents === 'number' && order.balanceCents > 0) return order.balanceCents;
  return order.couponDiscountCents ? 0 : pricing?.balanceCents || 0;
}

function renderDetails(order, pricing) {
  const balance = balanceOf(order, pricing);
  const rows = [
    ['Folio', `<span class="dco-mono">${esc(order.orderId)}</span> <button type="button" class="dco-copy-btn" data-copy="${esc(order.orderId)}" id="dco-copy-folio">${icons.copy(13)} Copiar</button>`],
    ['Monto pagado', `<strong>${formatMXN(order.amountCents)} MXN</strong>`],
    ['Método', `<span class="dco-method-cell">${methodLogo(order)}${esc(methodLabel(order))}</span>`],
    order.meta?.brandName ? ['Marca / proyecto', esc(order.meta.brandName)] : null,
    order.couponCode ? ['Cupón aplicado', `${esc(order.couponCode)} · −${formatMXN(order.couponDiscountCents)}`] : null,
    order.invoice ? ['Factura (CFDI 4.0)', `${esc(order.invoice.rfc)} · ${esc(order.invoice.razonSocial)}`] : null,
    order.customer?.email ? ['Comprobante enviado a', esc(order.customer.email)] : null,
    ['Fecha', esc(formatDate(order.paidAt || order.createdAt))]
  ].filter(Boolean);
  return `
    <dl class="dco-details">
      ${rows.map(([k, v]) => `<div class="dco-detail-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
    ${order.invoice ? `<p class="dco-invoice-note">${icons.receipt(14)} Recibirás tu factura en ${esc(order.customer?.email || 'tu correo')} con los datos fiscales registrados.</p>` : ''}
    ${
      balance
        ? `<div class="dco-balance-note is-block">${icons.clock(16)}<span>Pagaste el 50% de anticipo. El saldo de <strong>${formatMXN(balance)}</strong> se liquida contra entrega del proyecto.</span></div>`
        : ''
    }`;
}

function whatsappUrl(phone, text) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function renderSucceeded(order, ctx) {
  const pricing = orderPricing(order);
  const category = order.category || pricing?.category || 'impi';
  const steps = NEXT_STEPS[category] || NEXT_STEPS.impi;
  const firstName = (order.customer?.name || '').split(' ')[0];
  const wa = whatsappUrl(
    ctx.supportWhatsApp,
    `¡Hola Dilo Digital! Acabo de completar mi pago. Mi folio es ${order.orderId}${order.meta?.brandName ? ` (marca: ${order.meta.brandName})` : ''}.`
  );

  return `
    <div class="dco-result-card is-success" id="dco-result-success" data-order-id="${esc(order.orderId)}">
      <div class="dco-confetti" aria-hidden="true">${Array.from({ length: 18 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
      <div class="dco-result-icon is-success">${icons.check(34)}</div>
      <span class="dco-result-kicker">Pago confirmado</span>
      <h1 class="dco-result-title">¡Gracias${firstName ? `, ${esc(firstName)}` : ''}! Tu orden está en marcha</h1>
      <p class="dco-result-text">Recibimos tu pago de <strong>${formatMXN(order.amountCents)}</strong>. ${esc(pricing?.primaryName || 'Tu servicio')} queda activado desde este momento.</p>

      <div class="dco-result-grid">
        <section class="dco-result-section">
          <h2>${icons.receipt(16)} Detalle de la orden</h2>
          ${renderDetails(order, pricing)}
          ${renderOrderLines(order, pricing)}
        </section>
        <section class="dco-result-section">
          <h2>${icons.clock(16)} Próximos pasos</h2>
          <ol class="dco-next-steps">
            ${steps.map(([t, d], i) => `<li><span class="dco-next-num">${i + 1}</span><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></li>`).join('')}
          </ol>
        </section>
      </div>

      <div class="dco-result-actions">
        ${category === 'impi' ? `<a href="#/portal-tramites" class="dco-btn dco-btn-primary" id="dco-portal-link">Ir a mi portal de trámites ${icons.arrowRight(16)}</a>` : ''}
        <a href="${wa}" target="_blank" rel="noopener" class="dco-btn dco-btn-whatsapp" id="dco-wa-success">${icons.whatsapp(18)} Hablar con mi asesor</a>
        <button type="button" class="dco-btn dco-btn-ghost" id="dco-print-receipt">${icons.receipt(16)} Descargar comprobante</button>
        <a href="#/" class="dco-btn dco-btn-ghost" id="dco-home-link">Volver al inicio</a>
      </div>
    </div>`;
}

function copyRow(label, value, id, display = value) {
  return `
    <div class="dco-instr-row">
      <span class="dco-instr-label">${esc(label)}</span>
      <div class="dco-instr-value">
        <span class="dco-mono">${esc(display)}</span>
        <button type="button" class="dco-copy-btn" data-copy="${esc(value)}" id="${id}">${icons.copy(13)} Copiar</button>
      </div>
    </div>`;
}

function renderPending(order, ctx) {
  const p = order.pending || {};
  const pricing = orderPricing(order);
  const isSpei = p.method === 'spei';
  const amount = formatMXN(p.amountCents || order.amountCents);
  const simulateBtn =
    ctx.mode === 'simulated'
      ? `<div class="dco-sim-box">
           <span class="dco-test-tag">${icons.flask(13)} MODO PRUEBA</span>
           <p>En producción, el banco nos notifica automáticamente y esta pantalla se actualiza sola.</p>
           <button type="button" class="dco-btn dco-btn-ghost" id="dco-simulate-funds">${isSpei ? 'Simular transferencia recibida' : 'Simular pago en OXXO'}</button>
         </div>`
      : `<div class="dco-recheck-box">
           <p class="dco-polling-note"><span class="dco-spinner is-small"></span> Esperando la confirmación del banco. Esta página se actualiza automáticamente.</p>
           <button type="button" class="dco-btn dco-btn-ghost" id="dco-recheck">${icons.check(16)} Ya realicé el pago</button>
           <p class="dco-recheck-note" id="dco-recheck-note" hidden></p>
         </div>`;

  const body = isSpei
    ? `
      ${copyRow('CLABE interbancaria', p.clabe, 'dco-copy-clabe', String(p.clabe || '').replace(/(\d{3})(\d{3})(\d{11})(\d)/, '$1 $2 $3 $4'))}
      <div class="dco-instr-row"><span class="dco-instr-label">Banco</span><div class="dco-instr-value"><span>${esc(p.bankName)}</span></div></div>
      <div class="dco-instr-row"><span class="dco-instr-label">Beneficiario</span><div class="dco-instr-value"><span>${esc(p.beneficiary)}</span></div></div>
      ${copyRow('Concepto / referencia', p.reference, 'dco-copy-ref')}
      ${copyRow('Monto exacto', ((p.amountCents || order.amountCents) / 100).toFixed(2), 'dco-copy-amount', amount)}
      <ul class="dco-instr-tips">
        <li>Transfiere el <strong>monto exacto</strong> desde la app de tu banco.</li>
        <li>La CLABE es única para tu orden: se acredita en minutos, 24/7.</li>
        ${p.instructionsUrl ? `<li><a href="${esc(p.instructionsUrl)}" target="_blank" rel="noopener">Ver instrucciones oficiales</a></li>` : ''}
      </ul>`
    : `
      ${copyRow('Referencia OXXO', p.reference, 'dco-copy-oxxo', String(p.reference || '').replace(/(\d{4})(?=\d)/g, '$1 '))}
      <div class="dco-instr-row"><span class="dco-instr-label">Monto a pagar</span><div class="dco-instr-value"><strong>${amount}</strong></div></div>
      ${
        p.expiresAt
          ? `<div class="dco-instr-row"><span class="dco-instr-label">Vence</span><div class="dco-instr-value"><span>${esc(formatDate(p.expiresAt))}</span><span class="dco-countdown" id="dco-oxxo-countdown" data-expires="${esc(p.expiresAt)}">${icons.clock(13)} <b>${esc(timeLeft(p.expiresAt))}</b></span></div></div>`
          : ''
      }
      <ul class="dco-instr-tips">
        <li>Acude a cualquier OXXO y di que quieres hacer un <strong>pago de servicio</strong>.</li>
        <li>Muestra la referencia al cajero. OXXO cobra una comisión adicional.</li>
        ${p.voucherUrl ? `<li><a href="${esc(p.voucherUrl)}" target="_blank" rel="noopener" id="dco-oxxo-voucher">Descargar ficha de pago</a></li>` : ''}
      </ul>`;

  return `
    <div class="dco-result-card is-pending" id="dco-result-pending" data-method="${esc(p.method)}">
      <div class="dco-result-icon is-pending">${isSpei ? icons.bank(30) : icons.store(30)}</div>
      <span class="dco-result-kicker">Orden reservada · pendiente de pago</span>
      <h1 class="dco-result-title">${isSpei ? 'Completa tu transferencia SPEI' : 'Paga en cualquier OXXO'}</h1>
      <p class="dco-result-text">Tu folio <strong class="dco-mono">${esc(order.orderId)}</strong> y tu precio quedan apartados. ${isSpei ? 'Usa estos datos para transferir:' : 'Presenta esta referencia en caja:'}</p>
      <div class="dco-instructions" id="dco-instructions">${body}</div>
      ${simulateBtn}
      ${pricing ? `<details class="dco-mini-summary"><summary>Ver resumen del pedido (${formatMXN(order.amountCents)})</summary>${renderOrderLines(order, pricing)}</details>` : ''}
      <div class="dco-result-actions">
        <button type="button" class="dco-btn dco-btn-ghost" id="dco-print-receipt">${icons.receipt(16)} Guardar instrucciones</button>
        <a href="${whatsappUrl(ctx.supportWhatsApp, `Hola, tengo una duda con mi pago pendiente. Folio ${order.orderId}.`)}" target="_blank" rel="noopener" class="dco-btn dco-btn-whatsapp">${icons.whatsapp(18)} ¿Dudas? Escríbenos</a>
      </div>
    </div>`;
}

function renderProcessing(order) {
  return `
    <div class="dco-result-card is-pending" id="dco-result-processing">
      <div class="dco-result-icon is-pending"><span class="dco-spinner"></span></div>
      <span class="dco-result-kicker">Procesando</span>
      <h1 class="dco-result-title">Estamos confirmando tu pago</h1>
      <p class="dco-result-text">Tu banco está procesando la operación del folio <strong class="dco-mono">${esc(order.orderId)}</strong>. Esto puede tardar unos segundos; la página se actualizará sola.</p>
    </div>`;
}

function renderFailed(order, ctx) {
  const retry = buildCheckoutHash({ items: order.items, plan: order.plan, coupon: order.couponCode });
  const msg = order.error?.message || 'El pago no se completó. No se realizó ningún cargo a tu cuenta.';
  return `
    <div class="dco-result-card is-error" id="dco-result-failed">
      <div class="dco-result-icon is-error">${icons.alert(30)}</div>
      <span class="dco-result-kicker">Pago no completado</span>
      <h1 class="dco-result-title">No pudimos procesar tu pago</h1>
      <p class="dco-result-text">${esc(msg)}</p>
      <div class="dco-result-actions">
        <a href="${retry}" class="dco-btn dco-btn-primary" id="dco-retry-link">Intentar de nuevo ${icons.arrowRight(16)}</a>
        <a href="${whatsappUrl(ctx.supportWhatsApp, `Hola, no pude completar mi pago. Folio ${order.orderId}.`)}" target="_blank" rel="noopener" class="dco-btn dco-btn-whatsapp">${icons.whatsapp(18)} Pagar con ayuda de un asesor</a>
      </div>
    </div>`;
}

function renderNotFound(message, ctx = { supportWhatsApp: SUPPORT_WA }) {
  return `
    <div class="dco-result-card is-error" id="dco-result-notfound">
      <div class="dco-result-icon is-error">${icons.alert(30)}</div>
      <h1 class="dco-result-title">No encontramos tu orden</h1>
      <p class="dco-result-text">${esc(message || 'El enlace no es válido o expiró. Si ya realizaste un pago, escríbenos con tu comprobante y lo verificamos al instante.')}</p>
      <div class="dco-result-actions">
        <a href="#/" class="dco-btn dco-btn-primary">Ir al inicio</a>
        <a href="https://wa.me/${ctx.supportWhatsApp}" target="_blank" rel="noopener" class="dco-btn dco-btn-whatsapp">${icons.whatsapp(18)} Contactar soporte</a>
      </div>
    </div>`;
}

// ── Efectos de una sola vez (idempotentes por folio) ────────────

function onceFor(key, fn) {
  try {
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, String(Date.now()));
  } catch {
    /* sin storage: ejecuta igual */
  }
  fn();
  return true;
}

function firePurchase(order, ctx) {
  const pricing = orderPricing(order);
  onceFor(`dilo_px_purchase_${order.orderId}`, () => {
    trackPixel(
      'Purchase',
      {
        value: Number((order.amountCents / 100).toFixed(2)),
        currency: 'MXN',
        content_ids: order.items,
        contents: order.items.map((id) => ({ id, quantity: 1 })),
        content_type: 'product',
        content_name: pricing?.primaryName || PRODUCTS[order.items[0]]?.name || '',
        content_category: pricing?.categoryLabel || order.category,
        num_items: order.items.length,
        order_id: order.orderId
      },
      { eventId: order.orderId, test: ctx.mode !== 'stripe-live' }
    );
  });
}

function fulfill(order) {
  onceFor(`dilo_fulfilled_${order.orderId}`, () => {
    const pricing = orderPricing(order);
    const draft = readDraft() || {};
    const meta = { ...(draft.meta || {}), ...(order.meta || {}) };
    const customer = order.customer || draft.customer || {};

    try {
      saveLeadToCms({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        brandName: meta.brandName || pricing?.primaryName || '',
        type: 'checkout',
        statusScenario: 'verde',
        notes:
          `PAGADO ${order.orderId} · ${order.items.join(', ')} · ${formatMXN(order.amountCents)} · ${methodLabel(order)}` +
          (order.couponCode ? ` · cupón ${order.couponCode}` : '') +
          (order.invoice ? ` · FACTURA ${order.invoice.rfc}` : '') +
          (order.mode !== 'stripe-live' ? ' · MODO PRUEBA' : ''),
        source: '#/checkout/exito'
      });
    } catch (err) {
      console.warn('[Dilo Checkout] No se pudo registrar el lead:', err);
    }

    const tramiteType = order.items.includes('impi-completo') ? 'registro' : order.items.includes('impi-dictamen') ? 'viabilidad' : null;
    if (tramiteType) {
      try {
        createNewTramite({
          type: tramiteType,
          brandName: meta.brandName || 'Mi Marca',
          clientName: customer.name,
          clientEmail: customer.email,
          clientPhone: customer.phone,
          nizaClass: meta.nizaClass ? `Clase ${String(meta.nizaClass).replace(/\D/g, '') || meta.nizaClass}` : undefined,
          comments: `Orden pagada en línea · Folio ${order.orderId}.`
        });
      } catch (err) {
        console.warn('[Dilo Checkout] No se pudo crear el trámite:', err);
      }
    }
  });
}

// ── Lógica ──────────────────────────────────────────────────────

export function initCheckoutSuccessEvents(params) {
  stopPolling();
  document.title = 'Estado de tu pago · Dilo Digital';

  const root = document.getElementById('dco-result-root');
  if (!root) return;

  let clientSecret = resolveClientSecret(params);
  const ctx = { mode: 'simulated', supportWhatsApp: SUPPORT_WA };

  if (!clientSecret) {
    root.innerHTML = renderNotFound('Falta la referencia de pago en el enlace.');
    return;
  }

  const configPromise = checkoutApi
    .config()
    .then((cfg) => {
      ctx.supportWhatsApp = cfg.supportWhatsApp || ctx.supportWhatsApp;
      return cfg;
    })
    .catch(() => null);

  function renderBanner(mode) {
    const banner = document.getElementById('dco-test-banner');
    if (!banner || mode === 'stripe-live') return;
    banner.innerHTML = `<div class="dco-test-inner"><span class="dco-test-tag">${icons.flask(14)} MODO PRUEBA</span><span>${mode === 'simulated' ? 'Pasarela simulada' : 'Stripe en modo prueba'}: esta orden no generó cargos reales.</span></div>`;
    banner.hidden = false;
  }

  function bindCommon() {
    root.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', () => copyToClipboard(btn.dataset.copy, btn)));
    document.getElementById('dco-print-receipt')?.addEventListener('click', () => window.print());
  }

  function startCountdown() {
    const el = document.getElementById('dco-oxxo-countdown');
    if (!el) return;
    const tick = () => {
      if (!document.body.contains(el)) return stopPolling();
      const b = el.querySelector('b');
      if (b) b.textContent = timeLeft(el.dataset.expires);
      el.classList.toggle('is-expired', Date.parse(el.dataset.expires) <= Date.now());
    };
    tick();
    countdownTimer = setInterval(tick, 30000);
  }

  function schedulePoll() {
    if (ctx.mode === 'simulated') return; // en simulado se avanza con el botón
    if (pollTimer) clearTimeout(pollTimer);
    pollTimer = setTimeout(() => {
      if (isOnSuccessRoute()) load({ silent: true });
    }, POLL_MS);
  }

  let lastStatus = '';
  function show(order) {
    ctx.mode = order.mode || ctx.mode;
    renderBanner(ctx.mode);
    rememberOrder(order.orderId, { clientSecret, status: order.status });

    const st = order.status;
    const signature = `${st}|${order.pending?.method || ''}`;
    const sameView = signature === lastStatus && st === 'requires_action';
    lastStatus = signature;
    if (sameView) {
      // Polling sin cambios: no re-renderizar (evita parpadeos y perder el foco)
      schedulePoll();
      return;
    }
    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = null;

    if (st === 'succeeded') {
      forgetIntent(order.orderId);
      root.innerHTML = renderSucceeded(order, ctx);
      firePurchase(order, ctx);
      fulfill(order);
      document.title = `¡Pago confirmado! ${order.orderId} · Dilo Digital`;
    } else if (st === 'requires_action' && ['spei', 'oxxo'].includes(order.pending?.method)) {
      forgetIntent(order.orderId);
      root.innerHTML = renderPending(order, ctx);
      document.title = `Pago pendiente ${order.orderId} · Dilo Digital`;
      startCountdown();
      schedulePoll();
    } else if (st === 'processing') {
      root.innerHTML = renderProcessing(order);
      schedulePoll();
      if (ctx.mode === 'simulated') setTimeout(() => isOnSuccessRoute() && load({ silent: true }), 2500);
    } else {
      root.innerHTML = renderFailed(order, ctx);
      document.title = 'Pago no completado · Dilo Digital';
    }
    bindCommon();

    document.getElementById('dco-recheck')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      const note = document.getElementById('dco-recheck-note');
      btn.disabled = true;
      btn.innerHTML = '<span class="dco-spinner is-small"></span> Verificando tu pago…';
      const changed = await load({ silent: true });
      if (!changed && document.body.contains(btn)) {
        btn.disabled = false;
        btn.innerHTML = `${icons.check(16)} Ya realicé el pago`;
        if (note) {
          note.hidden = false;
          note.textContent =
            order.pending?.method === 'oxxo'
              ? 'Aún no recibimos la confirmación. Los pagos en OXXO pueden tardar hasta 1 día hábil en reflejarse; te avisaremos por correo.'
              : 'Aún no recibimos la transferencia. Las transferencias SPEI suelen acreditarse en minutos; esta página se actualizará sola.';
        }
      }
    });

    document.getElementById('dco-simulate-funds')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.innerHTML = '<span class="dco-spinner is-small"></span> Notificando pago…';
      try {
        const res = await checkoutApi.simulate({ clientSecret, action: 'simulate_funds_received' });
        clientSecret = res.clientSecret;
        history.replaceState(null, '', `${window.location.pathname}#/checkout/exito?cs=${encodeURIComponent(clientSecret)}`);
        show(res.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Reintentar simulación';
        const note = document.createElement('p');
        note.className = 'dco-form-error';
        note.textContent = err.message;
        btn.after(note);
      }
    });
  }

  /** Devuelve true si la vista cambió de estado. */
  async function load({ silent = false } = {}) {
    if (!silent) root.innerHTML = loadingCard();
    const before = lastStatus;
    try {
      await configPromise;
      const { order } = await checkoutApi.orderStatus(clientSecret);
      if (!isOnSuccessRoute()) return false;
      show(order);
      return lastStatus !== before || order.status === 'succeeded';
    } catch (err) {
      if (!isOnSuccessRoute()) return false;
      if (silent && err.code !== 'not_found') {
        schedulePoll(); // error transitorio en polling
        return false;
      }
      root.innerHTML = renderNotFound(err.code === 'not_found' || err.code === 'bad_request' ? '' : err.message, ctx);
      return true;
    }
  }

  load();
}

/** Llamar al salir de la ruta para detener el polling. */
export function cleanupCheckoutSuccess() {
  stopPolling();
}
