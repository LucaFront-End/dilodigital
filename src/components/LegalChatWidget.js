// ================================================================
// DILO DIGITAL — LEGAL CHAT & WHATSAPP FLOATING WIDGET
// Provides direct IP lawyer WhatsApp connection and simulated legal AI assistant
// ================================================================

import { sounds } from '../utils/SoundEngine.js';

export function renderLegalChatWidget() {
  return `
    <div id="dilo-legal-chat-root">
      <!-- Floating Trigger Button -->
      <button class="legal-chat-toggle-btn" id="btn-toggle-legal-chat" aria-label="Abrir Asistencia Legal y WhatsApp" data-cursor="hover">
        <div class="legal-chat-avatar-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-2.023-.49-1.694-.7-2.782-2.435-2.867-2.548-.083-.113-.679-.904-.679-1.724 0-.82.427-1.223.578-1.39.151-.168.33-.21.44-.21.112 0 .223.002.321.007.104.005.244-.04.382.292.143.348.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.088.188-.175.29-.087.102-.184.228-.263.307-.088.088-.18.185-.077.362.103.177.46 0.758.987 1.227.679.605 1.25.792 1.428.88.177.088.281.073.386-.046.105-.12.448-.522.568-.7.12-.178.241-.148.403-.089.163.059 1.033.487 1.21.576.178.089.297.133.34.208.044.075.044.437-.1 1.842z"/>
          </svg>
          <span class="legal-chat-pulse"></span>
        </div>
        <div class="legal-chat-label">
          <span class="legal-chat-title-tag">Abogados IMPI</span>
          <span class="legal-chat-title-main">Chat & WhatsApp</span>
        </div>
      </button>

      <!-- Expandable Legal Panel -->
      <div class="legal-chat-panel" id="legal-chat-panel">
        
        <!-- Header -->
        <div class="legal-chat-header">
          <div class="legal-chat-header-profile">
            <div class="legal-chat-lawyer-avatar">DG</div>
            <div class="legal-chat-header-info">
              <h4>Lic. Daniel Garza</h4>
              <p>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="#10B981"><circle cx="4" cy="4" r="4"/></svg>
                Especialista en Marcas IMPI &middot; En línea
              </p>
            </div>
          </div>
          <button class="legal-chat-close-btn" id="btn-close-legal-chat" aria-label="Cerrar ventana">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="legal-chat-tabs">
          <button class="legal-chat-tab-btn is-active" id="chat-tab-wa" data-target="panel-wa">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771z"/>
            </svg>
            <span>WhatsApp Directo</span>
          </button>
          <button class="legal-chat-tab-btn" id="chat-tab-bot" data-target="panel-bot">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Preguntas Rápidas</span>
          </button>
        </div>

        <!-- Panel Body Content -->
        <div class="legal-chat-content-wrap">
          
          <!-- TAB 1: WHATSAPP DIRECTO -->
          <div class="legal-chat-tab-panel is-active" id="panel-wa">
            <div class="wa-tab-body">
              <div class="wa-msg-bubble">
                👋 <strong>¡Hola! Soy Daniel Garza</strong> de Dilo Digital. Te ayudamos a blindar tu marca ante el IMPI, resolver búsquedas fonéticas o contestar requerimientos y rechazos legales.
              </div>

              <div class="wa-prompt-title">¿Qué trámite deseas consultar hoy?</div>
              
              <div class="wa-quick-options">
                <button class="wa-chip-btn" data-topic="viabilidad">
                  <span>🔍 Analizar coincidencias de mi marca</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button class="wa-chip-btn" data-topic="rechazo">
                  <span>⚠️ Recibí un requerimiento o rechazo del IMPI</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button class="wa-chip-btn" data-topic="registro">
                  <span>🛡️ Registrar mi marca (Paquete Completo 10 Años)</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button class="wa-chip-btn" data-topic="niza">
                  <span>🏷️ No sé en qué Clase NIZA registrar mi negocio</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>

            <div class="wa-launch-footer">
              <a href="https://wa.me/525592441070?text=Hola%20Dilo%20Digital%20⚖️%20Deseo%20asesoria%20con%20el%20registro%20de%20mi%20marca%20ante%20el%20IMPI" 
                 target="_blank" 
                 rel="noopener" 
                 class="btn-wa-full" 
                 id="btn-wa-main-launch"
                 data-cursor="hover">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-2.023-.49-1.694-.7-2.782-2.435-2.867-2.548-.083-.113-.679-.904-.679-1.724 0-.82.427-1.223.578-1.39.151-.168.33-.21.44-.21.112 0 .223.002.321.007.104.005.244-.04.382.292.143.348.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.088.188-.175.29-.087.102-.184.228-.263.307-.088.088-.18.185-.077.362.103.177.46 0.758.987 1.227.679.605 1.25.792 1.428.88.177.088.281.073.386-.046.105-.12.448-.522.568-.7.12-.178.241-.148.403-.089.163.059 1.033.487 1.21.576.178.089.297.133.34.208.044.075.044.437-.1 1.842z"/>
                </svg>
                <span>Chatear por WhatsApp (+52 55 9244 1070)</span>
              </a>
            </div>
          </div>

          <!-- TAB 2: INTERACTIVE LEGAL BOT -->
          <div class="legal-chat-tab-panel" id="panel-bot">
            <div class="bot-messages-area" id="bot-messages-container">
              <div class="bot-msg is-bot">
                Hola, soy el asistente legal de Dilo Digital. Pregúntame sobre tiempos, costos, clases o requerimientos del IMPI:
                <div class="bot-quick-chips">
                  <button class="bot-chip" data-q="tiempo">⏱️ ¿Cuánto tiempo tarda?</button>
                  <button class="bot-chip" data-q="costo">💰 ¿Cuánto cuesta registrar?</button>
                  <button class="bot-chip" data-q="rechazo">⚠️ ¿Qué hago si me rechazaron?</button>
                  <button class="bot-chip" data-q="clases">🏷️ ¿Qué son las clases NIZA?</button>
                </div>
              </div>
            </div>

            <div class="bot-input-footer">
              <input type="text" class="bot-input-field" id="bot-input" placeholder="Escribe tu pregunta sobre el IMPI..." autocomplete="off">
              <button class="bot-send-btn" id="btn-bot-send" aria-label="Enviar pregunta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function initLegalChatEvents() {
  const toggleBtn = document.getElementById('btn-toggle-legal-chat');
  const closeBtn = document.getElementById('btn-close-legal-chat');
  const panel = document.getElementById('legal-chat-panel');

  if (!toggleBtn || !panel) return;

  // Toggle open/close
  toggleBtn.addEventListener('click', () => {
    sounds.playClick();
    panel.classList.toggle('is-open');
  });

  closeBtn?.addEventListener('click', () => {
    sounds.playClick();
    panel.classList.remove('is-open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('is-open')) {
      if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
        panel.classList.remove('is-open');
      }
    }
  });

  // Tab switching
  const tabWa = document.getElementById('chat-tab-wa');
  const tabBot = document.getElementById('chat-tab-bot');
  const panelWa = document.getElementById('panel-wa');
  const panelBot = document.getElementById('panel-bot');

  tabWa?.addEventListener('click', () => {
    sounds.playClick();
    tabWa.classList.add('is-active');
    tabBot?.classList.remove('is-active');
    panelWa?.classList.add('is-active');
    panelBot?.classList.remove('is-active');
  });

  tabBot?.addEventListener('click', () => {
    sounds.playClick();
    tabBot.classList.add('is-active');
    tabWa?.classList.remove('is-active');
    panelBot?.classList.add('is-active');
    panelWa?.classList.remove('is-active');
  });

  // WhatsApp quick chip triggers
  const waChips = document.querySelectorAll('.wa-chip-btn');
  const waMainBtn = document.getElementById('btn-wa-main-launch');

  waChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sounds.playClick();
      const topic = chip.dataset.topic;
      let text = 'Hola Dilo Digital ⚖️ ';
      if (topic === 'viabilidad') {
        text += 'Deseo realizar un análisis de coincidencias y viabilidad de mi marca ante el IMPI.';
      } else if (topic === 'rechazo') {
        text += 'Recibí un requerimiento u oficio de impedimento del IMPI y necesito ayuda urgente para contestarlo y no perder mi marca.';
      } else if (topic === 'registro') {
        text += 'Quiero contratar el paquete de Registro Completo de Marca ante el IMPI (10 años).';
      } else if (topic === 'niza') {
        text += 'Necesito asesoría para clasificar correctamente mi marca en las 45 clases NIZA.';
      }
      const waUrl = `https://wa.me/525592441070?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  });

  // Interactive Bot Logic
  const botContainer = document.getElementById('bot-messages-container');
  const botInput = document.getElementById('bot-input');
  const botSendBtn = document.getElementById('btn-bot-send');

  function appendBotMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `bot-msg ${isUser ? 'is-user' : 'is-bot'}`;
    msgDiv.innerHTML = text;
    botContainer?.appendChild(msgDiv);
    if (botContainer) {
      botContainer.scrollTop = botContainer.scrollHeight;
    }
  }

  function handleBotQuery(query) {
    const qLower = query.toLowerCase().trim();
    if (!qLower) return;

    appendBotMessage(query, true);

    setTimeout(() => {
      sounds.playPop();
      if (qLower.includes('tiempo') || qLower.includes('tarda') || qLower.includes('duracion')) {
        appendBotMessage(
          `⏱️ <strong>Tiempos del IMPI:</strong><br>
           • Dictamen de viabilidad fonética: <strong>24 a 48 horas</strong>.<br>
           • Presentación de solicitud oficial: <strong>1 a 3 días hábiles</strong>.<br>
           • Resolución y emisión del Título de Marca por el IMPI: <strong>3 a 5 meses hábiles</strong> según carga del instituto.<br><br>
           <a href="https://wa.me/525592441070?text=Hola%20Dilo%20Digital,%20quiero%20iniciar%20el%20tramite%20de%20mi%20marca" target="_blank" style="color: #FF5A1F; font-weight:700;">Iniciar trámite en WhatsApp &rarr;</a>`
        );
      } else if (qLower.includes('costo') || qLower.includes('precio') || qLower.includes('cuanto cuesta') || qLower.includes('tarifa')) {
        appendBotMessage(
          `💰 <strong>Inversión Transparente:</strong><br>
           • <strong>Dictamen Previo:</strong> $1,490 MXN neto (100% acreditable al contratar).<br>
           • <strong>Registro Completo (10 años):</strong> $6,976 MXN neto (incluye los <strong>$3,126.41 de derechos oficiales IMPI</strong> y honorarios legales).<br>
           • Facturación fiscal disponible para deducir al 100%.<br><br>
           <a href="#/registro-marca#seccion-paquetes" style="color: #FF5A1F; font-weight:700;">Ver desglose de paquetes &rarr;</a>`
        );
      } else if (qLower.includes('rechazo') || qLower.includes('requerimiento') || qLower.includes('oficio') || qLower.includes('impedimento')) {
        appendBotMessage(
          `⚠️ <strong>¡Podemos salvar tu marca!</strong><br>
           Si recibiste una cita de anterioridad o requerimiento de forma del IMPI, cuentas con un <strong>plazo legal estricto de 2 a 4 meses</strong> para contestarlo.<br>
           Nuestros abogados elaboran la defensa jurídica especializada para revocar el impedimento.<br><br>
           <a href="https://wa.me/525592441070?text=Hola%20Dilo%20Digital,%20recibi%20un%20oficio%20del%20IMPI%20y%20necesito%20asistencia%20legal%20urgente" target="_blank" style="background:#25D366; color:#fff; padding:4px 8px; border-radius:6px; font-weight:700; text-decoration:none; display:inline-block; margin-top:4px;">Defender mi marca por WhatsApp &rarr;</a>`
        );
      } else if (qLower.includes('clase') || qLower.includes('niza') || qLower.includes('categoria')) {
        appendBotMessage(
          `🏷️ <strong>Clasificación NIZA:</strong><br>
           Existen 45 clases internacionales (1 a 34 son productos y 35 a 45 son servicios).<br>
           Ejemplo: Clase 35 (Ventas, ecommerce, marketing), Clase 42 (Software y tecnología), Clase 25 (Ropa y calzado), Clase 43 (Restaurantes y comida).<br>
           Nosotros analizamos tu giro de negocio y te recomendamos la clase exacta sin costo.`
        );
      } else {
        appendBotMessage(
          `Gracias por tu mensaje. Para darte una respuesta legal exacta sobre "<em>${query}</em>", un abogado especialista puede atender tu caso en tiempo real por WhatsApp:<br><br>
           <a href="https://wa.me/525592441070?text=Hola%20Dilo%20Digital,%20tengo%20una%20consulta:%20${encodeURIComponent(query)}" target="_blank" style="color: #FF5A1F; font-weight:700;">Hablar con un abogado por WhatsApp &rarr;</a>`
        );
      }
    }, 400);
  }

  botSendBtn?.addEventListener('click', () => {
    const val = botInput?.value.trim();
    if (val) {
      handleBotQuery(val);
      botInput.value = '';
    }
  });

  botInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = botInput?.value.trim();
      if (val) {
        handleBotQuery(val);
        botInput.value = '';
      }
    }
  });

  // Handle Quick Chips
  document.querySelectorAll('.bot-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const qType = btn.dataset.q;
      if (qType === 'tiempo') handleBotQuery('¿Cuánto tiempo tarda el trámite ante el IMPI?');
      if (qType === 'costo') handleBotQuery('¿Cuánto cuesta el registro de marca completo?');
      if (qType === 'rechazo') handleBotQuery('Recibí un requerimiento o rechazo del IMPI');
      if (qType === 'clases') handleBotQuery('¿Qué son las clases NIZA de marcas?');
    });
  });
}
