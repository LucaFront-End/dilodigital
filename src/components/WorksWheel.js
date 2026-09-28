// ================================================================
// WORKS WHEEL (CRAFTERUI / 21ST.DEV)
// Pure 1:1 Implementation of the WorksWheel Component
// Tailored only with Dilo typography (Syne / Plus Jakarta Sans) & colors
// ================================================================

import { PROJECTS } from '../data/projects.js';

/* Geometry matching the original works-wheel */
const CARD_H = 0.38;     // front card height, of the stage
const CARD_MAX_W = 0.34; // never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40;         // degrees between cards on the drum
const DRUM = 2.22;       // drum radius, in card heights
const LENS = 2.7;        // perspective distance
const RING_R = 1.14;     // ring radius
const BOW = 1.82;        // arc's radius for the side-on wheel curve
const TITLE = 0.124;     // ring label and front-card title
const INDEX = 0.04;      // index down the right-hand side
const CULL = 1.6;        // culling distance
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

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

export const DILO_WORKS = PROJECTS.slice(0, 8).map(p => ({
  title: p.title,
  image: p.coverImage,
  href: `#/portafolio?cat=${p.category}`
}));

export function renderWorksWheel(label = "Casos '26", action = "Ver Caso") {
  return `
  <!-- ================================================================
       WORKS WHEEL — PURE 1:1 REPLICATION FOR DILO DIGITAL
       ================================================================ -->
  <section 
    class="ww-root" 
    id="proyectos" 
    aria-label="${label}"
  >
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
              ${action ? `
                <span class="ww-card-action">
                  <svg viewBox="0 0 12 12" class="ww-action-svg" aria-hidden="true">
                    <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  ${action}
                </span>
              ` : ''}
            </span>
          </a>
        `).join('')}
      </div>
    </div>

    <!-- Ring title and front-card title trade places across transition -->
    <div 
      class="ww-ring-label" 
      id="ww-ring-label"
    >
      ${label}
    </div>

    <div 
      class="ww-front-title" 
      id="ww-front-title"
    >
      ${DILO_WORKS[0]?.title || ''}
    </div>

    <ol class="ww-index-list" id="ww-index-list">
      ${DILO_WORKS.map((item, i) => `
        <li key="${item.title}">
          <button 
            type="button" 
            class="ww-index-btn ${i === 0 ? 'is-active' : ''}" 
            data-index="${i}"
          >
            ${item.title}
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
  const titleEl = document.getElementById('ww-front-title');
  const cardEls = Array.from(root.querySelectorAll('[data-wheel-card]'));
  const indexBtns = Array.from(root.querySelectorAll('[data-index]'));

  const items = DILO_WORKS;
  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Wheel's position and target
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
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }

  let metrics = calculateMetrics();

  function applyStageSizing() {
    if (!stageEl) return;
    stageW = stageEl.clientWidth;
    stageH = stageEl.clientHeight;
    metrics = calculateMetrics();

    stageEl.style.perspective = `${metrics.depth}px`;
    if (labelEl) labelEl.style.fontSize = `${metrics.title}px`;
    if (titleEl) titleEl.style.fontSize = `${metrics.title}px`;
    const indexList = document.getElementById('ww-index-list');
    if (indexList) indexList.style.fontSize = `${metrics.index}px`;
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

  // rAF Draw loop (exactly like React useEffect in works-wheel.tsx)
  let rafId = 0;

  function draw() {
    rafId = requestAnimationFrame(draw);

    if (!stageH) return;

    const gap = target - turn;
    if (Math.abs(gap) < 0.0005) {
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

    if (labelEl) labelEl.style.opacity = String(1 - m);
    if (titleEl) titleEl.style.opacity = String(m);

    const near = clamp(Math.round(pos), 0, last);
    if (near !== active) {
      active = near;
      if (titleEl && items[active]) {
        titleEl.textContent = items[active].title;
      }
      indexBtns.forEach((btn, idx) => {
        btn.classList.toggle('is-active', idx === active);
      });
      stageEl?.setAttribute('aria-activedescendant', `works-wheel-${active}`);
    }
  }

  rafId = requestAnimationFrame(draw);

  // Wheel listener
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

  // Pointer drag gestures
  let drag = null;

  stageEl?.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
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
    if (target > 1) {
      to(Math.round(target));
    }
  };

  stageEl?.addEventListener('pointerup', onPointerUp);
  stageEl?.addEventListener('pointercancel', onPointerUp);

  // Key navigation
  stageEl?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      to(Math.round(target) + 1);
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      to(Math.round(target) - 1);
      event.preventDefault();
    }
  });

  // Index buttons
  indexBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      to(i + 1);
    });
  });
}
