// ================================================================
// THE DECK MONOLITH — NATIVE CSS STICKY 3D STACKING CARDS
// Inspired by Sadu Media Services Stack & Apple Pro Architecture
// 6 Master Disciplines of Dilo Digital MX
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES } from '../data/categories.js';
import { renderCategoryHeroAnimation } from './CategoryAnimations.js';

gsap.registerPlugin(ScrollTrigger);

// Custom curated media assets for each monolithic card
const MONOLITH_MEDIA = {
  branding: {
    badge: 'IDENTIDAD & BLINDAJE',
    image: 'https://www.sadumedia.com/wp-content/uploads/2025/06/0e3479a7dafb42bac87188f122f446f91a671346-1200x668.jpeg',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(255, 90, 31, 0.28)',
    accent: '#FF5A1F',
    highlightTag: 'Blindaje IMPI · Clases 1 a 45',
    disciplines: ['Naming Estratégico', 'Identidad Visual Integral', 'Manual de Marca', 'Packaging & Etiquetas', 'Rebranding B2B/B2C', 'Registro Legal IMPI'],
    stat: '+140 Marcas Blindadas',
    statSub: '98.4% Viabilidad Positiva',
    actionText: 'Explorar Disciplina'
  },
  marketing: {
    badge: 'PERFORMANCE & CONVERSIÓN',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(255, 90, 31, 0.28)',
    accent: '#FF5A1F',
    highlightTag: 'Pauta Premier Meta & Google',
    disciplines: ['Google Ads Search & Shopping', 'Meta Ads Conversión', 'TikTok Ads E-commerce', 'Funnels B2B de Alta Frecuencia', 'WhatsApp CRM Automático', 'ROAS Optimizado por IA'],
    stat: '4.8x ROAS Promedio',
    statSub: '+380K Leads Calificados',
    actionText: 'Escalar Campañas'
  },
  'web-ecommerce': {
    badge: 'HEADLESS & VELOCIDAD EXTREMA',
    image: 'https://www.sadumedia.com/wp-content/uploads/2025/06/Formula-E-05-scaled-2-480x272.jpeg',
    fallback: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(255, 90, 31, 0.28)',
    accent: '#FF5A1F',
    highlightTag: '0.8s FCP · Velocidad Extrema',
    disciplines: ['Wix Headless & React', 'Tiendas Online B2B/B2C', 'Arquitectura UX/UI en Figma', 'Pasarelas Stripe & Mercado Pago', 'Micro-animaciones 60fps', 'Sistemas de Cotización Online'],
    stat: '0.8s Carga Ultrarrápida',
    statSub: '+120 Portales y Tiendas',
    actionText: 'Ver Arquitectura'
  },
  seo: {
    badge: 'AUTORIDAD ORGÁNICA & IA (GEO)',
    image: 'https://www.sadumedia.com/wp-content/uploads/2025/06/sbd-fraud-campaign-480x270.jpg',
    fallback: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(5, 150, 105, 0.28)',
    accent: '#10B981',
    highlightTag: 'Top 3 en Google Search & GEO',
    disciplines: ['SEO Técnico & Siloing', 'Generative Engine Opt (GEO)', 'Datos Estructurados Schema', 'SEO Local por Ciudades CDMX', 'Estrategia EEAT de Contenidos', 'Link Building de Autoridad'],
    stat: '+210% Tráfico Orgánico',
    statSub: 'Top 3 en Términos Transaccionales',
    actionText: 'Dominar Google'
  },
  produccion: {
    badge: 'CINEMÁTICA & FORMATO UGC',
    video: '/video/hero-reel.mp4',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(124, 58, 237, 0.28)',
    accent: '#A855F7',
    highlightTag: '4K 60fps · Drone Certificado',
    disciplines: ['Comerciales Institucionales', 'Reels & TikToks de Alto Enganche', 'Red de Creadores UGC Nativos', 'Tomas con Drone Aéreo 4K', 'Fotografía de Producto & Lifestyle', 'Color Grading Cinemático'],
    stat: '3.2x Mayor CTR en UGC',
    statSub: '+500 Piezas Producidas',
    actionText: 'Ver Showreel'
  },
  tecnologia: {
    badge: 'AUTOMATIZACIÓN & INTELIGENCIA',
    image: 'https://www.sadumedia.com/wp-content/uploads/2025/06/formula-e-jedda-e-prix-480x270.jpg',
    fallback: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    glowColor: 'rgba(2, 132, 199, 0.28)',
    accent: '#38BDF8',
    highlightTag: 'Respuesta < 30s a Prospectos',
    disciplines: ['WhatsApp Business API & Kommo', 'Integración CRM HubSpot/Salesforce', 'Funnels con Make & Zapier', 'Agentes de IA Conversacionales', 'Dashboards BI en Looker Studio', 'Sincronización Bidireccional'],
    stat: '< 30s Tiempo de Respuesta',
    statSub: '85% Ahorro de Tareas Operativas',
    actionText: 'Automatizar Negocio'
  }
};

export function renderDeckMonolith() {
  return `
  <!-- ================================================================
       THE DECK MONOLITH — NATIVE CSS STICKY 3D STACKING CARDS
       ================================================================ -->
  <section class="sm-deck-section" id="deck-monolith">
    
    <!-- Top Sticky Header Bar & Progress Counter -->
    <div class="sm-deck-header-bar">
      <div class="sm-deck-tag-wrap">
        <span class="sm-deck-diamond-dot"></span>
        <span class="sm-deck-tag-text">DISCIPLINAS MAESTRAS · 6 PILARES</span>
      </div>

      <!-- Interactive 6 Pillars Navigation & Pacing Indicator -->
      <nav class="sm-deck-nav-pills" id="sm-deck-nav-pills" aria-label="Navegación de Disciplinas">
        ${CATEGORIES.map((cat, idx) => {
          const shortNames = ['Branding', 'Performance', 'Web & E-com', 'SEO & AI', 'Producción', 'Tecnología'];
          const shortName = shortNames[idx] || cat.title.split(' ')[0];
          return `
          <button type="button" class="sm-deck-nav-btn ${idx === 0 ? 'is-active' : ''}" data-target-index="${idx}">
            <span class="sm-deck-nav-num">${String(idx + 1).padStart(2, '0')}</span>
            <span class="sm-deck-nav-name">${shortName}</span>
          </button>
          `;
        }).join('')}
      </nav>

      <div class="sm-deck-counter">
        <span class="sm-deck-num-current" id="deck-current-num">01</span>
        <span class="sm-deck-num-sep">/</span>
        <span class="sm-deck-num-total">06</span>
      </div>
    </div>

    <!-- Native Sticky Stacking Track -->
    <div class="sm-deck-track" id="sm-deck-track">

      ${CATEGORIES.map((cat, idx) => {
        const media = MONOLITH_MEDIA[cat.id] || MONOLITH_MEDIA.branding;
        const cardNum = String(idx + 1).padStart(2, '0');
        return `
        <!-- STICKY ITEM ${cardNum} -->
        <div class="sm-deck-sticky-item" id="sm-deck-item-${idx}" style="z-index: ${idx + 1};">
          <article class="sm-deck-card sm-deck-card-${idx}" id="sm-deck-card-${idx}" data-card-index="${idx}">
            <div class="sm-deck-card-glow" style="background: radial-gradient(circle at 85% 15%, ${media.glowColor}, transparent 65%);"></div>
            
            <div class="sm-deck-card-inner">
              <!-- Left Column: Typography & Information -->
              <div class="sm-deck-card-left">
                
                <div class="sm-deck-meta-row">
                  <span class="sm-deck-card-number">${cardNum}</span>
                  <div class="sm-deck-pill-badge" style="border-color: ${media.accent}44; color: ${media.accent};">
                    <span class="sm-deck-pill-dot" style="background: ${media.accent};"></span>
                    <span>${media.badge}</span>
                  </div>
                  <span class="sm-deck-highlight-tag">${media.highlightTag}</span>
                </div>

                <h3 class="sm-deck-card-title">${cat.title}</h3>
                
                <p class="sm-deck-card-concept">
                  "${cat.concept}"
                </p>

                <!-- Disciplines Pill Grid -->
                <div class="sm-deck-disciplines">
                  ${media.disciplines.map(item => `
                    <span class="sm-discipline-tag">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      ${item}
                    </span>
                  `).join('')}
                </div>

                <!-- Footer Row: Stats & Action Button -->
                <div class="sm-deck-card-footer">
                  <div class="sm-deck-stat-box">
                    <span class="sm-deck-stat-val">${media.stat}</span>
                    <span class="sm-deck-stat-lbl">${media.statSub}</span>
                  </div>

                  <a href="#/cotizar" class="sm-deck-cta-btn" 
                     onclick="event.preventDefault(); window.dispatchEvent(new CustomEvent('open-cotizador-modal', { detail: { category: '${cat.id}' } }))">
                    <span>${media.actionText}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>

              </div>

              <!-- Right Column: Visual Kinetic Animation Stage -->
              <div class="sm-deck-card-right">
                <div class="sm-deck-media-window" style="background: transparent; border: none; overflow: visible; display: flex; align-items: center; justify-content: center;">
                  ${renderCategoryHeroAnimation(cat.id)}
                </div>
              </div>

            </div>
          </article>
        </div>
        `;
      }).join('')}

      <!-- Trailing spacer to keep content box active for Card 6 sticky stacking and reading -->
      <div class="sm-deck-spacer" id="sm-deck-spacer" aria-hidden="true"></div>

    </div>

  </section>
  `;
}

export function initDeckMonolithEvents() {
  const items = Array.from(document.querySelectorAll('.sm-deck-sticky-item'));
  const currentNumEl = document.getElementById('deck-current-num');
  const navBtns = Array.from(document.querySelectorAll('.sm-deck-nav-btn'));
  if (items.length === 0) return;

  const setActivePill = (activeIdx) => {
    navBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === activeIdx);
    });
    if (currentNumEl) {
      currentNumEl.textContent = String(activeIdx + 1).padStart(2, '0');
    }
  };

  // Click-to-Jump navigation across the 6 master pillars
  navBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetItem = document.getElementById(`sm-deck-item-${idx}`);
      if (targetItem) {
        // Calculate exact scroll target with header offset
        const targetRect = targetItem.getBoundingClientRect();
        const absoluteTop = window.scrollY + targetRect.top - 145;
        window.scrollTo({
          top: absoluteTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // GPU-accelerated depth effects:
  // When a card is docked, it remains 100% BRIGHT, CRISP, AND FULLY VIBRANT.
  // ONLY as the NEXT card actively slides over it (top 60% -> top 18%),
  // the card underneath gently eases back (scale 0.96, y: -12) to create a subtle Apple-style deck stack.
  // ZERO brightness reduction: typography and media remain crystal clear!
  items.forEach((item, idx) => {
    const card = item.querySelector('.sm-deck-card');
    const nextItem = items[idx + 1];

    if (card && nextItem) {
      gsap.to(card, {
        scale: 0.96,
        y: -12,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: nextItem,
          start: 'top 60%', // Begins once next card is visibly moving up over it
          end: 'top 18%',  // Completes right as next card locks into dock
          scrub: 0.5
        }
      });
    }

    // Dynamic Header Counter & Active Pillar Update (01 -> 06)
    // Synchronized to the exact moment each card arrives at the sticky dock
    ScrollTrigger.create({
      trigger: item,
      start: idx === 0 ? 'top 80%' : 'top 30%',
      end: 'bottom 30%',
      onEnter: () => {
        setActivePill(idx);
      },
      onEnterBack: () => {
        setActivePill(idx);
      }
    });
  });

  ScrollTrigger.refresh();
}
