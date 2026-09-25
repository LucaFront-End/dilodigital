// Interactive Multi-Step Project Estimator & Cotizador Modal
import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';

export function renderEstimatorModal() {
  return `
    <div class="modal-overlay" id="cotizador-modal">
      <div class="modal-container" role="dialog" aria-labelledby="modal-title">
        <button class="modal-close-btn" id="modal-close-btn" aria-label="Cerrar ventana">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div style="margin-bottom: 1.5rem;">
          <span class="badge badge-primary" style="margin-bottom: 0.6rem;">Cotizador Dinámico</span>
          <h3 id="modal-title" style="font-size: 1.8rem; margin-bottom: 0.4rem;">Diseñemos tu estrategia</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary);">
            Selecciona los servicios que necesitas para obtener una propuesta personalizada en menos de 2 horas.
          </p>
        </div>

        <form id="estimator-form">
          <!-- Step 1: Services Selection -->
          <div class="form-group">
            <label class="form-label" style="font-weight: 700; margin-bottom: 0.8rem;">
              1. ¿Qué áreas de tu negocio deseas potenciar? (Selecciona una o más)
            </label>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.75rem;">
              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="Branding & Logotipo" data-base="14500" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">Branding & Logotipo</span>
              </label>

              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="Registro de Marca ante IMPI" data-base="6976" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">Registro de Marca IMPI</span>
              </label>

              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="Desarrollo Web / Wix Headless" data-base="22000" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">Desarrollo Web Headless</span>
              </label>

              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="Campañas Google & Meta Ads" data-base="16000" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">Pauta Meta & Google Ads</span>
              </label>

              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="Producción Video & UGC" data-base="18500" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">Producción Audiovisual & UGC</span>
              </label>

              <label class="service-check-pill" style="display: flex; align-items: center; gap: 0.7rem; padding: 0.85rem 1rem; border: 1px solid var(--border-medium); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s ease;">
                <input type="checkbox" name="services" value="SEO & Posicionamiento IA" data-base="12000" style="accent-color: var(--color-primary);">
                <span style="font-size: 0.9rem; font-weight: 600;">SEO & Posicionamiento IA</span>
              </label>
            </div>
          </div>

          <!-- Step 2: Timeline & Contact -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.2rem;">
            <div class="form-group">
              <label class="form-label">Tiempo estimado de lanzamiento</label>
              <select class="form-select" id="est-timeline">
                <option value="Lo antes posible (1 - 2 semanas)">Lo antes posible (1 - 2 semanas)</option>
                <option value="En el transcurso del mes" selected>En el transcurso del mes</option>
                <option value="En los próximos 2 a 3 meses">En los próximos 2 a 3 meses</option>
                <option value="Solo explorando opciones">Solo explorando opciones</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Nombre y Apellido</label>
              <input type="text" class="form-input" id="est-name" placeholder="Ej. Carlos Mendoza" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Empresa / Nombre de Marca</label>
              <input type="text" class="form-input" id="est-company" placeholder="Ej. Mendoza Studio" required>
            </div>

            <div class="form-group">
              <label class="form-label">WhatsApp o Teléfono</label>
              <input type="tel" class="form-input" id="est-phone" placeholder="+52 55 0000 0000" required>
            </div>
          </div>

          <!-- Dynamic Investment Estimate Banner -->
          <div style="background: var(--bg-subtle); padding: 1.2rem; border-radius: var(--radius-md); border: 1px dashed var(--border-medium); margin: 1rem 0 1.6rem 0; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 600; text-transform: uppercase; color: var(--text-secondary);">Presupuesto estimado de referencia</div>
              <div style="font-family: var(--font-display); font-size: 1.55rem; font-weight: 800; color: var(--color-primary);" id="est-price-display">
                $0 MXN
              </div>
            </div>
            <div style="text-align: right; font-size: 0.78rem; color: var(--text-tertiary); max-width: 220px;">
              *Sujeto a alcance y diagnóstico técnico personalizado.
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; gap: 1rem; align-items: center;">
            <button type="submit" class="btn btn-primary btn-lg btn-glow" style="flex: 1;" data-cursor="hover">
              <span>Enviar & Chatear por WhatsApp</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function initEstimatorEvents() {
  const modal = document.getElementById('cotizador-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('estimator-form');
  const priceDisplay = document.getElementById('est-price-display');

  // Listen to open event
  window.addEventListener('open-cotizador-modal', () => {
    modal?.classList.add('is-open');
    sounds.playPop();
  });

  // Close handlers
  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('is-open');
    sounds.playClick();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
    }
  });

  // Dynamic price calculation
  const checkboxes = form?.querySelectorAll('input[type="checkbox"][name="services"]');
  const updatePrice = () => {
    let total = 0;
    checkboxes?.forEach(cb => {
      const parentPill = cb.closest('.service-check-pill');
      if (cb.checked) {
        total += parseInt(cb.getAttribute('data-base') || '0', 10);
        parentPill.style.borderColor = 'var(--color-primary)';
        parentPill.style.backgroundColor = 'var(--color-primary-light)';
      } else {
        parentPill.style.borderColor = 'var(--border-medium)';
        parentPill.style.backgroundColor = 'transparent';
      }
    });

    if (priceDisplay) {
      if (total === 0) {
        priceDisplay.textContent = 'Selecciona servicios';
      } else {
        priceDisplay.textContent = `$${total.toLocaleString('es-MX')} MXN + IVA`;
      }
    }
  };

  checkboxes?.forEach(cb => {
    cb.addEventListener('change', () => {
      sounds.playClick();
      updatePrice();
    });
  });

  // Submit and WhatsApp redirect
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.playSuccess();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const name = document.getElementById('est-name').value;
    const company = document.getElementById('est-company').value;
    const phone = document.getElementById('est-phone').value;
    const timeline = document.getElementById('est-timeline').value;

    const selectedServices = [];
    checkboxes?.forEach(cb => {
      if (cb.checked) selectedServices.push(cb.value);
    });

    const msg = `¡Hola Dilo Digital MX! 👋\n\nMe gustaría cotizar un proyecto:\n• *Nombre:* ${name}\n• *Empresa / Marca:* ${company}\n• *Teléfono:* ${phone}\n• *Servicios:* ${selectedServices.length > 0 ? selectedServices.join(', ') : 'Asesoría general'}\n• *Timeline:* ${timeline}\n\n¿Podemos coordinar una llamada o propuesta? Gracias.`;

    const whatsappUrl = `https://wa.me/525592441070?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      modal?.classList.remove('is-open');
    }, 800);
  });
}
