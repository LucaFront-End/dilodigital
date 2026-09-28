// ================================================================
// EL MÉTODO DILO — 4 PASOS MINIMALISTAS CON LOTTIES
// Clean, Editorial, Minimalist & Visual Process Pipeline
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web/build/player/lottie_light.js';

gsap.registerPlugin(ScrollTrigger);

const METHOD_STEPS = [
  {
    num: '01',
    phase: 'FASE 01',
    title: 'Diagnóstico & Blindaje',
    desc: 'Búsqueda fonética ante el IMPI y análisis de mercado para proteger tu marca antes de invertir.',
    duration: 'Semana 1',
    lottiePath: '/lotties/shield.json'
  },
  {
    num: '02',
    phase: 'FASE 02',
    title: 'Diseño & Identidad',
    desc: 'Diseño de identidad visual integral, manual de marca y prototipo interactivo en Figma.',
    duration: 'Semanas 2-3',
    lottiePath: '/lotties/branding.json'
  },
  {
    num: '03',
    phase: 'FASE 03',
    title: 'Desarrollo Headless',
    desc: 'Sitios web ultrarrápidos con carga sub-segundo, pasarelas de pago y arquitectura moderna.',
    duration: 'Semanas 3-4',
    lottiePath: '/lotties/web.json'
  },
  {
    num: '04',
    phase: 'FASE 04',
    title: 'Lanzamiento & Escala',
    desc: 'Campañas de Meta y Google Ads optimizadas por ROAS y analítica transparente en tiempo real.',
    duration: 'Continuo',
    lottiePath: '/lotties/rocket.json'
  }
];

export function renderMethodStepper() {
  return `
  <!-- ================================================================
       EL MÉTODO DILO — 4-STEP MINIMALIST & VISUAL PROCESS
       ================================================================ -->
  <section class="ms-section" id="metodo-dilo">
    <div class="ms-container">
      
      <!-- Section Header -->
      <header class="ms-header">
        <div class="ms-eyebrow-pill">
          <span class="ms-eyebrow-dot"></span>
          <span>Metodología Dilo · 4 Etapas</span>
        </div>
        <h2 class="ms-title">
          Del concepto a la escala en <span style="color: #FF5A1F;">4 pasos simples</span>
        </h2>
        <p class="ms-subtitle">
          Un proceso ágil, transparente y orientado a resultados, sin burocracia ni reuniones interminables.
        </p>
      </header>

      <!-- 4 Minimalist Visual Cards Grid with Connector Line -->
      <div class="ms-grid-wrapper">
        <div class="ms-steps-connector" aria-hidden="true"></div>

        <div class="ms-steps-grid">
          ${METHOD_STEPS.map((step, idx) => `
            <article class="ms-step-card" id="ms-step-card-${idx}">
              <div class="ms-step-top">
                <span class="ms-step-phase">${step.phase}</span>
                <span class="ms-step-duration">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  ${step.duration}
                </span>
              </div>

              <!-- Visual Lottie Stage -->
              <div class="ms-lottie-stage">
                <div class="ms-lottie-container" 
                     id="ms-lottie-container-${idx}" 
                     data-lottie-path="${step.lottiePath}"
                     aria-label="Animación del paso ${step.num}">
                </div>
              </div>

              <h3 class="ms-step-title">${step.title}</h3>
              <p class="ms-step-desc">${step.desc}</p>
            </article>
          `).join('')}
        </div>
      </div>

      <!-- Clean Micro-CTA -->
      <div class="ms-bottom-cta">
        <button type="button" class="ms-cta-btn" 
                onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" 
                data-cursor="hover">
          <span>Cotizar Mi Proyecto con el Método Dilo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

    </div>
  </section>
  `;
}

export function initMethodStepperEvents() {
  const containers = document.querySelectorAll('.ms-lottie-container');
  const animInstances = new Map();

  // Initialize Lottie animations with IntersectionObserver
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
              console.warn('[MethodStepper] Lottie error for', lottiePath, err);
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
    }, { threshold: 0.15 });

    containers.forEach((c) => observer.observe(c));
  } else {
    // Fallback
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
          console.warn('[MethodStepper] Fallback error', err);
        }
      }
    });
  }

  // Subtle GSAP entrance animation for the 4 step cards
  const cards = document.querySelectorAll('.ms-step-card');
  if (cards.length > 0) {
    gsap.from(cards, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#metodo-dilo',
        start: 'top 75%'
      }
    });
  }
}
