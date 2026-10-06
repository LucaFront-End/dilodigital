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
          <!-- Minimalist Search Query Bar with Animated Typewriter -->
          <div class="clean-seo-searchbar">
            <svg class="clean-seo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <div class="clean-seo-query">
              <span class="clean-seo-typewriter-text" id="clean-seo-typewriter-text">agencia marketing y branding</span>
              <span class="clean-seo-cursor"></span>
            </div>
          </div>

          <!-- SEO Ranking Stack -->
          <div class="clean-seo-results-stack">
            <!-- Rank #1 Winner Card: dilodigitalmx.com - Agencia de Marketing Dilo digital MX -->
            <div class="clean-seo-card-1">
              <div class="clean-seo-card-main">
                <div class="clean-seo-card-title">Agencia de Marketing Dilo Digital MX</div>
                <div class="clean-seo-card-url">https://dilodigitalmx.com &middot; Top Tier</div>
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

  // 4. DESARROLLO WEB & E-COMMERCE: REAL STORE MOCKUP WITH CART & BESTSELLER
  if (cat.includes('web') || cat.includes('desarrollo') || cat.includes('code') || cat.includes('tienda')) {
    return `
      <div class="cat-anim-container" aria-label="Animación de Tienda Ecommerce y Desarrollo Web de Alta Conversión">
        <div class="clean-ecom-stage">
          <!-- Browser Frame Window -->
          <div class="clean-ecom-browser">
            <!-- Mac Browser Topbar -->
            <div class="clean-ecom-topbar">
              <div class="clean-browser-dots">
                <span class="clean-browser-dot" style="background: #EF4444;"></span>
                <span class="clean-browser-dot" style="background: #F59E0B;"></span>
                <span class="clean-browser-dot" style="background: #10B981;"></span>
              </div>
              <div class="clean-ecom-urlbar">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>dilodigitalmx.com/store</span>
              </div>
            </div>

            <!-- Mini Store Navbar -->
            <div class="clean-ecom-header">
              <div class="clean-ecom-logo">
                <span class="ecom-logo-mark">DILO</span>
                <span class="ecom-logo-sub">STORE</span>
              </div>
              <div class="clean-ecom-nav">
                <span>Colección</span>
                <span>Novedades</span>
              </div>
              <div class="clean-ecom-cart-btn">
                <span>🛒</span>
                <span class="clean-ecom-cart-qty">1</span>
              </div>
            </div>

            <!-- E-Commerce Showcase Product Card -->
            <div class="clean-ecom-product-grid">
              <div class="clean-ecom-card">
                <div class="ecom-card-img-wrap">
                  <!-- Product Image / Vector Graphic: Smart Chrono Edition -->
                  <div class="ecom-product-vector">
                    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="18" y="4" width="32" height="60" rx="8" fill="#1E293B"/>
                      <circle cx="34" cy="34" r="24" fill="#0F172A" stroke="#334155" stroke-width="2"/>
                      <circle cx="34" cy="34" r="20" fill="url(#chronoGradWeb)"/>
                      <circle cx="34" cy="34" r="16" stroke="rgba(255, 90, 31, 0.4)" stroke-width="1.5" stroke-dasharray="3 3"/>
                      <line x1="34" y1="34" x2="34" y2="22" stroke="#FF5A1F" stroke-width="2" stroke-linecap="round"/>
                      <line x1="34" y1="34" x2="42" y2="34" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                      <circle cx="34" cy="34" r="2.5" fill="#FF5A1F"/>
                      <defs>
                        <linearGradient id="chronoGradWeb" x1="14" y1="14" x2="54" y2="54">
                          <stop stop-color="#1E293B"/>
                          <stop offset="1" stop-color="#0F172A"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span class="ecom-badge-bestseller">★ BEST SELLER</span>
                </div>

                <div class="ecom-card-body">
                  <div class="ecom-card-title-row">
                    <span class="ecom-product-name">Aura Chrono Smart X</span>
                    <span class="ecom-rating">★★★★★ <small>(142)</small></span>
                  </div>
                  <div class="ecom-card-footer">
                    <div class="ecom-price-wrap">
                      <span class="ecom-price-curr">$2,499</span>
                      <span class="ecom-price-mxn">MXN</span>
                    </div>
                    <button class="ecom-btn-add" type="button" aria-label="Agregar al carrito">
                      <span>+ Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating E-Commerce Checkout / Speed Toast -->
          <div class="clean-ecom-toast">
            <span class="ecom-toast-icon">✓</span>
            <div class="ecom-toast-text">
              <strong>Envío Express en 24h</strong>
              <small>Pasarelas 3DS &middot; Stripe &middot; OXXO</small>
            </div>
          </div>

          <!-- Speed Badge -->
          <div class="clean-web-speed-badge">
            <span>⚡ 0.8s Carga Ultrarrápida &middot; Headless</span>
          </div>
        </div>
      </div>
    `;
  }

  // 5. PRODUCCIÓN AUDIOVISUAL & UGC: 4K CINEMA CAMERA VIEW-FINDER & RECORDING HUD
  if (cat.includes('audio') || cat.includes('video') || cat.includes('produccion')) {
    return `
      <div class="cat-anim-container" aria-label="Animación cinematográfica de Cámara de Video 4K y Grabación">
        <div class="clean-camera-stage">
          <!-- Viewfinder HUD Frame -->
          <div class="clean-cam-viewfinder">
            <!-- Viewfinder Corner Brackets -->
            <span class="cam-corner tl"></span>
            <span class="cam-corner tr"></span>
            <span class="cam-corner bl"></span>
            <span class="cam-corner br"></span>

            <!-- Top HUD Bar -->
            <div class="cam-hud-top">
              <div class="cam-rec-status">
                <span class="cam-rec-dot"></span>
                <span class="cam-rec-txt">REC</span>
              </div>
              <span class="cam-hud-res">4K UHD &middot; 60FPS</span>
              <span class="cam-timecode" id="cam-live-timecode">00:14:28:18</span>
            </div>

            <!-- Central Cinema Camera & Lens Target -->
            <div class="cam-center-visual">
              <div class="cam-body-graphic">
                <svg width="130" height="96" viewBox="0 0 130 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Matte Box & Lens Hood -->
                  <path d="M78 28L106 18V78L78 68V28Z" fill="#1E293B" stroke="#334155" stroke-width="2" stroke-linejoin="round"/>
                  <!-- Main Camera Body -->
                  <rect x="18" y="24" width="60" height="52" rx="10" fill="#0F172A" stroke="#334155" stroke-width="2"/>
                  <!-- Top Handle Rig -->
                  <path d="M26 24V14H66V24" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                  <!-- Dual Dial knobs on top -->
                  <rect x="34" y="9" width="10" height="5" rx="2" fill="#FF5A1F"/>
                  <rect x="52" y="9" width="10" height="5" rx="2" fill="#94A3B8"/>
                  <!-- Lens Barrel Rings -->
                  <circle cx="92" cy="48" r="16" fill="#0F172A" stroke="#FF5A1F" stroke-width="2.5"/>
                  <circle cx="92" cy="48" r="10" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" class="cam-lens-iris"/>
                  <circle cx="90" cy="46" r="3" fill="#FFFFFF" opacity="0.8"/>
                  <!-- Camera Screen / Tally light -->
                  <rect x="25" y="36" width="34" height="26" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
                  <circle cx="28" cy="30" r="2.5" fill="#EF4444" class="cam-tally-blink"/>
                </svg>
              </div>

              <!-- Reticle Focus Crosshair [ + ] -->
              <div class="cam-focus-reticle">
                <span class="cam-reticle-cross"></span>
              </div>
            </div>

            <!-- Bottom HUD Bar -->
            <div class="cam-hud-bottom">
              <div class="cam-params-row">
                <span>ISO 400</span>
                <span>1/120s</span>
                <span>f/1.8</span>
                <span class="cam-log-badge">RAW LOG</span>
              </div>
              <div class="cam-audio-levels" title="Canales de Audio Cinemático">
                <span class="cam-lvl-bar b1"></span>
                <span class="cam-lvl-bar b2"></span>
                <span class="cam-lvl-bar b3"></span>
                <span class="cam-lvl-bar b4"></span>
              </div>
            </div>
          </div>

          <!-- Floating Badge -->
          <div class="clean-cam-badge">
            <span class="clean-cam-badge-icon">🎬</span>
            <span>Video Comercial 4K &middot; UGC Ads</span>
          </div>
        </div>
      </div>
    `;
  }

  // 6. TECNOLOGÍA & IA: ECOSISTEMA MULTI-AGENTE CON AVATARES & CRM (ESTILO IVENTAS.COM)
  if (cat.includes('tecno') || cat.includes('ia') || cat.includes('intel')) {
    return `
      <div class="cat-anim-container" aria-label="Ecosistema de Agentes de IA y CRM estilo iVentas">
        <div class="clean-ai-stage">
          <!-- Orbital Track Lines -->
          <div class="ai-orbit-circle ai-orbit-outer"></div>
          <div class="ai-orbit-circle ai-orbit-inner"></div>

          <!-- Central Core Node: IA Monogram -->
          <div class="ai-core-hub">
            <div class="ai-core-pulse"></div>
            <div class="ai-core-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                <circle cx="9" cy="9" r="1.5" fill="currentColor"></circle>
                <circle cx="15" cy="9" r="1.5" fill="currentColor"></circle>
                <path d="M9 15h6"></path>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
              </svg>
            </div>
            <span class="ai-core-label">DILO AI</span>
          </div>

          <!-- Agent Card 1: Agente de Ventas IA (Mint Circle #BFF7E0) -->
          <div class="ai-agent-card card-sales">
            <div class="ai-avatar-circle" style="background: #BFF7E0; color: #047857;">
              <!-- Sales Agent Avatar SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
              </svg>
              <span class="ai-live-dot"></span>
            </div>
            <div class="ai-agent-info">
              <div class="ai-agent-role">Agente de Ventas IA</div>
              <div class="ai-agent-desc">Respondió en 2s &middot; 312 leads</div>
            </div>
          </div>

          <!-- Agent Card 2: WhatsApp CRM Multiagente (Periwinkle Circle #CBD2FA) -->
          <div class="ai-agent-card card-crm">
            <div class="ai-avatar-circle" style="background: #CBD2FA; color: #3730A3;">
              <!-- Headset / Support Avatar SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
              <span class="ai-live-dot" style="background: #10B981;"></span>
            </div>
            <div class="ai-agent-info">
              <div class="ai-agent-role">Asignación WhatsApp</div>
              <div class="ai-agent-desc">Chat Ana &rarr; Luis (Ventas)</div>
            </div>
          </div>

          <!-- Agent Card 3: Seguimiento & Pagos Automático (Gold Circle #FFDFA8) -->
          <div class="ai-agent-card card-automation">
            <div class="ai-avatar-circle" style="background: #FFDFA8; color: #B45309;">
              <!-- Automation / Calendar Check SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <polyline points="9 15 11 17 15 13"></polyline>
              </svg>
            </div>
            <div class="ai-agent-info">
              <div class="ai-agent-role">Seguimiento Automático</div>
              <div class="ai-agent-desc">Cita agendada &middot; Confirmada</div>
            </div>
          </div>

          <!-- Floating Channel Pill (WhatsApp API Oficial) -->
          <div class="ai-channel-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#10B981">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
            </svg>
            <span>WhatsApp Business API Oficial</span>
          </div>
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
  const isBrandingDirect = options.isBrandingDirect || false;

  const primaryBtn = isBrandingDirect
    ? `
      <a href="#seccion-paquetes-branding" class="btn btn-primary btn-lg btn-glow" data-cursor="hover">
        <span>Ver Paquetes & Precios</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    `
    : `
      <button class="btn btn-primary btn-lg btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
        <span>Cotizar ${category?.shortTitle || 'Proyecto'} en 60s</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    `;

  const waText = encodeURIComponent(`Hola Dilo Digital, me interesa cotizar el servicio de ${category?.title || 'la categoría'}. ¿Podríamos agendar una sesión estratégica?`);
  const waUrl = `https://wa.me/525592441070?text=${waText}`;

  const stats = (category?.stats && category.stats.length > 0) ? category.stats : [
    { value: "+140", label: "Marcas Registradas" },
    { value: "98.4%", label: "Tasa Viabilidad" },
    { value: "15 Días", label: "Sprint de Entrega" }
  ];

  return `
    <!-- MONUMENTAL CATEGORY HERO STAGE -->
    <section class="cat-hero-section">
      <div class="cat-hero-container">
        
        <!-- Background Numeral Watermark in Manuka -->
        <div class="cat-watermark-num" aria-hidden="true">${category?.number || '01'}</div>

        <div class="cat-hero-grid">
          <div class="cat-hero-left">
            <div class="cat-tag-wrap">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">DISCIPLINA ESTRATÉGICA &middot; ${category?.number || '01'} DE 06</span>
            </div>

            <h1 class="cat-hero-title">
              ${category?.title || ''}
            </h1>

            <div class="cat-hero-concept">
              "${category?.concept || ''}"
            </div>

            <p class="cat-hero-desc">
              ${category?.tagline || ''}
            </p>

            <div class="cat-hero-actions">
              ${primaryBtn}

              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-lg" data-cursor="hover" style="display: flex; align-items: center; gap: 0.6rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                </svg>
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Lightweight Vector Animation + Compact Metrics -->
          <div class="cat-hero-right">
            ${renderCategoryHeroAnimation(catId)}

            <div class="cat-stats-card-compact">
              <div class="cat-stats-grid">
                ${stats.map(s => `
                  <div class="cat-stat-box">
                    <div class="cat-stat-val">${s.value}</div>
                    <div class="cat-stat-lbl">${s.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}

// SEO Interactive Typewriter loop
function initSeoTypewriter() {
  const el = document.getElementById('clean-seo-typewriter-text');
  if (!el) return;

  const phrases = [
    'agencia marketing y branding',
    'agencia marketing dilo digital mx',
    'posicionamiento seo mexico #1',
    'agencia seo y pauta digital'
  ];

  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let isDeleting = false;
  let timer = null;

  function typeLoop() {
    if (!document.body.contains(el)) {
      if (timer) clearTimeout(timer);
      return;
    }

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      el.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        timer = setTimeout(typeLoop, 400);
        return;
      }
      timer = setTimeout(typeLoop, 35);
    } else {
      charIdx++;
      el.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx >= currentPhrase.length) {
        isDeleting = true;
        timer = setTimeout(typeLoop, 2200);
        return;
      }
      timer = setTimeout(typeLoop, 65);
    }
  }

  timer = setTimeout(typeLoop, 1500);
}

// Cinema Camera Live Timecode counter (60fps)
function initCameraTimecode() {
  const tc = document.getElementById('cam-live-timecode');
  if (!tc) return;

  let frame = 18;
  let sec = 28;
  let min = 14;

  const interval = setInterval(() => {
    if (!document.body.contains(tc)) {
      clearInterval(interval);
      return;
    }
    frame += 2;
    if (frame >= 60) {
      frame = 0;
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
      }
    }
    const fStr = String(frame).padStart(2, '0');
    const sStr = String(sec).padStart(2, '0');
    const mStr = String(min).padStart(2, '0');
    tc.textContent = `00:${mStr}:${sStr}:${fStr}`;
  }, 33);
}

export function initCategoryHeroEvents(options = {}) {
  // 1. Initialize SEO Typewriter if on SEO category
  initSeoTypewriter();

  // 2. Initialize Cinema Camera Timecode if on Produccion category
  initCameraTimecode();
}


