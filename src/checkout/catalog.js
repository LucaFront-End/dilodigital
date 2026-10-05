/**
 * ================================================================
 * DILO CHECKOUT — CATÁLOGO DE PRODUCTOS (FUENTE ÚNICA DE PRECIOS)
 * ----------------------------------------------------------------
 * Este archivo es importado por el navegador (para mostrar precios)
 * y por las funciones serverless /api/checkout/* (para cobrar).
 * El servidor SIEMPRE recalcula el total con este catálogo: el monto
 * enviado por el navegador nunca se usa para cobrar.
 *
 * Para reutilizar el checkout en otro proyecto: reemplaza PRODUCTS,
 * PAYMENT_PLANS y CATEGORY_RULES. El resto del motor no cambia.
 *
 * Todos los precios están en PESOS MXN con IVA incluido.
 * Internamente se calcula en centavos (enteros) para evitar errores
 * de punto flotante.
 * ================================================================
 */

export const CURRENCY = 'mxn';
export const IVA_RATE = 0.16;

export const PRODUCTS = {
  // ── Registro de Marca IMPI ─────────────────────────────────────
  'impi-dictamen': {
    name: 'Dictamen & Viabilidad Previa',
    description: 'Búsqueda fonética en base oficial IMPI + dictamen por abogado en menos de 24 h.',
    price: 1490,
    category: 'impi',
    kind: 'base'
  },
  'impi-completo': {
    name: 'Viabilidad + Registro + Derechos del IMPI',
    description: 'Expediente completo de marca. Incluye $3,126.41 de derechos oficiales IMPI por 10 años.',
    price: 7899,
    category: 'impi',
    kind: 'base'
  },
  'impi-declaracion': {
    name: 'Declaración de Uso (Honorarios + Pago IMPI)',
    description: 'Trámite obligatorio al 3er año con derechos oficiales incluidos.',
    price: 2999,
    category: 'impi',
    kind: 'base'
  },
  'impi-contrato': {
    name: 'Contrato Legal de Cesión de Derechos',
    description: 'Cesión patrimonial y de autoría sobre logotipo y nombre comercial.',
    price: 1200,
    category: 'impi',
    kind: 'base'
  },
  'impi-addon-monitoreo': {
    name: 'Monitoreo Permanente 10 Años',
    description: 'Vigilancia de marcas similares en Gaceta IMPI.',
    pitch: 'Te avisamos si alguien intenta registrar una marca parecida a la tuya.',
    price: 1850,
    category: 'impi',
    kind: 'addon',
    suggestFor: ['impi-completo', 'impi-declaracion']
  },
  'impi-addon-clase': {
    name: 'Clase NIZA Adicional',
    description: 'Protección en una clase adicional de productos o servicios.',
    pitch: 'Protege tu marca también en otro giro (ej. productos + servicios).',
    price: 3950,
    category: 'impi',
    kind: 'addon',
    suggestFor: ['impi-completo']
  },
  'impi-addon-cesion': {
    name: 'Contrato de Cesión de Derechos',
    description: 'Cesión de autoría del diseño a favor del titular.',
    pitch: 'Asegura que el diseño de tu logo sea 100% tuyo legalmente.',
    price: 1200,
    category: 'impi',
    kind: 'addon',
    suggestFor: ['impi-completo', 'impi-dictamen'],
    notWith: ['impi-contrato']
  },

  // ── Branding & Identidad ──────────────────────────────────────
  'branding-starter': {
    name: 'Branding Starter',
    description: 'Identidad visual esencial para lanzar tu marca.',
    price: 8900,
    category: 'branding',
    kind: 'base'
  },
  'branding-ecosistema': {
    name: 'Ecosistema Visual 360°',
    description: '3 propuestas conceptuales, manual de identidad 40+ páginas y kit digital.',
    price: 16500,
    category: 'branding',
    kind: 'base'
  },
  'branding-flagship': {
    name: 'Flagship Brand & Digital',
    description: 'Identidad 360°, diseño UI de landing y registro IMPI incluido.',
    price: 28900,
    category: 'branding',
    kind: 'base'
  },
  'branding-addon-guardianship': {
    name: 'Brand Guardianship (1er mes)',
    description: 'Supervisión mensual de piezas gráficas.',
    pitch: 'Un director de arte revisa cada pieza que produzca tu equipo.',
    price: 4500,
    category: 'branding',
    kind: 'addon',
    suggestFor: ['branding-ecosistema', 'branding-flagship']
  },
  'branding-addon-impi': {
    name: 'Registro de Marca IMPI en Combo',
    description: 'Blindaje legal ante el IMPI con descuento de paquete.',
    pitch: 'Registra tu nueva marca con $1,476 de descuento por combo.',
    price: 5500,
    category: 'branding',
    kind: 'addon',
    suggestFor: ['branding-starter', 'branding-ecosistema'],
    notWith: ['branding-flagship']
  },
  'branding-addon-social': {
    name: 'Pack 15 Plantillas Extra Redes',
    description: 'Plantillas Figma/Canva para carruseles, stories y portadas.',
    pitch: 'Publica con tu nueva identidad desde el primer día.',
    price: 2800,
    category: 'branding',
    kind: 'addon',
    suggestFor: ['branding-starter', 'branding-ecosistema', 'branding-flagship']
  }
};

/**
 * Esquemas de pago. `factor` se aplica al subtotal para obtener el
 * monto a cobrar HOY. `balanceDue` indica si queda saldo pendiente.
 */
export const PAYMENT_PLANS = {
  full: {
    label: 'Pago completo',
    factor: 1,
    balanceDue: false
  },
  'deposit-50': {
    label: '50% de anticipo + 50% contra entrega',
    factor: 0.5,
    balanceDue: true
  },
  'full-5off': {
    label: '100% de contado con 5% de descuento',
    factor: 0.95,
    balanceDue: false
  }
};

/** Reglas por categoría: qué planes se permiten y cuál es el default. */
export const CATEGORY_RULES = {
  impi: {
    label: 'Registro de Marca IMPI',
    plans: ['full'],
    defaultPlan: 'full',
    returnPath: '#/registro-marca',
    folioPrefix: 'IMPI'
  },
  branding: {
    label: 'Branding & Identidad',
    plans: ['deposit-50', 'full-5off'],
    defaultPlan: 'deposit-50',
    returnPath: '#/branding',
    folioPrefix: 'BRAND'
  }
};

export const MAX_ITEMS = 10;

const toCents = (pesos) => Math.round(pesos * 100);

/** Complementos sugeridos para un paquete principal (upsell en el checkout). */
export function getSuggestedAddons(baseSku) {
  const base = PRODUCTS[baseSku];
  if (!base) return [];
  return Object.entries(PRODUCTS)
    .filter(([, p]) => p.kind === 'addon' && p.category === base.category)
    .filter(([, p]) => !p.suggestFor || p.suggestFor.includes(baseSku))
    .filter(([, p]) => !(p.notWith || []).includes(baseSku))
    .map(([sku]) => sku);
}

// ── Cupones ─────────────────────────────────────────────────────
// Se definen SOLO en el servidor (variable CHECKOUT_COUPONS, JSON):
//   {"LANZAMIENTO10": {"percent": 10, "categories": ["impi"], "expires": "2026-12-31"},
//    "BRAND1000":     {"amount": 1000, "minSubtotal": 8000, "label": "$1,000 de regalo"}}
// El navegador nunca conoce la lista: valida vía /api/checkout/quote.

export function normalizeCouponCode(code) {
  return String(code || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 30);
}

export function evaluateCoupon(code, coupons, { category, subtotalCents, now = Date.now() }) {
  const key = normalizeCouponCode(code);
  if (!key) return null;
  const c = coupons && Object.prototype.hasOwnProperty.call(coupons, key) ? coupons[key] : null;
  if (!c || typeof c !== 'object') return { ok: false, error: 'Ese código no es válido.' };
  if (c.expires && now > Date.parse(`${c.expires}T23:59:59-06:00`)) return { ok: false, error: 'Ese código ya expiró.' };
  if (Array.isArray(c.categories) && c.categories.length && !c.categories.includes(category)) {
    return { ok: false, error: 'Ese código no aplica para este servicio.' };
  }
  if (c.minSubtotal && subtotalCents < toCents(c.minSubtotal)) {
    return { ok: false, error: `Ese código aplica en compras desde ${formatMXN(toCents(c.minSubtotal))}.` };
  }
  let discountCents = c.percent ? Math.round((subtotalCents * Math.min(Number(c.percent) || 0, 90)) / 100) : toCents(Number(c.amount) || 0);
  discountCents = Math.min(discountCents, subtotalCents - 100); // nunca deja la orden en $0
  if (!(discountCents > 0)) return { ok: false, error: 'Ese código no es válido.' };
  return {
    ok: true,
    code: key,
    discountCents,
    label: c.label || (c.percent ? `${Number(c.percent)}% de descuento` : `${formatMXN(discountCents)} de descuento`)
  };
}

/**
 * Calcula el carrito de forma determinista.
 * @param {{ items: string[], plan?: string, coupon?: string, coupons?: object }} input
 * @returns {{ ok: true, ... } | { ok: false, error: string }}
 */
export function priceCart(input = {}) {
  const rawItems = Array.isArray(input.items) ? input.items : [];
  let skus = [...new Set(rawItems.map((s) => String(s || '').trim()).filter(Boolean))];

  if (skus.length === 0) return { ok: false, error: 'El carrito está vacío.' };
  if (skus.length > MAX_ITEMS) return { ok: false, error: 'Demasiados productos en el carrito.' };

  const unknown = skus.filter((sku) => !PRODUCTS[sku]);
  if (unknown.length) return { ok: false, error: `Producto no disponible: ${unknown.join(', ')}` };

  const categories = [...new Set(skus.map((sku) => PRODUCTS[sku].category))];
  if (categories.length !== 1) {
    return { ok: false, error: 'No se pueden combinar servicios de distintas categorías en una misma orden.' };
  }
  const category = categories[0];
  const rules = CATEGORY_RULES[category];

  const bases = skus.filter((sku) => PRODUCTS[sku].kind === 'base');
  if (bases.length !== 1) {
    return { ok: false, error: 'La orden debe incluir exactamente un paquete principal.' };
  }

  // Complementos incompatibles con el paquete (ya incluidos): se quitan para no cobrar doble
  const notices = [];
  skus = skus.filter((sku) => {
    const p = PRODUCTS[sku];
    if (p.kind === 'addon' && (p.notWith || []).includes(bases[0])) {
      notices.push(`${p.name} ya está incluido en ${PRODUCTS[bases[0]].name}; no se cobra.`);
      return false;
    }
    return true;
  });

  const plan = input.plan && rules.plans.includes(input.plan) ? input.plan : rules.defaultPlan;
  const planDef = PAYMENT_PLANS[plan];

  // Paquete principal primero, luego complementos
  const ordered = [...bases, ...skus.filter((sku) => PRODUCTS[sku].kind === 'addon')];
  const lines = ordered.map((sku) => ({
    sku,
    name: PRODUCTS[sku].name,
    description: PRODUCTS[sku].description,
    kind: PRODUCTS[sku].kind,
    amountCents: toCents(PRODUCTS[sku].price)
  }));

  const subtotalCents = lines.reduce((sum, l) => sum + l.amountCents, 0);

  // Cupón (antes del esquema de pago)
  const couponResult = input.coupon ? evaluateCoupon(input.coupon, input.coupons, { category, subtotalCents }) : null;
  const coupon = couponResult?.ok ? couponResult : null;
  const couponDiscountCents = coupon ? coupon.discountCents : 0;
  const netCents = subtotalCents - couponDiscountCents;

  const dueTodayCents = Math.round(netCents * planDef.factor);
  const discountCents = planDef.balanceDue ? 0 : netCents - dueTodayCents;
  const balanceCents = planDef.balanceDue ? netCents - dueTodayCents : 0;
  const ivaCents = Math.round(dueTodayCents - dueTodayCents / (1 + IVA_RATE));

  return {
    ok: true,
    currency: CURRENCY,
    category,
    categoryLabel: rules.label,
    plan,
    planLabel: planDef.label,
    availablePlans: rules.plans.map((p) => ({ id: p, label: PAYMENT_PLANS[p].label })),
    items: ordered,
    baseSku: bases[0],
    lines,
    subtotalCents,
    couponCode: coupon?.code || '',
    couponLabel: coupon?.label || '',
    couponDiscountCents,
    couponError: couponResult && !couponResult.ok ? couponResult.error : '',
    discountCents,
    balanceCents,
    totalCents: dueTodayCents,
    ivaCents,
    notices,
    primaryName: PRODUCTS[bases[0]].name,
    folioPrefix: rules.folioPrefix,
    returnPath: rules.returnPath
  };
}

export function formatMXN(cents) {
  return (cents / 100).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });
}
