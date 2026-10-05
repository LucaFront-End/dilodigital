// ================================================================
// DILO DIGITAL — ULTRA-CLEAN TRANSPARENT VECTOR ANIMATIONS
// Minimalist, Background-Free, 60fps Vector SVG Motion (Lottie / Lordicon style)
// ================================================================

import gsap from 'gsap';
import { Application } from '@splinetool/runtime';
import { CATEGORIES } from '../data/categories.js';

const SPLINE_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

export function renderCategoryHeroAnimation(categoryId = 'branding') {
  const cat = (categoryId || '').toLowerCase();

  // 1. MARKETING DIGITAL & PERFORMANCE: GRÁFICO CRECIENDO (GROWING CHART)
  if (cat.includes('market') || cat.includes('pauta')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia de Gráfico Creciendo y ROAS">
        <div class="clean-chart-stage">
          <svg class="clean-chart-svg" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chartGradMkt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.28" />
                <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Minimalist Chart Grid Guides -->
            <line x1="30" y1="40" x2="350" y2="40" stroke="#E2E8F0" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="30" y1="100" x2="350" y2="100" stroke="#E2E8F0" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="30" y1="160" x2="350" y2="160" stroke="#E2E8F0" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="30" y1="210" x2="350" y2="210" stroke="#CBD5E1" stroke-width="1.5" />

            <!-- Rising Bar Columns Behind Line -->
            <rect class="clean-bar-col" x="65" y="140" width="22" height="70" rx="6" fill="rgba(16, 185, 129, 0.15)" />
            <rect class="clean-bar-col" x="125" y="115" width="22" height="95" rx="6" fill="rgba(16, 185, 129, 0.22)" />
            <rect class="clean-bar-col" x="185" y="85" width="22" height="125" rx="6" fill="rgba(16, 185, 129, 0.28)" />
            <rect class="clean-bar-col" x="245" y="65" width="22" height="145" rx="6" fill="rgba(16, 185, 129, 0.35)" />
            <rect class="clean-bar-col" x="305" y="38" width="22" height="172" rx="6" fill="rgba(16, 185, 129, 0.45)" />

            <!-- Area Fill Under Curve -->
            <path class="clean-chart-area" d="M 30,210 L 40,190 Q 110,180 160,120 T 260,75 T 350,35 L 350,210 Z" fill="url(#chartGradMkt)" />

            <!-- Smooth Growth Line -->
            <path class="clean-chart-line" d="M 30,195 Q 110,180 160,120 T 260,75 T 350,35" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

            <!-- High Point Pulse Dot -->
            <circle class="clean-peak-dot" cx="350" cy="35" r="6" fill="#10B981" />
            <circle cx="350" cy="35" r="3" fill="#FFFFFF" />
          </svg>

          <!-- Floating High-ROAS Pill -->
          <div class="clean-chart-badge">
            <span class="clean-chart-pill-arrow">↑</span>
            <span>+184% ROAS &middot; Meta & Google</span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. SEO & POSICIONAMIENTO: BUSCADOR & RANKING SUBIENDO (SEARCH & #1 RANK)
  if (cat.includes('seo') || cat.includes('posicion')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia de Búsqueda SEO y Posicionamiento #1">
        <div class="clean-seo-stage">
          <!-- Minimalist Search Query Bar -->
          <div class="clean-seo-searchbar">
            <svg class="clean-seo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <div class="clean-seo-query">
              <span>agencia marketing y branding</span>
              <span class="clean-seo-cursor"></span>
            </div>
          </div>

          <!-- SEO Ranking Stack -->
          <div class="clean-seo-results-stack">
            <!-- Rank #1 Winner Card -->
            <div class="clean-seo-card-1">
              <div>
                <div class="clean-seo-card-title">Dilo Digital &middot; Agencia Oficial</div>
                <div class="clean-seo-card-url">https://dilodigital.com &middot; Top Tier</div>
              </div>
              <div class="clean-seo-rank-badge">
                <span>★ #1 Posición Orgánica</span>
              </div>
            </div>

            <!-- Faded Secondary Result -->
            <div class="clean-seo-card-2">
              <div>
                <div style="font-size: 0.78rem; font-weight: 600; color: #64748B;">Competidor Tradicional</div>
                <div style="font-size: 0.7rem; color: #94A3B8;">posicion-secundaria.com</div>
              </div>
              <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">#2</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. BRANDING & DISEÑO: BEZIER PEN TOOL & COMPASS SKETCHING
  if (cat.includes('brand') || cat.includes('diseno')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia de Trazo Vectorial y Branding">
        <div class="clean-brand-stage">
          <svg class="clean-brand-svg" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Golden Ratio Geometry Guides -->
            <circle cx="160" cy="120" r="80" stroke="rgba(255, 90, 31, 0.18)" stroke-dasharray="3 4" stroke-width="1.5" />
            <circle cx="160" cy="120" r="48" stroke="rgba(255, 90, 31, 0.25)" stroke-dasharray="2 3" stroke-width="1" />
            <line x1="80" y1="120" x2="240" y2="120" stroke="rgba(203, 213, 225, 0.6)" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="160" y1="40" x2="160" y2="200" stroke="rgba(203, 213, 225, 0.6)" stroke-dasharray="4 4" stroke-width="1" />

            <!-- Smooth Dynamic Vector Curve Drawing -->
            <path class="clean-bezier-curve" d="M 50,180 C 100,30 220,210 270,60" stroke="#FF5A1F" stroke-width="3.5" stroke-linecap="round" fill="none" />

            <!-- Vector Nodes -->
            <circle cx="50" cy="180" r="4" fill="#FF5A1F" />
            <circle cx="270" cy="60" r="4" fill="#FF5A1F" />
            <rect x="156" y="116" width="8" height="8" fill="#141718" rx="1.5" />
          </svg>

          <!-- Floating Minimalist Monogram Badge -->
          <div class="clean-brand-logo-mark">D</div>
        </div>
      </div>
    `;
  }

  // 4. DESARROLLO WEB & E-COMMERCE: CLEAN BROWSER WIREFRAME & SPEED
  if (cat.includes('web') || cat.includes('desarrollo') || cat.includes('code') || cat.includes('tienda')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia de Desarrollo Web y Velocidad">
        <div class="clean-web-stage">
          <div class="clean-web-browser">
            <div class="clean-browser-topbar">
              <span class="clean-browser-dot" style="background: #EF4444;"></span>
              <span class="clean-browser-dot" style="background: #F59E0B;"></span>
              <span class="clean-browser-dot" style="background: #10B981;"></span>
              <div class="clean-browser-url"></div>
            </div>
            <div class="clean-web-blocks-grid">
              <div class="clean-web-block is-featured"></div>
              <div class="clean-web-block"></div>
              <div class="clean-web-block"></div>
              <div class="clean-web-block is-featured"></div>
            </div>
          </div>

          <div class="clean-web-speed-badge">
            <span>⚡ 0.8s Carga Ultrarrápida</span>
          </div>
        </div>
      </div>
    `;
  }

  // 5. PRODUCCIÓN AUDIOVISUAL: CLEAN SOUND WAVE & PLAY
  if (cat.includes('audio') || cat.includes('video') || cat.includes('produccion')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia Audiovisual y Sonido">
        <div class="clean-av-stage">
          <div class="clean-av-disc">
            <div class="clean-av-play-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>

          <div class="clean-av-waves-flex">
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
            <div class="clean-av-bar"></div>
          </div>

          <div class="clean-av-time-tag">4K 60FPS &middot; MASTER AUDIO</div>
        </div>
      </div>
    `;
  }

  // 6. TECNOLOGÍA & IA: CLEAN NEURAL CONNECTIONS & AUTOMATION
  if (cat.includes('tecno') || cat.includes('ia') || cat.includes('intel')) {
    return `
      <div class="cat-anim-container" aria-label="Animación limpia de Conexiones Neurales e IA">
        <div class="clean-ia-stage">
          <svg class="clean-ia-svg" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Connection Lines -->
            <line x1="50" y1="60" x2="140" y2="100" stroke="#BAE6FD" stroke-width="2" />
            <line x1="50" y1="140" x2="140" y2="100" stroke="#BAE6FD" stroke-width="2" />
            <line x1="140" y1="100" x2="230" y2="60" stroke="#BAE6FD" stroke-width="2" />
            <line x1="140" y1="100" x2="230" y2="140" stroke="#BAE6FD" stroke-width="2" />

            <!-- Moving Pulsing Packet -->
            <circle class="clean-pulse-packet" cx="0" cy="0" r="5" fill="#0284C7" />

            <!-- Core Nodes -->
            <circle cx="50" cy="60" r="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
            <circle cx="50" cy="140" r="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
            <circle cx="140" cy="100" r="14" fill="#0284C7" stroke="#38BDF8" stroke-width="3" />
            <circle cx="230" cy="60" r="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
            <circle cx="230" cy="140" r="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
          </svg>

          <div class="clean-ia-badge">⚡ Multi-Agentes &amp; CRM 24/7</div>
        </div>
      </div>
    `;
  }

  // 7. DEFAULT FALLBACK: CLEAN ISOMETRIC WIREFRAME
  return `
    <div class="cat-anim-container" aria-label="Animación limpia isométrica">
      <div class="clean-iso-stage">
        <svg class="clean-iso-svg" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="clean-iso-path" d="M 120,40 L 200,80 L 120,120 L 40,80 Z" stroke="#FF5A1F" stroke-width="2.5" fill="none" />
          <path class="clean-iso-path" d="M 40,80 L 40,140 L 120,180 L 120,120 Z" stroke="#FF5A1F" stroke-width="2.5" fill="rgba(255, 90, 31, 0.08)" />
          <path class="clean-iso-path" d="M 200,80 L 200,140 L 120,180 L 120,120 Z" stroke="#FF5A1F" stroke-width="2.5" fill="rgba(255, 90, 31, 0.15)" />
        </svg>
        <div class="clean-iso-badge">Vector Spatial &middot; 3D</div>
      </div>
    </div>
  `;
}

// ================================================================
// STICKY CATEGORY SWITCHER RIBBON
// ================================================================

export function renderCategoryNavStrip(activeCategoryId = 'branding') {
  return `
    <nav class="cat-nav-strip" aria-label="Navegación de categorías">
      <div class="cat-nav-container">
        ${CATEGORIES.map(c => `
          <a href="#/categoria/${c.slug}" class="cat-nav-pill ${c.id === activeCategoryId ? 'is-active' : ''}" data-cursor="hover">
            <span class="cat-nav-num">${c.number}.</span>
            <span>${c.shortTitle}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

// ================================================================
// CATEGORY HERO CONFIG & HOME-STYLE SPLIT LAYOUT
// ================================================================

export const CATEGORY_HERO_CONFIG = {
  branding: {
    eyebrow: 'DISEÑO & BRANDING · CDMX & GLOBAL',
    line1: 'CONSTRUIMOS',
    line2: 'MARCAS QUE',
    words: ['DOMINAN', 'CONECTAN', 'PERDURAN', 'IMPACTAN', 'TRASCIENDEN', 'ENAMORAN'],
    description: 'Identidades visuales memorables, manuales de marca de nivel internacional, packaging y blindaje legal IMPI. Resultados medibles en sprints de 15 días.',
    chips: ['⚡ Sprint de 15 días', '🛡️ Blindaje IMPI', '✦ 0% Templates']
  },
  marketing: {
    eyebrow: 'PERFORMANCE & ADS · CDMX & GLOBAL',
    line1: 'ESCALAMOS',
    line2: 'VENTAS QUE',
    words: ['FACTURAN', 'CONVIERTEN', 'MULTIPLICAN', 'CRECEN', 'RENTABILIZAN', 'LIDERAN'],
    description: 'Campañas de alto rendimiento en Meta, Google y TikTok con optimización diaria por IA y métricas directas a facturación.',
    chips: ['📈 4.8x ROAS Promedio', '🎯 Leads Calificados', '⚡ Optimización Diaria']
  },
  'web-ecommerce': {
    eyebrow: 'INGENIERÍA WEB & ECOMMERCE · CDMX & GLOBAL',
    line1: 'DESARROLLAMOS',
    line2: 'PLATAFORMAS QUE',
    words: ['VENDEN', 'CONVIERTEN', 'ESCALAN', 'IMPACTAN', 'CAUTIVAN', 'ACELERAN'],
    description: 'Plataformas de comercio electrónico y arquitecturas web headless ultrarrápidas pensadas para convertir visitas en ventas reales.',
    chips: ['⚡ 0.8s Carga Ultrarrápida', '🔒 Pasarelas Seguras', '✦ Arquitectura Headless']
  },
  seo: {
    eyebrow: 'SEO & BÚSQUEDA IA · CDMX & GLOBAL',
    line1: 'POSICIONAMOS',
    line2: 'NEGOCIOS QUE',
    words: ['LIDERAN #1', 'CONQUISTAN', 'APARECEN', 'INDEXAN', 'MONOPOLIZAN', 'PERDURAN'],
    description: 'Posicionamiento orgánico de máxima autoridad en Google Search, Google Gemini y los nuevos motores generativos de inteligencia artificial.',
    chips: ['★ #1 Lugar Orgánico', '🤖 Optimización GEO / IA', '🔍 Tráfico Calificado']
  },
  produccion: {
    eyebrow: 'PRODUCCIÓN AUDIOVISUAL & UGC · CDMX & GLOBAL',
    line1: 'PRODUCIMOS',
    line2: 'HISTORIAS QUE',
    words: ['CONECTAN', 'VENDEN', 'CAUTIVAN', 'ENGANCHAN', 'VIRALIZAN', 'EMOCIONAN'],
    description: 'Comerciales cinemáticos en 4K, video ads de alto enganche y creadores UGC especializados para multiplicar el CTR de tus campañas.',
    chips: ['🎬 Calidad 4K 60FPS', '📱 Red Creadores UGC', '⚡ 3.2x Mayor CTR']
  },
  tecnologia: {
    eyebrow: 'TECNOLOGÍA & IA · CDMX & GLOBAL',
    line1: 'AUTOMATIZAMOS',
    line2: 'SISTEMAS QUE',
    words: ['ACELERAN', 'PRODUCEN', 'OPERAN 24/7', 'LIBERAN TIEMPO', 'ESCALAN', 'EVOLUCIONAN'],
    description: 'Ecosistemas inteligentes, multi-agentes de IA y automatización de funnels comerciales para operar a máxima eficiencia 24/7.',
    chips: ['🤖 Multi-Agentes 24/7', '⚡ Conexión CRM & APIs', '✦ 100% Automatizado']
  }
};

export function getCategoryHeroConfig(catIdOrSlug = 'branding') {
  const key = (catIdOrSlug || '').toLowerCase();
  if (key.includes('brand') || key.includes('diseno')) return CATEGORY_HERO_CONFIG.branding;
  if (key.includes('market') || key.includes('pauta')) return CATEGORY_HERO_CONFIG.marketing;
  if (key.includes('web') || key.includes('ecommerce') || key.includes('tienda') || key.includes('desarrollo')) return CATEGORY_HERO_CONFIG['web-ecommerce'];
  if (key.includes('seo') || key.includes('posicion')) return CATEGORY_HERO_CONFIG.seo;
  if (key.includes('audio') || key.includes('video') || key.includes('produccion')) return CATEGORY_HERO_CONFIG.produccion;
  if (key.includes('tecno') || key.includes('ia') || key.includes('intel') || key.includes('soluciones')) return CATEGORY_HERO_CONFIG.tecnologia;
  return CATEGORY_HERO_CONFIG.branding;
}

export function renderCategoryHeroSection(category, options = {}) {
  const catId = category?.id || category?.slug || 'branding';
  const config = getCategoryHeroConfig(catId);
  const isBrandingDirect = options.isBrandingDirect || false;
  const viewportId = options.viewportId || 'cat-rotator-viewport';
  const activeId = options.activeId || 'cat-rotator-active';
  const underlineId = options.underlineId || 'cat-rotator-underline';
  const canvasId = options.canvasId || 'cat-spline-canvas';
  const loaderId = options.loaderId || 'cat-spline-loader';
  const heroWrapId = options.heroWrapId || 'cat-hero-spline-wrap';
  const spotlightId = options.spotlightId || 'cat-hero-spotlight';

  const primaryBtn = isBrandingDirect
    ? `
      <a href="#seccion-paquetes-branding" class="sm-hero-btn-primary" data-cursor="hover">
        <span>Ver Paquetes & Precios</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    `
    : `
      <button class="sm-hero-btn-primary" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
        <span>Cotizar Proyecto</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    `;

  const waText = encodeURIComponent(`Hola Dilo Digital, me interesa cotizar el servicio de ${category?.title || 'la categoría'}. ¿Podríamos agendar una sesión estratégica?`);
  const waUrl = `https://wa.me/525592441070?text=${waText}`;

  return `
    <!-- ① SPLINE 3D HERO BANNER FOR CATEGORY (EXACT HOME HERO WITH 3D ROBOT) -->
    <section class="cat-hero-spline-section sm-hero-spline-wrap" id="${heroWrapId}">
      <!-- Spotlight mouse-follow glow -->
      <div class="sm-hero-spotlight" id="${spotlightId}"></div>

      <!-- Spline 3D Canvas (covers right portion, extends full height) -->
      <div class="sm-hero-spline-container">
        <canvas id="${canvasId}" class="sm-spline-canvas"></canvas>
        <!-- Fallback loader while Spline loads -->
        <div class="sm-spline-loader" id="${loaderId}">
          <div class="sm-spline-spinner"></div>
        </div>
      </div>

      <!-- Bottom gradient fade to hide robot legs -->
      <div class="sm-hero-bottom-fade"></div>

      <div class="sm-hero-split">
        <!-- Left: Editorial Copy -->
        <div class="sm-hero-left">
          <div class="sm-hero-eyebrow">
            <span class="sm-hero-pulse-dot"></span>
            <span>${config.eyebrow}</span>
          </div>

          <h1 class="sm-hero-headline">
            <span class="sm-hero-line">${config.line1}</span>
            <span class="sm-hero-line">${config.line2}</span>
            <span class="sm-hero-line sm-hero-headline-accent sm-rotator-line">
              <span class="sm-rotator-viewport" id="${viewportId}" data-words='${JSON.stringify(config.words)}' title="Clic para cambiar">
                <span class="sm-rotator-active" id="${activeId}">${config.words[0]}</span>
              </span>
              <span class="sm-rotator-underline" id="${underlineId}"></span>
            </span>
          </h1>

          <p class="sm-hero-desc">
            ${config.description}
          </p>

          <div class="sm-hero-actions">
            ${primaryBtn}
            <a href="${waUrl}" target="_blank" rel="noopener" class="sm-hero-btn-secondary" data-cursor="hover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
              </svg>
              <span>WhatsApp Directo</span>
            </a>
          </div>

          <!-- Micro Trust Chips -->
          <div class="sm-hero-trust-row">
            ${config.chips.map(chip => `<span class="sm-hero-trust-chip">${chip}</span>`).join('')}
          </div>
        </div>

        <!-- Right: spacer (Spline 3D robot canvas is positioned behind) -->
        <div class="sm-hero-right-spacer" aria-hidden="true"></div>
      </div>
    </section>
  `;
}

export function initCategoryRotator(viewportId = 'cat-rotator-viewport', activeId = 'cat-rotator-active', underlineId = 'cat-rotator-underline', customWords = null) {
  if (window.__diloCategoryRotatorTimer) {
    clearInterval(window.__diloCategoryRotatorTimer);
    window.__diloCategoryRotatorTimer = null;
  }

  const viewport = typeof viewportId === 'string' ? document.getElementById(viewportId) : viewportId;
  const activeEl = typeof activeId === 'string' ? document.getElementById(activeId) : activeId;
  const underline = typeof underlineId === 'string' ? document.getElementById(underlineId) : underlineId;

  if (!viewport || !activeEl) return null;

  let words = customWords;
  if (!words || words.length === 0) {
    if (viewport.dataset.words) {
      try {
        words = JSON.parse(viewport.dataset.words);
      } catch (e) {
        words = ['DOMINAN', 'CONVIERTEN', 'ESCALAN', 'FACTURAN', 'LIDERAN', 'TRASCIENDEN'];
      }
    } else {
      words = ['DOMINAN', 'CONVIERTEN', 'ESCALAN', 'FACTURAN', 'LIDERAN', 'TRASCIENDEN'];
    }
  }

  let currentWordIndex = 0;
  let isWordAnimating = false;

  function createWordElement(word) {
    const wrap = document.createElement('span');
    wrap.className = 'sm-rot-word';
    word.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'sm-rot-char';
      span.textContent = char;
      wrap.appendChild(span);
    });
    return wrap;
  }

  // Initial word setup with char spans
  activeEl.innerHTML = '';
  const initialWordEl = createWordElement(words[0]);
  activeEl.appendChild(initialWordEl);

  // Measure & lock initial width
  const initialWidth = initialWordEl.offsetWidth;
  if (initialWidth > 0) {
    viewport.style.width = `${initialWidth}px`;
    if (underline) underline.style.width = `${initialWidth}px`;
  }

  function rotateToNextWord() {
    if (isWordAnimating) return;
    isWordAnimating = true;

    const nextIndex = (currentWordIndex + 1) % words.length;
    const nextWord = words[nextIndex];

    const currentWordEl = activeEl.querySelector('.sm-rot-word');
    const currentChars = currentWordEl ? Array.from(currentWordEl.querySelectorAll('.sm-rot-char')) : [];

    // Build new word
    const nextWordEl = createWordElement(nextWord);
    nextWordEl.style.position = 'absolute';
    nextWordEl.style.top = '0';
    nextWordEl.style.left = '0';
    nextWordEl.style.visibility = 'hidden';
    activeEl.appendChild(nextWordEl);

    const nextWidth = nextWordEl.offsetWidth;
    nextWordEl.style.visibility = '';

    const nextChars = Array.from(nextWordEl.querySelectorAll('.sm-rot-char'));

    // Prep incoming characters (rotated down, shifted down, faded)
    gsap.set(nextChars, {
      rotateX: -90,
      y: '100%',
      opacity: 0,
      transformOrigin: '50% 100%'
    });

    const tl = gsap.timeline({
      onComplete: () => {
        if (currentWordEl) currentWordEl.remove();
        nextWordEl.style.position = '';
        currentWordIndex = nextIndex;
        isWordAnimating = false;
      }
    });

    // 1. Current letters roll up and out in 3D
    if (currentChars.length > 0) {
      tl.to(currentChars, {
        rotateX: 90,
        y: '-100%',
        opacity: 0,
        duration: 0.38,
        ease: 'power2.in',
        stagger: 0.016,
        transformOrigin: '50% 0%'
      }, 0);
    }

    // 2. Smoothly animate container and underline width
    tl.to(viewport, {
      width: nextWidth,
      duration: 0.45,
      ease: 'expo.out'
    }, 0.12);

    if (underline) {
      tl.to(underline, {
        width: nextWidth,
        duration: 0.45,
        ease: 'expo.out'
      }, 0.12);

      tl.fromTo(underline,
        { filter: 'drop-shadow(0 0 4px #FF5A1F)' },
        { filter: 'drop-shadow(0 0 16px #FF5A1F)', duration: 0.25, yoyo: true, repeat: 1 },
        0.18
      );
    }

    // 3. Next letters roll in from below with mechanical bounce snap
    tl.to(nextChars, {
      rotateX: 0,
      y: '0%',
      opacity: 1,
      duration: 0.52,
      ease: 'back.out(1.6)',
      stagger: 0.02
    }, 0.16);
  }

  // Click to rotate immediately
  viewport.addEventListener('click', () => {
    if (!isWordAnimating) rotateToNextWord();
  });

  // Auto rotation interval
  window.__diloCategoryRotatorTimer = setInterval(() => {
    if (document.hidden || isWordAnimating) return;
    rotateToNextWord();
  }, 2800);

  return () => {
    if (window.__diloCategoryRotatorTimer) {
      clearInterval(window.__diloCategoryRotatorTimer);
      window.__diloCategoryRotatorTimer = null;
    }
  };
}

let activeCategorySplineApp = null;

export function initCategorySpline(canvasId = 'cat-spline-canvas', loaderId = 'cat-spline-loader', wrapId = 'cat-hero-spline-wrap') {
  const canvas = document.getElementById(canvasId);
  const loader = document.getElementById(loaderId);
  const heroWrap = document.getElementById(wrapId);

  if (!canvas) return;

  if (activeCategorySplineApp) {
    try {
      if (typeof activeCategorySplineApp.dispose === 'function') {
        activeCategorySplineApp.dispose();
      }
    } catch (e) {
      // ignore
    }
    activeCategorySplineApp = null;
  }

  activeCategorySplineApp = new Application(canvas);
  activeCategorySplineApp.load(SPLINE_SCENE_URL)
    .then(() => {
      if (loader) {
        gsap.to(loader, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => loader.remove()
        });
      }
      if (heroWrap && canvas) {
        setupMouseForwarding(heroWrap, canvas);
      }
    })
    .catch((err) => {
      console.warn('Spline 3D Scene in Category Hero:', err);
      if (loader) loader.remove();
    });
}

function setupMouseForwarding(heroWrap, canvas) {
  if (!heroWrap || !canvas) return;

  const handlePointer = (e) => {
    if (!e.isTrusted) return;

    const syntheticEvent = new PointerEvent('pointermove', {
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      bubbles: false,
      cancelable: true,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
      width: 1,
      height: 1,
    });
    canvas.dispatchEvent(syntheticEvent);
  };

  heroWrap.addEventListener('pointermove', handlePointer, { passive: true });
}

export function initSpotlightFollow(wrapId = 'cat-hero-spline-wrap', spotlightId = 'cat-hero-spotlight') {
  const heroWrap = document.getElementById(wrapId);
  const spotlight = document.getElementById(spotlightId);
  if (!heroWrap || !spotlight) return;

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  let isHovering = false;

  heroWrap.addEventListener('mouseenter', () => {
    isHovering = true;
    gsap.to(spotlight, { autoAlpha: 1, duration: 0.3 });
  });

  heroWrap.addEventListener('mouseleave', () => {
    isHovering = false;
    gsap.to(spotlight, { autoAlpha: 0, duration: 0.3 });
  });

  heroWrap.addEventListener('mousemove', (e) => {
    const rect = heroWrap.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  const loop = () => {
    if (isHovering && spotlight.parentElement) {
      pos.x += (mouse.x - pos.x) * 0.08;
      pos.y += (mouse.y - pos.y) * 0.08;
      spotlight.style.transform = `translate(${pos.x - 200}px, ${pos.y - 200}px)`;
      requestAnimationFrame(loop);
    }
  };

  heroWrap.addEventListener('mouseenter', () => {
    requestAnimationFrame(loop);
  });
}

export function initCategoryHeroEvents(options = {}) {
  const viewportId = options.viewportId || 'cat-rotator-viewport';
  const activeId = options.activeId || 'cat-rotator-active';
  const underlineId = options.underlineId || 'cat-rotator-underline';
  const canvasId = options.canvasId || 'cat-spline-canvas';
  const loaderId = options.loaderId || 'cat-spline-loader';
  const wrapId = options.wrapId || 'cat-hero-spline-wrap';
  const spotlightId = options.spotlightId || 'cat-hero-spotlight';

  // 1. 3D Kinetic Character Rotator
  initCategoryRotator(viewportId, activeId, underlineId);

  // 2. Spline 3D Robot
  initCategorySpline(canvasId, loaderId, wrapId);

  // 3. Spotlight Follow
  initSpotlightFollow(wrapId, spotlightId);
}


