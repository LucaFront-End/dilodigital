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
 *   /#/checkout?items=impi-completo&coupon=LANZAMIENTO10
 * ================================================================
 */

const DRAFT_KEY = 'dilo_checkout_draft';
const ORDERS_KEY = 'dilo_checkout_orders';
const CONTACT_KEY = 'dilo_checkout_contact';
const INTENTS_KEY = 'dilo_checkout_intents';
const CONTACT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const INTENT_TTL_MS = 20 * 60 * 60 * 1000; // < 24 h de validez de la sesión simulada

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function buildCheckoutHash({ items = [], plan, coupon } = {}) {
  const qs = new URLSearchParams();
  qs.set('items', items.filter(Boolean).join(','));
  if (plan) qs.set('plan', plan);
  if (coupon) qs.set('coupon', coupon);
  return `#/checkout?${qs.toString()}`;
}

export function startCheckout({ items = [], plan, coupon, customer = {}, meta = {}, billing = null, returnPath } = {}) {
  const draft = {
    items: items.filter(Boolean),
    plan: plan || null,
    coupon: coupon || '',
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

// ── Datos de contacto recordados (7 días, solo en este navegador) ──

export function readSavedContact() {
  try {
    const saved = safeParse(localStorage.getItem(CONTACT_KEY), null);
    if (!saved || Date.now() - (saved.savedAt || 0) > CONTACT_TTL_MS) {
      localStorage.removeItem(CONTACT_KEY);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export function saveContact({ customer, billing }) {
  try {
    localStorage.setItem(CONTACT_KEY, JSON.stringify({ customer: customer || {}, billing: billing || null, savedAt: Date.now() }));
  } catch {}
}

export function clearSavedContact() {
  try {
    localStorage.removeItem(CONTACT_KEY);
  } catch {}
}

// ── Reutilización de intenciones de pago ──────────────────────────────────
// Si el cliente recarga o edita sin cambiar carrito/datos, se reutiliza
// la misma orden (mismo folio, sin PaymentIntents duplicados en Stripe).

function readIntents() {
  try {
    const all = safeParse(sessionStorage.getItem(INTENTS_KEY), {});
    const now = Date.now();
    for (const [k, v] of Object.entries(all)) if (!v || now - (v.createdAt || 0) > INTENT_TTL_MS) delete all[k];
    return all;
  } catch {
    return {};
  }
}

function writeIntents(all) {
  try {
    const keys = Object.keys(all);
    while (keys.length > 8) delete all[keys.shift()];
    sessionStorage.setItem(INTENTS_KEY, JSON.stringify(all));
  } catch {}
}

export function intentSignature({ items, plan, coupon, customer, billing, mode }) {
  return JSON.stringify([mode || '', [...items].sort(), plan || '', coupon || '', customer?.name, customer?.email, customer?.phone, billing ? [billing.rfc, billing.razonSocial, billing.regimen, billing.usoCfdi, billing.cp] : null]);
}

export function getCachedIntent(signature) {
  return readIntents()[signature] || null;
}

export function cacheIntent(signature, intent) {
  const all = readIntents();
  all[signature] = { ...intent, createdAt: all[signature]?.createdAt || Date.now() };
  writeIntents(all);
}

export function updateCachedIntentSecret(orderId, clientSecret) {
  const all = readIntents();
  for (const v of Object.values(all)) if (v.orderId === orderId) v.clientSecret = clientSecret;
  writeIntents(all);
}

export function forgetIntent(orderId) {
  const all = readIntents();
  for (const [k, v] of Object.entries(all)) if (!orderId || v.orderId === orderId) delete all[k];
  writeIntents(all);
}
