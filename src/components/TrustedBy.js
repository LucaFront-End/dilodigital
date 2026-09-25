// ================================================================
// TRUSTED BY THE BEST — DUAL REVERSE INFINITE CAROUSEL SECTION
// Inspired by Sadu Media & Luxury Modern Agency Aesthetics
// Pure White Luxury Background + Brand Turquoise Accents
// ================================================================

import gsap from 'gsap';

// Curated Brands & Partner Network for Dilo Digital MX
const BRANDS_ROW_1 = [
  {
    name: 'Formula E',
    category: 'Automovilismo Global',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
        <path d="M13 11l-3 5h4l-3 5"></path>
      </svg>
    `,
    tag: 'ALIADO GLOBAL'
  },
  {
    name: 'Aurora Jewelry',
    category: 'Alta Joyería CDMX',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 3h12l4 6-10 12L2 9z"></path>
        <path d="M2 9h20"></path>
        <path d="M10 3l2 6 2-6"></path>
      </svg>
    `,
    tag: 'REBRANDING & IMPI'
  },
  {
    name: 'Google Ads Premier',
    category: 'Partner Premier 2025',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
      </svg>
    `,
    tag: 'PARTNER PREMIER'
  },
  {
    name: 'Lúmina Studio',
    category: 'Arquitectura & Diseño',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <path d="M3 9h18"></path>
        <path d="M9 21V9"></path>
      </svg>
    `,
    tag: 'WIX HEADLESS'
  },
  {
    name: 'Meta Business',
    category: 'Pauta Publicitaria Enterprise',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16.5 6A5.5 5.5 0 0 1 22 11.5c0 3.5-3 6.5-6.5 6.5-3 0-4.5-2.5-6.5-5-2-2.5-3.5-5-6.5-5A5.5 5.5 0 0 0 0 11.5C0 15 3 18 6.5 18c3 0 4.5-2.5 6.5-5 2-2.5 3.5-5 6.5-5z"></path>
      </svg>
    `,
    tag: 'CERTIFICADO META'
  },
  {
    name: 'FitFuel Nutrition',
    category: 'Performance D2C',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    `,
    tag: 'ROAS 5.4X'
  },
  {
    name: 'IMPI México',
    category: 'Blindaje Legal de Marcas',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    `,
    tag: 'CLASES 1 A 45'
  },
  {
    name: 'Wix Studio',
    category: 'Desarrollo Web Headless',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `,
    tag: 'DESARROLLADOR OFICIAL'
  }
];

const BRANDS_ROW_2 = [
  {
    name: 'Altus Logística',
    category: 'Cadena de Suministro B2B',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    `,
    tag: 'SEO B2B TOP 3'
  },
  {
    name: 'Bosque del Valle',
    category: 'Desarrollo Inmobiliario',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 22 22 22"></polygon>
        <polygon points="12 6 5 20 19 20"></polygon>
      </svg>
    `,
    tag: 'PRODUCCIÓN 4K'
  },
  {
    name: 'Nexus Wealth',
    category: 'Fintech & Banca Privada',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    `,
    tag: 'INTEGRACIÓN CRM'
  },
  {
    name: 'TikTok Ads',
    category: 'Agencia Oficial Partner',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    `,
    tag: 'UGC & COMERCIO'
  },
  {
    name: 'Stripe Global',
    category: 'Pagos & Checkout',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    `,
    tag: 'PASARELA OFICIAL'
  },
  {
    name: 'HubSpot Elite',
    category: 'Inbound Marketing & CRM',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
    `,
    tag: 'AUTOMATIZACIÓN'
  },
  {
    name: 'Kommo CRM',
    category: 'WhatsApp Business API',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `,
    tag: 'RESPUESTA < 30S'
  },
  {
    name: 'Mercado Pago',
    category: 'Pasarela de Pagos MX',
    svg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `,
    tag: 'ECOMMERCE B2C'
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
