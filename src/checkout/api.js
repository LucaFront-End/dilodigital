/**
 * DILO CHECKOUT — Cliente HTTP de /api/checkout/*
 * Maneja timeouts y errores de red con mensajes en español.
 */

export class CheckoutApiError extends Error {
  constructor(message, { status = 0, code = 'network_error', fields = null } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

async function request(path, { method = 'GET', body, timeoutMs = 25000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: 'same-origin'
    });
  } catch (err) {
    throw new CheckoutApiError(
      err?.name === 'AbortError'
        ? 'La conexión tardó demasiado. Revisa tu internet e intenta de nuevo.'
        : 'No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.'
    );
  } finally {
    clearTimeout(timer);
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* respuesta no JSON */
  }

  if (!res.ok || !json || json.ok === false) {
    throw new CheckoutApiError(json?.error || 'Ocurrió un error inesperado. Intenta de nuevo.', {
      status: res.status,
      code: json?.code || 'server_error',
      fields: json?.fields || null
    });
  }
  return json;
}

export const checkoutApi = {
  config: () => request('/api/checkout/config'),
  quote: (body) => request('/api/checkout/quote', { method: 'POST', body, timeoutMs: 15000 }),
  createIntent: (body) => request('/api/checkout/create-intent', { method: 'POST', body }),
  simulate: (body) => request('/api/checkout/simulate-payment', { method: 'POST', body }),
  orderStatus: (clientSecret) =>
    request(`/api/checkout/order-status?client_secret=${encodeURIComponent(clientSecret)}`)
};
