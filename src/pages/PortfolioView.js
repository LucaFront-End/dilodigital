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
        <h1 style="font-family: var(--sm-font-heading); font-size: clamp(3.2rem, 6.2vw, 6rem); font-weight: 900; line-height: 0.88; letter-spacing: -2px; text-transform: uppercase; color: #141718; margin: 0 0 1rem;">
          PROYECTOS QUE <span class="cat-hero-title-accent">DEJAN MARCA</span>
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
              <div class="case-media-box">
                <img src="${p.coverImage}" alt="${p.title}" loading="lazy">
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

                  <button class="btn btn-outline btn-sm btn-open-project" data-project-id="${p.id}" style="width: 100%;" data-cursor="view">
                    Ver Caso Completo & Entregables
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}

      <!-- Dynamic Project Modal Container -->
      <div class="modal-overlay" id="project-detail-modal">
        <div class="modal-container" id="project-modal-body"></div>
      </div>
    </main>
  `;
}

export function initPortfolioEvents() {
  initFinalCtaEvents();

  const filterBtns = document.querySelectorAll('.case-filter-btn');
  const modal = document.getElementById('project-detail-modal');
  const modalBody = document.getElementById('project-modal-body');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      sounds.playClick();
      window.location.hash = filter === 'all' ? '#/portafolio' : `#/portafolio?cat=${filter}`;
    });
  });

  // Project Modal details
  const openButtons = document.querySelectorAll('.btn-open-project');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project-id');
      const project = PROJECTS.find(p => p.id === pid);
      if (!project || !modal || !modalBody) return;

      sounds.playPop();
      modalBody.innerHTML = `
        <button class="modal-close-btn" id="btn-close-project-modal" aria-label="Cerrar modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span class="badge badge-primary" style="margin-bottom: 0.8rem;">${project.categoryName}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${project.title}</h2>
        <div style="font-size: 0.9rem; color: var(--text-tertiary); margin-bottom: 1.5rem;">
          Cliente: ${project.client} • Ubicación: ${project.location} • Año: ${project.year}
        </div>

        <img src="${project.coverImage}" alt="${project.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;">

        <p style="font-size: 1.05rem; margin-bottom: 1.8rem; line-height: 1.6;">${project.summary}</p>

        <div style="background: var(--bg-subtle); padding: 1.2rem; border-radius: var(--radius-md); margin-bottom: 1.8rem;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem; text-transform: uppercase;">Entregables Desarrollados:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
            ${project.deliverables.map(d => `
              <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.92rem;">
                <span style="color: var(--color-primary); font-weight: 800;">✓</span>
                <span>${d}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <button class="btn btn-primary btn-lg btn-glow" style="width: 100%; justify-content: center;" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
          Cotizar un Proyecto Similar
        </button>
      `;

      modal.classList.add('is-open');

      document.getElementById('btn-close-project-modal')?.addEventListener('click', () => {
        modal.classList.remove('is-open');
        sounds.playClick();
      });
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-open');
  });
}
