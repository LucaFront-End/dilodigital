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
      <svg width="34" height="34" viewBox="0 0 24 24">
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
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#0081FB">
        <path d="M16.5 6A5.5 5.5 0 0 1 22 11.5c0 3.5-3 6.5-6.5 6.5-3 0-4.5-2.5-6.5-5-2-2.5-3.5-5-6.5-5A5.5 5.5 0 0 0 0 11.5C0 15 3 18 6.5 18c3 0 4.5-2.5 6.5-5 2-2.5 3.5-5 6.5-5zM6.5 15.5c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.8 0 3 2 4.5 4-1.5 2-2.7 4-4.5 4zm11 0c-1.8 0-3-2-4.5-4 1.5-2 2.7-4 4.5-4 2.2 0 4 1.8 4 4s-1.8 4-4 4z"/>
      </svg>
    `,
    tag: 'CERTIFICADO META'
  },
  {
    name: 'Shopify Plus',
    category: 'Plataforma Global E-commerce',
    svg: `
      <svg width="32" height="34" viewBox="0 0 24 24" fill="#95BF47">
        <path d="M15.33 2.15a1.86 1.86 0 0 0-1.42-.64c-.06 0-.12 0-.17.02l-1.39.42c-.22.07-.37.26-.37.49v.08c0 .24.16.44.39.49l.66.14c.26.06.42.31.36.57l-.31 1.48c-.06.27-.32.44-.59.38l-.66-.14a.5.5 0 0 0-.58.37l-2.02 9.53a.5.5 0 0 0 .39.59l8.66 1.83a.5.5 0 0 0 .59-.39l2.76-13a.5.5 0 0 0-.39-.59l-5.69-1.21zm-1.87 2.1c.14-.65.65-1.12 1.3-1.15.11 0 .22.02.32.06l-1.62 7.64-.08.38c-.07.33-.39.52-.71.45l-.43-.09 1.22-7.29z"/>
      </svg>
    `,
    tag: 'EXPERT PARTNER'
  },
  {
    name: 'Stripe',
    category: 'Infraestructura de Pagos',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.97 15.697.5 12.82.5 6.953.5 3.01 3.568 3.01 8.556c0 5.058 4.354 6.643 8.01 8.006 2.517.936 3.39 1.63 3.39 2.627 0 .977-.852 1.503-2.31 1.503-2.617 0-5.328-1.2-7.241-2.221l-.9 5.617C5.88 25.105 8.943 26 12.183 26c6.115 0 10.32-2.923 10.32-8.156 0-5.233-4.328-6.843-8.527-8.694z"/>
      </svg>
    `,
    tag: 'PAGOS GLOBALES'
  },
  {
    name: 'Amazon Web Services',
    category: 'Infraestructura Cloud & Data',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M7.74 9.42c0-.5.18-.88.54-1.14.36-.26.86-.39 1.5-.39.8 0 1.57.19 2.31.57V6.74a7.1 7.1 0 0 0-2.4-.41c-1.35 0-2.38.33-3.09 1-.71.66-1.07 1.55-1.07 2.67 0 .99.28 1.8.84 2.42.56.62 1.34 1.05 2.34 1.29l1.29.32c.73.18 1.25.42 1.56.72.31.3.46.7.46 1.2 0 .54-.2 1-.6 1.37-.4.37-.99.55-1.77.55-.99 0-1.99-.26-3-.78v1.78c1.06.41 2.12.61 3.18.61 1.48 0 2.61-.35 3.39-1.05.78-.7 1.17-1.66 1.17-2.88 0-.96-.28-1.76-.84-2.4-.56-.64-1.36-1.1-2.4-1.38l-1.32-.35a3.1 3.1 0 0 1-1.35-.61c-.32-.28-.48-.68-.48-1.2zM21.5 16.5c-4.4 3.3-10.8 4.9-16.3 2.1-.8-.4-1.5-.9-2.2-1.5-.3-.3-.1-.6.3-.5 5.2 2 11.4 1.1 16.1-1.8.6-.4 1.1.2.6.7z"/>
      </svg>
    `,
    tag: 'CLOUD TIER 1'
  },
  {
    name: 'Mercado Libre',
    category: 'Líder E-commerce & Envíos LatAm',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#2D3277">
        <circle cx="12" cy="12" r="11" fill="#FFE600"/>
        <path d="M7 13c1-2 3-3 5-2.5l2 .7c1 .3 2 0 2.7-.7l2-2c.7-.7 1.7-.7 2.3 0s.7 1.7 0 2.3l-2.7 2.7c-1 1-2.3 1.3-3.7 1l-2-.7c-1.3-.3-3 .3-3.7 1.7l-2.3 2.7" stroke="#2D3277" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      </svg>
    `,
    tag: 'RETAIL MEDIA'
  },
  {
    name: 'TikTok for Business',
    category: 'Pauta Publicitaria & UGC',
    svg: `
      <svg width="32" height="34" viewBox="0 0 24 24" fill="#000000">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.89c.35 0 .68.06 1 .16V9.06a6.34 6.34 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75c1.23.88 2.74 1.41 4.36 1.44V6.75a4.82 4.82 0 0 1-.6-.06z"/>
      </svg>
    `,
    tag: 'AGENCIA OFICIAL'
  },
  {
    name: 'HubSpot',
    category: 'Inbound Marketing & CRM',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.8 7.3V4.9c.7-.3 1.2-1 1.2-1.9 0-1.1-.9-2-2-2s-2 .9-2 2c0 .8.5 1.5 1.2 1.9v2.4c-1.2.4-2.2 1.3-2.6 2.5L9.9 8.2c.1-.3.2-.6.2-1 0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3c.4 0 .7-.1 1-.2l4.7 1.6c0 .1 0 .3 0 .4 0 1.2.5 2.3 1.3 3l-2.1 2.1c-.3-.1-.6-.2-.9-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.4-.1-.7-.2-1l2.1-2.1c1.1.7 2.4.9 3.7.5 1.5-.5 2.6-1.7 3-3.2.4-1.5 0-3.1-1.1-4.2-.6-.6-1.4-1-2.2-1.1zm-1.8 6.9c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3z"/>
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
      <svg width="38" height="34" viewBox="0 0 24 24" fill="#004481">
        <rect width="24" height="24" rx="5" fill="#004481"/>
        <text x="12" y="16.5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="9" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">BBVA</text>
      </svg>
    `,
    tag: 'BANCA TIER 1'
  },
  {
    name: 'Kavak',
    category: 'Unicornio Automotriz Tech',
    svg: `
      <svg width="38" height="34" viewBox="0 0 24 24" fill="#111827">
        <rect width="24" height="24" rx="5" fill="#111827"/>
        <text x="10.5" y="16.5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="10" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">kavak</text>
        <circle cx="20" cy="9" r="1.8" fill="#2563EB"/>
      </svg>
    `,
    tag: 'SCALE-UP LÍDER'
  },
  {
    name: 'Nu México',
    category: 'Neobanca & Tarjetas Digitales',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#820AD1">
        <rect width="24" height="24" rx="5" fill="#820AD1"/>
        <text x="12" y="17" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="13" fill="#FFFFFF" text-anchor="middle">nu</text>
      </svg>
    `,
    tag: 'FINTECH UNICORN'
  },
  {
    name: 'OXXO',
    category: 'FEMSA Comercio & Red OXXO Pay',
    svg: `
      <svg width="40" height="34" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#E31B23"/>
        <text x="12" y="16.5" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="8.5" fill="#FFD100" text-anchor="middle" letter-spacing="0.8">OXXO</text>
      </svg>
    `,
    tag: 'RETAIL OMNICANAL'
  },
  {
    name: 'Cinépolis',
    category: 'Entretenimiento & Experiencias',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#0B2265">
        <circle cx="12" cy="12" r="11" fill="#0B2265"/>
        <path d="M7 8.5h10M7 12h10M7 15.5h6" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="17" cy="15.5" r="1.5" fill="#FFC72C"/>
      </svg>
    `,
    tag: 'MARCA GLOBAL MX'
  },
  {
    name: 'Grupo Bimbo',
    category: 'Consumo Masivo Multinacional',
    svg: `
      <svg width="38" height="34" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#004481"/>
        <text x="12" y="16" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="8" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">BIMBO</text>
      </svg>
    `,
    tag: 'ENTERPRISE B2C'
  },
  {
    name: 'Clip',
    category: 'Terminales & Pagos Digitales',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF5E00">
        <rect width="24" height="24" rx="5" fill="#FF5E00"/>
        <path d="M12 6.5a3.5 3.5 0 0 0-3.5 3.5v3.5a1.8 1.8 0 0 0 3.5 0V10a.9.9 0 0 0-1.8 0v2.6h-1.3V10a2.2 2.2 0 0 1 4.4 0v3.5a3.1 3.1 0 0 1-6.2 0V10a4.8 4.8 0 0 1 9.6 0v3.5h-1.3V10a3.5 3.5 0 0 0-3.5-3.5z" fill="#FFFFFF"/>
      </svg>
    `,
    tag: 'FINTECH CHECKOUT'
  },
  {
    name: 'Aeroméxico',
    category: 'Línea Aérea Bandera de México',
    svg: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="#0B2341">
        <circle cx="12" cy="12" r="11" fill="#0B2341"/>
        <path d="M12 4l3 6.5 5 1.5-5 1.5-3 6.5-3-6.5-5-1.5 5-1.5z" fill="#E31B23"/>
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
