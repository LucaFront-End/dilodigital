/** DILO CHECKOUT — utilidades de UI compartidas */

export { formatMXN } from './catalog.js';

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const svg = (paths, size = 18, extra = '') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${paths}</svg>`;

export const icons = {
  lock: (s) => svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', s),
  card: (s) => svg('<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>', s),
  bank: (s) => svg('<path d="M3 10h18L12 4 3 10z"/><line x1="5" y1="10" x2="5" y2="18"/><line x1="9.5" y1="10" x2="9.5" y2="18"/><line x1="14.5" y1="10" x2="14.5" y2="18"/><line x1="19" y1="10" x2="19" y2="18"/><line x1="3" y1="20" x2="21" y2="20"/>', s),
  store: (s) => svg('<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z"/><path d="M5 13v7h14v-7"/>', s),
  check: (s) => svg('<polyline points="20 6 9 17 4 12"/>', s),
  shield: (s) => svg('<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><polyline points="9 12 11 14 15 10"/>', s),
  arrowLeft: (s) => svg('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>', s),
  arrowRight: (s) => svg('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', s),
  copy: (s) => svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', s),
  edit: (s) => svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>', s),
  alert: (s) => svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', s),
  clock: (s) => svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', s),
  receipt: (s) => svg('<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 1V2l-1 1-3-2-3 2-3-2-3 2-3-2z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/>', s),
  flask: (s) => svg('<path d="M9 2h6"/><path d="M10 2v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 8V2"/><line x1="7" y1="15" x2="17" y2="15"/>', s),
  whatsapp: (s = 18) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 1 1 8.32 4.6zm8.36-18.2A11.8 11.8 0 0 0 1.84 17.84L.17 24l6.3-1.65a11.8 11.8 0 0 0 5.57 1.42h.01c6.52 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.13-3.47-8.36z"/></svg>`
};

export function copyToClipboard(text, button) {
  const done = () => {
    if (!button) return;
    const original = button.dataset.label || button.innerHTML;
    button.dataset.label = original;
    button.classList.add('is-copied');
    button.innerHTML = `${icons.check(14)} Copiado`;
    setTimeout(() => {
      button.classList.remove('is-copied');
      button.innerHTML = original;
    }, 1800);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done, done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {}
    ta.remove();
    done();
  }
}

export const MSI_MIN_CENTS = { 3: 30000, 6: 60000, 9: 90000, 12: 120000 };

export function availableInstallments(totalCents) {
  return [3, 6, 9, 12].filter((m) => totalCents >= MSI_MIN_CENTS[m]);
}
