// Main Application Entry & Dynamic Router for Dilo Digital MX
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/pages.css';
import './styles/sadu-hero.css';
import './styles/deck-monolith.css';
import './styles/kinetic-reel.css';
import './styles/trusted-by.css';
import './styles/method-stepper.css';
import './styles/testimonials.css';
import './styles/final-cta.css';
import './styles/category-view.css';
import './styles/impi-purchase.css';
import './styles/branding-purchase.css';
import './styles/about-view.css';
import './styles/contact-view.css';

import { renderNavbar, initNavbarEvents } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderEstimatorModal, initEstimatorEvents } from './components/EstimatorModal.js';
import { CustomCursor } from './utils/Cursor.js';

import { renderHomeView, initHomeEvents } from './pages/HomeView.js';
import { renderCategoryView, initCategoryEvents } from './pages/CategoryView.js';
import { renderBrandingPurchaseView, initBrandingEvents } from './pages/BrandingPurchaseView.js';
import { renderServiceView, initServiceEvents } from './pages/ServiceView.js';
import { renderImpiLandingView, initImpiEvents } from './pages/ImpiLandingView.js';
import { renderPortfolioView, initPortfolioEvents } from './pages/PortfolioView.js';
import { renderAboutView, initAboutEvents } from './pages/AboutView.js';
import { renderContactView, initContactEvents } from './pages/ContactView.js';

class App {
  constructor() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    this.appEl = document.getElementById('app');
    this.cursor = new CustomCursor();
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
      mainContentHtml = renderImpiLandingView(initialQuery);
      initCallback = initImpiEvents;
    } else if (path === '#/portafolio') {
      activeRoute = 'portafolio';
      const cat = params.get('cat') || 'all';
      mainContentHtml = renderPortfolioView(cat);
      initCallback = initPortfolioEvents;
    } else if (path === '#/nosotros') {
      activeRoute = 'nosotros';
      mainContentHtml = renderAboutView();
      initCallback = initAboutEvents;
    } else if (path === '#/contacto') {
      activeRoute = 'contacto';
      mainContentHtml = renderContactView();
      initCallback = initContactEvents;
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
    `;

    // Initialize Global and Page Events
    initNavbarEvents();
    initEstimatorEvents();
    if (initCallback) {
      initCallback();
    }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
