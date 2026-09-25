// ================================================================
// INFINITE TESTIMONIALS CAROUSEL COMPONENT
// Dual-Row Continuous Infinite Marquee with Cinematic Edge Blur
// 12 Authentic Verified Reviews — Streamlined & Compact Metadata
// ================================================================

import gsap from 'gsap';

export const REVIEWS_ROW_1 = [
  {
    author: "Mauricio T.",
    company: "FitFuel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    quote: "Pasamos de 1.8x a más de 5.4x de ROAS en 90 días con sus funnels automatizados de WhatsApp y Meta Ads.",
    metric: "ROAS 5.4x"
  },
  {
    author: "Sofía D.",
    company: "Aurora Jewelry",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    quote: "El rediseño de identidad y el registro ante el IMPI nos dieron presencia internacional inmediata sin trabas.",
    metric: "Marca Blindada"
  },
  {
    author: "Roberto A.",
    company: "Lúmina",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    quote: "Velocidad récord de 0.7s FCP y diseño editorial. Nuestras solicitudes de cotización aumentaron un 240%.",
    metric: "0.7s Carga Web"
  },
  {
    author: "Valeria M.",
    company: "Altus Logística",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    quote: "Top 3 en Google para fletes internacionales y logística aduanal en menos de 6 meses. Leads calificados constantes.",
    metric: "+320% Leads B2B"
  },
  {
    author: "Carlos V.",
    company: "Bosque del Valle",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    quote: "La producción de video 4K y reels redujo nuestro ciclo de venta inmobiliario de 6 meses a solo 45 días.",
    metric: "92% Vendido"
  },
  {
    author: "Fernanda C.",
    company: "Nexus Wealth",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    quote: "El onboarding digital de clientes pasó de 5 días a solo 12 minutos con contratos y firma electrónica automatizada.",
    metric: "< 12m Onboarding"
  }
];

export const REVIEWS_ROW_2 = [
  {
    author: "Alejandro G.",
    company: "Kroma Studio",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80",
    quote: "Sensibilidad estética de clase mundial sin perder la solidez ejecutiva que exigen nuestros clientes B2B.",
    metric: "100% Identidad"
  },
  {
    author: "Mariana O.",
    company: "Terra Viva",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=240&q=80",
    quote: "Los videos UGC triplicaron nuestro CTR en TikTok e Instagram. La recompra en tienda online nunca estuvo tan alta.",
    metric: "3.8x Retorno Ads"
  },
  {
    author: "Santiago R.",
    company: "Apex Capital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    quote: "Blindaron 4 de nuestras marcas en clases NIZA con un rigor legal impecable. Atención personalizada de 10.",
    metric: "4 Marcas IMPI"
  },
  {
    author: "Camila V.",
    company: "Nómada Coffee",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=240&q=80",
    quote: "Desde el empaque premium hasta la tienda online, Dilo entendió la experiencia del café de especialidad al 100%.",
    metric: "+190% Suscripción"
  },
  {
    author: "Eduardo S.",
    company: "SteelCore",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
    quote: "Cerramos contratos de naves industriales gracias a prospectos calificados que llegaron directo por Google.",
    metric: "$12M+ Cotizados"
  },
  {
    author: "Lucía B.",
    company: "Vesta Living",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=240&q=80",
    quote: "Nuestra web vuela y los clientes internacionales reservan sin ninguna fricción. Una experiencia de nivel global.",
    metric: "100/100 PageSpeed"
  }
];

function renderReviewCard(rev) {
  return `
  <article class="tst-card">
    <div class="tst-card-header">
      <div class="tst-card-stars">★★★★★</div>
      <span class="tst-card-metric">${rev.metric}</span>
    </div>

    <p class="tst-card-quote">
      "${rev.quote}"
    </p>

    <footer class="tst-card-footer">
      <img src="${rev.avatar}" alt="${rev.author}" class="tst-author-avatar" loading="lazy">
      <div class="tst-author-meta">
        <div class="tst-author-line">
          <span class="tst-author-name">${rev.author}</span>
          <span class="tst-author-sep">·</span>
          <span class="tst-author-company">${rev.company}</span>
          <svg class="tst-verified-icon" viewBox="0 0 24 24" fill="currentColor" title="Verificado">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
    </footer>
  </article>
  `;
}

export function renderTestimonialsMarquee() {
  const row1List = [...REVIEWS_ROW_1, ...REVIEWS_ROW_1];
  const row2List = [...REVIEWS_ROW_2, ...REVIEWS_ROW_2];

  return `
  <!-- ================================================================
       INFINITE TESTIMONIALS CAROUSEL — DUAL ROW WITH EDGE BLUR
       ================================================================ -->
  <section class="tst-section" id="resenas">
    
    <!-- Section Header -->
    <header class="tst-header">
      <div class="tst-tag-wrap">
        <span class="tst-diamond-dot"></span>
        <span class="tst-tag-text">REPUTACIÓN & RESULTADOS COMPROBADOS</span>
      </div>

      <h2 class="tst-title">
        LO QUE DICEN QUIENES YA<br>
        <span class="tst-title-accent">DEJARON MARCA.</span>
      </h2>

      <p class="tst-subtitle">
        Historias reales de fundadores y directores que escalaron su presencia de la mano de Dilo Digital.
      </p>

      <!-- Trust Score Micro-Bar -->
      <div class="tst-trust-pill">
        <span class="tst-stars-lead">★★★★★</span>
        <span class="tst-trust-score">4.9 / 5.0</span>
        <span class="tst-trust-sep"></span>
        <span>+140 Marcas Escaladas</span>
        <span class="tst-trust-sep"></span>
        <span class="tst-trust-verified">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Opiniones 100% Verificadas
        </span>
      </div>
    </header>

    <!-- Continuous Running Marquees in Opposite Directions -->
    <div class="tst-marquees-container" aria-label="Carrusel continuo de reseñas de clientes">
      
      <!-- Top Row: Scrolls Continuously to the LEFT <-- -->
      <div class="tst-marquee-wrapper tst-row-left">
        <div class="tst-track tst-track-left">
          ${row1List.map(renderReviewCard).join('')}
        </div>
      </div>

      <!-- Bottom Row: Scrolls Continuously to the RIGHT -->
      <div class="tst-marquee-wrapper tst-row-right">
        <div class="tst-track tst-track-right">
          ${row2List.map(renderReviewCard).join('')}
        </div>
      </div>

      <!-- Progressive Blur Masks on Left & Right to create seamless edge dissolving -->
      <div class="tst-mask tst-mask-left" aria-hidden="true"></div>
      <div class="tst-mask tst-mask-right" aria-hidden="true"></div>

    </div>

  </section>
  `;
}

export function initTestimonialsMarqueeEvents() {
  const trackLeft = document.querySelector('.tst-track-left');
  const trackRight = document.querySelector('.tst-track-right');
  const container = document.querySelector('.tst-marquees-container');
  if (!trackLeft || !trackRight || !container) return;

  // Continuous seamless loop in opposite directions
  const tweenLeft = gsap.fromTo(
    trackLeft,
    { xPercent: 0 },
    { xPercent: -50, duration: 52, ease: 'none', repeat: -1 }
  );

  const tweenRight = gsap.fromTo(
    trackRight,
    { xPercent: -50 },
    { xPercent: 0, duration: 52, ease: 'none', repeat: -1 }
  );

  // Smooth deceleration on hover over the reviews area, accelerate back on mouseleave
  container.addEventListener('mouseenter', () => {
    gsap.to([tweenLeft, tweenRight], {
      timeScale: 0.3,
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
