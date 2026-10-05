/**
 * ================================================================
 * DILO CHECKOUT — NÚCLEO DEL SERVIDOR (no expuesto como endpoint)
 * ----------------------------------------------------------------
 * Vercel ignora los archivos dentro de carpetas que empiezan con "_",
 * así que este módulo solo lo importan los endpoints /api/checkout/*.
 *
 * Modos de pasarela (detectados automáticamente por variables de entorno):
 *  - 'stripe-live'  → STRIPE_SECRET_KEY = sk_live_...  (cobros reales)
 *  - 'stripe-test'  → STRIPE_SECRET_KEY = sk_test_...  (Stripe sandbox)
 *  - 'simulated'    → sin claves. Pasarela simulada 100% funcional para
 *                     desarrollo y QA. Deshabilitada automáticamente en
 *                     producción (VERCEL_ENV=production) salvo que se
 *                     fuerce con CHECKOUT_ALLOW_SIMULATED=true.
 * ================================================================
 */

import crypto from 'node:crypto';
import Stripe from 'stripe';
import { normalizeCouponCode } from '../../src/checkout/catalog.js';

// ── Configuración / modo ────────────────────────────────────────

const env = (key) => (process.env[key] || '').trim();

export function getGatewayMode() {
  const sk = env('STRIPE_SECRET_KEY');
  const pk = env('STRIPE_PUBLISHABLE_KEY') || env('VITE_STRIPE_PUBLISHABLE_KEY');
  if (sk && pk) return sk.startsWith('sk_live_') ? 'stripe-live' : 'stripe-test';
  return 'simulated';
}

export function isSimulatedAllowed() {
  if (env('CHECKOUT_ALLOW_SIMULATED') === 'true') return true;
  if (env('CHECKOUT_ALLOW_SIMULATED') === 'false') return false;
  return env('VERCEL_ENV') !== 'production';
}

export function getPublishableKey() {
  return env('STRIPE_PUBLISHABLE_KEY') || env('VITE_STRIPE_PUBLISHABLE_KEY');
}

let stripeClient = null;
export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(env('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-06-20',
      appInfo: { name: 'Dilo Checkout', version: '1.0.0' },
      maxNetworkRetries: 2
    });
  }
  return stripeClient;
}

// ── Cupones ─────────────────────────────────────────────────────

/** Cupón de prueba: SOLO fuera de producción y nunca con Stripe live. */
const TEST_COUPONS = {
  PRUEBA10: { percent: 10, label: 'Cupón de prueba · 10% de descuento' }
};

let couponsCache = { raw: null, value: {} };

/**
 * Cupones vigentes. Se configuran con la variable CHECKOUT_COUPONS (JSON):
 *   {"LANZAMIENTO10": {"percent": 10, "categories": ["impi"], "expires": "2026-12-31"}}
 */
export function getCoupons() {
  const raw = env('CHECKOUT_COUPONS');
  if (raw !== couponsCache.raw) {
    const parsed = {};
    if (raw) {
      try {
        const json = JSON.parse(raw);
        if (json && typeof json === 'object' && !Array.isArray(json)) {
          for (const [code, def] of Object.entries(json)) {
            const key = normalizeCouponCode(code);
            if (key && def && typeof def === 'object') parsed[key] = def;
          }
        }
      } catch (err) {
        console.warn('[Dilo Checkout] CHECKOUT_COUPONS no es un JSON válido:', err?.message || err);
      }
    }
    couponsCache = { raw, value: parsed };
  }
  const allowTest = getGatewayMode() !== 'stripe-live' && env('VERCEL_ENV') !== 'production';
  return allowTest ? { ...TEST_COUPONS, ...couponsCache.value } : { ...couponsCache.value };
}

export function couponsEnabled() {
  return Object.keys(getCoupons()).length > 0;
}

/** Desglose de precios apto para el navegador (todo proviene del catálogo). */
export function publicPricing(pricing) {
  return {
    currency: pricing.currency,
    category: pricing.category,
    categoryLabel: pricing.categoryLabel,
    plan: pricing.plan,
    planLabel: pricing.planLabel,
    availablePlans: pricing.availablePlans,
    items: pricing.items,
    baseSku: pricing.baseSku,
    lines: pricing.lines,
    subtotalCents: pricing.subtotalCents,
    couponCode: pricing.couponCode,
    couponLabel: pricing.couponLabel,
    couponDiscountCents: pricing.couponDiscountCents,
    discountCents: pricing.discountCents,
    balanceCents: pricing.balanceCents,
    totalCents: pricing.totalCents,
    ivaCents: pricing.ivaCents,
    notices: pricing.notices,
    primaryName: pricing.primaryName
  };
}

// ── Utilidades HTTP ─────────────────────────────────────────────

export function applyCors(req, res) {
  const origin = req.headers?.origin;
  const allowed = env('CHECKOUT_ALLOWED_ORIGINS')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  // Mismo origen en producción; lista explícita si se configura
  if (origin && (allowed.length === 0 || allowed.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
}

export function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = await readRawBody(req);
  if (!raw.length) return {};
  try {
    return JSON.parse(raw.toString('utf8'));
  } catch {
    const err = new Error('JSON inválido');
    err.status = 400;
    throw err;
  }
}

/**
 * Lee el cuerpo crudo (necesario para verificar firmas de webhooks).
 * IMPORTANTE: en Vercel `req.body` es un getter perezoso que consume el
 * stream; por eso se lee el stream ANTES de tocar `req.body`.
 */
export async function readRawBody(req) {
  if (req.rawBody !== undefined) {
    return Buffer.isBuffer(req.rawBody) ? req.rawBody : Buffer.from(String(req.rawBody));
  }
  if (typeof req[Symbol.asyncIterator] === 'function' && !req.readableEnded && req.readable !== false) {
    const chunks = [];
    for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    const buf = Buffer.concat(chunks);
    if (buf.length) return buf;
  }
  const body = req.body;
  if (Buffer.isBuffer(body)) return body;
  if (typeof body === 'string') return Buffer.from(body);
  if (body && typeof body === 'object') return Buffer.from(JSON.stringify(body));
  return Buffer.alloc(0);
}

export function getClientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '';
}

// ── Identificadores ─────────────────────────────────────────────

export function generateOrderId(prefix = 'DILO') {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
}

// ── Validación de cliente ───────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RFC_RE = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/;

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);

export function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return `52${digits}`; // México sin lada internacional
  return digits;
}

export function validateCustomer(input = {}) {
  const customer = {
    name: clean(input.name, 120),
    email: clean(input.email, 160).toLowerCase(),
    phone: clean(input.phone, 30)
  };
  const errors = {};
  if (customer.name.length < 3) errors.name = 'Ingresa tu nombre completo.';
  if (!EMAIL_RE.test(customer.email)) errors.email = 'Ingresa un correo válido.';
  const phoneDigits = customer.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 13) errors.phone = 'Ingresa un WhatsApp de 10 dígitos.';
  return { customer, errors, valid: Object.keys(errors).length === 0 };
}

export function validateBilling(input) {
  if (!input || !input.required) return { billing: null, errors: {}, valid: true };
  const billing = {
    rfc: clean(input.rfc, 13).toUpperCase(),
    razonSocial: clean(input.razonSocial, 200),
    regimen: clean(input.regimen, 3),
    usoCfdi: clean(input.usoCfdi, 4),
    cp: clean(input.cp, 5)
  };
  const errors = {};
  if (!RFC_RE.test(billing.rfc)) errors.rfc = 'RFC inválido (12 o 13 caracteres).';
  if (billing.razonSocial.length < 3) errors.razonSocial = 'Ingresa la razón social o nombre fiscal.';
  if (!/^\d{3}$/.test(billing.regimen)) errors.regimen = 'Selecciona un régimen fiscal.';
  if (!/^[A-Z]{1,2}\d{2}$/.test(billing.usoCfdi)) errors.usoCfdi = 'Selecciona el uso de CFDI.';
  if (!/^\d{5}$/.test(billing.cp)) errors.cp = 'Código postal de 5 dígitos.';
  return { billing, errors, valid: Object.keys(errors).length === 0 };
}

export function sanitizeMeta(meta = {}) {
  const out = {};
  for (const [k, v] of Object.entries(meta || {}).slice(0, 12)) {
    const key = String(k).replace(/[^a-zA-Z0-9_]/g, '').slice(0, 30);
    if (!key) continue;
    out[key] = clean(v, 300);
  }
  return out;
}

// ── Sesiones firmadas (modo simulado, sin base de datos) ─────────

function signingSecret() {
  return env('CHECKOUT_SIGNING_SECRET') || env('STRIPE_SECRET_KEY') || 'dilo-dev-only-signing-secret';
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');

export function signToken(payload) {
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', signingSecret()).update(body).digest('base64url');
  return `sim_${body}.${sig}`;
}

export function verifyToken(token) {
  if (typeof token !== 'string' || !token.startsWith('sim_')) return null;
  const [body, sig] = token.slice(4).split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', signingSecret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

// ── Meta Conversions API (server-side, deduplicado con el Pixel) ──

const sha256 = (v) => crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');

export function isCapiConfigured() {
  return Boolean((env('META_PIXEL_ID') || env('VITE_META_PIXEL_ID')) && env('META_CAPI_ACCESS_TOKEN'));
}

/**
 * Envía un evento a Meta Conversions API. Usa el mismo `eventId` que el
 * Pixel del navegador para que Meta deduplique y cuente UNA conversión.
 * Nunca lanza excepciones: el pago no debe fallar por el tracking.
 */
export async function sendCapiEvent({
  eventName,
  eventId,
  valueCents,
  currency = 'mxn',
  contentIds = [],
  contentName = '',
  email,
  phone,
  fbp,
  fbc,
  clientIp,
  userAgent,
  sourceUrl,
  isTest = false
}) {
  if (!isCapiConfigured()) {
    return { sent: false, reason: 'capi_not_configured' };
  }
  const testCode = env('META_TEST_EVENT_CODE');
  // Las compras de prueba solo se envían como "Test Events" para no
  // contaminar la optimización de campañas con conversiones falsas.
  if (isTest && !testCode) return { sent: false, reason: 'test_purchase_without_test_code' };

  const pixelId = env('META_PIXEL_ID') || env('VITE_META_PIXEL_ID');
  const userData = {};
  if (email) userData.em = [sha256(email)];
  if (phone) userData.ph = [sha256(normalizePhone(phone))];
  if (email) userData.external_id = [sha256(email)];
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: sourceUrl || undefined,
        user_data: userData,
        custom_data: {
          currency: currency.toUpperCase(),
          value: Number((valueCents / 100).toFixed(2)),
          content_ids: contentIds,
          content_name: contentName,
          content_type: 'product',
          num_items: contentIds.length || 1,
          order_id: eventId
        }
      }
    ]
  };
  if (testCode) payload.test_event_code = testCode;

  try {
    const resp = await fetch(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(env('META_CAPI_ACCESS_TOKEN'))}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.warn('[Dilo Checkout] Meta CAPI respondió con error:', json?.error?.message || resp.status);
      return { sent: false, reason: 'capi_error', detail: json?.error?.message };
    }
    return { sent: true, eventsReceived: json.events_received };
  } catch (err) {
    console.warn('[Dilo Checkout] Meta CAPI no disponible:', err?.message || err);
    return { sent: false, reason: 'capi_network_error' };
  }
}

// ── Normalización del estado de una orden ───────────────────────

/**
 * Convierte un PaymentIntent de Stripe al formato de orden que usa
 * el frontend (idéntico al del modo simulado).
 */
export function orderFromPaymentIntent(pi, mode) {
  const md = pi.metadata || {};
  const next = pi.next_action || null;
  let pending = null;

  if (next?.type === 'display_bank_transfer_instructions') {
    const ins = next.display_bank_transfer_instructions;
    const spei = (ins.financial_addresses || []).find((f) => f.type === 'spei')?.spei;
    pending = {
      method: 'spei',
      clabe: spei?.clabe || '',
      bankName: spei?.bank_name || 'STP',
      beneficiary: env('CHECKOUT_BENEFICIARY_NAME') || 'Dilo Digital',
      reference: ins.reference || md.order_id,
      amountCents: ins.amount_remaining ?? pi.amount,
      instructionsUrl: ins.hosted_instructions_url || ''
    };
  } else if (next?.type === 'oxxo_display_details') {
    const ox = next.oxxo_display_details;
    pending = {
      method: 'oxxo',
      reference: ox.number,
      expiresAt: ox.expires_after ? new Date(ox.expires_after * 1000).toISOString() : null,
      voucherUrl: ox.hosted_voucher_url || '',
      amountCents: pi.amount
    };
  }

  // Detalles de la tarjeta (requiere expand: ['latest_charge'])
  const charge = pi.latest_charge && typeof pi.latest_charge === 'object' ? pi.latest_charge : null;
  const pmd = charge?.payment_method_details || null;
  const card = pmd?.card || null;
  const usedMethod =
    pmd?.type ||
    (pending?.method === 'spei' ? 'customer_balance' : pending?.method === 'oxxo' ? 'oxxo' : '') ||
    (pi.payment_method_types?.length === 1 ? pi.payment_method_types[0] : md.method || '');

  const lastError = pi.last_payment_error;
  return {
    mode,
    orderId: md.order_id || pi.id,
    paymentIntentId: pi.id,
    status: pi.status,
    amountCents: pi.amount,
    currency: pi.currency,
    items: (md.items || '').split(',').filter(Boolean),
    plan: md.plan || 'full',
    category: md.category || '',
    customer: {
      name: md.customer_name || '',
      email: pi.receipt_email || md.customer_email || '',
      phone: md.customer_phone || ''
    },
    meta: { brandName: md.brand_name || '' },
    subtotalCents: Number(md.subtotal_cents) || pi.amount,
    couponCode: md.coupon_code || '',
    couponDiscountCents: Number(md.coupon_discount_cents) || 0,
    balanceCents: Number(md.balance_cents) || 0,
    invoice: md.cfdi_rfc ? { rfc: md.cfdi_rfc, razonSocial: md.cfdi_razon_social || '', usoCfdi: md.cfdi_uso || '' } : null,
    method: usedMethod,
    installments: card?.installments?.plan?.count || 1,
    cardLast4: card?.last4 || '',
    cardBrand: card?.brand || '',
    pending,
    error: lastError ? { code: lastError.code || lastError.decline_code, message: lastError.message } : null,
    createdAt: new Date(pi.created * 1000).toISOString()
  };
}

/** Versión pública del token simulado (sin campos internos). */
export function orderFromSimulated(session) {
  return {
    mode: 'simulated',
    orderId: session.orderId,
    paymentIntentId: `pi_sim_${session.orderId}`,
    status: session.status,
    amountCents: session.amountCents,
    currency: session.currency,
    items: session.items,
    plan: session.plan,
    category: session.category,
    customer: session.customer,
    meta: session.meta || {},
    subtotalCents: session.subtotalCents || session.amountCents,
    couponCode: session.couponCode || '',
    couponDiscountCents: session.couponDiscountCents || 0,
    balanceCents: session.balanceCents || 0,
    invoice: session.billing ? { rfc: session.billing.rfc, razonSocial: session.billing.razonSocial, usoCfdi: session.billing.usoCfdi } : null,
    method: session.method || '',
    installments: session.installments || 1,
    cardLast4: session.cardLast4 || '',
    cardBrand: session.cardBrand || '',
    pending: session.pending || null,
    error: session.error || null,
    paidAt: session.paidAt || null,
    createdAt: session.createdAt
  };
}

export function parseStripeClientSecret(secret) {
  const m = /^(pi_[A-Za-z0-9]+)_secret_[A-Za-z0-9]+$/.exec(String(secret || ''));
  return m ? m[1] : null;
}
