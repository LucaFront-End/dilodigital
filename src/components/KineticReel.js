// ================================================================
// THE KINETIC CINEMA REEL — HORIZONTAL SCROLL SHOWCASE (CASOS INSIGNIA)
// Designed for Dilo Digital MX: Elite Awwwards / Sadu Architecture
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/projects.js';
import { sounds } from '../utils/SoundEngine.js';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ACCENTS = {
  branding: { color: '#FF5A1F', label: 'Branding & Identidad', glow: 'rgba(255, 90, 31, 0.35)' },
  'web-ecommerce': { color: '#FF5A1F', label: 'Wix Headless & Web', glow: 'rgba(255, 90, 31, 0.35)' },
  marketing: { color: '#FF5A1F', label: 'Performance Ads & ROAS', glow: 'rgba(255, 90, 31, 0.35)' },
  seo: { color: '#10B981', label: 'SEO Técnico & GEO', glow: 'rgba(16, 185, 129, 0.35)' },
  produccion: { color: '#A855F7', label: 'Producción Audiovisual 4K', glow: 'rgba(168, 85, 247, 0.35)' },
  tecnologia: { color: '#38BDF8', label: 'Tecnología & Soluciones CRM', glow: 'rgba(56, 189, 248, 0.35)' }
};

export function renderKineticReel() {
  return `
  <!-- ================================================================
       THE KINETIC CINEMA REEL — HORIZONTAL SCROLL PINNED SHOWCASE
       ================================================================ -->
  <section class="kr-section" id="kinetic-reel">
    <div class="kr-viewport" id="kr-viewport">
      
      <!-- Top HUD Control Bar -->
      <div class="kr-hud-bar">
        <div class="kr-hud-left">
          <span class="kr-rec-dot"></span>
          <span class="kr-hud-tag">REEL CINEMATOGRÁFICO · CASOS INSIGNIA</span>
        </div>

        <!-- Dynamic Timeline Scrubber -->
        <div class="kr-timeline-wrapper" aria-hidden="true">
          <div class="kr-timeline-track">
            <div class="kr-timeline-fill" id="kr-timeline-fill"></div>
          </div>
        </div>

        <div class="kr-hud-right">
          <div class="kr-counter">
            <span class="kr-num-current" id="kr-num-current">01</span>
            <span class="kr-num-sep">/</span>
            <span class="kr-num-total">06</span>
          </div>

          <!-- Quick Navigation Arrows -->
          <div class="kr-nav-arrows">
            <button type="button" class="kr-arrow-btn" id="kr-prev-btn" aria-label="Caso anterior">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button type="button" class="kr-arrow-btn" id="kr-next-btn" aria-label="Siguiente caso">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Horizontal Track -->
      <div class="kr-track-container" id="kr-track-container">
        <div class="kr-track" id="kr-track">

          <!-- 00. Cinematic Introductory Marquee Card -->
          <div class="kr-card kr-card-intro">
            <div class="kr-intro-inner">
              <span class="kr-category-badge" style="border-color: rgba(255,255,255,0.15); color: var(--sm-turquoise);">
                <span class="kr-badge-dot" style="background: var(--sm-turquoise);"></span>
                RESULTADOS COMPROBADOS
              </span>
              <h2 class="kr-intro-title">
                MARCAS<br>
                QUE DEJARON<br>
                <span class="kr-text-highlight">MARCA.</span>
              </h2>
              <p class="kr-intro-desc">
                Desliza para explorar la ejecución real de nuestras disciplinas maestras en proyectos de alto rendimiento comercial.
              </p>
              <div class="kr-scroll-indicator">
                <div class="kr-scroll-pill">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                  <span>DESLIZA HORIZONTALMENTE</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 01 -> 06. Monumental Panoramic Case Cards -->
          ${PROJECTS.map((p, idx) => {
            const accent = CATEGORY_ACCENTS[p.category] || CATEGORY_ACCENTS.branding;
            const cardNum = String(idx + 1).padStart(2, '0');
            return `
            <article class="kr-card kr-case-card kr-card-${idx}" id="kr-card-${idx}" data-index="${idx}">
              <div class="kr-card-media-wrap">
                <img src="${p.coverImage}" alt="${p.title}" loading="lazy" class="kr-card-media-img">
                <div class="kr-card-overlay"></div>
                <div class="kr-card-glow" style="background: radial-gradient(circle at 80% 20%, ${accent.glow}, transparent 60%);"></div>
              </div>

              <!-- Top Floating Meta Details -->
              <div class="kr-card-meta-top">
                <div class="kr-badge-group">
                  <span class="kr-category-badge" style="border-color: ${accent.color}44; color: ${accent.color};">
                    <span class="kr-badge-dot" style="background: ${accent.color};"></span>
                    ${accent.label}
                  </span>
                  <span class="kr-client-tag">${p.client} · ${p.location}</span>
                </div>
                <span class="kr-watermark-number">${cardNum}</span>
              </div>

              <!-- Bottom Content Details -->
              <div class="kr-card-content-bottom">
                <h3 class="kr-card-title">${p.title}</h3>
                <p class="kr-card-summary">${p.summary}</p>

                <!-- Floating Glassmorphic Metrics HUD -->
                <div class="kr-metrics-hud">
                  ${p.metrics.map(m => `
                    <div class="kr-metric-box">
                      <span class="kr-metric-value">${m.value}</span>
                      <span class="kr-metric-label">${m.label}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Footer Action Row -->
                <div class="kr-card-footer">
                  <div class="kr-tags-row">
                    ${p.tags.slice(0, 3).map(tag => `
                      <span class="kr-tag-chip">#${tag}</span>
                    `).join('')}
                  </div>

                  <a href="#/portafolio" class="kr-explore-btn" data-cursor="explore">
                    <span>Ver Caso Completo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>

              </div>
            </article>
            `;
          }).join('')}

          <!-- Final CTA Card -->
          <div class="kr-card kr-card-cta">
            <div class="kr-cta-inner">
              <span class="kr-category-badge" style="border-color: var(--sm-turquoise)44; color: var(--sm-turquoise);">
                <span class="kr-badge-dot" style="background: var(--sm-turquoise);"></span>
                TU MARCA AQUÍ
              </span>
              <h3 class="kr-cta-title">¿LISTO PARA CREAR EL PRÓXIMO CASO DE ÉXITO?</h3>
              <p class="kr-cta-desc">
                Diseñamos ecosistemas donde la identidad de marca, el código headless y la pauta publicitaria trabajan como un solo motor.
              </p>
              <button type="button" class="btn btn-primary btn-lg btn-glow" 
                      onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" 
                      data-cursor="cotizar">
                <span>Cotizar Proyecto Ahora</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
  `;
}

export function initKineticReelEvents() {
  const section = document.getElementById('kinetic-reel');
  const track = document.getElementById('kr-track');
  const progressBar = document.getElementById('kr-timeline-fill');
  const counterCurrent = document.getElementById('kr-num-current');
  const prevBtn = document.getElementById('kr-prev-btn');
  const nextBtn = document.getElementById('kr-next-btn');

  if (!section || !track) return;

  // Sound effects on case cards hover
  const caseCards = track.querySelectorAll('.kr-case-card');
  caseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      sounds.playHover();
    });
  });

  // Responsive GSAP Horizontal Scroll Pinning
  const mm = gsap.matchMedia();

  // Desktop & Large Tablets: High-End Scrubbed Horizontal Scroll via Sticky Viewport
  mm.add('(min-width: 900px)', () => {
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

    const horizontalTween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Smooth timeline fill update
          if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
          }

          // Active project counter update (01 -> 06)
          if (counterCurrent) {
            const activeIndex = Math.min(5, Math.floor(self.progress * 6));
            counterCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
          }
        }
      }
    });

    // Arrow Buttons Click-To-Scroll
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        sounds.playClick();
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const totalScrollable = section.offsetHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
        const newProgress = Math.max(0, currentProgress - 0.2);
        window.scrollTo({ top: sectionTop + totalScrollable * newProgress, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        sounds.playClick();
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const totalScrollable = section.offsetHeight - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
        const newProgress = Math.min(1, currentProgress + 0.2);
        window.scrollTo({ top: sectionTop + totalScrollable * newProgress, behavior: 'smooth' });
      });
    }

    return () => {
      horizontalTween.kill();
    };
  });

  // Mobile & Small Tablets: Native Smooth Swipe Carousel
  mm.add('(max-width: 899px)', () => {
    // When in mobile, enable touch scroll container
    const container = document.getElementById('kr-track-container');
    if (container) {
      container.addEventListener('scroll', () => {
        const scrollFraction = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        if (progressBar) {
          progressBar.style.width = `${Math.min(100, Math.max(0, scrollFraction * 100))}%`;
        }
        if (counterCurrent) {
          const activeIndex = Math.min(5, Math.floor(scrollFraction * 6));
          counterCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
        }
      }, { passive: true });
    }
  });

  ScrollTrigger.refresh();
}
