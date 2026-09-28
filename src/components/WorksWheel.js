// ================================================================
// WORKS WHEEL (CRAFTERUI / 21ST.DEV) — DILO LIGHT EDITION
// Pure 1:1 Architecture with Tuned Full-Viewport Geometry,
// Silky Smooth Physics, Minimalist Interactive Project Details
// ================================================================

import { PROJECTS } from '../data/projects.js';

/* Tuned Geometry: Perfectly fitted to viewport so top & bottom cards NEVER clip */
const CARD_H = 0.28;      // 28% of stage height (leaves 45-60px margin top & bottom)
const CARD_MAX_W = 0.29;  // Never wider than 29% of stage width
const CARD_RATIO = 1.45;  // Width / Height ratio
const STEP = 40;          // Degrees between cards on the drum
const DRUM = 2.22;        // Drum radius in card heights
const LENS = 2.7;         // Perspective distance
const RING_R = 1.05;      // Ring radius tuned for perfect non-clipping diameter
const BOW = 1.82;         // Lateral arc curve
const CULL = 1.6;         // Distance cutoff

/* Buttery smooth physics */
const WHEEL_UNITS = 1300; // Refined wheel sensitivity for silky navigation
const DRAG_UNITS = 450;   // Smooth pointer drag
const SETTLE = 180;       // Quiet time before settling onto integer card
const EASE = 0.085;       // Liquid inertia easing (soft glide)

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (deg) => (deg * Math.PI) / 180;

const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export const DILO_WORKS = PROJECTS.slice(0, 8).map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  categoryName: p.categoryName || 'Caso Insignia',
  client: p.client || 'Cliente Dilo',
  location: p.location || 'México',
  image: p.coverImage,
  metricVal: p.metrics?.[0]?.value || '+100%',
  metricLbl: p.metrics?.[0]?.label || 'Impacto Comprobado',
  href: `#/portafolio?cat=${p.category}`
}));

export function renderWorksWheel(label = "Casos '26", action = "Ver Caso") {
  return `
  <!-- ================================================================
       WORKS WHEEL — DILO LIGHT CANVAS EDITION (NON-CLIPPING & SMOOTH)
       ================================================================ -->
  <section 
    class="ww-root" 
    id="proyectos" 
    aria-label="${label}"
  >
    <!-- Soft Ambient Light Glow & Subtle Grid Matrix -->
    <div class="ww-ambient-light" aria-hidden="true"></div>
    <div class="ww-grid-matrix" aria-hidden="true"></div>

    <div 
      class="ww-stage" 
      id="ww-stage" 
      tabindex="0" 
      role="listbox" 
      aria-label="${label}"
      aria-activedescendant="works-wheel-0"
    >
      <div 
        class="ww-wheel" 
        id="ww-wheel"
      >
        ${DILO_WORKS.map((item, i) => `
          <a 
            id="works-wheel-${i}" 
            role="option" 
            aria-selected="${i === 0}" 
            href="${item.href}" 
            class="ww-card group" 
            data-wheel-card="${i}"
          >
            <span class="ww-card-face">
              <img 
                src="${item.image}" 
                alt="${item.title}" 
                draggable="false" 
                class="ww-card-img" 
              />
              <div class="ww-card-scrim"></div>

              <!-- Minimalist Interactive Meta Pill: Client & Metric -->
              <div class="ww-card-meta">
                <span class="ww-card-client">${item.client}</span>
                <span class="ww-card-metric-badge">${item.metricVal}</span>
              </div>

              <!-- Action Hover Affordance -->
              ${action ? `
                <span class="ww-card-action">
                  <svg viewBox="0 0 12 12" class="ww-action-svg" aria-hidden="true">
                    <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span>${action}</span>
                </span>
              ` : ''}
            </span>
          </a>
        `).join('')}
      </div>
    </div>

    <!-- Ring Center Title (At rest, scales gently down as m -> 1) -->
    <div 
      class="ww-ring-label" 
      id="ww-ring-label"
    >
      <span class="ww-ring-text">${label}</span>
      <span class="ww-ring-sub">Portafolio Seleccionado</span>
    </div>

    <!-- Front Card Details on Left (Fades in as drum opens m -> 1) -->
    <div 
      class="ww-front-details" 
      id="ww-front-details"
    >
      <div class="ww-front-eyebrow">
        <span class="ww-eyebrow-dot"></span>
        <span id="ww-front-cat">${DILO_WORKS[0]?.categoryName}</span>
      </div>

      <h2 
        class="ww-front-title" 
        id="ww-front-title"
      >
        ${DILO_WORKS[0]?.title || ''}
      </h2>

      <!-- Minimalist Impact Metric Badge -->
      <div class="ww-front-metric">
        <span class="ww-metric-value" id="ww-front-metric-val">${DILO_WORKS[0]?.metricVal}</span>
        <span class="ww-metric-label" id="ww-front-metric-lbl">${DILO_WORKS[0]?.metricLbl}</span>
      </div>

      <a href="${DILO_WORKS[0]?.href}" class="ww-front-link" id="ww-front-link" data-cursor="explore">
        <span>Explorar caso de estudio</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>

    <!-- Right-Hand Clean Index List -->
    <ol class="ww-index-list" id="ww-index-list">
      ${DILO_WORKS.map((item, i) => `
        <li key="${item.title}">
          <button 
            type="button" 
            class="ww-index-btn ${i === 0 ? 'is-active' : ''}" 
            data-index="${i}"
          >
            <span class="ww-index-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="ww-index-name">${item.title}</span>
          </button>
        </li>
      `).join('')}
    </ol>
  </section>
  `;
}

export function initWorksWheelEvents() {
  const root = document.getElementById('proyectos');
  if (!root) return;

  const stageEl = document.getElementById('ww-stage');
  const wheelEl = document.getElementById('ww-wheel');
  const labelEl = document.getElementById('ww-ring-label');
  const frontDetailsEl = document.getElementById('ww-front-details');
  const titleEl = document.getElementById('ww-front-title');
  const catEl = document.getElementById('ww-front-cat');
  const metricValEl = document.getElementById('ww-front-metric-val');
  const metricLblEl = document.getElementById('ww-front-metric-lbl');
  const linkEl = document.getElementById('ww-front-link');
  const cardEls = Array.from(root.querySelectorAll('[data-wheel-card]'));
  const indexBtns = Array.from(root.querySelectorAll('[data-index]'));

  const items = DILO_WORKS;
  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Wheel position & target
  let turn = 0;
  let target = 0;
  let active = 0;
  let stageW = stageEl ? stageEl.clientWidth : 0;
  let stageH = stageEl ? stageEl.clientHeight : 0;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function calculateMetrics() {
    const cardW = Math.min(stageH * CARD_H * CARD_RATIO, stageW * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.85) / (cardW || 1), 0.2, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
    };
  }

  let metrics = calculateMetrics();

  function applyStageSizing() {
    if (!stageEl) return;
    stageW = stageEl.clientWidth;
    stageH = stageEl.clientHeight;
    metrics = calculateMetrics();

    stageEl.style.perspective = `${metrics.depth}px`;
  }

  applyStageSizing();

  if (typeof ResizeObserver !== 'undefined' && stageEl) {
    const ro = new ResizeObserver(() => {
      applyStageSizing();
    });
    ro.observe(stageEl);
  }

  const to = (next) => {
    target = clamp(next, 0, last + 1);
  };

  // rAF Draw loop (Fluid 60/120fps with EASE = 0.085)
  let rafId = 0;

  function draw() {
    rafId = requestAnimationFrame(draw);

    if (!stageH) return;

    const gap = target - turn;
    if (Math.abs(gap) < 0.0004) {
      turn = target;
    } else {
      turn += gap * (reducedMotion ? 1 : EASE);
    }

    const t = turn;
    const m = clamp(t, 0, 1);
    const pos = Math.max(0, t - 1);

    const { cardW, cardH, ringR, ringScale, drumR, bow } = metrics;

    if (wheelEl) {
      wheelEl.style.transform = `translateZ(${-m * drumR}px)`;
    }

    for (let i = 0; i < count; i++) {
      const d = i - pos;
      const drumDeg = d * STEP;
      const card = cardEls[i];
      if (card) {
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.marginLeft = `${-cardW / 2}px`;
        card.style.marginTop = `${-cardH / 2}px`;

        card.style.transform = place(
          d * (360 / count),
          drumDeg,
          ringR,
          drumR,
          bow,
          m
        );
        card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1';
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        card.setAttribute('aria-selected', String(i === active));
      }

      const face = card ? card.firstElementChild : null;
      if (face) {
        face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }
    }

    // Smooth cross-fade between center ring label and left front details
    if (labelEl) {
      labelEl.style.opacity = String(Math.max(0, 1 - m * 1.4));
      labelEl.style.transform = `translate(-50%, -50%) scale(${lerp(1, 0.9, m)})`;
      labelEl.style.pointerEvents = m > 0.3 ? 'none' : 'auto';
    }

    if (frontDetailsEl) {
      frontDetailsEl.style.opacity = String(clamp((m - 0.2) / 0.75, 0, 1));
      frontDetailsEl.style.transform = `translateY(${lerp(18, 0, m)}px)`;
      frontDetailsEl.style.pointerEvents = m < 0.4 ? 'none' : 'auto';
    }

    const near = clamp(Math.round(pos), 0, last);
    if (near !== active) {
      active = near;
      const item = items[active];
      if (item) {
        if (titleEl) titleEl.textContent = item.title;
        if (catEl) catEl.textContent = item.categoryName;
        if (metricValEl) metricValEl.textContent = item.metricVal;
        if (metricLblEl) metricLblEl.textContent = item.metricLbl;
        if (linkEl) linkEl.href = item.href;
      }
      indexBtns.forEach((btn, idx) => {
        btn.classList.toggle('is-active', idx === active);
      });
      stageEl?.setAttribute('aria-activedescendant', `works-wheel-${active}`);
    }
  }

  rafId = requestAnimationFrame(draw);

  // Silky smooth mouse wheel listener
  let settlingTimer = 0;

  const onWheel = (event) => {
    const next = target + event.deltaY / WHEEL_UNITS;
    if (next > 0 && next < last + 1) {
      event.preventDefault();
    }
    to(next);

    window.clearTimeout(settlingTimer);
    settlingTimer = window.setTimeout(() => {
      to(Math.round(target));
    }, SETTLE);
  };

  stageEl?.addEventListener('wheel', onWheel, { passive: false });

  // Tactile pointer drag gestures
  let drag = null;

  stageEl?.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button') || event.target.closest('a')) return;
    drag = event.clientY;
    stageEl.setPointerCapture(event.pointerId);
  });

  stageEl?.addEventListener('pointermove', (event) => {
    if (drag === null) return;
    to(target + (drag - event.clientY) / DRAG_UNITS);
    drag = event.clientY;
  });

  const onPointerUp = () => {
    drag = null;
    if (target > 0.45) {
      to(Math.round(target));
    } else {
      to(0); // Snap back to ring
    }
  };

  stageEl?.addEventListener('pointerup', onPointerUp);
  stageEl?.addEventListener('pointercancel', onPointerUp);

  // Keyboard navigation
  stageEl?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      to(Math.round(target) + 1);
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      to(Math.round(target) - 1);
      event.preventDefault();
    }
  });

  // Clicking right-hand index items
  indexBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      to(i + 1);
    });
  });

  // Clicking center ring label opens drum to item 0
  labelEl?.addEventListener('click', () => {
    to(1);
  });

  // Clicking card
  cardEls.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.ww-card-action')) return; // allow link navigation
      if (target === 0 || Math.round(target) !== i + 1) {
        e.preventDefault();
        to(i + 1);
      }
    });
  });
}
