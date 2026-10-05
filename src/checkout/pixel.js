/**
 * ================================================================
 * DILO CHECKOUT — META PIXEL (navegador)
 * ----------------------------------------------------------------
 * - Carga el Pixel solo si existe VITE_META_PIXEL_ID.
 * - Todos los eventos quedan registrados en window.__diloPixelLog
 *   (útil para QA aunque el Pixel no esté configurado).
 * - Purchase usa eventID = folio de la orden, el mismo que envía el
 *   servidor por Conversions API → Meta deduplica y cuenta 1 compra.
 * - Las compras en modo prueba se envían como "TestPurchase" para no
 *   contaminar la optimización de campañas.
 * ================================================================
 */

const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID || '').trim();
let initialized = false;

if (typeof window !== 'undefined') {
  window.__diloPixelLog = window.__diloPixelLog || [];
}

function readCookie(name) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : '';
}

function writeCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/** Captura fbclid aunque venga dentro del hash (#/ruta?fbclid=...). */
function captureFbclid() {
  const fromSearch = new URLSearchParams(window.location.search).get('fbclid');
  const hashQuery = window.location.hash.split('?')[1] || '';
  const fbclid = fromSearch || new URLSearchParams(hashQuery).get('fbclid');
  if (fbclid && !readCookie('_fbc')) {
    writeCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, 90);
  }
}

export function isPixelEnabled() {
  return Boolean(PIXEL_ID);
}

export function initPixel() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  captureFbclid();

  if (!PIXEL_ID) {
    console.info('[Dilo Pixel] VITE_META_PIXEL_ID no configurado: eventos solo en window.__diloPixelLog.');
    return;
  }

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', PIXEL_ID);
}

/**
 * Advanced Matching: el Pixel hashea (SHA-256) estos datos en el
 * navegador antes de enviarlos. Mejora la atribución en iOS.
 */
export function setPixelUserData({ email, phone, name } = {}) {
  if (!PIXEL_ID || !window.fbq) return;
  const [fn, ...rest] = String(name || '').trim().toLowerCase().split(/\s+/);
  const digits = String(phone || '').replace(/\D/g, '');
  const userData = {};
  if (email) userData.em = String(email).trim().toLowerCase();
  if (digits) userData.ph = digits.length === 10 ? `52${digits}` : digits;
  if (fn) userData.fn = fn;
  if (rest.length) userData.ln = rest.join(' ');
  window.fbq('init', PIXEL_ID, userData);
}

export function trackPixel(event, params = {}, { eventId, test = false } = {}) {
  const entry = { event, params, eventId: eventId || null, test, at: new Date().toISOString() };
  window.__diloPixelLog.push(entry);
  window.dispatchEvent(new CustomEvent('dilo:pixel', { detail: entry }));

  if (!PIXEL_ID || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  if (test && event === 'Purchase') {
    window.fbq('trackCustom', 'TestPurchase', params, opts);
    return;
  }
  window.fbq('track', event, params, opts);
}

export function trackPageView() {
  trackPixel('PageView', { path: window.location.hash || '#/' });
}

export function getTrackingContext() {
  return {
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc'),
    sourceUrl: window.location.href.split('#')[0] + (window.location.hash.split('?')[0] || '')
  };
}
