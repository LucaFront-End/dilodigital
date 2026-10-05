/**
 * POST /api/checkout/simulate-payment
 * ----------------------------------------------------------------
 * Pasarela simulada (solo disponible cuando NO hay claves de Stripe).
 * Replica el comportamiento de las tarjetas de prueba oficiales de
 * Stripe para que el flujo completo se pueda probar de punta a punta:
 *
 *   4242 4242 4242 4242  → Aprobada (Visa)
 *   4000 0048 4000 8001  → Aprobada (Visa México)
 *   5555 5555 5555 4444  → Aprobada (Mastercard)
 *   3782 822463 10005    → Aprobada (Amex, CVC de 4 dígitos)
 *   4000 0025 0000 3155  → Requiere autenticación 3D Secure
 *   4000 0000 0000 0002  → Rechazada (genérico)
 *   4000 0000 0000 9995  → Rechazada (fondos insuficientes)
 *   4000 0000 0000 0069  → Rechazada (tarjeta vencida)
 *   4000 0000 0000 0127  → Rechazada (CVC incorrecto)
 *
 * Acciones: pay_card | confirm_3ds | pay_spei | pay_oxxo | simulate_funds_received
 */

import crypto from 'node:crypto';
import { PRODUCTS } from '../../src/checkout/catalog.js';
import {
  applyCors,
  sendJson,
  readJsonBody,
  getGatewayMode,
  isSimulatedAllowed,
  signToken,
  verifyToken,
  orderFromSimulated,
  sendCapiEvent
} from '../_lib/checkout.js';

const TEST_CARDS = {
  '4242424242424242': { outcome: 'success', brand: 'visa' },
  '4000004840008001': { outcome: 'success', brand: 'visa' },
  '5555555555554444': { outcome: 'success', brand: 'mastercard' },
  '378282246310005': { outcome: 'success', brand: 'amex' },
  '4000002500003155': { outcome: '3ds', brand: 'visa' },
  '4000002760003184': { outcome: '3ds', brand: 'visa' },
  '4000000000000002': { outcome: 'decline', brand: 'visa', code: 'card_declined', message: 'Tu tarjeta fue rechazada. Intenta con otra tarjeta o método de pago.' },
  '4000000000009995': { outcome: 'decline', brand: 'visa', code: 'insufficient_funds', message: 'Tu tarjeta no tiene fondos suficientes.' },
  '4000000000000069': { outcome: 'decline', brand: 'visa', code: 'expired_card', message: 'Tu tarjeta está vencida.' },
  '4000000000000127': { outcome: 'decline', brand: 'visa', code: 'incorrect_cvc', message: 'El código de seguridad (CVC) es incorrecto.' }
};

// Montos mínimos de Stripe México para meses sin intereses (en centavos)
const MSI_MIN = { 3: 30000, 6: 60000, 9: 90000, 12: 120000 };

function luhn(num) {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

function detectBrand(num) {
  if (/^4/.test(num)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  return 'unknown';
}

/** CLABE de 18 dígitos con dígito verificador válido (pesos 3-7-1). */
function buildClabe(seed) {
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  let digits = '646180';
  for (let i = 0; digits.length < 17; i++) digits += String(parseInt(hash[i], 16) % 10);
  const weights = [3, 7, 1];
  const sum = digits.split('').reduce((acc, d, i) => acc + ((Number(d) * weights[i % 3]) % 10), 0);
  return digits + String((10 - (sum % 10)) % 10);
}

const fail = (res, status, code, error) => sendJson(res, status, { ok: false, code, error });

function respond(res, session) {
  return sendJson(res, 200, { ok: true, clientSecret: signToken(session), order: orderFromSimulated(session) });
}

async function markPaid(session, extra = {}) {
  const paid = { ...session, ...extra, status: 'succeeded', pending: null, error: null, paidAt: new Date().toISOString() };
  // Mismo evento que enviaría el webhook real (como Test Event)
  await sendCapiEvent({
    eventName: 'Purchase',
    eventId: paid.orderId,
    valueCents: paid.amountCents,
    currency: paid.currency,
    contentIds: paid.items,
    contentName: PRODUCTS[paid.items[0]]?.name || '',
    email: paid.customer?.email,
    phone: paid.customer?.phone,
    fbp: paid.tracking?.fbp,
    fbc: paid.tracking?.fbc,
    clientIp: paid.tracking?.ip,
    userAgent: paid.tracking?.ua,
    sourceUrl: paid.tracking?.sourceUrl,
    isTest: true
  });
  return paid;
}

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });
  if (req.method !== 'POST') return fail(res, 405, 'method_not_allowed', 'Método no permitido.');

  if (getGatewayMode() !== 'simulated' || !isSimulatedAllowed()) {
    return fail(res, 403, 'simulation_disabled', 'La simulación está deshabilitada: la pasarela real está activa.');
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return fail(res, 400, 'bad_request', 'Solicitud inválida.');
  }

  const session = verifyToken(body.clientSecret);
  if (!session) return fail(res, 400, 'invalid_session', 'La sesión de pago no es válida. Recarga la página.');
  if (session.expiresAt && Date.now() > session.expiresAt) {
    return fail(res, 410, 'session_expired', 'La sesión de pago expiró. Vuelve a iniciar el checkout.');
  }
  if (session.status === 'succeeded') return respond(res, session);

  const action = String(body.action || '');

  // ── Tarjeta ───────────────────────────────────────────────────
  if (action === 'pay_card') {
    if (session.status !== 'requires_payment_method') {
      return fail(res, 409, 'invalid_state', 'Este pago ya está en proceso.');
    }
    const card = body.card || {};
    const number = String(card.number || '').replace(/\D/g, '');
    const [mm, yy] = String(card.exp || '').split('/').map((s) => Number(s));
    const cvc = String(card.cvc || '').replace(/\D/g, '');
    const name = String(card.name || '').trim();
    const brand = detectBrand(number);
    const declined = (code, message) =>
      respond(res, { ...session, status: 'requires_payment_method', error: { code, message } });

    if (number.length < 13 || number.length > 19 || !luhn(number)) {
      return declined('incorrect_number', 'El número de tarjeta no es válido.');
    }
    const now = new Date();
    const expYear = 2000 + (yy || 0);
    if (!mm || mm < 1 || mm > 12 || !yy || expYear < now.getFullYear() || (expYear === now.getFullYear() && mm < now.getMonth() + 1)) {
      return declined('invalid_expiry', 'La fecha de vencimiento no es válida.');
    }
    if (cvc.length !== (brand === 'amex' ? 4 : 3)) {
      return declined('invalid_cvc', 'El código de seguridad no es válido.');
    }
    if (name.length < 3) return declined('invalid_name', 'Ingresa el nombre como aparece en la tarjeta.');

    let installments = Number(body.installments) || 1;
    if (installments !== 1 && (!MSI_MIN[installments] || session.amountCents < MSI_MIN[installments] || brand === 'amex')) {
      return declined('installments_unavailable', 'Ese plan de meses sin intereses no está disponible para este monto o tarjeta.');
    }

    const test = TEST_CARDS[number];
    if (!test) {
      return declined('test_mode_live_card', 'Estás en modo prueba: usa una tarjeta de prueba (ej. 4242 4242 4242 4242). No se aceptan tarjetas reales.');
    }

    const cardInfo = { method: 'card', cardLast4: number.slice(-4), cardBrand: test.brand || brand, installments };
    if (test.outcome === 'decline') return declined(test.code, test.message);
    if (test.outcome === '3ds') {
      return respond(res, { ...session, ...cardInfo, status: 'requires_action', error: null, pending: { method: 'card_3ds' } });
    }
    return respond(res, await markPaid(session, cardInfo));
  }

  if (action === 'confirm_3ds') {
    if (session.status !== 'requires_action' || session.pending?.method !== 'card_3ds') {
      return fail(res, 409, 'invalid_state', 'No hay una autenticación pendiente.');
    }
    if (body.approve === true) return respond(res, await markPaid(session));
    return respond(res, {
      ...session,
      status: 'requires_payment_method',
      pending: null,
      error: { code: 'payment_intent_authentication_failure', message: 'No se pudo autenticar el pago con tu banco. Intenta de nuevo o usa otro método.' }
    });
  }

  // ── SPEI ──────────────────────────────────────────────────────
  if (action === 'pay_spei') {
    if (session.status !== 'requires_payment_method') return fail(res, 409, 'invalid_state', 'Este pago ya está en proceso.');
    return respond(res, {
      ...session,
      method: 'customer_balance',
      status: 'requires_action',
      error: null,
      pending: {
        method: 'spei',
        clabe: buildClabe(session.orderId),
        bankName: 'STP (simulado)',
        beneficiary: 'Dilo Digital',
        reference: session.orderId,
        amountCents: session.amountCents,
        instructionsUrl: ''
      }
    });
  }

  // ── OXXO ──────────────────────────────────────────────────────
  if (action === 'pay_oxxo') {
    if (session.status !== 'requires_payment_method') return fail(res, 409, 'invalid_state', 'Este pago ya está en proceso.');
    if (session.amountCents > 1000000) {
      return respond(res, { ...session, error: { code: 'amount_too_large', message: 'OXXO acepta pagos de hasta $10,000 MXN. Elige tarjeta o SPEI.' } });
    }
    const ref = crypto.createHash('sha256').update(`oxxo-${session.orderId}`).digest('hex').replace(/\D/g, '').padEnd(14, '0').slice(0, 14);
    return respond(res, {
      ...session,
      method: 'oxxo',
      status: 'requires_action',
      error: null,
      pending: {
        method: 'oxxo',
        reference: ref,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        voucherUrl: '',
        amountCents: session.amountCents
      }
    });
  }

  // ── Simula la notificación del banco (equivalente al webhook) ──
  if (action === 'simulate_funds_received') {
    if (session.status !== 'requires_action' || !['spei', 'oxxo'].includes(session.pending?.method)) {
      return fail(res, 409, 'invalid_state', 'No hay un pago por transferencia u OXXO pendiente.');
    }
    return respond(res, await markPaid(session));
  }

  return fail(res, 400, 'unknown_action', 'Acción no reconocida.');
}
