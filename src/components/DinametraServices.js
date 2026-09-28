// ================================================================
// DILO DIGITAL — CLEAN & AIRY SERVICES SHOWCASE (DINAMETRA STYLE)
// Minimal Text, High Visual Impact, Real Lottie Animations
// ================================================================

import lottie from 'lottie-web/build/player/lottie_light.js';

const SERVICES_DATA = [
  {
    id: 'registro-marca',
    number: '01',
    eyebrow: 'PROTECCIÓN & BLINDAJE LEGAL',
    title: 'Registro de Marca IMPI & Búsqueda Fonética',
    description: 'Protegemos tu nombre, logotipo y patrimonio comercial en México con dictamen legal en 24 horas y seguimiento online.',
    bullets: [
      'Búsqueda fonética en las 45 clases NIZA del IMPI',
      'Dictamen de viabilidad antes de pagar derechos gubernamentales',
      'Portal de seguimiento en vivo con alertas y renovaciones mensuales'
    ],
    primaryAction: {
      label: 'Analizar Coincidencias de Marca',
      href: '#/registro-marca',
      openModal: 'coincidencias'
    },
    secondaryAction: {
      label: 'Ver Portal de Trámites',
      href: '#/portal-tramites'
    },
    lottiePath: '/lotties/shield.json',
    isReversed: false
  },
  {
    id: 'marketing',
    number: '02',
    eyebrow: 'CONVERSIÓN & ESCALABILIDAD',
    title: 'Publicidad en Meta, Google & TikTok Ads',
    description: 'Estrategias orientadas a ventas reales y prospectos calificados, optimizando cada peso con atribución multicanal y ROAS positivo.',
    bullets: [
      'Google Search, Shopping & Display con intención de compra',
      'Meta Ads (Facebook e Instagram) con audiencias de alto valor',
      'Funnels automatizados de captura y seguimiento de clientes'
    ],
    primaryAction: {
      label: 'Cotizar Campaña de Ads',
      href: '#/cotizar',
      category: 'marketing'
    },
    secondaryAction: {
      label: 'Ver Casos de Éxito',
      href: '#/portafolio'
    },
    lottiePath: '/lotties/marketing.json',
    isReversed: true
  },
  {
    id: 'web-ecommerce',
    number: '03',
    eyebrow: 'HEADLESS & EXPERIENCIA DIGITAL',
    title: 'Desarrollo Web & Tiendas Online de Alta Velocidad',
    description: 'Sitios web ultrarrápidos con tiempos de carga inferiores a 1 segundo, diseñados en Figma y desarrollados con arquitectura Headless.',
    bullets: [
      'Wix Headless, React & Vite de última generación',
      'Pasarelas de pago integradas: Stripe, Mercado Pago y SPEI',
      'Diseño UI/UX minimalista orientado a conversión y mobile-first'
    ],
    primaryAction: {
      label: 'Cotizar Desarrollo Web',
      href: '#/cotizar',
      category: 'web-ecommerce'
    },
    secondaryAction: {
      label: 'Ver Arquitectura',
      href: '#/servicio/desarrollo-web-headless'
    },
    lottiePath: '/lotties/web.json',
    isReversed: false
  },
  {
    id: 'branding',
    number: '04',
    eyebrow: 'AUTORIDAD & PERCEPCIÓN DE VALOR',
    title: 'Branding que Vende y Construye Prestigio',
    description: 'Creamos identidades memorables que destacan de inmediato en tu industria y te permiten justificar precios más altos.',
    bullets: [
      'Naming estratégico y conceptualización de marca',
      'Manual de identidad visual completo: logotipo, paleta y tipografías',
      'Diseño de empaques, papelería ejecutiva y activos para redes'
    ],
    primaryAction: {
      label: 'Ver Paquetes de Branding',
      href: '#/categoria/branding-diseno'
    },
    secondaryAction: {
      label: 'Explorar Identidades',
      href: '#/portafolio'
    },
    lottiePath: '/lotties/branding.json',
    isReversed: true
  },
  {
    id: 'automatizacion',
    number: '05',
    eyebrow: 'IA & EFICIENCIA OPERATIVA',
    title: 'Automatizaciones & Agentes de IA 24/7',
    description: 'Responde a cada prospecto en menos de 30 segundos por WhatsApp, califica automáticamente y sincroniza todo con tu CRM.',
    bullets: [
      'Conexión oficial de WhatsApp Business API con CRM (Kommo / HubSpot)',
      'Agentes conversacionales con Inteligencia Artificial',
      'Funnels automáticos con Make, Zapier y Webhooks'
    ],
    primaryAction: {
      label: 'Automatizar mi Negocio',
      href: '#/cotizar',
      category: 'tecnologia'
    },
    secondaryAction: {
      label: 'Agendar Demostración',
      href: '#/contacto'
    },
    lottiePath: '/lotties/automatizacion.json',
    isReversed: false
  },
  {
    id: 'reportes',
    number: '06',
    eyebrow: 'DATOS REALES & TRANSPARENCIA',
    title: 'Reportes en Tiempo Real & Analítica de Crecimiento',
    description: 'Dashboards claros sin tecnicismos confusos: visualiza en tiempo real tu costo por lead, ROAS y facturación generada.',
    bullets: [
      'Dashboards interactivos en Looker Studio y Google Analytics 4',
      'Métricas claras de costo por adquisición y embudo de conversión',
      'Acompañamiento mensual con tu estratega dedicado'
    ],
    primaryAction: {
      label: 'Solicitar Diagnóstico',
      href: '#/contacto'
    },
    secondaryAction: {
      label: 'Hablar con un Especialista',
      href: '#/contacto'
    },
    lottiePath: '/lotties/reportes.json',
    isReversed: true
  }
];

export function renderDinametraServices() {
  return `
    <!-- ================================================================
         DINAMETRA-INSPIRED CLEAN & AIRY SERVICES SHOWCASE
         ================================================================ -->
    <section class="dm-services-section" id="servicios-showcase">
      <div class="dm-container">
        
        <!-- Header -->
        <header class="dm-section-header">
          <div class="dm-eyebrow-pill">
            <span class="dm-eyebrow-dot"></span>
            <span>¿Qué podemos hacer por ti?</span>
          </div>
          <h2 class="dm-section-title">
            Soluciones de alto rendimiento. <span style="color: #FF5A1F;">Resultados medibles.</span>
          </h2>
          <p class="dm-section-subtitle">
            Acompañamos a marcas y empresas en cada etapa: desde el registro legal ante el IMPI hasta campañas de adquisición y plataformas digitales.
          </p>
        </header>

        <!-- Alternating Services List -->
        <div class="dm-services-list">
          ${SERVICES_DATA.map((srv) => `
            <article class="dm-service-row ${srv.isReversed ? 'is-reversed' : ''}" id="service-row-${srv.id}">
              
              <!-- Content Column -->
              <div class="dm-content-col">
                <div class="dm-item-badge">
                  <span>${srv.number}</span>
                  <span>&bull;</span>
                  <span>${srv.eyebrow}</span>
                </div>

                <h3 class="dm-item-title">${srv.title}</h3>
                
                <p class="dm-item-desc">${srv.description}</p>

                <!-- Bullets with clean check/arrow icons -->
                <div class="dm-bullets-list">
                  ${srv.bullets.map(b => `
                    <div class="dm-bullet-item">
                      <div class="dm-bullet-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2">
                          <polyline points="2.5 6 5 8.5 9.5 3.5"></polyline>
                        </svg>
                      </div>
                      <span>${b}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Action Button Group -->
                <div class="dm-btn-group">
                  <a href="${srv.primaryAction.href}" 
                     class="dm-btn-primary ${srv.primaryAction.openModal ? 'btn-open-radar' : ''}"
                     ${srv.primaryAction.category ? `data-category="${srv.primaryAction.category}"` : ''}
                     data-cursor="hover">
                    <span>${srv.primaryAction.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>

                  ${srv.secondaryAction ? `
                    <a href="${srv.secondaryAction.href}" class="dm-btn-secondary" data-cursor="hover">
                      <span>${srv.secondaryAction.label}</span>
                    </a>
                  ` : ''}
                </div>
              </div>

              <!-- Visual Lottie Column -->
              <div class="dm-visual-col">
                <div class="dm-lottie-card">
                  <div class="dm-lottie-ambient-glow"></div>
                  <div class="dm-lottie-container" 
                       id="lottie-container-${srv.id}" 
                       data-lottie-path="${srv.lottiePath}"
                       aria-label="Animación interactiva de ${srv.title}">
                  </div>
                </div>
              </div>

            </article>
          `).join('')}
        </div>

      </div>
    </section>

    <!-- ================================================================
         DINAMETRA-INSPIRED COMPARISON MATRIX ("Dilo vs. Todos")
         ================================================================ -->
    <section class="dm-comparison-section" id="comparativo-dilo">
      <div class="dm-container">
        
        <header class="dm-section-header" style="margin-bottom: clamp(2.5rem, 5vw, 4rem);">
          <div class="dm-eyebrow-pill">
            <span class="dm-eyebrow-dot"></span>
            <span>Dilo Digital vs. Todos</span>
          </div>
          <h2 class="dm-section-title">
            Acelera tu éxito con <span style="color: #FF5A1F;">Dilo Digital</span>
          </h2>
          <p class="dm-section-subtitle">
            Compara por qué las empresas líderes eligen nuestro modelo frente a agencias tradicionales o freelancers.
          </p>
        </header>

        <div class="dm-comparison-table-wrap">
          <table class="dm-comparison-table" aria-label="Tabla comparativa de Dilo Digital">
            <thead>
              <tr>
                <th>Criterio &amp; Metodología</th>
                <th class="is-dilo">Dilo Digital MX ⚡</th>
                <th>In-House (Empleado)</th>
                <th>Agencias Tradicionales</th>
                <th>Freelancers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tiempo de respuesta</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>&lt; 30 segundos (con IA)</span>
                  </div>
                </td>
                <td>Horario de oficina estándar</td>
                <td>24 a 72 horas hábiles</td>
                <td>Variable e impredecible</td>
              </tr>
              <tr>
                <td><strong>Registro de Marca IMPI</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>100% digital + Portal en vivo</span>
                  </div>
                </td>
                <td><span class="dm-status-icon-cross"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span> No disponible</td>
                <td>Burocrático y lento</td>
                <td><span class="dm-status-icon-cross"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span> Sin respaldo jurídico</td>
              </tr>
              <tr>
                <td><strong>Precios &amp; Honorarios</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>Fijos, claros y sin sorpresas</span>
                  </div>
                </td>
                <td>Salario fijo + Cargas sociales</td>
                <td>Fee mensual inflado + extras</td>
                <td>Tarifas variables</td>
              </tr>
              <tr>
                <td><strong>Enfoque de Campañas</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>Ventas, ROAS y Atribución</span>
                  </div>
                </td>
                <td>Enfoque generalista</td>
                <td>Vanity metrics (likes y clics)</td>
                <td>Solo entrega de archivos</td>
              </tr>
              <tr>
                <td><strong>Tecnología Digital</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>Wix Headless + IA + Make</span>
                  </div>
                </td>
                <td>Herramientas básicas</td>
                <td>Plantillas prediseñadas</td>
                <td>Dependencia de plugins</td>
              </tr>
              <tr>
                <td><strong>Portal de Seguimiento</strong></td>
                <td class="is-dilo">
                  <div class="dm-status-badge">
                    <span class="dm-status-icon-dilo"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                    <span>Actualizaciones mensuales 24/7</span>
                  </div>
                </td>
                <td>Minutas internas</td>
                <td>Reportes estáticos en PDF</td>
                <td>Sin portal disponible</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  `;
}

export function initDinametraServicesEvents() {
  const containers = document.querySelectorAll('.dm-lottie-container');
  const animInstances = new Map();

  // Lazy-load Lotties when visible in viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const lottiePath = el.getAttribute('data-lottie-path');

        if (entry.isIntersecting) {
          if (!animInstances.has(el) && lottiePath) {
            try {
              const anim = lottie.loadAnimation({
                container: el,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: lottiePath
              });
              animInstances.set(el, anim);
            } catch (err) {
              console.warn('[Lottie] Error loading animation:', lottiePath, err);
            }
          } else if (animInstances.has(el)) {
            animInstances.get(el).play();
          }
        } else {
          // Pause when off-screen to preserve CPU & battery
          if (animInstances.has(el)) {
            animInstances.get(el).pause();
          }
        }
      });
    }, {
      rootMargin: '120px 0px',
      threshold: 0.1
    });

    containers.forEach((c) => observer.observe(c));
  } else {
    // Fallback: immediate load
    containers.forEach((el) => {
      const lottiePath = el.getAttribute('data-lottie-path');
      if (lottiePath) {
        lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: lottiePath
        });
      }
    });
  }

  // Button clicks: Cotizador Modal or Radar Modal
  document.querySelectorAll('.btn-open-radar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // If user is already on home, navigate smoothly to #/registro-marca?open=coincidencias
    });
  });

  document.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = btn.getAttribute('data-category');
      if (category && window.location.hash.includes('cotizar')) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-cotizador-modal', { detail: { category } }));
      }
    });
  });
}
