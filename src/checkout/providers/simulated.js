/**
 * ================================================================
 * DILO CHECKOUT — PROVEEDOR SIMULADO
 * ----------------------------------------------------------------
 * Misma interfaz que el proveedor de Stripe:
 *   { onMethodChange(cb), getMethod(), confirm(), destroy() }
 * confirm() → { status, order, clientSecret, message }
 * ================================================================
 */

import { checkoutApi } from '../api.js';
import { esc, icons, formatMXN, availableInstallments } from '../ui.js';
import { paymentLogo, paymentLogos } from '../logos.js';

const OXXO_MAX_CENTS = 1000000;

function luhn(num) {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

function detectBrand(num) {
  if (/^4/.test(num)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  return '';
}

const BRAND_LABEL = { visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express' };

function formatCardNumber(digits, brand) {
  if (brand === 'amex') return digits.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '));
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/** Modal de autenticación 3D Secure simulado. Resuelve true/false. */
function ask3DS(amountLabel) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'dco-3ds-overlay';
    overlay.innerHTML = `
      <div class="dco-3ds-modal" role="dialog" aria-modal="true" aria-labelledby="dco-3ds-title">
        <div class="dco-3ds-bank">${icons.shield(22)} <span>Banco emisor · Verificación segura</span></div>
        <h3 id="dco-3ds-title">Autoriza tu compra</h3>
        <p>Tu banco solicita confirmar un cargo de <strong>${esc(amountLabel)}</strong> a <strong>Dilo Digital</strong>.</p>
        <p class="dco-3ds-note">${icons.flask(14)} Simulación de 3D Secure (modo prueba)</p>
        <div class="dco-3ds-actions">
          <button type="button" class="dco-btn dco-btn-ghost" id="dco-3ds-reject">Rechazar</button>
          <button type="button" class="dco-btn dco-btn-primary" id="dco-3ds-approve">Autorizar pago</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    const close = (value) => {
      overlay.classList.remove('is-visible');
      setTimeout(() => overlay.remove(), 200);
      resolve(value);
    };
    overlay.querySelector('#dco-3ds-approve').addEventListener('click', () => close(true));
    overlay.querySelector('#dco-3ds-reject').addEventListener('click', () => close(false));
    overlay.querySelector('#dco-3ds-approve').focus();
  });
}

export function createSimulatedProvider({ container, clientSecret, totalCents, customer = {} }) {
  let secret = clientSecret;
  let method = 'card';
  let methodListener = () => {};
  const oxxoAllowed = totalCents <= OXXO_MAX_CENTS;
  const msiOptions = availableInstallments(totalCents);

  container.innerHTML = `
    <div class="dco-methods" role="tablist" aria-label="Método de pago">
      <button type="button" role="tab" class="dco-method is-active" data-method="card" aria-selected="true" id="dco-method-card">
        <span class="dco-method-icon">${icons.card(20)}</span>
        <span class="dco-method-text"><strong>Tarjeta</strong><small>Crédito o débito${msiOptions.length ? ' · MSI' : ''}</small></span>
      </button>
      <button type="button" role="tab" class="dco-method" data-method="spei" aria-selected="false" id="dco-method-spei">
        <span class="dco-method-icon">${icons.bank(20)}</span>
        <span class="dco-method-text"><strong>Transferencia SPEI</strong><small>Sin comisión</small></span>
      </button>
      <button type="button" role="tab" class="dco-method" data-method="oxxo" aria-selected="false" id="dco-method-oxxo" ${oxxoAllowed ? '' : 'disabled title="OXXO acepta pagos de hasta $10,000 MXN"'}>
        <span class="dco-method-icon">${icons.store(20)}</span>
        <span class="dco-method-text"><strong>Efectivo OXXO</strong><small>${oxxoAllowed ? 'Paga en tienda' : 'Máx. $10,000'}</small></span>
      </button>
    </div>

    <div class="dco-method-panel" data-panel="card">
      <div class="dco-accepted">
        <span>Aceptamos</span>
        <span class="dco-accepted-logos">${paymentLogos(['visa', 'mastercard', 'amex'], { width: 34 })}</span>
        <button type="button" class="dco-testfill" id="dco-testfill">${icons.flask(13)} Usar tarjeta de prueba</button>
      </div>
      <div class="dco-field">
        <label for="dco-card-number">Número de tarjeta</label>
        <div class="dco-input-wrap">
          <input id="dco-card-number" class="dco-input" inputmode="numeric" autocomplete="cc-number" placeholder="1234 1234 1234 1234" maxlength="23">
          <span class="dco-card-brand" id="dco-card-brand" aria-live="polite"></span>
        </div>
        <span class="dco-field-error" data-error-for="number"></span>
      </div>
      <div class="dco-row-2">
        <div class="dco-field">
          <label for="dco-card-exp">Vencimiento</label>
          <input id="dco-card-exp" class="dco-input" inputmode="numeric" autocomplete="cc-exp" placeholder="MM / AA" maxlength="7">
          <span class="dco-field-error" data-error-for="exp"></span>
        </div>
        <div class="dco-field">
          <label for="dco-card-cvc">CVC</label>
          <input id="dco-card-cvc" class="dco-input" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4">
          <span class="dco-field-error" data-error-for="cvc"></span>
        </div>
      </div>
      <div class="dco-field">
        <label for="dco-card-name">Nombre en la tarjeta</label>
        <input id="dco-card-name" class="dco-input" autocomplete="cc-name" placeholder="Como aparece en la tarjeta" value="${esc(customer.name || '')}">
        <span class="dco-field-error" data-error-for="name"></span>
      </div>
      ${
        msiOptions.length
          ? `<div class="dco-field" id="dco-msi-field">
              <label for="dco-card-msi">Forma de pago</label>
              <select id="dco-card-msi" class="dco-input dco-select">
                <option value="1">Una sola exhibición · ${formatMXN(totalCents)}</option>
                ${msiOptions.map((m) => `<option value="${m}">${m} meses sin intereses de ${formatMXN(Math.round(totalCents / m))}</option>`).join('')}
              </select>
              <span class="dco-field-hint">MSI disponible con tarjetas de crédito participantes (Visa y Mastercard).</span>
            </div>`
          : ''
      }
    </div>

    <div class="dco-method-panel" data-panel="spei" hidden>
      <div class="dco-method-info">
        ${paymentLogo('spei', { width: 44 })}
        <div>
          <strong>Transferencia desde tu banca en línea</strong>
          <p>Generaremos una <b>CLABE única</b> para esta orden. Transfiere el monto exacto desde cualquier banco (BBVA, Santander, Banorte, Nu, etc.). Tu pago se confirma automáticamente en minutos.</p>
        </div>
      </div>
    </div>

    <div class="dco-method-panel" data-panel="oxxo" hidden>
      <div class="dco-method-info">
        ${paymentLogo('oxxo', { width: 44 })}
        <div>
          <strong>Paga en efectivo en cualquier OXXO</strong>
          <p>Te daremos una referencia válida por <b>3 días</b>. Paga en caja y tu orden se confirma automáticamente (puede tardar hasta 1 día hábil). OXXO cobra una comisión adicional en caja.</p>
        </div>
      </div>
    </div>
  `;

  const $ = (sel) => container.querySelector(sel);
  const numberInput = $('#dco-card-number');
  const expInput = $('#dco-card-exp');
  const cvcInput = $('#dco-card-cvc');
  const nameInput = $('#dco-card-name');
  const msiSelect = $('#dco-card-msi');
  const msiField = $('#dco-msi-field');
  const brandBadge = $('#dco-card-brand');

  const setFieldError = (key, message) => {
    const el = container.querySelector(`[data-error-for="${key}"]`);
    if (el) el.textContent = message || '';
    const input = { number: numberInput, exp: expInput, cvc: cvcInput, name: nameInput }[key];
    input?.classList.toggle('is-invalid', Boolean(message));
  };

  // Tabs
  container.querySelectorAll('.dco-method').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      method = btn.dataset.method;
      container.querySelectorAll('.dco-method').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      container.querySelectorAll('.dco-method-panel').forEach((p) => {
        p.hidden = p.dataset.panel !== method;
      });
      methodListener(method);
    });
  });

  // Formato de tarjeta
  numberInput.addEventListener('input', () => {
    const digits = numberInput.value.replace(/\D/g, '').slice(0, 19);
    const brand = detectBrand(digits);
    numberInput.value = formatCardNumber(digits, brand);
    brandBadge.innerHTML = brand ? paymentLogo(brand, { width: 34 }) : '';
    brandBadge.dataset.brand = brand;
    brandBadge.title = BRAND_LABEL[brand] || '';
    cvcInput.maxLength = brand === 'amex' ? 4 : 3;
    cvcInput.placeholder = brand === 'amex' ? '1234' : '123';
    if (msiField) msiField.hidden = brand === 'amex';
    setFieldError('number', '');
  });

  // Relleno rápido (solo existe en la pasarela simulada)
  $('#dco-testfill')?.addEventListener('click', () => {
    numberInput.value = '4242424242424242';
    numberInput.dispatchEvent(new Event('input'));
    const next = new Date();
    expInput.value = `12 / ${String((next.getFullYear() + 3) % 100).padStart(2, '0')}`;
    cvcInput.value = '123';
    if (nameInput.value.trim().length < 3) nameInput.value = customer.name || 'CLIENTE PRUEBA';
    ['number', 'exp', 'cvc', 'name'].forEach((k) => setFieldError(k, ''));
  });
  expInput.addEventListener('input', (e) => {
    let digits = expInput.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length === 1 && Number(digits) > 1) digits = `0${digits}`;
    const deleting = e.inputType === 'deleteContentBackward';
    expInput.value = digits.length > 2 || (digits.length === 2 && !deleting) ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    setFieldError('exp', '');
  });
  cvcInput.addEventListener('input', () => {
    cvcInput.value = cvcInput.value.replace(/\D/g, '').slice(0, cvcInput.maxLength);
    setFieldError('cvc', '');
  });
  nameInput.addEventListener('input', () => setFieldError('name', ''));

  function validateCard() {
    const digits = numberInput.value.replace(/\D/g, '');
    const brand = detectBrand(digits);
    const [mmRaw, yyRaw] = expInput.value.split('/').map((s) => s.trim());
    const mm = Number(mmRaw);
    const yy = Number(yyRaw);
    const now = new Date();
    let ok = true;

    if (digits.length < 13 || !luhn(digits)) {
      setFieldError('number', 'Número de tarjeta inválido.');
      ok = false;
    }
    const expYear = 2000 + yy;
    if (!mm || mm > 12 || !yyRaw || yyRaw.length !== 2 || expYear < now.getFullYear() || (expYear === now.getFullYear() && mm < now.getMonth() + 1)) {
      setFieldError('exp', 'Fecha de vencimiento inválida.');
      ok = false;
    }
    if (cvcInput.value.length !== (brand === 'amex' ? 4 : 3)) {
      setFieldError('cvc', brand === 'amex' ? 'El CVC de AMEX tiene 4 dígitos.' : 'Ingresa los 3 dígitos.');
      ok = false;
    }
    if (nameInput.value.trim().length < 3) {
      setFieldError('name', 'Ingresa el nombre del titular.');
      ok = false;
    }
    if (!ok) container.querySelector('.is-invalid')?.focus();
    return ok ? { number: digits, exp: `${mmRaw}/${yyRaw}`, cvc: cvcInput.value, name: nameInput.value.trim() } : null;
  }

  const result = (resp) => {
    secret = resp.clientSecret;
    const order = resp.order;
    return { status: order.status, order, clientSecret: secret, message: order.error?.message || '' };
  };

  return {
    mode: 'simulated',
    getMethod: () => method,
    onMethodChange(cb) {
      methodListener = cb;
    },
    async confirm() {
      if (method === 'card') {
        const card = validateCard();
        if (!card) return { status: 'invalid', message: '' };
        const installments = msiSelect && !msiField?.hidden ? Number(msiSelect.value) : 1;
        let res = result(await checkoutApi.simulate({ clientSecret: secret, action: 'pay_card', card, installments }));
        if (res.status === 'requires_action' && res.order.pending?.method === 'card_3ds') {
          const approve = await ask3DS(formatMXN(totalCents));
          res = result(await checkoutApi.simulate({ clientSecret: secret, action: 'confirm_3ds', approve }));
        }
        return res;
      }
      if (method === 'spei') return result(await checkoutApi.simulate({ clientSecret: secret, action: 'pay_spei' }));
      if (method === 'oxxo') return result(await checkoutApi.simulate({ clientSecret: secret, action: 'pay_oxxo' }));
      return { status: 'invalid', message: 'Selecciona un método de pago.' };
    },
    destroy() {
      container.innerHTML = '';
    }
  };
}
