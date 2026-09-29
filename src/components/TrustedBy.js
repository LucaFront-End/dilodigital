// ================================================================
// TRUSTED BY THE BEST — DUAL REVERSE INFINITE CAROUSEL SECTION
// Inspired by Sadu Media & Luxury Modern Agency Aesthetics
// Pure White Luxury Background + Brand Turquoise Accents
// ================================================================

import gsap from 'gsap';

// Curated Real Enterprise Brands & Global Platform Partners for Dilo Digital MX
const BRANDS_ROW_1 = [
  {
    name: 'Google Ads',
    category: 'Partner Premier 2025',
    svg: `
      <svg height="34" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    `,
    tag: 'PARTNER PREMIER'
  },
  {
    name: 'Meta Business',
    category: 'Instagram & Facebook Ads',
    svg: `
      <svg height="34" viewBox="0 0 24 24" fill="#0081FB">
        <path d="M16.5 6A5.5 5.5 0 0 1 22 11.5c0 3.5-3 6.5-6.5 6.5-3 0-4.5-2.5-6.5-5-2-2.5-3.5-5-6.5-5A5.5 5.5 0 0 0 0 11.5C0 15 3 18 6.5 18c3 0 4.5-2.5 6.5-5 2-2.5 3.5-5 6.5-5zM6.5 15.5c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.8 0 3 2 4.5 4-1.5 2-2.7 4-4.5 4zm11 0c-1.8 0-3-2-4.5-4 1.5-2 2.7-4 4.5-4 2.2 0 4 1.8 4 4s-1.8 4-4 4z"/>
      </svg>
    `,
    tag: 'CERTIFICADO META'
  },
  {
    name: 'Shopify Plus',
    category: 'Plataforma Global E-commerce',
    svg: `
      <svg height="34" viewBox="0 0 32 32" fill="none">
        <path d="M22.8 7.3c-.2-.5-.7-.8-1.2-.9l-3.2-.6c-.2-.7-.6-1.4-1.3-1.8-.8-.6-1.8-.7-2.7-.4-.9.3-1.6 1-1.9 1.8l-1.8.3c-.5.1-.9.5-1 .9L6.5 24.5c-.1.5.2 1 .7 1.1l14.4 2.8c.5.1 1-.2 1.1-.7l3.2-18.7c0-.6-.4-1.1-.9-1.2l-2.2-.5zm-6.2-2.1c.5-.2 1.1-.1 1.5.2.4.3.7.8.8 1.3l-3.7.7c.3-.8.8-1.7 1.4-2.2zm-.8 16.5c-2.3 0-3.6-1.2-3.6-2.8 0-1.8 1.8-2.4 2.8-2.8 1.1-.4 1.8-.7 1.8-1.4 0-.7-.5-1.1-1.4-1.1-.9 0-1.6.4-1.8 1.1l-2-.8c.4-1.4 1.7-2.3 3.8-2.3 2.1 0 3.4 1.1 3.4 2.7 0 1.7-1.4 2.3-2.6 2.8-1.1.4-1.9.8-1.9 1.5 0 .7.6 1.1 1.6 1.1 1 0 1.8-.5 2.1-1.3l1.9.8c-.5 1.6-1.9 2.5-4.1 2.5z" fill="#95BF47"/>
      </svg>
    `,
    tag: 'EXPERT PARTNER'
  },
  {
    name: 'Stripe',
    category: 'Infraestructura de Pagos',
    svg: `
      <svg height="34" viewBox="0 0 32 32" fill="#635BFF">
        <path d="M15.4 12.3c-2-.7-3.1-1.3-3.1-2.2 0-.8.7-1.2 1.8-1.2 2 0 4.1.8 5.6 1.5l.8-5C19.2 4.9 16.9 4.5 14.3 4.5 9 4.5 5.5 7.3 5.5 11.8c0 4.6 3.9 6 7.2 7.2 2.3.8 3.1 1.5 3.1 2.4 0 .9-.8 1.4-2.1 1.4-2.4 0-4.9-1.1-6.6-2l-.8 5.1c1.9.9 4.7 1.6 7.6 1.6 5.5 0 9.4-2.6 9.4-7.4 0-4.7-3.9-6.2-7.9-7.8z"/>
      </svg>
    `,
    tag: 'PAGOS GLOBALES'
  },
  {
    name: 'Amazon Web Services',
    category: 'Infraestructura Cloud & Data',
    svg: `
      <svg height="34" viewBox="0 0 32 32" fill="none">
        <path d="M11.6 13.5c-.8.5-1.6.8-2.6.8-2.3 0-3.7-1.4-3.7-3.7 0-2.4 1.6-4 4.1-4 1.1 0 2 .3 2.7.7v1.8c-.8-.5-1.6-.7-2.4-.7-1.3 0-2.2.8-2.2 2.2 0 1.3.8 2 2.1 2 .8 0 1.5-.2 2.2-.6v1.5h-.2zm6.2-6.7l-2.1 7.4h-1.8l-1.6-5.6-1.5 5.6H9L6.8 6.8h1.9l1.3 5.3 1.5-5.3h1.6l1.5 5.3 1.3-5.3h1.9zm4.4 7.6c-2.4 0-3.9-1.3-3.9-3.3 0-1.9 1.4-3 3.6-3.4l1.8-.4v-.6c0-.9-.6-1.4-1.7-1.4-.9 0-1.8.3-2.5.7l-.6-1.4c.9-.5 2.1-.8 3.4-.8 2.3 0 3.5 1.1 3.5 3v5.4h-1.7v-1.1c-.6.8-1.6 1.3-2.9 1.3zm.7-1.6c1.1 0 2-.6 2.3-1.4v-1.2l-1.6.3c-1.3.3-2 .8-2 1.8 0 .8.5 1.4 1.3 1.4z" fill="#232F3E"/>
        <path d="M26 21.5c-4.8 3.5-11.8 5.4-17.8 2.3-.9-.5-1.7-1-2.4-1.7-.3-.3-.1-.7.3-.5 5.7 2.2 12.5 1.2 17.6-2 .7-.4 1.2.2.7.8l-1.3 1.1h2.9z" fill="#FF9900"/>
        <path d="M27.4 19.6c-.4-.6-2.8-.3-4.2.3-.4.1-.3-.2 0-.5 2-1.2 5.2-1.1 5.6-.6.5.6-.4 3.7-2.3 5.3-.4.3-.6.1-.4-.2.5-1.2 1.7-3.8 1.3-4.3z" fill="#FF9900"/>
      </svg>
    `,
    tag: 'CLOUD TIER 1'
  },
  {
    name: 'Mercado Libre',
    category: 'Líder E-commerce & Envíos LatAm',
    svg: `
      <svg height="34" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14.5" fill="#FFE600"/>
        <path d="M9.5 17.5c1.2-2.4 3.8-4 6.5-3.2l2.4.8c1.2.4 2.4 0 3.2-.8l2.4-2.4c.8-.8 2-.8 2.8 0s.8 2 0 2.8l-3.2 3.2c-1.2 1.2-2.8 1.6-4.5 1.2l-2.4-.8c-1.6-.4-3.6.4-4.5 2l-2.7 3.2" stroke="#2D3277" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M23.5 14.5l-3.2-3.2c-1.2-1.2-2.8-1.6-4.5-1.2l-2.4.8c-1.6.4-3.6-.4-4.5-2" stroke="#2D3277" stroke-width="2.1" stroke-linecap="round"/>
      </svg>
    `,
    tag: 'RETAIL MEDIA'
  },
  {
    name: 'TikTok for Business',
    category: 'Pauta Publicitaria & UGC',
    svg: `
      <svg height="34" viewBox="0 0 24 24" fill="#000000">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.89c.35 0 .68.06 1 .16V9.06a6.34 6.34 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75c1.23.88 2.74 1.41 4.36 1.44V6.75a4.82 4.82 0 0 1-.6-.06z"/>
      </svg>
    `,
    tag: 'AGENCIA OFICIAL'
  },
  {
    name: 'HubSpot',
    category: 'Inbound Marketing & CRM',
    svg: `
      <svg height="34" viewBox="0 0 32 32" fill="#FF7A59">
        <path d="M23.5 10.8V7.9c.9-.4 1.5-1.3 1.5-2.4 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1.1.6 2 1.5 2.4v2.9c-1.5.5-2.7 1.6-3.2 3.1l-5.9-2c.1-.4.2-.8.2-1.3 0-2.1-1.7-3.8-3.8-3.8s-3.8 1.7-3.8 3.8 1.7 3.8 3.8 3.8c.5 0 .9-.1 1.3-.2l5.8 2c0 .2 0 .4 0 .5 0 1.5.7 2.9 1.7 3.8l-2.6 2.6c-.4-.1-.8-.2-1.2-.2-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8c0-.5-.1-.9-.2-1.3l2.6-2.6c1.3.9 3 1.1 4.6.6 1.9-.6 3.3-2.1 3.8-4 .5-1.9 0-3.9-1.4-5.3-.8-.8-1.8-1.3-2.8-1.4zm-2.2 8.6c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9z"/>
      </svg>
    `,
    tag: 'AUTOMATIZACIÓN'
  }
];

const BRANDS_ROW_2 = [
  {
    name: 'BBVA México',
    category: 'Banca Corporativa & Digital',
    svg: `
      <svg height="28" viewBox="0 0 76 28" fill="none">
        <rect width="76" height="28" rx="6" fill="#004481"/>
        <text x="38" y="20.5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">BBVA</text>
      </svg>
    `,
    tag: 'BANCA TIER 1'
  },
  {
    name: 'Kavak',
    category: 'Unicornio Automotriz Tech',
    svg: `
      <svg height="28" viewBox="0 0 76 28" fill="none">
        <rect width="76" height="28" rx="6" fill="#111827"/>
        <text x="35" y="20" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="17" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">kavak</text>
        <circle cx="61" cy="9.5" r="2.8" fill="#2563EB"/>
      </svg>
    `,
    tag: 'SCALE-UP LÍDER'
  },
  {
    name: 'Nu México',
    category: 'Neobanca & Tarjetas Digitales',
    svg: `
      <svg height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="8" fill="#820AD1"/>
        <text x="17" y="24" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="19" fill="#FFFFFF" text-anchor="middle">nu</text>
      </svg>
    `,
    tag: 'FINTECH UNICORN'
  },
  {
    name: 'OXXO',
    category: 'FEMSA Comercio & Red OXXO Pay',
    svg: `
      <svg height="28" viewBox="0 0 76 28" fill="none">
        <rect width="76" height="28" rx="6" fill="#E31B23"/>
        <text x="38" y="20.5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="17" fill="#FFD100" text-anchor="middle" letter-spacing="2">OXXO</text>
      </svg>
    `,
    tag: 'RETAIL OMNICANAL'
  },
  {
    name: 'Cinépolis',
    category: 'Entretenimiento & Experiencias',
    svg: `
      <svg height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#0B2265"/>
        <path d="M10 12h14M10 17h14M10 22h8" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="23" cy="22" r="2" fill="#FFC72C"/>
      </svg>
    `,
    tag: 'MARCA GLOBAL MX'
  },
  {
    name: 'Grupo Bimbo',
    category: 'Consumo Masivo Multinacional',
    svg: `
      <svg height="28" viewBox="0 0 76 28" fill="none">
        <rect width="76" height="28" rx="6" fill="#004481"/>
        <text x="38" y="20" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">BIMBO</text>
      </svg>
    `,
    tag: 'ENTERPRISE B2C'
  },
  {
    name: 'Clip',
    category: 'Terminales & Pagos Digitales',
    svg: `
      <svg height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="8" fill="#FF5E00"/>
        <circle cx="17" cy="17" r="7.5" fill="none" stroke="#FFFFFF" stroke-width="2.8"/>
        <circle cx="17" cy="17" r="2.8" fill="#FFFFFF"/>
      </svg>
    `,
    tag: 'FINTECH CHECKOUT'
  },
  {
    name: 'Aeroméxico',
    category: 'Línea Aérea Bandera de México',
    svg: `
      <svg height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#0B2341"/>
        <path d="M17 6.5l3.5 7.5 6.5 1.5-6.5 1.5-3.5 7.5-3.5-7.5-6.5-1.5 6.5-1.5z" fill="#E31B23"/>
      </svg>
    `,
    tag: 'AEROLÍNEA LÍDER'
  }
];

function renderBrandCard(brand) {
  return `
  <div class="tb-card">
    <div class="tb-card-icon">
      ${brand.svg}
    </div>
    <div class="tb-card-info">
      <span class="tb-card-name">${brand.name}</span>
      <span class="tb-card-category">${brand.category}</span>
    </div>
    <span class="tb-card-tag">${brand.tag}</span>
  </div>
  `;
}

export function renderTrustedBy() {
  // Repeat each array twice for seamless CSS infinite translation
  const row1List = [...BRANDS_ROW_1, ...BRANDS_ROW_1];
  const row2List = [...BRANDS_ROW_2, ...BRANDS_ROW_2];

  return `
  <!-- ================================================================
       TRUSTED BY THE BEST — DUAL REVERSE INFINITE CAROUSEL SECTION
       White Canvas Edition + Dilo Brand Identity
       ================================================================ -->
  <section class="tb-section" id="trusted-by">
    
    <!-- Central Floating Hero Statement (100% Seamless Integration) -->
    <div class="tb-center-hero">
      <div class="tb-center-content">
        
        <div class="tb-tag-wrap">
          <span class="tb-diamond-dot"></span>
          <span class="tb-tag-text">CLIENTES & ALIANZAS ESTRATÉGICAS</span>
        </div>

        <h2 class="tb-title">
          RESPALDADOS POR<br>
          <span class="tb-title-accent">LOS MEJORES.</span>
        </h2>

        <p class="tb-subtitle">
          Si estás en buena compañía, estás en el lugar correcto.
        </p>

        <!-- Stats Micro-Bar -->
        <div class="tb-stats-row">
          <div class="tb-stat-pill">
            <span class="tb-stat-num">+140</span>
            <span class="tb-stat-label">Marcas Líderes</span>
          </div>
          <div class="tb-stat-sep"></div>
          <div class="tb-stat-pill">
            <span class="tb-stat-num">98.4%</span>
            <span class="tb-stat-label">Retención B2B</span>
          </div>
          <div class="tb-stat-sep"></div>
          <div class="tb-stat-pill">
            <span class="tb-stat-num">Tier 1</span>
            <span class="tb-stat-label">Estándar Global</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Background Dual Continuous Running Marquees in Opposite Directions -->
    <div class="tb-marquees-container" aria-label="Carruseles continuos de marcas aliadas">
      
      <!-- Top Row: Scrolls Continuously to the LEFT <-- -->
      <div class="tb-marquee-wrapper tb-row-left">
        <div class="tb-marquee-track tb-track-left">
          ${row1List.map(renderBrandCard).join('')}
        </div>
      </div>

      <!-- Bottom Row: Scrolls Continuously to the RIGHT -->
      <div class="tb-marquee-wrapper tb-row-right">
        <div class="tb-marquee-track tb-track-right">
          ${row2List.map(renderBrandCard).join('')}
        </div>
      </div>

    </div>

    <!-- Vignette Masks on Left & Right to create infinite seamless edge fades -->
    <div class="tb-mask tb-mask-left" aria-hidden="true"></div>
    <div class="tb-mask tb-mask-right" aria-hidden="true"></div>

  </section>
  `;
}

export function initTrustedByEvents() {
  const trackLeft = document.querySelector('.tb-track-left');
  const trackRight = document.querySelector('.tb-track-right');
  const container = document.querySelector('.tb-marquees-container');
  if (!trackLeft || !trackRight || !container) return;

  // Clear CSS animation to grant GSAP full 60fps velocity control
  trackLeft.style.animation = 'none';
  trackRight.style.animation = 'none';

  // Continuous seamless loop in opposite directions
  const tweenLeft = gsap.fromTo(
    trackLeft,
    { xPercent: 0 },
    { xPercent: -50, duration: 45, ease: 'none', repeat: -1 }
  );

  const tweenRight = gsap.fromTo(
    trackRight,
    { xPercent: -50 },
    { xPercent: 0, duration: 45, ease: 'none', repeat: -1 }
  );

  // Smooth deceleration on hover over the carousel area, accelerate back on mouseleave
  container.addEventListener('mouseenter', () => {
    gsap.to([tweenLeft, tweenRight], {
      timeScale: 0.35,
      duration: 1.2,
      ease: 'power2.out'
    });
  });

  container.addEventListener('mouseleave', () => {
    gsap.to([tweenLeft, tweenRight], {
      timeScale: 1,
      duration: 1.2,
      ease: 'power2.out'
    });
  });
}
