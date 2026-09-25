// ================================================================
// FINAL HIGH-ENERGY CALL TO ACTION COMPONENT
// Monumental Manuka Typography, Scarcity Pulse Badge, Obsidian Stage & Trust Bar
// ================================================================

export function renderFinalCta() {
  return `
  <!-- ================================================================
       FINAL HIGH-ENERGY CALL TO ACTION — DILO DIGITAL SIGNATURE
       ================================================================ -->
  <section class="final-cta-section" id="contacto">
    <div class="final-cta-container">
      <div class="final-cta-card">
        
        <!-- Top Ambient Aura & Noise Texture -->
        <div class="final-cta-aura" aria-hidden="true"></div>
        <div class="final-cta-grid-bg" aria-hidden="true"></div>

        <!-- Live Availability Scarcity Badge -->
        <div class="final-cta-availability">
          <span class="final-cta-pulse-dot"></span>
          <span class="final-cta-avail-text">AGENDA ACTIVA &middot; 3 CUPOS ESTRATÉGICOS DISPONIBLES ESTE MES</span>
        </div>

        <!-- Monumental Manuka Headline -->
        <h2 class="final-cta-title">
          ¿LISTO PARA DEJAR DE SER UNA MARCA COMÚN Y COMENZAR A <span class="final-cta-title-accent">DEJAR MARCA?</span>
        </h2>

        <!-- Subtitle in Plus Jakarta Sans -->
        <p class="final-cta-desc">
          Analicemos tus metas de facturación, adquisición digital y protección legal. Sin rodeos, con estrategia pura y visión de retorno de inversión desde el día uno.
        </p>

        <!-- Action Buttons Cluster -->
        <div class="final-cta-actions">
          <button class="final-cta-btn-primary" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
            <span class="final-cta-btn-glow"></span>
            <span class="final-cta-btn-content">
              <span>Cotizar Proyecto en 60 Segundos</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>

          <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="final-cta-btn-whatsapp" data-cursor="hover">
            <div class="final-cta-wa-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
              </svg>
            </div>
            <div class="final-cta-wa-text">
              <span class="final-cta-wa-title">Chatear por WhatsApp Directo</span>
              <span class="final-cta-wa-sub">Respuesta en &lt; 15 min &middot; CDMX</span>
            </div>
          </a>
        </div>

        <!-- Trust & Guarantee Badges Ribbon -->
        <div class="final-cta-trust-bar">
          <div class="final-cta-trust-item">
            <svg class="final-cta-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>Diagnóstico Inicial en 24h</span>
          </div>

          <div class="final-cta-trust-sep"></div>

          <div class="final-cta-trust-item">
            <svg class="final-cta-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Blindaje Legal & Confidencialidad (NDA)</span>
          </div>

          <div class="final-cta-trust-sep"></div>

          <div class="final-cta-trust-item">
            <svg class="final-cta-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Sesión Estratégica 20 Min Sin Costo</span>
          </div>

          <div class="final-cta-trust-sep"></div>

          <div class="final-cta-trust-item">
            <svg class="final-cta-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Garantía de Satisfacción & Entrega</span>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;
}

export function initFinalCtaEvents() {
  // Available for micro-interactions if needed
}
