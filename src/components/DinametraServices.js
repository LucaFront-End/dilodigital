// ================================================================
// DILO DIGITAL — SCROLL STACKING SERVICES SHOWCASE (DINAMETRA STYLE)
// 3D Sticky Stacking Scroll Effect, Minimal Text, Real Lottie Animations
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web/build/player/lottie_light.js';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: 'registro-marca',
    number: '01',
    shortName: 'Registro IMPI',
    eyebrow: 'PROTECCIÓN & BLINDAJE LEGAL',
    title: 'Registro de Marca IMPI & Búsqueda Fonética',
    description: 'Protegemos tu nombre, logotipo y patrimonio comercial en México con dictamen legal en 24 horas y seguimiento online.',
    statHighlight: '+140 Marcas Blindadas ante el IMPI',
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
    accentColor: '#FF5A1F',
    accentGlow: 'rgba(255, 90, 31, 0.12)',
    floatingChips: [
      { icon: '🛡️', text: 'Dictamen en 24h', pos: 'chip-top-left' },
      { icon: '⚡', text: '45 Clases NIZA', pos: 'chip-top-right' },
      { icon: '⭐', text: '98.4% Viabilidad', pos: 'chip-bottom-left' }
    ]
  },
  {
    id: 'marketing',
    number: '02',
    shortName: 'Performance Ads',
    eyebrow: 'CONVERSIÓN & ESCALABILIDAD',
    title: 'Publicidad en Meta, Google & TikTok Ads',
    description: 'Estrategias orientadas a ventas reales y prospectos calificados, optimizando cada peso con atribución multicanal y ROAS positivo.',
    statHighlight: '4.8x ROAS Promedio en Pauta Ads',
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
    accentColor: '#FF5A1F',
    accentGlow: 'rgba(255, 90, 31, 0.12)',
    floatingChips: [
      { icon: '📈', text: '4.8x ROAS Atribuido', pos: 'chip-top-right' },
      { icon: '🎯', text: 'Google & Meta Premier', pos: 'chip-bottom-left' },
      { icon: '🔥', text: '+380K Leads Calificados', pos: 'chip-top-left' }
    ]
  },
  {
    id: 'web-ecommerce',
    number: '03',
    shortName: 'Web Headless',
    eyebrow: 'HEADLESS & EXPERIENCIA DIGITAL',
    title: 'Desarrollo Web & Tiendas Online de Alta Velocidad',
    description: 'Sitios web ultrarrápidos con tiempos de carga inferiores a 1 segundo, diseñados en Figma y desarrollados con arquitectura Headless.',
    statHighlight: '0.8s Velocidad de Carga Extrema',
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
    accentColor: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.12)',
    floatingChips: [
      { icon: '⚡', text: '0.8s Carga Instantánea', pos: 'chip-top-left' },
      { icon: '🛒', text: 'Stripe & Mercado Pago', pos: 'chip-bottom-right' },
      { icon: '✨', text: 'Headless React', pos: 'chip-bottom-left' }
    ]
  },
  {
    id: 'branding',
    number: '04',
    shortName: 'Branding',
    eyebrow: 'AUTORIDAD & PERCEPCIÓN DE VALOR',
    title: 'Branding que Vende y Construye Prestigio',
    description: 'Creamos identidades memorables que destacan de inmediato en tu industria y te permiten justificar precios más altos.',
    statHighlight: '+200 Identidades Creadas con Éxito',
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
    accentColor: '#A855F7',
    accentGlow: 'rgba(168, 85, 247, 0.12)',
    floatingChips: [
      { icon: '💎', text: '100% Vectorial & Manual', pos: 'chip-top-right' },
      { icon: '👑', text: 'Naming Estratégico', pos: 'chip-bottom-left' },
      { icon: '📦', text: 'Empaques Premium', pos: 'chip-top-left' }
    ]
  },
  {
    id: 'automatizacion',
    number: '05',
    shortName: 'Automatización IA',
    eyebrow: 'IA & EFICIENCIA OPERATIVA',
    title: 'Automatizaciones & Agentes de IA 24/7',
    description: 'Responde a cada prospecto en menos de 30 segundos por WhatsApp, califica automáticamente y sincroniza todo con tu CRM.',
    statHighlight: '< 30s Tiempo de Respuesta Automático',
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
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.12)',
    floatingChips: [
      { icon: '🤖', text: 'WhatsApp API 24/7', pos: 'chip-top-left' },
      { icon: '⚡', text: '< 30s Respuesta IA', pos: 'chip-bottom-right' },
      { icon: '🔗', text: 'CRM Sincronizado', pos: 'chip-bottom-left' }
    ]
  },
  {
    id: 'reportes',
    number: '06',
    shortName: 'Analítica & BI',
    eyebrow: 'DATOS REALES & TRANSPARENCIA',
    title: 'Reportes en Tiempo Real & Analítica de Crecimiento',
    description: 'Dashboards claros sin tecnicismos confusos: visualiza en tiempo real tu costo por lead, ROAS y facturación generada.',
    statHighlight: '100% Transparencia en Datos Reales',
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
    accentColor: '#0284C7',
    accentGlow: 'rgba(2, 132, 199, 0.12)',
    floatingChips: [
      { icon: '📊', text: 'Looker Studio en Vivo', pos: 'chip-top-right' },
      { icon: '🎯', text: 'Atribución Multicanal', pos: 'chip-bottom-left' },
      { icon: '💰', text: 'Ventas en Tiempo Real', pos: 'chip-top-left' }
    ]
  }
];

export function renderDinametraServices() {
  return `
    <!-- ================================================================
         DINAMETRA-INSPIRED SCROLL STACKING SERVICES SHOWCASE
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

      </div>

      <!-- Top Sticky Header Bar & Pillar Navigation -->
      <div class="dm-deck-header-bar">
        <div class="dm-deck-tag-wrap">
          <span class="dm-eyebrow-dot"></span>
          <span class="dm-deck-tag-text">DISCIPLINAS MAESTRAS</span>
        </div>

        <nav class="dm-deck-nav-pills" id="dm-deck-nav-pills" aria-label="Navegación de Soluciones">
          ${SERVICES_DATA.map((srv, idx) => `
            <button type="button" class="dm-deck-nav-btn ${idx === 0 ? 'is-active' : ''}" data-target-index="${idx}">
              <span class="dm-deck-nav-num">${srv.number}</span>
              <span>${srv.shortName}</span>
            </button>
          `).join('')}
        </nav>

        <div class="dm-deck-counter">
          <span class="dm-deck-num-current" id="dm-current-num">01</span>
          <span class="dm-deck-num-sep">/</span>
          <span class="dm-deck-num-total">06</span>
        </div>
      </div>

      <!-- Native Sticky Stacking Track (Scroll Depth Engine) -->
      <div class="dm-deck-track" id="dm-deck-track">
        ${SERVICES_DATA.map((srv, idx) => `
          <div class="dm-deck-sticky-item" id="dm-deck-item-${idx}" style="z-index: ${idx + 1};">
            <article class="dm-deck-card" id="dm-deck-card-${idx}">
              
              <div class="dm-deck-card-glow" style="background: radial-gradient(circle at 80% 20%, ${srv.accentGlow}, transparent 70%);"></div>

              <!-- Content Column (Left) -->
              <div class="dm-deck-content">
                <div class="dm-item-badge">
                  <span>${srv.number}</span>
                  <span>&bull;</span>
                  <span>${srv.eyebrow}</span>
                </div>

                <h3 class="dm-item-title">${srv.title}</h3>

                ${srv.statHighlight ? `
                  <div class="dm-highlight-stat-pill">
                    <span class="dm-stat-dot" style="background: ${srv.accentColor};"></span>
                    <span>${srv.statHighlight}</span>
                  </div>
                ` : ''}
                
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

              <!-- Visual Lottie Column (Right) -->
              <div class="dm-deck-visual">
                <div class="dm-lottie-card" style="--accent-glow: ${srv.accentGlow}; --accent-color: ${srv.accentColor};">
                  <!-- Tech background grid mesh & glow orb -->
                  <div class="dm-lottie-mesh-bg"></div>
                  <div class="dm-lottie-glow-orb" style="background: radial-gradient(circle, ${srv.accentGlow} 0%, transparent 70%);"></div>

                  <!-- Floating Interactive Micro-Badges -->
                  ${srv.floatingChips.map((chip, cIdx) => `
                    <div class="dm-floating-chip ${chip.pos}" style="animation-delay: ${cIdx * 0.5}s;">
                      <span class="dm-chip-icon">${chip.icon}</span>
                      <span class="dm-chip-text">${chip.text}</span>
                    </div>
                  `).join('')}

                  <!-- Lottie interactive canvas -->
                  <div class="dm-lottie-container" 
                       id="lottie-container-${srv.id}" 
                       data-lottie-path="${srv.lottiePath}"
                       aria-label="Animación interactiva de ${srv.title}">
                  </div>
                </div>
              </div>

            </article>
          </div>
        `).join('')}

        <!-- Trailing spacer for docking time -->
        <div class="dm-deck-spacer" aria-hidden="true"></div>
      </div>

    </section>

    <!-- ================================================================
         DINAMETRA-INSPIRED COMPARISON MATRIX ("Dilo vs. Todos")
         ================================================================ -->
    <section class="dm-comparison-section" id="comparativo-dilo">
      <div class="dm-container">
        
        <header class="dm-section-header" style="margin-bottom: clamp(2rem, 4vw, 3.5rem);">
          <div class="dm-eyebrow-pill">
            <span class="dm-eyebrow-dot"></span>
            <span>Matriz Comparativa de Rendimiento</span>
          </div>
          <h2 class="dm-section-title">
            ¿Por qué elegir a <span style="color: #FF5A1F;">Dilo Digital</span>?
          </h2>
          <p class="dm-section-subtitle">
            Compara objetivamente nuestro modelo integrado frente a la contratación tradicional de empleados, agencias convencionales o freelancers.
          </p>
        </header>

        <!-- High-Impact 4-KPI Visual Metric Strip -->
        <div class="dm-comparison-kpis">
          <div class="dm-kpi-card">
            <div class="dm-kpi-icon">⚡</div>
            <div class="dm-kpi-val">&lt; 30s</div>
            <div class="dm-kpi-label">Tiempo de respuesta inicial con IA en WhatsApp</div>
          </div>
          <div class="dm-kpi-card">
            <div class="dm-kpi-icon">🛡️</div>
            <div class="dm-kpi-val">24 Horas</div>
            <div class="dm-kpi-label">Dictamen oficial de viabilidad legal ante el IMPI</div>
          </div>
          <div class="dm-kpi-card">
            <div class="dm-kpi-icon">📈</div>
            <div class="dm-kpi-val">4.8x</div>
            <div class="dm-kpi-label">ROAS promedio en pauta digital Meta &amp; Google</div>
          </div>
          <div class="dm-kpi-card">
            <div class="dm-kpi-icon">🚀</div>
            <div class="dm-kpi-val">0.8s</div>
            <div class="dm-kpi-label">Velocidad de carga en arquitectura Web Headless</div>
          </div>
        </div>

        <!-- Visual Battle Comparison Table -->
        <div class="dm-comparison-table-wrap">
          <table class="dm-comparison-table" aria-label="Tabla comparativa de Dilo Digital">
            <thead>
              <tr>
                <th style="width: 26%;">Criterio &amp; Metodología</th>
                <th class="is-dilo-hero" style="width: 28%;">
                  <div class="dm-dilo-hero-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Elección Recomendada
                  </div>
                  <div class="dm-dilo-hero-title">
                    <span>Dilo Digital MX</span>
                    <span class="dm-eyebrow-dot"></span>
                  </div>
                  <div class="dm-dilo-hero-sub">Modelo Ágil &amp; Respaldo Integral</div>
                </th>
                <th style="width: 15%;">In-House (Empleado)</th>
                <th style="width: 16%;">Agencias Tradicionales</th>
                <th style="width: 15%;">Freelancers</th>
              </tr>
            </thead>
            <tbody>
              <!-- Row 1: Tiempo de respuesta -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">⚡</span>
                    <div>
                      <div class="dm-criterion-name">Tiempo de respuesta</div>
                      <div class="dm-criterion-desc">Atención a clientes y modificaciones</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>&lt; 30 segundos</span>
                    </div>
                    <span class="dm-dilo-pill">⚡ IA + WhatsApp 24/7</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⏳ Horario de oficina estándar</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⏳ 24 a 72 horas hábiles</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Variable e impredecible</span>
                  </div>
                </td>
              </tr>

              <!-- Row 2: Registro IMPI -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">🛡️</span>
                    <div>
                      <div class="dm-criterion-name">Registro de Marca IMPI</div>
                      <div class="dm-criterion-desc">Protección y blindaje jurídico</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>100% Digital con Abogados</span>
                    </div>
                    <span class="dm-dilo-pill">🛡️ Dictamen 24h + Portal en vivo</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ No disponible / Sin especialidad</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⏳ Trámite burocrático y lento</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Sin respaldo jurídico oficial</span>
                  </div>
                </td>
              </tr>

              <!-- Row 3: Precios y Honorarios -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">💎</span>
                    <div>
                      <div class="dm-criterion-name">Precios y Honorarios</div>
                      <div class="dm-criterion-desc">Estructura de costos e inversión</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>Precios Fijos Transparentes</span>
                    </div>
                    <span class="dm-dilo-pill">✅ Cero costos ocultos ni sorpresas</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Salario fijo + IMSS + Liquidaciones</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Fee mensual inflado + extras</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Tarifas variables por hora</span>
                  </div>
                </td>
              </tr>

              <!-- Row 4: Enfoque de Campañas -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">📈</span>
                    <div>
                      <div class="dm-criterion-name">Enfoque de Campañas</div>
                      <div class="dm-criterion-desc">Objetivo de pauta publicitaria</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>Ventas, ROAS y Atribución</span>
                    </div>
                    <span class="dm-dilo-pill">🎯 Retorno de inversión medible</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Una sola disciplina / Generalista</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Vanity metrics (likes y clics)</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Solo entrega de archivos sueltos</span>
                  </div>
                </td>
              </tr>

              <!-- Row 5: Tecnología Digital -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">🚀</span>
                    <div>
                      <div class="dm-criterion-name">Infraestructura Digital</div>
                      <div class="dm-criterion-desc">Stack tecnológico y automatización</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>Wix Headless + IA + Make</span>
                    </div>
                    <span class="dm-dilo-pill">⚡ Carga &lt; 0.8s y máxima seguridad</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Herramientas básicas limitadas</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Plantillas WordPress lentas</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Dependencia de plugins vulnerables</span>
                  </div>
                </td>
              </tr>

              <!-- Row 6: Portal de Seguimiento -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">📱</span>
                    <div>
                      <div class="dm-criterion-name">Portal de Clientes</div>
                      <div class="dm-criterion-desc">Monitoreo de estado y métricas</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>Portal 24/7 en Tiempo Real</span>
                    </div>
                    <span class="dm-dilo-pill">📱 Estatus mensual y alertas activas</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Minutas y correos desordenados</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-warn">
                    <span>⚠️ Reportes estáticos en PDF</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Sin portal ni sistema central</span>
                  </div>
                </td>
              </tr>

              <!-- Row 7: Garantía y Respaldo -->
              <tr>
                <td>
                  <div class="dm-criterion-cell">
                    <span class="dm-criterion-icon">👑</span>
                    <div>
                      <div class="dm-criterion-name">Garantía y Acompañamiento</div>
                      <div class="dm-criterion-desc">Compromiso con el resultado</div>
                    </div>
                  </div>
                </td>
                <td class="is-dilo">
                  <div class="dm-dilo-cell-content">
                    <div class="dm-dilo-primary-val">
                      <span class="dm-check-circle"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                      <span>Garantía Legal Dilo Digital</span>
                    </div>
                    <span class="dm-dilo-pill">⭐ Sustitución sin costo en viabilidad</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Sin garantías de desempeño</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Contratos forzosos de 6 a 12 meses</span>
                  </div>
                </td>
                <td>
                  <div class="dm-comp-chip is-bad">
                    <span>❌ Alto riesgo de abandono del proyecto</span>
                  </div>
                </td>
              </tr>

              <!-- Row 8: Action Row -->
              <tr>
                <td></td>
                <td class="is-dilo" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
                  <a href="#/cotizar" class="dm-dilo-col-cta" data-cursor="hover">
                    <span>Iniciar con Dilo Digital ⚡</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Trust Badges Bar -->
        <div class="dm-comparison-trust-bar">
          <div class="dm-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Gestores y Abogados Acreditados IMPI</span>
          </div>
          <div class="dm-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Facturación SAT CFDI 4.0 Inmediata</span>
          </div>
          <div class="dm-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>Contrato de Confidencialidad (NDA)</span>
          </div>
          <div class="dm-trust-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Atención Directa en WhatsApp 24/7</span>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initDinametraServicesEvents() {
  const items = Array.from(document.querySelectorAll('.dm-deck-sticky-item'));
  const currentNumEl = document.getElementById('dm-current-num');
  const navBtns = Array.from(document.querySelectorAll('.dm-deck-nav-btn'));
  const containers = document.querySelectorAll('.dm-lottie-container');
  const animInstances = new Map();

  // 1. Initialize Lottie animations
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

  // 2. Pillar navigation & active state
  const setActivePill = (activeIdx) => {
    navBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === activeIdx);
    });
    if (currentNumEl) {
      currentNumEl.textContent = String(activeIdx + 1).padStart(2, '0');
    }
  };

  // Click-to-Jump navigation across the 6 master pillars
  navBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetItem = document.getElementById(`dm-deck-item-${idx}`);
      if (targetItem) {
        const targetRect = targetItem.getBoundingClientRect();
        const absoluteTop = window.scrollY + targetRect.top - 140;
        window.scrollTo({
          top: absoluteTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. GPU-Accelerated 3D Stacking Cards ScrollTrigger
  if (items.length > 0) {
    items.forEach((item, idx) => {
      const card = item.querySelector('.dm-deck-card');
      const nextItem = items[idx + 1];

      // Subtle scale and depth stacking when next card slides up
      if (card && nextItem) {
        gsap.to(card, {
          scale: 0.96,
          y: -14,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: nextItem,
            start: 'top 65%',
            end: 'top 18%',
            scrub: 0.5
          }
        });
      }

      // Synchronize counter & active pill with card entering sticky dock
      ScrollTrigger.create({
        trigger: item,
        start: idx === 0 ? 'top 80%' : 'top 30%',
        end: 'bottom 30%',
        onEnter: () => setActivePill(idx),
        onEnterBack: () => setActivePill(idx)
      });
    });

    ScrollTrigger.refresh();
  }

  // 4. Cotizador modal trigger
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
