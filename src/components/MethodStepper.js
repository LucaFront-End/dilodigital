// ================================================================
// EL MÉTODO DILO — 4-STEP SCROLL-DRIVEN & VISUAL PROCESS PIPELINE
// Minimalist, Editorial, Interactive Stepper with Real Lotties
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web/build/player/lottie_svg.js';
import { sounds } from '../utils/SoundEngine.js';

gsap.registerPlugin(ScrollTrigger);

const METHOD_STEPS = [
  {
    num: '01',
    phase: 'FASE 01 · INVESTIGACIÓN & BLINDAJE',
    stepName: 'Diagnóstico',
    title: 'Diagnóstico & Blindaje Legal IMPI',
    desc: 'Búsqueda fonética exhaustiva en las 45 clases NIZA y análisis de viabilidad para garantizar que tu marca sea 100% registrable antes de invertir un solo peso.',
    duration: 'Semana 1',
    lottiePath: '/lotties/shield.json',
    chips: [
      'Búsqueda fonética express 24h',
      'Dictamen jurídico de viabilidad',
      'Ingreso oficial ante el IMPI'
    ]
  },
  {
    num: '02',
    phase: 'FASE 02 · DISEÑO & IDENTIDAD',
    stepName: 'Identidad',
    title: 'Identidad Visual & Prototipado',
    desc: 'Diseño de sistemas de identidad únicos, manual de marca y wireframes interactivos en Figma aprobados con tu equipo antes de escribir código.',
    duration: 'Semanas 2 a 3',
    lottiePath: '/lotties/branding.json',
    chips: [
      'Manual de identidad & tipografía',
      'Prototipo navegable en Figma',
      'Dirección de arte cinematográfica'
    ]
  },
  {
    num: '03',
    phase: 'FASE 03 · DESARROLLO HEADLESS',
    stepName: 'Desarrollo',
    title: 'Desarrollo Headless Ultrarrápido',
    desc: 'Ingeniería web moderna con arquitectura headless de carga inferior a 0.8s, pasarelas de pago Stripe / Mercado Pago y experiencia 100% responsiva.',
    duration: 'Semanas 3 a 4',
    lottiePath: '/lotties/web.json',
    chips: [
      'Carga sub-segundo (95+ PageSpeed)',
      'Integración Wix Headless & Pagos',
      'SEO técnico & microdatos schema'
    ]
  },
  {
    num: '04',
    phase: 'FASE 04 · LANZAMIENTO & ESCALA',
    stepName: 'Escala',
    title: 'Lanzamiento & Tracción Comercial',
    desc: 'Puesta en marcha con monitoreo en vivo, campañas de Meta y Google Ads optimizadas por ROAS y analítica transparente para escalar ventas.',
    duration: 'Continuo / Mensual',
    lottiePath: '/lotties/rocket.json',
    chips: [
      'Campañas de Ads por ROAS',
      'Dashboard analítico en vivo',
      'Optimización continua y soporte'
    ]
  }
];

export function renderMethodStepper() {
  return `
  <!-- ================================================================
       EL MÉTODO DILO — 4-STEP SCROLL-DRIVEN & VISUAL METHODOLOGY
       ================================================================ -->
  <section class="ms-section" id="metodo-dilo">
    <div class="ms-container">
      <div class="ms-layout">
        
        <!-- Left Column: Sticky Title & Interactive Vertical Scrubber -->
        <aside class="ms-sticky-col">
          <div class="ms-tag-wrap">
            <span class="ms-diamond-dot"></span>
            <span class="ms-tag-text">METODOLOGÍA PROBADA</span>
          </div>

          <h2 class="ms-title">
            EL MÉTODO<br>
            <span class="ms-title-accent">DILO.</span>
          </h2>

          <p class="ms-subtitle">
            De la idea inicial a la escala comercial en 4 fases claras, ágiles y orientadas a resultados tangibles.
          </p>

          <!-- Interactive Vertical Scrubber / Step Tracker -->
          <nav class="ms-tracker" id="ms-tracker" aria-label="Fases del Método Dilo">
            <div class="ms-tracker-line-bg"></div>
            <div class="ms-tracker-line-fill" id="ms-tracker-line-fill"></div>

            ${METHOD_STEPS.map((step, idx) => `
              <button type="button" class="ms-tracker-step ${idx === 0 ? 'is-active' : ''}" data-target-step="${idx}">
                <span class="ms-step-dot"></span>
                <span class="ms-step-num">${step.num}</span>
                <span class="ms-step-name">${step.stepName}</span>
              </button>
            `).join('')}
          </nav>

          <!-- Quick CTA Button -->
          <div class="ms-sticky-cta">
            <button type="button" class="ms-cta-button" 
                    onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" 
                    data-cursor="cotizar">
              <span>Cotizar Mi Proyecto</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </aside>

        <!-- Right Column: The 4 Step Cards with Real Lotties -->
        <div class="ms-cards-col" id="ms-cards-col">
          ${METHOD_STEPS.map((step, idx) => `
            <article class="ms-card ${idx === 0 ? 'is-active' : ''}" id="ms-card-${idx}" data-step-index="${idx}">
              <div class="ms-card-top">
                <div class="ms-card-badge-wrap">
                  <span class="ms-card-badge">${step.phase}</span>
                  <span class="ms-card-duration">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${step.duration}
                  </span>
                </div>
                <span class="ms-card-num-watermark">${step.num}</span>
              </div>

              <!-- Visual Lottie Animation Stage -->
              <div class="ms-card-lottie-stage">
                <div class="ms-lottie-player" 
                     id="ms-lottie-player-${idx}" 
                     data-lottie-path="${step.lottiePath}"
                     aria-label="Animación del paso ${step.num}">
                </div>
              </div>

              <h3 class="ms-card-title">${step.title}</h3>
              <p class="ms-card-desc">${step.desc}</p>

              <!-- Deliverables Checklist Chips -->
              <ul class="ms-card-chips">
                ${step.chips.map(chip => `
                  <li class="ms-card-chip">
                    <span class="ms-chip-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>${chip}</span>
                  </li>
                `).join('')}
              </ul>
            </article>
          `).join('')}
        </div>

      </div>
    </div>
  </section>
  `;
}

export function initMethodStepperEvents() {
  const cards = document.querySelectorAll('.ms-card');
  const trackerSteps = document.querySelectorAll('.ms-tracker-step');
  const lineFill = document.getElementById('ms-tracker-line-fill');
  const cardsCol = document.getElementById('ms-cards-col');
  const lottiePlayers = document.querySelectorAll('.ms-lottie-player');

  // 1. Initialize Lottie Animations safely
  const animInstances = new Map();

  function loadSingleLottie(el) {
    if (animInstances.has(el)) return;
    const lottiePath = el.getAttribute('data-lottie-path');
    if (!lottiePath) return;

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
      console.warn('[MethodStepper] Lottie animation error for', lottiePath, err);
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (!animInstances.has(el)) {
            loadSingleLottie(el);
          } else {
            animInstances.get(el)?.play();
          }
        } else {
          if (animInstances.has(el)) {
            animInstances.get(el)?.pause();
          }
        }
      });
    }, { threshold: 0.1 });

    lottiePlayers.forEach((lp) => observer.observe(lp));
  } else {
    // Fallback: load all immediately
    lottiePlayers.forEach((lp) => loadSingleLottie(lp));
  }

  // 2. Active Step Switcher
  function setActiveStep(activeIndex) {
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === activeIndex);
    });
    trackerSteps.forEach((step, i) => {
      step.classList.toggle('is-active', i === activeIndex);
    });

    if (lineFill && trackerSteps.length > 1) {
      const progressPercent = (activeIndex / (trackerSteps.length - 1)) * 100;
      lineFill.style.height = `${progressPercent}%`;
    }
  }

  // 3. ScrollTrigger for Each Card (Tracks viewport focus)
  if (cards.length > 0) {
    cards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx)
      });
    });
  }

  // 4. Smooth Scrubber Line Fill based on scroll position within cards column
  if (cardsCol && lineFill) {
    ScrollTrigger.create({
      trigger: cardsCol,
      start: 'top 60%',
      end: 'bottom 60%',
      onUpdate: (self) => {
        const pct = Math.min(100, Math.max(0, self.progress * 100));
        lineFill.style.height = `${pct}%`;
      }
    });
  }

  // 5. Interactive Click on Tracker Steps (Smooth scroll to targeted card)
  trackerSteps.forEach((stepBtn, idx) => {
    stepBtn.addEventListener('click', () => {
      try {
        sounds.playClick();
      } catch (e) {
        // sound engine safety
      }
      setActiveStep(idx);

      const targetCard = document.getElementById(`ms-card-${idx}`);
      if (targetCard) {
        const headerOffset = 130;
        const targetPos = targetCard.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Refresh ScrollTrigger after a short delay
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
}
