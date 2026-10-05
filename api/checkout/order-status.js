/**
 * GET /api/checkout/order-status?client_secret=...
 * ----------------------------------------------------------------
 * Devuelve el estado normalizado de una orden. El client_secret actúa
 * como credencial: solo quien inició el pago puede consultarlo.
 *
 * Estados: succeeded | processing | requires_action (SPEI/OXXO pendiente
 * o 3DS) | requires_payment_method (rechazado o sin pagar) | canceled
 */

import {
  applyCors,
  sendJson,
  getGatewayMode,
  getStripe,
  verifyToken,
  orderFromSimulated,
  orderFromPaymentIntent,
  parseStripeClientSecret
} from '../_lib/checkout.js';

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });
  if (req.method !== 'GET') return sendJson(res, 405, { ok: false, error: 'Método no permitido.' });

  const url = new URL(req.url, 'http://localhost');
  const secret = req.query?.client_secret || url.searchParams.get('client_secret') || '';

  if (secret.startsWith('sim_')) {
    const session = verifyToken(secret);
    if (!session) return sendJson(res, 404, { ok: false, code: 'not_found', error: 'Orden no encontrada.' });
    return sendJson(res, 200, { ok: true, order: orderFromSimulated(session) });
  }

  const piId = parseStripeClientSecret(secret);
  if (!piId) return sendJson(res, 400, { ok: false, code: 'bad_request', error: 'Referencia de pago inválida.' });

  const mode = getGatewayMode();
  if (mode === 'simulated') {
    return sendJson(res, 503, { ok: false, code: 'gateway_not_configured', error: 'Pasarela no configurada.' });
  }

  try {
    const pi = await getStripe().paymentIntents.retrieve(piId, { expand: ['latest_charge'] });
    if (pi.client_secret !== secret) {
      return sendJson(res, 404, { ok: false, code: 'not_found', error: 'Orden no encontrada.' });
    }
    return sendJson(res, 200, { ok: true, order: orderFromPaymentIntent(pi, mode) });
  } catch (err) {
    console.error('[Dilo Checkout] Error consultando PaymentIntent:', err?.message || err);
    const notFound = err?.statusCode === 404;
    return sendJson(res, notFound ? 404 : 502, {
      ok: false,
      code: notFound ? 'not_found' : 'gateway_error',
      error: notFound ? 'Orden no encontrada.' : 'No pudimos consultar el estado del pago.'
    });
  }
}
