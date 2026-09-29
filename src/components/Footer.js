// ================================================================
// DILO DIGITAL — CINEMATIC MOTION FOOTER
// Curtain Reveal, Parallax Giant "DILO", Diagonal Marquee & Categorized Quick Links
// ================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function renderFooter() {
  return `
    <!-- The "Curtain Reveal" Wrapper:
         Sits in natural flow with clip-path so its contents are ONLY visible within its bounding box.
         The fixed footer underneath is revealed as the previous content lifts away. -->
    <div class="cinematic-footer-wrapper" id="cinematic-footer-wrapper">
      
      <footer class="cinematic-footer-fixed" id="cinematic-footer-fixed">
        
        <!-- Ambient Light Aurora & Grid Background -->
        <div class="footer-aurora" aria-hidden="true"></div>
        <div class="footer-bg-grid" aria-hidden="true"></div>

        <!-- Giant Background Parallax Text ("DILO") -->
        <div class="footer-giant-bg-text" id="footer-giant-dilo" aria-hidden="true">
          DILO
        </div>

        <!-- 1. Diagonal Sleek Marquee (Positioned below the fixed navbar for 100% visibility) -->
        <div class="footer-diagonal-marquee" aria-hidden="true">
          <div class="footer-marquee-track">
            <div class="footer-marquee-group">
              <span>Branding de Alto Impacto</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Ingeniería Web Headless</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Protección de Marca IMPI</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Growth &amp; Performance</span> <span class="footer-marquee-star">&#10022;</span>
              <span>ROAS 5.4X</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Sprints de 15 Días</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Sin Intermediarios</span> <span class="footer-marquee-star">&#10022;</span>
            </div>
            <div class="footer-marquee-group">
              <span>Branding de Alto Impacto</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Ingeniería Web Headless</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Protección de Marca IMPI</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Growth &amp; Performance</span> <span class="footer-marquee-star">&#10022;</span>
              <span>ROAS 5.4X</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Sprints de 15 Días</span> <span class="footer-marquee-star">&#10022;</span>
              <span>Sin Intermediarios</span> <span class="footer-marquee-star">&#10022;</span>
            </div>
          </div>
        </div>

        <!-- 2. Main Center Content -->
        <div class="footer-center-content">
          
          <h2 class="footer-text-glow" id="footer-heading">
            ¿Listo para dejar marca?
          </h2>

          <!-- Primary Action Magnetic Pills -->
          <div class="footer-primary-pills-row" id="footer-actions">
            <div class="footer-magnetic-btn">
              <button class="footer-glass-pill pill-primary pill-accent" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>Cotizar Proyecto en 60s</span>
              </button>
            </div>

            <div class="footer-magnetic-btn">
              <a href="https://wa.me/525592441070" target="_blank" rel="noopener" class="footer-glass-pill pill-primary" data-cursor="hover">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="color: #10B981;">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.784 2.806.784 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.479 9.984-9.969 9.984-1.748 0-3.385-.452-4.815-1.246l-5.216 1.369 1.393-5.086c-.885-1.488-1.393-3.228-1.393-5.021 0-5.505 4.479-9.984 9.969-9.984 5.505 0 10.026 4.479 10.026 9.984z"/>
                </svg>
                <span>WhatsApp Directo &middot; CDMX</span>
              </a>
            </div>

            <div class="footer-magnetic-btn">
              <a href="#/registro-marca" class="footer-glass-pill pill-primary" data-cursor="hover">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" style="color: #38BDF8;">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Consulta IMPI Express</span>
              </a>
            </div>
          </div>

          <!-- 3. Categorized Quick Links Grid (Soluciones, Especialidades, Agencia, Legal) -->
          <div class="footer-quicklinks-grid" id="footer-links">
            
            <!-- Col 1: Soluciones -->
            <div class="footer-quick-col">
              <span class="footer-quick-title">Soluciones</span>
              <ul class="footer-quick-list">
                <li><a href="#/categoria/branding-identidad" data-cursor="hover">Branding &amp; Identidad</a></li>
                <li><a href="#/servicio/desarrollo-web-wix-headless" data-cursor="hover">Desarrollo Web Headless</a></li>
                <li><a href="#/servicio/meta-google-ads-performance" data-cursor="hover">Performance &amp; Ads (ROAS)</a></li>
                <li><a href="#/servicio/produccion-audiovisual-ugc" data-cursor="hover">Contenido UGC &amp; Drone 4K</a></li>
              </ul>
            </div>

            <!-- Col 2: Especialidades Dilo -->
            <div class="footer-quick-col">
              <span class="footer-quick-title">Especialidades</span>
              <ul class="footer-quick-list">
                <li><a href="#/registro-marca" class="quick-highlight" data-cursor="hover">★ Registro de Marca IMPI</a></li>
                <li><a href="#/portal-tramites" data-cursor="hover">⚖️ Portal de Trámites</a></li>
                <li><a href="#/portafolio" data-cursor="hover">Casos de Éxito Insignia</a></li>
                <li><a href="#/registro-marca?open=coincidencias" data-cursor="hover">Dictamen Viabilidad 24h</a></li>
              </ul>
            </div>

            <!-- Col 3: Agencia & Contacto -->
            <div class="footer-quick-col">
              <span class="footer-quick-title">Agencia</span>
              <ul class="footer-quick-list">
                <li><a href="#/nosotros" data-cursor="hover">Sobre Nosotros (Equipo)</a></li>
                <li><a href="#metodo-dilo" data-cursor="hover">El Método Dilo en 4 Fases</a></li>
                <li><a href="#/contacto" data-cursor="hover">Formulario de Intake &amp; Brief</a></li>
                <li><span class="footer-quick-city">📍 CDMX &middot; Global Operations</span></li>
              </ul>
            </div>

            <!-- Col 4: Legal & Confidencial -->
            <div class="footer-quick-col">
              <span class="footer-quick-title">Legal &amp; Confidencial</span>
              <ul class="footer-quick-list">
                <li><a href="#/aviso-de-privacidad" data-cursor="hover">Aviso de Privacidad</a></li>
                <li><a href="#/registro-marca" data-cursor="hover">Protección de Activos</a></li>
                <li><a href="#/contacto" data-cursor="hover">Acuerdo de Confidencialidad (NDA)</a></li>
                <li><span class="footer-quick-badge">Garantía de Satisfacción 100%</span></li>
              </ul>
            </div>

          </div>

        </div>

        <!-- 4. Bottom Bar / Credits -->
        <div class="footer-bottom-bar">
          <!-- Copyright -->
          <div class="footer-copyright">
            &copy; ${new Date().getFullYear()} DILO DIGITAL MX. TODOS LOS DERECHOS RESERVADOS.
          </div>

          <!-- "Made with Love" Badge -->
          <div class="footer-glass-pill footer-crafted-badge">
            <span>Crafted with</span>
            <span class="footer-heartbeat">&#x2764;</span>
            <span>by</span>
            <span class="footer-crafted-brand">Dilo Digital &middot; CDMX</span>
          </div>

          <!-- Back to Top Magnetic Button -->
          <div class="footer-magnetic-btn">
            <button class="footer-glass-pill footer-back-to-top" id="footer-scroll-top-btn" aria-label="Volver arriba" data-cursor="hover">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </footer>
    </div>
  `;
}

export function initFooterEvents() {
  const wrapper = document.getElementById('cinematic-footer-wrapper');
  const giantText = document.getElementById('footer-giant-dilo');
  const heading = document.getElementById('footer-heading');
  const actions = document.getElementById('footer-actions');
  const links = document.getElementById('footer-links');
  const scrollTopBtn = document.getElementById('footer-scroll-top-btn');

  // 1. Back to Top Smooth Scroll
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. GSAP ScrollTrigger Animations
  if (wrapper && giantText && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Parallax Giant DILO Background Text
    gsap.fromTo(
      giantText,
      { y: '12vh', scale: 0.85, opacity: 0 },
      {
        y: '0vh',
        scale: 1,
        opacity: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );

    // Staggered Content Reveal
    if (heading && actions && links) {
      gsap.fromTo(
        [heading, actions, links],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 45%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }
  }

  // 3. Magnetic Button Physics (Zero Dependency 3D Cursor Physics)
  const magneticItems = Array.from(document.querySelectorAll('.footer-magnetic-btn'));
  if (magneticItems.length && typeof gsap !== 'undefined') {
    magneticItems.forEach((btnContainer) => {
      const target = btnContainer.firstElementChild || btnContainer;

      const handleMouseMove = (e) => {
        const rect = target.getBoundingClientRect();
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        const deltaX = e.clientX - rect.left - halfW;
        const deltaY = e.clientY - rect.top - halfH;

        gsap.to(target, {
          x: deltaX * 0.38,
          y: deltaY * 0.38,
          rotationX: -deltaY * 0.14,
          rotationY: deltaX * 0.14,
          scale: 1.05,
          ease: 'power2.out',
          duration: 0.35,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1.1,
        });
      };

      btnContainer.addEventListener('mousemove', handleMouseMove);
      btnContainer.addEventListener('mouseleave', handleMouseLeave);
    });
  }
}
