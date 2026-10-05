// Navbar Component with Mega-menu
import { CATEGORIES } from '../data/categories.js';

function getCategory3DIcon(id) {
  switch (id) {
    case 'branding':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l2.6 6.4L21 11l-5 4.8 1.4 6.7L12 19l-5.4 3.5 1.4-6.7-5-4.8 6.4-2.6L12 2z"></path>
      </svg>`;
    case 'marketing':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>`;
    case 'web-ecommerce':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`;
    case 'seo':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16" y2="16"></line>
        <circle cx="11" cy="11" r="3"></circle>
      </svg>`;
    case 'produccion':
    case 'audiovisual':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>`;
    case 'tecnologia':
    case 'tech-ia':
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>`;
    default:
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>`;
  }
}

export function renderNavbar(activeRoute = 'home') {
  const isHome = activeRoute === 'home';

  return `
    <header class="site-header ${isHome ? 'is-intro-hidden' : ''}" id="site-header">
      <div class="nav-container">
        <!-- Logo -->
        <a href="#/" class="brand-logo" data-cursor="hover" title="Dilo Digital MX">
          <img src="/brand/dilo-logo-dark.png" alt="Dilo Digital MX" onerror="this.src='/brand/dilo-logo.png'; this.style.filter='invert(1)';">
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-menu" role="navigation">
          <!-- Categories with Mega-Dropdown -->
          <div class="nav-dropdown-wrapper">
            <a href="#/categorias" class="nav-item ${activeRoute.startsWith('categoria') || activeRoute === 'registro-marca' ? 'active' : ''}" data-cursor="hover">
              Categorías
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>

            <!-- Mega Dropdown Panel -->
            <div class="nav-dropdown-panel">
              ${CATEGORIES.map(cat => `
                <a href="#/categoria/${cat.slug}" class="nav-dropdown-item" data-cursor="hover">
                  <span class="nav-dropdown-icon-3d" aria-hidden="true">${getCategory3DIcon(cat.id)}</span>
                  <div>
                    <div class="nav-dropdown-title">${cat.title}</div>
                    <div class="nav-dropdown-desc">${cat.concept}</div>
                  </div>
                </a>
              `).join('')}
              <div style="border-top: 1px solid var(--border-light, rgba(0,0,0,0.08)); margin: 0.4rem 0;"></div>
              <a href="#/registro-marca" class="nav-dropdown-item nav-dropdown-featured" data-cursor="hover" style="background: rgba(255, 90, 31, 0.05); border-radius: 8px;">
                <span class="nav-dropdown-icon-3d is-featured" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </span>
                <div>
                  <div class="nav-dropdown-title" style="display: flex; align-items: center; gap: 0.4rem; color: #FF5A1F;">
                    Registro de Marca IMPI
                    <span class="badge badge-primary" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Online</span>
                  </div>
                  <div class="nav-dropdown-desc">Blindaje legal, búsqueda fonética y registro en 10 años</div>
                </div>
              </a>
            </div>
          </div>

          <!-- Portfolio -->
          <a href="#/portafolio" class="nav-item ${activeRoute === 'portafolio' ? 'active' : ''}" data-cursor="hover">Portafolio</a>

          <!-- About -->
          <a href="#/nosotros" class="nav-item ${activeRoute === 'nosotros' ? 'active' : ''}" data-cursor="hover">Nosotros</a>

          <!-- Contact -->
          <a href="#/contacto" class="nav-item ${activeRoute === 'contacto' ? 'active' : ''}" data-cursor="hover">Contacto</a>
        </nav>

        <!-- Actions -->
        <div class="nav-actions">

          <!-- Cotizar Modal CTA -->
          <button class="btn btn-primary btn-sm btn-glow" id="btn-open-cotizador" data-cursor="cotizar">
            <span>Cotizar Proyecto</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <!-- Mobile Nav Toggle -->
          <button class="mobile-nav-toggle" id="btn-mobile-nav" aria-label="Abrir Menú" data-cursor="hover">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <div class="mobile-nav-drawer" id="mobile-nav-drawer">
        <div class="mobile-drawer-content">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
            <img src="/brand/dilo-logo-dark.png" alt="Dilo Digital" style="height: 38px;">
            <button class="modal-close-btn" id="btn-close-mobile-nav" aria-label="Cerrar">✕</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 1.15rem; font-weight: 700;">
            <div style="color: var(--text-tertiary); font-size: 0.8rem; text-transform: uppercase; margin-top: 0.5rem;">Categorías</div>
            ${CATEGORIES.map(c => `
              <a href="#/categoria/${c.slug}" class="mobile-nav-link" style="display: flex; align-items: center; justify-content: space-between; font-size: 1rem; font-weight: 600; padding: 0.4rem 0;">
                <span>${c.number}. ${c.title}</span>
                <span style="color: var(--color-primary);">→</span>
              </a>
            `).join('')}
            <a href="#/registro-marca" class="mobile-nav-link" style="color: var(--color-primary); font-size: 1rem; display: flex; align-items: center; justify-content: space-between;">
              <span>★ Registro de Marca IMPI</span>
              <span class="badge badge-primary" style="font-size: 0.65rem;">Online</span>
            </a>
            <div style="border-top: 1px solid var(--border-light); margin: 0.8rem 0;"></div>
            <a href="#/portafolio" class="mobile-nav-link">Portafolio</a>
            <a href="#/nosotros" class="mobile-nav-link">Nosotros</a>
            <a href="#/contacto" class="mobile-nav-link" style="color: var(--color-primary);">Contacto Directo</a>
          </div>
          <div style="margin-top: 2rem;">
            <button class="btn btn-primary btn-lg btn-glow" style="width: 100%; justify-content: center;" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))">
              Cotizar Proyecto
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const header = document.getElementById('site-header');
  const cotizarBtn = document.getElementById('btn-open-cotizador');

  // If loader host does not exist on this page, ensure header is shown immediately
  if (!document.getElementById('sm-loader-host')) {
    header?.classList.remove('is-intro-hidden');
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Cotizar modal open
  cotizarBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-cotizador-modal'));
  });

  // Desktop Categories Mega-Menu Safe Hover Intent
  const dropdownWrapper = document.querySelector('.nav-dropdown-wrapper');
  const dropdownPanel = document.querySelector('.nav-dropdown-panel');
  let dropdownCloseTimer = null;

  if (dropdownWrapper && dropdownPanel) {
    const showDropdown = () => {
      if (dropdownCloseTimer) clearTimeout(dropdownCloseTimer);
      dropdownWrapper.classList.add('is-open');
    };

    const hideDropdown = () => {
      if (dropdownCloseTimer) clearTimeout(dropdownCloseTimer);
      dropdownCloseTimer = setTimeout(() => {
        dropdownWrapper.classList.remove('is-open');
      }, 240); // 240ms grace buffer allows effortless diagonal mouse transit
    };

    dropdownWrapper.addEventListener('mouseenter', showDropdown);
    dropdownWrapper.addEventListener('mouseleave', hideDropdown);
    dropdownPanel.addEventListener('mouseenter', showDropdown);
    dropdownPanel.addEventListener('mouseleave', hideDropdown);

    // Close immediately when clicking any item
    dropdownPanel.querySelectorAll('.nav-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        dropdownWrapper.classList.remove('is-open');
      });
    });
  }

  // Mobile drawer controls
  const mobileToggle = document.getElementById('btn-mobile-nav');
  const mobileClose = document.getElementById('btn-close-mobile-nav');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  mobileToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.add('is-open');
    sounds.playPop();
  });

  mobileClose?.addEventListener('click', () => {
    mobileDrawer?.classList.remove('is-open');
    sounds.playClick();
  });

  mobileDrawer?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
    });
  });
}
