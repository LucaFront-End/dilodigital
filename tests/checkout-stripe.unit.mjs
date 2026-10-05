// Pruebas offline del camino Stripe real (sin red ni llaves reales):
//  - webhook: verificación de firma (válida / inválida / ausente)
//  - normalización de PaymentIntent → orden (tarjeta + MSI, SPEI, OXXO, rechazo)
//  - detección de modo por variables de entorno
// Uso: npm run test:stripe
process.env.STRIPE_SECRET_KEY = 'sk_test_offline_dummy';
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_offline_dummy';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_offline_dummy';
process.env.CHECKOUT_SKIP_WIX = 'true';
delete process.env.META_CAPI_ACCESS_TOKEN;

const { default: webhook } = await import('../api/checkout/webhook.js');
const lib = await import('../api/_lib/checkout.js');
const { default: Stripe } = await import('stripe');

let passed = 0;
let failed = 0;
function check(name, cond, extra) {
  if (cond) { passed++; console.log(`  ✔ ${name}`); }
  else { failed++; console.log(`  ✘ ${name}`, extra !== undefined ? JSON.stringify(extra).slice(0, 400) : ''); }
}

function mockRes() {
  return {
    statusCode: 200, headers: {}, body: '',
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(b) { this.body = b || ''; }
  };
}

const basePi = {
  id: 'pi_3Test123',
  object: 'payment_intent',
  amount: 789900,
  amount_received: 789900,
  currency: 'mxn',
  status: 'succeeded',
  created: 1790000000,
  receipt_email: 'ana@aura.mx',
  payment_method_types: ['card', 'customer_balance', 'oxxo'],
  metadata: {
    order_id: 'IMPI-TEST-0001', items: 'impi-completo,impi-addon-monitoreo', plan: 'full', category: 'impi',
    customer_name: 'Ana Morales', customer_email: 'ana@aura.mx', customer_phone: '5512345678', brand_name: 'Aura'
  },
  latest_charge: {
    payment_method_details: { type: 'card', card: { brand: 'visa', last4: '4242', installments: { plan: { count: 6, interval: 'month', type: 'fixed_count' } } } }
  }
};

async function sendWebhook(event, { sign = true, secret = process.env.STRIPE_WEBHOOK_SECRET } = {}) {
  const payload = JSON.stringify(event);
  const headers = {};
  if (sign) headers['stripe-signature'] = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  const req = { method: 'POST', headers, rawBody: Buffer.from(payload) };
  const res = mockRes();
  await webhook(req, res);
  return { status: res.statusCode, json: JSON.parse(res.body || '{}') };
}

console.log('\nDilo Checkout · camino Stripe (offline)\n');

console.log('1. Modo por variables de entorno');
check('sk_test_ → stripe-test', lib.getGatewayMode() === 'stripe-test');
process.env.STRIPE_SECRET_KEY = 'sk_live_dummy';
check('sk_live_ → stripe-live', lib.getGatewayMode() === 'stripe-live');
process.env.STRIPE_SECRET_KEY = 'sk_test_offline_dummy';

console.log('2. Webhook: firma');
{
  const event = { id: 'evt_1', object: 'event', type: 'payment_intent.succeeded', livemode: false, data: { object: basePi } };
  let r = await sendWebhook(event);
  check('firma válida → 200 received', r.status === 200 && r.json.received === true, r);
  r = await sendWebhook(event, { secret: 'whsec_otro' });
  check('firma con otro secreto → 400', r.status === 400, r);
  r = await sendWebhook(event, { sign: false });
  check('sin firma → 400', r.status === 400, r);
  r = await sendWebhook({ ...event, type: 'charge.refunded', data: { object: { object: 'charge' } } });
  check('evento ajeno se ignora con 200', r.status === 200 && r.json.ignored, r);
  for (const type of ['payment_intent.processing', 'payment_intent.payment_failed']) {
    r = await sendWebhook({ ...event, type });
    check(`${type} → 200`, r.status === 200, r);
  }
  const res = mockRes();
  await webhook({ method: 'GET', headers: {} }, res);
  check('GET → 405', res.statusCode === 405);
}

console.log('3. Normalización de PaymentIntent');
{
  let o = lib.orderFromPaymentIntent(basePi, 'stripe-test');
  check('folio desde metadata', o.orderId === 'IMPI-TEST-0001', o);
  check('tarjeta visa •••• 4242 a 6 MSI', o.method === 'card' && o.cardBrand === 'visa' && o.cardLast4 === '4242' && o.installments === 6, o);
  check('items, plan y cliente', o.items.length === 2 && o.plan === 'full' && o.customer.email === 'ana@aura.mx' && o.meta.brandName === 'Aura', o);

  const speiPi = {
    ...basePi, status: 'requires_action', latest_charge: null,
    next_action: {
      type: 'display_bank_transfer_instructions',
      display_bank_transfer_instructions: {
        amount_remaining: 789900, reference: 'REF123', hosted_instructions_url: 'https://pay.stripe.com/x',
        financial_addresses: [{ type: 'spei', spei: { clabe: '646180157000000004', bank_name: 'STP' } }]
      }
    }
  };
  o = lib.orderFromPaymentIntent(speiPi, 'stripe-test');
  check('SPEI → pending con CLABE y banco', o.pending?.method === 'spei' && o.pending.clabe === '646180157000000004' && o.pending.bankName === 'STP' && o.method === 'customer_balance', o);

  const oxxoPi = {
    ...basePi, status: 'requires_action', latest_charge: null,
    next_action: { type: 'oxxo_display_details', oxxo_display_details: { number: '12345678901234', expires_after: 1790259200, hosted_voucher_url: 'https://pay.stripe.com/v' } }
  };
  o = lib.orderFromPaymentIntent(oxxoPi, 'stripe-test');
  check('OXXO → referencia, vencimiento y ficha', o.pending?.method === 'oxxo' && o.pending.reference === '12345678901234' && !!o.pending.expiresAt && o.pending.voucherUrl && o.method === 'oxxo', o);

  const failedPi = { ...basePi, status: 'requires_payment_method', latest_charge: null, last_payment_error: { code: 'card_declined', message: 'Tu tarjeta fue rechazada.' } };
  o = lib.orderFromPaymentIntent(failedPi, 'stripe-test');
  check('rechazo → error con mensaje', o.status === 'requires_payment_method' && o.error?.code === 'card_declined', o);

  check('client_secret válido se parsea', lib.parseStripeClientSecret('pi_3Abc_secret_XyZ') === 'pi_3Abc');
  check('client_secret inválido → null', lib.parseStripeClientSecret('pi_3Abc') === null);
}

console.log(`\nResultado: ${passed} OK · ${failed} fallidas\n`);
process.exit(failed ? 1 : 0);
