// ================================================================
// DISCOUNT POPUP MODAL (10% OFF BIENVENIDA)
// Lead Capture Automático con Validación, Confetti y Términos
// Dilo Digital MX
// ================================================================

import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';

export function renderDiscountPopupModal() {
  return `
    <div class="disc-modal-overlay" id="discount-popup-modal" role="dialog" aria-modal="true" aria-labelledby="disc-modal-title">
      <div class="disc-modal-card">
        
        <!-- Close Button -->
        <button class="disc-close-btn" id="btn-close-discount-modal" aria-label="Cerrar oferta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Header Banner -->
        <div class="disc-header-strip">
          <div class="disc-badge-pill">
            <span>★ BENEFICIO DE BIENVENIDA</span>
          </div>
          <h3 class="disc-main-title" id="disc-modal-title">
            10% OFF<span class="disc-highlight-tag">*</span> EN TU PRIMER SERVICIO
          </h3>
          <p class="disc-subtitle">
            Completa tus datos y desbloquea un cupón de 10% de descuento directo para tu proyecto.
          </p>
        </div>

        <!-- Form Body -->
        <div class="disc-body" id="disc-modal-body">
          <form class="disc-form" id="discount-lead-form">
            
            <div class="disc-form-field">
              <label class="disc-label" for="disc-input-name">Nombre Completo *</label>
              <input type="text" id="disc-input-name" class="disc-input" required placeholder="Ej. Carlos Mendoza" autocomplete="name">
            </div>

            <div class="disc-form-field">
              <label class="disc-label" for="disc-input-phone">Teléfono / WhatsApp *</label>
              <input type="tel" id="disc-input-phone" class="disc-input" required placeholder="55 1234 5678" autocomplete="tel">
            </div>

            <div class="disc-form-field">
              <label class="disc-label" for="disc-input-email">Correo Electrónico *</label>
              <input type="email" id="disc-input-email" class="disc-input" required placeholder="carlos@empresa.com" autocomplete="email">
            </div>

            <button type="submit" class="disc-submit-btn" id="btn-submit-discount" data-cursor="hover">
              <span>Reclamar mi 10% OFF</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <!-- Exact User Disclaimer with Asterisk and Terms Link -->
            <p class="disc-disclaimer">
              *Aplica restricciones. Revisar <a href="#/terminos" id="disc-terms-link">términos y condiciones</a>.
            </p>

          </form>
        </div>

      </div>
    </div>
  `;
}

export function initDiscountPopupEvents() {
  const modal = document.getElementById('discount-popup-modal');
  const closeBtn = document.getElementById('btn-close-discount-modal');
  const form = document.getElementById('discount-lead-form');
  const bodyEl = document.getElementById('disc-modal-body');
  const termsLink = document.getElementById('disc-terms-link');

  if (!modal || !form) return;

  function closeModal() {
    modal.classList.remove('is-open');
    sessionStorage.setItem('dilo_discount_pop_dismissed', '1');
    sounds.playClick();
  }

  function openModal() {
    // Do not show on checkout or legal pages
    const hash = window.location.hash || '';
    if (hash.startsWith('#/checkout') || hash.startsWith('#/terminos') || hash.startsWith('#/privacidad')) {
      return;
    }
    // Check if dismissed or already claimed
    if (sessionStorage.getItem('dilo_discount_pop_dismissed') || localStorage.getItem('dilo_discount_pop_claimed')) {
      return;
    }
    modal.classList.add('is-open');
    sounds.playPop();
  }

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  termsLink?.addEventListener('click', () => {
    closeModal();
  });

  // Listen to manual open event
  window.addEventListener('open-discount-modal', () => {
    modal.classList.add('is-open');
    sounds.playPop();
  });

  // Automatic Trigger: 6 seconds after page load
  const timer = setTimeout(() => {
    openModal();
  }, 6000);

  // Desktop Exit Intent trigger
  let exitIntentTriggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 8 && !exitIntentTriggered) {
      exitIntentTriggered = true;
      openModal();
    }
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('disc-input-name')?.value.trim();
    const phone = document.getElementById('disc-input-phone')?.value.trim();
    const email = document.getElementById('disc-input-email')?.value.trim();

    if (!name || !phone || !email) return;

    // Save lead locally
    const leadData = { name, phone, email, date: new Date().toISOString() };
    localStorage.setItem('dilo_discount_lead', JSON.stringify(leadData));
    localStorage.setItem('dilo_discount_pop_claimed', '1');
    sessionStorage.setItem('dilo_discount_pop_dismissed', '1');

    // Confetti and celebratory sound
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    sounds.playSuccess();

    // Render Success View
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="disc-success-box">
          <div class="disc-success-icon">✓</div>
          <h4 class="disc-success-title">¡CUPÓN DESBLOQUEADO!</h4>
          <p class="disc-success-desc">
            Gracias <strong>${name}</strong>. Hemos registrado tu beneficio exclusivo de bienvenida:
          </p>

          <div class="disc-coupon-wrap">
            <span class="disc-coupon-code" id="disc-coupon-val">DILO10</span>
            <button type="button" class="disc-copy-btn" id="btn-copy-disc-coupon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span id="disc-copy-text">Copiar</span>
            </button>
          </div>

          <div class="disc-action-row">
            <button type="button" class="btn btn-primary btn-md btn-glow" id="btn-use-coupon-cotizador">
              <span>Cotizar con mi 10% OFF</span>
            </button>
            <button type="button" class="btn btn-outline btn-md" id="btn-finish-discount">
              <span>Cerrar</span>
            </button>
          </div>

          <p class="disc-disclaimer" style="margin-top: 1.2rem;">
            *Aplica restricciones. Revisar <a href="#/terminos" onclick="document.getElementById('discount-popup-modal')?.classList.remove('is-open');">términos y condiciones</a>.
          </p>
        </div>
      `;

      // Copy coupon handler
      document.getElementById('btn-copy-disc-coupon')?.addEventListener('click', () => {
        navigator.clipboard?.writeText('DILO10');
        const copyTxt = document.getElementById('disc-copy-text');
        if (copyTxt) copyTxt.textContent = '¡Copiado!';
        sounds.playClick();
        setTimeout(() => {
          if (copyTxt) copyTxt.textContent = 'Copiar';
        }, 2000);
      });

      // Use coupon in Cotizador
      document.getElementById('btn-use-coupon-cotizador')?.addEventListener('click', () => {
        modal.classList.remove('is-open');
        sounds.playClick();
        window.dispatchEvent(new CustomEvent('open-cotizador-modal'));
      });

      // Finish & Close
      document.getElementById('btn-finish-discount')?.addEventListener('click', () => {
        modal.classList.remove('is-open');
        sounds.playClick();
      });
    }
  });
}
