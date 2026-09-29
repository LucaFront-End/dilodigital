// ================================================================
// DILO DIGITAL — SCROLL STACKING SERVICES SHOWCASE (DINAMETRA STYLE)
// 3D Sticky Stacking Scroll Effect, Minimal Text, Real Lottie Animations
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web/build/player/lottie_light.js';

gsap.registerPlugin(ScrollTrigger);

// Clean minimalist icons for comparison grid
const CHECK_ORANGE_ICON = `
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.5" cy="12" r="12" fill="#FF5A1F" fill-opacity="0.15"/>
    <path d="M19.0306 9.03081L11.0306 17.0308C10.9609 17.1007 10.8781 17.1562 10.787 17.1941C10.6958 17.2319 10.5981 17.2514 10.4993 17.2514C10.4006 17.2514 10.3029 17.2319 10.2117 17.1941C10.1206 17.1562 10.0378 17.1007 9.9681 17.0308L6.4681 13.5308C6.39833 13.461 6.34299 13.3782 6.30524 13.2871C6.26748 13.1959 6.24805 13.0982 6.24805 12.9996C6.24805 12.9009 6.26748 12.8032 6.30524 12.7121C6.34299 12.6209 6.39833 12.5381 6.4681 12.4683C6.53786 12.3985 6.62069 12.3432 6.71184 12.3055C6.80299 12.2677 6.90069 12.2483 6.99935 12.2483C7.09801 12.2483 7.19571 12.2677 7.28686 12.3055C7.37801 12.3432 7.46083 12.3985 7.5306 12.4683L10.5 15.4377L17.9693 7.96956C18.1102 7.82867 18.3013 7.74951 18.5006 7.74951C18.6999 7.74951 18.891 7.82867 19.0318 7.96956C19.1727 8.11046 19.2519 8.30156 19.2519 8.50081C19.2519 8.70007 19.1727 8.89117 19.0318 9.03206L19.0306 9.03081Z" fill="#FF5A1F"/>
  </svg>
`;

const CROSS_ICON = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#F3F4F6"/>
    <path d="M17.0306 15.9695C17.1715 16.1104 17.2506 16.3015 17.2506 16.5007C17.2506 16.7 17.1715 16.8911 17.0306 17.032C16.8897 17.1729 16.6986 17.252 16.4993 17.252C16.3001 17.252 16.109 17.1729 15.9681 17.032L12 13.0626L8.0306 17.0307C7.8897 17.1716 7.69861 17.2508 7.49935 17.2508C7.30009 17.2508 7.10899 17.1716 6.9681 17.0307C6.8272 16.8898 6.74805 16.6987 6.74805 16.4995C6.74805 16.3002 6.8272 16.1091 6.9681 15.9682L10.9375 12.0001L6.96935 8.03073C6.82845 7.88984 6.7493 7.69874 6.7493 7.49948C6.7493 7.30023 6.82845 7.10913 6.96935 6.96823C7.11024 6.82734 7.30134 6.74818 7.5006 6.74818C7.69986 6.74818 7.89095 6.82734 8.03185 6.96823L12 10.9376L15.9693 6.96761C16.1102 6.82671 16.3013 6.74756 16.5006 6.74756C16.6999 6.74756 16.891 6.82671 17.0318 6.96761C17.1727 7.10851 17.2519 7.2996 17.2519 7.49886C17.2519 7.69812 17.1727 7.88921 17.0318 8.03011L13.0625 12.0001L17.0306 15.9695Z" fill="#B8B8B8"/>
  </svg>
`;

const CHECK_MUTED_ICON = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#F3F4F6"/>
    <path d="M16 8.5L10.5 14L8 11.5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const SERVICES_DATA = [
  {
    id: 'registro-marca',
    number: '01',
    shortName: 'Registro IMPI',
    eyebrow: 'PROTECCIÓN LEGAL',
    title: 'Registro de Marca IMPI',
    description: 'Protege tu nombre, logotipo y patrimonio comercial en México con dictamen legal en 24 horas.',
    bullets: [
      'Búsqueda fonética en 45 clases NIZA',
      'Dictamen de viabilidad antes de pagar al IMPI',
      'Portal de seguimiento en tiempo real'
    ],
    primaryAction: {
      label: 'Analizar Coincidencias de Marca',
      href: '#/registro-marca',
      openModal: 'coincidencias'
    },
    lottiePath: '/lotties/shield.json',
    accentGlow: 'rgba(255, 90, 31, 0.08)'
  },
  {
    id: 'marketing',
    number: '02',
    shortName: 'Performance Ads',
    eyebrow: 'CONVERSIÓN & ESCALA',
    title: 'Publicidad en Meta, Google & TikTok',
    description: 'Estrategias orientadas a ventas reales y prospectos calificados con atribución y ROAS positivo.',
    bullets: [
      'Google Ads Search & Shopping de alta intención',
      'Meta Ads (Facebook e Instagram) de conversión',
      'Funnels automatizados de captura y seguimiento'
    ],
    primaryAction: {
      label: 'Cotizar Campaña de Ads',
      href: '#/cotizar',
      category: 'marketing'
    },
    lottiePath: '/lotties/marketing.json',
    accentGlow: 'rgba(255, 90, 31, 0.08)'
  },
  {
    id: 'web-ecommerce',
    number: '03',
    shortName: 'Web Headless',
    eyebrow: 'HEADLESS & VELOCIDAD',
    title: 'Desarrollo Web & Tiendas Online',
    description: 'Sitios web ultrarrápidos con tiempos de carga inferiores a 1 segundo, diseñados en Figma.',
    bullets: [
      'Wix Headless & React de última generación',
      'Pasarelas de pago Stripe, Mercado Pago & SPEI',
      'Diseño UI/UX de alta conversión y mobile-first'
    ],
    primaryAction: {
      label: 'Cotizar Desarrollo Web',
      href: '#/cotizar',
      category: 'web-ecommerce'
    },
    lottiePath: '/lotties/web.json',
    accentGlow: 'rgba(56, 189, 248, 0.08)'
  },
  {
    id: 'branding',
    number: '04',
    shortName: 'Branding',
    eyebrow: 'AUTORIDAD & PRESTIGIO',
    title: 'Branding & Identidad Visual',
    description: 'Creamos identidades memorables que destacan en tu industria y justifican precios más altos.',
    bullets: [
      'Naming estratégico y conceptualización de marca',
      'Manual de identidad visual completo y vectorial',
      'Diseño de empaques, papelería y activos digitales'
    ],
    primaryAction: {
      label: 'Ver Paquetes de Branding',
      href: '#/categoria/branding-diseno'
    },
    lottiePath: '/lotties/branding.json',
    accentGlow: 'rgba(168, 85, 247, 0.08)'
  },
  {
    id: 'automatizacion',
    number: '05',
    shortName: 'Automatización IA',
    eyebrow: 'IA & EFICIENCIA',
    title: 'Automatizaciones & Agentes de IA 24/7',
    description: 'Responde a prospectos en menos de 30 segundos por WhatsApp y sincroniza todo con tu CRM.',
    bullets: [
      'Conexión oficial de WhatsApp Business API con CRM',
      'Agentes de IA para calificar prospectos automáticamente',
      'Funnels y flujos automáticos con Make y Zapier'
    ],
    primaryAction: {
      label: 'Automatizar Negocio',
      href: '#/cotizar',
      category: 'tecnologia'
    },
    lottiePath: '/lotties/automatizacion.json',
    accentGlow: 'rgba(16, 185, 129, 0.08)'
  },
  {
    id: 'reportes',
    number: '06',
    shortName: 'Analítica & BI',
    eyebrow: 'DATOS & TRANSPARENCIA',
    title: 'Reportes en Vivo & Analítica',
    description: 'Dashboards claros sin tecnicismos confusos: visualiza en tiempo real tu costo por lead y ROAS.',
    bullets: [
      'Dashboards interactivos en Looker Studio y GA4',
      'Métricas claras de adquisición y embudo de ventas',
      'Acompañamiento mensual con tu estratega dedicado'
    ],
    primaryAction: {
      label: 'Solicitar Diagnóstico',
      href: '#/contacto'
    },
    lottiePath: '/lotties/reportes.json',
    accentGlow: 'rgba(2, 132, 199, 0.08)'
  }
];

function renderServiceVisual(srv) {
  if (srv.id === 'registro-marca') {
    return `
      <div class="dm-mockup-wrap dm-mockup-impi">
        <div class="dm-mockup-card">
          <div class="dm-mockup-header">
            <div class="dm-mockup-badge dm-badge-green">
              <span class="dm-badge-pulse"></span>
              <span>DICTAMEN: 98% VIABLE</span>
            </div>
            <span class="dm-mockup-id">EXPEDIENTE IMPI #2026-MX</span>
          </div>
          
          <div class="dm-impi-brand-box">
            <div class="dm-impi-trademark">
              <span class="dm-impi-name">DILO DIGITAL</span>
              <span class="dm-impi-reg">®</span>
            </div>
            <div class="dm-impi-seal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <span>CONCESIÓN OFICIAL</span>
            </div>
          </div>

          <div class="dm-impi-scanner">
            <div class="dm-scanner-track">
              <div class="dm-scanner-beam"></div>
            </div>
            <div class="dm-scanner-info">
              <span class="dm-scanner-label">Búsqueda Fonética en 45 Clases</span>
              <span class="dm-scanner-res">0 Coincidencias Críticas</span>
            </div>
          </div>

          <div class="dm-niza-grid">
            <div class="dm-niza-tag is-approved">
              <span class="dm-niza-code">CLASE 35</span>
              <span class="dm-niza-title">Publicidad & Negocios</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="dm-niza-tag is-approved">
              <span class="dm-niza-code">CLASE 42</span>
              <span class="dm-niza-title">Software & Headless</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          <div class="dm-impi-timeline">
            <div class="dm-tl-step is-done">
              <span class="dm-tl-dot">✓</span>
              <span>1. Fonética</span>
            </div>
            <div class="dm-tl-line is-done"></div>
            <div class="dm-tl-step is-done">
              <span class="dm-tl-dot">✓</span>
              <span>2. Dictamen 24h</span>
            </div>
            <div class="dm-tl-line is-active"></div>
            <div class="dm-tl-step is-active">
              <span class="dm-tl-dot">●</span>
              <span>3. Título ®</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (srv.id === 'marketing') {
    return `
      <div class="dm-mockup-wrap dm-mockup-marketing">
        <div class="dm-mockup-card">
          <div class="dm-mockup-header">
            <div class="dm-mockup-badge dm-badge-orange">
              <span class="dm-badge-pulse"></span>
              <span>ROAS GLOBAL: 4.8X</span>
            </div>
            <span class="dm-mockup-id">LIVE ATTRIBUTION</span>
          </div>

          <div class="dm-channels-row">
            <div class="dm-channel-chip">
              <div class="dm-channel-icon dm-icon-google">G</div>
              <div class="dm-channel-meta">
                <span class="dm-channel-name">Google Search Ads</span>
                <span class="dm-channel-stat">CTR 9.4% · CPL $34 MXN</span>
              </div>
            </div>
            <div class="dm-channel-chip">
              <div class="dm-channel-icon dm-icon-meta">M</div>
              <div class="dm-channel-meta">
                <span class="dm-channel-name">Meta Conversions</span>
                <span class="dm-channel-stat">+142 Leads / sem</span>
              </div>
            </div>
          </div>

          <div class="dm-ads-chart-box">
            <div class="dm-chart-header">
              <span>Curva de Adquisición & Conversión</span>
              <span class="dm-chart-growth">+185% Retorno</span>
            </div>
            <svg class="dm-ads-svg-chart" viewBox="0 0 300 70" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad-${srv.id}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.32"/>
                  <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <path d="M0,60 Q50,55 90,44 T170,30 T240,16 T300,6 L300,70 L0,70 Z" fill="url(#chartGrad-${srv.id})" />
              <path d="M0,60 Q50,55 90,44 T170,30 T240,16 T300,6" fill="none" stroke="#FF5A1F" stroke-width="3" stroke-linecap="round" />
              <circle cx="300" cy="6" r="4" fill="#FF5A1F" />
            </svg>
          </div>

          <div class="dm-live-ticker">
            <span class="dm-ticker-dot"></span>
            <span class="dm-ticker-text">Lead Calificado: "Director General · Cotización $120k MXN"</span>
          </div>
        </div>
      </div>
    `;
  }

  if (srv.id === 'web-ecommerce') {
    return `
      <div class="dm-mockup-wrap dm-mockup-web">
        <div class="dm-mockup-card">
          <div class="dm-browser-chrome">
            <div class="dm-browser-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="dm-browser-address">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>dilodigital.mx/store</span>
            </div>
            <div class="dm-pagespeed-badge">
              <span class="dm-pagespeed-score">100</span>
              <span>PageSpeed</span>
            </div>
          </div>

          <div class="dm-web-speed-box">
            <div class="dm-speed-hero">
              <span class="dm-speed-number">&lt; 0.8s</span>
              <span class="dm-speed-label">Carga Sub-Segundo Global</span>
            </div>
            <div class="dm-stack-tags">
              <span class="dm-tag-react">React Headless</span>
              <span class="dm-tag-vite">Vite Engine</span>
              <span class="dm-tag-figma">Figma UI</span>
            </div>
          </div>

          <div class="dm-checkout-preview">
            <div class="dm-checkout-title">Pasarelas de Pago Oficiales en México</div>
            <div class="dm-gateways-list">
              <span class="dm-gw-pill"><span class="dm-gw-dot" style="background:#635BFF;"></span>Stripe</span>
              <span class="dm-gw-pill"><span class="dm-gw-dot" style="background:#009EE3;"></span>Mercado Pago</span>
              <span class="dm-gw-pill"><span class="dm-gw-dot" style="background:#10B981;"></span>SPEI 24/7</span>
              <span class="dm-gw-pill"><span class="dm-gw-dot" style="background:#111827;"></span>Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (srv.id === 'branding') {
    return `
      <div class="dm-mockup-wrap dm-mockup-branding">
        <div class="dm-mockup-card">
          <div class="dm-mockup-header">
            <div class="dm-mockup-badge dm-badge-purple">
              <span class="dm-badge-pulse"></span>
              <span>BRAND SYSTEM 2026</span>
            </div>
            <span class="dm-mockup-id">MANUAL DE IDENTIDAD</span>
          </div>

          <div class="dm-brand-symbol-box">
            <div class="dm-brand-grid-lines"></div>
            <div class="dm-brand-symbol">
              <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="#FF5A1F" stroke-width="2" stroke-dasharray="3 3" opacity="0.6"/>
                <circle cx="50" cy="50" r="30" stroke="#16253F" stroke-width="2" opacity="0.4"/>
                <path d="M35 25 H55 C70 25 75 40 75 50 C75 60 70 75 55 75 H35 Z" fill="none" stroke="#FF5A1F" stroke-width="5" stroke-linejoin="round"/>
                <line x1="35" y1="20" x2="35" y2="80" stroke="#16253F" stroke-width="2"/>
              </svg>
            </div>
            <div class="dm-brand-guidelines-tag">Proporción Áurea & Grid Vectorial</div>
          </div>

          <div class="dm-swatches-row">
            <div class="dm-swatch">
              <div class="dm-swatch-color" style="background: #FF5A1F;"></div>
              <span class="dm-swatch-code">#FF5A1F</span>
            </div>
            <div class="dm-swatch">
              <div class="dm-swatch-color" style="background: #16253F;"></div>
              <span class="dm-swatch-code">#16253F</span>
            </div>
            <div class="dm-swatch">
              <div class="dm-swatch-color" style="background: #F8FAFC; border: 1px solid #E2E8F0;"></div>
              <span class="dm-swatch-code">#F8FAFC</span>
            </div>
          </div>

          <div class="dm-type-specimen">
            <span class="dm-type-name">Syne Bold · Plus Jakarta Sans</span>
            <span class="dm-type-chars">Aa Bb Cc Gg 0123 ®</span>
          </div>
        </div>
      </div>
    `;
  }

  if (srv.id === 'automatizacion') {
    return `
      <div class="dm-mockup-wrap dm-mockup-ai">
        <div class="dm-mockup-card">
          <div class="dm-chat-header">
            <div class="dm-chat-avatar">
              <span>D</span>
              <span class="dm-chat-online"></span>
            </div>
            <div class="dm-chat-meta">
              <div class="dm-chat-name">
                <span>Dilo AI Assistant</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#10B981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <span class="dm-chat-sub">Responde en &lt; 15 segundos</span>
            </div>
            <span class="dm-chat-badge">API OFICIAL</span>
          </div>

          <div class="dm-chat-messages">
            <div class="dm-msg dm-msg-user">
              <p>Hola, vi sus tiendas web. Necesito cotizar una plataforma headless y registro de marca IMPI.</p>
              <span class="dm-msg-time">10:14 AM</span>
            </div>

            <div class="dm-msg dm-msg-bot">
              <div class="dm-bot-badge">⚡ Agente IA Dilo</div>
              <p>¡Hola! Claro que sí. Tu proyecto incluye tienda con carga &lt; 0.8s y dictamen IMPI en 24h. ¿Te agendo llamada técnica hoy a las 4:00 PM?</p>
              <span class="dm-msg-time">10:14 AM · <span style="color: #38BDF8;">✓✓</span></span>
            </div>
          </div>

          <div class="dm-chat-footer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Lead calificado y sincronizado a CRM vía Make.com</span>
          </div>
        </div>
      </div>
    `;
  }

  // srv.id === 'reportes'
  return `
    <div class="dm-mockup-wrap dm-mockup-bi">
      <div class="dm-mockup-card">
        <div class="dm-mockup-header">
          <div class="dm-mockup-badge dm-badge-blue">
            <span class="dm-badge-pulse"></span>
            <span>LOOKER STUDIO & GA4</span>
          </div>
          <span class="dm-mockup-id">MÉTRICAS EN VIVO</span>
        </div>

        <div class="dm-kpi-grid">
          <div class="dm-kpi-card">
            <span class="dm-kpi-lbl">Costo x Lead</span>
            <span class="dm-kpi-val">$38 MXN</span>
            <span class="dm-kpi-trend" style="color: #10B981;">↓ 24% vs meta</span>
          </div>
          <div class="dm-kpi-card">
            <span class="dm-kpi-lbl">Tasa Cierre</span>
            <span class="dm-kpi-val">34.2%</span>
            <span class="dm-kpi-trend" style="color: #10B981;">↑ +14%</span>
          </div>
          <div class="dm-kpi-card">
            <span class="dm-kpi-lbl">Retorno Ads</span>
            <span class="dm-kpi-val">4.8X</span>
            <span class="dm-kpi-trend" style="color: #FF5A1F;">ROAS Activo</span>
          </div>
        </div>

        <div class="dm-attribution-box">
          <div class="dm-attr-row">
            <span class="dm-attr-label">Google Search</span>
            <div class="dm-attr-bar-bg"><div class="dm-attr-bar-fill" style="width: 84%; background: #4285F4;"></div></div>
            <span class="dm-attr-val">$185k</span>
          </div>
          <div class="dm-attr-row">
            <span class="dm-attr-label">Meta Performance</span>
            <div class="dm-attr-bar-bg"><div class="dm-attr-bar-fill" style="width: 68%; background: #FF5A1F;"></div></div>
            <span class="dm-attr-val">$142k</span>
          </div>
          <div class="dm-attr-row">
            <span class="dm-attr-label">Tráfico Orgánico</span>
            <div class="dm-attr-bar-bg"><div class="dm-attr-bar-fill" style="width: 52%; background: #10B981;"></div></div>
            <span class="dm-attr-val">$98k</span>
          </div>
        </div>

        <div class="dm-bi-footer">
          <span>Acompañamiento mensual con tu estratega asignado</span>
        </div>
      </div>
    </div>
  `;
}

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
                
                <p class="dm-item-desc">${srv.description}</p>

                <!-- Bullets with clean check/arrow icons -->
                <div class="dm-bullets-list">
                  ${srv.bullets.map(b => `
                    <div class="dm-bullet-item">
                      <div class="dm-bullet-icon">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
                          <polyline points="2.5 6 5 8.5 9.5 3.5"></polyline>
                        </svg>
                      </div>
                      <span>${b}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Single Clean Action Button -->
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
                </div>
              </div>

              <!-- Tailored Interactive Visual Column (Right) -->
              <div class="dm-deck-visual">
                ${renderServiceVisual(srv)}
              </div>

            </article>
          </div>
        `).join('')}

        <!-- Trailing spacer for docking time -->
        <div class="dm-deck-spacer" aria-hidden="true"></div>
      </div>

    </section>

    <!-- ================================================================
         DINAMETRA-STYLE CLEAN & MINIMALIST COMPARISON BOARD
         ================================================================ -->
    <section class="dm-comparison-section" id="comparativo-dilo">
      <div class="dm-container">
        
        <header class="dm-section-header">
          <div class="dm-eyebrow-pill">
            <span class="dm-eyebrow-dot"></span>
            <span>Dilo Digital vs. Todos</span>
          </div>
          <h2 class="dm-section-title">
            <span style="color: #FF5A1F;">Acelera el éxito</span> con Dilo Digital
          </h2>
          <p class="dm-section-subtitle">
            Compara por qué las empresas líderes eligen nuestro modelo frente a opciones tradicionales.
          </p>
        </header>

        <!-- Pure Dinametra-Style Clean Minimalist Comparison Grid -->
        <div class="dm-comparativo-scroll">
          <div class="comparativo_wrapper">
            
            <!-- Column 1: Funcionalidad -->
            <div class="comparativo-row left">
              <div class="comp-col-header">Funcionalidad</div>
              <div class="comp-item-label">Precio fijo, sin sorpresas</div>
              <div class="comp-item-label">Respuesta en &lt; 30 segundos (IA)</div>
              <div class="comp-item-label">Registro oficial ante el IMPI</div>
              <div class="comp-item-label">Datos y ROAS que ganan batallas</div>
              <div class="comp-item-label">Infraestructura Web Headless (&lt; 1s)</div>
              <div class="comp-item-label">Agentes de IA &amp; WhatsApp 24/7</div>
              <div class="comp-item-label">Portal de clientes en vivo con alertas</div>
              <div class="comp-item-label">Transparencia y garantía total</div>
            </div>

            <!-- Column 2: In-house -->
            <div class="comparativo-row">
              <div class="comp-col-header">In-house</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CHECK_MUTED_ICON}</div>
            </div>

            <!-- Column 3: Dilo Digital (Elevated Shadow Card) -->
            <div class="comparativo-row shadow is-dilo-col">
              <div class="comp-col-header is-dilo">Dilo Digital ⚡</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
              <div class="comp-icon">${CHECK_ORANGE_ICON}</div>
            </div>

            <!-- Column 4: Agencias -->
            <div class="comparativo-row">
              <div class="comp-col-header">Otras Agencias</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
            </div>

            <!-- Column 5: Freelancers -->
            <div class="comparativo-row">
              <div class="comp-col-header">Freelancers</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
              <div class="comp-icon">${CROSS_ICON}</div>
            </div>

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
              console.warn('[DinametraServices] Lottie load error for', lottiePath, err);
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
    }, { threshold: 0.1 });

    containers.forEach((c) => observer.observe(c));
  } else {
    // Fallback for browsers without IntersectionObserver
    containers.forEach((el) => {
      const lottiePath = el.getAttribute('data-lottie-path');
      if (lottiePath) {
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
          console.warn('[DinametraServices] Fallback Lottie error', err);
        }
      }
    });
  }

  // 2. Navigation pills click: Smooth scroll to item
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = parseInt(btn.getAttribute('data-target-index'), 10);
      const targetItem = document.getElementById(`dm-deck-item-${targetIdx}`);
      if (targetItem) {
        const headerOffset = 160;
        const itemTop = targetItem.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: itemTop, behavior: 'smooth' });
      }
    });
  });

  // 3. ScrollTrigger for 3D stacking depth & active indicator
  if (items.length > 0) {
    items.forEach((item, index) => {
      const card = item.querySelector('.dm-deck-card');

      ScrollTrigger.create({
        trigger: item,
        start: 'top 85px',
        end: 'bottom top',
        onEnter: () => updateActiveIndex(index),
        onEnterBack: () => updateActiveIndex(index)
      });

      if (index < items.length - 1 && card) {
        const nextItem = items[index + 1];
        if (nextItem) {
          gsap.to(card, {
            scale: 0.96,
            y: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: nextItem,
              start: 'top 320px',
              end: 'top 120px',
              scrub: true
            }
          });
        }
      }
    });
  }

  function updateActiveIndex(index) {
    if (currentNumEl) {
      currentNumEl.textContent = String(index + 1).padStart(2, '0');
    }
    navBtns.forEach((btn, idx) => {
      btn.classList.toggle('is-active', idx === index);
    });
  }
}
