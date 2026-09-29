// ================================================================
// VERTICAL TESTIMONIALS COLUMNS COMPONENT
// Inspired by 21st.dev testimonials-columns-1 — Minimalist & Clean
// 3 Multi-Speed Staggered Columns with Infinite Vertical Loop & Edge Fade
// ================================================================

export const TESTIMONIALS_COL_1 = [
  {
    name: "Mauricio Treviño",
    role: "CEO",
    company: "FitFuel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    quote: "Pasamos de 1.8x a más de 5.4x de ROAS en 90 días con sus funnels automatizados de WhatsApp y Meta Ads.",
    metric: "ROAS 5.4x"
  },
  {
    name: "Sofía Delgado",
    role: "Fundadora",
    company: "Aurora Jewelry",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    quote: "El rediseño de identidad y el registro ante el IMPI nos dieron presencia internacional inmediata sin trabas.",
    metric: "Marca Blindada"
  },
  {
    name: "Roberto Aguilar",
    role: "Director de Operaciones",
    company: "Lúmina",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    quote: "Velocidad récord de 0.7s FCP y diseño editorial. Nuestras solicitudes de cotización aumentaron un 240%.",
    metric: "0.7s Carga Web"
  },
  {
    name: "Valeria Morales",
    role: "Directora Comercial",
    company: "Altus Logística",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    quote: "Top 3 en Google para fletes internacionales y logística aduanal en menos de 6 meses. Leads constantes.",
    metric: "+320% Leads B2B"
  }
];

export const TESTIMONIALS_COL_2 = [
  {
    name: "Carlos Villaseñor",
    role: "Socio Fundador",
    company: "Bosque del Valle",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    quote: "La producción de video 4K y reels redujo nuestro ciclo de venta inmobiliario de 6 meses a solo 45 días.",
    metric: "92% Vendido"
  },
  {
    name: "Fernanda Castillo",
    role: "Head of Growth",
    company: "Nexus Wealth",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    quote: "El onboarding digital de clientes pasó de 5 días a solo 12 minutos con contratos y firma electrónica.",
    metric: "< 12m Onboarding"
  },
  {
    name: "Alejandro Gómez",
    role: "Managing Director",
    company: "Kroma Studio",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80",
    quote: "Sensibilidad estética de clase mundial sin perder la solidez ejecutiva que exigen nuestros clientes B2B.",
    metric: "100% Identidad"
  },
  {
    name: "Mariana Orozco",
    role: "Directora E-commerce",
    company: "Terra Viva",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=240&q=80",
    quote: "Los videos UGC triplicaron nuestro CTR en TikTok e Instagram. La recompra en tienda online nunca estuvo tan alta.",
    metric: "3.8x Retorno Ads"
  }
];

export const TESTIMONIALS_COL_3 = [
  {
    name: "Santiago Ramos",
    role: "Chief Investment Officer",
    company: "Apex Capital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    quote: "Blindaron 4 de nuestras marcas en clases NIZA con un rigor legal impecable. Atención personalizada de 10.",
    metric: "4 Marcas IMPI"
  },
  {
    name: "Camila Valencia",
    role: "Co-founder",
    company: "Nómada Coffee",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=240&q=80",
    quote: "Desde el empaque premium hasta la tienda online, Dilo entendió la experiencia del café de especialidad al 100%.",
    metric: "+190% Suscripción"
  },
  {
    name: "Eduardo Salinas",
    role: "Director General",
    company: "SteelCore",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
    quote: "Cerramos contratos de naves industriales gracias a prospectos calificados que llegaron directo por Google.",
    metric: "$12M+ Cotizados"
  },
  {
    name: "Lucía Beltrán",
    role: "VP Experiencia",
    company: "Vesta Living",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=240&q=80",
    quote: "Nuestra web vuela y los clientes internacionales reservan sin ninguna fricción. Una experiencia de nivel global.",
    metric: "100/100 PageSpeed"
  }
];

function renderMinimalTestimonialCard(item, index) {
  return `
  <article class="tst-card" data-index="${index}">
    <div class="tst-card-top">
      <div class="tst-card-stars" aria-label="5 de 5 estrellas">
        <span class="tst-star">★</span><span class="tst-star">★</span><span class="tst-star">★</span><span class="tst-star">★</span><span class="tst-star">★</span>
      </div>
      ${item.metric ? `<span class="tst-card-badge">${item.metric}</span>` : ''}
    </div>

    <p class="tst-card-quote">
      "${item.quote}"
    </p>

    <footer class="tst-card-footer">
      <img
        src="${item.avatar}"
        alt="${item.name}"
        class="tst-avatar"
        width="40"
        height="40"
        loading="lazy"
      />
      <div class="tst-author-info">
        <div class="tst-name-row">
          <span class="tst-author-name">${item.name}</span>
          <svg class="tst-verified-icon" viewBox="0 0 24 24" fill="currentColor" title="Cliente verificado" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="tst-author-role">${item.role} · ${item.company}</div>
      </div>
    </footer>
  </article>
  `;
}

function renderColumn(testimonials, colClass, duration) {
  // Duplicate array for seamless infinite vertical translateY(-50%) loop
  const duplicated = [...testimonials, ...testimonials];
  return `
  <div class="tst-column ${colClass}" style="--col-duration: ${duration}s;">
    <div class="tst-column-track">
      ${duplicated.map((item, idx) => renderMinimalTestimonialCard(item, idx)).join('')}
    </div>
  </div>
  `;
}

export function renderTestimonialsMarquee() {
  return `
  <!-- ================================================================
       VERTICAL TESTIMONIALS COLUMNS — MINIMALIST & REFINED
       ================================================================ -->
  <section class="tst-section" id="testimonios">
    
    <!-- Header: Minimalist & Clean -->
    <header class="tst-header">
      <div class="tst-tag-wrap">
        <span class="tst-diamond-dot"></span>
        <span class="tst-tag-text">OPINIONES VERIFICADAS</span>
      </div>

      <h2 class="tst-title">
        LO QUE DICEN QUIENES YA<br>
        <span class="tst-title-accent">DEJARON MARCA.</span>
      </h2>

      <p class="tst-subtitle">
        Historias y resultados reales de fundadores y directores que escalaron su marca con Dilo Digital.
      </p>

      <!-- Trust Score Pill -->
      <div class="tst-trust-pill">
        <span class="tst-stars-lead">★★★★★</span>
        <span class="tst-trust-score">4.9 / 5.0</span>
        <span class="tst-trust-sep"></span>
        <span class="tst-trust-count">+140 Marcas Escaladas</span>
        <span class="tst-trust-sep"></span>
        <span class="tst-trust-verified">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          100% Verificadas
        </span>
      </div>
    </header>

    <!-- 3-Column Infinite Vertical Marquee with Edge Gradient Fade -->
    <div class="tst-columns-container" aria-label="Columnas continuas de testimonios de clientes">
      ${renderColumn(TESTIMONIALS_COL_1, 'tst-col-1', 22)}
      ${renderColumn(TESTIMONIALS_COL_2, 'tst-col-2', 28)}
      ${renderColumn(TESTIMONIALS_COL_3, 'tst-col-3', 25)}
    </div>

  </section>
  `;
}

export function initTestimonialsMarqueeEvents() {
  // Interaction enhancement: pause on hover is handled cleanly by CSS
  // We can attach subtle mouse enter/leave listeners if needed for touch devices
  const columns = document.querySelectorAll('.tst-column-track');
  columns.forEach(col => {
    col.addEventListener('mouseenter', () => {
      col.style.animationPlayState = 'paused';
    });
    col.addEventListener('mouseleave', () => {
      col.style.animationPlayState = 'running';
    });
  });
}
