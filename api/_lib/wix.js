/**
 * ================================================================
 * DILO CHECKOUT — Registro de órdenes en Wix CMS (best-effort)
 * Guarda pagos confirmados en la colección "Contacto" que ya usa el
 * resto del sitio. Nunca lanza excepciones.
 * ================================================================
 */

import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const COLLECTION = 'Contacto';

async function getClient() {
  const siteId = process.env.VITE_WIX_SITE_ID;
  const apiKey = process.env.VITE_WIX_API_KEY;
  if (apiKey && siteId) {
    return createClient({ modules: { items }, auth: ApiKeyStrategy({ siteId, apiKey }) });
  }
  const client = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: process.env.VITE_WIX_CLIENT_ID || '2db3573e-2635-43b6-939b-8d52f78f8de9' })
  });
  const tokens = await client.auth.generateVisitorTokens();
  await client.auth.setTokens(tokens);
  return client;
}

export async function recordOrderInWix(order, label = 'Pago confirmado') {
  if (process.env.CHECKOUT_SKIP_WIX === 'true') return false; // pruebas automatizadas
  try {
    const client = await getClient();
    await client.items.insert(COLLECTION, {
      title: `${order.meta?.brandName || order.orderId} — ${order.customer?.name || 'Cliente'} [${label}]`,
      nombre: order.customer?.name || '',
      telefono: order.customer?.phone || '',
      email: order.customer?.email || '',
      marca: order.meta?.brandName || '',
      tipo: label,
      escenario: order.status,
      mensaje: `Orden ${order.orderId} · ${(order.amountCents / 100).toFixed(2)} ${String(order.currency).toUpperCase()} · ${order.items.join(', ')} · Método: ${order.method}`,
      origen: 'Dilo Checkout',
      fecha: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.warn('[Dilo Checkout] No se pudo registrar la orden en Wix:', err?.message || err);
    return false;
  }
}
