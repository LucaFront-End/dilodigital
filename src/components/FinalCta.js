// ================================================================
// DILO DIGITAL — INTERACTIVE SPRINT LAUNCHPAD (FINAL CTA)
// Minimalist, Visual & Interactive 4-Pillar Scope Selector
// ================================================================

export function renderFinalCta() {
  return `
  <!-- ================================================================
       INTERACTIVE SPRINT LAUNCHPAD — DILO DIGITAL SIGNATURE
       ================================================================ -->
  <section class="final-launch-section" id="contacto">
    <div class="final-launch-container">
      <div class="final-launch-card">
        
        <!-- Header: Minimal, Quiet & Direct -->
        <header class="final-launch-header">
          <div class="final-launch-eyebrow">
            <span class="final-launch-dot"></span>
            <span>INICIA TU PRÓXIMO SPRINT &middot; CDMX &amp; GLOBAL</span>
          </div>
          <h2 class="final-launch-title">
            ¿QUÉ CONSTRUIMOS <span class="final-launch-accent">JUNTOS?</span>
          </h2>
          <p class="final-launch-sub">
            Selecciona tu prioridad estratégica. Diseñamos, programamos y blindamos tu marca en sprints ágiles de 15 días.
          </p>
        </header>

        <!-- Interactive 4-Card Scope Selector -->
        <div class="final-launch-grid" id="final-scope-grid">
          
          <!-- Card 1: Branding -->
          <div class="final-scope-card is-active" data-scope="branding" data-title="Branding &amp; Identidad" data-timeline="Sprint de 15 Días">
            <div class="final-scope-top">
              <span class="final-scope-icon">✦</span>
              <span class="final-scope-chip">Sprint 15d</span>
            </div>
            <h3 class="final-scope-name">Branding &amp; Identidad</h3>
            <p class="final-scope-desc">Diseño de marca inolvidable, identidad verbal y sistema visual para dominar tu categoría.</p>
            <div class="final-scope-footer">
              <span class="final-scope-radio"></span>
              <span class="final-scope-action-txt">Seleccionado</span>
            </div>
          </div>

          <!-- Card 2: Web Headless -->
          <div class="final-scope-card" data-scope="web" data-title="Web Headless &amp; Vite" data-timeline="Sprint de 15 Días">
            <div class="final-scope-top">
              <span class="final-scope-icon">⚡</span>
              <span class="final-scope-chip">&lt; 0.8s Vite</span>
            </div>
            <h3 class="final-scope-name">Ingeniería Web</h3>
            <p class="final-scope-desc">Websites headless a medida, ultra-rápidos, sin plantillas lentas ni dependencias de WordPress.</p>
            <div class="final-scope-footer">
              <span class="final-scope-radio"></span>
              <span class="final-scope-action-txt">Seleccionar</span>
            </div>
          </div>

          <!-- Card 3: Performance Ads -->
          <div class="final-scope-card" data-scope="ads" data-title="Performance &amp; Ads" data-timeline="Gestión Mensual">
            <div class="final-scope-top">
              <span class="final-scope-icon">📈</span>
              <span class="final-scope-chip">ROAS 5.4x</span>
            </div>
            <h3 class="final-scope-name">Performance Ads</h3>
            <p class="final-scope-desc">Campañas en Meta y Google conectadas a funnels de WhatsApp para convertir tráfico en ventas reales.</p>
            <div class="final-scope-footer">
              <span class="final-scope-radio"></span>
              <span class="final-scope-action-txt">Seleccionar</span>
            </div>
          </div>

          <!-- Card 4: Legal IMPI -->
          <div class="final-scope-card" data-scope="impi" data-title="Registro Legal IMPI" data-timeline="Dictamen 24h">
            <div class="final-scope-top">
              <span class="final-scope-icon">🛡️</span>
              <span class="final-scope-chip">10 Años Protegido</span>
            </div>
            <h3 class="final-scope-name">Registro IMPI</h3>
            <p class="final-scope-desc">Protección y blindaje jurídico de tu nombre comercial en las 45 clases NIZA con garantía legal Dilo.</p>
            <div class="final-scope-footer">
              <span class="final-scope-radio"></span>
              <span class="final-scope-action-txt">Seleccionar</span>
            </div>
          </div>

        </div>

        <!-- Dynamic Action Bar: Reflects the selected card -->
        <div class="final-launch-action-bar">
          <div class="final-launch-selection-info">
            <span class="final-selection-pill" id="final-selection-badge">
              <span class="final-selection-dot"></span>
              <span id="final-selection-label">Seleccionado: Branding &amp; Identidad &middot; Sprint de 15 Días</span>
            </span>
          </div>

          <div class="final-launch-btn-group">
            <button class="final-launch-btn-primary" id="final-launch-cotizar-btn" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
              <span>Cotizar Este Proyecto en 60s</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="final-launch-btn-wa" data-cursor="hover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
              </svg>
              <span>WhatsApp Directo &middot; CDMX</span>
            </a>
          </div>
        </div>

        <!-- Micro-Ribbon Guarantees -->
        <div class="final-launch-guarantees">
          <span>⚡ Diagnóstico Inicial en 24h</span>
          <span class="final-launch-sep">&middot;</span>
          <span>🛡️ Blindaje Jurídico &amp; NDA</span>
          <span class="final-launch-sep">&middot;</span>
          <span>⭐ Garantía de Satisfacción 100%</span>
        </div>

      </div>
    </div>
  </section>
  `;
}

export function initFinalCtaEvents() {
  const cards = document.querySelectorAll('.final-scope-card');
  const labelEl = document.getElementById('final-selection-label');

  if (cards.length && labelEl) {
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        // Reset all cards
        cards.forEach((c) => {
          c.classList.remove('is-active');
          const txt = c.querySelector('.final-scope-action-txt');
          if (txt) txt.textContent = 'Seleccionar';
        });

        // Set active card
        card.classList.add('is-active');
        const activeTxt = card.querySelector('.final-scope-action-txt');
        if (activeTxt) activeTxt.textContent = 'Seleccionado';

        // Update summary label
        const title = card.getAttribute('data-title') || 'Servicio';
        const timeline = card.getAttribute('data-timeline') || 'Sprint';
        labelEl.innerHTML = `Seleccionado: ${title} &middot; ${timeline}`;
      });
    });
  }
}
