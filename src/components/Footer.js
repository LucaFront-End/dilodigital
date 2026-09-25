// Kinetic Editorial Footer Component
import { CATEGORIES } from '../data/categories.js';

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-grid">
          <!-- Col 1: Brand & CDMX Identity -->
          <div class="footer-brand">
            <a href="#/" class="brand-logo" data-cursor="hover">
              <img src="/brand/dilo-logo.png" alt="Dilo Digital MX" style="height: 48px; width: auto;">
            </a>
            <p>
              Agencia Creativa, Digital y Trafficker con base principal en la Ciudad de México. Diseñamos marcas inolvidables, sitios web de alta conversión y campañas de rendimiento que dejan marca.
            </p>
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 1.2rem;">
              <span class="badge badge-primary" style="background: rgba(255, 90, 31, 0.15); color: #FF7E47;">
                📍 CDMX • Nacional & Global
              </span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.08); color: #E2E8F0;">
                Wix Partner & Headless
              </span>
            </div>
          </div>

          <!-- Col 2: Categorías -->
          <div class="footer-col">
            <h4>Soluciones & Servicios</h4>
            <ul class="footer-links">
              ${CATEGORIES.map(c => `
                <li>
                  <a href="#/categoria/${c.slug}" data-cursor="hover">
                    ${c.title}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Col 3: Soluciones Especiales & IMPI -->
          <div class="footer-col">
            <h4>Especialidades Dilo</h4>
            <ul class="footer-links">
              <li>
                <a href="#/registro-marca" data-cursor="hover" style="color: #FF5A1F; font-weight: 600;">
                  ★ Registro de Marca IMPI Online
                </a>
              </li>
              <li><a href="#/servicio/desarrollo-web-wix-headless" data-cursor="hover">Desarrollo Web Headless</a></li>
              <li><a href="#/servicio/meta-google-ads-performance" data-cursor="hover">Performance Ads (Google & Meta)</a></li>
              <li><a href="#/servicio/produccion-audiovisual-ugc" data-cursor="hover">Contenido UGC & Drone 4K</a></li>
              <li><a href="#/portafolio" data-cursor="hover">Casos de Estudio & Clientes</a></li>
            </ul>
          </div>

          <!-- Col 4: Contacto Inmediato -->
          <div class="footer-col">
            <h4>Contacto Directo</h4>
            <ul class="footer-links">
              <li>
                <a href="https://wa.me/525592441070" target="_blank" rel="noopener" data-cursor="hover" style="display: flex; align-items: center; gap: 0.5rem; color: #10B981; font-weight: 700;">
                  <span>WhatsApp: +52 55 9244 1070</span>
                </a>
              </li>
              <li><a href="#/contacto" data-cursor="hover" style="color: var(--color-primary); font-weight: 700;">★ Formulario de Contacto & Intake</a></li>
              <li><a href="#/nosotros" data-cursor="hover">Sobre la Agencia (Nosotros)</a></li>
              <li><a href="mailto:hola@dilodigitalmx.com" data-cursor="hover">hola@dilodigitalmx.com</a></li>
              <li><a href="mailto:cdmx@dilodigitalmx.com" data-cursor="hover">cdmx@dilodigitalmx.com</a></li>
              <li style="margin-top: 0.8rem; color: #94A3B8; font-size: 0.85rem;">
                Oficinas: Ciudad de México, México.
              </li>
            </ul>
          </div>
        </div>

        <!-- Slogan Ribbon -->
        <div style="background: rgba(255, 255, 255, 0.03); border-radius: var(--radius-md); padding: 1.5rem 2rem; margin-bottom: 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="font-family: var(--font-display); font-size: clamp(1.1rem, 2vw, 1.45rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em;">
            "DEJA DE SER UNA MARCA Y COMIENZA A DEJAR <span style="color: var(--color-primary);">MARCA</span>."
          </div>
          <button class="btn btn-primary btn-sm btn-glow" onclick="window.dispatchEvent(new CustomEvent('open-cotizador-modal'))" data-cursor="cotizar">
            Comenzar Proyecto
          </button>
        </div>

        <!-- Footer Bottom Legal -->
        <div class="footer-bottom">
          <div>
            © ${new Date().getFullYear()} Dilo Digital MX. Todos los derechos reservados.
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#/aviso-de-privacidad" data-cursor="hover">Aviso de Privacidad</a>
            <a href="#/registro-marca" data-cursor="hover">Protección de Marca IMPI</a>
            <a href="#/nosotros" data-cursor="hover">Nosotros</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
