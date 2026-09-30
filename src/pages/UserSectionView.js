// ================================================================
// DILO DIGITAL — PORTAL DE USUARIO & TRÁMITES IMPI
// Vista Cliente (Mis Marcas & Estatus) y Vista Registrador (Equipo Dilo)
// Conexión modular preparada para Wix Studio / Headless CMS
// ================================================================

import { 
  getTramitesFromStore, 
  updateTramiteRecord, 
  createNewTramite, 
  getActiveUser, 
  switchRole, 
  syncTramitesWithWix,
  ETAPAS_VIABILIDAD, 
  ETAPAS_REGISTRO, 
  formatDisplayDate, 
  formatDisplayDateTime,
  calculateNextMonthlyUpdate 
} from '../data/tramitesStore.js';
import { sounds } from '../utils/SoundEngine.js';

export function renderUserSectionView() {
  const user = getActiveUser();
  const isRegistrador = user.role === 'registrador';

  return `
    <main class="portal-page">
      <div class="container">

        <!-- 1. TOP ROLE SWITCHER & HEADER BAR -->
        <header class="portal-header-bar">
          <div class="portal-title-block">
            <div class="portal-logo-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <div class="portal-title-main">Portal de Trámites &amp; Marcas IMPI</div>
              <div class="portal-subtitle-sub">
                <span>Dilo Digital MX</span>
                <span>&bull;</span>
                <span>Protección Legal 24/7</span>
                <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.7rem; padding: 0.18rem 0.55rem; margin-left: 0.4rem; display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 9999px; font-weight: 600;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981; display: inline-block;"></span>
                  Wix Headless Conectado
                </span>
              </div>
            </div>
          </div>

          <!-- Role Toggle Pill -->
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div class="portal-role-switcher" role="tablist" aria-label="Cambiar Rol de Usuario">
              <button class="portal-role-btn ${!isRegistrador ? 'is-active is-client' : ''}" id="btn-role-client" data-role="client">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Vista Cliente</span>
              </button>
              <button class="portal-role-btn ${isRegistrador ? 'is-active' : ''}" id="btn-role-registrador" data-role="registrador">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                <span>Vista Registrador (Equipo Dilo)</span>
              </button>
            </div>

            <!-- Active User Avatar -->
            <div class="portal-user-badge">
              <div class="portal-avatar-circle ${!isRegistrador ? 'is-client-av' : ''}">
                ${user.avatarText || (isRegistrador ? 'DG' : 'AM')}
              </div>
              <div>
                <div class="portal-user-name">${user.name}</div>
                <div class="portal-user-role-lbl">${user.title || (isRegistrador ? 'Equipo Registrador' : 'Titular de Marca')}</div>
              </div>
            </div>
          </div>
        </header>

        <!-- 2. DYNAMIC CONTENT CONTAINER (Client or Registrar View) -->
        <div id="portal-view-container">
          ${isRegistrador ? renderRegistrarViewHtml() : renderClientViewHtml()}
        </div>

      </div>

      <!-- 3. MODAL: NUEVO TRÁMITE (PARA EL REGISTRADOR) -->
      <div class="modal-tramite-overlay" id="modal-nuevo-tramite">
        <div class="modal-tramite-card">
          <div class="modal-tramite-header">
            <h3 class="modal-tramite-title">Registrar Nuevo Trámite IMPI</h3>
            <button class="modal-tramite-close" id="btn-close-new-modal">&times;</button>
          </div>
          <form id="form-nuevo-tramite" style="display: flex; flex-direction: column; gap: 1rem;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Tipo de Trámite</label>
                <select class="registrar-select-filter" id="new-tramite-type" style="width: 100%;" required>
                  <option value="viabilidad">Dictamen &amp; Viabilidad</option>
                  <option value="registro">Registro Completo IMPI (10 Años)</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Clase NIZA</label>
                <input type="text" class="registrar-search-input" id="new-tramite-class" placeholder="Ej. Clase 35 (Comercio)" required style="padding-left: 1rem;">
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Nombre de la Marca</label>
              <input type="text" class="registrar-search-input" id="new-tramite-brand" placeholder="Ej. Solaria Coffee MX" required style="padding-left: 1rem;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Nombre del Cliente / Titular</label>
                <input type="text" class="registrar-search-input" id="new-tramite-client" placeholder="Ej. Ana Lucía Morales" required style="padding-left: 1rem;">
              </div>
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Correo Electrónico</label>
                <input type="email" class="registrar-search-input" id="new-tramite-email" placeholder="cliente@solaria.mx" required style="padding-left: 1rem;">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Teléfono / WhatsApp</label>
                <input type="tel" class="registrar-search-input" id="new-tramite-phone" placeholder="55 1234 5678" style="padding-left: 1rem;">
              </div>
              <div>
                <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Fecha Límite Legal</label>
                <input type="date" class="registrar-search-input" id="new-tramite-deadline" style="padding-left: 1rem;" value="${calculateNextMonthlyUpdate(60)}">
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">Comentario Inicial para el Cliente</label>
              <textarea class="comments-textarea" id="new-tramite-comments" rows="3" placeholder="Expediente recibido y asignado a abogado especialista..."></textarea>
            </div>

            <button type="submit" class="btn-new-tramite" style="justify-content: center; margin-top: 0.5rem; padding: 0.95rem;">
              <span>Crear e Ingresar Trámite al Sistema</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  `;
}

// ── HTML FOR REGISTRAR VIEW (EQUIPO DILO) ──
function renderRegistrarViewHtml(activeTab = 'viabilidad', searchQuery = '', stageFilter = 'all') {
  const allTramites = getTramitesFromStore();
  const viabilidadList = allTramites.filter(t => t.type === 'viabilidad');
  const registroList = allTramites.filter(t => t.type === 'registro');

  // Filter according to active tab, query, and stage
  const currentList = activeTab === 'viabilidad' ? viabilidadList : registroList;
  const filteredList = currentList.filter(t => {
    const matchesSearch = !searchQuery || 
      t.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || t.currentStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const availableStages = activeTab === 'viabilidad' ? ETAPAS_VIABILIDAD : ETAPAS_REGISTRO;

  return `
    <div class="registrar-panel">
      
      <!-- Metrics Strip -->
      <div class="portal-metrics-grid">
        <div class="portal-metric-card">
          <div class="portal-metric-label">
            <span>Trámites de Viabilidad</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <div class="portal-metric-val is-orange">${viabilidadList.length}</div>
          <div class="portal-metric-sub">Búsquedas fonéticas &amp; dictámenes</div>
        </div>

        <div class="portal-metric-card">
          <div class="portal-metric-label">
            <span>Registros IMPI en Curso</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <div class="portal-metric-val is-green">${registroList.length}</div>
          <div class="portal-metric-sub">Expedientes oficiales en IMPI</div>
        </div>

        <div class="portal-metric-card">
          <div class="portal-metric-label">
            <span>Ciclo de Actualización</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="portal-metric-val is-blue">30 Días</div>
          <div class="portal-metric-sub">Siguiente fecha límite mensual</div>
        </div>
      </div>

      <!-- 2 Tabs: Viabilidad & Registros -->
      <div class="registrar-tabs-nav" role="tablist">
        <button class="registrar-tab-btn ${activeTab === 'viabilidad' ? 'is-active' : ''}" id="tab-reg-viabilidad" data-tab="viabilidad">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Trámites de Viabilidad</span>
          <span class="tab-badge-count">${viabilidadList.length}</span>
        </button>

        <button class="registrar-tab-btn ${activeTab === 'registro' ? 'is-active' : ''}" id="tab-reg-registro" data-tab="registro">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span>Trámites de Registro IMPI</span>
          <span class="tab-badge-count">${registroList.length}</span>
        </button>
      </div>

      <!-- Control Toolbar -->
      <div class="registrar-toolbar">
        <div class="registrar-search-box">
          <svg class="registrar-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="registrar-search-input" id="search-tramites-input" placeholder="Buscar por marca, cliente o código..." value="${searchQuery}">
        </div>

        <div class="registrar-filters-group">
          <select class="registrar-select-filter" id="filter-stage-select">
            <option value="all">Todas las etapas (${availableStages.length})</option>
            ${availableStages.map(s => `
              <option value="${s.id}" ${stageFilter === s.id ? 'selected' : ''}>${s.step}. ${s.name}</option>
            `).join('')}
          </select>

          <button class="btn-new-tramite" id="btn-open-new-modal" data-cursor="hover">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Nuevo Trámite</span>
          </button>
        </div>
      </div>

      <!-- Tramites List -->
      <div class="tramites-list-grid" id="tramites-admin-list">
        ${filteredList.length === 0 ? `
          <div style="background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 18px; padding: 3rem; text-align: center; color: #64748B;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="1.8" style="margin-bottom: 0.8rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <div style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.3rem;">No se encontraron trámites</div>
            <div style="font-size: 0.88rem; color: #64748B;">Intenta con otro término de búsqueda o cambia el filtro de etapa.</div>
          </div>
        ` : filteredList.map(t => {
          const currentStageObj = availableStages.find(s => s.id === t.currentStage) || availableStages[0];

          return `
            <article class="tramite-admin-card" id="card-${t.id}" data-id="${t.id}" data-type="${t.type}">
              
              <!-- Card Top Header -->
              <div class="tramite-card-top-bar">
                <div class="tramite-brand-meta">
                  <span class="tramite-code-badge">${t.id}</span>
                  <div>
                    <div class="tramite-brand-title">${t.brandName}</div>
                    <div class="tramite-client-name">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>${t.clientName}</span>
                      <span style="color: #64748B;">&middot;</span>
                      <span style="color: #64748B; font-size: 0.8rem;">${t.clientEmail}</span>
                    </div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="tramite-niza-tag">${t.nizaClass || 'Clase NIZA'}</span>
                  ${t.folioImpi ? `<span style="font-family: monospace; font-size: 0.76rem; color: #10B981; background: rgba(16,185,129,0.1); padding: 0.2rem 0.55rem; border-radius: 999px;">${t.folioImpi}</span>` : ''}
                </div>
              </div>

              <!-- 4-Dates Grid -->
              <div class="tramite-dates-grid">
                <div class="tramite-date-col">
                  <span class="tramite-date-label">Fecha de Ingreso</span>
                  <span class="tramite-date-value">${formatDisplayDate(t.entryDate)}</span>
                </div>
                <div class="tramite-date-col">
                  <span class="tramite-date-label">Fecha Límite Legal</span>
                  <span class="tramite-date-value">${formatDisplayDate(t.deadlineDate)}</span>
                </div>
                <div class="tramite-date-col">
                  <span class="tramite-date-label">Última Actualización</span>
                  <span class="tramite-date-value" id="last-update-${t.id}">${formatDisplayDateTime(t.lastUpdateDate)}</span>
                </div>
                <div class="tramite-date-col">
                  <span class="tramite-date-label">Próxima Act. (Mensual)</span>
                  <span class="tramite-date-value is-monthly-limit" id="next-limit-${t.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>${formatDisplayDate(t.nextUpdateLimit || calculateNextMonthlyUpdate(30))}</span>
                  </span>
                </div>
              </div>

              <!-- Interactive Controls: Desplegable de Etapas & Comentarios -->
              <div class="tramite-interactive-row">
                
                <!-- Desplegable de Etapas -->
                <div class="stage-select-wrap">
                  <label class="stage-select-label" for="select-stage-${t.id}">
                    <span>Estatus (Etapa Actual)</span>
                    <span style="color: ${currentStageObj.color}; font-size: 0.72rem; font-weight: 800;">Paso ${currentStageObj.step} de 6</span>
                  </label>
                  <select class="stage-dropdown-select" id="select-stage-${t.id}" data-id="${t.id}">
                    ${availableStages.map(s => `
                      <option value="${s.id}" ${s.id === t.currentStage ? 'selected' : ''}>
                        ${s.step}. ${s.name}
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- Comentarios -->
                <div class="comments-input-wrap">
                  <label class="stage-select-label" for="textarea-comments-${t.id}">
                    <span>Comentario / Nota para el Cliente</span>
                    <span style="color: #64748B; font-size: 0.72rem;">Visible en portal cliente</span>
                  </label>
                  <textarea class="comments-textarea" id="textarea-comments-${t.id}" rows="2" placeholder="Escribe el avance, dictamen o notificación para el titular...">${t.comments || ''}</textarea>
                </div>

                <!-- Botón de Actualizar -->
                <button class="btn-update-tramite" data-id="${t.id}" data-cursor="hover" title="Guardar cambios y actualizar fecha mensual">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Actualizar</span>
                </button>

              </div>

            </article>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ── HTML FOR CLIENT VIEW (MIS MARCAS & TRÁMITES) ──
function renderClientViewHtml() {
  const user = getActiveUser();
  const tramites = getTramitesForClient(user.email);

  return `
    <div class="client-panel">
      
      <!-- Welcome Banner -->
      <div class="client-welcome-card">
        <div>
          <div class="client-welcome-title">Bienvenido a tu Portal Legal, ${user.name}</div>
          <div class="client-welcome-desc">
            Consulta en tiempo real el avance jurídico de tus marcas ante el IMPI, los dictámenes de viabilidad fonética 
            y los comentarios periódicos emitidos por tu abogado asignado con ciclo de actualización mensual.
          </div>
        </div>
        <div style="display: flex; gap: 0.8rem; align-items: center;">
          <a href="#/registro-marca" class="btn btn-primary btn-sm btn-glow" data-cursor="hover">
            <span>+ Proteger Otra Marca</span>
          </a>
        </div>
      </div>

      <!-- Brands List -->
      <div style="display: flex; flex-direction: column; gap: 1.8rem;">
        ${tramites.length === 0 ? `
          <div style="background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 20px; padding: 3rem; text-align: center;">
            <div style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">No tienes marcas registradas aún</div>
            <p style="color: #64748B; margin-bottom: 1.2rem;">Inicia hoy tu solicitud de viabilidad o registro oficial ante el IMPI en línea.</p>
            <a href="#/registro-marca" class="btn btn-primary btn-md">Registrar Marca Ahora</a>
          </div>
        ` : tramites.map(t => {
          const isViabilidad = t.type === 'viabilidad';
          const stages = isViabilidad ? ETAPAS_VIABILIDAD : ETAPAS_REGISTRO;
          const currentStageObj = stages.find(s => s.id === t.currentStage) || stages[0];
          const currentStepIndex = currentStageObj.step; // 1-indexed

          return `
            <article class="client-brand-card" id="client-card-${t.id}">
              
              <!-- Card Header -->
              <div class="client-brand-header">
                <div class="client-brand-title-wrap">
                  <div class="client-brand-icon-box">
                    ${t.brandName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.2rem;">
                      <span class="tramite-code-badge">${t.id}</span>
                      <span class="badge ${isViabilidad ? 'badge-primary' : 'badge-outline'}" style="font-size: 0.72rem;">
                        ${isViabilidad ? 'Dictamen &amp; Viabilidad' : 'Registro de Marca IMPI (10 Años)'}
                      </span>
                    </div>
                    <h3 class="client-brand-name">${t.brandName}</h3>
                    <div style="font-size: 0.82rem; color: #64748B;">${t.nizaClass || 'Clase NIZA'}</div>
                  </div>
                </div>

                <!-- Status Pill -->
                <div class="client-current-stage-pill" style="border-color: ${currentStageObj.color}; color: ${currentStageObj.color};">
                  <span class="client-pulse-dot"></span>
                  <span>${currentStageObj.name}</span>
                </div>
              </div>

              <!-- 6-Step Visual Progress Stepper -->
              <div class="stepper-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.78rem; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.4px;">
                    Progreso del Trámite (${currentStepIndex} de 6 etapas completadas)
                  </span>
                  <span style="font-size: 0.78rem; font-weight: 700; color: #10B981;">
                    ${Math.round((currentStepIndex / 6) * 100)}% de avance
                  </span>
                </div>

                <div class="stepper-track-bar">
                  ${stages.map((s, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum < currentStepIndex;
                    const isCurrent = stepNum === currentStepIndex;

                    return `
                      <div class="stepper-step-item ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''}">
                        <div class="stepper-circle">
                          ${isDone ? '✓' : stepNum}
                        </div>
                        <span class="stepper-step-name">${s.name}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Comentarios del Registrador / Abogado -->
              <div class="client-comment-quote">
                <div class="comment-quote-header">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span>Último reporte oficial por: ${t.lawyer || 'Lic. Daniel Garza'}</span>
                  </div>
                  <span style="color: #64748B; font-size: 0.76rem;">Actualizado el ${formatDisplayDateTime(t.lastUpdateDate)}</span>
                </div>
                <div class="comment-quote-body">
                  “${t.comments || 'Expediente radicado formalmente. En proceso de dictaminación jurídica.'}”
                </div>
              </div>

              <!-- Footer with Dates & Actions -->
              <div class="client-card-footer">
                <div class="client-footer-dates">
                  <div>
                    <strong style="color: #64748B;">Fecha de Ingreso:</strong>
                    <span style="color: #0F172A; font-weight: 700; margin-left: 0.3rem;">${formatDisplayDate(t.entryDate)}</span>
                  </div>
                  <div>
                    <strong style="color: #64748B;">Próximo Reporte Mensual:</strong>
                    <span style="color: #FF5A1F; font-weight: 700; margin-left: 0.3rem;">${formatDisplayDate(t.nextUpdateLimit || calculateNextMonthlyUpdate(30))}</span>
                  </div>
                </div>

                <div class="client-footer-actions">
                  <a href="https://wa.me/525592441070?text=${encodeURIComponent(`Hola Lic. Daniel Garza, deseo consultar el estatus de mi marca *${t.brandName}* con folio *${t.id}* registrado en Dilo Digital.`)}" 
                     target="_blank" 
                     rel="noopener" 
                     class="btn-client-wa" 
                     data-cursor="hover">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771z"/>
                    </svg>
                    <span>Consultar con mi Abogado</span>
                  </a>
                </div>
              </div>

            </article>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ── EVENT LISTENERS & INTERACTION ENGINE ──
export function initUserSectionEvents() {
  let activeTab = 'viabilidad';
  let searchQuery = '';
  let stageFilter = 'all';

  const container = document.getElementById('portal-view-container');
  const roleClientBtn = document.getElementById('btn-role-client');
  const roleRegistradorBtn = document.getElementById('btn-role-registrador');

  // Role Switcher Click Handlers
  roleClientBtn?.addEventListener('click', () => {
    sounds.playClick();
    switchRole('client');
    reRender();
  });

  roleRegistradorBtn?.addEventListener('click', () => {
    sounds.playClick();
    switchRole('registrador');
    reRender();
  });

  // Re-render helper
  function reRender() {
    const user = getActiveUser();
    const isReg = user.role === 'registrador';

    // Update switcher pill classes
    roleClientBtn?.classList.toggle('is-active', !isReg);
    roleClientBtn?.classList.toggle('is-client', !isReg);
    roleRegistradorBtn?.classList.toggle('is-active', isReg);

    if (container) {
      container.innerHTML = isReg 
        ? renderRegistrarViewHtml(activeTab, searchQuery, stageFilter) 
        : renderClientViewHtml();
      attachViewListeners();
    }
  }

  // Attach listeners to registrar view or client view
  function attachViewListeners() {
    const user = getActiveUser();
    if (user.role === 'registrador') {
      attachRegistrarListeners();
    }
  }

  function attachRegistrarListeners() {
    // Tab switching (Viabilidad vs Registros)
    const tabViab = document.getElementById('tab-reg-viabilidad');
    const tabReg = document.getElementById('tab-reg-registro');

    tabViab?.addEventListener('click', () => {
      sounds.playClick();
      activeTab = 'viabilidad';
      stageFilter = 'all';
      reRender();
    });

    tabReg?.addEventListener('click', () => {
      sounds.playClick();
      activeTab = 'registro';
      stageFilter = 'all';
      reRender();
    });

    // Search input
    const searchInput = document.getElementById('search-tramites-input');
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      reRender();
      // restore focus
      const refreshedInput = document.getElementById('search-tramites-input');
      if (refreshedInput) {
        refreshedInput.focus();
        refreshedInput.setSelectionRange(refreshedInput.value.length, refreshedInput.value.length);
      }
    });

    // Stage filter
    const stageSelect = document.getElementById('filter-stage-select');
    stageSelect?.addEventListener('change', (e) => {
      sounds.playClick();
      stageFilter = e.target.value;
      reRender();
    });

    // Update buttons for each card
    const updateButtons = document.querySelectorAll('.btn-update-tramite');
    updateButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const stageEl = document.getElementById(`select-stage-${id}`);
        const commentsEl = document.getElementById(`textarea-comments-${id}`);

        const newStage = stageEl?.value;
        const newComments = commentsEl?.value.trim();

        // Calculate next monthly update (+30 days)
        const nextMonthly = calculateNextMonthlyUpdate(30);

        const updated = updateTramiteRecord(id, {
          currentStage: newStage,
          comments: newComments,
          nextUpdateLimit: nextMonthly
        });

        if (updated) {
          sounds.playSuccess();
          btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>¡Actualizado!</span>
          `;
          btn.style.background = '#059669';

          // Update live date in the card row
          const lastUpdateSpan = document.getElementById(`last-update-${id}`);
          if (lastUpdateSpan) lastUpdateSpan.textContent = formatDisplayDateTime(updated.lastUpdateDate);

          const nextLimitSpan = document.getElementById(`next-limit-${id}`);
          if (nextLimitSpan) {
            nextLimitSpan.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${formatDisplayDate(updated.nextUpdateLimit)}</span>
            `;
          }

          setTimeout(() => {
            btn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Actualizar</span>
            `;
            btn.style.background = '';
          }, 2000);
        }
      });
    });

    // New Trámite Modal
    const modal = document.getElementById('modal-nuevo-tramite');
    const openBtn = document.getElementById('btn-open-new-modal');
    const closeBtn = document.getElementById('btn-close-new-modal');
    const form = document.getElementById('form-nuevo-tramite');

    openBtn?.addEventListener('click', () => {
      sounds.playClick();
      modal?.classList.add('is-active');
    });

    closeBtn?.addEventListener('click', () => {
      sounds.playClick();
      modal?.classList.remove('is-active');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-active');
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      sounds.playSuccess();

      const type = document.getElementById('new-tramite-type')?.value;
      const nizaClass = document.getElementById('new-tramite-class')?.value;
      const brandName = document.getElementById('new-tramite-brand')?.value;
      const clientName = document.getElementById('new-tramite-client')?.value;
      const clientEmail = document.getElementById('new-tramite-email')?.value;
      const clientPhone = document.getElementById('new-tramite-phone')?.value;
      const deadlineDate = document.getElementById('new-tramite-deadline')?.value;
      const comments = document.getElementById('new-tramite-comments')?.value;

      const created = createNewTramite({
        type,
        nizaClass,
        brandName,
        clientName,
        clientEmail,
        clientPhone,
        deadlineDate,
        comments
      });

      modal?.classList.remove('is-active');
      form.reset();
      activeTab = type;
      reRender();
      alert(`✓ Trámite ${created.id} creado con éxito para la marca "${brandName}".`);
    });
  }

  // Initial listener attachment
  attachViewListeners();

  // Background sync with Wix Headless CMS
  syncTramitesWithWix().then(updatedList => {
    if (updatedList && container && window.location.hash.includes('portal')) {
      console.log('[UserSectionView] ✅ Sincronización Wix Headless completada en vista');
    }
  }).catch(err => {
    console.warn('[UserSectionView] Sync offline note:', err);
  });
}
