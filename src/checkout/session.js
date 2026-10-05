/**
 * ================================================================
 * DILO CHECKOUT — API DEL NAVEGADOR
 * ----------------------------------------------------------------
 * Punto de entrada reutilizable para enviar a cualquier cliente al
 * checkout desde cualquier página o proyecto:
 *
 *   import { startCheckout } from '../checkout/session.js';
 *   startCheckout({
 *     items: ['impi-completo', 'impi-addon-monitoreo'],
 *     plan: 'full',
 *     customer: { name, email, phone },
 *     meta: { brandName: 'Aura Coffee' }
 *   });
 *
 * También funciona con enlaces directos (ideal para anuncios):
 *   /#/checkout?items=impi-completo
 *   /#/checkout?items=branding-ecosistema&plan=full-5off
 * ================================================================
 */

const DRAFT_KEY = 'dilo_checkout_draft';
const ORDERS_KEY = 'dilo_checkout_orders';

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function buildCheckoutHash({ items = [], plan } = {}) {
  const qs = new URLSearchParams();
  qs.set('items', items.filter(Boolean).join(','));
  if (plan) qs.set('plan', plan);
  return `#/checkout?${qs.toString()}`;
}

export function startCheckout({ items = [], plan, customer = {}, meta = {}, billing = null, returnPath } = {}) {
  const draft = {
    items: items.filter(Boolean),
    plan: plan || null,
    customer,
    meta,
    billing,
    returnPath: returnPath || window.location.hash.split('?')[0] || '#/',
    savedAt: Date.now()
  };
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* modo privado: el checkout igual funciona con la URL */
  }
  window.location.hash = buildCheckoutHash(draft);
}

export function readDraft() {
  try {
    return safeParse(sessionStorage.getItem(DRAFT_KEY), null);
  } catch {
    return null;
  }
}

export function updateDraft(patch) {
  const next = { ...(readDraft() || {}), ...patch };
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

/** Guarda referencias locales de órdenes (para reintentos y evitar dobles eventos). */
export function rememberOrder(orderId, data) {
  try {
    const all = safeParse(localStorage.getItem(ORDERS_KEY), {});
    all[orderId] = { ...(all[orderId] || {}), ...data, updatedAt: Date.now() };
    const ids = Object.keys(all);
    if (ids.length > 30) delete all[ids[0]];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
  } catch {}
}

export function getRememberedOrder(orderId) {
  try {
    return safeParse(localStorage.getItem(ORDERS_KEY), {})[orderId] || null;
  } catch {
    return null;
  }
}
