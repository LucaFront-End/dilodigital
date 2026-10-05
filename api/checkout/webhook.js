/**
 * POST /api/checkout/webhook   (configurar en Stripe → Developers → Webhooks)
 * ----------------------------------------------------------------
 * Eventos a suscribir:
 *   payment_intent.succeeded, payment_intent.processing,
 *   payment_intent.requires_action, payment_intent.payment_failed
 *
 * Es la fuente de verdad del pago. En SPEI y OXXO el dinero llega horas
 * después, normalmente con el navegador del cliente ya cerrado: este
 * webhook envía el evento Purchase a Meta Conversions API con el mismo
 * event_id que usa el Pixel, así la conversión se atribuye igual.
 */

import { PRODUCTS } from '../../src/checkout/catalog.js';
import {
  sendJson,
  readRawBody,
  getGatewayMode,
  getStripe,
  orderFromPaymentIntent,
  sendCapiEvent
} from '../_lib/checkout.js';
import { recordOrderInWix } from '../_lib/wix.js';

// Vercel: necesitamos el cuerpo crudo para verificar la firma de Stripe
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método no permitido.' });

  const mode = getGatewayMode();
  const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || '').trim();
  if (mode === 'simulated' || !webhookSecret) {
    return sendJson(res, 503, { error: 'Webhook no configurado (faltan STRIPE_SECRET_KEY o STRIPE_WEBHOOK_SECRET).' });
  }

  let event;
  try {
    const raw = await readRawBody(req);
    event = getStripe().webhooks.constructEvent(raw, req.headers['stripe-signature'], webhookSecret);
  } catch (err) {
    console.warn('[Dilo Checkout] Firma de webhook inválida:', err?.message || err);
    return sendJson(res, 400, { error: 'Firma inválida.' });
  }

  const pi = event.data?.object;
  if (!pi || pi.object !== 'payment_intent') return sendJson(res, 200, { received: true, ignored: event.type });

  const order = orderFromPaymentIntent(pi, mode);
  const md = pi.metadata || {};

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const capi = await sendCapiEvent({
          eventName: 'Purchase',
          eventId: order.orderId,
          valueCents: pi.amount_received || pi.amount,
          currency: pi.currency,
          contentIds: order.items,
          contentName: PRODUCTS[order.items[0]]?.name || '',
          email: order.customer.email,
          phone: order.customer.phone,
          fbp: md.fbp,
          fbc: md.fbc,
          clientIp: md.client_ip,
          userAgent: md.user_agent,
          sourceUrl: md.source_url,
          isTest: !event.livemode
        });
        await recordOrderInWix(order, 'Pago confirmado');
        console.log(`[Dilo Checkout] ✅ Pago confirmado ${order.orderId} (${pi.amount / 100} ${pi.currency}) · CAPI:`, capi);
        break;
      }
      case 'payment_intent.requires_action':
        if (order.pending) await recordOrderInWix(order, `Pago pendiente ${order.pending.method.toUpperCase()}`);
        console.log(`[Dilo Checkout] ⏳ Esperando pago ${order.pending?.method || ''} ${order.orderId}`);
        break;
      case 'payment_intent.processing':
        console.log(`[Dilo Checkout] ⏳ Procesando ${order.orderId}`);
        break;
      case 'payment_intent.payment_failed':
        console.log(`[Dilo Checkout] ❌ Pago fallido ${order.orderId}:`, order.error?.message);
        break;
      default:
        break;
    }
  } catch (err) {
    // Respondemos 200 igualmente: el pago ya ocurrió en Stripe y no
    // queremos reintentos infinitos por un fallo de tracking/CRM.
    console.error('[Dilo Checkout] Error procesando webhook:', err?.message || err);
  }

  return sendJson(res, 200, { received: true });
}
