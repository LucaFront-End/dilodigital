// ================================================================
// INDIVIDUAL SERVICE VIEW — DILO DIGITAL SIGNATURE OVERHAUL
// Monumental Manuka Typography, Headless Tech Specs, Direct WhatsApp Conversion
// ================================================================

import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderServiceView(serviceSlug = 'desarrollo-web-wix-headless') {
  const serviceWaUrl = `https://wa.me/525592441070?text=${encodeURIComponent('Hola Dilo Digital, me interesa cotizar una plataforma web desacoplada en Vite + Wix Headless. ¿Podríamos agendar una sesión?')}`;

  return `
    <main class="page-service" style="padding-top: calc(var(--header-height) + 2rem); padding-bottom: 0;">
      
      <!-- Service Breadcrumb & Header -->
      <section class="container" style="margin-bottom: clamp(3rem, 5vh, 4.5rem);">
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.2rem;">
          <a href="#/" style="font-family: var(--sm-font-body); font-size: 0.88rem; color: var(--text-tertiary); font-weight: 600;" data-cursor="hover">Inicio</a>
          <span style="color: var(--text-tertiary);">/</span>
          <a href="#/categoria/desarrollo-web-ecommerce" style="font-family: var(--sm-font-body); font-size: 0.88rem; color: var(--text-tertiary); font-weight: 600;" data-cursor="hover">03. Desarrollo Web</a>
          <span style="color: var(--text-tertiary);">/</span>
          <span style="font-family: var(--sm-font-body); font-size: 0.88rem; color: var(--color-primary); font-weight: 600;">Wix Headless & Ecommerce</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: clamp(2.5rem, 5vw, 4rem); align-items: center;">
          <div>
            <div class="cat-tag-wrap" style="margin-bottom: 1rem;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">ARQUITECTURA WEB MODERNA &middot; VITE + WIX</span>
            </div>

            <h1 style="font-family: var(--sm-font-heading); font-size: clamp(3rem, 5.5vw, 5.5rem); font-weight: 900; line-height: 0.88; letter-spacing: -2px; text-transform: uppercase; color: #141718; margin: 0 0 1.2rem;">
              DESARROLLO WEB HEADLESS & <span class="cat-hero-title-accent">ECOMMERCE DE ALTO ROAS</span>
            </h1>

            <div style="font-family: var(--sm-font-body); font-size: clamp(1.15rem, 1.35vw, 1.35rem); font-weight: 600; color: var(--color-primary); margin-bottom: 1.2rem;">
              "Tu sitio no debería ser un folleto digital. Debería ser tu mejor vendedor 24/7."
            </div>

            <p style="font-family: var(--sm-font-body); font-size: clamp(1rem, 1.15vw, 1.15rem); color: var(--text-secondary); max-width: 620px; line-height: 1.65; margin-bottom: 2rem;">
              Combinamos la facilidad operativa del CMS de <strong>Wix Studio</strong> con la velocidad extrema de un frontend desacoplado en <strong>Vite</strong>. Carga en 0.7s, animaciones Awwwards y arquitectura diseñada para duplicar tus conversiones.
            </p>

            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <button class="btn btn-primary btn-lg btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                <span>Cotizar Proyecto Web</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a href="${serviceWaUrl}" target="_blank" rel="noopener" class="cat-sub-wa-btn" data-cursor="hover">
                <div class="cat-wa-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                  </svg>
                </div>
                <div class="cat-wa-meta">
                  <span class="cat-wa-action">Cotizar por WhatsApp</span>
                  <span class="cat-wa-note">Respuesta en &lt; 15 min &middot; CDMX</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Key Highlights Card -->
          <div class="card-studio" style="border-color: rgba(255, 90, 31, 0.25); box-shadow: var(--shadow-lg); padding: clamp(2rem, 3.5vw, 2.8rem); border-radius: 24px;">
            <div style="font-family: var(--sm-font-heading); font-size: 0.95rem; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: var(--color-primary); margin-bottom: 1.2rem;">
              GARANTÍAS DE INGENIERÍA WEB DILO
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; gap: 0.9rem;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #ECFDF5; color: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">
                  ✓
                </div>
                <div>
                  <div style="font-family: var(--sm-font-body); font-weight: 700; font-size: 0.96rem; color: var(--text-primary);">95+ en Google PageSpeed</div>
                  <div style="font-family: var(--sm-font-body); font-size: 0.82rem; color: var(--text-secondary);">Core Web Vitals verdes en móvil y desktop para rankear #1</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.9rem;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #ECFDF5; color: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">
                  ✓
                </div>
                <div>
                  <div style="font-family: var(--sm-font-body); font-weight: 700; font-size: 0.96rem; color: var(--text-primary);">Wix Headless APIs Integradas</div>
                  <div style="font-family: var(--sm-font-body); font-size: 0.82rem; color: var(--text-secondary);">Tu equipo edita contenidos en Wix sin tocar código</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.9rem;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #ECFDF5; color: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">
                  ✓
                </div>
                <div>
                  <div style="font-family: var(--sm-font-body); font-weight: 700; font-size: 0.96rem; color: var(--text-primary);">Pasarelas de Pago Oficiales</div>
                  <div style="font-family: var(--sm-font-body); font-size: 0.82rem; color: var(--text-secondary);">Stripe, Mercado Pago, PayPal y SPEI sincronizados</div>
                </div>
              </div>
            </div>

            <div style="padding-top: 1rem; border-top: 1px solid rgba(20,23,24,0.06); font-family: var(--sm-font-body); font-size: 0.85rem; color: var(--text-tertiary); text-align: center;">
              ⚡ Sprint de entrega garantizado en 4 semanas
            </div>
          </div>
        </div>
      </section>

      <!-- Architecture Comparison Table (Traditional vs Dilo Headless) -->
      <section class="container" style="margin-bottom: 5rem;">
        <div style="margin-bottom: 2rem;">
          <div class="cat-tag-wrap">
            <span class="cat-diamond-dot"></span>
            <span class="cat-tag-text">COMPARATIVA DE INGENIERÍA</span>
          </div>
          <h2 style="font-family: var(--sm-font-heading); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 900; line-height: 0.9; letter-spacing: -1.5px; text-transform: uppercase; color: #141718; margin: 0 0 0.6rem;">
            WEB TRADICIONAL VS. <span class="cat-hero-title-accent">DILO HEADLESS</span>
          </h2>
          <p style="font-family: var(--sm-font-body); color: var(--text-secondary); max-width: 650px;">
            ¿Por qué las marcas líderes abandonan las plantillas monolíticas lentas y adoptan arquitectura desacoplada?
          </p>
        </div>

        <div style="background: #FFFFFF; border: 1px solid rgba(20, 23, 24, 0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; background: var(--bg-main); padding: 1.2rem 2rem; font-family: var(--sm-font-heading); font-weight: 800; font-size: 1.05rem; letter-spacing: 0.4px; text-transform: uppercase; border-bottom: 1px solid rgba(20,23,24,0.08);">
            <div>Parámetro</div>
            <div style="color: var(--text-tertiary);">Sitio Web Tradicional</div>
            <div style="color: var(--color-primary);">Dilo Headless (Wix + Vite)</div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 1.2rem 2rem; border-bottom: 1px solid rgba(20,23,24,0.05); align-items: center; font-family: var(--sm-font-body);">
            <div style="font-weight: 700;">Velocidad de Carga (FCP)</div>
            <div style="color: #EF4444; font-weight: 600;">3.8s a 6.2s (Lento)</div>
            <div style="color: #10B981; font-weight: 700;">0.6s a 0.9s (Instantáneo)</div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 1.2rem 2rem; border-bottom: 1px solid rgba(20,23,24,0.05); align-items: center; font-family: var(--sm-font-body);">
            <div style="font-weight: 700;">Experiencia UX & Animaciones</div>
            <div style="color: var(--text-secondary);">Plantillas genéricas rígidas</div>
            <div style="color: #10B981; font-weight: 700;">Diseño Awwwards 100% libre</div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 1.2rem 2rem; border-bottom: 1px solid rgba(20,23,24,0.05); align-items: center; font-family: var(--sm-font-body);">
            <div style="font-weight: 700;">Facilidad de Gestión</div>
            <div style="color: var(--text-secondary);">Paneles complejos o código duro</div>
            <div style="color: #10B981; font-weight: 700;">Panel intuitivo Wix Studio</div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 1.2rem 2rem; border-bottom: 1px solid rgba(20,23,24,0.05); align-items: center; font-family: var(--sm-font-body);">
            <div style="font-weight: 700;">Posicionamiento SEO Técnico</div>
            <div style="color: #EF4444; font-weight: 600;">Penalizado por Core Web Vitals</div>
            <div style="color: #10B981; font-weight: 700;">Máximo puntaje en Google</div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 1.2rem 2rem; align-items: center; font-family: var(--sm-font-body);">
            <div style="font-weight: 700;">Seguridad y Escalabilidad</div>
            <div style="color: var(--text-secondary);">Plugins vulnerables con fallas</div>
            <div style="color: #10B981; font-weight: 700;">Arquitectura Cloud CDN aislada</div>
          </div>
        </div>
      </section>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}
    </main>
  `;
}

export function initServiceEvents() {
  initFinalCtaEvents();
}
