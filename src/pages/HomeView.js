// Flagship Home View for Dilo Digital MX
import { CATEGORIES } from '../data/categories.js';
import { PROJECTS, TESTIMONIALS } from '../data/projects.js';
import { sounds } from '../utils/SoundEngine.js';
import { SoundwaveCanvas } from '../utils/SoundwaveCanvas.js';
import { renderSaduHero, initSaduHeroEvents } from '../components/SaduHero.js';
import { renderDeckMonolith, initDeckMonolithEvents } from '../components/DeckMonolith.js';
import { renderKineticReel, initKineticReelEvents } from '../components/KineticReel.js';
import { renderTrustedBy, initTrustedByEvents } from '../components/TrustedBy.js';
import { renderMethodStepper, initMethodStepperEvents } from '../components/MethodStepper.js';
import { renderTestimonialsMarquee, initTestimonialsMarqueeEvents } from '../components/TestimonialsMarquee.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

let soundwaveInstance = null;

export function renderHomeView() {
  const activeCat = CATEGORIES[0]; // Default to 01 Branding

  return `
    <main class="page-home">
      <!-- 1. PIXEL-PERFECT SADU MEDIA REPLICA HERO SECTION -->
      ${renderSaduHero()}

      <!-- 2. KINETIC TICKER MARQUEE -->
      <section class="ticker-wrap" aria-hidden="true">
        <div class="ticker-track">
          <div class="ticker-item"><span>01. BRANDING & IDENTIDAD</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>02. PERFORMANCE MARKETING & ADS</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>03. DESARROLLO WEB WIX HEADLESS</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>04. REGISTRO DE MARCA IMPI</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>05. PRODUCCIÓN AUDIOVISUAL & UGC</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>06. AUTOMATIZACIÓN & CRM</span> <span class="dot"></span></div>
          <!-- Repeat for infinite illusion -->
          <div class="ticker-item"><span>01. BRANDING & IDENTIDAD</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>02. PERFORMANCE MARKETING & ADS</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>03. DESARROLLO WEB WIX HEADLESS</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>04. REGISTRO DE MARCA IMPI</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>05. PRODUCCIÓN AUDIOVISUAL & UGC</span> <span class="dot"></span></div>
          <div class="ticker-item"><span>06. AUTOMATIZACIÓN & CRM</span> <span class="dot"></span></div>
        </div>
      </section>

      <!-- 3. THE DECK MONOLITH — 3D SCROLL-PINNED STACKING CARDS (6 Master Disciplines) -->
      ${renderDeckMonolith()}

      <!-- 4. THE KINETIC CINEMA REEL — HORIZONTAL SCROLL SHOWCASE (6 Insignia Cases) -->
      ${renderKineticReel()}

      <!-- 5. TRUSTED BY THE BEST — DUAL REVERSE INFINITE CAROUSELS (White Canvas Edition) -->
      ${renderTrustedBy()}

      <!-- 6. IMPI EXPRESS VIABILITY SCANNER BANNER -->
      <section class="container" style="margin-top: clamp(3rem, 6vh, 5rem); margin-bottom: clamp(3rem, 6vw, 6rem);">
        <div class="impi-express-banner">
          <div class="impi-banner-grid">
            <div class="impi-banner-content">
              <span class="badge" style="background: rgba(255, 90, 31, 0.15); color: #FF7E47; margin-bottom: 0.8rem;">
                Protección Legal en México
              </span>
              <h3>¿Tu marca está disponible para registro ante el IMPI?</h3>
              <p>
                Evita demandas y pérdida de inversión. Realiza una búsqueda fonética express con nuestro equipo jurídico y protege tu nombre en las 45 clases NIZA.
              </p>

              <form class="impi-search-box" id="home-impi-search-form">
                <input 
                  type="text" 
                  class="impi-search-input" 
                  id="home-impi-input" 
                  placeholder="Escribe el nombre de tu marca (Ej. Nova Coffee)" 
                  required
                >
                <button type="submit" class="btn btn-primary" data-cursor="hover">
                  <span>Consultar Viabilidad</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </div>

            <div class="impi-banner-features">
              <div class="impi-feat-card">
                <div class="impi-feat-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Trámite 100% Online
                </div>
                <div class="impi-feat-desc">Sin filas ni trámites burocráticos. Nosotros gestionamos ante el portal oficial del IMPI.</div>
              </div>

              <div class="impi-feat-card">
                <div class="impi-feat-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Dictamen en 24 Horas
                </div>
                <div class="impi-feat-desc">Análisis de viabilidad fonética previo al pago de derechos oficiales del IMPI.</div>
              </div>

              <div class="impi-feat-card">
                <div class="impi-feat-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Portal de Seguimiento
                </div>
                <div class="impi-feat-desc">Monitorea cada fase de tu expediente: desde el ingreso hasta el título de concesión.</div>
              </div>

              <div class="impi-feat-card">
                <div class="impi-feat-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Garantía Dilo Digital
                </div>
                <div class="impi-feat-desc">Si tu marca tiene riesgo alto de rechazo en el dictamen, evaluamos otra alternativa sin costo.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. EL MÉTODO DILO — STEPPER DE PROCESO EN 4 PASOS -->
      ${renderMethodStepper()}


      <!-- 8. INFINITE TESTIMONIALS CAROUSEL — DUAL ROW WITH EDGE BLUR -->
      ${renderTestimonialsMarquee()}

      <!-- 9. SIGNATURE HIGH-ENERGY CALL TO ACTION -->
      ${renderFinalCta()}
    </main>
  `;
}

export function renderActiveCategoryCard(cat) {
  return `
    <div class="category-active-card">
      <div class="cat-card-left">
        <div class="cat-card-number">${cat.number}</div>
        <h3>${cat.title}</h3>
        <div class="cat-card-concept">"${cat.concept}"</div>
        <p class="cat-card-tagline">${cat.tagline}</p>

        <div class="cat-subsections-list">
          ${cat.subSections.map(sub => `
            <div class="cat-sub-item">
              <div class="cat-sub-title">
                ${sub.title}
                ${sub.isHighlight ? `<span class="badge badge-primary" style="font-size: 0.65rem; margin-left: 0.5rem;">${sub.highlightTag}</span>` : ''}
              </div>
              <div class="cat-sub-desc">${sub.description}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="#/categoria/${cat.slug}" class="btn btn-dark" data-cursor="explore">
            <span>Ver Categoría Completa</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

          ${cat.hasPurchaseFlow ? `
            <a href="#/registro-marca" class="btn btn-primary btn-glow" data-cursor="hover">
              <span>Comprar Registro IMPI Online</span>
            </a>
          ` : ''}
        </div>
      </div>

      <div class="cat-card-right">
        <h4 style="font-size: 1.1rem; margin-bottom: 1.2rem; color: var(--text-primary);">Métricas de Impacto</h4>
        
        <div class="cat-stats-row">
          ${cat.stats.map(s => `
            <div class="cat-stat-box">
              <div class="cat-stat-num">${s.value}</div>
              <div class="cat-stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size: 0.95rem; margin-bottom: 1rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.03em;">
          Entregables Incluidos:
        </h4>

        <ul class="cat-items-checklist">
          ${cat.subSections[0].items.slice(0, 5).map(item => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>

        <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.5rem;" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
          Solicitar Cotización de esta Categoría
        </button>
      </div>
    </div>
  `;
}

export function initHomeEvents() {
  // 1. Initialize Pixel-Perfect Sadu Hero Interactive Events
  initSaduHeroEvents();

  // 2. Initialize The Deck Monolith 3D Stacking Cards Events
  initDeckMonolithEvents();

  // 3. Initialize The Kinetic Cinema Reel Horizontal Showcase Events
  initKineticReelEvents();

  // 4. Initialize Trusted By The Best Reverse Marquee Events
  initTrustedByEvents();

  // 5. Initialize El Método Dilo 4-Step Stepper Events
  initMethodStepperEvents();

  // 6. Initialize Infinite Testimonials Marquee Events
  initTestimonialsMarqueeEvents();

  // 7. Initialize Final CTA Events
  initFinalCtaEvents();

  // IMPI Express Search Form on Home
  const impiForm = document.getElementById('home-impi-search-form');
  impiForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('home-impi-input')?.value.trim();
    if (query) {
      sounds.playSuccess();
      window.location.hash = `#/registro-marca?q=${encodeURIComponent(query)}`;
    }
  });
}

