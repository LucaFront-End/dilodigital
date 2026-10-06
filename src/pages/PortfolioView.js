import { PROJECTS } from '../data/projects.js';
import { CATEGORIES } from '../data/categories.js';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function renderPortfolioView(filterCategory = 'all') {
  const filteredProjects = filterCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filterCategory);

  return `
    <main class="page-portfolio" style="padding-top: calc(var(--header-height) + 2.5rem); padding-bottom: 0;">
      <section class="container" style="margin-bottom: 4rem;">
        <div class="cat-tag-wrap" style="margin-bottom: 1.2rem;">
          <span class="cat-diamond-dot"></span>
          <span class="cat-tag-text">PORTAFOLIO SELECCIONADO &middot; CASOS REALES</span>
        </div>
        <h1 style="font-family: var(--sm-font-heading); font-size: clamp(3.2rem, 6.2vw, 6rem); font-weight: 900; line-height: 0.95; letter-spacing: 0.01em; word-spacing: 0.06em; text-transform: uppercase; color: #141718; margin: 0 0 1rem;">
          PROYECTOS QUE <span class="cat-hero-title-accent" style="margin-left: 0.06em;">DEJAN MARCA</span>
        </h1>
        <p style="font-family: var(--sm-font-body); font-size: clamp(1.05rem, 1.25vw, 1.2rem); color: var(--text-secondary); max-width: 680px; line-height: 1.6; margin-bottom: 2.5rem;">
          Una muestra de marcas blindadas legalmente, desarrollos web desacoplados en Vite y campañas de performance que multiplicaron los ingresos de nuestros clientes.
        </p>

        <!-- Filter Bar -->
        <div class="cases-filter-bar" id="portfolio-filter-bar">
          <button class="case-filter-btn ${filterCategory === 'all' ? 'is-active' : ''}" data-filter="all" data-cursor="hover">
            Todos (${PROJECTS.length})
          </button>
          ${CATEGORIES.map(cat => `
            <button class="case-filter-btn ${filterCategory === cat.id ? 'is-active' : ''}" data-filter="${cat.id}" data-cursor="hover">
              ${cat.shortTitle}
            </button>
          `).join('')}
        </div>

        <!-- Projects Grid -->
        <div class="cases-grid" id="portfolio-grid">
          ${filteredProjects.map(p => `
            <div class="case-card scale-on-hover" data-project-id="${p.id}">
              <a href="#/proyecto/${p.slug || p.id}" class="case-media-box" style="display: block; text-decoration: none;" data-cursor="view">
                <img src="${p.coverImage}" alt="${p.title}" loading="lazy">
                <span class="case-badge-top">${p.categoryName}</span>
              </a>
              <div class="case-body">
                <div>
                  <div class="case-client-row">
                    <span>${p.client}</span>
                    <span>${p.location}</span>
                  </div>
                  <h4 class="case-title">
                    <a href="#/proyecto/${p.slug || p.id}" style="color: inherit; text-decoration: none;" data-cursor="view">
                      ${p.title}
                    </a>
                  </h4>
                  <p class="case-summary">${p.summary}</p>
                </div>

                <div>
                  <div class="case-metrics-banner">
                    ${p.metrics.map(m => `
                      <div class="case-metric-item">
                        <div class="case-metric-num">${m.value}</div>
                        <div class="case-metric-lbl">${m.label}</div>
                      </div>
                    `).join('')}
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.2rem;">
                    ${p.tags.map(t => `
                      <span class="badge" style="background: var(--bg-subtle); color: var(--text-secondary); font-size: 0.72rem; padding: 0.25rem 0.6rem;">
                        #${t}
                      </span>
                    `).join('')}
                  </div>

                  <a href="#/proyecto/${p.slug || p.id}" class="btn btn-outline btn-sm btn-view-project" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none;" data-cursor="view">
                    <span>Ver Caso Completo & Entregables</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}
    </main>
  `;
}

export function initPortfolioEvents() {
  initFinalCtaEvents();

  const filterBtns = document.querySelectorAll('.case-filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      sounds.playClick();
      window.location.hash = filter === 'all' ? '#/portafolio' : `#/portafolio?cat=${filter}`;
    });
  });

  // Sound feedback on clicking project cards
  const projectLinks = document.querySelectorAll('.btn-view-project');
  projectLinks.forEach(link => {
    link.addEventListener('click', () => {
      sounds.playClick();
    });
  });
}
