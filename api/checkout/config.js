/**
 * GET /api/checkout/config
 * Configuración pública del checkout. Permite cambiar de modo simulado
 * a Stripe (test/live) solo con variables de entorno, sin recompilar.
 */

import {
  applyCors,
  sendJson,
  getGatewayMode,
  isSimulatedAllowed,
  getPublishableKey,
  isCapiConfigured,
  couponsEnabled
} from '../_lib/checkout.js';

export default function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true });
  const mode = getGatewayMode();
  const available = mode !== 'simulated' || isSimulatedAllowed();
  return sendJson(res, 200, {
    ok: true,
    mode,
    available,
    publishableKey: mode === 'simulated' ? null : getPublishableKey(),
    serverTracking: isCapiConfigured(),
    couponsEnabled: available && couponsEnabled(),
    supportWhatsApp: (process.env.CHECKOUT_SUPPORT_WHATSAPP || '525592441070').replace(/\D/g, '')
  });
}
