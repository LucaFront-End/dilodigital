// Flagship Home View for Dilo Digital MX
import { CATEGORIES } from '../data/categories.js';
import { PROJECTS, TESTIMONIALS } from '../data/projects.js';
import { sounds } from '../utils/SoundEngine.js';
import { SoundwaveCanvas } from '../utils/SoundwaveCanvas.js';
import { renderSaduHero, initSaduHeroEvents } from '../components/SaduHero.js';
import { renderDinametraServices, initDinametraServicesEvents } from '../components/DinametraServices.js';
import { renderKineticReel, initKineticReelEvents } from '../components/KineticReel.js';
import { renderWorksWheel, initWorksWheelEvents } from '../components/WorksWheel.js';
import { renderTrustedBy, initTrustedByEvents } from '../components/TrustedBy.js';
import { renderMethodStepper, initMethodStepperEvents } from '../components/MethodStepper.js';
import { renderTestimonialsMarquee, initTestimonialsMarqueeEvents } from '../components/TestimonialsMarquee.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

let soundwaveInstance = null;

export function renderHomeView() {
  const activeCat = CATEGORIES[0]; // Default to 01 Branding

  return `
    <main class="page-home">
      <!-- 1. HERO SECTION -->
      ${renderSaduHero()}

      <!-- 2. CLEAN & AIRY SERVICES SHOWCASE (DINAMETRA STYLE WITH REAL LOTTIES) -->
      ${renderDinametraServices()}

      <!-- 3. WORKS WHEEL — 3D CYLINDRICAL DRUM & CONCENTRIC RING (CASOS INSIGNIA) -->
      ${renderWorksWheel()}

      <!-- 4. TRUSTED BY THE BEST — DUAL REVERSE INFINITE CAROUSELS (White Canvas Edition) -->
      ${renderTrustedBy()}

      <!-- 5. IMPI EXPRESS VIABILITY SCANNER BANNER -->
      <section class="container impi-banner-section" style="margin-top: clamp(4rem, 7vh, 6rem); margin-bottom: clamp(4rem, 7vw, 7rem);">
        <div class="impi-express-banner">
          <div class="impi-banner-grid">
            
            <div class="impi-banner-content">
              <div class="impi-eyebrow-pill">
                <span class="impi-eyebrow-pulse"></span>
                <span>Protección Legal ante el IMPI &middot; México</span>
              </div>
              <h3 class="impi-banner-title">
                ¿TU MARCA ESTÁ DISPONIBLE PARA <span style="color: #FF5A1F;">REGISTRO ANTE EL IMPI?</span>
              </h3>
              <p class="impi-banner-subtitle">
                Evita demandas y pérdida de inversión. Realizamos un dictamen fonético express en 24h antes de que inviertas en diseño o producción.
              </p>

              <form class="impi-search-box" id="home-impi-search-form">
                <div class="impi-search-input-wrap">
                  <svg class="impi-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    class="impi-search-input" 
                    id="home-impi-input" 
                    placeholder="Escribe el nombre de tu marca (Ej. Nova Coffee)" 
                    required
                  >
                </div>
                <button type="submit" class="impi-search-btn" data-cursor="hover">
                  <span>Consultar Disponibilidad</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <!-- Micro-Proof Checklist -->
              <div class="impi-banner-proof">
                <div class="impi-proof-pill">
                  <span class="impi-proof-check">✓</span>
                  <span>Trámite 100% Online</span>
                </div>
                <div class="impi-proof-pill">
                  <span class="impi-proof-check">✓</span>
                  <span>Dictamen en 24 Horas</span>
                </div>
                <div class="impi-proof-pill">
                  <span class="impi-proof-check">✓</span>
                  <span>Garantía de Viabilidad Dilo</span>
                </div>
              </div>
            </div>

            <!-- Kinetic Radar Legal Scanner Visual -->
            <div class="impi-banner-visual" aria-hidden="true">
              <div class="impi-radar-stage">
                <svg class="impi-radar-svg" viewBox="0 0 340 340" fill="none">
                  <defs>
                    <linearGradient id="impiBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0.0" />
                    </linearGradient>
                    <radialGradient id="impiCenterGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#10B981" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
                    </radialGradient>
                  </defs>

                  <!-- Concentric Radar Rings -->
                  <circle cx="170" cy="170" r="150" stroke="rgba(20, 23, 24, 0.05)" stroke-width="1" />
                  <circle cx="170" cy="170" r="110" stroke="rgba(20, 23, 24, 0.07)" stroke-width="1" stroke-dasharray="3 3" />
                  <circle cx="170" cy="170" r="70" stroke="rgba(20, 23, 24, 0.09)" stroke-width="1" />
                  <circle cx="170" cy="170" r="30" stroke="rgba(255, 90, 31, 0.18)" stroke-width="1.5" />

                  <!-- Crosshairs Axis Guides -->
                  <line x1="20" y1="170" x2="320" y2="170" stroke="rgba(20, 23, 24, 0.06)" stroke-width="1" />
                  <line x1="170" y1="20" x2="170" y2="320" stroke="rgba(20, 23, 24, 0.06)" stroke-width="1" />

                  <!-- Rotating Radar Sweep Beam -->
                  <g class="impi-radar-sweep">
                    <path d="M 170 170 L 320 170 A 150 150 0 0 0 276 64 Z" fill="url(#impiBeamGrad)" />
                    <line x1="170" y1="170" x2="276" y2="64" stroke="#FF5A1F" stroke-width="2" stroke-linecap="round" />
                  </g>

                  <!-- Central Radar Core Pulse -->
                  <circle cx="170" cy="170" r="24" fill="url(#impiCenterGlow)" />
                  <circle cx="170" cy="170" r="16" fill="#FFFFFF" stroke="#10B981" stroke-width="2" />
                  <path d="M 165 170 L 169 174 L 176 166" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />

                  <!-- Target Echo Blip -->
                  <circle class="impi-radar-blip" cx="240" cy="100" r="4" fill="#FF5A1F" />
                  <circle class="impi-radar-blip-ring" cx="240" cy="100" r="10" stroke="#FF5A1F" stroke-width="1" />
                </svg>

                <!-- Floating Minimal Status Badges -->
                <div class="impi-float-chip chip-top">
                  <span class="impi-chip-dot"></span>
                  <span>MARCA FACTIBLE &middot; 98.4% DISPONIBLE</span>
                </div>

                <div class="impi-float-chip chip-bottom">
                  <span class="impi-chip-icon">🛡️</span>
                  <span>Clases NIZA 35, 42 & 25</span>
                </div>
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

  // 2. Initialize Dinametra-Style Clean Services with Lotties Events
  initDinametraServicesEvents();

  // 3. Initialize The Works Wheel 3D Rotating Showcase Events
  initWorksWheelEvents();

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
      window.location.hash = `#/registro-marca?q=${encodeURIComponent(query)}&open=coincidencias`;
    }
  });
}

