// Main Application Entry & Dynamic Router for Dilo Digital MX
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/pages.css';
import './styles/sadu-hero.css';
import './styles/deck-monolith.css';
import './styles/kinetic-reel.css';
import './styles/works-wheel.css';
import './styles/trusted-by.css';
import './styles/method-stepper.css';
import './styles/testimonials.css';
import './styles/final-cta.css';
import './styles/category-view.css';
import './styles/impi-purchase.css';
import './styles/branding-purchase.css';
import './styles/about-view.css';
import './styles/contact-view.css';
import './styles/wix-chat.css';
import './styles/category-animations.css';
import './styles/user-portal.css';
import './styles/dinametra-services.css';
import './styles/motion-footer.css';
import './styles/checkout.css';
import './styles/legal.css';
import './styles/project-detail.css';
import './styles/discount-popup.css';

import { renderNavbar, initNavbarEvents } from './components/Navbar.js';
import { renderFooter, initFooterEvents } from './components/Footer.js';
import { renderEstimatorModal, initEstimatorEvents } from './components/EstimatorModal.js';
import { renderWixChatWidget, initWixChatEvents } from './components/WixChatWidget.js';
import { renderDiscountPopupModal, initDiscountPopupEvents } from './components/DiscountPopupModal.js';
import { CustomCursor } from './utils/Cursor.js';

import { renderHomeView, initHomeEvents } from './pages/HomeView.js';
import { renderCategoryView, initCategoryEvents } from './pages/CategoryView.js';
import { renderBrandingPurchaseView, initBrandingEvents } from './pages/BrandingPurchaseView.js';
import { renderServiceView, initServiceEvents } from './pages/ServiceView.js';
import { renderImpiLandingView, initImpiEvents } from './pages/ImpiLandingView.js';
import { renderPortfolioView, initPortfolioEvents } from './pages/PortfolioView.js';
import { renderProjectDetailView, initProjectDetailEvents } from './pages/ProjectDetailView.js';
import { renderAboutView, initAboutEvents } from './pages/AboutView.js';
import { renderContactView, initContactEvents } from './pages/ContactView.js';
import { renderUserSectionView, initUserSectionEvents } from './pages/UserSectionView.js';
import { renderCheckoutView, initCheckoutEvents, cleanupCheckout } from './pages/CheckoutView.js';
import { renderCheckoutSuccessView, initCheckoutSuccessEvents, cleanupCheckoutSuccess } from './pages/CheckoutSuccessView.js';
import { initPixel, trackPageView } from './checkout/pixel.js';
import { renderLegalView, initLegalEvents, getLegalDocKey } from './pages/LegalView.js';

/** Evita que buscadores indexen el checkout (URLs con datos de la orden). */
function setNoIndex(enabled) {
  let tag = document.getElementById('dco-robots');
  if (enabled && !tag) {
    tag = document.createElement('meta');
    tag.id = 'dco-robots';
    tag.name = 'robots';
    tag.content = 'noindex, nofollow';
    document.head.appendChild(tag);
  } else if (!enabled && tag) {
    tag.remove();
  }
}

class App {
  constructor() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    this.appEl = document.getElementById('app');
    this.defaultTitle = document.title;
    this.cursor = new CustomCursor();
    initPixel();
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  parseHash() {
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    return { path, params };
  }

  handleRoute() {
    const { path, params } = this.parseHash();
    window.scrollTo({ top: 0, behavior: 'instant' });
    cleanupCheckoutSuccess();
    cleanupCheckout();
    trackPageView();

    // Checkout: shell mínimo sin navbar, footer ni widgets (máxima conversión)
    if (path === '#/checkout/exito' || path === '#/checkout') {
      const isSuccess = path === '#/checkout/exito';
      document.body.classList.add('dco-mode');
      document.body.classList.remove('dlg-mode');
      setNoIndex(true);
      document.body.classList.remove('dilo-modal-open');
      document.body.style.overflow = '';
      this.appEl.innerHTML = `<div id="router-view">${isSuccess ? renderCheckoutSuccessView(params) : renderCheckoutView(params)}</div>`;
      if (isSuccess) initCheckoutSuccessEvents(params);
      else initCheckoutEvents(params);
      return;
    }
    document.body.classList.remove('dco-mode');
    setNoIndex(false);

    // Páginas legales: shell propio, limpio y legible
    const legalKey = getLegalDocKey(path);
    if (legalKey) {
      document.body.classList.add('dlg-mode');
      document.body.classList.remove('dilo-modal-open');
      document.body.style.overflow = '';
      this.appEl.innerHTML = `<div id="router-view">${renderLegalView(legalKey)}</div>`;
      initLegalEvents(legalKey);
      return;
    }
    document.body.classList.remove('dlg-mode');
    document.title = this.defaultTitle;

    let activeRoute = 'home';
    let mainContentHtml = '';
    let initCallback = null;

    if (path === '#/' || path === '#' || path === '') {
      activeRoute = 'home';
      mainContentHtml = renderHomeView();
      initCallback = initHomeEvents;
    } else if (path === '#/categoria/branding-diseno' || path === '#/branding' || path === '#/categorias') {
      activeRoute = 'categoria-branding-diseno';
      mainContentHtml = renderBrandingPurchaseView();
      initCallback = initBrandingEvents;
    } else if (path.startsWith('#/categoria/')) {
      const slug = path.replace('#/categoria/', '');
      activeRoute = `categoria-${slug}`;
      mainContentHtml = renderCategoryView(slug);
      initCallback = initCategoryEvents;
    } else if (path.startsWith('#/servicio/')) {
      const slug = path.replace('#/servicio/', '');
      activeRoute = `servicio-${slug}`;
      mainContentHtml = renderServiceView(slug);
      initCallback = initServiceEvents;
    } else if (path === '#/registro-marca') {
      activeRoute = 'registro-marca';
      const initialQuery = params.get('q') || '';
      const shouldAutoOpen = params.get('open') === 'coincidencias' || params.get('analyze') === '1' || params.get('analyze') === 'true';
      mainContentHtml = renderImpiLandingView(initialQuery);
      initCallback = () => initImpiEvents(shouldAutoOpen);
    } else if (path === '#/portafolio') {
      activeRoute = 'portafolio';
      const cat = params.get('cat') || 'all';
      mainContentHtml = renderPortfolioView(cat);
      initCallback = initPortfolioEvents;
    } else if (path.startsWith('#/proyecto/')) {
      const slugOrId = path.replace('#/proyecto/', '').trim();
      activeRoute = 'proyecto';
      mainContentHtml = renderProjectDetailView(slugOrId);
      initCallback = () => initProjectDetailEvents(slugOrId);
    } else if (path === '#/nosotros') {
      activeRoute = 'nosotros';
      mainContentHtml = renderAboutView();
      initCallback = initAboutEvents;
    } else if (path === '#/contacto') {
      activeRoute = 'contacto';
      mainContentHtml = renderContactView();
      initCallback = initContactEvents;
    } else if (path === '#/portal' || path === '#/portal-tramites' || path === '#/mi-cuenta' || path === '#/usuario') {
      activeRoute = 'portal-tramites';
      mainContentHtml = renderUserSectionView();
      initCallback = initUserSectionEvents;
    } else {
      // Fallback
      activeRoute = 'home';
      mainContentHtml = renderHomeView();
      initCallback = initHomeEvents;
    }

    // Assemble Full App Shell
    this.appEl.innerHTML = `
      ${renderNavbar(activeRoute)}
      <div id="router-view">
        ${mainContentHtml}
      </div>
      ${renderFooter()}
      ${renderEstimatorModal()}
      ${renderDiscountPopupModal()}
      ${renderWixChatWidget()}
    `;

    // Initialize Global and Page Events
    initNavbarEvents();
    initEstimatorEvents();
    initDiscountPopupEvents();
    initWixChatEvents();
    initFooterEvents();
    if (initCallback) {
      initCallback();
    }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
