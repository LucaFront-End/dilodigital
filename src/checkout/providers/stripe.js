/**
 * ================================================================
 * DILO CHECKOUT — PROVEEDOR STRIPE (Payment Element)
 * ----------------------------------------------------------------
 * Los datos de tarjeta se capturan en iframes de Stripe: nunca tocan
 * nuestro servidor (cumplimiento PCI DSS SAQ-A).
 * Muestra automáticamente los métodos habilitados en el Dashboard de
 * Stripe (tarjeta + MSI, SPEI, OXXO, Apple Pay / Google Pay).
 * ================================================================
 */

let stripeJsPromise = null;

function loadStripeJs() {
  if (window.Stripe) return Promise.resolve(window.Stripe);
  if (!stripeJsPromise) {
    stripeJsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => (window.Stripe ? resolve(window.Stripe) : reject(new Error('Stripe.js no disponible')));
      script.onerror = () => {
        stripeJsPromise = null;
        reject(new Error('No se pudo cargar la pasarela segura. Desactiva bloqueadores de anuncios e intenta de nuevo.'));
      };
      document.head.appendChild(script);
    });
  }
  return stripeJsPromise;
}

export async function createStripeProvider({ container, publishableKey, clientSecret, customer = {}, returnUrl }) {
  const StripeCtor = await loadStripeJs();
  const stripe = StripeCtor(publishableKey, { locale: 'es-419' });

  const elements = stripe.elements({
    clientSecret,
    locale: 'es-419',
    fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' }],
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#FF5A1F',
        colorText: '#121316',
        colorTextSecondary: '#525866',
        colorDanger: '#DC2626',
        colorBackground: '#FFFFFF',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        borderRadius: '12px',
        spacingUnit: '4px'
      },
      rules: {
        '.Input': { border: '1.5px solid #E2E8F0', boxShadow: 'none', padding: '12px 14px' },
        '.Input:focus': { borderColor: '#FF5A1F', boxShadow: '0 0 0 3px rgba(255, 90, 31, 0.14)' },
        '.Tab': { border: '1.5px solid #E2E8F0', boxShadow: 'none' },
        '.Tab--selected': { borderColor: '#FF5A1F', boxShadow: '0 0 0 3px rgba(255, 90, 31, 0.12)' },
        '.Label': { fontWeight: '600' }
      }
    }
  });

  const paymentElement = elements.create('payment', {
    layout: { type: 'tabs', defaultCollapsed: false },
    business: { name: 'Dilo Digital' },
    defaultValues: {
      billingDetails: { name: customer.name || '', email: customer.email || '', phone: customer.phone || '' }
    }
  });

  container.innerHTML = '<div class="dco-stripe-element" id="dco-stripe-element"></div>';
  let method = 'card';
  let methodListener = () => {};

  await new Promise((resolve, reject) => {
    paymentElement.on('ready', resolve);
    paymentElement.on('loaderror', (e) => reject(new Error(e?.error?.message || 'No se pudo cargar el formulario de pago.')));
    paymentElement.mount('#dco-stripe-element');
  });

  paymentElement.on('change', (e) => {
    const type = e?.value?.type;
    if (type && type !== method) {
      method = type === 'customer_balance' ? 'spei' : type;
      methodListener(method);
    }
  });

  return {
    mode: 'stripe',
    getMethod: () => method,
    onMethodChange(cb) {
      methodListener = cb;
    },
    async confirm() {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: 'if_required'
      });
      if (error) {
        // validation_error = campos incompletos (Stripe ya los marca en el formulario)
        return {
          status: error.type === 'validation_error' ? 'invalid' : 'requires_payment_method',
          message: error.type === 'validation_error' ? '' : error.message,
          clientSecret
        };
      }
      return { status: paymentIntent.status, clientSecret, order: null, message: '' };
    },
    destroy() {
      try {
        paymentElement.destroy();
      } catch {}
      container.innerHTML = '';
    }
  };
}
