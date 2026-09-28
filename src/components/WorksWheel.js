// ================================================================
// WORKS WHEEL — PORTFOLIO 3D ROTATING DRUM & RING
// Mathematical 3D Cylindrical Drum + Concentric Closed Ring
// Tailored for Dilo Digital Mexico — Elite Awwwards Physics
// ================================================================

import { PROJECTS } from '../data/projects.js';
import { sounds } from '../utils/SoundEngine.js';

const CARD_H = 0.40;      // Front card height relative to stage
const CARD_MAX_W = 0.36;  // Max card width relative to stage
const CARD_RATIO = 1.45;  // Width / Height aspect ratio
const STEP = 40;          // Degrees between cards on the vertical drum
const DRUM = 2.22;        // Drum cylinder radius in card heights
const LENS = 2.7;         // Perspective distance in card heights
const RING_R = 1.14;      // Closed ring radius in card heights
const BOW = 1.82;         // Lateral arc curve radius (swings neighbors to the left)
const TITLE = 0.124;      // Title size ratio
const INDEX = 0.04;       // Index size ratio
const CULL = 1.6;         // Distance cutoff to cull distant cards
const WHEEL_UNITS = 900;  // Mouse wheel sensitivity
const DRAG_UNITS = 420;   // Pointer drag sensitivity
const SETTLE = 150;       // Quiet time before wheel snaps to nearest item
const EASE = 0.12;        // Interpolation smoothing factor

const CATEGORY_THEMES = {
  branding: { label: 'Branding & Identidad', color: '#FF5A1F', glow: 'rgba(255, 90, 31, 0.38)' },
  'web-ecommerce': { label: 'Wix Headless & 3D Web', color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.38)' },
  marketing: { label: 'Performance Ads & ROAS', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.38)' },
  seo: { label: 'SEO Técnico & GEO IA', color: '#10B981', glow: 'rgba(16, 185, 129, 0.38)' },
  produccion: { label: 'Producción Audiovisual 4K', color: '#A855F7', glow: 'rgba(168, 85, 247, 0.38)' },
  tecnologia: { label: 'Fintech & Headless CRM', color: '#3B82F6', glow: 'rgba(59, 130, 246, 0.38)' }
};

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

export function renderWorksWheel() {
  const items = PROJECTS.slice(0, 8);

  return `
  <!-- ================================================================
       WORKS WHEEL — 3D CYLINDRICAL DRUM & CONCENTRIC RING (PROYECTOS)
       ================================================================ -->
  <section class="ww-root" id="proyectos" aria-label="Casos Insignia Dilo Digital">
    
    <!-- Top HUD Navigation Bar -->
    <header class="ww-hud-bar">
      <div class="ww-hud-left">
        <span class="ww-rec-dot"></span>
        <span class="ww-hud-tag">CASOS INSIGNIA &middot; RUEDA 3D INTERACTIVA</span>
      </div>

      <!-- Quick Control Pill: Ring view, Prev/Next buttons -->
      <div class="ww-hud-controls">
        <button type="button" class="ww-btn-ring" id="ww-btn-ring" title="Ver en modo anillo cerrado">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="9"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>Modo Anillo</span>
        </button>

        <div class="ww-nav-arrows">
          <button type="button" class="ww-arrow-btn" id="ww-btn-prev" aria-label="Caso anterior" title="Anterior">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button type="button" class="ww-arrow-btn" id="ww-btn-next" aria-label="Siguiente caso" title="Siguiente">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div class="ww-hud-right">
        <div class="ww-counter">
          <span class="ww-counter-active" id="ww-counter-active">01</span>
          <span class="ww-counter-sep">/</span>
          <span class="ww-counter-total">${String(items.length).padStart(2, '0')}</span>
        </div>
        <a href="#/portafolio" class="ww-full-portfolio-btn" data-cursor="hover">
          <span>Ver Todo</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </header>

    <!-- 3D Interactive Stage Container -->
    <div class="ww-stage-wrapper">
      <div 
        class="ww-stage" 
        id="ww-stage" 
        tabindex="0" 
        role="region" 
        aria-label="Rueda interactiva de proyectos"
      >
        <!-- Dynamic Atmospheric Category Glow & Matrix Dots -->
        <div class="ww-ambient-glow" id="ww-ambient-glow"></div>
        <div class="ww-grid-matrix" aria-hidden="true"></div>

        <!-- 3D Preserved Plane Wheel -->
        <div class="ww-wheel" id="ww-wheel">
          ${items.map((p, i) => {
            const theme = CATEGORY_THEMES[p.category] || CATEGORY_THEMES.branding;
            const topMetric = p.metrics?.[0]?.value || 'Caso de Éxito';
            return `
            <article 
              class="ww-card" 
              data-wheel-card="${i}"
              id="ww-card-${i}"
              role="group"
              aria-label="${p.title}"
            >
              <div class="ww-card-face">
                <img 
                  src="${p.coverImage}" 
                  alt="${p.title}" 
                  class="ww-card-img" 
                  loading="lazy" 
                  draggable="false"
                />
                <div class="ww-card-overlay"></div>

                <!-- Top Header: Category badge & Verified metric -->
                <div class="ww-card-top-row">
                  <span class="ww-card-cat" style="border-color: ${theme.color}44; color: ${theme.color};">
                    <span class="ww-cat-dot" style="background: ${theme.color}; box-shadow: 0 0 6px ${theme.color};"></span>
                    ${p.categoryName}
                  </span>
                  <span class="ww-card-metric-pill">${topMetric}</span>
                </div>

                <!-- Bottom Footer: Project title, client, and action -->
                <div class="ww-card-bottom-row">
                  <div class="ww-card-info">
                    <span class="ww-card-client">${p.client} &middot; ${p.location}</span>
                    <h3 class="ww-card-title">${p.title}</h3>
                  </div>

                  <a 
                    href="#/portafolio?cat=${p.category}" 
                    class="ww-card-action-btn" 
                    data-cursor="explore"
                    aria-label="Explorar ${p.title}"
                  >
                    <span>Explorar</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            `;
          }).join('')}
        </div>

        <!-- Central Resting Disc (Visible when turn = 0 in ring mode) -->
        <div class="ww-ring-center" id="ww-ring-center" aria-hidden="true">
          <div class="ww-ring-disc">
            <div class="ww-ring-radar"></div>
            <span class="ww-ring-eyebrow">DILO DIGITAL &middot; PORTAFOLIO '26</span>
            <h2 class="ww-ring-title">CASOS INSIGNIA</h2>
            <div class="ww-ring-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8m-4-4l4 4 4-4"></path>
              </svg>
              <span>Gira la rueda o desliza para abrir</span>
            </div>
          </div>
        </div>

        <!-- Left HUD: Project Detailed Specs (Visible when drum is open m > 0) -->
        <div class="ww-front-hud" id="ww-front-hud">
          <div class="ww-hud-category-badge" id="ww-hud-cat">
            <span class="ww-hud-dot" id="ww-hud-dot"></span>
            <span id="ww-hud-cat-text">Branding &amp; Identidad</span>
          </div>

          <h2 class="ww-hud-title" id="ww-hud-title">${items[0]?.title || ''}</h2>

          <div class="ww-hud-metrics" id="ww-hud-metrics">
            <!-- Dynamic metric chips populated in JS -->
          </div>

          <p class="ww-hud-desc" id="ww-hud-desc">${items[0]?.summary || ''}</p>

          <div class="ww-hud-actions">
            <a href="#/portafolio" class="ww-cta-primary" id="ww-hud-link" data-cursor="explore">
              <span>Ver Caso en Portafolio</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <button 
              type="button" 
              class="ww-cta-secondary" 
              onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))"
              data-cursor="cotizar"
            >
              <span>Cotizar Proyecto Similar</span>
            </button>
          </div>
        </div>

        <!-- Right Index Column: Direct Access to any project -->
        <nav class="ww-index-nav" aria-label="Índice de proyectos">
          <ol class="ww-index-list">
            ${items.map((p, i) => `
              <li class="ww-index-item">
                <button 
                  type="button" 
                  class="ww-index-btn ${i === 0 ? 'is-active' : ''}" 
                  data-index-btn="${i}"
                  data-cursor="hover"
                >
                  <span class="ww-index-num">${String(i + 1).padStart(2, '0')}</span>
                  <span class="ww-index-name">${p.title.split(' ')[0]} ${p.title.split(' ')[1] || ''}</span>
                </button>
              </li>
            `).join('')}
          </ol>
        </nav>

        <!-- Bottom Gesture Drag Hint -->
        <div class="ww-bottom-hint" aria-hidden="true">
          <span class="ww-drag-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M18 11l-6-6-6 6"></path>
            </svg>
          </span>
          <span>Desliza arriba / abajo para girar el tambor</span>
        </div>

      </div>
    </div>
  </section>
  `;
}

export function initWorksWheelEvents() {
  const root = document.getElementById('proyectos');
  if (!root) return;

  const stageEl = document.getElementById('ww-stage');
  const wheelEl = document.getElementById('ww-wheel');
  const ringCenterEl = document.getElementById('ww-ring-center');
  const frontHudEl = document.getElementById('ww-front-hud');
  const ambientGlowEl = document.getElementById('ww-ambient-glow');
  const counterActiveEl = document.getElementById('ww-counter-active');
  const cardEls = Array.from(root.querySelectorAll('[data-wheel-card]'));
  const indexBtns = Array.from(root.querySelectorAll('[data-index-btn]'));

  // HUD Dynamic Fields
  const hudCatEl = document.getElementById('ww-hud-cat');
  const hudDotEl = document.getElementById('ww-hud-dot');
  const hudCatTextEl = document.getElementById('ww-hud-cat-text');
  const hudTitleEl = document.getElementById('ww-hud-title');
  const hudMetricsEl = document.getElementById('ww-hud-metrics');
  const hudDescEl = document.getElementById('ww-hud-desc');
  const hudLinkEl = document.getElementById('ww-hud-link');

  // Controls
  const btnRing = document.getElementById('ww-btn-ring');
  const btnPrev = document.getElementById('ww-btn-prev');
  const btnNext = document.getElementById('ww-btn-next');

  const items = PROJECTS.slice(0, 8);
  const count = items.length;
  const last = Math.max(count - 1, 0);

  // -------------------------------------------------------------
  // 1. STATE & METRICS
  // -------------------------------------------------------------
  let turn = 1; // Default to opening on Item 0 (turn = 1 is front card 0)
  let target = 1;
  let active = 0;
  let stageW = stageEl ? stageEl.clientWidth : 1200;
  let stageH = stageEl ? stageEl.clientHeight : 700;

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

  // ResizeObserver for ultra-responsive fluid geometry
  if (typeof ResizeObserver !== 'undefined' && stageEl) {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        stageW = entry.contentRect.width || stageEl.clientWidth;
        stageH = entry.contentRect.height || stageEl.clientHeight;
        metrics = calculateMetrics();
        if (stageEl) {
          stageEl.style.perspective = `${metrics.depth}px`;
        }
      }
    });
    ro.observe(stageEl);
  }

  if (stageEl) {
    stageEl.style.perspective = `${metrics.depth}px`;
  }

  // -------------------------------------------------------------
  // 2. HUD UPDATE HELPER
  // -------------------------------------------------------------
  function updateHUD(idx) {
    const p = items[idx];
    if (!p) return;

    const theme = CATEGORY_THEMES[p.category] || CATEGORY_THEMES.branding;

    if (counterActiveEl) {
      counterActiveEl.textContent = String(idx + 1).padStart(2, '0');
    }

    if (hudCatEl && hudDotEl && hudCatTextEl) {
      hudCatEl.style.borderColor = `${theme.color}44`;
      hudCatEl.style.color = theme.color;
      hudDotEl.style.background = theme.color;
      hudDotEl.style.boxShadow = `0 0 8px ${theme.color}`;
      hudCatTextEl.textContent = theme.label;
    }

    if (hudTitleEl) hudTitleEl.textContent = p.title;
    if (hudDescEl) hudDescEl.textContent = p.summary;
    if (hudLinkEl) hudLinkEl.href = `#/portafolio?cat=${p.category}`;

    if (hudMetricsEl) {
      hudMetricsEl.innerHTML = (p.metrics || []).slice(0, 3).map(m => `
        <div class="ww-metric-chip">
          <span class="ww-metric-val" style="color: ${theme.color};">${m.value}</span>
          <span class="ww-metric-lbl">${m.label}</span>
        </div>
      `).join('');
    }

    if (ambientGlowEl) {
      ambientGlowEl.style.background = `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 70%)`;
    }

    indexBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === idx);
    });
  }

  updateHUD(0);

  // -------------------------------------------------------------
  // 3. TARGET FUNCTION
  // -------------------------------------------------------------
  const to = (next) => {
    target = clamp(next, 0, last + 1);
  };

  // -------------------------------------------------------------
  // 4. ANIMATION LOOP (rAF)
  // -------------------------------------------------------------
  let rafId = 0;

  function draw() {
    rafId = requestAnimationFrame(draw);

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

    // Pull drum set-back so front face sits on focal picture plane
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

        // Cull distant cards to avoid vanishing point pileup
        card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1';
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));

        const face = card.firstElementChild;
        if (face) {
          face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
        }
      }
    }

    // Trade places: central ring disc fades out, left front HUD fades in
    if (ringCenterEl) {
      ringCenterEl.style.opacity = String(Math.max(0, 1 - m * 1.5));
      ringCenterEl.style.pointerEvents = m > 0.3 ? 'none' : 'auto';
      ringCenterEl.style.transform = `translate(-50%, -50%) scale(${lerp(1, 0.85, m)})`;
    }

    if (frontHudEl) {
      frontHudEl.style.opacity = String(clamp((m - 0.2) / 0.8, 0, 1));
      frontHudEl.style.pointerEvents = m < 0.4 ? 'none' : 'auto';
      frontHudEl.style.transform = `translateY(${lerp(24, 0, m)}px)`;
    }

    const near = clamp(Math.round(pos), 0, last);
    if (near !== active) {
      active = near;
      updateHUD(active);
      try { sounds.playTick(); } catch (_) {}
    }
  }

  rafId = requestAnimationFrame(draw);

  // -------------------------------------------------------------
  // 5. MOUSE WHEEL SCROLL EVENT LISTENER
  // -------------------------------------------------------------
  let settlingTimer = 0;

  const onWheel = (e) => {
    // Only intercept wheel if inside bounds to allow natural page scrolling at endpoints
    const next = target + e.deltaY / WHEEL_UNITS;
    if (next > 0 && next < last + 1) {
      e.preventDefault();
    }
    to(next);

    window.clearTimeout(settlingTimer);
    settlingTimer = window.setTimeout(() => {
      to(Math.round(target));
    }, SETTLE);
  };

  stageEl?.addEventListener('wheel', onWheel, { passive: false });

  // -------------------------------------------------------------
  // 6. POINTER DRAG & TOUCH GESTURES
  // -------------------------------------------------------------
  let dragStartY = null;

  stageEl?.addEventListener('pointerdown', (e) => {
    // Don't hijack clicks on buttons or links
    if (e.target.closest('button') || e.target.closest('a')) return;
    dragStartY = e.clientY;
    stageEl.setPointerCapture(e.pointerId);
  });

  stageEl?.addEventListener('pointermove', (e) => {
    if (dragStartY === null) return;
    const dy = dragStartY - e.clientY;
    to(target + dy / DRAG_UNITS);
    dragStartY = e.clientY;
  });

  const onPointerEnd = () => {
    dragStartY = null;
    if (target > 0.4) {
      to(Math.round(target));
    } else {
      to(0); // Snap back to ring
    }
  };

  stageEl?.addEventListener('pointerup', onPointerEnd);
  stageEl?.addEventListener('pointercancel', onPointerEnd);

  // -------------------------------------------------------------
  // 7. KEYBOARD NAVIGATION
  // -------------------------------------------------------------
  stageEl?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      to(Math.round(target) + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      to(Math.round(target) - 1);
    }
  });

  // -------------------------------------------------------------
  // 8. CONTROLS: BUTTONS & INDEX CLICKS
  // -------------------------------------------------------------
  btnRing?.addEventListener('click', () => {
    try { sounds.playClick(); } catch (_) {}
    to(0);
  });

  btnPrev?.addEventListener('click', () => {
    try { sounds.playClick(); } catch (_) {}
    if (target <= 1) {
      to(0);
    } else {
      to(Math.round(target) - 1);
    }
  });

  btnNext?.addEventListener('click', () => {
    try { sounds.playClick(); } catch (_) {}
    if (target < 1) {
      to(1);
    } else {
      to(Math.round(target) + 1);
    }
  });

  indexBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      try { sounds.playClick(); } catch (_) {}
      to(i + 1);
    });
  });

  // Clicking directly on central disc opens drum
  ringCenterEl?.addEventListener('click', () => {
    try { sounds.playClick(); } catch (_) {}
    to(1);
  });

  // Clicking on any card in the drum or ring turns to it
  cardEls.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      // If user clicked the explore link, allow navigation
      if (e.target.closest('a')) return;
      if (target === 0 || Math.round(target) !== i + 1) {
        e.preventDefault();
        try { sounds.playClick(); } catch (_) {}
        to(i + 1);
      }
    });
  });
}
