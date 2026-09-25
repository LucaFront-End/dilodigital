// ================================================================
// BRANDING & IDENTIDAD — DIRECT PURCHASE & TRACKING FUNNEL
// Live Brand Moodboard, 3-Tier Packages, Brand Guardianship Tracker, Direct Checkout
// ================================================================

import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderBrandingPurchaseView() {
  return `
    <main class="bp-page">

      <!-- 1. MONUMENTAL HERO WITH INTERACTIVE BRAND MOODBOARD -->
      <section class="bp-hero-section">
        <div class="bp-watermark-bg" aria-hidden="true">BRAND</div>
        <div class="bp-hero-container">

          <div class="bp-hero-grid">
            <div>
              <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 1.2rem;">
                <span class="cat-diamond-dot"></span>
                <span class="cat-tag-text">DISEÑO DE MARCA &middot; COMPRA DIRECTA EN LÍNEA</span>
              </div>
              <h1 class="bp-hero-title">
                CREAMOS MARCAS QUE DOMINAN <span class="cat-hero-title-accent">SU MERCADO</span>
              </h1>
              <p class="bp-hero-desc">
                Identidades visuales memorables, manuales de marca de nivel internacional y sistemas gráficos listos para escalar ventas. 
                Selecciona tu paquete, personaliza entregables y da seguimiento semana a semana a tu proyecto.
              </p>

              <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <a href="#seccion-paquetes-branding" class="btn btn-primary btn-lg btn-glow" data-cursor="hover">
                  <span>Ver Paquetes & Precios</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="#seccion-tracking-branding" class="btn btn-outline" data-cursor="hover">
                  <span>Cómo Funciona el Seguimiento &rarr;</span>
                </a>
              </div>
            </div>

            <!-- Interactive Brand Moodboard Live Previewer -->
            <div class="bp-mood-preview-box" id="bp-mood-box">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-family: var(--sm-font-body); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(236, 238, 238, 0.6);">
                  Dirección de Arte Interactiva
                </span>
                <span class="badge badge-primary" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">Figma 60fps</span>
              </div>

              <!-- Style Switcher Tabs -->
              <div class="bp-mood-nav">
                <button class="bp-mood-btn is-active" data-mood="obsidian">Obsidian Modern</button>
                <button class="bp-mood-btn" data-mood="minimal">Studio Minimal</button>
                <button class="bp-mood-btn" data-mood="luxury">Editorial Luxury</button>
              </div>

              <div class="bp-mockup-display" id="bp-mockup-canvas">
                <div class="bp-mockup-logo-mark" id="bp-mockup-title">DILO.</div>
                <div class="bp-mockup-subtitle" id="bp-mockup-sub">Visual Systems & Branding</div>

                <div class="bp-mockup-swatches">
                  <span class="bp-swatch" id="swatch-1" style="background: #FF5A1F;"></span>
                  <span class="bp-swatch" id="swatch-2" style="background: #141718;"></span>
                  <span class="bp-swatch" id="swatch-3" style="background: #00A8A0;"></span>
                  <span class="bp-swatch" id="swatch-4" style="background: #ECEEEE;"></span>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.2rem; font-family: var(--sm-font-body); font-size: 0.78rem; color: rgba(236, 238, 238, 0.6);">
                <span>Tipografía: Plus Jakarta Sans</span>
                <span>Entrega en AI, SVG, PNG & PDF</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- 2. SCROLL-BASED BRAND ANATOMY EXPERIENCE -->
      <section class="bp-anatomy-section">
        <div class="container">
          <div style="text-align: center; max-width: 680px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">ANATOMÍA DEL BRANDING</span>
            </div>
            <h2 class="bp-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.8rem); margin-bottom: 0.6rem;">
              LOS 5 PILARES DE UNA <span class="cat-hero-title-accent">MARCA MEMORABLE</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              Cada paquete que adquieres en Dilo Digital se construye con una metodología técnica diseñada para maximizar el recuerdo y la autoridad de marca.
            </p>
          </div>

          <div class="bp-anatomy-grid">
            <div class="bp-anatomy-card">
              <div class="bp-anatomy-num">01</div>
              <h3 class="bp-anatomy-title">ADN & Naming Estratégico</h3>
              <p class="bp-anatomy-desc">Investigación de audiencias, concepto diferencial, naming fonético y tono de voz corporativo.</p>
            </div>

            <div class="bp-anatomy-card">
              <div class="bp-anatomy-num">02</div>
              <h3 class="bp-anatomy-title">Sistema de Logotipo</h3>
              <p class="bp-anatomy-desc">Isotipo, imagotipo, logotipo responsive y versiones de alto contraste para soportes físicos y digitales.</p>
            </div>

            <div class="bp-anatomy-card">
              <div class="bp-anatomy-num">03</div>
              <h3 class="bp-anatomy-title">Jerarquía Tipográfica</h3>
              <p class="bp-anatomy-desc">Curaduría de fuentes web y print con licencias comerciales para títulos monumentales y cuerpo de texto.</p>
            </div>

            <div class="bp-anatomy-card">
              <div class="bp-anatomy-num">04</div>
              <h3 class="bp-anatomy-title">Paleta Cromática & Contraste</h3>
              <p class="bp-anatomy-desc">Fórmulas cromáticas exactas en HEX, RGB, CMYK y Pantone probadas bajo normas de accesibilidad visual.</p>
            </div>

            <div class="bp-anatomy-card">
              <div class="bp-anatomy-num">05</div>
              <h3 class="bp-anatomy-title">Manual de Identidad 40+ Págs</h3>
              <p class="bp-anatomy-desc">Biblia corporativa con retículas, zonas de protección, aplicaciones en papelería y reglas de uso estricto.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. DIRECT PURCHASE PACKAGES & BRAND GUARDIANSHIP -->
      <section class="bp-pricing-section" id="seccion-paquetes-branding">
        <div class="container">
          <div style="text-align: center; max-width: 720px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">PAQUETES CON COMPRA DIRECTA</span>
            </div>
            <h2 class="bp-hero-title" style="font-size: clamp(2.2rem, 4.2vw, 3.8rem); margin-bottom: 0.6rem;">
              ELIGE TU PAQUETE DE <span class="cat-hero-title-accent">BRANDING PROFESIONAL</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              Precios cerrados, tiempos de entrega garantizados por contrato y factura fiscal con CFDI deducible.
            </p>
          </div>

          <div class="bp-pricing-grid">

            <!-- TIER 1 -->
            <div class="bp-tier-card" data-tier="starter" data-price="8900">
              <div class="bp-tier-name">Brand Identity Starter</div>
              <div class="bp-tier-delivery">⏱ Entrega en 7 días hábiles</div>
              <div class="bp-tier-concept">Ideal para startups o proyectos en fase de lanzamiento que necesitan identidad sólida y rápida.</div>
              <div class="bp-price-wrap">
                <span class="bp-price-val">$8,900</span>
                <span class="bp-price-curr">MXN neto</span>
              </div>
              <ul class="bp-tier-features">
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>2 propuestas conceptuales de logotipo</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Paleta cromática (HEX, CMYK, Pantone)</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Curaduría de fuentes web & corporativas</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Mini Brand Guidelines (15 páginas)</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Kit de avatares para redes sociales</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Archivos vectoriales (AI, SVG, PNG, PDF)</span>
                </li>
              </ul>
              <button class="bp-tier-select-btn" data-cursor="hover">Seleccionar Starter</button>
            </div>

            <!-- TIER 2 (FEATURED) -->
            <div class="bp-tier-card is-featured" data-tier="ecosistema" data-price="16500">
              <div class="bp-featured-ribbon">MÁS ELEGIDO &middot; RECOMENDADO</div>
              <div class="bp-tier-name">Ecosistema Visual 360°</div>
              <div class="bp-tier-delivery">⏱ Entrega en 14 días hábiles</div>
              <div class="bp-tier-concept">Para empresas consolidadas que buscan una transformación de marca completa y lista para venta.</div>
              <div class="bp-price-wrap">
                <span class="bp-price-val">$16,500</span>
                <span class="bp-price-curr">MXN neto</span>
              </div>
              <ul class="bp-tier-features">
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>3 propuestas conceptuales completas</strong></span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Manual de Identidad de 40+ páginas</strong></span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Papelería corporativa premium (tarjetas, firmas)</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>12 plantillas editables para redes (Figma/Canva)</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Kit de favicons, app icons y sellos vectoriales</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Sesión 1 a 1 de entrega estratégica por Meet</span>
                </li>
              </ul>
              <button class="bp-tier-select-btn" data-cursor="hover">Contratar Ecosistema 360°</button>
            </div>

            <!-- TIER 3 -->
            <div class="bp-tier-card" data-tier="flagship" data-price="28900">
              <div class="bp-tier-name">Flagship Brand & Digital</div>
              <div class="bp-tier-delivery">⏱ Entrega en 21 días hábiles</div>
              <div class="bp-tier-concept">La solución definitiva: identidad corporativa 360°, diseño UI digital y blindaje legal IMPI integrado.</div>
              <div class="bp-price-wrap">
                <span class="bp-price-val">$28,900</span>
                <span class="bp-price-curr">MXN neto</span>
              </div>
              <ul class="bp-tier-features">
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Todo lo incluido en Ecosistema Visual 360°</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Diseño UI de Landing Page en Figma (Desktop & Mobile)</strong></span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Renders 3D o mockups fotorrealistas de producto</span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Registro de Marca ante el IMPI incluido (Ahorro $6,976)</strong></span>
                </li>
                <li class="bp-tier-feature-item">
                  <svg class="bp-tier-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Soporte prioritario y asesoría de marca por 60 días</span>
                </li>
              </ul>
              <button class="bp-tier-select-btn" data-cursor="hover">Seleccionar Flagship</button>
            </div>

          </div>

          <!-- Add-On Customizer & Guardianship Service -->
          <div class="bp-addons-box">
            <div class="bp-addons-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Personaliza tu Pedido con Servicios de Seguimiento & Blindaje Adicional</span>
            </div>

            <div class="bp-addons-grid">
              <label class="bp-addon-card" id="addon-bp-guardianship-card">
                <input type="checkbox" class="bp-addon-checkbox" id="addon-bp-guardianship" data-price="4500">
                <div class="bp-addon-meta">
                  <div class="bp-addon-name">Brand Guardianship & Seguimiento Mensual</div>
                  <div class="bp-addon-desc">Supervisión continua y control de calidad de todas las piezas gráficas que tu equipo produzca mes a mes.</div>
                  <div class="bp-addon-price">+$4,500 MXN / mes</div>
                </div>
              </label>

              <label class="bp-addon-card" id="addon-bp-impi-card">
                <input type="checkbox" class="bp-addon-checkbox" id="addon-bp-impi" data-price="5500">
                <div class="bp-addon-meta">
                  <div class="bp-addon-name">Registro de Marca IMPI en Combo</div>
                  <div class="bp-addon-desc">Blindaje legal ante el IMPI con descuento exclusivo de paquete (precio normal $6,976 MXN).</div>
                  <div class="bp-addon-price">+$5,500 MXN (Ahorras $1,476)</div>
                </div>
              </label>

              <label class="bp-addon-card" id="addon-bp-social-card">
                <input type="checkbox" class="bp-addon-checkbox" id="addon-bp-social" data-price="2800">
                <div class="bp-addon-meta">
                  <div class="bp-addon-name">Pack de 15 Plantillas Extra Redes</div>
                  <div class="bp-addon-desc">Plantillas en Figma y Canva listas para carruseles de Instagram, stories y portadas de LinkedIn.</div>
                  <div class="bp-addon-price">+$2,800 MXN</div>
                </div>
              </label>
            </div>
          </div>

        </div>
      </section>

      <!-- 4. LIVE PROJECT TRACKING SIMULATOR -->
      <section class="bp-tracking-section" id="seccion-tracking-branding">
        <div class="container">
          <div class="bp-tracking-box">
            <div class="bp-tracking-top">
              <div>
                <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 0.6rem;">
                  <span class="cat-diamond-dot"></span>
                  <span class="cat-tag-text">TRANSPARENCIA & CONTROL TOTAL</span>
                </div>
                <h3 style="font-family: var(--sm-font-body); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.3px; color: #141718; margin-bottom: 0.3rem;">
                  Seguimiento Semana a Semana de tu Identidad
                </h3>
                <p style="font-family: var(--sm-font-body); font-size: 0.92rem; color: var(--text-secondary);">
                  Una vez contratado el servicio, se te asigna un Brand Director y accedes a tu portal privado para aprobar avances en tiempo real.
                </p>
              </div>

              <div style="background: #141718; color: #FFFFFF; padding: 0.6rem 1.2rem; border-radius: 999px; font-family: monospace; font-size: 0.95rem; font-weight: 700;">
                Proyecto: <span style="color: var(--color-primary);">DILO-BRAND-2026</span>
              </div>
            </div>

            <div class="bp-tracker-timeline">
              <div class="bp-tracker-step is-done">
                <div class="bp-step-status-tag">✓ Semana 1 &middot; Completado</div>
                <h4 class="bp-step-name">1. Inmersión & Moodboard</h4>
                <p class="bp-step-detail">Briefing estratégico, benchmarking de competidores y validación de la dirección de arte conceptual.</p>
              </div>

              <div class="bp-tracker-step is-current">
                <div class="bp-step-status-tag">● Semana 2 &middot; En Proceso</div>
                <h4 class="bp-step-name">2. Conceptos de Logotipo</h4>
                <p class="bp-step-detail">Presentación de propuestas vectoriales en Figma con aplicaciones reales y pruebas de contraste.</p>
              </div>

              <div class="bp-tracker-step">
                <div class="bp-step-status-tag" style="color: var(--text-tertiary);">Semana 3</div>
                <h4 class="bp-step-name">3. Papelería & Manual</h4>
                <p class="bp-step-detail">Despliegue del manual de identidad de 40+ páginas, plantillas para redes y aplicaciones corporativas.</p>
              </div>

              <div class="bp-tracker-step">
                <div class="bp-step-status-tag" style="color: var(--text-tertiary);">Semana 4</div>
                <h4 class="bp-step-name">4. Master Kit & Entrega</h4>
                <p class="bp-step-detail">Exportación de todos los activos vectoriales y sesión estratégica 1 a 1 de implementación de marca.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. DIRECT PURCHASE CHECKOUT FORM & STICKY RECEIPT -->
      <section class="bp-checkout-section" id="seccion-checkout-branding">
        <div class="container">
          <div class="bp-funnel-grid">

            <!-- Left: Checkout Form -->
            <div style="background: #FFFFFF; border: 1px solid rgba(20, 23, 24, 0.08); border-radius: 24px; padding: clamp(1.8rem, 3vw, 2.5rem); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);">
              <h3 style="font-family: var(--sm-font-body); font-size: 1.35rem; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 0.5rem;">
                Configura tu Orden de Branding
              </h3>
              <p style="font-family: var(--sm-font-body); font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                Ingresa los datos esenciales de tu proyecto para agendar el arranque formal con el equipo creativo.
              </p>

              <div class="impi-form-group">
                <label class="impi-form-label">Nombre del Proyecto / Marca</label>
                <input type="text" class="impi-input" id="bp-form-name" placeholder="Ej. Lumina Studio MX" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="impi-form-group">
                  <label class="impi-form-label">Giro comercial o industria</label>
                  <input type="text" class="impi-input" id="bp-form-industry" placeholder="Ej. Moda, Salud, Tecnología, Alimentos">
                </div>
                <div class="impi-form-group">
                  <label class="impi-form-label">Esquema de Pago</label>
                  <select class="impi-select" id="bp-payment-scheme">
                    <option value="50-50">50% Anticipo + 50% Contra Entrega</option>
                    <option value="100">100% de Contado (Con 5% de Descuento Extra)</option>
                  </select>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="impi-form-group">
                  <label class="impi-form-label">Nombre del Contacto / Responsable</label>
                  <input type="text" class="impi-input" id="bp-form-contact" placeholder="Ej. Roberto Sánchez" required>
                </div>
                <div class="impi-form-group">
                  <label class="impi-form-label">WhatsApp de Contacto Directo</label>
                  <input type="tel" class="impi-input" id="bp-form-phone" placeholder="+52 55 0000 0000" required>
                </div>
              </div>

              <div class="impi-form-group">
                <label class="impi-form-label">Correo para entrega de archivos y factura</label>
                <input type="email" class="impi-input" id="bp-form-email" placeholder="contacto@tuempresa.com" required>
              </div>

              <div class="impi-form-group">
                <label class="impi-form-label">¿Tienes alguna referencia visual o valores clave? (Opcional)</label>
                <textarea class="impi-input" id="bp-form-notes" rows="2" placeholder="Ej. Queremos que transmita elegancia, vanguardia y confianza minimalista."></textarea>
              </div>

              <button class="bp-buy-btn" id="btn-complete-bp-order" data-cursor="hover" style="margin-top: 1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span id="bp-btn-buy-label">Iniciar Proyecto con $8,250 MXN (50% Anticipo)</span>
              </button>
            </div>

            <!-- Right: Dynamic Sticky Order Summary -->
            <div class="bp-receipt-card">
              <div class="bp-receipt-title">
                <span>Resumen de tu Proyecto</span>
                <span class="badge badge-primary" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">Branding Dilo</span>
              </div>

              <div class="bp-receipt-line">
                <span class="bp-receipt-line-lbl" id="bp-rec-tier-name">Ecosistema Visual 360°</span>
                <span class="bp-receipt-line-val" id="bp-rec-tier-price">$16,500.00 MXN</span>
              </div>

              <div class="bp-receipt-line">
                <span class="bp-receipt-line-lbl">&bull; Tiempo de Entrega</span>
                <span class="bp-receipt-line-val" id="bp-rec-tier-time">14 Días Hábiles</span>
              </div>

              <div class="bp-receipt-line">
                <span class="bp-receipt-line-lbl">&bull; Sesión Estratégica 1 a 1</span>
                <span class="bp-receipt-line-val" style="color: #10B981;">Incluida</span>
              </div>

              <!-- Add-ons in receipt -->
              <div id="bp-receipt-addons-container"></div>

              <div class="bp-receipt-total">
                <span class="bp-total-lbl">Total del Servicio</span>
                <span class="bp-total-num" id="bp-rec-total-price">$16,500.00</span>
              </div>

              <div class="impi-guarantee-note" style="margin-bottom: 1.2rem;">
                🔒 <strong>Garantía de Satisfacción Creativa:</strong> Iteraciones ilimitadas sobre la línea gráfica seleccionada hasta lograr la aprobación formal y firma de manual.
              </div>

              <div style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; font-family: var(--sm-font-body); font-size: 0.78rem; color: rgba(236, 238, 238, 0.6); font-weight: 600;">
                <span>✓ Archivos 100% Editables</span>
                <span>&bull;</span>
                <span>Cesión de Derechos</span>
                <span>&bull;</span>
                <span>Factura CFDI</span>
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

export function initBrandingEvents() {
  initFinalCtaEvents();

  // 1. Interactive Moodboard Switcher
  const moodButtons = document.querySelectorAll('.bp-mood-btn');
  const mockupCanvas = document.getElementById('bp-mockup-canvas');
  const mockupTitle = document.getElementById('bp-mockup-title');
  const mockupSub = document.getElementById('bp-mockup-sub');
  const swatch1 = document.getElementById('swatch-1');
  const swatch2 = document.getElementById('swatch-2');
  const swatch3 = document.getElementById('swatch-3');
  const swatch4 = document.getElementById('swatch-4');

  const moods = {
    obsidian: {
      bg: 'rgba(255, 255, 255, 0.04)',
      title: 'DILO.',
      color: '#FFFFFF',
      sub: 'Visual Systems & Branding',
      subColor: '#FF5A1F',
      c1: '#FF5A1F', c2: '#141718', c3: '#00A8A0', c4: '#ECEEEE'
    },
    minimal: {
      bg: '#FFFFFF',
      title: 'AURA',
      color: '#141718',
      sub: 'Studio & Architecture',
      subColor: '#E21C21',
      c1: '#E21C21', c2: '#111111', c3: '#737373', c4: '#F4F4F6'
    },
    luxury: {
      bg: 'linear-gradient(135deg, #0E1112 0%, #1A1D20 100%)',
      title: 'SOLARIA',
      color: '#D4AF37',
      sub: 'Haute Horlogerie & Design',
      subColor: '#D4AF37',
      c1: '#D4AF37', c2: '#0E1112', c3: '#8C7853', c4: '#FFFFFF'
    }
  };

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      moodButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const m = moods[btn.dataset.mood];
      if (m && mockupCanvas && mockupTitle && mockupSub) {
        sounds.playPop();
        mockupCanvas.style.background = m.bg;
        mockupTitle.textContent = m.title;
        mockupTitle.style.color = m.color;
        mockupSub.textContent = m.sub;
        mockupSub.style.color = m.subColor;

        if (swatch1) swatch1.style.background = m.c1;
        if (swatch2) swatch2.style.background = m.c2;
        if (swatch3) swatch3.style.background = m.c3;
        if (swatch4) swatch4.style.background = m.c4;
      }
    });
  });

  // 2. Pricing & Dynamic Calculations
  let basePrice = 16500;
  let tierName = 'Ecosistema Visual 360°';
  let tierTime = '14 Días Hábiles';
  let activeAddons = {
    guardianship: false,
    impi: false,
    social: false
  };

  const addonPrices = {
    guardianship: 4500,
    impi: 5500,
    social: 2800
  };

  const addonNames = {
    guardianship: 'Brand Guardianship Mensual',
    impi: 'Registro de Marca IMPI Combo',
    social: 'Pack 15 Plantillas Redes'
  };

  function recalculateTotal() {
    let total = basePrice;
    const addonsContainer = document.getElementById('bp-receipt-addons-container');
    if (!addonsContainer) return;

    addonsContainer.innerHTML = '';

    Object.keys(activeAddons).forEach(k => {
      if (activeAddons[k]) {
        total += addonPrices[k];
        const line = document.createElement('div');
        line.className = 'bp-receipt-line';
        line.innerHTML = `
          <span class="bp-receipt-line-lbl">+ ${addonNames[k]}</span>
          <span class="bp-receipt-line-val">$${addonPrices[k].toLocaleString()} MXN</span>
        `;
        addonsContainer.appendChild(line);
      }
    });

    const scheme = document.getElementById('bp-payment-scheme')?.value || '50-50';
    let finalTotal = total;
    let initialPayment = scheme === '50-50' ? total * 0.5 : total * 0.95;

    const totalEl = document.getElementById('bp-rec-total-price');
    const buyLabelEl = document.getElementById('bp-btn-buy-label');

    if (totalEl) {
      totalEl.textContent = `$${finalTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (buyLabelEl) {
      if (scheme === '50-50') {
        buyLabelEl.textContent = `Iniciar Proyecto con $${initialPayment.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN (50% Anticipo)`;
      } else {
        buyLabelEl.textContent = `Pagar 100% de Contado ($${initialPayment.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN con 5% OFF)`;
      }
    }
  }

  // Tier Card Selection
  document.querySelectorAll('.bp-tier-card').forEach(card => {
    const btn = card.querySelector('.bp-tier-select-btn');
    const selectTier = () => {
      document.querySelectorAll('.bp-tier-card').forEach(c => c.classList.remove('is-featured'));
      card.classList.add('is-featured');

      basePrice = parseFloat(card.dataset.price);
      tierName = card.querySelector('.bp-tier-name')?.textContent || '';
      tierTime = card.querySelector('.bp-tier-delivery')?.textContent?.replace('⏱ Entrega en ', '') || '';

      const tierNameEl = document.getElementById('bp-rec-tier-name');
      const tierPriceEl = document.getElementById('bp-rec-tier-price');
      const tierTimeEl = document.getElementById('bp-rec-tier-time');

      if (tierNameEl) tierNameEl.textContent = tierName;
      if (tierPriceEl) tierPriceEl.textContent = `$${basePrice.toLocaleString()} MXN`;
      if (tierTimeEl) tierTimeEl.textContent = tierTime;

      recalculateTotal();
      sounds.playPop();

      document.getElementById('seccion-checkout-branding')?.scrollIntoView({ behavior: 'smooth' });
    };

    btn?.addEventListener('click', selectTier);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.bp-tier-select-btn')) {
        selectTier();
      }
    });
  });

  // Add-on checkboxes
  ['guardianship', 'impi', 'social'].forEach(addonKey => {
    const chk = document.getElementById(`addon-bp-${addonKey}`);
    const card = document.getElementById(`addon-bp-${addonKey}-card`);
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

  // Payment Scheme Switch
  document.getElementById('bp-payment-scheme')?.addEventListener('change', () => {
    sounds.playClick();
    recalculateTotal();
  });

  // Complete Order
  document.getElementById('btn-complete-bp-order')?.addEventListener('click', () => {
    const projectName = document.getElementById('bp-form-name')?.value.trim();
    const contactName = document.getElementById('bp-form-contact')?.value.trim();
    const phone = document.getElementById('bp-form-phone')?.value.trim();
    const email = document.getElementById('bp-form-email')?.value.trim();

    if (!projectName || !contactName || !phone) {
      alert('Por favor completa el nombre del proyecto, tu nombre y WhatsApp de contacto.');
      return;
    }

    sounds.playSuccess();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.55 }
    });

    const scheme = document.getElementById('bp-payment-scheme')?.value;
    const schemeText = scheme === '50-50' ? '50% Anticipo + 50% Contra Entrega' : '100% de Contado (5% OFF)';
    const totalText = document.getElementById('bp-rec-total-price')?.textContent || '$16,500.00';
    const industry = document.getElementById('bp-form-industry')?.value || 'General';

    let addonsList = [];
    if (activeAddons.guardianship) addonsList.push('Brand Guardianship Mensual');
    if (activeAddons.impi) addonsList.push('Registro IMPI Combo');
    if (activeAddons.social) addonsList.push('Pack 15 Plantillas Redes');

    const folio = `BRAND-2026-${Math.floor(1000 + Math.random() * 9000)}-MX`;

    const whatsappMessage = `¡Hola Dilo Digital MX! 🎨✨ Acabo de comprar el servicio de *Branding & Identidad Visual* en línea:\n\n` +
      `• *Folio de Proyecto:* ${folio}\n` +
      `• *Marca / Proyecto:* ${projectName}\n` +
      `• *Giro / Industria:* ${industry}\n` +
      `• *Responsable:* ${contactName}\n` +
      `• *WhatsApp:* ${phone}\n` +
      `• *Paquete:* ${tierName} (${tierTime})\n` +
      (addonsList.length > 0 ? `• *Servicios Adicionales:* ${addonsList.join(', ')}\n` : '') +
      `• *Esquema:* ${schemeText}\n` +
      `• *Total:* ${totalText} MXN\n\n` +
      `Deseo agendar el kick-off formal de inmersión y la recepción de comprobantes de pago. ¡Gracias!`;

    const waUrl = `https://wa.me/525592441070?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      alert(`¡Proyecto ${folio} contratado con éxito! Te hemos redirigido a WhatsApp con tu Brand Director asignado para dar inicio inmediato.`);
    }, 1200);
  });
}
