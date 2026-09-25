// ================================================================
// REGISTRO DE MARCA IMPI — DIRECT PURCHASE & TRACKING FUNNEL
// Live Phonetic Sonar, 3-Tier Packages, Add-On Configurator, Live Tracker Simulator
// ================================================================

import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderImpiLandingView(initialQuery = '') {
  return `
    <main class="impi-page">

      <!-- 1. MONUMENTAL HERO WITH LIVE PHONETIC SONAR SCANNER -->
      <section class="impi-hero-section">
        <div class="impi-watermark-bg" aria-hidden="true">IMPI</div>
        <div class="impi-hero-container">

          <div class="impi-hero-header">
            <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 1.2rem;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">PROTECCIÓN LEGAL &middot; IMPI MÉXICO 100% ONLINE</span>
            </div>
            <h1 class="impi-hero-title">
              REGISTRA TU MARCA ANTE EL IMPI <span class="cat-hero-title-accent">EN LÍNEA</span>
            </h1>
            <p class="impi-hero-desc">
              Blindaje legal por 10 años en México. Análisis de viabilidad fonética gratuito en tiempo real, 
              trámite garantizado con abogados especialistas y portal de seguimiento 24/7.
            </p>
          </div>

          <!-- Live Phonetic Sonar Scanner -->
          <div class="impi-radar-card">
            <div class="impi-radar-badge-row">
              <div class="impi-radar-live-tag">
                <span class="impi-radar-pulse-dot"></span>
                <span>Radar Fonético Oficial &middot; 45 Clases NIZA</span>
              </div>
              <div style="font-family: var(--sm-font-body); font-size: 0.8rem; color: var(--text-tertiary); font-weight: 600;">
                Base de Datos IMPI Actualizada 2026
              </div>
            </div>

            <div class="impi-radar-input-grid">
              <input 
                type="text" 
                class="impi-input" 
                id="impi-search-name" 
                placeholder="Escribe el nombre de tu marca..." 
                value="${initialQuery}"
                required
              >

              <select class="impi-select" id="impi-search-class">
                <option value="Clase 35">Clase 35 (Comercio, Ventas, Publicidad, Ecommerce)</option>
                <option value="Clase 42">Clase 42 (Software, Tecnología, Apps, Web)</option>
                <option value="Clase 25">Clase 25 (Ropa, Calzado, Moda, Accesorios)</option>
                <option value="Clase 43">Clase 43 (Restaurantes, Alimentos, Cafeterías)</option>
                <option value="Clase 41">Clase 41 (Educación, Eventos, Cursos, Contenido)</option>
                <option value="No sé mi clase">Asesorarme en la clasificación exacta (Gratis)</option>
              </select>

              <button class="impi-radar-btn" id="btn-run-sonar" data-cursor="hover">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Analizar Viabilidad</span>
              </button>
            </div>

            <!-- Sonar Scan Result Feedback -->
            <div class="impi-scan-overlay" id="impi-scan-overlay">
              <div class="impi-scan-result-flex">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div class="impi-score-badge" id="impi-score-val">96%</div>
                  <div>
                    <div class="impi-score-title" id="impi-score-title">Marca Preliminarmente Viable para Registro</div>
                    <div class="impi-score-desc" id="impi-score-desc">
                      Sin anterioridades idénticas detectadas en la clase seleccionada. Puedes proceder con la compra y el depósito oficial.
                    </div>
                  </div>
                </div>

                <button class="btn btn-dark btn-sm" id="btn-jump-to-buy" data-cursor="hover">
                  Iniciar Registro Directo &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- 2. SCROLL-BASED 4-PHASE LEGAL METHODOLOGY -->
      <section class="impi-method-section">
        <div class="container">
          <div style="text-align: center; max-width: 680px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">METODOLOGÍA JURÍDICA DILO</span>
            </div>
            <h2 class="impi-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.8rem); margin-bottom: 0.6rem;">
              CÓMO BLINDAMOS TU MARCA <span class="cat-hero-title-accent">PASO A PASO</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              Un proceso riguroso respaldado por abogados especialistas en Propiedad Intelectual.
            </p>
          </div>

          <div class="impi-method-grid">
            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Fase 01 &middot; 24 Horas</div>
              <div class="impi-card-num-watermark">01</div>
              <h3 class="impi-card-phase-title">Búsqueda Fonética & Dictamen</h3>
              <p class="impi-card-phase-desc">
                Rastreo exhaustivo en las 45 clases NIZA y marcas vigentes para detectar similitudes antes de ingresar pagos ante el gobierno.
              </p>
            </div>

            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Fase 02 &middot; Día 2 a 3</div>
              <div class="impi-card-num-watermark">02</div>
              <h3 class="impi-card-phase-title">Depósito Digital Oficial</h3>
              <p class="impi-card-phase-desc">
                Pago de derechos oficiales ante el IMPI, generación de línea de captura SAT y radicación del expediente con número de folio oficial.
              </p>
            </div>

            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Fase 03 &middot; Mes 1 a 4</div>
              <div class="impi-card-num-watermark">03</div>
              <h3 class="impi-card-phase-title">Examen de Fondo & Gaceta</h3>
              <p class="impi-card-phase-desc">
                Publicación en la Gaceta de la Propiedad Industrial y contestación de avisos u oficios de forma incluidos sin honorarios extras.
              </p>
            </div>

            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Fase 04 &middot; Entrega</div>
              <div class="impi-card-num-watermark">04</div>
              <h3 class="impi-card-phase-title">Título de Marca por 10 Años</h3>
              <p class="impi-card-phase-desc">
                Expedición del Título de Registro de Marca con validez jurídica en toda la República Mexicana y derecho de uso exclusivo del símbolo ®.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. DIRECT PURCHASE PACKAGES & ADD-ON CUSTOMIZER -->
      <section class="impi-pricing-section" id="seccion-paquetes">
        <div class="container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">CONTRATACIÓN EN LÍNEA TRANSPARENTE</span>
            </div>
            <h2 class="impi-hero-title" style="font-size: clamp(2.2rem, 4.2vw, 3.8rem); margin-bottom: 0.6rem;">
              ELIGE TU PLAN DE <span class="cat-hero-title-accent">PROTECCIÓN LEGAL</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              Sin letras chiquitas. Precios netos en Moneda Nacional con factura fiscal 100% deducible.
            </p>
          </div>

          <div class="impi-pricing-grid">

            <!-- TIER 1 -->
            <div class="impi-tier-card" data-tier="dictamen" data-price="1490">
              <div class="impi-tier-name">Dictamen & Viabilidad Previa</div>
              <div class="impi-tier-concept">Para validar si tu nombre o logotipo es registrable antes de pagar derechos gubernamentales.</div>
              <div class="impi-price-wrap">
                <span class="impi-price-val">$1,490</span>
                <span class="impi-price-curr">MXN neto</span>
              </div>
              <ul class="impi-tier-features">
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Búsqueda fonética en base oficial IMPI</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Dictamen por abogado en &lt; 24 horas</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Recomendación de clases NIZA ideales</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>100% acreditable si contratas el registro</span>
                </li>
              </ul>
              <button class="impi-tier-select-btn" data-cursor="hover">Seleccionar Dictamen</button>
            </div>

            <!-- TIER 2 (FEATURED) -->
            <div class="impi-tier-card is-featured" data-tier="completo" data-price="6976">
              <div class="impi-featured-ribbon">MÁS ELEGIDO &middot; GARANTIZADO</div>
              <div class="impi-tier-name">Registro Completo IMPI (10 Años)</div>
              <div class="impi-tier-concept">Trámite integral de principio a fin. Incluye los derechos gubernamentales obligatorios.</div>
              <div class="impi-price-wrap">
                <span class="impi-price-val">$6,976</span>
                <span class="impi-price-curr">MXN neto</span>
              </div>
              <ul class="impi-tier-features">
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>$3,126.41 Derechos oficiales IMPI incluidos</strong></span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Búsqueda fonética y dictamen previo GRATIS</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Registro de Marca Mixta (Nombre + Logotipo)</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Contestación de oficios de forma sin costo extra</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Título oficial de registro por 10 años</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Portal de seguimiento 24/7 con folio</span>
                </li>
              </ul>
              <button class="impi-tier-select-btn" data-cursor="hover">Contratar Registro Completo</button>
            </div>

            <!-- TIER 3 -->
            <div class="impi-tier-card" data-tier="corporativo" data-price="11990">
              <div class="impi-tier-name">Blindaje Corporativo Multi-Clase</div>
              <div class="impi-tier-concept">Para empresas, franquicias o marcas con expansión a múltiples líneas de productos y servicios.</div>
              <div class="impi-price-wrap">
                <span class="impi-price-val">$11,990</span>
                <span class="impi-price-curr">MXN neto</span>
              </div>
              <ul class="impi-tier-features">
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>2 Clases NIZA completas incluidas</strong></span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Derechos oficiales de ambas clases cubiertos</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Vigilancia y monitoreo antipiratería por 1 año</span>
                </li>
                <li class="impi-tier-feature-item">
                  <svg class="impi-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Asesoría jurídica prioritaria y contrato de cesión</span>
                </li>
              </ul>
              <button class="impi-tier-select-btn" data-cursor="hover">Seleccionar Multi-Clase</button>
            </div>

          </div>

          <!-- Add-On Customizer Strip -->
          <div class="impi-addons-box">
            <div class="impi-addons-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Personaliza tu Blindaje con Servicios de Seguimiento & Protección Adicional</span>
            </div>

            <div class="impi-addons-grid">
              <label class="impi-addon-card" id="addon-label-monitoreo">
                <input type="checkbox" class="impi-addon-checkbox" id="addon-monitoreo" data-price="1850">
                <div class="impi-addon-meta">
                  <div class="impi-addon-name">Monitoreo Permanente 10 Años (Vigilancia de Marca)</div>
                  <div class="impi-addon-desc">Alertas automáticas en la Gaceta IMPI si un tercero intenta registrar un nombre idéntico o similar.</div>
                  <div class="impi-addon-price">+$1,850 MXN (Pago único 10 años)</div>
                </div>
              </label>

              <label class="impi-addon-card" id="addon-label-clase">
                <input type="checkbox" class="impi-addon-checkbox" id="addon-clase" data-price="3950">
                <div class="impi-addon-meta">
                  <div class="impi-addon-name">Clase NIZA Extra de Protección</div>
                  <div class="impi-addon-desc">Protege una segunda categoría (ej. clase de producto + clase de servicios o tienda online).</div>
                  <div class="impi-addon-price">+$3,950 MXN (Derechos + Gestión)</div>
                </div>
              </label>

              <label class="impi-addon-card" id="addon-label-cesion">
                <input type="checkbox" class="impi-addon-checkbox" id="addon-cesion" data-price="1200">
                <div class="impi-addon-meta">
                  <div class="impi-addon-name">Contrato Legal de Cesión de Logotipo</div>
                  <div class="impi-addon-desc">Blindaje legal de autoría para asegurar que el diseñador cede 100% de los derechos de explotación.</div>
                  <div class="impi-addon-price">+$1,200 MXN</div>
                </div>
              </label>
            </div>
          </div>

        </div>
      </section>

      <!-- 4. DIRECT CHECKOUT FUNNEL & DYNAMIC RECEIPT -->
      <section class="impi-checkout-section" id="seccion-checkout">
        <div class="container">
          <div class="impi-funnel-grid">

            <!-- Left: Checkout Form Steps -->
            <div style="background: #FFFFFF; border: 1px solid rgba(20, 23, 24, 0.08); border-radius: 24px; padding: clamp(1.8rem, 3vw, 2.5rem); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);">

              <div class="impi-steps-header">
                <div class="impi-step-tab is-active" id="tab-step-1">
                  <span class="impi-step-badge">1</span>
                  <span>Marca</span>
                </div>
                <div style="color: var(--text-tertiary); font-size: 0.8rem;">&rarr;</div>
                <div class="impi-step-tab" id="tab-step-2">
                  <span class="impi-step-badge">2</span>
                  <span>Titular</span>
                </div>
                <div style="color: var(--text-tertiary); font-size: 0.8rem;">&rarr;</div>
                <div class="impi-step-tab" id="tab-step-3">
                  <span class="impi-step-badge">3</span>
                  <span>Pago Seguro</span>
                </div>
              </div>

              <!-- STEP 1: MARCA -->
              <div id="step-1-form">
                <h3 style="font-family: var(--sm-font-body); font-size: 1.25rem; font-weight: 800; margin-bottom: 1.2rem;">
                  Paso 1: Información de la Marca
                </h3>

                <div class="impi-form-group">
                  <label class="impi-form-label">Nombre exacto de la marca a registrar</label>
                  <input type="text" class="impi-input" id="co-brand-name" placeholder="Ej. Solaria Coffee MX" value="${initialQuery}" required>
                </div>

                <div class="impi-form-group">
                  <label class="impi-form-label">Modalidad de Registro</label>
                  <div class="impi-type-radio-grid">
                    <div class="impi-radio-box is-selected" id="radio-mixta">
                      <input type="radio" name="impi-type" value="mixta" checked style="accent-color: var(--color-primary); display: none;">
                      <div class="impi-radio-box-title">★ Marca Mixta (Recomendado)</div>
                      <div class="impi-radio-box-desc">Protege tanto el nombre comercial como el diseño gráfico de tu logotipo.</div>
                    </div>

                    <div class="impi-radio-box" id="radio-nominativa">
                      <input type="radio" name="impi-type" value="nominativa" style="accent-color: var(--color-primary); display: none;">
                      <div class="impi-radio-box-title">Marca Nominativa</div>
                      <div class="impi-radio-box-desc">Solo protege las letras y la fonética del nombre sin diseño.</div>
                    </div>
                  </div>
                </div>

                <div class="impi-form-group">
                  <label class="impi-form-label">Descripción de productos o servicios que ampara</label>
                  <textarea class="impi-input" id="co-brand-desc" rows="3" placeholder="Ej. Cafetería, venta de café en grano, bebidas preparadas, tienda física y online."></textarea>
                </div>

                <button class="btn btn-primary btn-lg btn-glow" id="btn-next-to-step-2" style="width: 100%; justify-content: center;" data-cursor="hover">
                  <span>Continuar a Datos del Titular</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>

              <!-- STEP 2: TITULAR -->
              <div id="step-2-form" style="display: none;">
                <h3 style="font-family: var(--sm-font-body); font-size: 1.25rem; font-weight: 800; margin-bottom: 1.2rem;">
                  Paso 2: Datos de Quién Será Dueño de la Marca
                </h3>

                <div class="impi-form-group">
                  <label class="impi-form-label">Tipo de Persona Jurídica</label>
                  <div style="display: flex; gap: 1.5rem; font-family: var(--sm-font-body); font-size: 0.9rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                      <input type="radio" name="co-person-type" value="fisica" checked style="accent-color: var(--color-primary);">
                      <span style="font-weight: 600;">Persona Física (A nombre personal)</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                      <input type="radio" name="co-person-type" value="moral" style="accent-color: var(--color-primary);">
                      <span style="font-weight: 600;">Persona Moral (Empresa S.A. / S.A.P.I. / S.A.S.)</span>
                    </label>
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="impi-form-group">
                    <label class="impi-form-label">Nombre Completo o Razón Social</label>
                    <input type="text" class="impi-input" id="co-owner-name" placeholder="Ej. Ana Lucía Morales" required>
                  </div>
                  <div class="impi-form-group">
                    <label class="impi-form-label">RFC del Titular</label>
                    <input type="text" class="impi-input" id="co-owner-rfc" placeholder="RFC con homoclave" required>
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="impi-form-group">
                    <label class="impi-form-label">Correo para Notificaciones Oficiales</label>
                    <input type="email" class="impi-input" id="co-owner-email" placeholder="titular@tuempresa.com" required>
                  </div>
                  <div class="impi-form-group">
                    <label class="impi-form-label">WhatsApp de Contacto Directo</label>
                    <input type="tel" class="impi-input" id="co-owner-phone" placeholder="+52 55 0000 0000" required>
                  </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                  <button class="btn btn-outline" id="btn-back-to-step-1" data-cursor="hover">Atrás</button>
                  <button class="btn btn-primary btn-glow" id="btn-next-to-step-3" style="flex: 1; justify-content: center;" data-cursor="hover">
                    <span>Continuar a Pago & Confirmación</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

              <!-- STEP 3: PAGO -->
              <div id="step-3-form" style="display: none;">
                <h3 style="font-family: var(--sm-font-body); font-size: 1.25rem; font-weight: 800; margin-bottom: 1.2rem;">
                  Paso 3: Método de Pago Seguro & Facturación
                </h3>

                <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
                  <label style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1.5px solid var(--color-primary); background: rgba(255, 90, 31, 0.04); border-radius: 14px; cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                      <input type="radio" name="payment-method" value="card" checked style="accent-color: var(--color-primary);">
                      <div>
                        <div style="font-family: var(--sm-font-body); font-weight: 700; font-size: 0.95rem;">Tarjeta de Crédito / Débito (Stripe Seguro)</div>
                        <div style="font-family: var(--sm-font-body); font-size: 0.8rem; color: var(--text-secondary);">Visa, Mastercard, AMEX o 3 Meses sin Intereses</div>
                      </div>
                    </div>
                    <span class="badge badge-dark">Instantáneo</span>
                  </label>

                  <label style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1.5px solid rgba(20, 23, 24, 0.12); border-radius: 14px; cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                      <input type="radio" name="payment-method" value="spei" style="accent-color: var(--color-primary);">
                      <div>
                        <div style="font-family: var(--sm-font-body); font-weight: 700; font-size: 0.95rem;">Transferencia Bancaria (SPEI / Banco)</div>
                        <div style="font-family: var(--sm-font-body); font-size: 0.8rem; color: var(--text-secondary);">Línea de captura con CLABE Interbancaria BBVA</div>
                      </div>
                    </div>
                    <span class="badge" style="background: rgba(20, 23, 24, 0.06); color: var(--text-secondary);">Sin Comisión</span>
                  </label>
                </div>

                <div style="display: flex; gap: 1rem;">
                  <button class="btn btn-outline" id="btn-back-to-step-2" data-cursor="hover">Atrás</button>
                  <button class="impi-buy-btn" id="btn-complete-impi-order" data-cursor="hover">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span id="btn-buy-label">Confirmar & Pagar $6,976.41 MXN</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Right: Dynamic Sticky Receipt -->
            <div class="impi-receipt-card">
              <div class="impi-receipt-title">
                <span>Resumen de tu Orden</span>
                <span class="badge badge-primary" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Oficial IMPI</span>
              </div>

              <div class="impi-receipt-line">
                <span class="impi-receipt-line-lbl" id="rec-plan-name">Registro Completo IMPI (10 Años)</span>
                <span class="impi-receipt-line-val" id="rec-plan-price">$6,976.41 MXN</span>
              </div>

              <div class="impi-receipt-line">
                <span class="impi-receipt-line-lbl">&bull; Derechos Oficiales IMPI (con IVA)</span>
                <span class="impi-receipt-line-val" style="color: #10B981;">Incluidos</span>
              </div>

              <div class="impi-receipt-line">
                <span class="impi-receipt-line-lbl">&bull; Búsqueda Fonética Previa ($1,200)</span>
                <span class="impi-receipt-line-val" style="color: #10B981;">GRATIS</span>
              </div>

              <!-- Add-ons in receipt (dynamically shown) -->
              <div id="receipt-addons-container"></div>

              <div class="impi-receipt-total">
                <span class="impi-total-lbl">Total Neto</span>
                <span class="impi-total-num" id="rec-total-price">$6,976.41</span>
              </div>

              <div class="impi-guarantee-note">
                🔒 <strong>Garantía Dilo de Viabilidad:</strong> Si durante el dictamen previo nuestro abogado dictamina que la marca tiene riesgo alto de rechazo, te asesoramos sin costo en el rediseño o buscamos otra opción sin cobrarte un peso extra.
              </div>

              <div style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; font-family: var(--sm-font-body); font-size: 0.78rem; color: rgba(236, 238, 238, 0.6); font-weight: 600;">
                <span>✓ Abogados con Cédula</span>
                <span>&bull;</span>
                <span>Factura con CFDI</span>
                <span>&bull;</span>
                <span>+850 Marcas</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 5. CLIENT TRACKING PORTAL SIMULATOR -->
      <section class="impi-tracking-section">
        <div class="container">
          <div class="impi-tracking-box">
            <div class="impi-tracking-top">
              <div>
                <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 0.6rem;">
                  <span class="cat-diamond-dot"></span>
                  <span class="cat-tag-text">PORTAL DEL CLIENTE 24/7</span>
                </div>
                <h3 style="font-family: var(--sm-font-body); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.3px; color: #141718; margin-bottom: 0.3rem;">
                  Seguimiento de tu Expediente en Tiempo Real
                </h3>
                <p style="font-family: var(--sm-font-body); font-size: 0.92rem; color: var(--text-secondary);">
                  Una vez confirmada tu orden, recibes tus credenciales y folio único para consultar avances jurídicos en vivo.
                </p>
              </div>

              <div class="impi-folio-pill">
                <span>Expediente:</span>
                <span style="color: var(--color-primary);">IMPI-2026-9482-MX</span>
              </div>
            </div>

            <div class="impi-tracker-timeline">
              <div class="impi-tracker-step is-done">
                <div class="impi-step-status-tag">✓ Completado &middot; Día 1</div>
                <h4 class="impi-step-name">1. Dictamen Fonético</h4>
                <p class="impi-step-detail">Rastreo fonético en 45 clases sin anterioridades idénticas reportadas.</p>
              </div>

              <div class="impi-tracker-step is-done">
                <div class="impi-step-status-tag">✓ Completado &middot; Día 2</div>
                <h4 class="impi-step-name">2. Depósito Oficial IMPI</h4>
                <p class="impi-step-detail">Línea de captura SAT pagada y radicación del expediente oficial.</p>
              </div>

              <div class="impi-tracker-step is-current">
                <div class="impi-step-status-tag">● En Proceso Actual</div>
                <h4 class="impi-step-name">3. Examen de Fondo & Gaceta</h4>
                <p class="impi-step-detail">Publicación oficial y revisión de distintividad por examinadores del IMPI.</p>
              </div>

              <div class="impi-tracker-step">
                <div class="impi-step-status-tag" style="color: var(--text-tertiary);">Fase Final</div>
                <h4 class="impi-step-name">4. Entrega de Título Oficial</h4>
                <p class="impi-step-detail">Expedición del certificado de marca registrada válido por 10 años.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}

    </main>
  `;
}

export function initImpiEvents() {
  initFinalCtaEvents();

  // State Management for Dynamic Pricing
  let selectedTier = 'completo';
  let basePrice = 6976.41;
  let activeAddons = {
    monitoreo: false,
    clase: false,
    cesion: false
  };

  const addonPrices = {
    monitoreo: 1850,
    clase: 3950,
    cesion: 1200
  };

  const addonNames = {
    monitoreo: 'Monitoreo Permanente 10 Años',
    clase: 'Clase NIZA Adicional',
    cesion: 'Contrato de Cesión de Derechos'
  };

  function recalculateTotal() {
    let total = basePrice;
    const addonsContainer = document.getElementById('receipt-addons-container');
    if (!addonsContainer) return;

    addonsContainer.innerHTML = '';

    Object.keys(activeAddons).forEach(key => {
      if (activeAddons[key]) {
        total += addonPrices[key];
        const line = document.createElement('div');
        line.className = 'impi-receipt-line';
        line.innerHTML = `
          <span class="impi-receipt-line-lbl">+ ${addonNames[key]}</span>
          <span class="impi-receipt-line-val">$${addonPrices[key].toLocaleString()} MXN</span>
        `;
        addonsContainer.appendChild(line);
      }
    });

    const totalEl = document.getElementById('rec-total-price');
    const btnLabelEl = document.getElementById('btn-buy-label');
    const formatted = `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

    if (totalEl) totalEl.textContent = formatted.replace(' MXN', '');
    if (btnLabelEl) btnLabelEl.textContent = `Confirmar & Pagar ${formatted}`;
  }

  // Tier Card Selectors
  document.querySelectorAll('.impi-tier-card').forEach(card => {
    const btn = card.querySelector('.impi-tier-select-btn');
    const selectTier = () => {
      document.querySelectorAll('.impi-tier-card').forEach(c => c.classList.remove('is-featured'));
      card.classList.add('is-featured');

      selectedTier = card.dataset.tier;
      basePrice = parseFloat(card.dataset.price);

      const planNameEl = document.getElementById('rec-plan-name');
      const planPriceEl = document.getElementById('rec-plan-price');
      const tierTitle = card.querySelector('.impi-tier-name')?.textContent || '';

      if (planNameEl) planNameEl.textContent = tierTitle;
      if (planPriceEl) planPriceEl.textContent = `$${basePrice.toLocaleString()} MXN`;

      recalculateTotal();
      sounds.playPop();

      document.getElementById('seccion-checkout')?.scrollIntoView({ behavior: 'smooth' });
    };

    btn?.addEventListener('click', selectTier);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.impi-tier-select-btn')) {
        selectTier();
      }
    });
  });

  // Add-on Checkbox Listeners
  ['monitoreo', 'clase', 'cesion'].forEach(addonKey => {
    const chk = document.getElementById(`addon-${addonKey}`);
    const card = document.getElementById(`addon-label-${addonKey}`);
    chk?.addEventListener('change', () => {
      activeAddons[addonKey] = chk.checked;
      if (chk.checked) {
        card?.classList.add('is-checked');
        sounds.playPop();
      } else {
        card?.classList.remove('is-checked');
        sounds.playClick();
      }
      recalculateTotal();
    });
  });

  // Sonic Phonetic Radar Scanner
  const btnRunSonar = document.getElementById('btn-run-sonar');
  const searchInput = document.getElementById('impi-search-name');
  const scanOverlay = document.getElementById('impi-scan-overlay');
  const btnJumpToBuy = document.getElementById('btn-jump-to-buy');

  btnRunSonar?.addEventListener('click', () => {
    const brandName = searchInput?.value.trim();
    if (!brandName) {
      searchInput?.focus();
      return;
    }

    sounds.playClick();
    btnRunSonar.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      </svg>
      <span>Escaneando Clases...</span>
    `;

    setTimeout(() => {
      btnRunSonar.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span>Analizar Viabilidad</span>
      `;

      if (scanOverlay) {
        scanOverlay.style.display = 'block';
        sounds.playSuccess();
        const scoreTitle = document.getElementById('impi-score-title');
        const scoreDesc = document.getElementById('impi-score-desc');
        if (scoreTitle) scoreTitle.textContent = `"${brandName}" tiene 96% de Viabilidad Preliminar`;
        if (scoreDesc) scoreDesc.textContent = `No se detectaron marcas idénticas registradas en México. Clasificación NIZA optimizada para trámite directo.`;

        // Sync brand name into checkout form
        const coName = document.getElementById('co-brand-name');
        if (coName) coName.value = brandName;
      }
    }, 700);
  });

  btnJumpToBuy?.addEventListener('click', () => {
    document.getElementById('seccion-checkout')?.scrollIntoView({ behavior: 'smooth' });
    const coName = document.getElementById('co-brand-name');
    if (coName && searchInput?.value) {
      coName.value = searchInput.value;
    }
  });

  // Radio Box Modalidad Selection
  const radioMixta = document.getElementById('radio-mixta');
  const radioNominativa = document.getElementById('radio-nominativa');
  radioMixta?.addEventListener('click', () => {
    radioMixta.classList.add('is-selected');
    radioNominativa?.classList.remove('is-selected');
    sounds.playPop();
  });
  radioNominativa?.addEventListener('click', () => {
    radioNominativa.classList.add('is-selected');
    radioMixta?.classList.remove('is-selected');
    sounds.playPop();
  });

  // Funnel Step Switching
  const step1Form = document.getElementById('step-1-form');
  const step2Form = document.getElementById('step-2-form');
  const step3Form = document.getElementById('step-3-form');

  const tabStep1 = document.getElementById('tab-step-1');
  const tabStep2 = document.getElementById('tab-step-2');
  const tabStep3 = document.getElementById('tab-step-3');

  document.getElementById('btn-next-to-step-2')?.addEventListener('click', () => {
    const brandName = document.getElementById('co-brand-name')?.value.trim();
    if (!brandName) {
      alert('Por favor ingresa el nombre de la marca.');
      return;
    }
    sounds.playClick();
    step1Form.style.display = 'none';
    step2Form.style.display = 'block';
    tabStep1?.classList.remove('is-active');
    tabStep2?.classList.add('is-active');
  });

  document.getElementById('btn-back-to-step-1')?.addEventListener('click', () => {
    sounds.playClick();
    step2Form.style.display = 'none';
    step1Form.style.display = 'block';
    tabStep2?.classList.remove('is-active');
    tabStep1?.classList.add('is-active');
  });

  document.getElementById('btn-next-to-step-3')?.addEventListener('click', () => {
    const ownerName = document.getElementById('co-owner-name')?.value.trim();
    const ownerEmail = document.getElementById('co-owner-email')?.value.trim();
    if (!ownerName || !ownerEmail) {
      alert('Por favor completa el nombre del titular y correo de notificaciones.');
      return;
    }
    sounds.playClick();
    step2Form.style.display = 'none';
    step3Form.style.display = 'block';
    tabStep2?.classList.remove('is-active');
    tabStep3?.classList.add('is-active');
  });

  document.getElementById('btn-back-to-step-2')?.addEventListener('click', () => {
    sounds.playClick();
    step3Form.style.display = 'none';
    step2Form.style.display = 'block';
    tabStep3?.classList.remove('is-active');
    tabStep2?.classList.add('is-active');
  });

  // Complete Order & Launch Celebration
  document.getElementById('btn-complete-impi-order')?.addEventListener('click', () => {
    sounds.playSuccess();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.55 }
    });

    const brandName = document.getElementById('co-brand-name')?.value || 'Mi Marca';
    const ownerName = document.getElementById('co-owner-name')?.value || 'Titular';
    const ownerPhone = document.getElementById('co-owner-phone')?.value || 'No especificado';
    const totalText = document.getElementById('rec-total-price')?.textContent || '$6,976.41';

    let addonsList = [];
    if (activeAddons.monitoreo) addonsList.push('Monitoreo 10 Años');
    if (activeAddons.clase) addonsList.push('Clase NIZA Extra');
    if (activeAddons.cesion) addonsList.push('Cesión de Derechos');

    const folio = `IMPI-2026-${Math.floor(1000 + Math.random() * 9000)}-MX`;

    const whatsappMessage = `¡Hola Dilo Digital MX! ⚖️🛡️ Acabo de comprar el *Registro de Marca ante el IMPI* en línea:\n\n` +
      `• *Folio de Orden:* ${folio}\n` +
      `• *Marca a Registrar:* ${brandName}\n` +
      `• *Titular:* ${ownerName}\n` +
      `• *Teléfono:* ${ownerPhone}\n` +
      `• *Plan Seleccionado:* ${document.getElementById('rec-plan-name')?.textContent}\n` +
      (addonsList.length > 0 ? `• *Servicios Extra:* ${addonsList.join(', ')}\n` : '') +
      `• *Total Neto:* ${totalText} MXN\n\n` +
      `Deseo coordinar el envío de comprobantes fiscales y dar inicio al dictamen legal formal. ¡Gracias!`;

    const waUrl = `https://wa.me/525592441070?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      alert(`¡Orden ${folio} registrada con éxito! Te hemos redirigido a WhatsApp con nuestro abogado especialista en Propiedad Intelectual para coordinar pagos y expediente.`);
    }, 1200);
  });
}
