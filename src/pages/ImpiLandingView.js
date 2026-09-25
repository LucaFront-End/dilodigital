// ================================================================
// REGISTRO DE MARCA IMPI — DIRECT PURCHASE & TRACKING FUNNEL
// Live Phonetic Sonar, 3-Stage Coincidencias Scanner, Lead CMS & EasyLex Stages
// ================================================================

import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';
import { saveLeadToCms } from '../utils/LeadCms.js';

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
              Blindaje legal por 10 años en México. Análisis de coincidencias de marca en tiempo real, 
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
                placeholder="Escribe el nombre de tu marca (Ej. Nova Coffee)..." 
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
                <span>Analizar Coincidencias de Marca</span>
              </button>
            </div>

            <!-- Sonar Scan Feedback (3-Stage Animation & Dynamic Result Scenarios) -->
            <div class="impi-scan-overlay" id="impi-scan-overlay">
              
              <!-- 3-Stage Progress Box -->
              <div class="impi-scanning-box" id="impi-scanning-box" style="display: none;">
                <div class="impi-scan-brand-header">
                  <div class="impi-scan-brand-title">
                    Auditoría Fonética Oficial: <span id="scan-target-brand" style="color: #FF5A1F;"></span>
                  </div>
                  <span class="impi-scan-brand-tag">Barrido IMPI 2026</span>
                </div>

                <div class="impi-scan-progress-bar-wrap">
                  <div class="impi-scan-progress-bar-fill" id="scan-prog-fill"></div>
                </div>

                <div class="impi-scan-stages-grid">
                  <!-- Stage 1 -->
                  <div class="impi-scan-stage-item is-active" id="scan-stage-1">
                    <div class="impi-stage-icon-wrap" id="stage-icon-1">1</div>
                    <div class="impi-stage-meta">
                      <h5>Buscando coincidencias</h5>
                      <p>Rastreo de nombres idénticos en marcas registradas y solicitudes en trámite.</p>
                    </div>
                  </div>

                  <!-- Stage 2 -->
                  <div class="impi-scan-stage-item" id="scan-stage-2">
                    <div class="impi-stage-icon-wrap" id="stage-icon-2">2</div>
                    <div class="impi-stage-meta">
                      <h5>Analizando similitudes</h5>
                      <p>Evaluación fonética, gramatical e ideológica en las 45 clases NIZA.</p>
                    </div>
                  </div>

                  <!-- Stage 3 -->
                  <div class="impi-scan-stage-item" id="scan-stage-3">
                    <div class="impi-stage-icon-wrap" id="stage-icon-3">3</div>
                    <div class="impi-stage-meta">
                      <h5>Revisando posibles conflictos</h5>
                      <p>Detección de marcas notorias, anterioridades y riesgos de oposición.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Result Card (Green, Yellow, or Red) -->
              <div class="impi-result-card is-green" id="impi-result-card" style="display: none;">
                <div class="impi-result-top-flex">
                  <div class="impi-result-main-info">
                    <div class="impi-res-score-badge" id="res-score-badge">96%</div>
                    <div>
                      <div class="impi-res-title" id="res-title">No encontramos coincidencias exactas</div>
                      <div class="impi-res-desc" id="res-desc">
                        Tu marca tiene buenas señales iniciales. Realicemos una búsqueda de viabilidad completa antes de presentar tu solicitud.
                      </div>
                    </div>
                  </div>

                  <!-- Interactive Scenario Switcher for Verification -->
                  <div class="impi-scenario-switcher">
                    <span class="impi-scenario-pill-label">Probar:</span>
                    <button class="impi-scenario-pill-btn is-active" id="pill-opt-green" data-scenario="green">🟢 Sin coincidencias</button>
                    <button class="impi-scenario-pill-btn" id="pill-opt-yellow" data-scenario="yellow">🟡 Marcas similares</button>
                    <button class="impi-scenario-pill-btn" id="pill-opt-red" data-scenario="red">🔴 Coincidencia relevante</button>
                  </div>
                </div>

                <div class="impi-result-actions-flex">
                  <div style="font-size: 0.82rem; color: #475569; display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Datos registrados en CRM legal &middot; Expediente técnico preliminar generado</span>
                  </div>

                  <button class="btn-solicitar-viabilidad" id="btn-solicitar-viabilidad" data-cursor="hover">
                    <span>Solicitar análisis de viabilidad detallado</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- 2. EASYLEX-STYLE 4-STAGE OFFICIAL REGISTRATION PROCESS -->
      <section class="impi-method-section">
        <div class="container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">METODOLOGÍA JURÍDICA OFICIAL IMPI</span>
            </div>
            <h2 class="impi-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.8rem); margin-bottom: 0.6rem;">
              ETAPAS DEL REGISTRO DE MARCA <span class="cat-hero-title-accent">PASO A PASO</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              El proceso formal ante el Instituto Mexicano de la Propiedad Industrial, gestionado de principio a fin por abogados especializados.
            </p>
          </div>

          <div class="impi-method-grid">
            <!-- ETAPA 1 -->
            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Etapa 01 &middot; 24 Horas Hábiles</div>
              <div class="impi-card-num-watermark">01</div>
              <h3 class="impi-card-phase-title">Estudio de Viabilidad y Búsqueda Fonética</h3>
              <p class="impi-card-phase-desc">
                Revisamos en las 45 clases NIZA si tu marca es viable y si no existen nombres idénticos o similares fonéticamente que puedan ser un obstáculo ante el IMPI.
              </p>
            </div>

            <!-- ETAPA 2 -->
            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Etapa 02 &middot; Día 1 a 3</div>
              <div class="impi-card-num-watermark">02</div>
              <h3 class="impi-card-phase-title">Solicitud Formal y Pago de Derechos</h3>
              <p class="impi-card-phase-desc">
                Preparamos el expediente técnico formal, clasificamos tus productos o servicios y realizamos la presentación oficial con el pago de derechos federales SAT.
              </p>
            </div>

            <!-- ETAPA 3 -->
            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Etapa 03 &middot; Mes 1 a 4</div>
              <div class="impi-card-num-watermark">03</div>
              <h3 class="impi-card-phase-title">Examen de Forma, Fondo y Gaceta</h3>
              <p class="impi-card-phase-desc">
                El IMPI revisa los requisitos legales y publica la marca en la Gaceta de la Propiedad Industrial para el periodo de oposiciones. Damos seguimiento y atendemos cualquier aviso u oficio.
              </p>
            </div>

            <!-- ETAPA 4 -->
            <div class="impi-method-card">
              <div class="impi-card-phase-tag">Etapa 04 &middot; Resolución Oficial</div>
              <div class="impi-card-num-watermark">04</div>
              <h3 class="impi-card-phase-title">Obtención y Entrega del Título Oficial</h3>
              <p class="impi-card-phase-desc">
                Una vez aprobada la resolución por el IMPI, te entregamos tu Título de Registro de Marca oficial con vigencia de 10 años renovables en todo el territorio mexicano y uso exclusivo del símbolo ®.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2.5 IMPI REJECTION & REQUIREMENT RESCUE BANNER -->
      <section class="impi-rescue-section">
        <div class="container">
          <div class="impi-rescue-card">
            <div class="impi-rescue-content">
              <div class="impi-rescue-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span>Defensa Legal Especializada IMPI</span>
              </div>
              <h2 class="impi-rescue-title">¿Recibiste un requerimiento o rechazo del IMPI?</h2>
              <p class="impi-rescue-desc">
                No pierdas tu dinero ni des por perdida tu marca. Si solicitaste tu registro por tu cuenta o con otro despacho y el IMPI te notificó una <strong>cita de anterioridad, impedimento legal u oficio de forma</strong>, nuestros abogados contestan el requerimiento dentro del plazo fatal para defender tu derecho.
              </p>
            </div>

            <div class="impi-rescue-actions">
              <button class="btn-rescue-action" id="btn-open-req-banner" data-cursor="hover">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Atender Requerimiento / Rechazo del IMPI</span>
              </button>
              <div class="impi-rescue-guarantee-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Diagnóstico legal inicial sin costo &middot; Contestación en &lt; 72 horas</span>
              </div>
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
                    <label class="impi-form-label">RFC (Opcional para factura)</label>
                    <input type="text" class="impi-input" id="co-owner-rfc" placeholder="Ej. MOLA890412XX1">
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="impi-form-group">
                    <label class="impi-form-label">Teléfono / WhatsApp de Notificaciones</label>
                    <input type="tel" class="impi-input" id="co-owner-phone" placeholder="Ej. 55 1234 5678" required>
                  </div>
                  <div class="impi-form-group">
                    <label class="impi-form-label">Correo Electrónico</label>
                    <input type="email" class="impi-input" id="co-owner-email" placeholder="Ej. ana@miempresa.com" required>
                  </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                  <button class="btn btn-secondary btn-lg" id="btn-back-to-step-1" style="flex: 1; justify-content: center;">
                    &larr; Volver
                  </button>
                  <button class="btn btn-primary btn-lg btn-glow" id="btn-next-to-step-3" style="flex: 2; justify-content: center;">
                    <span>Revisar Resumen y Pago &rarr;</span>
                  </button>
                </div>
              </div>

              <!-- STEP 3: PAGO -->
              <div id="step-3-form" style="display: none;">
                <h3 style="font-family: var(--sm-font-body); font-size: 1.25rem; font-weight: 800; margin-bottom: 1.2rem;">
                  Paso 3: Métodos de Pago Seguros
                </h3>

                <div class="impi-payment-methods">
                  <div class="impi-pay-card is-selected">
                    <input type="radio" name="pay-method" value="spei" checked style="accent-color: var(--color-primary);">
                    <div>
                      <div style="font-weight: 700; color: #141718; font-size: 0.95rem;">Transferencia Bancaria SPEI / CLABE Directa (Sin comisión)</div>
                      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Confirmación inmediata y emisión de factura fiscal CFDI 4.0 al instante.</div>
                    </div>
                  </div>

                  <div class="impi-pay-card">
                    <input type="radio" name="pay-method" value="card" style="accent-color: var(--color-primary);">
                    <div>
                      <div style="font-weight: 700; color: #141718; font-size: 0.95rem;">Tarjeta de Crédito o Débito (Hasta 3 MSI con Visa / Mastercard)</div>
                      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Procesamiento seguro encriptado TLS 256-bit mediante Stripe México.</div>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1.8rem;">
                  <button class="btn btn-secondary btn-lg" id="btn-back-to-step-2" style="flex: 1; justify-content: center;">
                    &larr; Volver
                  </button>
                  <button class="impi-buy-btn" id="btn-complete-impi-order" style="flex: 2;">
                    <span>Confirmar y Blindar mi Marca 🔒</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Right: Real-time Order Summary Receipt -->
            <div class="impi-receipt-card">
              <div class="impi-receipt-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>Resumen de tu Orden</span>
              </div>

              <div class="impi-receipt-row">
                <span style="font-weight: 600;" id="rec-plan-name">Registro Completo IMPI (10 Años)</span>
                <span class="impi-receipt-row-val" id="rec-plan-price">$6,976.41</span>
              </div>

              <div id="receipt-addons-container">
                <!-- Dynamically injected active add-ons -->
              </div>

              <div class="impi-receipt-row">
                <span style="color: #10B981; font-weight: 600;">Derechos oficiales IMPI ($3,126.41)</span>
                <span style="color: #10B981; font-weight: 700;">INCLUIDO</span>
              </div>

              <div class="impi-receipt-total">
                <span class="impi-receipt-total-label">Total a Pagar:</span>
                <div style="text-align: right;">
                  <span class="impi-receipt-total-val" id="rec-total-price">$6,976.41</span>
                  <div style="font-size: 0.72rem; color: rgba(236, 238, 238, 0.5); font-weight: 600;">Moneda Nacional &middot; IVA incluido</div>
                </div>
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

      <!-- ======================================================== -->
      <!-- MODAL 1: LEAD INTAKE (Analizar Coincidencias de Marca)   -->
      <!-- ======================================================== -->
      <div class="dilo-modal-backdrop" id="modal-coincidencias">
        <div class="dilo-modal-dialog">
          <div class="dilo-modal-header">
            <button class="dilo-modal-close" id="btn-close-coincidencias-modal" aria-label="Cerrar modal">&times;</button>
            <div class="dilo-modal-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              <span>Auditoría Fonética Oficial IMPI</span>
            </div>
            <h3 class="dilo-modal-title">Analizar Coincidencias de Marca</h3>
            <p class="dilo-modal-subtitle">
              Ingresa tus datos para registrar la consulta técnica en el sistema y ejecutar el barrido en las 45 clases NIZA.
            </p>
          </div>

          <div class="dilo-modal-body">
            <form id="form-coincidencias-lead" class="dilo-modal-form-grid">
              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Nombre exacto de tu marca</label>
                <input 
                  type="text" 
                  class="dilo-modal-input" 
                  id="lead-brand-name" 
                  placeholder="Ej. Nova Coffee" 
                  value="${initialQuery}" 
                  required
                >
              </div>

              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Tu nombre completo</label>
                <input 
                  type="text" 
                  class="dilo-modal-input" 
                  id="lead-full-name" 
                  placeholder="Ej. Roberto González Garza" 
                  required
                >
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    class="dilo-modal-input" 
                    id="lead-phone" 
                    placeholder="Ej. 55 1234 5678" 
                    required
                  >
                </div>
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    class="dilo-modal-input" 
                    id="lead-email" 
                    placeholder="Ej. roberto@empresa.com" 
                    required
                  >
                </div>
              </div>

              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Clasificación NIZA estimada (Opcional)</label>
                <select class="dilo-modal-select" id="lead-class">
                  <option value="Clase 35">Clase 35 &middot; Comercio, Ecommerce, Servicios Empresariales</option>
                  <option value="Clase 42">Clase 42 &middot; Software, Apps, Desarrollo Web, Tecnología</option>
                  <option value="Clase 25">Clase 25 &middot; Ropa, Calzado, Moda, Textiles</option>
                  <option value="Clase 43">Clase 43 &middot; Cafeterías, Restaurantes, Alimentos Preparados</option>
                  <option value="Clase 41">Clase 41 &middot; Educación, Cursos, Eventos, Entretenimiento</option>
                  <option value="Sugerir por Abogado">No sé mi clase &middot; Recomendarme la adecuada</option>
                </select>
              </div>

              <div class="dilo-modal-security-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Registro confidencial encriptado. No genera antecedentes públicos ante el IMPI.</span>
              </div>

              <button type="submit" class="btn-modal-submit" id="btn-submit-coincidencias" data-cursor="hover">
                <span>Iniciar Análisis de Coincidencias</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL 2: REQUERIMIENTO O RECHAZO DEL IMPI RESCUE        -->
      <!-- ======================================================== -->
      <div class="dilo-modal-backdrop" id="modal-requerimiento">
        <div class="dilo-modal-dialog">
          <div class="dilo-modal-header">
            <button class="dilo-modal-close" id="btn-close-req-modal" aria-label="Cerrar modal">&times;</button>
            <div class="dilo-modal-badge" style="background: rgba(245, 158, 11, 0.15); color: #D97706;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon></svg>
              <span>Rescate Legal y Contestación de Oficios</span>
            </div>
            <h3 class="dilo-modal-title">Defensa ante Requerimiento o Rechazo del IMPI</h3>
            <p class="dilo-modal-subtitle">
              Evaluamos el oficio recibido y redactamos la contestación jurídica antes de que venza el plazo fatal.
            </p>
          </div>

          <div class="dilo-modal-body">
            <form id="form-requerimiento-lead" class="dilo-modal-form-grid">
              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Tu nombre completo o razón social</label>
                <input type="text" class="dilo-modal-input" id="req-full-name" placeholder="Ej. Mariana Soto Villalobos" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">WhatsApp de contacto</label>
                  <input type="tel" class="dilo-modal-input" id="req-phone" placeholder="Ej. 55 9876 5432" required>
                </div>
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">Correo electrónico</label>
                  <input type="email" class="dilo-modal-input" id="req-email" placeholder="Ej. mariana@empresa.com" required>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">Número de expediente / folio IMPI</label>
                  <input type="text" class="dilo-modal-input" id="req-expediente" placeholder="Ej. 2891402 / MX">
                </div>
                <div class="dilo-modal-field">
                  <label class="dilo-modal-label">Días restantes para contestar</label>
                  <select class="dilo-modal-select" id="req-plazo">
                    <option value="Menos de 15 días (Urgente)">Menos de 15 días (Urgente)</option>
                    <option value="15 a 30 días">15 a 30 días</option>
                    <option value="Más de 30 días">Más de 30 días</option>
                    <option value="No estoy seguro">No estoy seguro de la fecha</option>
                  </select>
                </div>
              </div>

              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Tipo de notificación u oficio</label>
                <select class="dilo-modal-select" id="req-tipo">
                  <option value="Cita de Anterioridad / Marca Similar">Cita de Anterioridad / Marca Similar (Impedimento legal)</option>
                  <option value="Requerimiento de Forma / Precisión de Productos">Requerimiento de Forma (Aclaración de actividades o logotipo)</option>
                  <option value="Oposición de un Tercero">Oposición presentada por otra empresa o marca</option>
                  <option value="Negativa o Rechazo Provisional">Negativa provisional o resolución de fondo</option>
                  <option value="Otro tipo de oficio">Otro tipo de requerimiento oficial</option>
                </select>
              </div>

              <div class="dilo-modal-field">
                <label class="dilo-modal-label">Comentarios o resumen del oficio</label>
                <textarea class="dilo-modal-textarea" id="req-desc" rows="2" placeholder="Describe brevemente qué solicitó el examinador o qué marca citaron como obstáculo..."></textarea>
              </div>

              <button type="submit" class="btn-modal-submit" id="btn-submit-req" style="background: #141718;" data-cursor="hover">
                <span>Solicitar Defensa Legal Inmediata</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" stroke-width="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

    </main>
  `;
}

export function initImpiEvents(autoOpenModal = false) {
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
    if (addonsContainer) addonsContainer.innerHTML = '';

    Object.keys(activeAddons).forEach(key => {
      if (activeAddons[key]) {
        total += addonPrices[key];
        if (addonsContainer) {
          const row = document.createElement('div');
          row.className = 'impi-receipt-row';
          row.innerHTML = `
            <span style="color: var(--text-secondary); font-size: 0.85rem;">+ ${addonNames[key]}</span>
            <span class="impi-receipt-row-val">+$${addonPrices[key].toLocaleString('es-MX')}</span>
          `;
          addonsContainer.appendChild(row);
        }
      }
    });

    const totalEl = document.getElementById('rec-total-price');
    if (totalEl) {
      totalEl.textContent = `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  // Tier Card Selection
  const tierCards = document.querySelectorAll('.impi-tier-card');
  tierCards.forEach(card => {
    const tier = card.dataset.tier;
    const price = parseFloat(card.dataset.price);

    const selectTier = () => {
      sounds.playClick();
      tierCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      selectedTier = tier;
      basePrice = price;

      const planNameEl = document.getElementById('rec-plan-name');
      const planPriceEl = document.getElementById('rec-plan-price');
      if (planNameEl) {
        if (tier === 'dictamen') planNameEl.textContent = 'Dictamen & Viabilidad Previa';
        else if (tier === 'completo') planNameEl.textContent = 'Registro Completo IMPI (10 Años)';
        else if (tier === 'corporativo') planNameEl.textContent = 'Blindaje Corporativo Multi-Clase';
      }
      if (planPriceEl) {
        planPriceEl.textContent = `$${price.toLocaleString('es-MX')}`;
      }
      recalculateTotal();
    };

    const btn = card.querySelector('.impi-tier-select-btn');
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      selectTier();
      document.getElementById('seccion-checkout')?.scrollIntoView({ behavior: 'smooth' });
    });

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

  // ================================================================
  // MODAL 1: LEAD INTAKE (Analizar Coincidencias de Marca)
  // ================================================================
  const modalCoincidencias = document.getElementById('modal-coincidencias');
  const btnCloseCoincidencias = document.getElementById('btn-close-coincidencias-modal');
  const btnRunSonar = document.getElementById('btn-run-sonar');
  const searchInput = document.getElementById('impi-search-name');
  const leadBrandInput = document.getElementById('lead-brand-name');
  const leadFullNameInput = document.getElementById('lead-full-name');
  const leadPhoneInput = document.getElementById('lead-phone');
  const leadEmailInput = document.getElementById('lead-email');
  const leadClassSelect = document.getElementById('lead-class');
  const formCoincidencias = document.getElementById('form-coincidencias-lead');

  function openCoincidenciasModal(prefilledBrand = '') {
    const brand = prefilledBrand || searchInput?.value.trim() || '';
    if (leadBrandInput) leadBrandInput.value = brand;
    modalCoincidencias?.classList.add('is-active');
    sounds.playClick();
    if (!brand) {
      leadBrandInput?.focus();
    } else {
      leadFullNameInput?.focus();
    }
  }

  function closeCoincidenciasModal() {
    modalCoincidencias?.classList.remove('is-active');
    sounds.playClick();
  }

  btnRunSonar?.addEventListener('click', (e) => {
    e.preventDefault();
    openCoincidenciasModal(searchInput?.value.trim());
  });

  btnCloseCoincidencias?.addEventListener('click', closeCoincidenciasModal);

  modalCoincidencias?.addEventListener('click', (e) => {
    if (e.target === modalCoincidencias) {
      closeCoincidenciasModal();
    }
  });

  // Auto open modal if requested via hash query (?open=coincidencias)
  if (autoOpenModal) {
    setTimeout(() => {
      openCoincidenciasModal(searchInput?.value.trim());
    }, 350);
  }

  // ================================================================
  // 3-STAGE SCANNING ANIMATION & 3 DYNAMIC RESULT SCENARIOS
  // ================================================================
  const scanOverlay = document.getElementById('impi-scan-overlay');
  const scanningBox = document.getElementById('impi-scanning-box');
  const resultCard = document.getElementById('impi-result-card');
  const scanTargetBrand = document.getElementById('scan-target-brand');
  const scanProgFill = document.getElementById('scan-prog-fill');

  const stage1 = document.getElementById('scan-stage-1');
  const stage2 = document.getElementById('scan-stage-2');
  const stage3 = document.getElementById('scan-stage-3');
  const icon1 = document.getElementById('stage-icon-1');
  const icon2 = document.getElementById('stage-icon-2');
  const icon3 = document.getElementById('stage-icon-3');

  const resScoreBadge = document.getElementById('res-score-badge');
  const resTitle = document.getElementById('res-title');
  const resDesc = document.getElementById('res-desc');
  const btnSolicitarViabilidad = document.getElementById('btn-solicitar-viabilidad');

  const pillGreen = document.getElementById('pill-opt-green');
  const pillYellow = document.getElementById('pill-opt-yellow');
  const pillRed = document.getElementById('pill-opt-red');

  let currentCapturedLead = null;
  let activeScenario = 'green';

  // Apply Scenario Content
  function setScenario(type, brandName = '') {
    activeScenario = type;
    const name = brandName || currentCapturedLead?.brandName || searchInput?.value.trim() || 'Tu Marca';

    // Update switcher pill classes
    [pillGreen, pillYellow, pillRed].forEach(p => p?.classList.remove('is-active'));
    resultCard?.classList.remove('is-green', 'is-yellow', 'is-red');

    if (type === 'green') {
      pillGreen?.classList.add('is-active');
      resultCard?.classList.add('is-green');
      if (resScoreBadge) resScoreBadge.textContent = '96%';
      if (resTitle) resTitle.textContent = '“No encontramos coincidencias exactas”';
      if (resDesc) resDesc.textContent = '“Tu marca tiene buenas señales iniciales. Realicemos una búsqueda de viabilidad completa antes de presentar tu solicitud.”';
    } else if (type === 'yellow') {
      pillYellow?.classList.add('is-active');
      resultCard?.classList.add('is-yellow');
      if (resScoreBadge) resScoreBadge.textContent = '64%';
      if (resTitle) resTitle.textContent = '“Encontramos marcas similares”';
      if (resDesc) resDesc.textContent = '“Detectamos nombres que podrían requerir una revisión más detallada.”';
    } else if (type === 'red') {
      pillRed?.classList.add('is-active');
      resultCard?.classList.add('is-red');
      if (resScoreBadge) resScoreBadge.textContent = '28%';
      if (resTitle) resTitle.textContent = '“Encontramos una coincidencia relevante”';
      if (resDesc) resDesc.textContent = '“Existen registros o solicitudes similares que debemos analizar antes de continuar.”';
    }
  }

  // Switcher Pill Clicks
  pillGreen?.addEventListener('click', () => { sounds.playClick(); setScenario('green'); });
  pillYellow?.addEventListener('click', () => { sounds.playClick(); setScenario('yellow'); });
  pillRed?.addEventListener('click', () => { sounds.playClick(); setScenario('red'); });

  // Determine initial scenario based on brand
  function evaluateBrandScenario(brand) {
    const b = brand.toLowerCase();
    const highRisk = ['nike', 'apple', 'starbucks', 'coca', 'dilo', 'amazon', 'zara', 'corona', 'bimbo', 'oxxo', 'walmart', 'gucci', 'ford'];
    const mediumRisk = ['digital', 'coffee', 'cafe', 'tech', 'nova', 'sol', 'luna', 'grupo', 'mexico', 'mx', 'studio', 'lab'];

    if (highRisk.some(w => b.includes(w))) return 'red';
    if (mediumRisk.some(w => b.includes(w))) return 'yellow';
    return 'green';
  }

  // Lead Form Submission
  formCoincidencias?.addEventListener('submit', (e) => {
    e.preventDefault();

    const brandName = leadBrandInput?.value.trim() || 'Mi Marca';
    const fullName = leadFullNameInput?.value.trim() || 'Cliente Dilo';
    const phone = leadPhoneInput?.value.trim() || '';
    const email = leadEmailInput?.value.trim() || '';
    const nizaClass = leadClassSelect?.value || 'Clase 35';

    const determinedScenario = evaluateBrandScenario(brandName);

    // Save lead in CMS
    currentCapturedLead = saveLeadToCms({
      name: fullName,
      phone: phone,
      email: email,
      brandName: brandName,
      nizaClass: nizaClass,
      statusScenario: determinedScenario,
      type: 'coincidencias',
      source: '#/registro-marca'
    });

    // Close modal
    closeCoincidenciasModal();

    // Sync values into radar and checkout form
    if (searchInput) searchInput.value = brandName;
    const coBrand = document.getElementById('co-brand-name');
    const coOwner = document.getElementById('co-owner-name');
    const coPhone = document.getElementById('co-owner-phone');
    const coEmail = document.getElementById('co-owner-email');
    if (coBrand) coBrand.value = brandName;
    if (coOwner) coOwner.value = fullName;
    if (coPhone) coPhone.value = phone;
    if (coEmail) coEmail.value = email;

    // Start 3-Stage Scanning Sequence
    if (scanOverlay) scanOverlay.style.display = 'block';
    if (scanningBox) scanningBox.style.display = 'block';
    if (resultCard) resultCard.style.display = 'none';
    if (scanTargetBrand) scanTargetBrand.textContent = `"${brandName}"`;

    scanOverlay?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Stage 1 Reset
    if (scanProgFill) scanProgFill.style.width = '33%';
    stage1?.classList.add('is-active'); stage1?.classList.remove('is-done');
    stage2?.classList.remove('is-active', 'is-done');
    stage3?.classList.remove('is-active', 'is-done');
    if (icon1) icon1.innerHTML = '1';
    if (icon2) icon2.innerHTML = '2';
    if (icon3) icon3.innerHTML = '3';
    sounds.playClick();

    // Stage 2: Analizando similitudes (after 900ms)
    setTimeout(() => {
      if (scanProgFill) scanProgFill.style.width = '66%';
      stage1?.classList.remove('is-active'); stage1?.classList.add('is-done');
      if (icon1) icon1.innerHTML = '✓';
      stage2?.classList.add('is-active');
      sounds.playPop();
    }, 900);

    // Stage 3: Revisando posibles conflictos (after 1800ms)
    setTimeout(() => {
      if (scanProgFill) scanProgFill.style.width = '100%';
      stage2?.classList.remove('is-active'); stage2?.classList.add('is-done');
      if (icon2) icon2.innerHTML = '✓';
      stage3?.classList.add('is-active');
      sounds.playPop();
    }, 1800);

    // Complete Sequence: Reveal Result Card (after 2700ms)
    setTimeout(() => {
      stage3?.classList.remove('is-active'); stage3?.classList.add('is-done');
      if (icon3) icon3.innerHTML = '✓';
      sounds.playSuccess();

      // Show Result Card
      setScenario(determinedScenario, brandName);
      if (scanningBox) scanningBox.style.display = 'none';
      if (resultCard) {
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (determinedScenario === 'green') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.4 }
        });
      }
    }, 2700);
  });

  // Button: "Solicitar análisis de viabilidad detallado"
  btnSolicitarViabilidad?.addEventListener('click', () => {
    sounds.playSuccess();
    const brand = currentCapturedLead?.brandName || searchInput?.value.trim() || 'Mi Marca';
    const name = currentCapturedLead?.name || '';
    const phone = currentCapturedLead?.phone || '';
    const scenarioMsg = resTitle?.textContent || 'Viabilidad';

    // Transfer info to checkout and scroll down
    const coBrand = document.getElementById('co-brand-name');
    if (coBrand && brand) coBrand.value = brand;

    document.getElementById('seccion-checkout')?.scrollIntoView({ behavior: 'smooth' });

    // Also trigger WhatsApp lead dispatch option
    const waText = `¡Hola Dilo Digital! ⚖️🛡️ Acabo de analizar las coincidencias de mi marca *${brand}* en su radar legal.\n\n` +
      `• *Resultado Preliminar:* ${scenarioMsg}\n` +
      (name ? `• *Titular:* ${name}\n` : '') +
      (phone ? `• *Teléfono:* ${phone}\n` : '') +
      `• *Estatus:* Deseo *Solicitar el análisis de viabilidad detallado* con sus abogados especialistas para proceder con la protección oficial.`;

    setTimeout(() => {
      const askWa = confirm(`¡Excelente! Hemos cargado los datos de "${brand}" en el checkout. ¿Deseas también enviar la solicitud de análisis de viabilidad directamente a WhatsApp con nuestro abogado especialista?`);
      if (askWa) {
        window.open(`https://wa.me/525592441070?text=${encodeURIComponent(waText)}`, '_blank');
      }
    }, 400);
  });

  // ================================================================
  // MODAL 2: REQUERIMIENTO O RECHAZO DEL IMPI RESCUE
  // ================================================================
  const modalReq = document.getElementById('modal-requerimiento');
  const btnOpenReqBanner = document.getElementById('btn-open-req-banner');
  const btnCloseReq = document.getElementById('btn-close-req-modal');
  const formReq = document.getElementById('form-requerimiento-lead');

  function openReqModal() {
    modalReq?.classList.add('is-active');
    sounds.playClick();
  }

  function closeReqModal() {
    modalReq?.classList.remove('is-active');
    sounds.playClick();
  }

  btnOpenReqBanner?.addEventListener('click', openReqModal);
  btnCloseReq?.addEventListener('click', closeReqModal);
  modalReq?.addEventListener('click', (e) => {
    if (e.target === modalReq) closeReqModal();
  });

  formReq?.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.playSuccess();

    const nombre = document.getElementById('req-full-name')?.value.trim() || 'Titular';
    const phone = document.getElementById('req-phone')?.value.trim() || '';
    const email = document.getElementById('req-email')?.value.trim() || '';
    const expediente = document.getElementById('req-expediente')?.value.trim() || 'Sin folio especificado';
    const plazo = document.getElementById('req-plazo')?.value || 'No especificado';
    const tipo = document.getElementById('req-tipo')?.value || 'Requerimiento IMPI';
    const desc = document.getElementById('req-desc')?.value.trim() || 'Sin comentarios adicionales';

    saveLeadToCms({
      name: nombre,
      phone: phone,
      email: email,
      brandName: expediente,
      notes: `Tipo: ${tipo} | Plazo: ${plazo} | Detalle: ${desc}`,
      type: 'rechazo_impi',
      statusScenario: 'rojo',
      source: '#/registro-marca-rescate'
    });

    closeReqModal();

    const waMsg = `¡Hola Dilo Digital! ⚠️⚖️ Recibí un requerimiento o rechazo del IMPI y requiero asistencia jurídica de rescate urgente:\n\n` +
      `• *Titular:* ${nombre}\n` +
      `• *Expediente / Folio IMPI:* ${expediente}\n` +
      `• *Tipo de Notificación:* ${tipo}\n` +
      `• *Plazo Restante:* ${plazo}\n` +
      `• *Teléfono:* ${phone}\n` +
      `• *Correo:* ${email}\n` +
      `• *Detalle del Oficio:* ${desc}\n\n` +
      `Solicito el diagnóstico de viabilidad y cotización para redactar la contestación oficial. ¡Gracias!`;

    window.open(`https://wa.me/525592441070?text=${encodeURIComponent(waMsg)}`, '_blank');
    alert('¡Tu solicitud de defensa legal ha sido registrada! Te hemos transferido a WhatsApp con un abogado de Propiedad Intelectual para evaluar tu oficio.');
  });

  // ================================================================
  // CHECKOUT FUNNEL LOGIC
  // ================================================================
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

    // Save purchase order to CMS
    saveLeadToCms({
      name: ownerName,
      phone: ownerPhone,
      email: document.getElementById('co-owner-email')?.value || '',
      brandName: brandName,
      notes: `Orden Pagada: ${folio} | Total: ${totalText} | Addons: ${addonsList.join(', ')}`,
      type: 'checkout',
      statusScenario: 'verde',
      source: '#/registro-marca-compra'
    });

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
