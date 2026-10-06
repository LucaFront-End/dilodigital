// ================================================================
// PROJECT DETAIL VIEW — INDIVIDUAL CASE STUDY PAGE
// Dilo Digital MX · Elite Editorial & Tech Experience
// ================================================================

import { PROJECTS } from '../data/projects.js';
import { sounds } from '../utils/SoundEngine.js';
import { renderFinalCta, initFinalCtaEvents } from '../components/FinalCta.js';

export function findProject(slugOrId) {
  if (!slugOrId) return null;
  const target = String(slugOrId).toLowerCase().trim();
  return PROJECTS.find(p => 
    p.id.toLowerCase() === target ||
    p.slug?.toLowerCase() === target ||
    p.id.replace('case-', '').toLowerCase() === target
  ) || null;
}

export function renderProjectDetailView(slugOrId) {
  const project = findProject(slugOrId);

  // Fallback: 404 Case Not Found
  if (!project) {
    return `
      <main class="page-project-detail">
        <section class="container" style="padding: 6rem 1rem; text-align: center;">
          <div class="cat-tag-wrap" style="justify-content: center; margin-bottom: 1.5rem;">
            <span class="cat-diamond-dot"></span>
            <span class="cat-tag-text">CASO NO ENCONTRADO</span>
          </div>
          <h1 style="font-family: var(--sm-font-heading); font-size: clamp(3rem, 6vw, 5.5rem); margin: 0 0 1.5rem; text-transform: uppercase;">
            ESTE PROYECTO NO EXISTE O FUE MOVIDO
          </h1>
          <p style="font-family: var(--sm-font-body); font-size: 1.15rem; color: var(--text-secondary); max-width: 560px; margin: 0 auto 2.5rem;">
            Explora nuestro portafolio de marcas blindadas legalmente, tiendas headless y campañas de performance.
          </p>
          <a href="#/portafolio" class="btn btn-primary btn-lg btn-glow" data-cursor="hover">
            <span>Ver Portafolio Completo</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </section>
      </main>
    `;
  }

  // Prev / Next Project indices
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const waText = encodeURIComponent(`Hola Dilo Digital, estuve revisando el caso de ${project.title} (${project.categoryName}) y me interesa una solución similar para mi empresa.`);
  const waUrl = `https://wa.me/525592441070?text=${waText}`;

  return `
    <main class="page-project-detail">
      <div class="container">
        
        <!-- Top Back & Breadcrumb Bar -->
        <nav class="pjd-top-bar" aria-label="Navegación de caso">
          <a href="#/portafolio" class="pjd-back-btn" id="pjd-back-btn" data-cursor="hover">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Volver a Portafolio</span>
          </a>

          <div class="pjd-breadcrumbs">
            <a href="#/">Inicio</a>
            <span class="pjd-breadcrumb-sep">/</span>
            <a href="#/portafolio">Portafolio</a>
            <span class="pjd-breadcrumb-sep">/</span>
            <a href="#/portafolio?cat=${project.category}">${project.categoryName}</a>
            <span class="pjd-breadcrumb-sep">/</span>
            <span class="pjd-breadcrumb-current">${project.title}</span>
          </div>
        </nav>

        <!-- Monumental Hero Section -->
        <header class="pjd-hero">
          <div class="pjd-pill-row">
            <span class="pjd-category-pill">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#FF5A1F;"></span>
              ${project.categoryName}
            </span>
            <span class="pjd-year-pill">${project.year || '2025'}</span>
            <span class="pjd-year-pill">${project.location || 'México'}</span>
          </div>

          <h1 class="pjd-hero-title">
            ${project.title}
          </h1>

          <p class="pjd-hero-summary">
            ${project.summary}
          </p>

          <div class="pjd-hero-actions">
            <button class="btn btn-primary btn-lg btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
              <span>Cotizar un Proyecto Similar</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-lg" data-cursor="hover" style="display: flex; align-items: center; gap: 0.6rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </header>

        <!-- Metadata Strip -->
        <section class="pjd-meta-strip" aria-label="Ficha de Proyecto">
          <div class="pjd-meta-item">
            <span class="pjd-meta-lbl">Cliente</span>
            <span class="pjd-meta-val">${project.client}</span>
          </div>
          <div class="pjd-meta-item">
            <span class="pjd-meta-lbl">Disciplina</span>
            <span class="pjd-meta-val">${project.categoryName}</span>
          </div>
          <div class="pjd-meta-item">
            <span class="pjd-meta-lbl">Ubicación</span>
            <span class="pjd-meta-val">${project.location}</span>
          </div>
          <div class="pjd-meta-item">
            <span class="pjd-meta-lbl">Duración</span>
            <span class="pjd-meta-val">${project.timeline || 'Sprint Ágil'}</span>
          </div>
          <div class="pjd-meta-item">
            <span class="pjd-meta-lbl">Servicio Clave</span>
            <span class="pjd-meta-val">${project.serviceType || 'Solución Integral'}</span>
          </div>
        </section>

        <!-- 3 High-Impact Key Metrics -->
        <section class="pjd-metrics-grid" aria-label="Métricas de Impacto">
          ${project.metrics.map(m => `
            <div class="pjd-metric-card">
              <div class="pjd-metric-val">${m.value}</div>
              <div class="pjd-metric-lbl">${m.label}</div>
              <div class="pjd-metric-note">${m.note || 'Impacto comprobado'}</div>
            </div>
          `).join('')}
        </section>

        <!-- Main Showcase Hero Image -->
        <figure class="pjd-hero-media">
          <img src="${project.coverImage}" alt="${project.title}" class="pjd-hero-img" loading="eager">
          <div class="pjd-media-tag">
            <span>★</span>
            <span>Caso de Estudio Insignia · Dilo Digital MX</span>
          </div>
        </figure>

        <!-- Deep Storytelling & Sticky Sidebar -->
        <div class="pjd-content-layout">
          
          <!-- Left Column: The Narrative Story -->
          <div class="pjd-story-column">
            
            <!-- Block 1: El Reto -->
            <article class="pjd-story-block">
              <div class="pjd-block-eyebrow">
                <span class="cat-diamond-dot"></span>
                <span>PUNTO DE PARTIDA & DIAGNÓSTICO</span>
              </div>
              <h2 class="pjd-block-title">EL RETO DE NEGOCIO</h2>
              <p class="pjd-block-text">
                ${project.challenge || project.summary}
              </p>
            </article>

            <!-- Block 2: La Solución Estratégica -->
            <article class="pjd-story-block">
              <div class="pjd-block-eyebrow">
                <span class="cat-diamond-dot"></span>
                <span>INGENIERÍA ESTRATÉGICA & CRAFTSMANSHIP</span>
              </div>
              <h2 class="pjd-block-title">LA SOLUCIÓN DE DILO DIGITAL</h2>
              <p class="pjd-block-text">
                ${project.solution || 'Diseñamos una arquitectura integrada que fusionó identidad de marca, tecnología headless y conversión comercial para maximizar el retorno de inversión del cliente.'}
              </p>
            </article>

            <!-- Block 3: Resultados e Impacto -->
            <article class="pjd-story-block">
              <div class="pjd-block-eyebrow">
                <span class="cat-diamond-dot"></span>
                <span>RETORNO DE INVERSIÓN & ESCALABILIDAD</span>
              </div>
              <h2 class="pjd-block-title">EL IMPACTO OBTENIDO</h2>
              <p class="pjd-block-text">
                ${project.resultsSummary || 'Los resultados superaron las proyecciones iniciales, consolidando a la marca como líder en su segmento con infraestructura digital preparada para crecer sin límites.'}
              </p>
            </article>

          </div>

          <!-- Right Column: Sticky Sidebar -->
          <aside class="pjd-sidebar-column">
            
            <!-- Deliverables Card -->
            <div class="pjd-side-card">
              <h3 class="pjd-side-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Entregables Desarrollados</span>
              </h3>
              <ul class="pjd-deliverables-list">
                ${project.deliverables.map(d => `
                  <li>
                    <span class="pjd-check-icon">✓</span>
                    <span>${d}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Tags & Specialties -->
            <div class="pjd-side-card">
              <h3 class="pjd-side-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Tecnología & Disciplinas</span>
              </h3>
              <div class="pjd-tags-flex">
                ${project.tags.map(t => `
                  <span class="pjd-tag-chip">#${t}</span>
                `).join('')}
              </div>
            </div>

            <!-- Client Testimonial (if available) -->
            ${project.testimonial ? `
              <div class="pjd-testimonial-card">
                <div class="pjd-testi-stars">★★★★★</div>
                <blockquote class="pjd-testi-quote">
                  "${project.testimonial.quote}"
                </blockquote>
                <div class="pjd-testi-author">${project.testimonial.author}</div>
                <div class="pjd-testi-role">${project.testimonial.role} &middot; ${project.testimonial.company}</div>
              </div>
            ` : ''}

            <!-- Quick Action Card -->
            <div class="pjd-cta-card">
              <h4>¿TIENES UN PROYECTO EN MENTE?</h4>
              <p>Diseñamos marcas y plataformas web que convierten visitas en facturación real.</p>
              <button class="btn btn-primary btn-md btn-glow" style="width: 100%; justify-content: center;" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                <span>Cotizar en 60 Segundos</span>
              </button>
            </div>

          </aside>

        </div>

        <!-- Optional Contextual Visual Gallery -->
        ${project.gallery && project.gallery.length > 0 ? `
          <section class="pjd-gallery-section" aria-label="Galería visual del caso">
            <div class="cat-tag-wrap" style="margin-bottom: 1.5rem;">
              <span class="cat-diamond-dot"></span>
              <span class="cat-tag-text">GALERÍA VISUAL & DETALLES DE PRODUCCIÓN</span>
            </div>
            <div class="pjd-gallery-grid">
              ${project.gallery.map(img => `
                <div class="pjd-gallery-item">
                  <img src="${img}" alt="Detalle del caso ${project.title}" loading="lazy">
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Next / Prev Project Navigation Footer -->
        <nav class="pjd-nav-footer" aria-label="Navegación entre proyectos">
          <div class="pjd-nav-grid">
            
            <a href="#/proyecto/${prevProject.slug || prevProject.id}" class="pjd-nav-card prev" data-cursor="hover">
              <span class="pjd-nav-direction">← CASO ANTERIOR</span>
              <span class="pjd-nav-title">${prevProject.title}</span>
            </a>

            <a href="#/portafolio" class="pjd-all-projects-btn" data-cursor="hover">
              <span>Ver todos los proyectos</span>
            </a>

            <a href="#/proyecto/${nextProject.slug || nextProject.id}" class="pjd-nav-card next" data-cursor="hover">
              <span class="pjd-nav-direction">SIGUIENTE CASO →</span>
              <span class="pjd-nav-title">${nextProject.title}</span>
            </a>

          </div>
        </nav>

      </div>

      <!-- Signature Final CTA -->
      ${renderFinalCta()}
    </main>
  `;
}

export function initProjectDetailEvents(slugOrId) {
  initFinalCtaEvents();

  // Scroll to top cleanly
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update browser tab title
  const project = findProject(slugOrId);
  if (project) {
    document.title = `${project.title} · Caso de Éxito · Dilo Digital MX`;
  }

  // Audio click on back button
  document.getElementById('pjd-back-btn')?.addEventListener('click', () => {
    sounds.playClick();
  });
}
