// ================================================================
// DILO DIGITAL — CATEGORY KINETIC ANIMATIONS ENGINE
// Replaces static images with interactive, 60fps GPU animations for each category
// ================================================================

export function renderCategoryHeroAnimation(categoryId = 'branding') {
  const cat = categoryId.toLowerCase();

  // 1. BRANDING & DISEÑO
  if (cat.includes('brand')) {
    return `
      <div class="cat-anim-container" aria-label="Animación interactiva de Branding">
        <div class="cat-anim-glow" style="background: rgba(255, 90, 31, 0.4);"></div>
        <div class="cat-anim-badge-top">
          <span class="cat-anim-pulse-dot"></span>
          <span>Vector & Brand Identity Lab</span>
        </div>

        <div class="anim-branding-box">
          <svg class="anim-brand-vector-grid" viewBox="0 0 400 300" fill="none">
            <path class="anim-brand-vector-path" d="M 40,240 Q 200,40 360,240" stroke="rgba(255, 90, 31, 0.35)" stroke-width="2" fill="none"/>
            <circle cx="40" cy="240" r="4" fill="#FF5A1F"/>
            <circle cx="200" cy="40" r="5" fill="#FFFFFF"/>
            <circle cx="360" cy="240" r="4" fill="#FF5A1F"/>
            <line x1="200" y1="40" x2="260" y2="80" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3 3"/>
            <circle cx="260" cy="80" r="3" fill="#10B981"/>
          </svg>

          <div class="anim-brand-center-mark">DILO</div>

          <div class="anim-brand-chip anim-brand-chip-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Pantone 021 C &middot; Hex #FF5A1F</span>
          </div>

          <div class="anim-brand-chip anim-brand-chip-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Tipografía Manuka 900</span>
          </div>

          <div class="anim-brand-chip anim-brand-chip-3">
            <span>SVG &middot; AI &middot; Figma</span>
          </div>

          <div class="anim-swatches-strip">
            <span class="anim-swatch-dot" style="background: #FF5A1F;"></span>
            <span class="anim-swatch-dot" style="background: #141718;"></span>
            <span class="anim-swatch-dot" style="background: #00A8A0;"></span>
            <span class="anim-swatch-dot" style="background: #ECEEEE;"></span>
          </div>
        </div>

        <div class="cat-anim-badge-bottom">60 FPS &middot; Vector Motion</div>
      </div>
    `;
  }

  // 2. MARKETING DIGITAL & PERFORMANCE
  if (cat.includes('market') || cat.includes('pauta')) {
    return `
      <div class="cat-anim-container" aria-label="Animación interactiva de Marketing">
        <div class="cat-anim-glow" style="background: rgba(16, 185, 129, 0.35);"></div>
        <div class="cat-anim-badge-top">
          <span class="cat-anim-pulse-dot"></span>
          <span>Live Ads Telemetry & ROAS</span>
        </div>

        <div class="anim-mkt-box">
          <div class="anim-mkt-radar-ring">
            <div class="anim-mkt-radar-sweep"></div>
          </div>

          <div class="anim-mkt-bars-flex">
            <div class="anim-mkt-bar"></div>
            <div class="anim-mkt-bar"></div>
            <div class="anim-mkt-bar"></div>
            <div class="anim-mkt-bar"></div>
            <div class="anim-mkt-bar"></div>
          </div>

          <div class="anim-mkt-kpi-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            <span>ROAS: +4.8x Meta & Google</span>
          </div>
        </div>

        <div class="cat-anim-badge-bottom">Data-Driven &middot; Escala Activa</div>
      </div>
    `;
  }

  // 3. DESARROLLO WEB & E-COMMERCE
  if (cat.includes('web') || cat.includes('desarrollo') || cat.includes('code') || cat.includes('tienda')) {
    return `
      <div class="cat-anim-container" aria-label="Animación interactiva de Desarrollo Web">
        <div class="cat-anim-glow" style="background: rgba(56, 189, 248, 0.35);"></div>
        <div class="cat-anim-badge-top">
          <span class="cat-anim-pulse-dot"></span>
          <span>Headless Architecture & CDN</span>
        </div>

        <div class="anim-web-box">
          <div class="anim-web-terminal">
            <div class="anim-terminal-header">
              <span class="anim-dot-red"></span>
              <span class="anim-dot-yellow"></span>
              <span class="anim-dot-green"></span>
              <span style="font-size: 0.7rem; color: #64748B; margin-left: 0.5rem;">~/dilo-digital/core.tsx</span>
            </div>
            <div>
              <span class="anim-code-token-kw">import</span> { React, Headless } <span class="anim-code-token-kw">from</span> <span class="anim-code-token-str">'@dilo/stack'</span>;<br>
              <span class="anim-code-token-kw">const</span> engine = <span class="anim-code-token-fn">initSpeedOpt</span>({<br>
              &nbsp;&nbsp;fcp: <span class="anim-code-token-val">0.8</span>, <span class="anim-code-token-str">'ms'</span>,<br>
              &nbsp;&nbsp;awwwards: <span class="anim-code-token-val">true</span><br>
              });<br>
              <span class="anim-code-token-fn">engine.deploy</span>();<span class="anim-typing-cursor"></span>
            </div>
          </div>

          <div class="anim-web-speed-pill">
            ⚡ 0.8s Carga Ultrarrápida
          </div>
        </div>

        <div class="cat-anim-badge-bottom">React &middot; Vite &middot; Edge Cloud</div>
      </div>
    `;
  }

  // 4. PRODUCCIÓN AUDIOVISUAL & 3D
  if (cat.includes('audio') || cat.includes('video') || cat.includes('produccion')) {
    return `
      <div class="cat-anim-container" aria-label="Animación interactiva Audiovisual">
        <div class="cat-anim-glow" style="background: rgba(168, 85, 247, 0.35);"></div>
        <div class="cat-anim-badge-top">
          <span class="cat-anim-pulse-dot"></span>
          <span>Cinematics & 3D Render Engine</span>
        </div>

        <div class="anim-av-box">
          <div class="anim-av-lens-ring">
            <div class="anim-av-aperture-core">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
              </svg>
            </div>
          </div>

          <div class="anim-av-waveform">
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
            <div class="anim-av-wave-bar"></div>
          </div>

          <div class="anim-av-rec-badge">
            <span class="anim-rec-blip"></span>
            <span>4K 60FPS</span>
          </div>
        </div>

        <div class="cat-anim-badge-bottom">00:14:28:04 &middot; Master Audio</div>
      </div>
    `;
  }

  // 5. IA & SOLUCIONES EMPRESARIALES
  if (cat.includes('ia') || cat.includes('intel') || cat.includes('tecno') || cat.includes('seo')) {
    return `
      <div class="cat-anim-container" aria-label="Animación interactiva de Inteligencia Artificial">
        <div class="cat-anim-glow" style="background: rgba(56, 189, 248, 0.4);"></div>
        <div class="cat-anim-badge-top">
          <span class="cat-anim-pulse-dot"></span>
          <span>Neural Agents & Automation</span>
        </div>

        <div class="anim-ia-box">
          <div class="anim-ia-core">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
          </div>

          <div class="anim-ia-pill-node anim-ia-node-1">
            ⚡ Multi-Agent Workflows
          </div>
          <div class="anim-ia-pill-node anim-ia-node-2">
            🧠 Custom LLMs & GEO
          </div>
          <div class="anim-ia-pill-node anim-ia-node-3">
            🔄 WhatsApp CRM Auto
          </div>
        </div>

        <div class="cat-anim-badge-bottom">Autonomous Core &middot; 24/7</div>
      </div>
    `;
  }

  // 6. DISEÑO DE ESPACIOS & STANDS (DEFAULT FALLBACK)
  return `
    <div class="cat-anim-container" aria-label="Animación interactiva de Arquitectura y Stands">
      <div class="cat-anim-glow" style="background: rgba(255, 90, 31, 0.35);"></div>
      <div class="cat-anim-badge-top">
        <span class="cat-anim-pulse-dot"></span>
        <span>Spatial 3D & Isometric Grid</span>
      </div>

      <div class="anim-espacios-box">
        <div class="anim-iso-grid"></div>
        <div class="anim-iso-cube"></div>

        <div class="anim-dimension-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          <span>6.00m &times; 4.50m &middot; Render 3D</span>
        </div>
      </div>

      <div class="cat-anim-badge-bottom">Modelado 3D &middot; Iluminación Lux</div>
    </div>
  `;
}
