// ================================================================
// DILO DIGITAL — ULTRA-CLEAN TRANSPARENT VECTOR ANIMATIONS
// Minimalist, Background-Free, 60fps Vector SVG Motion (Lottie / Lordicon style)
// ================================================================

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

