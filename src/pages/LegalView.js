/**
 * ================================================================
 * PÁGINAS LEGALES — #/terminos y #/aviso-de-privacidad
 * ----------------------------------------------------------------
 * Plantillas base conforme a la legislación mexicana (LFPDPPP y Ley
 * Federal de Protección al Consumidor). IMPORTANTE: deben ser
 * revisadas y completadas por el área legal (razón social, domicilio
 * fiscal y RFC del responsable) antes de considerarse definitivas.
 * ================================================================
 */

import { esc, icons } from '../checkout/ui.js';

const UPDATED = '5 de octubre de 2026';
const CONTACT_EMAIL = 'hola@dilodigitalmx.com';
const CONTACT_WA = '+52 55 9244 1070';

const DOCS = {
  terminos: {
    path: '#/terminos',
    title: 'Términos y condiciones de servicio',
    kicker: 'Legal',
    intro:
      'Estos términos regulan la contratación de los servicios de Dilo Digital MX a través de este sitio, incluido el pago en línea. Al confirmar una compra aceptas estas condiciones.',
    sections: [
      [
        'Quiénes somos',
        `<p>Dilo Digital MX (“Dilo Digital”, “nosotros”) es una agencia de marketing, branding y gestión de trámites de propiedad industrial con operación en la Ciudad de México. Puedes contactarnos en <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> o por WhatsApp al ${CONTACT_WA}.</p>`
      ],
      [
        'Servicios y alcance',
        '<p>El alcance de cada servicio es el descrito en la página del paquete contratado y en el resumen de tu orden. Cualquier trabajo adicional se cotiza por separado y requiere tu aprobación previa.</p><p>En los trámites ante el Instituto Mexicano de la Propiedad Industrial (IMPI), Dilo Digital actúa como gestor y asesor. <strong>La resolución de otorgamiento de un registro corresponde exclusivamente al IMPI</strong>, por lo que no podemos garantizar el resultado del examen de fondo, aunque sí la correcta preparación, presentación y seguimiento del expediente.</p>'
      ],
      [
        'Precios e impuestos',
        '<p>Todos los precios se expresan en pesos mexicanos (MXN) e <strong>incluyen el IVA</strong>. Cuando un paquete incluye derechos oficiales del IMPI, el monto correspondiente se indica en la descripción del producto.</p><p>El monto que se cobra es siempre el calculado por nuestro servidor al momento de confirmar el pago y es el que aparece en tu comprobante.</p>'
      ],
      [
        'Formas y esquemas de pago',
        '<p>Aceptamos tarjetas de crédito y débito (con meses sin intereses en tarjetas participantes), transferencia SPEI y pago en efectivo en tiendas OXXO. Los pagos se procesan a través de un proveedor certificado PCI DSS; Dilo Digital no almacena los datos de tu tarjeta.</p><ul><li><strong>Pago completo:</strong> se liquida el 100% al contratar.</li><li><strong>Anticipo del 50%:</strong> el saldo restante se liquida contra la entrega final del proyecto, antes de la liberación de archivos editables.</li><li><strong>Contado con descuento:</strong> el descuento indicado aplica solo al liquidar el 100% en una sola exhibición.</li></ul><p>Las referencias de OXXO y las CLABE de SPEI tienen vigencia limitada; si vencen sin pago, la orden se cancela automáticamente sin cargo.</p>'
      ],
      [
        'Cupones y promociones',
        '<p>Los códigos de descuento son personales, no acumulables entre sí salvo indicación expresa, aplican únicamente a los servicios y periodos señalados y no son canjeables por dinero.</p>'
      ],
      [
        'Facturación',
        `<p>Emitimos factura electrónica (CFDI 4.0). Puedes solicitarla al momento de pagar capturando tus datos fiscales; si no lo hiciste, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> con tu folio de orden y tu constancia de situación fiscal.</p>`
      ],
      [
        'Inicio y tiempos de entrega',
        '<p>Los plazos comienzan a contar a partir de la confirmación del pago y de la recepción de la información necesaria para iniciar (por ejemplo, el brief o la documentación del titular). Los tiempos de respuesta de autoridades como el IMPI son ajenos a Dilo Digital.</p>'
      ],
      [
        'Cancelaciones y reembolsos',
        `<p>Si deseas cancelar un servicio, escríbenos con tu folio. Las solicitudes se resuelven conforme al avance del trabajo realizado a la fecha de la solicitud. <strong>Los derechos gubernamentales pagados al IMPI no son reembolsables una vez presentada la solicitud</strong>, ya que son cobrados por la autoridad.</p><p>Si no reconoces un cargo, contáctanos antes de iniciar una aclaración con tu banco para resolverlo de inmediato.</p>`
      ],
      [
        'Propiedad intelectual de los entregables',
        '<p>Los derechos patrimoniales sobre los entregables finales aprobados se transmiten al cliente una vez liquidado el 100% del servicio. Dilo Digital podrá mostrar los trabajos en su portafolio, salvo que se haya pactado confidencialidad por escrito.</p>'
      ],
      [
        'Confidencialidad y datos personales',
        '<p>Tratamos la información de tu negocio con confidencialidad. El tratamiento de tus datos personales se rige por nuestro <a href="#/aviso-de-privacidad">Aviso de privacidad</a>.</p>'
      ],
      [
        'Legislación aplicable',
        '<p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, sin perjuicio de los derechos que te otorga la Ley Federal de Protección al Consumidor ante la PROFECO.</p>'
      ]
    ]
  },
  privacidad: {
    path: '#/aviso-de-privacidad',
    title: 'Aviso de privacidad integral',
    kicker: 'Privacidad',
    intro:
      'En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, te informamos cómo recabamos, usamos y protegemos tus datos personales.',
    sections: [
      [
        'Responsable',
        `<p>Dilo Digital MX, con operación en la Ciudad de México, es responsable del tratamiento de tus datos personales. Contacto de privacidad: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`
      ],
      [
        'Datos que recabamos',
        '<ul><li><strong>Identificación y contacto:</strong> nombre, correo electrónico y número de WhatsApp.</li><li><strong>Fiscales</strong> (solo si solicitas factura): RFC, razón social, régimen fiscal, uso de CFDI y código postal.</li><li><strong>Del proyecto o trámite:</strong> nombre de la marca, giro, clase de Niza y documentación del titular.</li><li><strong>De pago:</strong> método utilizado, últimos 4 dígitos y marca de la tarjeta. Los datos completos de la tarjeta los procesa directamente nuestro proveedor de pagos certificado; nosotros no los recibimos ni almacenamos.</li><li><strong>De navegación:</strong> dirección IP, tipo de navegador, páginas visitadas e identificadores de cookies.</li></ul><p>No recabamos datos personales sensibles.</p>'
      ],
      [
        'Finalidades primarias',
        '<p>Necesarias para el servicio que solicitas:</p><ul><li>Procesar tu orden y tu pago, y enviarte el comprobante.</li><li>Prestar el servicio contratado, incluida la presentación y seguimiento de trámites ante el IMPI.</li><li>Emitir tu factura electrónica.</li><li>Contactarte sobre el avance de tu orden y atender aclaraciones.</li></ul>'
      ],
      [
        'Finalidades secundarias',
        `<p>Enviarte promociones y contenido de marketing, y medir la efectividad de nuestra publicidad. Si no deseas que tus datos se usen para estas finalidades, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>; tu negativa no afectará los servicios contratados.</p>`
      ],
      [
        'Transferencias y encargados',
        '<p>Para cumplir las finalidades primarias compartimos los datos estrictamente necesarios con:</p><ul><li><strong>IMPI</strong>, para la tramitación de solicitudes de registro.</li><li><strong>Procesadores de pago</strong> (por ejemplo, Stripe), para cobrar de forma segura.</li><li><strong>Proveedores de facturación (PAC) y el SAT</strong>, para emitir tu CFDI.</li><li><strong>Proveedores de hospedaje y CRM</strong>, que almacenan la información por cuenta nuestra.</li><li><strong>Plataformas publicitarias</strong> (como Meta), únicamente con identificadores cifrados para medir conversiones.</li></ul><p>No vendemos tus datos personales.</p>'
      ],
      [
        'Derechos ARCO y revocación',
        `<p>Puedes Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos, así como revocar tu consentimiento, enviando una solicitud a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> con tu nombre, un medio para responderte, una identificación y la descripción clara de lo que solicitas. Daremos respuesta en los plazos que establece la ley.</p>`
      ],
      [
        'Cookies y tecnologías similares',
        '<p>Usamos cookies propias y de terceros (incluido el píxel de Meta) para que el sitio funcione, recordar los datos que capturas en el checkout en tu propio dispositivo y medir nuestras campañas. Puedes deshabilitarlas desde la configuración de tu navegador; algunas funciones podrían no estar disponibles.</p>'
      ],
      [
        'Seguridad',
        '<p>Aplicamos medidas administrativas, técnicas y físicas para proteger tus datos, incluida la transmisión cifrada (TLS) en todo el sitio.</p>'
      ],
      [
        'Cambios a este aviso',
        'Cualquier modificación se publicará en esta página indicando la fecha de última actualización.'
      ]
    ]
  }
};

export function getLegalDocKey(path) {
  if (path === '#/terminos' || path === '#/terminos-y-condiciones') return 'terminos';
  if (path === '#/aviso-de-privacidad' || path === '#/privacidad') return 'privacidad';
  return null;
}

export function renderLegalView(key) {
  const doc = DOCS[key] || DOCS.terminos;
  const other = key === 'privacidad' ? DOCS.terminos : DOCS.privacidad;
  const slug = (t) =>
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return `
    <main class="dlg-page" id="dlg-page" data-doc="${key}">
      <header class="dlg-header">
        <div class="dlg-header-inner">
          <a href="#/" class="dlg-back" id="dlg-back">${icons.arrowLeft(16)}<span>Volver al sitio</span></a>
          <a href="#/" class="dlg-logo" aria-label="Dilo Digital — Inicio"><img src="/brand/dilo-logo-dark.png" alt="Dilo Digital" width="70" height="38"></a>
          <a href="${other.path}" class="dlg-switch" id="dlg-switch">${esc(other.title.split(' ')[0] === 'Aviso' ? 'Aviso de privacidad' : 'Términos')}</a>
        </div>
      </header>

      <div class="dlg-hero">
        <span class="dlg-kicker">${icons.shield(14)} ${esc(doc.kicker)}</span>
        <h1 class="dlg-title">${esc(doc.title)}</h1>
        <p class="dlg-intro">${esc(doc.intro)}</p>
        <span class="dlg-updated">Última actualización: ${UPDATED}</span>
      </div>

      <div class="dlg-layout">
        <nav class="dlg-toc" aria-label="Contenido">
          <span class="dlg-toc-title">Contenido</span>
          <ol>
            ${doc.sections.map(([t]) => `<li><a href="#" data-target="dlg-${slug(t)}">${esc(t)}</a></li>`).join('')}
          </ol>
        </nav>
        <article class="dlg-article">
          ${doc.sections
            .map(
              ([t, html], i) => `
            <section class="dlg-section" id="dlg-${slug(t)}">
              <h2><span class="dlg-num">${String(i + 1).padStart(2, '0')}</span>${esc(t)}</h2>
              ${html.startsWith('<') ? html : `<p>${html}</p>`}
            </section>`
            )
            .join('')}
          <div class="dlg-contact">
            <div>
              <strong>¿Tienes dudas sobre este documento?</strong>
              <p>Escríbenos y te respondemos a la brevedad.</p>
            </div>
            <div class="dlg-contact-actions">
              <a href="mailto:${CONTACT_EMAIL}" class="dlg-btn">${esc(CONTACT_EMAIL)}</a>
              <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="dlg-btn is-wa">${icons.whatsapp(16)} WhatsApp</a>
            </div>
          </div>
        </article>
      </div>

      <footer class="dlg-footer">© ${new Date().getFullYear()} Dilo Digital MX · <a href="#/terminos">Términos</a> · <a href="#/aviso-de-privacidad">Privacidad</a></footer>
    </main>`;
}

export function initLegalEvents(key) {
  const doc = DOCS[key] || DOCS.terminos;
  document.title = `${doc.title} · Dilo Digital`;
  const page = document.getElementById('dlg-page');
  if (!page) return;
  // Índice: desplazamiento suave sin romper el router por hash
  page.querySelectorAll('.dlg-toc a[data-target]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
  // "Volver": regresa a la página anterior si venimos del sitio
  page.querySelector('#dlg-back')?.addEventListener('click', (e) => {
    if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
      e.preventDefault();
      window.history.back();
    }
  });
}
