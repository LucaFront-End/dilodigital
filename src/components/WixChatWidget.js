// ================================================================
// DILO DIGITAL — WIX INBOX LIVE CHAT & WHATSAPP FLOATING SYSTEM
// Exact Wix Inbox + CRM architecture modeled from Kamibi project
// ================================================================

import { sounds } from '../utils/SoundEngine.js';
import { sendLeadToWix } from '../lib/wixClient.js';

export function renderWixChatWidget() {
  return `
    <div class="dilo-floating-system" id="dilo-floating-system">
      
      <!-- 1. Floating WhatsApp Button -->
      <a href="https://wa.me/525592441070?text=${encodeURIComponent('Hola Dilo Digital, me gustaría recibir asesoría personalizada.')}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="floating-wa-btn" 
         id="btn-floating-whatsapp"
         aria-label="Chatear por WhatsApp Directo"
         data-cursor="hover">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.058-2.023-.49-1.694-.7-2.782-2.435-2.867-2.548-.083-.113-.679-.904-.679-1.724 0-.82.427-1.223.578-1.39.151-.168.33-.21.44-.21.112 0 .223.002.321.007.104.005.244-.04.382.292.143.348.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.088.188-.175.29-.087.102-.184.228-.263.307-.088.088-.18.185-.077.362.103.177.46 0.758.987 1.227.679.605 1.25.792 1.428.88.177.088.281.073.386-.046.105-.12.448-.522.568-.7.12-.178.241-.148.403-.089.163.059 1.033.487 1.21.576.178.089.297.133.34.208.044.075.044.437-.1 1.842z"/>
        </svg>
        <span class="floating-tooltip">WhatsApp Directo</span>
      </a>

      <!-- 2. Floating Wix Chat Bubble Button -->
      <button class="wix-chat-bubble" id="btn-toggle-wix-chat" aria-label="Abrir Chat de Soporte" data-cursor="hover">
        <div class="chat-bubble-inner" id="wix-chat-bubble-inner">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12C2,14.63 3.03,17.03 4.71,18.83L3,23L7.47,21.82C8.84,22.58 10.37,23 12,23A10,10 0 0,0 22,13A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C10.66,20 9.42,19.67 8.33,19.09L8.06,18.94L5.16,19.7L5.94,17.8L5.78,17.55C5.28,16.75 5,15.82 5,14.83A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12a6,6 0 0,0-6-6z"/>
          </svg>
          <span class="bubble-ping"></span>
        </div>
        <span class="floating-tooltip">Chat en Línea</span>
      </button>

      <!-- 3. Wix Chat Window Panel -->
      <div class="wix-chat-window" id="wix-chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-info">
            <div class="avatar-group">
              <div class="avatar">D</div>
              <span class="online-badge"></span>
            </div>
            <div class="info-text">
              <h3>Dilo Digital</h3>
              <div class="status-indicator">
                <span>Soporte Activo ⚡</span>
                <span class="dot-divider">•</span>
                <span>En línea</span>
              </div>
            </div>
          </div>
          <button class="chat-close-btn" id="btn-close-wix-chat" aria-label="Cerrar chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Body (Dynamic Views) -->
        <div class="chat-body" id="wix-chat-body">
          <div class="chat-loading-screen">
            <div class="premium-spinner"></div>
            <p>Conectando soporte Dilo Digital...</p>
          </div>
        </div>

        <!-- Footer (Messages Input Form) -->
        <div id="wix-chat-footer-wrap"></div>

      </div>

    </div>
  `;
}

// ─── WIX CHAT STATE & CONTROLLER ──────────────────────────────────
let isOpen = false;
let status = 'connecting'; // 'connecting' | 'setup' | 'online' | 'fallback'
let conversationId = localStorage.getItem('dilo_chat_convo_id') || '';
let contactId = localStorage.getItem('dilo_chat_contact_id') || '';
let messages = [];
let isSending = false;
let isTyping = false;
let pollInterval = null;
let lastDiagInfo = null;

export function initWixChatEvents() {
  const toggleBtn = document.getElementById('btn-toggle-wix-chat');
  const closeBtn = document.getElementById('btn-close-wix-chat');
  const windowEl = document.getElementById('wix-chat-window');

  if (!toggleBtn || !windowEl) return;

  // Toggle open/close
  toggleBtn.onclick = () => {
    sounds.playClick();
    setOpenState(!isOpen);
  };

  closeBtn.onclick = () => {
    sounds.playClick();
    setOpenState(false);
  };

  // Initial check on load
  checkStoredConversation();
}

function setOpenState(open) {
  isOpen = open;
  const windowEl = document.getElementById('wix-chat-window');
  const bubbleInner = document.getElementById('wix-chat-bubble-inner');

  if (!windowEl) return;

  if (isOpen) {
    windowEl.classList.add('is-open');
    if (bubbleInner) {
      bubbleInner.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    }
    // Start polling if online
    startPolling();
    // Scroll to bottom
    scrollToBottom();
    // Auto-focus input if online
    setTimeout(() => {
      const input = document.getElementById('wix-chat-text-input');
      input?.focus();
    }, 250);
  } else {
    windowEl.classList.remove('is-open');
    if (bubbleInner) {
      bubbleInner.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12C2,14.63 3.03,17.03 4.71,18.83L3,23L7.47,21.82C8.84,22.58 10.37,23 12,23A10,10 0 0,0 22,13A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C10.66,20 9.42,19.67 8.33,19.09L8.06,18.94L5.16,19.7L5.94,17.8L5.78,17.55C5.28,16.75 5,15.82 5,14.83A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12a6,6 0 0,0-6-6z"/>
        </svg>
        <span class="bubble-ping"></span>
      `;
    }
    stopPolling();
  }
}

// ─── VERIFY STORED CONVERSATION OR SHOW SETUP ──────────────────────
async function checkStoredConversation() {
  if (conversationId) {
    try {
      const res = await fetch(`/api/chat?action=list&conversationId=${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages) {
          messages = sortMessages(data.messages);
          status = 'online';
          renderBody();
          return;
        }
      }
      // If conversation expired or invalid
      localStorage.removeItem('dilo_chat_convo_id');
      localStorage.removeItem('dilo_chat_contact_id');
      conversationId = '';
    } catch (e) {
      console.warn('[WixChat] Verification warning:', e);
    }
  }

  status = 'setup';
  renderBody();
}

function sortMessages(msgList = []) {
  return [...msgList].sort((a, b) => {
    const dateA = new Date(a.createdDate || a.createdAt || a._createdDate || 0);
    const dateB = new Date(b.createdDate || b.createdAt || b._createdDate || 0);
    return dateA - dateB;
  });
}

// ─── RENDER BODY BASED ON STATUS ──────────────────────────────────
function renderBody() {
  const bodyEl = document.getElementById('wix-chat-body');
  const footerWrap = document.getElementById('wix-chat-footer-wrap');
  if (!bodyEl) return;

  if (status === 'connecting') {
    bodyEl.innerHTML = `
      <div class="chat-loading-screen">
        <div class="premium-spinner"></div>
        <p>Conectando soporte Dilo Digital...</p>
      </div>
    `;
    if (footerWrap) footerWrap.innerHTML = '';
  } else if (status === 'setup') {
    renderSetupView(bodyEl, footerWrap);
  } else if (status === 'online') {
    renderOnlineView(bodyEl, footerWrap);
  } else if (status === 'fallback') {
    renderFallbackView(bodyEl, footerWrap);
  }
}

// ─── 1. SETUP VIEW (REGISTER CRM CONTACT & CONVERSATION) ──────────
function renderSetupView(bodyEl, footerWrap) {
  if (footerWrap) footerWrap.innerHTML = '';

  bodyEl.innerHTML = `
    <div class="setup-form-container">
      <h4>Iniciar Chat con un Asesor</h4>
      <p class="setup-desc">
        Ingresa tus datos para conectarte en vivo con nuestro equipo de estrategia y marcas.
      </p>
      <form class="premium-form" id="wix-chat-setup-form">
        <div class="form-group-premium">
          <label for="chat-setup-name">Nombre Completo *</label>
          <input type="text" id="chat-setup-name" required placeholder="Ej. Carlos Mendoza" autocomplete="name">
        </div>

        <div class="form-group-premium">
          <label for="chat-setup-email">Correo Electrónico *</label>
          <input type="email" id="chat-setup-email" required placeholder="carlos@empresa.com" autocomplete="email">
        </div>

        <div class="form-group-premium">
          <label for="chat-setup-phone">Teléfono / WhatsApp *</label>
          <input type="tel" id="chat-setup-phone" required placeholder="55 1234 5678" autocomplete="tel">
        </div>

        <div id="setup-error-container"></div>

        <button type="submit" class="premium-submit-btn" id="btn-submit-chat-setup">
          <span>Comenzar Chat en Vivo</span>
        </button>
      </form>
    </div>
  `;

  const setupForm = document.getElementById('wix-chat-setup-form');
  setupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('chat-setup-name')?.value.trim();
    const email = document.getElementById('chat-setup-email')?.value.trim();
    const phone = document.getElementById('chat-setup-phone')?.value.trim();
    const submitBtn = document.getElementById('btn-submit-chat-setup');
    const errContainer = document.getElementById('setup-error-container');

    if (!email) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<div class="btn-loader-spinner"></div>`;
    }
    if (errContainer) errContainer.innerHTML = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'init', name, email, phone })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'No se pudo conectar con Wix Inbox');
      }

      if (data.conversationId) {
        conversationId = data.conversationId;
        contactId = data.contactId || '';
        localStorage.setItem('dilo_chat_convo_id', conversationId);
        if (contactId) localStorage.setItem('dilo_chat_contact_id', contactId);

        status = 'online';
        renderBody();
        startPolling();
      } else {
        throw new Error('No se recibió ID de conversación');
      }
    } catch (err) {
      console.warn('[WixChat] Init error:', err.message);
      if (errContainer) {
        errContainer.innerHTML = `
          <div class="diag-error-card">
            <p class="diag-error-text">${err.message}</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="diag-run-btn" id="btn-run-diag">🔍 Diagnosticar conexión</button>
              <button type="button" class="diag-run-btn" style="border-color: #64748B; color: #475569;" id="btn-use-fallback">Dejar un mensaje</button>
            </div>
            <div id="diag-output-box"></div>
          </div>
        `;

        document.getElementById('btn-run-diag')?.addEventListener('click', runDiagnostics);
        document.getElementById('btn-use-fallback')?.addEventListener('click', () => {
          status = 'fallback';
          renderBody();
        });
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Comenzar Chat en Vivo</span>`;
      }
    }
  });
}

// ─── 2. ONLINE VIEW (LIVE MESSAGES STREAM) ────────────────────────
function renderOnlineView(bodyEl, footerWrap) {
  // Messages Area
  bodyEl.innerHTML = `
    <div class="messages-history">
      ${messages.length === 0 ? `
        <div class="chat-welcome-container">
          <div class="welcome-logo">D</div>
          <h4>¡Bienvenido a Dilo Digital!</h4>
          <p>¿En qué podemos ayudarte hoy? Elige una consulta rápida o escribe directamente a nuestro equipo.</p>
        </div>
        <div class="quick-prompts-container">
          <button class="quick-prompt-btn" data-text="Hola, deseo consultar el proceso y costos para registrar mi marca ante el IMPI.">
            ⚖️ ¿Cómo registro mi marca ante el IMPI?
          </button>
          <button class="quick-prompt-btn" data-text="Hola, me gustaría cotizar una plataforma web o ecommerce moderna con Wix Headless.">
            💻 Quiero cotizar una plataforma web o app
          </button>
          <button class="quick-prompt-btn" data-text="Hola, necesito asistencia personalizada con un asesor de Dilo Digital.">
            💬 Quiero hablar con un asesor en vivo
          </button>
        </div>
      ` : `
        <div class="chat-scroll-wrapper" id="chat-messages-scroll">
          ${messages.map(msg => renderSingleMessageHtml(msg)).join('')}
          ${isTyping ? `
            <div class="message-bubble-wrapper business">
              <div class="typing-bubble">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>
          ` : ''}
          <div id="messages-anchor"></div>
        </div>
      `}
    </div>
  `;

  // Attach quick prompt click handlers
  bodyEl.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      if (text) sendChatMessage(text);
    });
  });

  // Footer Input Area
  if (footerWrap) {
    footerWrap.innerHTML = `
      <form class="chat-footer" id="wix-chat-send-form">
        <input 
          type="text" 
          id="wix-chat-text-input" 
          placeholder="Escribe tu mensaje..." 
          autocomplete="off" 
          required
        />
        <button type="submit" class="send-btn" id="btn-send-chat" aria-label="Enviar mensaje">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
        </button>
      </form>
    `;

    const sendForm = document.getElementById('wix-chat-send-form');
    sendForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('wix-chat-text-input');
      const text = input?.value.trim();
      if (text && !isSending) {
        input.value = '';
        sendChatMessage(text);
      }
    });
  }

  scrollToBottom();
}

function renderSingleMessageHtml(msg) {
  const isVisitor = isMessageFromVisitor(msg);
  const text = getMessageText(msg);
  if (!text) return '';

  const dateVal = msg.createdDate || msg.createdAt || msg._createdDate;
  const timeStr = dateVal ? new Date(dateVal).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : '';

  return `
    <div class="message-bubble-wrapper ${isVisitor ? 'visitor' : 'business'}">
      <div class="message-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
      ${timeStr ? `<span class="timestamp">${timeStr}</span>` : ''}
    </div>
  `;
}

function getMessageText(msg) {
  return msg.content?.basic?.items?.[0]?.text || msg.content?.basic?.text || msg.text || '';
}

function isMessageFromVisitor(msg) {
  const dir = msg.direction || '';
  return (
    dir === 'PARTICIPANT_TO_BUSINESS' ||
    dir === 'visitor' ||
    msg.sender?.role === 'visitor' ||
    String(msg.id || '').startsWith('temp-')
  );
}

// ─── 3. FALLBACK VIEW (LEAD INTAKE FORM) ──────────────────────────
function renderFallbackView(bodyEl, footerWrap) {
  if (footerWrap) footerWrap.innerHTML = '';

  bodyEl.innerHTML = `
    <div class="setup-form-container">
      <h4>Dejar un Mensaje</h4>
      <p class="setup-desc">
        Envíanos tu consulta y un especialista te responderá directamente a tu correo o WhatsApp.
      </p>
      <form class="premium-form" id="wix-chat-fallback-form">
        <div class="form-group-premium">
          <label for="fb-name">Nombre Completo *</label>
          <input type="text" id="fb-name" required placeholder="Tu nombre">
        </div>
        <div class="form-group-premium">
          <label for="fb-email">Correo Electrónico *</label>
          <input type="email" id="fb-email" required placeholder="tu@correo.com">
        </div>
        <div class="form-group-premium">
          <label for="fb-message">Mensaje / Consulta *</label>
          <textarea id="fb-message" rows="3" required placeholder="¿En qué podemos ayudarte?"></textarea>
        </div>
        <button type="submit" class="premium-submit-btn" id="btn-submit-fb">
          <span>Enviar Mensaje</span>
        </button>
      </form>
    </div>
  `;

  document.getElementById('wix-chat-fallback-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fb-name')?.value.trim();
    const email = document.getElementById('fb-email')?.value.trim();
    const message = document.getElementById('fb-message')?.value.trim();
    const btn = document.getElementById('btn-submit-fb');

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<div class="btn-loader-spinner"></div>`;
    }

    try {
      await sendLeadToWix({
        name,
        email,
        comments: message,
        type: 'Chat Fallback',
        brandName: 'Contacto desde Chat'
      });
    } catch (err) {
      console.warn('[WixChat] Fallback save note:', err);
    }

    bodyEl.innerHTML = `
      <div class="fallback-success-card">
        <div class="success-icon-wrapper">
          <svg class="success-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/>
          </svg>
        </div>
        <h4 style="margin: 0; color: #0F172A; font-weight: 800;">¡Mensaje Enviado!</h4>
        <p style="color: #64748B; font-size: 0.85rem; margin: 0;">Hemos recibido tu consulta con éxito. Un asesor de Dilo Digital se pondrá en contacto a la brevedad.</p>
        <button class="btn-premium-retry" id="btn-chat-reset">Iniciar Otra Consulta</button>
      </div>
    `;

    document.getElementById('btn-chat-reset')?.addEventListener('click', () => {
      status = 'setup';
      renderBody();
    });
  });
}

// ─── SEND CHAT MESSAGE ────────────────────────────────────────────
async function sendChatMessage(text) {
  if (!text || isSending || !conversationId) return;

  isSending = true;

  // Optimistic UI push
  const tempMsg = {
    id: `temp-${Date.now()}`,
    direction: 'PARTICIPANT_TO_BUSINESS',
    createdAt: new Date().toISOString(),
    content: {
      basic: {
        items: [{ text }]
      }
    }
  };

  messages.push(tempMsg);
  isTyping = true;
  renderBody();
  scrollToBottom();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'send', conversationId, text })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('[WixChat] Send error:', errData);
    }

    // Refresh messages
    await fetchLatestMessages();
  } catch (err) {
    console.error('[WixChat] Failed to send message:', err);
  } finally {
    isSending = false;
    setTimeout(() => {
      isTyping = false;
      renderBody();
    }, 1200);
  }
}

// ─── FETCH LATEST MESSAGES ────────────────────────────────────────
async function fetchLatestMessages() {
  if (!conversationId) return;

  try {
    const res = await fetch(`/api/chat?action=list&conversationId=${conversationId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.messages) {
        const sorted = sortMessages(data.messages);
        if (sorted.length !== messages.length || JSON.stringify(sorted) !== JSON.stringify(messages)) {
          messages = sorted;
          renderBody();
          scrollToBottom();
        }
      }
    }
  } catch (err) {
    console.warn('[WixChat] Polling error:', err);
  }
}

// ─── POLLING CONTROL ──────────────────────────────────────────────
function startPolling() {
  stopPolling();
  if (status === 'online' && conversationId) {
    pollInterval = setInterval(() => {
      if (isOpen && status === 'online') {
        fetchLatestMessages();
      }
    }, 4000);
  }
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}

function scrollToBottom() {
  setTimeout(() => {
    const scrollBox = document.getElementById('chat-messages-scroll');
    const anchor = document.getElementById('messages-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollBox) {
      scrollBox.scrollTop = scrollBox.scrollHeight;
    }
  }, 100);
}

// ─── DIAGNOSTICS HELPER ───────────────────────────────────────────
async function runDiagnostics() {
  const outBox = document.getElementById('diag-output-box');
  const btn = document.getElementById('btn-run-diag');
  if (btn) btn.innerText = 'Analizando conexión...';

  try {
    const res = await fetch('/api/chat?action=diagnostic');
    const data = await res.json();
    lastDiagInfo = data;
    if (outBox) {
      outBox.innerHTML = `
        <pre class="diag-json-output">${escapeHtml(JSON.stringify(data, null, 2))}</pre>
      `;
    }
  } catch (err) {
    if (outBox) {
      outBox.innerHTML = `<pre class="diag-json-output">Error: ${escapeHtml(err.message)}</pre>`;
    }
  } finally {
    if (btn) btn.innerText = '🔍 Diagnosticar conexión';
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
