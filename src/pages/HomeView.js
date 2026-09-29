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

      <!-- 5. IMPI BRAND PROTECTION VAULT (MINIMALIST, VISUAL, EDITORIAL) -->
      <section class="container impi-vault-section" style="margin-top: clamp(4rem, 7vh, 6rem); margin-bottom: clamp(4rem, 7vw, 7rem);">
        <div class="impi-vault-card">
          <div class="impi-vault-grid">
            
            <!-- Left: Punchy Editorial Copy & Spotlight Search -->
            <div class="impi-vault-content">
              <div class="impi-vault-eyebrow">
                <span class="impi-vault-pulse"></span>
                <span>Blindaje Legal IMPI &middot; CDMX</span>
              </div>
              
              <h3 class="impi-vault-title">
                TU NOMBRE VALE MILLONES. <br>
                <span class="impi-vault-title-accent">BLÍNDALO HOY.</span>
              </h3>
              
              <p class="impi-vault-subtitle">
                Dictamen fonético oficial en 24 horas hábiles. Protección nacional en las 45 clases NIZA antes de que un tercero registre tu nombre.
              </p>

              <!-- Spotlight-style Search Pill -->
              <form class="impi-vault-search-form" id="home-impi-search-form">
                <div class="impi-vault-search-inner">
                  <svg class="impi-vault-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    class="impi-vault-input" 
                    id="home-impi-input" 
                    placeholder="Escribe el nombre de tu marca..." 
                    autocomplete="off"
                    required
                  >
                  <button type="submit" class="impi-vault-submit-btn" data-cursor="hover">
                    <span>Escanear</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </form>

              <!-- Subtle Micro-Guarantees -->
              <div class="impi-vault-guarantees">
                <span>✓ 100% Trámite Online</span>
                <span class="impi-vault-sep">&middot;</span>
                <span>✓ Dictamen en 24h</span>
                <span class="impi-vault-sep">&middot;</span>
                <span>✓ Reemplazo Sin Costo</span>
              </div>
            </div>

            <!-- Right: Beautiful Tangible Trademark Certificate Card -->
            <div class="impi-vault-visual" aria-hidden="true">
              <div class="impi-cert-card">
                
                <!-- Ambient Subtle Glow -->
                <div class="impi-cert-glow"></div>

                <!-- Card Header -->
                <div class="impi-cert-header">
                  <div class="impi-cert-stamp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>EXPEDIENTE IMPI</span>
                  </div>
                  <span class="impi-cert-badge">DICTAMEN: 98% VIABLE</span>
                </div>

                <!-- Visual Brand Display -->
                <div class="impi-cert-body">
                  <div class="impi-cert-brand-tag">MARCA REGISTRADA</div>
                  <div class="impi-cert-brand-name">TU MARCA ®</div>
                  <div class="impi-cert-brand-sub">Exclusividad Territorial &amp; Comercial en México</div>
                </div>

                <!-- Micro-Metrics Footer -->
                <div class="impi-cert-footer">
                  <div class="impi-cert-stat">
                    <span class="impi-cert-stat-label">Clase NIZA</span>
                    <span class="impi-cert-stat-val">35 / 42 / 25</span>
                  </div>
                  <div class="impi-cert-div"></div>
                  <div class="impi-cert-stat">
                    <span class="impi-cert-stat-label">Vigencia</span>
                    <span class="impi-cert-stat-val">10 Años</span>
                  </div>
                  <div class="impi-cert-div"></div>
                  <div class="impi-cert-stat">
                    <span class="impi-cert-stat-label">Gestión</span>
                    <span class="impi-cert-stat-val">Oficial IMPI</span>
                  </div>
                </div>

                <!-- Floating Holographic Badge -->
                <div class="impi-cert-floating-tag">
                  <span class="impi-floating-check">✓</span>
                  <span>Sin Riesgo de Demanda</span>
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

