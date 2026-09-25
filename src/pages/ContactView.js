// ================================================================
// CONTACT VIEW ("CONTACTO") — DILO DIGITAL SIGNATURE EXPERIENCE
// Project Intake Form, Direct Access Cards, Live WhatsApp Dispatch, FAQ Hub
// ================================================================

import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderContactView() {
  return `
    <main class="ct-page">

      <!-- 1. MONUMENTAL HERO -->
      <section class="ct-hero-section">
        <div class="ct-watermark-bg" aria-hidden="true">HABLEMOS</div>
        <div class="ct-hero-container">
          <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 1.2rem;">
            <span class="cat-diamond-dot"></span>
            <span class="cat-tag-text">CONTACTO DIRECTO &middot; ATENCIÓN EN TIEMPO RÉCORD</span>
          </div>
          <h1 class="ct-hero-title">
            HABLEMOS DE TU PRÓXIMO <span class="cat-hero-title-accent">GRAN PROYECTO</span>
          </h1>
          <p class="ct-hero-desc">
            Cuéntanos tus metas comerciales. Analizamos tu modelo de negocio y te preparamos una propuesta 
            estratégica a la medida en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      <!-- 2. CONTACT MAIN GRID -->
      <section class="ct-main-section">
        <div class="container">
          <div class="ct-main-grid">

            <!-- Left: Interactive Project Intake Form -->
            <div class="ct-form-card">
              <h2 class="ct-form-title">Formulario de Inicio Rápido</h2>
              <p class="ct-form-subtitle">Completa los campos clave para conectarte con el director de área correspondiente.</p>

              <form id="contact-intake-form" onsubmit="return false;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="ct-field-group">
                    <label class="ct-label">Nombre Completo *</label>
                    <input type="text" class="ct-input" id="ct-name" placeholder="Ej. Carlos Mendoza" required>
                  </div>
                  <div class="ct-field-group">
                    <label class="ct-label">Empresa / Nombre de Marca *</label>
                    <input type="text" class="ct-input" id="ct-company" placeholder="Ej. Solaria Tech" required>
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="ct-field-group">
                    <label class="ct-label">Correo Empresarial *</label>
                    <input type="email" class="ct-input" id="ct-email" placeholder="carlos@solaria.com" required>
                  </div>
                  <div class="ct-field-group">
                    <label class="ct-label">WhatsApp de Contacto Directo *</label>
                    <input type="tel" class="ct-input" id="ct-phone" placeholder="+52 55 0000 0000" required>
                  </div>
                </div>

                <!-- Multi-select service pills -->
                <div class="ct-field-group">
                  <label class="ct-label">¿Qué disciplinas o servicios necesitas? (Selecciona uno o más)</label>
                  <div class="ct-service-pills-grid" id="ct-services-pills">
                    <span class="ct-service-pill is-active" data-service="Branding & Identidad">Branding & Identidad</span>
                    <span class="ct-service-pill" data-service="Registro de Marca IMPI">Registro de Marca IMPI</span>
                    <span class="ct-service-pill" data-service="Desarrollo Web Headless">Desarrollo Web Headless</span>
                    <span class="ct-service-pill" data-service="Meta & Google Ads">Meta & Google Ads</span>
                    <span class="ct-service-pill" data-service="Producción UGC & Audiovisual">Producción UGC & Video</span>
                    <span class="ct-service-pill" data-service="Consultoría Integral 360">Consultoría Integral 360°</span>
                  </div>
                </div>

                <!-- Budget Range Grid -->
                <div class="ct-field-group">
                  <label class="ct-label">Rango de Inversión Estimado</label>
                  <div class="ct-budget-grid" id="ct-budget-options">
                    <div class="ct-budget-option is-selected" data-budget="$15k - $30k MXN">
                      <span>●</span>
                      <span>$15,000 - $30,000 MXN</span>
                    </div>
                    <div class="ct-budget-option" data-budget="$30k - $60k MXN">
                      <span>●</span>
                      <span>$30,000 - $60,000 MXN</span>
                    </div>
                    <div class="ct-budget-option" data-budget="$60k - $120k MXN">
                      <span>●</span>
                      <span>$60,000 - $120,000 MXN</span>
                    </div>
                    <div class="ct-budget-option" data-budget="+$120k MXN">
                      <span>●</span>
                      <span>Más de $120,000 MXN</span>
                    </div>
                  </div>
                </div>

                <div class="ct-field-group">
                  <label class="ct-label">Cuéntanos sobre tu proyecto o reto actual</label>
                  <textarea class="ct-textarea" id="ct-notes" rows="3" placeholder="Ej. Buscamos relanzar nuestra marca, rediseñar el ecommerce y lanzar pauta en Meta para triplicar pedidos este trimestre."></textarea>
                </div>

                <button class="ct-submit-btn" id="btn-submit-contact" type="button" data-cursor="hover">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>Enviar Solicitud & Iniciar en WhatsApp</span>
                </button>
              </form>
            </div>

            <!-- Right: Direct Access Stream -->
            <div class="ct-cards-stream">

              <!-- WhatsApp Direct Priority Card -->
              <div class="ct-direct-card is-whatsapp">
                <div class="ct-direct-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                  </svg>
                </div>
                <h3 class="ct-direct-title">WhatsApp de Respuesta Rápida</h3>
                <p class="ct-direct-desc">
                  ¿Necesitas una respuesta hoy mismo? Comunícate de forma directa con nuestro equipo de dirección de cuentas.
                </p>
                <a href="https://wa.me/525592441070?text=${encodeURIComponent('Hola Dilo Digital MX, me gustaría cotizar un proyecto.')}" target="_blank" rel="noopener" class="ct-direct-link" data-cursor="hover">
                  <span>Abrir Chat (+52 55 9244 1070) &rarr;</span>
                </a>
              </div>

              <!-- Email Card -->
              <div class="ct-direct-card">
                <div class="ct-direct-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 class="ct-direct-title">Correos Oficiales</h3>
                <p class="ct-direct-desc">Para briefs ejecutivos, licitaciones, RFP o contacto corporativo directo.</p>
                <a href="mailto:hola@dilodigitalmx.com" class="ct-direct-link" data-cursor="hover">
                  <span>hola@dilodigitalmx.com &rarr;</span>
                </a>
              </div>

              <!-- Location Card -->
              <div class="ct-direct-card">
                <div class="ct-direct-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 class="ct-direct-title">Sede Central Ciudad de México</h3>
                <p class="ct-direct-desc">
                  Hub Creativo y Legal en Ciudad de México. Atención con cita previa o reuniones estratégicas por Google Meet.
                </p>
                <span style="font-family: var(--sm-font-body); font-size: 0.84rem; font-weight: 700; color: var(--text-tertiary);">
                  Horario: Lunes a Viernes &middot; 9:00 AM a 7:00 PM CST
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- 3. FREQUENTLY ASKED QUESTIONS -->
      <section class="ct-faq-section">
        <div class="container">
          <div style="text-align: center; max-width: 680px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">TRANSPARENCIA TOTAL</span>
            </div>
            <h2 class="ct-hero-title" style="font-size: clamp(2rem, 3.8vw, 3.4rem); margin-bottom: 0.6rem;">
              PREGUNTAS <span class="cat-hero-title-accent">FRECUENTES</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1rem;">
              Todo lo que necesitas saber antes de iniciar tu proyecto con Dilo Digital.
            </p>
          </div>

          <div class="ct-faq-grid">
            <div class="ct-faq-card">
              <h3 class="ct-faq-q">¿En cuánto tiempo recibo una propuesta formal?</h3>
              <p class="ct-faq-a">
                Respondemos en menos de 15 minutos vía WhatsApp para aclarar dudas iniciales y entregamos una cotización detallada con tiempos de entrega en menos de 24 horas hábiles.
              </p>
            </div>

            <div class="ct-faq-card">
              <h3 class="ct-faq-q">¿Emiten factura fiscal deducible en México?</h3>
              <p class="ct-faq-a">
                Sí. Todos nuestros servicios (Branding, IMPI, Web y Pauta) son 100% deducibles de impuestos y se emiten con factura fiscal CFDI con desglose de IVA oficial.
              </p>
            </div>

            <div class="ct-faq-card">
              <h3 class="ct-faq-q">¿Trabajan con empresas fuera de México?</h3>
              <p class="ct-faq-a">
                Por supuesto. Gestionamos marcas en Estados Unidos, España, Colombia, Chile y México. Procesamos pagos internacionales con Stripe en USD y coordinamos entregas por Google Meet.
              </p>
            </div>

            <div class="ct-faq-card">
              <h3 class="ct-faq-q">¿Cómo se dividen los pagos de un proyecto?</h3>
              <p class="ct-faq-a">
                Manejamos esquema de 50% de anticipo para arrancar la producción y 50% de liquidación contra entrega final de archivos y manuales, o 100% de contado con descuento especial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}

    </main>
  `;
}

export function initContactEvents() {
  initFinalCtaEvents();

  // Multi-select Service Pills
  const servicePills = document.querySelectorAll('#ct-services-pills .ct-service-pill');
  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('is-active');
      sounds.playPop();
    });
  });

  // Budget Options Radio Selection
  const budgetOptions = document.querySelectorAll('#ct-budget-options .ct-budget-option');
  let selectedBudget = '$15k - $30k MXN';
  budgetOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      budgetOptions.forEach(b => b.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      selectedBudget = opt.dataset.budget;
      sounds.playPop();
    });
  });

  // Submit Contact Form
  const btnSubmit = document.getElementById('btn-submit-contact');
  btnSubmit?.addEventListener('click', () => {
    const name = document.getElementById('ct-name')?.value.trim();
    const company = document.getElementById('ct-company')?.value.trim();
    const email = document.getElementById('ct-email')?.value.trim();
    const phone = document.getElementById('ct-phone')?.value.trim();
    const notes = document.getElementById('ct-notes')?.value.trim() || 'No se incluyeron notas adicionales';

    if (!name || !company || !email || !phone) {
      alert('Por favor completa los campos obligatorios: Nombre, Empresa, Correo y WhatsApp.');
      return;
    }

    // Collect active services
    const activeServices = [];
    document.querySelectorAll('#ct-services-pills .ct-service-pill.is-active').forEach(p => {
      activeServices.push(p.dataset.service);
    });

    const servicesText = activeServices.length > 0 ? activeServices.join(', ') : 'Servicio General';

    sounds.playSuccess();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 }
    });

    const whatsappMessage = `¡Hola Dilo Digital MX! 👋 Acabo de enviar el *Formulario de Contacto* desde la web:\n\n` +
      `• *Nombre:* ${name}\n` +
      `• *Empresa / Marca:* ${company}\n` +
      `• *Correo:* ${email}\n` +
      `• *WhatsApp:* ${phone}\n` +
      `• *Servicios de Interés:* ${servicesText}\n` +
      `• *Presupuesto Estimado:* ${selectedBudget}\n` +
      `• *Notas del Proyecto:* ${notes}\n\n` +
      `¿Podemos coordinar una llamada o propuesta inicial? ¡Gracias!`;

    const waUrl = `https://wa.me/525592441070?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      alert('¡Mensaje enviado con éxito! Te hemos redirigido a WhatsApp con un estratega senior para atender tu solicitud de inmediato.');
    }, 1000);
  });
}
