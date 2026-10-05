/**
 * POST /api/checkout/quote
 * ----------------------------------------------------------------
 * Cotiza un carrito con el catálogo del servidor (incluye cupones,
 * que el navegador no conoce). No crea ningún cobro.
 *
 * Body: { items: string[], plan?: string, coupon?: string }
 * 200 → { ok, pricing }
 * 400 → carrito inválido · 422 → cupón inválido (fields.coupon)
 */

import { priceCart } from '../../src/checkout/catalog.js';
import { applyCors, sendJson, readJsonBody, getCoupons, publicPricing } from '../_lib/checkout.js';

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });
  if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Método no permitido.' });

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, code: 'bad_request', error: 'Solicitud inválida.' });
  }

  const pricing = priceCart({ items: body.items, plan: body.plan, coupon: body.coupon, coupons: getCoupons() });
  if (!pricing.ok) return sendJson(res, 400, { ok: false, code: 'invalid_cart', error: pricing.error });

  if (body.coupon && pricing.couponError) {
    return sendJson(res, 422, {
      ok: false,
      code: 'invalid_coupon',
      error: pricing.couponError,
      fields: { coupon: pricing.couponError }
    });
  }

  return sendJson(res, 200, { ok: true, pricing: publicPricing(pricing) });
}
