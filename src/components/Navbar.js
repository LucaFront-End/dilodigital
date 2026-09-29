// ================================================================
// DILO DIGITAL — ANIMATED FLOATING MORPHING NAVBAR
// Floating Framer-Motion Style Pill, Smooth Width Folding & Spring Expansion
// ================================================================

import gsap from 'gsap';
import { CATEGORIES } from '../data/categories.js';
import { sounds } from '../utils/SoundEngine.js';

export function renderNavbar(activeRoute = 'home') {
  return `
    <header class="site-header" id="site-header">
      <nav class="animated-nav-pill is-expanded" id="animated-nav-pill" role="navigation" aria-label="Navegación principal">
        
        <!-- Logo Slot -->
        <div class="nav-logo-slot" id="nav-logo-slot">
          <a href="#/" class="brand-logo" data-cursor="hover" title="Dilo Digital MX">
            <img src="/brand/dilo-logo-dark.png" alt="Dilo Digital MX" onerror="this.src='/brand/dilo-logo.png';">
          </a>
        </div>

        <!-- Links Slot -->
        <div class="nav-links-slot" id="nav-links-slot">
          <a href="#/" class="nav-link-item ${activeRoute === 'home' ? 'active' : ''}" data-cursor="hover">Inicio</a>
          
          <!-- Categories Dropdown -->
          <div class="nav-dropdown-wrapper">
            <a href="#/categorias" class="nav-link-item ${activeRoute.startsWith('categoria') ? 'active' : ''}" data-cursor="hover">
              <span>Categorías</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 2px;">
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

          <!-- Registro IMPI -->
          <a href="#/registro-marca" class="nav-link-item ${activeRoute === 'registro-marca' ? 'active' : ''}" data-cursor="hover">
            <span>Registro IMPI</span>
            <span class="nav-item-badge">Online</span>
          </a>

          <!-- Portafolio -->
          <a href="#/portafolio" class="nav-link-item ${activeRoute === 'portafolio' ? 'active' : ''}" data-cursor="hover">Portafolio</a>

          <!-- Nosotros -->
          <a href="#/nosotros" class="nav-link-item ${activeRoute === 'nosotros' ? 'active' : ''}" data-cursor="hover">Nosotros</a>

          <!-- Contacto -->
          <a href="#/contacto" class="nav-link-item ${activeRoute === 'contacto' ? 'active' : ''}" data-cursor="hover">Contacto</a>

          <!-- Portal Trámites IMPI -->
          <a href="#/portal-tramites" class="nav-link-item nav-link-portal ${activeRoute === 'portal-tramites' ? 'active' : ''}" data-cursor="hover">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Portal Trámites</span>
          </a>

          <!-- Actions: Cotizar CTA -->
          <button class="nav-cta-btn" id="btn-open-cotizador" data-cursor="cotizar">
            <span>Cotizar Proyecto</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <!-- Mobile Nav Toggle -->
          <button class="mobile-nav-toggle" id="btn-mobile-nav" aria-label="Abrir Menú" data-cursor="hover">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Collapsed Icon Indicator -->
        <div class="nav-collapsed-icon-wrap" id="nav-collapsed-indicator" aria-hidden="true" title="Abrir Menú">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>

      </nav>

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
            <a href="#/portal-tramites" class="mobile-nav-link" style="color: #38BDF8; display: flex; align-items: center; justify-content: space-between;">
              <span>⚖️ Portal Trámites IMPI</span>
              <span style="font-size: 0.72rem; background: rgba(56, 189, 248, 0.15); padding: 0.15rem 0.5rem; border-radius: 999px;">Clientes &amp; Staff</span>
            </a>
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
  const navPill = document.getElementById('animated-nav-pill');
  const logoSlot = document.getElementById('nav-logo-slot');
  const linksSlot = document.getElementById('nav-links-slot');
  const collapsedIndicator = document.getElementById('nav-collapsed-indicator');
  const cotizarBtn = document.getElementById('btn-open-cotizador');
  const dropdownWrapper = document.querySelector('.nav-dropdown-wrapper');

  const EXPAND_SCROLL_THRESHOLD = 80;

  let isExpanded = true;
  let lastScrollY = window.scrollY || 0;
  let scrollPositionOnCollapse = 0;
  let naturalExpandedWidth = 0;
  let morphTl = null;

  function updateExpandedWidth() {
    if (navPill && isExpanded) {
      naturalExpandedWidth = navPill.scrollWidth || navPill.offsetWidth;
    }
  }

  // Measure once after layout is fully rendered
  requestAnimationFrame(() => {
    updateExpandedWidth();
  });
  window.addEventListener('resize', () => {
    if (isExpanded) updateExpandedWidth();
  }, { passive: true });

  function collapseNav() {
    if (!isExpanded || !navPill) return;
    isExpanded = false;
    scrollPositionOnCollapse = window.scrollY;

    if (dropdownWrapper) dropdownWrapper.classList.remove('is-open');
    if (morphTl) morphTl.kill();

    const startW = navPill.offsetWidth || naturalExpandedWidth;

    navPill.classList.remove('is-expanded');
    navPill.classList.add('is-collapsed');
    navPill.style.overflow = 'hidden';

    morphTl = gsap.timeline({
      onComplete: () => {
        if (linksSlot) linksSlot.style.pointerEvents = 'none';
      }
    });

    // 1. Content gracefully fades and shrinks slightly (0.15s)
    morphTl.to([logoSlot, linksSlot], {
      opacity: 0,
      scale: 0.96,
      duration: 0.15,
      ease: "power2.out"
    }, 0);

    // 2. Liquid pill shrinks smoothly from current width to 48px circle (0.32s)
    morphTl.fromTo(navPill,
      { width: startW },
      {
        width: 48,
        duration: 0.32,
        ease: "power2.inOut"
      },
      0.04
    );

    // 3. Menu Icon pops in with a bouncy spring (0.24s)
    morphTl.fromTo(collapsedIndicator,
      { opacity: 0, scale: 0.6, rotate: -90 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.24,
        ease: "back.out(2)"
      },
      0.16
    );
  }

  function expandNav() {
    if (isExpanded || !navPill) return;
    isExpanded = true;

    if (morphTl) morphTl.kill();

    const targetW = naturalExpandedWidth || 920;
    const startW = navPill.offsetWidth || 48;

    navPill.classList.remove('is-collapsed');
    navPill.classList.add('is-expanded');
    if (linksSlot) linksSlot.style.pointerEvents = 'auto';

    morphTl = gsap.timeline({
      onComplete: () => {
        // Return to auto width & visible overflow so dropdowns pop out seamlessly
        navPill.style.width = 'auto';
        navPill.style.overflow = 'visible';
        gsap.set([logoSlot, linksSlot, collapsedIndicator], { clearProps: 'all' });
        updateExpandedWidth();
      }
    });

    // 1. Menu Icon disappears rapidly (0.1s)
    morphTl.to(collapsedIndicator, {
      opacity: 0,
      scale: 0.6,
      duration: 0.1,
      ease: "power2.in"
    }, 0);

    // 2. Pill smoothly unfolds to full width with responsive spring bounce (0.36s)
    morphTl.fromTo(navPill,
      { width: startW, overflow: 'hidden' },
      {
        width: targetW,
        duration: 0.36,
        ease: "power3.out"
      },
      0.02
    );

    // 3. Content unmasks and scales in smoothly (0.22s)
    morphTl.fromTo([logoSlot, linksSlot],
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.24,
        ease: "power2.out"
      },
      0.14
    );
  }

  // Scroll listener with intelligent tracking:
  // - Down-scroll past 150px collapses into the sleek circular orb
  // - Tracks maximum scroll depth while collapsed so scrolling up 80px from anywhere springs open
  // - Near top (< 60px) stays expanded
  window.addEventListener('scroll', () => {
    const latest = window.scrollY;
    const previous = lastScrollY;

    if (latest < 60) {
      expandNav();
    } else if (isExpanded && latest > previous && latest > 150) {
      collapseNav();
    } else if (!isExpanded) {
      if (latest > scrollPositionOnCollapse) {
        scrollPositionOnCollapse = latest;
      }
      if (latest < previous && (scrollPositionOnCollapse - latest > EXPAND_SCROLL_THRESHOLD)) {
        expandNav();
      }
    }

    lastScrollY = latest;
  }, { passive: true });

  // Clicking the collapsed circle pill immediately springs it back open
  navPill?.addEventListener('click', (e) => {
    if (!isExpanded) {
      e.preventDefault();
      e.stopPropagation();
      expandNav();
      sounds.playPop();
    }
  });

  // Clicking outside when expanded while scrolled down re-collapses
  document.addEventListener('click', (e) => {
    if (isExpanded && window.scrollY > 150 && navPill && !navPill.contains(e.target)) {
      collapseNav();
    }
  });

  // Cotizar modal open
  cotizarBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-cotizador-modal'));
  });

  // Desktop Categories Mega-Menu Safe Hover Intent
  const dropdownPanel = document.querySelector('.nav-dropdown-panel');
  let dropdownCloseTimer = null;

  if (dropdownWrapper && dropdownPanel) {
    const showDropdown = () => {
      if (!isExpanded) return;
      if (dropdownCloseTimer) clearTimeout(dropdownCloseTimer);
      dropdownWrapper.classList.add('is-open');
    };

    const hideDropdown = () => {
      if (dropdownCloseTimer) clearTimeout(dropdownCloseTimer);
      dropdownCloseTimer = setTimeout(() => {
        dropdownWrapper.classList.remove('is-open');
      }, 240);
    };

    dropdownWrapper.addEventListener('mouseenter', showDropdown);
    dropdownWrapper.addEventListener('mouseleave', hideDropdown);
    dropdownPanel.addEventListener('mouseenter', showDropdown);
    dropdownPanel.addEventListener('mouseleave', hideDropdown);

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
