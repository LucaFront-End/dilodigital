// ================================================================
// CATEGORY VIEW — DILO DIGITAL FLAGSHIP OVERHAUL
// Monumental Manuka Typography, Sticky Scroll Navigation, Direct WhatsApp Conversion
// ================================================================

import { CATEGORIES } from '../data/categories.js';
import { PROJECTS } from '../data/projects.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';
import { renderCategoryHeroAnimation } from '../components/CategoryAnimations.js';

function getWhatsAppUrl(subTitle, categoryTitle) {
  const text = `Hola Dilo Digital, me interesa cotizar el servicio de *${subTitle}* de la categoría *${categoryTitle}*. ¿Podríamos agendar una sesión estratégica?`;
  return `https://wa.me/525592441070?text=${encodeURIComponent(text)}`;
}

export function renderCategoryView(slug = 'branding-diseno') {
  const category = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[0];
  const relatedProjects = PROJECTS.filter(p => p.category === category.id);
  const otherCategories = CATEGORIES.filter(c => c.id !== category.id);

  return `
    <main class="cat-page">
      
      <!-- 1. STICKY CATEGORY SWITCHER RIBBON -->
      <nav class="cat-nav-strip" aria-label="Navegación de categorías">
        <div class="cat-nav-container">
          ${CATEGORIES.map(c => `
            <a href="#/categoria/${c.slug}" class="cat-nav-pill ${c.id === category.id ? 'is-active' : ''}" data-cursor="hover">
              <span class="cat-nav-num">${c.number}.</span>
              <span>${c.shortTitle}</span>
            </a>
          `).join('')}
        </div>
      </nav>

      <!-- 2. MONUMENTAL CATEGORY HERO STAGE -->
      <section class="cat-hero-section">
        <div class="cat-hero-container">
          
          <!-- Background Numeral Watermark in Manuka -->
          <div class="cat-watermark-num" aria-hidden="true">${category.number}</div>

          <div class="cat-hero-grid">
            <div class="cat-hero-left">
              <div class="cat-tag-wrap">
                <span class="cat-diamond-dot"></span>
                <span class="cat-tag-text">DISCIPLINA ESTRATÉGICA &middot; ${category.number} DE 06</span>
              </div>

              <h1 class="cat-hero-title">
                ${category.title}
              </h1>

              <div class="cat-hero-concept">
                "${category.concept}"
              </div>

              <p class="cat-hero-desc">
                ${category.tagline}
              </p>

              <div class="cat-hero-actions">
                <button class="btn btn-primary btn-lg btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                  <span>Cotizar ${category.shortTitle} en 60s</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <a href="${getWhatsAppUrl('General', category.title)}" target="_blank" rel="noopener" class="btn btn-outline btn-lg" data-cursor="hover" style="display: flex; align-items: center; gap: 0.6rem;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                  </svg>
                  <span>Chatear por WhatsApp</span>
                </a>
              </div>
            </div>

            <!-- Right Column: Live Kinetic Discipline Animation & Performance Metrics -->
            <div class="cat-hero-right">
              ${renderCategoryHeroAnimation(category.id)}

              <div class="cat-stats-card-compact">
                <div class="cat-stats-grid">
                  ${category.stats.map(s => `
                    <div class="cat-stat-box">
                      <div class="cat-stat-val">${s.value}</div>
                      <div class="cat-stat-lbl">${s.label}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- 3. SCROLL-BASED SUBCATEGORIES SECTION WITH DIRECT WHATSAPP ACTION -->
      <section class="cat-specs-section">
        <div class="container" style="overflow: visible !important;">
          
          <div class="cat-specs-grid">
            
            <!-- Left Column: Sticky Subcategory Index & Direct WhatsApp Fast Track -->
            <aside class="cat-specs-sticky">
              <div class="cat-specs-nav">
                <div class="cat-specs-nav-title">Especialidades Incluidas</div>
                <ul class="cat-specs-nav-list" id="cat-sub-nav">
                  ${category.subSections.map((sub, idx) => `
                    <li>
                      <a href="#sub-${sub.id}" class="cat-specs-nav-item ${idx === 0 ? 'is-active' : ''}" data-target="sub-${sub.id}">
                        <span class="cat-nav-item-dot"></span>
                        <span>${sub.title}</span>
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Sticky WhatsApp Fast Support Card -->
              <div class="cat-sticky-wa-card">
                <div class="cat-sticky-wa-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                  </svg>
                  <span class="cat-sticky-wa-badge">Asesoría Inmediata</span>
                </div>
                <div class="cat-sticky-wa-desc">
                  ¿Tienes requerimientos específicos o un proyecto llave en mano? Escríbenos directamente a WhatsApp.
                </div>
                <a href="${getWhatsAppUrl('Asesoría Especializada', category.title)}" target="_blank" rel="noopener" class="cat-sticky-wa-btn" data-cursor="hover">
                  <span>Abrir Chat con un Estratega</span>
                </a>
              </div>
            </aside>

            <!-- Right Column: Cards Stream with WhatsApp Action for EACH Subcategory -->
            <div class="cat-cards-stream">
              ${category.subSections.map((sub, idx) => {
                const subNumber = String(idx + 1).padStart(2, '0');
                const subWaUrl = getWhatsAppUrl(sub.title, category.title);

                return `
                <article class="cat-sub-card" id="sub-${sub.id}">
                  <!-- Watermark number -->
                  <div class="cat-sub-watermark" aria-hidden="true">${subNumber}</div>

                  <div class="cat-sub-card-top">
                    <span class="cat-sub-badge">
                      ${sub.isHighlight ? `★ ${sub.highlightTag}` : `Módulo ${subNumber}`}
                    </span>
                  </div>

                  <h2 class="cat-sub-title">${sub.title}</h2>
                  <p class="cat-sub-desc">${sub.description}</p>

                  <!-- Deliverables / Scope Box -->
                  <div class="cat-deliverables-box">
                    <div class="cat-deliverables-title">Entregables & Alcance Técnico</div>
                    <ul class="cat-deliverables-grid">
                      ${sub.items.map(it => `
                        <li class="cat-deliverable-item">
                          <svg class="cat-deliverable-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>${it}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>

                  <!-- Dedicated Subcategory WhatsApp Direct Conversion Button -->
                  <div class="cat-sub-actions">
                    <a href="${subWaUrl}" target="_blank" rel="noopener" class="cat-sub-wa-btn" data-cursor="hover">
                      <div class="cat-wa-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                        </svg>
                      </div>
                      <div class="cat-wa-meta">
                        <span class="cat-wa-action">Cotizar ${sub.title} por WhatsApp</span>
                        <span class="cat-wa-note">Respuesta en &lt; 15 min &middot; CDMX</span>
                      </div>
                      <svg class="cat-wa-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>

                    ${sub.actionRoute ? `
                      <a href="#/${sub.actionRoute}" class="cat-sub-alt-btn" data-cursor="hover">
                        <span>${sub.ctaText || 'Ver Trámite Online'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    ` : `
                      <button class="cat-sub-alt-btn" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                        <span>Calcular Presupuesto</span>
                      </button>
                    `}
                  </div>
                </article>
                `;
              }).join('')}
            </div>

          </div>

        </div>
      </section>

      <!-- 4. SCROLL-BASED WORKFLOW SECTION -->
      <section class="cat-workflow-section">
        <div class="container">
          <div class="cat-tag-wrap">
            <span class="cat-diamond-dot"></span>
            <span class="cat-tag-text">METODOLOGÍA DE EJECUCIÓN</span>
          </div>
          <h2 class="cat-hero-title" style="font-size: clamp(2.4rem, 4.5vw, 4rem); margin-bottom: 0.8rem;">
            CÓMO TRABAJAMOS EN <span class="cat-hero-title-accent">${category.shortTitle.toUpperCase()}</span>
          </h2>
          <p style="font-family: var(--sm-font-body); color: var(--text-secondary); max-width: 640px; font-size: 1.05rem;">
            Un proceso estructurado semana a semana para garantizar entregas en tiempo récord sin fricciones.
          </p>

          <div class="cat-workflow-grid">
            <div class="cat-flow-card">
              <div class="cat-flow-num">01</div>
              <h3 class="cat-flow-title">Diagnóstico & Briefing</h3>
              <p class="cat-flow-desc">Inmersión profunda en tu modelo de negocio, competidores directos y objetivos de conversión.</p>
            </div>

            <div class="cat-flow-card">
              <div class="cat-flow-num">02</div>
              <h3 class="cat-flow-title">Estrategia & Prototipo</h3>
              <p class="cat-flow-desc">Definición conceptual, wireframes o esquemas tácticos para validar la dirección antes de producir.</p>
            </div>

            <div class="cat-flow-card">
              <div class="cat-flow-num">03</div>
              <h3 class="cat-flow-title">Ejecución & Validación</h3>
              <p class="cat-flow-desc">Producción de alta fidelidad, iteraciones rápidas y control de calidad bajo estándares Awwwards.</p>
            </div>

            <div class="cat-flow-card">
              <div class="cat-flow-num">04</div>
              <h3 class="cat-flow-title">Lanzamiento & Soporte</h3>
              <p class="cat-flow-desc">Despliegue oficial, entrega de manuales o reportes de campaña y acompañamiento continuo.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. RELATED PROJECTS (If Any) -->
      ${relatedProjects.length > 0 ? `
        <section class="container" style="padding-top: clamp(3rem, 6vh, 5rem); padding-bottom: clamp(3rem, 6vh, 5rem);">
          <div style="margin-bottom: 2.2rem;">
            <div class="cat-tag-wrap">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">CASOS DE ESTUDIO REALES</span>
            </div>
            <h2 class="cat-hero-title" style="font-size: clamp(2.4rem, 4.5vw, 4rem);">
              PROYECTOS DESTACADOS EN <span class="cat-hero-title-accent">${category.shortTitle.toUpperCase()}</span>
            </h2>
          </div>

          <div class="cases-grid">
            ${relatedProjects.map(p => `
              <div class="case-card scale-on-hover">
                <div class="case-media-box">
                  <div class="case-anim-wrap">
                    <img src="${p.coverImage}" alt="${p.title}" loading="lazy" class="case-bg-img">
                    <div class="case-anim-overlay">
                      <span class="case-anim-scanline"></span>
                      <div class="case-anim-badge">
                        <span class="cat-anim-pulse-dot"></span>
                        <span>CASO DE ÉXITO &middot; EN VIVO</span>
                      </div>
                    </div>
                  </div>
                  <span class="case-badge-top">${p.categoryName}</span>
                </div>
                <div class="case-body">
                  <div>
                    <div class="case-client-row">
                      <span>${p.client}</span>
                      <span>${p.location}</span>
                    </div>
                    <h4 class="case-title">${p.title}</h4>
                    <p class="case-summary">${p.summary}</p>
                  </div>
                  <div class="case-metrics-banner">
                    ${p.metrics.map(m => `
                      <div class="case-metric-item">
                        <div class="case-metric-num">${m.value}</div>
                        <div class="case-metric-lbl">${m.label}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- 6. CROSS-CATEGORY EXPLORER -->
      <section class="container" style="padding-bottom: 2rem;">
        <div style="background: #141718; border-radius: 28px; padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 3vw, 3rem); border: 1px solid rgba(255,255,255,0.12);">
          <div style="text-align: center; max-width: 680px; margin: 0 auto 2.5rem;">
            <span class="cat-tag-wrap" style="background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: #FFFFFF;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text" style="color: #ECEEEE;">ECOSISTEMA INTEGRADO DILO</span>
            </span>
            <h2 class="cat-hero-title" style="font-size: clamp(2.2rem, 4vw, 3.5rem); color: #FFFFFF; margin-bottom: 0.8rem;">
              EXPLORA OTRAS <span class="cat-hero-title-accent">DISCIPLINAS</span>
            </h2>
            <p style="font-family: var(--sm-font-body); color: rgba(236, 238, 238, 0.7); font-size: 1rem;">
              Las marcas más exitosas combinan branding, desarrollo headless y pauta digital en un solo frente coordinado.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            ${otherCategories.map(c => `
              <a href="#/categoria/${c.slug}" class="cat-sub-card" style="background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); padding: 1.5rem; text-decoration: none;" data-cursor="hover">
                <div style="font-family: var(--sm-font-heading); font-size: 2rem; font-weight: 900; color: var(--color-primary); line-height: 1; margin-bottom: 0.6rem;">
                  ${c.number}
                </div>
                <div style="font-family: var(--sm-font-body); font-size: 1.05rem; font-weight: 700; color: #FFFFFF; line-height: 1.35; margin-bottom: 0.5rem;">
                  ${c.title}
                </div>
                <div style="font-family: var(--sm-font-body); font-size: 0.84rem; color: rgba(236, 238, 238, 0.6); line-height: 1.4;">
                  ${c.shortTitle} &middot; Explorar &rarr;
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 7. SIGNATURE OBSIDIAN FINAL CTA -->
      ${renderFinalCta()}
    </main>
  `;
}

export function initCategoryEvents() {
  initFinalCtaEvents();

  // Sticky subcategory navigation scroll spy
  const navItems = document.querySelectorAll('#cat-sub-nav .cat-specs-nav-item');
  const cards = document.querySelectorAll('.cat-cards-stream .cat-sub-card');

  if (navItems.length > 0 && cards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            if (item.getAttribute('data-target') === id) {
              item.classList.add('is-active');
            } else {
              item.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    cards.forEach(card => observer.observe(card));

    // Smooth scroll on click
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const headerOffset = 140;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}
