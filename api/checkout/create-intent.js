/**
 * POST /api/checkout/create-intent
 * ----------------------------------------------------------------
 * Crea la intención de pago de una orden.
 *  - Recalcula el total con el catálogo del servidor (ignora montos
 *    enviados por el navegador).
 *  - Modo Stripe: crea Customer + PaymentIntent (tarjeta con MSI,
 *    SPEI por transferencia y OXXO, según lo habilitado en Stripe).
 *  - Modo simulado: devuelve una sesión firmada con HMAC.
 *
 * Body: { items: string[], plan?: string, customer: {name,email,phone},
 *         billing?: {required, rfc, razonSocial, regimen, usoCfdi, cp},
 *         meta?: object, tracking?: {fbp, fbc, sourceUrl} }
 */

import { priceCart } from '../../src/checkout/catalog.js';
import {
  applyCors,
  sendJson,
  readJsonBody,
  getGatewayMode,
  isSimulatedAllowed,
  getPublishableKey,
  getStripe,
  generateOrderId,
  validateCustomer,
  validateBilling,
  sanitizeMeta,
  signToken,
  getClientIp
} from '../_lib/checkout.js';

const trim = (v, n) => String(v ?? '').slice(0, n);

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });
  if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Método no permitido.' });

  let body;
  try {
    body = await readJsonBody(req);
  } catch (err) {
    return sendJson(res, 400, { ok: false, error: 'Solicitud inválida.' });
  }

  // 1. Precio autoritativo
  const pricing = priceCart({ items: body.items, plan: body.plan });
  if (!pricing.ok) return sendJson(res, 400, { ok: false, code: 'invalid_cart', error: pricing.error });

  // 2. Datos del cliente y facturación
  const { customer, errors: customerErrors, valid: customerValid } = validateCustomer(body.customer);
  const { billing, errors: billingErrors, valid: billingValid } = validateBilling(body.billing);
  if (!customerValid || !billingValid) {
    return sendJson(res, 422, {
      ok: false,
      code: 'validation_error',
      error: 'Revisa los datos marcados.',
      fields: { ...customerErrors, ...billingErrors }
    });
  }

  const meta = sanitizeMeta(body.meta);
  const tracking = {
    fbp: trim(body.tracking?.fbp, 120),
    fbc: trim(body.tracking?.fbc, 200),
    sourceUrl: trim(body.tracking?.sourceUrl, 400),
    ip: trim(getClientIp(req), 60),
    ua: trim(req.headers?.['user-agent'], 400)
  };

  const mode = getGatewayMode();
  const orderId = generateOrderId(pricing.folioPrefix);
  const publicPricing = {
    lines: pricing.lines,
    subtotalCents: pricing.subtotalCents,
    discountCents: pricing.discountCents,
    balanceCents: pricing.balanceCents,
    totalCents: pricing.totalCents,
    ivaCents: pricing.ivaCents,
    plan: pricing.plan,
    planLabel: pricing.planLabel,
    currency: pricing.currency
  };

  // 3a. Modo simulado
  if (mode === 'simulated') {
    if (!isSimulatedAllowed()) {
      return sendJson(res, 503, {
        ok: false,
        code: 'gateway_not_configured',
        error: 'La pasarela de pago está en configuración. Completa tu orden por WhatsApp y un asesor te enviará el enlace de pago.'
      });
    }
    const now = Date.now();
    const clientSecret = signToken({
      v: 1,
      orderId,
      status: 'requires_payment_method',
      amountCents: pricing.totalCents,
      currency: pricing.currency,
      items: pricing.items,
      plan: pricing.plan,
      category: pricing.category,
      customer,
      billing,
      meta,
      tracking,
      createdAt: new Date(now).toISOString(),
      expiresAt: now + 24 * 60 * 60 * 1000
    });
    return sendJson(res, 200, { ok: true, mode, orderId, clientSecret, pricing: publicPricing });
  }

  // 3b. Stripe (test o live)
  try {
    const stripe = getStripe();
    const stripeCustomer = await stripe.customers.create(
      {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        metadata: { source: 'dilo-checkout', order_id: orderId }
      },
      { idempotencyKey: `cus_${orderId}` }
    );

    const metadata = {
      order_id: orderId,
      items: pricing.items.join(',').slice(0, 500),
      plan: pricing.plan,
      category: pricing.category,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      brand_name: meta.brandName || '',
      fbp: tracking.fbp,
      fbc: tracking.fbc,
      client_ip: tracking.ip,
      user_agent: tracking.ua,
      source_url: tracking.sourceUrl
    };
    if (billing) {
      Object.assign(metadata, {
        cfdi_rfc: billing.rfc,
        cfdi_razon_social: billing.razonSocial,
        cfdi_regimen: billing.regimen,
        cfdi_uso: billing.usoCfdi,
        cfdi_cp: billing.cp
      });
    }
    for (const [k, v] of Object.entries(meta)) {
      if (Object.keys(metadata).length >= 45) break;
      metadata[`meta_${k}`.slice(0, 40)] = v;
    }

    const baseParams = {
      amount: pricing.totalCents,
      currency: pricing.currency,
      customer: stripeCustomer.id,
      receipt_email: customer.email,
      description: `${pricing.primaryName} · ${orderId}`,
      automatic_payment_methods: { enabled: true },
      metadata
    };

    const fullOptions = {
      card: { installments: { enabled: true } },
      customer_balance: {
        funding_type: 'bank_transfer',
        bank_transfer: { type: 'mx_bank_transfer' }
      },
      oxxo: { expires_after_days: 3 }
    };

    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create(
        { ...baseParams, payment_method_options: fullOptions },
        { idempotencyKey: `pi_${orderId}` }
      );
    } catch (err) {
      // Si la cuenta aún no tiene SPEI/OXXO habilitados, reintenta solo con tarjeta + MSI
      if (err?.type === 'StripeInvalidRequestError' && /payment_method_options|customer_balance|oxxo/i.test(err.message || '')) {
        console.warn('[Dilo Checkout] Reintentando sin SPEI/OXXO:', err.message);
        paymentIntent = await stripe.paymentIntents.create(
          { ...baseParams, payment_method_options: { card: { installments: { enabled: true } } } },
          { idempotencyKey: `pi_${orderId}_card` }
        );
      } else {
        throw err;
      }
    }

    return sendJson(res, 200, {
      ok: true,
      mode,
      orderId,
      publishableKey: getPublishableKey(),
      clientSecret: paymentIntent.client_secret,
      pricing: publicPricing
    });
  } catch (err) {
    console.error('[Dilo Checkout] Error creando PaymentIntent:', err?.message || err);
    return sendJson(res, 502, {
      ok: false,
      code: 'gateway_error',
      error: 'No pudimos conectar con la pasarela de pago. Intenta de nuevo en unos segundos.'
    });
  }
}
