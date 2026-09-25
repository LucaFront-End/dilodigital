// ================================================================
// EL MÉTODO DILO — STEPPER DE PROCESO EN 4 PASOS
// Clean, Editorial & Scroll-Driven Methodology Section
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../utils/SoundEngine.js';

gsap.registerPlugin(ScrollTrigger);

const METHOD_STEPS = [
  {
    num: '01',
    phase: 'FASE 01 · DIAGNÓSTICO & BLINDAJE',
    title: 'Auditoría Profunda & Viabilidad Legal',
    tagline: 'Antes de construir, protegemos el terreno comercial.',
    desc: 'Analizamos la situación actual de tu modelo de negocio, tu competencia directa y la viabilidad legal de tu marca ante el IMPI. Definimos la estrategia de comunicación y los objetivos comerciales de corto y mediano plazo.',
    duration: 'Semana 1',
    deliverables: [
      'Búsqueda fonética y dictamen IMPI',
      'Benchmarking competitivo y buyer persona',
      'Roadmap estratégico de proyecto',
      'Definición de KPIs de negocio'
    ]
  },
  {
    num: '02',
    phase: 'FASE 02 · ARQUITECTURA & IDENTIDAD',
    title: 'Diseño de Marca & Prototipado UX/UI',
    tagline: 'Donde la estética premium se une con la alta conversión.',
    desc: 'Creamos el sistema visual que representará a tu marca (logotipo, tipografía, paleta cromática y manual corporativo) y prototipamos en Figma la arquitectura de interacción de tu sitio web o embudo publicitario a 60fps.',
    duration: 'Semanas 2 a 3',
    deliverables: [
      'Identidad visual completa y guías de uso',
      'Wireframes y prototipo interactivo en Figma',
      'Estructura de copy orientado a ventas',
      'Aprobación de dirección de arte'
    ]
  },
  {
    num: '03',
    phase: 'FASE 03 · INGENIERÍA & PRODUCCIÓN',
    title: 'Desarrollo Headless & Activos Cinemáticos',
    tagline: 'Código ultrarrápido y contenido de alto impacto visual.',
    desc: 'Traducimos el diseño a código limpio y ultrarrápido con arquitectura headless (0.8s de carga). Al mismo tiempo, producimos las piezas audiovisuales y el contenido con creadores UGC listos para pauta publicitaria.',
    duration: 'Semanas 3 a 4',
    deliverables: [
      'Sitio web responsive sub-segundo en Google PageSpeed',
      'Integración de pagos (Stripe/Mercado Pago) y CRM WhatsApp',
      'Assets audiovisuales 4K y banco de anuncios UGC',
      'Pruebas exhaustivas de rendimiento y QA'
    ]
  },
  {
    num: '04',
    phase: 'FASE 04 · DESPLIEGUE & ESCALA',
    title: 'Lanzamiento Oficial & Performance Continuo',
    tagline: 'El lanzamiento es solo el inicio del crecimiento.',
    desc: 'Publicamos la plataforma en producción, activamos las campañas de Meta y Google Ads optimizadas por ROAS y configuramos dashboards de Business Intelligence en Looker Studio para medir el retorno en tiempo real.',
    duration: 'Continuo / Mensual',
    deliverables: [
      'Puesta en marcha con monitoreo 24/7',
      'Estructura de pauta Full-Funnel activada',
      'Dashboard analítico en vivo y optimización semanal',
      'Sesión mensual de balance estratégico'
    ]
  }
];

export function renderMethodStepper() {
  return `
  <!-- ================================================================
       EL MÉTODO DILO — 4-STEP SCROLL-DRIVEN METHODOLOGY
       ================================================================ -->
  <section class="ms-section" id="metodo-dilo">
    <div class="ms-container">
      <div class="ms-layout">
        
        <!-- Left Column: Sticky Title & Vertical Progress Stepper -->
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
            De la idea inicial a la escala comercial en 4 fases claras, sin rodeos ni reuniones interminables.
          </p>

          <!-- Interactive Vertical Scrubber / Step Tracker -->
          <nav class="ms-tracker" id="ms-tracker" aria-label="Fases del Método Dilo">
            <div class="ms-tracker-line-bg"></div>
            <div class="ms-tracker-line-fill" id="ms-tracker-line-fill"></div>

            ${METHOD_STEPS.map((step, idx) => `
              <button type="button" class="ms-tracker-step ${idx === 0 ? 'is-active' : ''}" data-target-step="${idx}">
                <span class="ms-step-dot"></span>
                <span class="ms-step-num">${step.num}</span>
                <span class="ms-step-name">${step.title.split('&')[0].trim()}</span>
              </button>
            `).join('')}
          </nav>

          <!-- Quick CTA Button -->
          <div class="ms-sticky-cta">
            <button type="button" class="btn btn-primary btn-sm btn-glow" 
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

        <!-- Right Column: The 4 Method Step Cards -->
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

              <h3 class="ms-card-title">${step.title}</h3>
              <p class="ms-card-tagline">"${step.tagline}"</p>
              <p class="ms-card-desc">${step.desc}</p>

              <!-- Deliverables Checklist -->
              <div class="ms-deliverables-box">
                <div class="ms-deliverables-label">Entregables Clave de esta Fase:</div>
                <ul class="ms-deliverables-grid">
                  ${step.deliverables.map(item => `
                    <li class="ms-deliverable-item">
                      <span class="ms-deliverable-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
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

  if (!cards.length || !trackerSteps.length) return;

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

  // ScrollTrigger for each card to detect when it crosses viewport focal area
  cards.forEach((card, idx) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => setActiveStep(idx),
      onEnterBack: () => setActiveStep(idx)
    });
  });

  // Track overall scroll progress for continuous smooth scrubber line
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

  // Click on stepper dots to scroll smoothly to that card
  trackerSteps.forEach((stepBtn, idx) => {
    stepBtn.addEventListener('click', () => {
      sounds.playClick();
      const targetCard = document.getElementById(`ms-card-${idx}`);
      if (targetCard) {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elemRect = targetCard.getBoundingClientRect().top;
        const elemPosition = elemRect - bodyRect;
        const offsetPosition = elemPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}
