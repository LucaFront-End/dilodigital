// ================================================================
// DILO DIGITAL — INTERACTIVE SPRINT CONFIGURATOR (FINAL MULTI-STEP CTA)
// Minimalist, Tactile, Visual 3-Step Project Builder
// ================================================================

export function renderFinalCta() {
  return `
  <!-- ================================================================
       INTERACTIVE SPRINT CONFIGURATOR (MULTI-STEP FINAL CTA)
       ================================================================ -->
  <section class="final-launch-section" id="contacto">
    <div class="final-launch-container">
      <div class="final-launch-card">

        <!-- 3-Step Progress Tracker Bar -->
        <div class="final-steps-tracker" id="final-steps-tracker">
          <div class="step-tracker-item is-active" data-step-target="1">
            <div class="tracker-circle"><span class="tracker-num">1</span></div>
            <span class="tracker-label">01. Enfoque</span>
          </div>
          <div class="tracker-connector"></div>
          <div class="step-tracker-item" data-step-target="2">
            <div class="tracker-circle"><span class="tracker-num">2</span></div>
            <span class="tracker-label">02. Alcance</span>
          </div>
          <div class="tracker-connector"></div>
          <div class="step-tracker-item" data-step-target="3">
            <div class="tracker-circle"><span class="tracker-num">3</span></div>
            <span class="tracker-label">03. Diagnóstico</span>
          </div>
        </div>

        <!-- Master Step Container -->
        <div class="final-step-container">

          <!-- ========================================================
               STEP 1: SERVICE FOCUS
               ======================================================== -->
          <div class="final-step-pane is-active" data-step="1" id="step-pane-1">
            <header class="final-launch-header">
              <div class="final-launch-eyebrow">
                <span class="final-launch-dot"></span>
                <span>PASO 01 / 03 &middot; SELECCIONA TU ENFOQUE</span>
              </div>
              <h2 class="final-launch-title">
                ¿QUÉ VAMOS A <span class="final-launch-accent">CONSTRUIR?</span>
              </h2>
              <p class="final-launch-sub">
                Elige el área estratégica en la que trabajaremos tu próximo sprint de 15 días.
              </p>
            </header>

            <div class="final-step-cards-grid">
              
              <!-- Service 1: Branding -->
              <div class="final-step-card is-selected" data-service-key="branding" data-service-name="Branding &amp; Identidad" data-timeline="Sprint 15 Días">
                <div class="step-card-top">
                  <span class="step-card-icon">✦</span>
                  <span class="step-card-chip">Sprint 15d</span>
                </div>
                <h3 class="step-card-title">Branding &amp; Identidad</h3>
                <p class="step-card-desc">Naming, diseño de marca inolvidable, tipografías y manual de identidad completo.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionado</span>
                </div>
              </div>

              <!-- Service 2: Web Headless -->
              <div class="final-step-card" data-service-key="web" data-service-name="Ingeniería Web Headless" data-timeline="Sprint 15 Días">
                <div class="step-card-top">
                  <span class="step-card-icon">⚡</span>
                  <span class="step-card-chip">&lt; 0.8s Vite</span>
                </div>
                <h3 class="step-card-title">Ingeniería Web</h3>
                <p class="step-card-desc">Plataforma headless de ultra-alta velocidad, personalizada y sin templates lentos.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionar</span>
                </div>
              </div>

              <!-- Service 3: Performance Ads -->
              <div class="final-step-card" data-service-key="ads" data-service-name="Performance &amp; Ads" data-timeline="Gestión Mensual">
                <div class="step-card-top">
                  <span class="step-card-icon">📈</span>
                  <span class="step-card-chip">ROAS 5.4x</span>
                </div>
                <h3 class="step-card-title">Performance Ads</h3>
                <p class="step-card-desc">Campañas en Meta y Google conectadas a funnels de WhatsApp y captación directa.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionar</span>
                </div>
              </div>

              <!-- Service 4: Legal IMPI -->
              <div class="final-step-card" data-service-key="impi" data-service-name="Blindaje Legal IMPI" data-timeline="Dictamen 24h">
                <div class="step-card-top">
                  <span class="step-card-icon">🛡️</span>
                  <span class="step-card-chip">10 Años Protegido</span>
                </div>
                <h3 class="step-card-title">Registro IMPI</h3>
                <p class="step-card-desc">Protección y dictamen de viabilidad fonética en 24h ante el IMPI México.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionar</span>
                </div>
              </div>

            </div>

            <!-- Step 1 Nav Bar -->
            <div class="final-step-nav-bar">
              <div class="step-nav-summary">
                <span class="step-nav-badge">
                  <span class="step-nav-dot"></span>
                  <span>Selección: <strong id="step1-current-choice">Branding &amp; Identidad</strong></span>
                </span>
              </div>
              <button class="step-btn-next" id="btn-goto-step-2" data-cursor="hover">
                <span>Continuar al Alcance</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- ========================================================
               STEP 2: SCOPE & STAGE
               ======================================================== -->
          <div class="final-step-pane" data-step="2" id="step-pane-2">
            <header class="final-launch-header">
              <div class="final-launch-eyebrow">
                <span class="final-launch-dot"></span>
                <span>PASO 02 / 03 &middot; ETAPA Y ALCANCE</span>
              </div>
              <h2 class="final-launch-title">
                ¿EN QUÉ ETAPA <span class="final-launch-accent">ESTÁ TU NEGOCIO?</span>
              </h2>
              <p class="final-launch-sub">
                Esto nos permite calibrar la metodología y los entregables a tu medida exacta.
              </p>
            </header>

            <div class="final-step-cards-grid grid-3">
              
              <!-- Stage 1 -->
              <div class="final-stage-card is-selected" data-stage-key="lanzamiento" data-stage-name="Lanzamiento Express" data-stage-chip="Desde Cero">
                <div class="step-card-top">
                  <span class="step-card-icon">🚀</span>
                  <span class="step-card-chip">Desde Cero</span>
                </div>
                <h3 class="step-card-title">Lanzamiento Express</h3>
                <p class="step-card-desc">Emprender o lanzar un producto nuevo al mercado con identidad impecable y presencia sólida en 15 días.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionado</span>
                </div>
              </div>

              <!-- Stage 2 -->
              <div class="final-stage-card" data-stage-key="escalamiento" data-stage-name="Escalamiento Comercial" data-stage-chip="Crecimiento">
                <div class="step-card-top">
                  <span class="step-card-icon">📈</span>
                  <span class="step-card-chip">Crecimiento</span>
                </div>
                <h3 class="step-card-title">Escalamiento &amp; Ventas</h3>
                <p class="step-card-desc">Ya tienes clientes y buscas profesionalizar la imagen de marca, aumentar conversión y multiplicar tickets.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionar</span>
                </div>
              </div>

              <!-- Stage 3 -->
              <div class="final-stage-card" data-stage-key="corporativo" data-stage-name="Consolidación Corporativa" data-stage-chip="Transformación">
                <div class="step-card-top">
                  <span class="step-card-icon">🏛️</span>
                  <span class="step-card-chip">Transformación</span>
                </div>
                <h3 class="step-card-title">Transformación Digital</h3>
                <p class="step-card-desc">Proyecto integral para marcas consolidadas: arquitectura headless, automatización y blindaje total.</p>
                <div class="step-card-footer">
                  <span class="step-card-radio"></span>
                  <span class="step-card-status">Seleccionar</span>
                </div>
              </div>

            </div>

            <!-- Step 2 Nav Bar -->
            <div class="final-step-nav-bar has-back">
              <button class="step-btn-back" id="btn-backto-step-1" data-cursor="hover">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Volver</span>
              </button>
              <button class="step-btn-next" id="btn-goto-step-3" data-cursor="hover">
                <span>Ver Diagnóstico y Opciones</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- ========================================================
               STEP 3: BLUEPRINT & DIRECT ACTION
               ======================================================== -->
          <div class="final-step-pane" data-step="3" id="step-pane-3">
            <header class="final-launch-header">
              <div class="final-launch-eyebrow">
                <span class="final-launch-dot"></span>
                <span>PASO 03 / 03 &middot; BLUEPRINT DE PROYECTO</span>
              </div>
              <h2 class="final-launch-title">
                CONFIGURACIÓN <span class="final-launch-accent">CALIBRADA</span>
              </h2>
              <p class="final-launch-sub">
                Tu diagnóstico preliminar está listo. Elige cómo prefieres recibir tu cotización oficial.
              </p>
            </header>

            <!-- Blueprint Ticket Card -->
            <div class="final-blueprint-ticket">
              <div class="blueprint-ticket-header">
                <div class="blueprint-stamp">
                  <span class="blueprint-dot"></span>
                  <span>DILO DIGITAL &middot; SPRINT BLUEPRINT</span>
                </div>
                <span class="blueprint-status-tag">DISPONIBILIDAD INMEDIATA</span>
              </div>

              <div class="blueprint-specs-grid">
                <div class="blueprint-spec-item">
                  <span class="blueprint-spec-label">Servicio</span>
                  <span class="blueprint-spec-val" id="bp-val-service">Branding &amp; Identidad</span>
                </div>
                <div class="blueprint-spec-sep"></div>
                <div class="blueprint-spec-item">
                  <span class="blueprint-spec-label">Etapa / Alcance</span>
                  <span class="blueprint-spec-val" id="bp-val-stage">Lanzamiento Express</span>
                </div>
                <div class="blueprint-spec-sep"></div>
                <div class="blueprint-spec-item">
                  <span class="blueprint-spec-label">Tiempo de Entrega</span>
                  <span class="blueprint-spec-val" id="bp-val-timeline">Sprint de 15 Días Hábiles</span>
                </div>
                <div class="blueprint-spec-sep"></div>
                <div class="blueprint-spec-item">
                  <span class="blueprint-spec-label">Garantía Dilo</span>
                  <span class="blueprint-spec-val">100% Satisfacción &amp; NDA</span>
                </div>
              </div>
            </div>

            <!-- Action Bar -->
            <div class="final-blueprint-actions">
              <button class="step-btn-back-link" id="btn-backto-step-2" data-cursor="hover">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Ajustar configuración</span>
              </button>

              <div class="final-blueprint-btns">
                <button class="final-launch-btn-primary" id="btn-open-modal-from-step3" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                  <span>Cotizar Online en 60s</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="final-launch-btn-wa" id="btn-wa-step3" data-cursor="hover">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                  </svg>
                  <span>Chatear por WhatsApp Directo</span>
                </a>
              </div>
            </div>

            <!-- Micro-Ribbon Guarantees -->
            <div class="final-launch-guarantees">
              <span>⚡ Diagnóstico Inicial en &lt; 20 min</span>
              <span class="final-launch-sep">&middot;</span>
              <span>🛡️ Blindaje Jurídico &amp; Acuerdo de Confidencialidad</span>
              <span class="final-launch-sep">&middot;</span>
              <span>⭐ Garantía de Entrega y Calidad Dilo</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
  `;
}

export function initFinalCtaEvents() {
  const trackerItems = document.querySelectorAll('.step-tracker-item');
  const panes = document.querySelectorAll('.final-step-pane');

  // Step 1 service cards
  const serviceCards = document.querySelectorAll('.final-step-card');
  const step1ChoiceLabel = document.getElementById('step1-current-choice');
  const btnGotoStep2 = document.getElementById('btn-goto-step-2');

  // Step 2 stage cards
  const stageCards = document.querySelectorAll('.final-stage-card');
  const btnBacktoStep1 = document.getElementById('btn-backto-step-1');
  const btnGotoStep3 = document.getElementById('btn-goto-step-3');

  // Step 3 blueprint elements
  const btnBacktoStep2 = document.getElementById('btn-backto-step-2');
  const bpValService = document.getElementById('bp-val-service');
  const bpValStage = document.getElementById('bp-val-stage');
  const bpValTimeline = document.getElementById('bp-val-timeline');
  const btnWaStep3 = document.getElementById('btn-wa-step3');

  // Configurator state
  let currentStep = 1;
  let selectedService = {
    key: 'branding',
    name: 'Branding & Identidad',
    timeline: 'Sprint de 15 Días Hábiles'
  };
  let selectedStage = {
    key: 'lanzamiento',
    name: 'Lanzamiento Express'
  };

  function updateWhatsAppUrl() {
    if (!btnWaStep3) return;
    const msg = `Hola Dilo Digital, configuré mi proyecto en su web: ${selectedService.name} (${selectedStage.name}). Me gustaría coordinar un diagnóstico inicial.`;
    btnWaStep3.href = `https://wa.me/525592441070?text=${encodeURIComponent(msg)}`;
  }

  function goToStep(targetStep) {
    if (targetStep < 1 || targetStep > 3) return;
    currentStep = targetStep;

    // 1. Update Panes
    panes.forEach(pane => {
      const stepNum = parseInt(pane.getAttribute('data-step') || '1', 10);
      if (stepNum === currentStep) {
        pane.classList.add('is-active');
      } else {
        pane.classList.remove('is-active');
      }
    });

    // 2. Update Tracker Items
    trackerItems.forEach(item => {
      const stepTarget = parseInt(item.getAttribute('data-step-target') || '1', 10);
      const circle = item.querySelector('.tracker-circle');
      const numSpan = item.querySelector('.tracker-num');

      item.classList.remove('is-active', 'is-done');

      if (stepTarget === currentStep) {
        item.classList.add('is-active');
        if (numSpan) numSpan.textContent = `${stepTarget}`;
      } else if (stepTarget < currentStep) {
        item.classList.add('is-done');
        if (numSpan) numSpan.textContent = '✓';
      } else {
        if (numSpan) numSpan.textContent = `${stepTarget}`;
      }
    });

    // 3. Update Step 3 Blueprint if navigating to Step 3
    if (currentStep === 3) {
      if (bpValService) bpValService.textContent = selectedService.name;
      if (bpValStage) bpValStage.textContent = selectedStage.name;
      if (bpValTimeline) bpValTimeline.textContent = selectedService.timeline;
      updateWhatsAppUrl();
    }
  }

  // --- STEP 1 INTERACTION ---
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => {
        c.classList.remove('is-selected');
        const st = c.querySelector('.step-card-status');
        if (st) st.textContent = 'Seleccionar';
      });

      card.classList.add('is-selected');
      const statusEl = card.querySelector('.step-card-status');
      if (statusEl) statusEl.textContent = 'Seleccionado';

      const sName = card.getAttribute('data-service-name') || 'Branding & Identidad';
      const sKey = card.getAttribute('data-service-key') || 'branding';
      const sTimeline = card.getAttribute('data-timeline') || 'Sprint de 15 Días Hábiles';

      selectedService = { key: sKey, name: sName, timeline: sTimeline };

      if (step1ChoiceLabel) {
        step1ChoiceLabel.textContent = sName;
      }
    });
  });

  btnGotoStep2?.addEventListener('click', () => {
    goToStep(2);
  });

  // --- STEP 2 INTERACTION ---
  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      stageCards.forEach(c => {
        c.classList.remove('is-selected');
        const st = c.querySelector('.step-card-status');
        if (st) st.textContent = 'Seleccionar';
      });

      card.classList.add('is-selected');
      const statusEl = card.querySelector('.step-card-status');
      if (statusEl) statusEl.textContent = 'Seleccionado';

      const stName = card.getAttribute('data-stage-name') || 'Lanzamiento Express';
      const stKey = card.getAttribute('data-stage-key') || 'lanzamiento';

      selectedStage = { key: stKey, name: stName };
    });
  });

  btnBacktoStep1?.addEventListener('click', () => {
    goToStep(1);
  });

  btnGotoStep3?.addEventListener('click', () => {
    goToStep(3);
  });

  // --- STEP 3 INTERACTION ---
  btnBacktoStep2?.addEventListener('click', () => {
    goToStep(2);
  });

  // --- TRACKER CLICK NAVIGATION ---
  trackerItems.forEach(item => {
    item.addEventListener('click', () => {
      const stepTarget = parseInt(item.getAttribute('data-step-target') || '1', 10);
      goToStep(stepTarget);
    });
  });

  // Initial WhatsApp setup
  updateWhatsAppUrl();
}
