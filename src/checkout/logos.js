/**
 * DILO CHECKOUT — insignias SVG de métodos de pago (sin dependencias).
 * Uso: paymentLogo('visa') → string SVG (38×24 por defecto).
 */

const W = 38;
const H = 24;

const frame = (inner, { bg = '#fff', stroke = '#E3E6ED' } = {}) =>
  `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="4.5" fill="${bg}" stroke="${stroke}"/>${inner}`;

const LOGOS = {
  visa: () =>
    frame(
      `<text x="19" y="16.2" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10.5" font-weight="900" font-style="italic" letter-spacing="-0.2" fill="#1A1F71">VISA</text>`
    ),
  mastercard: () =>
    frame(
      `<circle cx="15.5" cy="12" r="6.6" fill="#EB001B"/><circle cx="22.5" cy="12" r="6.6" fill="#F79E1B"/><path d="M19 6.4a6.6 6.6 0 0 1 0 11.2 6.6 6.6 0 0 1 0-11.2z" fill="#FF5F00"/>`
    ),
  amex: () =>
    frame(
      `<text x="19" y="15.6" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8.6" font-weight="900" letter-spacing="0.3" fill="#fff">AMEX</text>`,
      { bg: '#1F72CD', stroke: '#1F72CD' }
    ),
  spei: () =>
    frame(
      `<text x="19" y="15.6" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8.6" font-weight="900" letter-spacing="0.6" fill="#fff">SPEI</text>`,
      { bg: '#0F2D52', stroke: '#0F2D52' }
    ),
  oxxo: () =>
    frame(
      `<rect x="1" y="3.2" width="36" height="1.8" fill="#FFC20E"/><rect x="1" y="19" width="36" height="1.8" fill="#FFC20E"/><text x="19" y="15.4" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8.4" font-weight="900" letter-spacing="0.4" fill="#fff">OXXO</text>`,
      { bg: '#E30613', stroke: '#E30613' }
    )
};

export const PAYMENT_LOGO_LABELS = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  spei: 'Transferencia SPEI',
  oxxo: 'Efectivo en OXXO'
};

export function paymentLogo(name, { width = W, title = true } = {}) {
  const draw = LOGOS[name];
  if (!draw) return '';
  const height = Math.round((width * H) / W);
  const label = PAYMENT_LOGO_LABELS[name] || name;
  return `<svg class="dco-paylogo" data-logo="${name}" width="${width}" height="${height}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${title ? `<title>${label}</title>` : ''}${draw()}</svg>`;
}

export function paymentLogos(names = ['visa', 'mastercard', 'amex', 'spei', 'oxxo'], opts) {
  return names.map((n) => paymentLogo(n, opts)).join('');
}
