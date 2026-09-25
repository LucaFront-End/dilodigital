// Navbar Component with Mega-menu
import { CATEGORIES } from '../data/categories.js';

export function renderNavbar(activeRoute = 'home') {

  return `
    <header class="site-header" id="site-header">
      <div class="nav-container">
        <!-- Logo -->
        <a href="#/" class="brand-logo" data-cursor="hover" title="Dilo Digital MX">
          <img src="/brand/dilo-logo-dark.png" alt="Dilo Digital MX" onerror="this.src='/brand/dilo-logo.png'; this.style.filter='invert(1)';">
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-menu" role="navigation">
          <a href="#/" class="nav-item ${activeRoute === 'home' ? 'active' : ''}" data-cursor="hover">Inicio</a>
          
          <!-- Categories with Mega-Dropdown -->
          <div class="nav-dropdown-wrapper">
            <a href="#/categorias" class="nav-item ${activeRoute.startsWith('categoria') ? 'active' : ''}" data-cursor="hover">
              Categorías
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>

            <!-- Mega Dropdown Panel -->
            <div class="nav-dropdown-panel">
              ${CATEGORIES.map(cat => `
                <a href="#/categoria/${cat.slug}" class="nav-dropdown-item" data-cursor="hover">
                  <span class="nav-dropdown-number">${cat.number}</span>
                  <div>
                    <div class="nav-dropdown-title">${cat.title}</div>
                    <div class="nav-dropdown-desc">${cat.concept}</div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- IMPI Direct Purchase Landing -->
          <a href="#/registro-marca" class="nav-item ${activeRoute === 'registro-marca' ? 'active' : ''}" data-cursor="hover">
            Registro IMPI
            <span class="badge badge-primary" style="font-size: 0.68rem; padding: 0.15rem 0.45rem; margin-left: 0.35rem;">Online</span>
          </a>

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
            <a href="#/" class="mobile-nav-link">Inicio</a>
            <div style="color: var(--text-tertiary); font-size: 0.8rem; text-transform: uppercase; margin-top: 0.5rem;">Categorías</div>
            ${CATEGORIES.map(c => `
              <a href="#/categoria/${c.slug}" class="mobile-nav-link" style="display: flex; align-items: center; justify-content: space-between; font-size: 1rem; font-weight: 600; padding: 0.4rem 0;">
                <span>${c.number}. ${c.title}</span>
                <span style="color: var(--color-primary);">→</span>
              </a>
            `).join('')}
            <div style="border-top: 1px solid var(--border-light); margin: 0.8rem 0;"></div>
            <a href="#/registro-marca" class="mobile-nav-link" style="color: var(--color-primary);">★ Registro de Marca IMPI</a>
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
