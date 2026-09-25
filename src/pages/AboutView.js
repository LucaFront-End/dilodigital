// ================================================================
// ABOUT VIEW ("NOSOTROS") — DILO DIGITAL SIGNATURE OVERHAUL
// Monumental Manifesto, 4 Convicciones Sticky Scroll, Squad Dossier, CDMX Hub
// ================================================================

import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderAboutView() {
  return `
    <main class="ab-page">

      <!-- 1. MONUMENTAL HERO MANIFESTO & REAL IMPACT STATS -->
      <section class="ab-hero-section">
        <div class="ab-watermark-bg" aria-hidden="true">NOSOTROS</div>
        <div class="ab-hero-container">

          <div class="ab-hero-header">
            <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 1.2rem;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">MANIFIESTO DE AGENCIA &middot; CDMX & GLOBAL</span>
            </div>
            <h1 class="ab-hero-title">
              EN UN MUNDO DONDE ERES LO QUE DICES, <span class="cat-hero-title-accent">DILO DIGITAL.</span>
            </h1>
            <p class="ab-hero-desc">
              Somos una agencia creativa, jurídica y de performance con sede principal en la Ciudad de México. 
              Nacimos para erradicar las estrategias tibias y construir marcas memorables que conquistan mercados, 
              facturan millones y perduran en el tiempo.
            </p>
          </div>

          <!-- Impact Metrics Grid -->
          <div class="ab-metrics-grid">
            <div class="ab-metric-card">
              <div class="ab-metric-num">+$85M</div>
              <div class="ab-metric-lbl">Facturación Generada</div>
              <div class="ab-metric-sub">Para clientes en México, EE. UU. y LatAm</div>
            </div>

            <div class="ab-metric-card">
              <div class="ab-metric-num">+850</div>
              <div class="ab-metric-lbl">Marcas Blindadas</div>
              <div class="ab-metric-sub">Expedientes tramitados ante el IMPI con éxito</div>
            </div>

            <div class="ab-metric-card">
              <div class="ab-metric-num">99.2%</div>
              <div class="ab-metric-lbl">Tasa de Aprobación</div>
              <div class="ab-metric-sub">En dictámenes de propiedad industrial</div>
            </div>

            <div class="ab-metric-card">
              <div class="ab-metric-num">0.7s</div>
              <div class="ab-metric-lbl">Velocidad Headless</div>
              <div class="ab-metric-sub">Desarrollos web sub-segundo a 60fps</div>
            </div>
          </div>

        </div>
      </section>

      <!-- 2. SCROLL-BASED SECTION 1: 4 CONVICCIONES RADICALES (STICKY SCROLL) -->
      <section class="ab-convictions-section">
        <div class="container">
          <div class="ab-convictions-grid">

            <!-- Pinned Left Column -->
            <div class="ab-sticky-left">
              <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 1rem; background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12);">
                <span class="cat-diamond-dot"></span>
                <span class="cat-tag-text" style="color: #ECEEEE;">CÓDIGO DE HONOR DILO</span>
              </div>
              <h2 style="font-family: var(--sm-font-heading); font-size: clamp(2.4rem, 4.2vw, 4rem); font-weight: 900; line-height: 0.9; text-transform: uppercase; color: #FFFFFF; margin-bottom: 1.2rem;">
                NUESTRAS 4 CONVICCIONES <span class="cat-hero-title-accent">NO NEGOCIABLES</span>
              </h2>
              <p style="font-family: var(--sm-font-body); font-size: 1.05rem; line-height: 1.6; color: rgba(236, 238, 238, 0.7); margin-bottom: 2rem;">
                Las reglas sobre las que tomamos cada decisión de diseño, código, pauta y blindaje legal. Sin compromisos mediocres.
              </p>

              <button class="btn btn-primary btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                <span>Comenzar Proyecto</span>
              </button>
            </div>

            <!-- Scrolling Right Stream -->
            <div class="ab-conviction-stream">
              <div class="ab-conviction-card">
                <div class="ab-conviction-watermark">01</div>
                <span class="ab-conviction-badge">Principio 01 &middot; Estética & Retorno</span>
                <h3 class="ab-conviction-title">Diseño con Colmillos: Si no Vende, no Sirve</h3>
                <p class="ab-conviction-desc">
                  La estética sin conversión es solo arte de galería. Si tu logotipo, tu web o tu video no despiertan autoridad inmediata, estatus y deseo de compra en tu cliente, es un gasto inútil. Diseñamos marcas para ganar mercado.
                </p>
              </div>

              <div class="ab-conviction-card">
                <div class="ab-conviction-watermark">02</div>
                <span class="ab-conviction-badge">Principio 02 &middot; Propiedad Intelectual</span>
                <h3 class="ab-conviction-title">Blindaje desde el Día Cero: Tu Nombre es tu Activo</h3>
                <p class="ab-conviction-desc">
                  Construir una marca sin registrarla ante el IMPI es construir un rascacielos sobre un terreno ajeno. El derecho de propiedad industrial no es un trámite secundario; es el cimiento jurídico que defiende tu inversión contra plagios y robos.
                </p>
              </div>

              <div class="ab-conviction-card">
                <div class="ab-conviction-watermark">03</div>
                <span class="ab-conviction-badge">Principio 03 &middot; Rendimiento Puro</span>
                <h3 class="ab-conviction-title">Ingeniería Sub-Segundo: 60FPS o Nada</h3>
                <p class="ab-conviction-desc">
                  Los usuarios modernos no esperan 5 segundos a que cargue una página de WordPress saturada de plugins. Construimos con arquitectura headless desacoplada. Cada milisegundo ahorrado se traduce directamente en el doble de conversión.
                </p>
              </div>

              <div class="ab-conviction-card">
                <div class="ab-conviction-watermark">04</div>
                <span class="ab-conviction-badge">Principio 04 &middot; Cero Métricas de Vanidad</span>
                <h3 class="ab-conviction-title">Obsesión por el ROAS: Facturación en Cuenta</h3>
                <p class="ab-conviction-desc">
                  Los likes y las impresiones no pagan nóminas. Nuestras estrategias de Meta Ads, Google Ads y SEO se miden por retorno de inversión publicitaria real, costo por adquisición controlado y margen de rentabilidad neto para tu negocio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. SCROLL-BASED SECTION 2: EL SQUAD DILO & DISCIPLINAS INTEGRADAS -->
      <section class="ab-squad-section">
        <div class="container">
          <div style="text-align: center; max-width: 740px; margin: 0 auto;">
            <div class="cat-tag-wrap" style="display: inline-flex;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">EL EQUIPO MULTIDISCIPLINARIO</span>
            </div>
            <h2 class="ab-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.8rem); margin-bottom: 0.6rem;">
              CINCO DISCIPLINAS. <span class="cat-hero-title-accent">UN SOLO FRENTE.</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: var(--text-secondary); font-size: 1.05rem;">
              Eliminamos los teléfonos descompuestos entre agencias de diseño, programadores externos, abogados y traffickers. 
              En Dilo Digital, todas las áreas cooperan bajo el mismo techo.
            </p>
          </div>

          <!-- Squad Filter Tabs -->
          <div class="ab-squad-nav" id="ab-squad-nav">
            <button class="ab-squad-pill is-active" data-filter="all">Todas las Disciplinas</button>
            <button class="ab-squad-pill" data-filter="creative">Dirección Creativa</button>
            <button class="ab-squad-pill" data-filter="legal">Área Legal & IMPI</button>
            <button class="ab-squad-pill" data-filter="engineering">Ingeniería Web</button>
            <button class="ab-squad-pill" data-filter="growth">Performance & Growth</button>
            <button class="ab-squad-pill" data-filter="video">Contenido & UGC</button>
          </div>

          <!-- Squad Cards Grid -->
          <div class="ab-squad-cards-grid" id="ab-squad-grid">

            <div class="ab-squad-card" data-cat="creative">
              <div class="ab-squad-card-num">01</div>
              <h3 class="ab-squad-role-title">Dirección Creativa & Branding</h3>
              <p class="ab-squad-role-desc">
                Especialistas en arquitectura de marca, manuales de identidad de 40+ páginas, tipografía corporativa y sistemas visuales de alta gama.
              </p>
              <div class="ab-squad-tags-row">
                <span class="ab-squad-tool-tag">Figma Enterprise</span>
                <span class="ab-squad-tool-tag">Adobe Illustrator</span>
                <span class="ab-squad-tool-tag">Sistemas Naming</span>
                <span class="ab-squad-tool-tag">Brand Guidelines</span>
              </div>
            </div>

            <div class="ab-squad-card" data-cat="legal">
              <div class="ab-squad-card-num">02</div>
              <h3 class="ab-squad-role-title">Área Jurídica & Propiedad IMPI</h3>
              <p class="ab-squad-role-desc">
                Abogados con cédula profesional especialistas en clasificación NIZA, dictámenes fonéticos, patentes y defensa de marcas registradas.
              </p>
              <div class="ab-squad-tags-row">
                <span class="ab-squad-tool-tag">Cédula Oficial</span>
                <span class="ab-squad-tool-tag">Gaceta IMPI</span>
                <span class="ab-squad-tool-tag">Clases 1 a 45</span>
                <span class="ab-squad-tool-tag">Blindaje Legal 10 Años</span>
              </div>
            </div>

            <div class="ab-squad-card" data-cat="engineering">
              <div class="ab-squad-card-num">03</div>
              <h3 class="ab-squad-role-title">Ingeniería Web & Performance</h3>
              <p class="ab-squad-role-desc">
                Arquitectura headless desacoplada con Vite y CMS Wix Studio. Plataformas ultra-optimizadas con 100/100 en Google PageSpeed.
              </p>
              <div class="ab-squad-tags-row">
                <span class="ab-squad-tool-tag">Vite & ES6</span>
                <span class="ab-squad-tool-tag">GSAP 60fps</span>
                <span class="ab-squad-tool-tag">Wix Studio CMS</span>
                <span class="ab-squad-tool-tag">Stripe API</span>
              </div>
            </div>

            <div class="ab-squad-card" data-cat="growth">
              <div class="ab-squad-card-num">04</div>
              <h3 class="ab-squad-role-title">Growth Marketing & Performance</h3>
              <p class="ab-squad-role-desc">
                Media buyers y analistas de datos gestionando pauta en Meta Ads, Google Ads y TikTok con atribución avanzada y foco estricto en ROAS.
              </p>
              <div class="ab-squad-tags-row">
                <span class="ab-squad-tool-tag">Meta Ads Manager</span>
                <span class="ab-squad-tool-tag">Google Ads Search</span>
                <span class="ab-squad-tool-tag">Looker Studio</span>
                <span class="ab-squad-tool-tag">CAPI & Pixels</span>
              </div>
            </div>

            <div class="ab-squad-card" data-cat="video">
              <div class="ab-squad-card-num">05</div>
              <h3 class="ab-squad-role-title">Producción Audiovisual & Content Lab</h3>
              <p class="ab-squad-role-desc">
                Directores de fotografía, editores cinemáticos y red de creadores de contenido UGC para producir anuncios comerciales de alta conversión.
              </p>
              <div class="ab-squad-tags-row">
                <span class="ab-squad-tool-tag">Cámaras 4K</span>
                <span class="ab-squad-tool-tag">Pilotos Dron</span>
                <span class="ab-squad-tool-tag">Red Creadores UGC</span>
                <span class="ab-squad-tool-tag">Edición Reels/TikTok</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 4. SECTION 3: SEDE CDMX & CULTURA DE ESTUDIO -->
      <section class="ab-hub-section">
        <div class="container">
          <div class="ab-hub-grid">

            <div>
              <div class="cat-tag-wrap" style="display: inline-flex; margin-bottom: 0.8rem;">
                <span class="cat-diamond-dot"></span>
                <span class="cat-tag-text">CENTRO DE OPERACIONES</span>
              </div>
              <h2 class="ab-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.6rem); margin-bottom: 0.8rem;">
                HECHO EN CIUDAD DE MÉXICO. <span class="cat-hero-title-accent">ESCALA MUNDIAL.</span>
              </h2>
              <p style="font-family: var(--sm-font-body); font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.6rem;">
                Operamos desde el corazón creativo y corporativo de la Ciudad de México para atender marcas ambiciosas en toda la República Mexicana, Estados Unidos, España y Sudamérica.
              </p>

              <div class="ab-partners-grid">
                <div class="ab-partner-item">
                  <span class="ab-partner-item-dot"></span>
                  <span>IMPI México Registros Oficiales</span>
                </div>
                <div class="ab-partner-item">
                  <span class="ab-partner-item-dot"></span>
                  <span>Meta Business Partner</span>
                </div>
                <div class="ab-partner-item">
                  <span class="ab-partner-item-dot"></span>
                  <span>Google Premier Partner</span>
                </div>
                <div class="ab-partner-item">
                  <span class="ab-partner-item-dot"></span>
                  <span>Stripe Verified Integration</span>
                </div>
              </div>
            </div>

            <!-- Interactive Real-Time CDMX Timezone Clock Card -->
            <div class="ab-clock-card">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-family: var(--sm-font-body); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: var(--color-primary);">
                  ESTUDIO ACTIVO EN VIVO
                </span>
                <span class="badge badge-primary" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">En Línea</span>
              </div>

              <div class="ab-clock-time-display" id="cdmx-live-clock">13:00:00</div>
              <div class="ab-clock-tz">Hora Oficial Ciudad de México (CST &middot; UTC-6)</div>

              <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 1.8rem 0; padding-top: 1.4rem;">
                <div style="font-family: var(--sm-font-body); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem;">
                  Reuniones Estratégicas 1 a 1 por Google Meet
                </div>
                <p style="font-family: var(--sm-font-body); font-size: 0.85rem; color: rgba(236, 238, 238, 0.7); line-height: 1.45; margin-bottom: 1.2rem;">
                  Agendamos sesiones privadas de inmersión y diagnóstico sin costo con uno de nuestros directores de cuenta.
                </p>
                <a href="https://wa.me/525592441070?text=${encodeURIComponent('Hola Dilo Digital, me gustaría agendar una reunión virtual de diagnóstico.')}" target="_blank" rel="noopener" class="btn btn-primary btn-sm btn-glow" data-cursor="hover" style="display: inline-flex;">
                  <span>Agendar Diagnóstico</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
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

export function initAboutEvents() {
  initFinalCtaEvents();

  // 1. Live CDMX Digital Clock
  const clockEl = document.getElementById('cdmx-live-clock');
  function updateCdmxClock() {
    if (!clockEl) return;
    const now = new Date();
    // Format to CDMX Timezone
    const options = {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    clockEl.textContent = new Intl.DateTimeFormat('es-MX', options).format(now);
  }
  updateCdmxClock();
  const clockInterval = setInterval(updateCdmxClock, 1000);

  // 2. Squad Discipline Filter
  const filterPills = document.querySelectorAll('#ab-squad-nav .ab-squad-pill');
  const cards = document.querySelectorAll('#ab-squad-grid .ab-squad-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      sounds.playPop();

      const filter = pill.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
