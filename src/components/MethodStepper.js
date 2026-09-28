// ================================================================
// EL MÉTODO DILO — SERVICES STACK (KNNEKT STUDIO / 21ST.DEV)
// Algorithmic Line Drawings + Dynamic Cross-Fading Backgrounds
// Tailored 100% to Dilo Digital Mexico Agency Deliverables
// ================================================================

import { SCENES, W, H, prog } from './ServicesStackScenes.js';

export const DILO_SERVICES = [
  {
    id: "legal",
    title: "01. Diagnóstico & Blindaje Legal IMPI",
    text: "Protegemos tu nombre, activos y modelo ante el IMPI antes de invertir capital. Búsqueda fonética express, dictamen jurídico y título oficial sin burocracia.",
    capabilities: [
      "Búsqueda Fonética IMPI",
      "Dictamen & Contratos",
      "Asignación de Marca (IP)",
      "Clasificación NIZA",
      "Expediente Oficial IMPI",
      "Título de Concesión ®"
    ],
  },
  {
    id: "growth",
    title: "02. Estrategia & Identidad Visual",
    text: "Construimos marcas memorables con posicionamiento claro en el mercado, diseño de logotipo, manual de identidad integral y validación comercial antes de programar.",
    capabilities: [
      "Posicionamiento",
      "Monograma & Logo",
      "Canales Digitales",
      "Diseño de Contenido",
      "Generación de Demanda",
      "Retención & Comunidad"
    ],
  },
  {
    id: "technology",
    title: "03. Ingeniería Web Headless",
    text: "Desarrollamos plataformas digitales ultrarrápidas con carga sub-segundo (< 0.8s), arquitectura headless, integración de pagos y analítica de alta conversión.",
    capabilities: [
      "Sitio Web Headless",
      "Arquitectura Mobile-First",
      "Ops Stack & Cloud",
      "Integraciones API",
      "Analítica & PageSpeed",
      "Carga Sub-Segundo (0.8s)"
    ],
  },
  {
    id: "ai",
    title: "04. Lanzamiento & Escala por ROAS",
    text: "Activamos sistemas de captación continua con pauta en Meta & Google Ads optimizada por ROAS y flujos automatizados de WhatsApp para escalar ventas.",
    capabilities: [
      "Campañas Meta & Google Ads",
      "Funnel de Conversión",
      "Calificación de Prospectos",
      "Automatización WhatsApp",
      "Dashboard de Métricas",
      "Escala por ROAS"
    ],
  }
];

export function renderMethodStepper() {
  return `
  <!-- ================================================================
       EL MÉTODO DILO — 4-STEP SERVICES STACK PIPELINE
       ================================================================ -->
  <section class="ss-root" id="metodo-dilo">
    <div class="ss-panels-wrapper">
      ${DILO_SERVICES.map((s, i) => `
        <div class="ss-panel" data-panel="${i}">
          <div class="ss-card-container" data-card="${i}">
            
            <!-- Mobile Eyebrow & Title -->
            <div class="ss-mobile-title">
              <span class="ss-mobile-eyebrow">Bajo el Método Dilo, ejecutamos</span>
              <h3 class="ss-mobile-heading">${s.title}</h3>
            </div>

            <!-- The Stacking White Canvas Card -->
            <article class="ss-card" data-service-id="${s.id}">
              
              <!-- Algorithmic Animated Vector Line Drawing -->
              <div class="ss-animation-box">
                <svg class="ss-svg" id="ss-svg-${s.id}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${s.title}">
                  <g class="ss-scene-draw" id="ss-draw-${s.id}"></g>
                  <text class="ss-step-caption" id="ss-caption-${s.id}" x="90" y="514"></text>
                </svg>
              </div>

              <!-- Card Content: Text & Active Capability Chips -->
              <div class="ss-card-content">
                <p class="ss-card-desc">${s.text}</p>
                
                <div class="ss-caps-header">
                  <span>Alcance de esta etapa</span>
                </div>

                <ul class="ss-caps-grid" aria-label="Capacidades de ${s.title}">
                  ${s.capabilities.map((c) => `
                    <li class="ss-cap-chip" data-cap="${c}">
                      <span class="ss-cap-dot"></span>
                      <span class="ss-cap-name">${c}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

            </article>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Sticky Backdrop: Left Titles + Film Grain + Dynamic Cross-Fading Backgrounds -->
    <div class="ss-sticky-backdrop" aria-hidden="true">
      <div class="ss-sticky-inner">
        
        <!-- Left Column Header: Sticks alongside stacking cards on desktop -->
        <div class="ss-left-col">
          <div class="ss-left-eyebrow-box">
            <span class="ss-left-dot"></span>
            <span class="ss-left-eyebrow">Bajo el Método Dilo, ejecutamos</span>
          </div>

          <div class="ss-left-titles-viewport">
            ${DILO_SERVICES.map((s, i) => `
              <div class="ss-left-title ${i === 0 ? 'is-active' : ''}" data-left-title="${i}">
                <h2>${s.title}</h2>
              </div>
            `).join('')}
          </div>

          <div class="ss-left-cta">
            <button type="button" class="ss-cta-btn" 
                    onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" 
                    data-cursor="cotizar">
              <span>Cotizar con este Método</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Film Grain Texture -->
        <div class="ss-grain"></div>

        <!-- Dynamic Liquid Mesh Auroras per Step (Stripe / Linear Luxury Glow) -->
        <div class="ss-bg-layer is-active" data-bg-index="0">
          <div class="ss-grid-matrix"></div>
          <div class="ss-aurora-orb orb-amber"></div>
          <div class="ss-aurora-orb orb-sapphire"></div>
          <div class="ss-aurora-orb orb-orange"></div>
        </div>
        <div class="ss-bg-layer" data-bg-index="1">
          <div class="ss-grid-matrix"></div>
          <div class="ss-aurora-orb orb-magenta"></div>
          <div class="ss-aurora-orb orb-dilo"></div>
          <div class="ss-aurora-orb orb-rose"></div>
        </div>
        <div class="ss-bg-layer" data-bg-index="2">
          <div class="ss-grid-matrix"></div>
          <div class="ss-aurora-orb orb-cyan"></div>
          <div class="ss-aurora-orb orb-cobalt"></div>
          <div class="ss-aurora-orb orb-emerald"></div>
        </div>
        <div class="ss-bg-layer" data-bg-index="3">
          <div class="ss-grid-matrix"></div>
          <div class="ss-aurora-orb orb-solar"></div>
          <div class="ss-aurora-orb orb-amber-gold"></div>
          <div class="ss-aurora-orb orb-crimson"></div>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function initMethodStepperEvents() {
  const root = document.getElementById('metodo-dilo');
  if (!root) return;

  const panels = Array.from(root.querySelectorAll('[data-panel]'));
  const cards = Array.from(root.querySelectorAll('[data-card]'));
  const leftTitles = Array.from(root.querySelectorAll('[data-left-title]'));
  const bgLayers = Array.from(root.querySelectorAll('[data-bg-index]'));

  // -------------------------------------------------------------
  // 1. STACKING CARDS SCROLL ENGINE & BACKGROUND CROSS-FADE
  // -------------------------------------------------------------
  let rafScroll = 0;

  const fitPanels = () => {
    const vh = window.innerHeight;
    panels.forEach((panel) => {
      // Keep panel reachable and centered
      panel.style.top = `${Math.min(0, vh - panel.offsetHeight)}px`;
    });
  };

  const updateScroll = () => {
    rafScroll = 0;
    const vh = window.innerHeight;
    let activeIdx = 0;

    panels.forEach((panel, i) => {
      const rect = panel.getBoundingClientRect();
      if (rect.top <= vh * 0.5) {
        activeIdx = i;
      }

      const next = panels[i + 1];
      const card = cards[i];
      if (!card) return;

      const covered = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
      card.style.opacity = String(Math.max(0, 1 - covered * 1.35));
      card.style.transform = `scale(${1 - covered * 0.055}) translateY(${-covered * 34}px)`;
    });

    // Update Left Titles
    leftTitles.forEach((tEl, i) => {
      tEl.classList.toggle('is-active', i === activeIdx);
    });

    // Update Cross-Fading Backgrounds per Step
    bgLayers.forEach((bg, i) => {
      bg.classList.toggle('is-active', i === activeIdx);
    });
  };

  const scheduleScroll = () => {
    if (!rafScroll) rafScroll = requestAnimationFrame(updateScroll);
  };

  fitPanels();
  updateScroll();
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => {
    fitPanels();
    scheduleScroll();
  });

  // -------------------------------------------------------------
  // 2. MATHEMATICAL SVG ANIMATION ENGINE
  // -------------------------------------------------------------
  const clocks = { legal: 0, growth: 0, technology: 0, ai: 0 };
  let isSectionVisible = false;
  let rafAnim = 0;
  let lastTime = 0;

  function tick(now) {
    if (!lastTime) lastTime = now;
    const delta = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    DILO_SERVICES.forEach((service) => {
      const scene = SCENES[service.id];
      if (!scene) return;

      clocks[service.id] = (clocks[service.id] + delta) % scene.loop;
      const t = clocks[service.id];

      const drawContainer = document.getElementById(`ss-draw-${service.id}`);
      if (drawContainer) {
        drawContainer.innerHTML = scene.draw(t);
      }

      // Find active step & capability
      const activeStep = scene.steps.find(([a, b]) => t >= a && t < b);
      const captionEl = document.getElementById(`ss-caption-${service.id}`);

      if (captionEl && activeStep) {
        const [a, b, name] = activeStep;
        const o = prog(t, a, a + 0.3) * (1 - prog(t, b - 0.3, b));
        captionEl.textContent = name;
        captionEl.style.opacity = o.toFixed(3);
        captionEl.setAttribute('y', (514 + (1 - o) * 8).toFixed(1));
      }

      // Light up matching capability chip
      const cardEl = root.querySelector(`[data-service-id="${service.id}"]`);
      if (cardEl) {
        const activeCap = activeStep ? activeStep[2] : null;
        const chips = cardEl.querySelectorAll('.ss-cap-chip');
        chips.forEach((chip) => {
          chip.classList.toggle('is-active', chip.getAttribute('data-cap') === activeCap);
        });
      }
    });

    if (isSectionVisible) {
      rafAnim = requestAnimationFrame(tick);
    }
  }

  // IntersectionObserver to only compute 60fps SVG when visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionVisible = entry.isIntersecting;
          cancelAnimationFrame(rafAnim);
          lastTime = 0;
          if (isSectionVisible) {
            rafAnim = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(root);
  } else {
    isSectionVisible = true;
    rafAnim = requestAnimationFrame(tick);
  }
}
