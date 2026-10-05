// ================================================================
// Dilo Checkout — E2E en navegador real (Chrome headless)
// ----------------------------------------------------------------
// Uso:  npm run dev   (en otra terminal)
//       npm run test:checkout:browser
// Variables opcionales:
//   BASE_URL=http://localhost:5173   CHROME_PATH=...   SCREEN_DIR=...
// ================================================================
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const SCREEN_DIR = process.env.SCREEN_DIR || path.resolve('tests/.screenshots');
fs.mkdirSync(SCREEN_DIR, { recursive: true });

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean);
const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));

let passed = 0;
let failed = 0;
const failures = [];
function check(name, cond, extra) {
  if (cond) {
    passed++;
    console.log(`  ✔ ${name}`);
  } else {
    failed++;
    failures.push(name);
    console.log(`  ✘ ${name}`, extra !== undefined ? String(typeof extra === 'string' ? extra : JSON.stringify(extra)).slice(0, 500) : '');
  }
}

const browser = await chromium.launch({ executablePath, headless: true });
const consoleErrors = [];

async function newPage({ mobile = false } = {}) {
  const context = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 } }
  );
  const page = await context.newPage();
  // No escribir leads/trámites de prueba en el CMS real de Wix
  await context.route(/wixapis\.com|wix\.com\/_api|\/api\/(leads|tramites|chat)/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
  );
  page.setDefaultTimeout(15000);
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push({ url: page.url(), text: msg.text() });
  });
  page.on('pageerror', (err) => consoleErrors.push({ url: page.url(), text: `PAGEERROR ${err.message}` }));
  return { context, page };
}

const shot = (page, name) => page.screenshot({ path: path.join(SCREEN_DIR, `${name}.png`), fullPage: false });
const pixelLog = (page) => page.evaluate(() => (window.__diloPixelLog || []).map((e) => ({ event: e.event, eventId: e.eventId, test: e.test, value: e.params?.value })));
const text = (page, sel) => page.locator(sel).first().innerText();

async function fillContact(page, { name = 'Roberto Gonzalez', email = 'roberto@auracoffee.mx', phone = '5512345678' } = {}) {
  await page.fill('#dco-name', name);
  await page.fill('#dco-email', email);
  await page.fill('#dco-phone', phone);
}

async function continueToPayment(page) {
  await page.click('#dco-continue-btn');
  await page.waitForSelector('#dco-pay-btn:not([hidden])');
}

async function fillCard(page, number, { exp = '1234', cvc = '123', name } = {}) {
  await page.fill('#dco-card-number', number);
  await page.fill('#dco-card-exp', exp);
  await page.fill('#dco-card-cvc', cvc);
  if (name) await page.fill('#dco-card-name', name);
}

async function openCheckout(page, query) {
  await page.goto(`${BASE}/#/checkout?${query}`);
  await page.waitForSelector('#dco-page');
}

async function waitSuccess(page) {
  await page.waitForURL(/#\/checkout\/exito\?cs=/);
  await page.waitForSelector('#dco-result-success');
}

console.log(`\nDilo Checkout · E2E navegador → ${BASE}\n`);

// ── A. Flujo completo desde la landing IMPI ──────────────────────
console.log('A. Landing IMPI → checkout → tarjeta 4242 → éxito');
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/#/registro-marca`);
  await page.waitForSelector('.impi-tier-card[data-tier="completo"]');
  await page.locator('.impi-tier-card[data-tier="completo"]').click();
  await page.locator('#seccion-checkout').scrollIntoViewIfNeeded();
  await page.fill('#co-brand-name', 'Aura Coffee');
  await page.click('#btn-next-to-step-2');
  await page.fill('#co-owner-name', 'Ana Morales');
  await page.fill('#co-owner-phone', '5512345678');
  await page.fill('#co-owner-email', 'ana@auracoffee.mx');
  await page.click('#btn-next-to-step-3');
  await page.waitForSelector('#step-3-form', { state: 'visible' });
  check('revisión: marca', (await text(page, '#review-brand')) === 'Aura Coffee');
  check('revisión: titular', (await text(page, '#review-owner')) === 'Ana Morales');
  const reviewTotal = await text(page, '#review-total');
  check('revisión: total $7,899.00', reviewTotal.includes('7,899.00'), reviewTotal);
  await shot(page, 'A1-impi-review');

  await page.click('#btn-complete-impi-order');
  await page.waitForURL(/#\/checkout\?items=impi-completo/);
  await page.waitForSelector('#dco-page');
  check('checkout sin navbar del sitio', (await page.locator('nav.navbar, .navbar').count()) === 0);
  check('body en modo checkout', await page.evaluate(() => document.body.classList.contains('dco-mode')));
  await page.waitForSelector('#dco-test-banner:not([hidden])');
  check('banner MODO PRUEBA visible', (await text(page, '#dco-test-banner')).includes('MODO PRUEBA'));
  check('nombre precargado', (await page.inputValue('#dco-name')) === 'Ana Morales');
  check('correo precargado', (await page.inputValue('#dco-email')) === 'ana@auracoffee.mx');
  check('teléfono precargado y formateado', (await page.inputValue('#dco-phone')) === '55 1234 5678', await page.inputValue('#dco-phone'));
  check('resumen: total', (await text(page, '#dco-total-amount')).includes('7,899.00'));
  check('resumen: marca', (await text(page, '#dco-summary')).includes('Aura Coffee'));
  check('título de pestaña', (await page.title()).includes('Pago seguro'));
  await shot(page, 'A2-checkout-contact');

  await continueToPayment(page);
  check('3 métodos visibles', (await page.locator('.dco-method').count()) === 3);
  check('MSI disponible (≥ $1,200)', (await page.locator('#dco-card-msi option').count()) === 5);
  check('paso 2 activo', await page.locator('#dco-steps li[data-step="2"].is-active').count() === 1);
  await fillCard(page, '4242424242424242');
  check('formato de tarjeta', (await page.inputValue('#dco-card-number')) === '4242 4242 4242 4242');
  check('formato de vencimiento', (await page.inputValue('#dco-card-exp')) === '12 / 34');
  check('detecta VISA', (await page.locator('#dco-card-brand').getAttribute('data-brand')) === 'visa' && (await page.locator('#dco-card-brand svg[data-logo="visa"]').count()) === 1);
  await shot(page, 'A3-checkout-payment');

  await page.click('#dco-pay-btn');
  await waitSuccess(page);
  const successText = await text(page, '#dco-result-success');
  const folio = await page.locator('#dco-result-success').getAttribute('data-order-id');
  check('folio IMPI-', /^IMPI-/.test(folio || ''), folio);
  check('método Visa •••• 4242', successText.includes('Visa •••• 4242'), successText);
  check('monto $7,899.00', successText.includes('7,899.00'));
  check('próximos pasos IMPI', successText.includes('Abogado asignado'));
  check('link a portal', (await page.locator('#dco-portal-link').count()) === 1);
  await page.waitForTimeout(600);
  await shot(page, 'A4-success');

  const log = await pixelLog(page);
  const names = log.map((e) => e.event);
  check('Pixel: InitiateCheckout', names.includes('InitiateCheckout'), names);
  check('Pixel: AddPaymentInfo', names.includes('AddPaymentInfo'), names);
  const purchase = log.find((e) => e.event === 'Purchase');
  check('Pixel: Purchase con eventID = folio', purchase?.eventId === folio, purchase);
  check('Pixel: Purchase marcado test', purchase?.test === true, purchase);
  check('Pixel: Purchase valor 7899', purchase?.value === 7899, purchase);
  const store = await page.evaluate(() => JSON.stringify(localStorage));
  check('trámite creado en portal con folio', store.includes(`Folio ${folio}`));

  await page.reload();
  await page.waitForSelector('#dco-result-success');
  const after = await pixelLog(page);
  check('recargar no duplica Purchase', !after.some((e) => e.event === 'Purchase'), after);
  const tramiteCount = await page.evaluate((f) => (JSON.stringify(localStorage).match(new RegExp(`Folio ${f}`, 'g')) || []).length, folio);
  check('recargar no duplica trámite', tramiteCount === 1, tramiteCount);

  await page.click('#dco-home-link');
  await page.waitForFunction(() => !document.body.classList.contains('dco-mode'));
  check('volver al sitio restaura navbar', (await page.locator('#router-view').count()) === 1 && (await page.locator('#dco-page').count()) === 0);
  await context.close();
}

// ── B. Rechazo y reintento ───────────────────────────────────────
console.log('B. Tarjeta rechazada → reintento exitoso');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page);
  await continueToPayment(page);
  await fillCard(page, '4000000000000002', { name: 'ROBERTO GONZALEZ' });
  await page.click('#dco-pay-btn');
  await page.waitForFunction(() => document.querySelector('#dco-pay-error')?.textContent.trim().length > 0);
  check('mensaje de rechazo', (await text(page, '#dco-pay-error')).toLowerCase().includes('rechaz'), await text(page, '#dco-pay-error'));
  check('sigue en checkout', page.url().includes('#/checkout?'));
  check('botón re-habilitado', await page.isEnabled('#dco-pay-btn'));
  await shot(page, 'B1-declined');
  await fillCard(page, '4000000000009995');
  await page.click('#dco-pay-btn');
  await page.waitForFunction(() => /fondos/i.test(document.querySelector('#dco-pay-error')?.textContent || ''));
  check('fondos insuficientes', true);
  await fillCard(page, '4242424242424242');
  await page.click('#dco-pay-btn');
  await waitSuccess(page);
  check('reintento → éxito', (await text(page, '#dco-result-success')).includes('1,490.00'));
  await context.close();
}

// ── C. Validaciones de tarjeta en cliente ────────────────────────
console.log('C. Validaciones de campos de tarjeta');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page);
  await continueToPayment(page);
  await page.fill('#dco-card-name', '');
  await page.click('#dco-pay-btn');
  await page.waitForTimeout(300);
  check('error número', (await text(page, '[data-error-for="number"]')).length > 0);
  check('error vencimiento', (await text(page, '[data-error-for="exp"]')).length > 0);
  check('error CVC', (await text(page, '[data-error-for="cvc"]')).length > 0);
  check('no navega con errores', page.url().includes('#/checkout?'));
  await fillCard(page, '4111111111111111', { name: 'ROBERTO GONZALEZ' });
  await page.click('#dco-pay-btn');
  await page.waitForFunction(() => /modo prueba/i.test(document.querySelector('#dco-pay-error')?.textContent || ''));
  check('tarjeta real rechazada en modo prueba', true);
  await context.close();
}

// ── D. 3D Secure ─────────────────────────────────────────────────
console.log('D. 3D Secure (autorizar / rechazar)');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page);
  await continueToPayment(page);
  await fillCard(page, '4000002500003155', { name: 'ROBERTO GONZALEZ' });
  await page.click('#dco-pay-btn');
  await page.waitForSelector('.dco-3ds-overlay.is-visible #dco-3ds-reject');
  await shot(page, 'D1-3ds-modal');
  const topEl = await page.evaluate(() => {
    const b = document.querySelector('#dco-3ds-approve').getBoundingClientRect();
    return document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)?.id;
  });
  check('modal 3DS por encima del overlay de procesamiento', topEl === 'dco-3ds-approve', topEl);
  await page.click('#dco-3ds-reject');
  await page.waitForFunction(() => /autenticar/i.test(document.querySelector('#dco-pay-error')?.textContent || ''));
  check('3DS rechazado → error', true);
  await page.click('#dco-pay-btn');
  await page.waitForSelector('.dco-3ds-overlay.is-visible #dco-3ds-approve');
  await page.click('#dco-3ds-approve');
  await waitSuccess(page);
  check('3DS autorizado → éxito', true);
  await context.close();
}

// ── E. Meses sin intereses ───────────────────────────────────────
console.log('E. 6 meses sin intereses');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-completo');
  await fillContact(page);
  await continueToPayment(page);
  await fillCard(page, '5555555555554444', { name: 'ROBERTO GONZALEZ' });
  check('detecta Mastercard', (await page.locator('#dco-card-brand').getAttribute('data-brand')) === 'mastercard');
  await page.selectOption('#dco-card-msi', '6');
  await page.click('#dco-pay-btn');
  await waitSuccess(page);
  const t = await text(page, '#dco-result-success');
  check('éxito con 6 MSI', t.includes('6 meses sin intereses') && t.includes('Mastercard •••• 4444'), t);
  await context.close();
}

// ── F. SPEI ──────────────────────────────────────────────────────
console.log('F. SPEI → instrucciones → acreditación');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-completo,impi-addon-monitoreo');
  await fillContact(page);
  await continueToPayment(page);
  await page.click('#dco-method-spei');
  check('botón cambia a CLABE', (await text(page, '#dco-pay-label')).includes('CLABE'));
  await page.click('#dco-pay-btn');
  await page.waitForSelector('#dco-result-pending[data-method="spei"]');
  const clabe = await page.locator('#dco-copy-clabe').getAttribute('data-copy');
  check('CLABE de 18 dígitos', /^\d{18}$/.test(clabe || ''), clabe);
  check('monto exacto $9,749.00', (await text(page, '#dco-instructions')).includes('9,749.00'));
  check('sin Purchase mientras está pendiente', !(await pixelLog(page)).some((e) => e.event === 'Purchase'));
  await page.click('#dco-copy-clabe');
  await page.waitForTimeout(200);
  check('feedback de copiado', (await text(page, '#dco-copy-clabe')).includes('Copiado'));
  await shot(page, 'F1-spei-pending');
  await page.click('#dco-simulate-funds');
  await page.waitForSelector('#dco-result-success');
  const t = await text(page, '#dco-result-success');
  check('SPEI acreditado → éxito', t.includes('Transferencia SPEI'), t);
  check('Purchase al acreditar', (await pixelLog(page)).some((e) => e.event === 'Purchase'));
  await page.reload();
  await page.waitForSelector('#dco-result-success');
  check('URL actualizada mantiene estado pagado tras recargar', true);
  await context.close();
}

// ── G. OXXO ──────────────────────────────────────────────────────
console.log('G. OXXO → referencia → pago en tienda');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page);
  await continueToPayment(page);
  await page.click('#dco-method-oxxo');
  check('botón cambia a OXXO', (await text(page, '#dco-pay-label')).includes('OXXO'));
  await page.click('#dco-pay-btn');
  await page.waitForSelector('#dco-result-pending[data-method="oxxo"]');
  const ref = await page.locator('#dco-copy-oxxo').getAttribute('data-copy');
  check('referencia de 14 dígitos', /^\d{14}$/.test(ref || ''), ref);
  check('muestra vencimiento', (await text(page, '#dco-instructions')).includes('Vence'));
  await shot(page, 'G1-oxxo-pending');
  await page.click('#dco-simulate-funds');
  await page.waitForSelector('#dco-result-success');
  check('OXXO pagado → éxito', (await text(page, '#dco-result-success')).includes('OXXO'));

  await openCheckout(page, 'items=branding-flagship&plan=full-5off');
  await fillContact(page);
  await continueToPayment(page);
  check('OXXO deshabilitado > $10,000', await page.isDisabled('#dco-method-oxxo'));
  await context.close();
}

// ── H. CFDI ──────────────────────────────────────────────────────
console.log('H. Factura CFDI 4.0');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page);
  await page.click('label.dco-checkbox');
  await page.waitForSelector('#dco-invoice-fields:not([hidden])');
  await page.fill('#dco-rfc', 'abc');
  check('RFC en mayúsculas', (await page.inputValue('#dco-rfc')) === 'ABC');
  await page.click('#dco-continue-btn');
  await page.waitForTimeout(300);
  check('error RFC', (await text(page, '[data-error-for="rfc"]')).length > 0);
  check('error razón social', (await text(page, '[data-error-for="razonSocial"]')).length > 0);
  check('error régimen', (await text(page, '[data-error-for="regimen"]')).length > 0);
  check('error C.P.', (await text(page, '[data-error-for="cp"]')).length > 0);
  check('pago sigue bloqueado', (await page.locator('#dco-payment-card.is-locked').count()) === 1);
  await shot(page, 'H1-cfdi-errors');
  await page.fill('#dco-rfc', 'GOGR850101AB1');
  await page.fill('#dco-razon', 'ROBERTO GONZALEZ RAMIREZ');
  await page.selectOption('#dco-regimen', '612');
  await page.fill('#dco-cp', '06600');
  await continueToPayment(page);
  check('resumen de contacto con RFC', (await text(page, '#dco-contact-summary')).includes('GOGR850101AB1'));
  await page.click('#dco-edit-contact');
  check('editar vuelve a bloquear el pago', (await page.locator('#dco-payment-card.is-locked').count()) === 1 && (await page.isVisible('#dco-contact-form')));
  await context.close();
}

// ── I. Validación de contacto ───────────────────────────────────
console.log('I. Validación de datos de contacto');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen');
  await fillContact(page, { name: 'A', email: 'correo-malo', phone: '123' });
  await page.click('#dco-continue-btn');
  await page.waitForTimeout(300);
  check('error nombre', (await text(page, '[data-error-for="name"]')).length > 0);
  check('error correo', (await text(page, '[data-error-for="email"]')).length > 0);
  check('error teléfono', (await text(page, '[data-error-for="phone"]')).length > 0);
  await context.close();
}

// ── J. Branding (anticipo 50% y contado -5%) ────────────────────
console.log('J. Branding: landing → checkout con esquemas de pago');
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/#/branding`);
  await page.waitForSelector('.bp-tier-card[data-tier="starter"]');
  await page.locator('.bp-tier-card[data-tier="starter"]').click({ position: { x: 30, y: 30 } });
  await page.fill('#bp-form-name', 'Lumina Studio');
  await page.fill('#bp-form-industry', 'Diseno');
  await page.fill('#bp-form-contact', 'Roberto Sanchez');
  await page.fill('#bp-form-phone', '+52 55 1234 5678');
  await page.fill('#bp-form-email', 'roberto@lumina.mx');
  await page.check('#addon-bp-social');
  await page.click('#btn-complete-bp-order');
  await page.waitForURL(/#\/checkout\?items=branding-starter/);
  await page.waitForSelector('#dco-page');
  check('carrito con complemento', page.url().includes('branding-addon-social'), page.url());
  check('plan anticipo 50%', page.url().includes('plan=deposit-50'));
  check('teléfono sin +52 duplicado', (await page.inputValue('#dco-phone')) === '55 1234 5678', await page.inputValue('#dco-phone'));
  check('hoy paga $5,850.00', (await text(page, '#dco-total-amount')).includes('5,850.00'), await text(page, '#dco-total-amount'));
  check('nota de saldo', (await text(page, '#dco-totals')).includes('Saldo de'));
  await shot(page, 'J1-branding-deposit');
  await page.locator('label.dco-plan:has(input[value="full-5off"])').click();
  await page.waitForTimeout(200);
  check('contado -5% = $11,115.00', (await text(page, '#dco-total-amount')).includes('11,115.00'), await text(page, '#dco-total-amount'));
  check('descuento visible', (await text(page, '#dco-totals')).includes('Descuento'));
  check('URL refleja el plan', page.url().includes('plan=full-5off'));
  await page.locator('label.dco-plan:has(input[value="deposit-50"])').click();
  await continueToPayment(page);
  check('botón paga anticipo', (await text(page, '#dco-pay-label')).includes('5,850.00'));
  await fillCard(page, '4242424242424242');
  await page.click('#dco-pay-btn');
  await waitSuccess(page);
  const t = await text(page, '#dco-result-success');
  check('éxito con folio BRAND-', /^BRAND-/.test((await page.locator('#dco-result-success').getAttribute('data-order-id')) || ''));
  check('éxito menciona saldo pendiente', t.includes('saldo de') && t.includes('5,850.00'), t);
  check('próximos pasos branding', t.includes('Kick-off'));
  await shot(page, 'J2-branding-success');
  await context.close();
}

// ── K. Enlaces inválidos y éxito sin referencia ─────────────────
console.log('K. Enlaces inválidos');
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/#/checkout?items=producto-falso`);
  await page.waitForSelector('.dco-result-card');
  check('SKU inválido → estado vacío', (await text(page, '.dco-result-card')).includes('No pudimos cargar tu orden'));
  await page.goto(`${BASE}/#/checkout`);
  await page.waitForSelector('.dco-result-card');
  check('carrito vacío → estado vacío', (await text(page, '.dco-result-card')).includes('vacío'));
  await page.goto(`${BASE}/#/checkout?items=impi-completo,branding-starter`);
  await page.waitForSelector('.dco-result-card');
  check('categorías mezcladas → estado vacío', (await text(page, '.dco-result-card')).includes('categorías'));
  await page.goto(`${BASE}/#/checkout/exito`);
  await page.waitForSelector('#dco-result-notfound');
  check('éxito sin referencia → no encontrada', true);
  await page.goto(`${BASE}/#/checkout/exito?cs=sim_basura.firma`);
  await page.waitForSelector('#dco-result-notfound');
  check('éxito con token falso → no encontrada', true);
  await context.close();
}

// ── L. Pasarela no disponible → WhatsApp ────────────────────────
console.log('L. Pasarela no disponible (producción sin llaves)');
{
  const { context, page } = await newPage();
  await page.route('**/api/checkout/config', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, mode: 'simulated', available: false, supportWhatsApp: '525592441070' }) })
  );
  await openCheckout(page, 'items=impi-completo');
  await fillContact(page);
  await page.click('#dco-continue-btn');
  await page.waitForSelector('#dco-wa-fallback');
  const href = await page.locator('#dco-wa-fallback').getAttribute('href');
  check('fallback a WhatsApp con la orden', href.startsWith('https://wa.me/525592441070') && decodeURIComponent(href).includes('7,899.00'), href);
  check('banner de prueba oculto', await page.locator('#dco-test-banner').isHidden());
  await shot(page, 'L1-unavailable');
  await context.close();
}

// ── M. Móvil ─────────────────────────────────────────────────────
console.log('M. Móvil (390×844)');
{
  const { context, page } = await newPage({ mobile: true });
  await openCheckout(page, 'items=impi-completo,impi-addon-clase');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('sin scroll horizontal', overflow <= 0, overflow);
  check('toggle de resumen visible', await page.isVisible('#dco-summary-toggle'));
  check('detalle del resumen colapsado', await page.locator('#dco-summary-body').isHidden());
  await shot(page, 'M1-mobile-checkout');
  await page.click('#dco-summary-toggle');
  check('resumen se expande', await page.locator('#dco-summary-body').isVisible());
  await page.click('#dco-summary-toggle');
  await fillContact(page);
  check('barra fija móvil visible en datos', await page.isVisible('#dco-mobilebar'));
  await continueToPayment(page);
  const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('sin scroll horizontal en pago', overflow2 <= 0, overflow2);
  await shot(page, 'M2-mobile-payment');
  await fillCard(page, '4242424242424242');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForSelector('#dco-mobilebar:not([hidden])');
  check('barra fija ofrece pagar con el total', (await text(page, '#dco-mobilebar')).includes('Pagar') && (await text(page, '#dco-mobilebar')).includes('11,849.00'), await text(page, '#dco-mobilebar'));
  await shot(page, 'M2b-mobile-stickybar');
  await page.click('#dco-mobilebar-btn');
  await waitSuccess(page);
  await page.waitForTimeout(600);
  const overflow3 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('sin scroll horizontal en éxito', overflow3 <= 0, overflow3);
  await shot(page, 'M3-mobile-success');
  await page.goto(`${BASE}/#/terminos`);
  await page.waitForSelector('#dlg-page');
  const overflow4 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('legal móvil sin scroll horizontal', overflow4 <= 0, overflow4);
  await shot(page, 'M4-mobile-legal');
  await context.close();
}

// ── N. Carrito editable, cupones y reutilización de la orden ───────
console.log('N. Upsell, cupones, persistencia y edición en vivo');
{
  const { context, page } = await newPage();
  const intents = () => page.evaluate(() => Object.values(JSON.parse(sessionStorage.getItem('dilo_checkout_intents') || '{}')).map((i) => i.orderId));
  await openCheckout(page, 'items=impi-completo');
  await page.waitForSelector('#dco-upsell');
  check('3 complementos recomendados', (await page.locator('.dco-upsell-item').count()) === 3);
  await shot(page, 'N1-upsell');
  await page.click('#dco-add-impi-addon-monitoreo');
  await page.waitForFunction(() => document.querySelector('#dco-total-amount')?.textContent.includes('9,749.00'));
  check('agregar complemento actualiza total', true);
  check('URL refleja el complemento', page.url().includes('impi-addon-monitoreo'));
  check('Pixel: AddToCart', (await pixelLog(page)).some((e) => e.event === 'AddToCart' && e.value === 1850));
  check('toast de confirmación', (await text(page, '#dco-toast')).includes('Agregaste'));
  check('ya no se sugiere el agregado', (await page.locator('#dco-add-impi-addon-monitoreo').count()) === 0);
  await page.click('#dco-remove-impi-addon-monitoreo');
  await page.waitForFunction(() => document.querySelector('#dco-total-amount')?.textContent.includes('7,899.00'));
  check('quitar complemento restaura total', !page.url().includes('impi-addon-monitoreo'));

  await page.waitForSelector('#dco-coupon-toggle');
  await page.click('#dco-coupon-toggle');
  await page.fill('#dco-coupon-input', 'nope');
  check('cupón en mayúsculas al escribir', (await page.inputValue('#dco-coupon-input')) === 'NOPE');
  await page.click('#dco-coupon-apply');
  await page.waitForFunction(() => document.querySelector('#dco-coupon-error')?.textContent.trim().length > 0);
  check('cupón inválido muestra error', (await text(page, '#dco-coupon-error')).includes('no es válido'), await text(page, '#dco-coupon-error'));
  await page.fill('#dco-coupon-input', 'prueba10');
  await page.press('#dco-coupon-input', 'Enter');
  await page.waitForSelector('#dco-coupon-row');
  check('cupón aplicado: $7,109.10', (await text(page, '#dco-total-amount')).includes('7,109.10'), await text(page, '#dco-total-amount'));
  check('URL guarda el cupón', page.url().includes('coupon=PRUEBA10'));
  await shot(page, 'N2-coupon-applied');
  await page.click('#dco-add-impi-addon-monitoreo');
  await page.waitForFunction(() => document.querySelector('#dco-total-amount')?.textContent.includes('8,774.10'));
  check('cupón se recalcula al cambiar el carrito ($8,774.10)', true);

  await fillContact(page, { name: 'Laura Peña', email: 'laura@estudio.mx', phone: '3312345678' });
  check('teléfono GDL formateado', (await page.inputValue('#dco-phone')) === '33 1234 5678', await page.inputValue('#dco-phone'));
  await continueToPayment(page);
  check('botón de pago con total con cupón', (await text(page, '#dco-pay-label')).includes('8,774.10'));
  const first = await intents();
  await page.click('#dco-edit-contact');
  await continueToPayment(page);
  const second = await intents();
  check('editar sin cambios reutiliza la misma orden', first.length === 1 && second.length === 1 && first[0] === second[0], { first, second });

  await page.reload();
  await page.waitForSelector('#dco-page');
  await page.waitForSelector('#dco-coupon-row');
  check('recargar conserva datos', (await page.inputValue('#dco-name')) === 'Laura Peña' && (await page.inputValue('#dco-email')) === 'laura@estudio.mx');
  check('recargar conserva carrito y cupón', (await text(page, '#dco-total-amount')).includes('8,774.10'), await text(page, '#dco-total-amount'));
  await continueToPayment(page);
  const third = await intents();
  check('tras recargar se reutiliza la misma orden', third.includes(first[0]) && third.length === 1, third);

  await page.click('#dco-add-impi-addon-clase');
  await page.waitForFunction(() => document.querySelector('#dco-pay-label')?.textContent.includes('12,329.10') && !document.querySelector('#dco-pay-btn').hidden);
  check('cambiar el carrito en el paso de pago re-prepara con el monto nuevo', true);
  const fourth = await intents();
  check('el cambio de monto genera una orden nueva', fourth.some((id) => id !== first[0]), fourth);
  await shot(page, 'N3-live-edit-payment');

  await page.click('#dco-testfill');
  check('relleno de tarjeta de prueba', (await page.inputValue('#dco-card-number')) === '4242 4242 4242 4242');
  await page.click('#dco-pay-btn');
  await waitSuccess(page);
  const t = await text(page, '#dco-result-success');
  check('éxito muestra cupón aplicado', t.includes('PRUEBA10') && t.includes('12,329.10'), t);
  await page.evaluate(() => {
    window.__printed = 0;
    window.print = () => window.__printed++;
  });
  await page.click('#dco-print-receipt');
  check('descargar comprobante abre impresión', (await page.evaluate(() => window.__printed)) === 1);
  await page.emulateMedia({ media: 'print' });
  check('impresión oculta botones y muestra encabezado', (await page.isHidden('.dco-result-actions')) && (await page.isVisible('.dco-print-head')));
  await page.screenshot({ path: path.join(SCREEN_DIR, 'N4-print-receipt.png'), fullPage: true });
  await page.emulateMedia({ media: 'screen' });
  await context.close();
}

// ── O. Ayudas de captura, SEO y enlaces profundos ──────────────────
console.log('O. Correo, teléfono, noindex, legales y enlaces con cupón');
{
  const { context, page } = await newPage();
  await openCheckout(page, 'items=impi-dictamen&coupon=prueba10');
  await page.waitForSelector('#dco-coupon-row');
  check('enlace con cupón lo aplica ($1,341.00)', (await text(page, '#dco-total-amount')).includes('1,341.00'), await text(page, '#dco-total-amount'));
  check('meta robots noindex en checkout', (await page.locator('meta[name="robots"][content*="noindex"]').count()) === 1);
  await page.fill('#dco-email', 'ana@gmial.com');
  await page.locator('#dco-email').blur();
  await page.waitForSelector('#dco-email-suggest:not([hidden])');
  check('sugiere gmail.com', (await text(page, '#dco-email-suggest')).includes('ana@gmail.com'));
  await shot(page, 'O1-email-suggest');
  await page.click('#dco-email-suggest');
  check('aplica la sugerencia', (await page.inputValue('#dco-email')) === 'ana@gmail.com');
  await page.fill('#dco-email', 'ana@auracoffee.mx');
  await page.locator('#dco-email').blur();
  check('dominio propio no se sugiere', await page.locator('#dco-email-suggest').isHidden());
  await page.fill('#dco-phone', '');
  await page.type('#dco-phone', '+52 1 55 9876 5432');
  check('teléfono con +52 1 se normaliza', (await page.inputValue('#dco-phone')) === '55 9876 5432', await page.inputValue('#dco-phone'));
  check('legales enlazados en el pie', (await page.locator('#dco-footer-terms[href="#/terminos"]').count()) === 1 && (await page.locator('#dco-footer-privacy[href="#/aviso-de-privacidad"]').count()) === 1);

  await openCheckout(page, 'items=branding-flagship,branding-addon-impi&plan=full-5off');
  await page.waitForSelector('#dco-notice');
  check('aviso de complemento ya incluido', (await text(page, '#dco-notice')).includes('ya está incluido'));
  check('URL se limpia del complemento duplicado', !page.url().includes('branding-addon-impi'), page.url());
  check('no cobra el complemento duplicado ($27,455.00)', (await text(page, '#dco-total-amount')).includes('27,455.00'), await text(page, '#dco-total-amount'));

  await page.goto(`${BASE}/#/terminos`);
  await page.waitForSelector('#dlg-page');
  check('términos: título', (await text(page, '.dlg-title')).includes('Términos'));
  check('términos: secciones', (await page.locator('.dlg-section').count()) >= 8);
  check('legales sin noindex', (await page.locator('meta[name="robots"]').count()) === 0);
  check('título de pestaña legal', (await page.title()).includes('Términos'));
  await shot(page, 'O2-terminos');
  await page.click('#dlg-switch');
  await page.waitForSelector('#dlg-page[data-doc="privacidad"]');
  check('aviso de privacidad: ARCO', (await text(page, '#dlg-page')).includes('ARCO'));
  await page.locator('.dlg-toc a').nth(2).click();
  await page.waitForTimeout(500);
  check('índice no rompe la ruta', page.url().includes('#/aviso-de-privacidad'));
  await shot(page, 'O3-privacidad');
  await page.goto(`${BASE}/#/`);
  await page.waitForFunction(() => !document.body.classList.contains('dlg-mode'));
  check('salir de legales restaura el sitio', (await page.locator('#dlg-page').count()) === 0);
  check('footer del sitio enlaza términos', (await page.locator('footer a[href="#/terminos"]').count()) >= 1);
  await context.close();
}

await browser.close();

// ── Errores de consola ───────────────────────────────────────────
const isCheckoutUrl = (u) => /#\/(checkout|terminos|aviso-de-privacidad)/.test(u);
const checkoutErrors = consoleErrors.filter(
  (e) => isCheckoutUrl(e.url) && !(e.url.includes('sim_basura') && /404/.test(e.text)) && !/status of 422/.test(e.text) && !/THREE\.WebGPU|GPUValidationError/.test(e.text) // 404/422 esperados y WebGPU en headless
);
const otherErrors = consoleErrors.filter((e) => !isCheckoutUrl(e.url));
console.log('\nErrores de consola');
check('0 errores de consola en páginas de checkout', checkoutErrors.length === 0, checkoutErrors.map((e) => `${e.url.split('?')[0]} → ${e.text}`));
if (otherErrors.length) {
  console.log(`  (info) ${otherErrors.length} errores en otras páginas del sitio:`);
  [...new Set(otherErrors.map((e) => e.text.slice(0, 160)))].slice(0, 8).forEach((t) => console.log(`    · ${t}`));
}

console.log(`\nResultado: ${passed} OK · ${failed} fallidas`);
if (failures.length) console.log('Fallidas:\n - ' + failures.join('\n - '));
console.log(`Capturas: ${SCREEN_DIR}\n`);
process.exit(failed ? 1 : 0);
