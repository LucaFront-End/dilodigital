// Pruebas E2E de la API del checkout (modo simulado).
// Uso: npm run test:checkout  (o: node tests/checkout-api.e2e.mjs [baseUrl])
// Requiere el dev server corriendo (npm run dev).
const BASE = process.argv[2] || 'http://localhost:5173';
let passed = 0;
let failed = 0;

async function call(path, opts = {}) {
  const res = await fetch(BASE + path, {
    method: opts.method || 'GET',
    headers: { 'Content-Type': 'application/json', Origin: BASE },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  let json = null;
  try { json = await res.json(); } catch {}
  return { status: res.status, json };
}

function check(name, cond, extra) {
  if (cond) { passed++; console.log(`  ✔ ${name}`); }
  else { failed++; console.log(`  ✘ ${name}`, extra !== undefined ? JSON.stringify(extra).slice(0, 400) : ''); }
}

const customer = { name: 'Roberto González', email: 'roberto@auracoffee.mx', phone: '55 1234 5678' };

async function newIntent(items = ['impi-completo'], plan, extra = {}) {
  return call('/api/checkout/create-intent', { method: 'POST', body: { items, plan, customer, meta: { brandName: 'Aura Coffee' }, tracking: { fbp: 'fb.1.123.456', sourceUrl: BASE + '/#/checkout' }, ...extra } });
}

async function pay(clientSecret, action, payload = {}) {
  return call('/api/checkout/simulate-payment', { method: 'POST', body: { clientSecret, action, ...payload } });
}

const card = (number, extra = {}) => ({ card: { number, exp: '12/34', cvc: number.startsWith('3') ? '1234' : '123', name: 'ROBERTO GONZALEZ' }, ...extra });

console.log(`\nDilo Checkout API E2E → ${BASE}\n`);

console.log('0. Configuración pública');
{
  const r = await call('/api/checkout/config');
  check('config → 200', r.status === 200 && r.json?.ok !== false, r.json);
  check('config modo simulado sin llaves', r.json?.mode === 'simulated' && r.json?.available === true, r.json);
  check('config no expone secretos', !JSON.stringify(r.json).includes('sk_'), r.json);
  check('config WhatsApp soporte', /^\d{10,13}$/.test(r.json?.supportWhatsApp || ''), r.json);
}

console.log('1. Validaciones de create-intent');
{
  let r = await call('/api/checkout/create-intent', { method: 'GET' });
  check('GET → 405', r.status === 405, r);
  r = await newIntent([]);
  check('carrito vacío → 400', r.status === 400 && r.json.code === 'invalid_cart', r.json);
  r = await newIntent(['producto-falso']);
  check('SKU inexistente → 400', r.status === 400, r.json);
  r = await newIntent(['impi-completo', 'branding-starter']);
  check('categorías mezcladas → 400', r.status === 400, r.json);
  r = await newIntent(['impi-addon-monitoreo']);
  check('solo complemento sin paquete → 400', r.status === 400, r.json);
  r = await call('/api/checkout/create-intent', { method: 'POST', body: { items: ['impi-completo'], customer: { name: 'A', email: 'malo', phone: '12' } } });
  check('cliente inválido → 422 con campos', r.status === 422 && r.json.fields?.email && r.json.fields?.phone && r.json.fields?.name, r.json);
  r = await newIntent(['impi-completo'], undefined, { billing: { required: true, rfc: 'XXX', razonSocial: '', regimen: '', usoCfdi: '', cp: '1' } });
  check('CFDI inválido → 422', r.status === 422 && r.json.fields?.rfc && r.json.fields?.cp, r.json);
  r = await newIntent(['impi-completo'], undefined, { billing: { required: true, rfc: 'GOGR850101AB1', razonSocial: 'Roberto González', regimen: '612', usoCfdi: 'G03', cp: '06600' } });
  check('CFDI válido → 200', r.status === 200 && r.json.ok, r.json);
  r = await call('/api/checkout/create-intent', { method: 'POST', body: { items: ['impi-dictamen'], customer, amount: 1 } });
  check('ignora monto enviado por el cliente (cobra $1,490)', r.json?.pricing?.totalCents === 149000, r.json?.pricing);
}

console.log('2. Precios y planes');
{
  let r = await newIntent(['impi-completo', 'impi-addon-monitoreo']);
  check('IMPI completo + monitoreo = $9,749.00', r.json?.pricing?.totalCents === 974900, r.json?.pricing);
  check('modo simulado', r.json?.mode === 'simulated', r.json?.mode);
  check('folio con prefijo IMPI', /^IMPI-\d{8}-[A-F0-9]{6}$/.test(r.json?.orderId || ''), r.json?.orderId);
  r = await newIntent(['branding-ecosistema'], 'deposit-50');
  check('Branding 50% anticipo = $8,250.00 y saldo $8,250.00', r.json?.pricing?.totalCents === 825000 && r.json?.pricing?.balanceCents === 825000, r.json?.pricing);
  r = await newIntent(['branding-ecosistema', 'branding-addon-social'], 'full-5off');
  check('Branding contado -5% = $18,335.00', r.json?.pricing?.totalCents === 1833500 && r.json?.pricing?.discountCents === 96500, r.json?.pricing);
  r = await newIntent(['impi-completo'], 'deposit-50');
  check('plan no permitido en IMPI cae a pago completo', r.json?.pricing?.plan === 'full' && r.json?.pricing?.totalCents === 789900, r.json?.pricing);
}

console.log('3. Tarjeta aprobada (4242)');
{
  const { json: intent } = await newIntent(['impi-completo']);
  let r = await pay(intent.clientSecret, 'pay_card', card('4242 4242 4242 4242'));
  check('status succeeded', r.json?.order?.status === 'succeeded', r.json);
  check('últimos 4 = 4242 y marca visa', r.json?.order?.cardLast4 === '4242' && r.json?.order?.cardBrand === 'visa', r.json?.order);
  const s = await call('/api/checkout/order-status?client_secret=' + encodeURIComponent(r.json.clientSecret));
  check('order-status confirma pago', s.json?.order?.status === 'succeeded' && s.json?.order?.orderId === intent.orderId, s.json);
  const again = await pay(r.json.clientSecret, 'pay_card', card('4000000000000002'));
  check('re-pagar una orden pagada no la altera', again.json?.order?.status === 'succeeded', again.json);
}

console.log('4. Rechazos y validaciones de tarjeta');
{
  const cases = [
    ['4000000000000002', 'card_declined'],
    ['4000000000009995', 'insufficient_funds'],
    ['4000000000000069', 'expired_card'],
    ['4000000000000127', 'incorrect_cvc'],
    ['4242424242424241', 'incorrect_number'],
    ['4111111111111111', 'test_mode_live_card']
  ];
  for (const [num, code] of cases) {
    const { json: intent } = await newIntent(['impi-dictamen']);
    const r = await pay(intent.clientSecret, 'pay_card', card(num));
    check(`${num} → ${code}`, r.json?.order?.status === 'requires_payment_method' && r.json?.order?.error?.code === code, r.json?.order);
  }
  const { json: intent } = await newIntent(['impi-dictamen']);
  let r = await pay(intent.clientSecret, 'pay_card', { card: { number: '4242424242424242', exp: '01/20', cvc: '123', name: 'ROBERTO' } });
  check('tarjeta vencida por fecha → invalid_expiry', r.json?.order?.error?.code === 'invalid_expiry', r.json?.order);
  r = await pay(intent.clientSecret, 'pay_card', card('4000000000000002'));
  const retry = await pay(r.json.clientSecret, 'pay_card', card('4242424242424242'));
  check('reintento tras rechazo con otra tarjeta → succeeded', retry.json?.order?.status === 'succeeded', retry.json?.order);
}

console.log('5. Meses sin intereses');
{
  let { json: intent } = await newIntent(['impi-completo']);
  let r = await pay(intent.clientSecret, 'pay_card', card('4242424242424242', { installments: 6 }));
  check('6 MSI en $7,899 → aprobado con 6 meses', r.json?.order?.status === 'succeeded' && r.json?.order?.installments === 6, r.json?.order);
  ({ json: intent } = await newIntent(['impi-dictamen']));
  r = await pay(intent.clientSecret, 'pay_card', card('4242424242424242', { installments: 12 }));
  check('12 MSI en $1,490 (mín. $1,200 ok) → aprobado', r.json?.order?.status === 'succeeded', r.json?.order);
  ({ json: intent } = await newIntent(['impi-contrato']));
  r = await pay(intent.clientSecret, 'pay_card', card('4242424242424242', { installments: 5 }));
  check('plan de 5 meses inexistente → rechazado', r.json?.order?.error?.code === 'installments_unavailable', r.json?.order);
}

console.log('6. 3D Secure');
{
  let { json: intent } = await newIntent(['impi-completo']);
  let r = await pay(intent.clientSecret, 'pay_card', card('4000002500003155'));
  check('4000 0025 0000 3155 → requires_action', r.json?.order?.status === 'requires_action' && r.json?.order?.pending?.method === 'card_3ds', r.json?.order);
  const ok = await pay(r.json.clientSecret, 'confirm_3ds', { approve: true });
  check('autorizar 3DS → succeeded', ok.json?.order?.status === 'succeeded', ok.json?.order);
  ({ json: intent } = await newIntent(['impi-completo']));
  r = await pay(intent.clientSecret, 'pay_card', card('4000002500003155'));
  const ko = await pay(r.json.clientSecret, 'confirm_3ds', { approve: false });
  check('rechazar 3DS → authentication_failure', ko.json?.order?.error?.code === 'payment_intent_authentication_failure', ko.json?.order);
}

console.log('7. SPEI');
{
  const { json: intent } = await newIntent(['impi-completo']);
  const r = await pay(intent.clientSecret, 'pay_spei');
  const p = r.json?.order?.pending;
  check('requires_action con instrucciones SPEI', r.json?.order?.status === 'requires_action' && p?.method === 'spei', r.json?.order);
  const clabe = p?.clabe || '';
  const w = [3, 7, 1];
  const sum = clabe.slice(0, 17).split('').reduce((a, d, i) => a + ((Number(d) * w[i % 3]) % 10), 0);
  check('CLABE de 18 dígitos con dígito verificador válido', clabe.length === 18 && Number(clabe[17]) === (10 - (sum % 10)) % 10, clabe);
  check('monto exacto = total', p?.amountCents === 789900, p);
  const paid = await pay(r.json.clientSecret, 'simulate_funds_received');
  check('transferencia recibida → succeeded', paid.json?.order?.status === 'succeeded', paid.json?.order);
}

console.log('8. OXXO');
{
  let { json: intent } = await newIntent(['impi-completo']);
  let r = await pay(intent.clientSecret, 'pay_oxxo');
  check('referencia OXXO de 14 dígitos', /^\d{14}$/.test(r.json?.order?.pending?.reference || ''), r.json?.order);
  const paid = await pay(r.json.clientSecret, 'simulate_funds_received');
  check('pago en tienda → succeeded', paid.json?.order?.status === 'succeeded', paid.json?.order);
  ({ json: intent } = await newIntent(['branding-flagship'], 'full-5off'));
  r = await pay(intent.clientSecret, 'pay_oxxo');
  check('OXXO > $10,000 → amount_too_large', r.json?.order?.error?.code === 'amount_too_large', r.json?.order);
}

console.log('8b. Detalle de orden pagada');
{
  const { json: intent } = await newIntent(['impi-dictamen']);
  const r = await pay(intent.clientSecret, 'pay_card', card('5555555555554444'));
  const status = await call(`/api/checkout/order-status?client_secret=${encodeURIComponent(r.json.clientSecret)}`);
  const o = status.json?.order || {};
  check('orden pagada con marca/últimos 4/fecha', o.status === 'succeeded' && o.cardBrand === 'mastercard' && o.cardLast4 === '4444' && !!o.paidAt, o);
  check('orden conserva meta y cliente', o.meta?.brandName === 'Aura Coffee' && o.customer?.email === customer.email, o);
}

console.log('9. Seguridad');
{
  const { json: intent } = await newIntent(['impi-completo']);
  const tampered = intent.clientSecret.replace(/.$/, (c) => (c === 'A' ? 'B' : 'A'));
  let r = await pay(tampered, 'pay_card', card('4242424242424242'));
  check('token alterado → 400 invalid_session', r.status === 400 && r.json?.code === 'invalid_session', r.json);
  const [body, sig] = intent.clientSecret.slice(4).split('.');
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
  payload.amountCents = 100;
  const forged = 'sim_' + Buffer.from(JSON.stringify(payload)).toString('base64url') + '.' + sig;
  r = await pay(forged, 'pay_card', card('4242424242424242'));
  check('monto falsificado en token → rechazado', r.status === 400, r.json);
  r = await call('/api/checkout/order-status?client_secret=pi_123_secret_abc');
  check('order-status Stripe sin claves → 503', r.status === 503, r.json);
  r = await call('/api/checkout/order-status?client_secret=basura');
  check('order-status referencia inválida → 400', r.status === 400, r.json);
  r = await call('/api/checkout/webhook', { method: 'POST', body: {} });
  check('webhook sin configurar → 503', r.status === 503, r.json);
  r = await call('/api/_lib/checkout');
  check('/api/_lib no es accesible → 404', r.status === 404, r.json);
  r = await pay(intent.clientSecret, 'accion-rara');
  check('acción desconocida → 400', r.status === 400, r.json);
}

console.log(`\nResultado: ${passed} OK · ${failed} fallidas\n`);
process.exit(failed ? 1 : 0);
