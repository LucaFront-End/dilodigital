// ================================================================
// DILO DIGITAL — TRAMITES & CLIENT PORTAL STORE
// Manages Viabilidad and Registro IMPI workflows, stages, comments, and updates
// ================================================================

const STORAGE_KEY = 'dilo_tramites_db';
const AUTH_KEY = 'dilo_auth_user';

// Official Stages for Viabilidad
export const ETAPAS_VIABILIDAD = [
  { id: 'solicitud_recibida', name: 'Solicitud recibida', step: 1, color: '#38BDF8', desc: 'Recepción formal del nombre y clase comercial.' },
  { id: 'clasificacion', name: 'Clasificación', step: 2, color: '#A855F7', desc: 'Clasificación NIZA 1 a 45 de productos y servicios.' },
  { id: 'busqueda', name: 'Búsqueda', step: 3, color: '#FF5A1F', desc: 'Búsqueda fonética y gramatical en base oficial IMPI.' },
  { id: 'similitudes', name: 'Similitudes', step: 4, color: '#F59E0B', desc: 'Cruce de anterioridades y detección de fonética idéntica.' },
  { id: 'evaluacion', name: 'Evaluación', step: 5, color: '#0284C7', desc: 'Dictamen legal y ponderación de riesgo por abogado de PI.' },
  { id: 'resultado', name: 'Resultado', step: 6, color: '#10B981', desc: 'Emisión del reporte oficial de viabilidad con recomendaciones.' }
];

// Official Stages for Registro IMPI
export const ETAPAS_REGISTRO = [
  { id: 'preparacion', name: 'Preparación', step: 1, color: '#38BDF8', desc: 'Elaboración de solicitud formal, carta poder y anexos de marca mixta.' },
  { id: 'presentacion', name: 'Presentación', step: 2, color: '#A855F7', desc: 'Radicación oficial ante el IMPI y pago de derechos gubernamentales.' },
  { id: 'publicacion', name: 'Publicación', step: 3, color: '#F59E0B', desc: 'Publicación en Gaceta Oficial IMPI para periodo de oposición.' },
  { id: 'analisis_impi', name: 'Análisis IMPI', step: 4, color: '#FF5A1F', desc: 'Examen de fondo, distintividad y verificación de requisitos legales.' },
  { id: 'resolucion', name: 'Resolución', step: 5, color: '#0284C7', desc: 'Dictamen favorable y aprobación del examinador del IMPI.' },
  { id: 'marca_registrada', name: 'Marca registrada', step: 6, color: '#10B981', desc: 'Emisión del título oficial de registro de marca por 10 años en México.' }
];

// Helper to format date in Mexican locale
export function formatDisplayDate(dateStr) {
  if (!dateStr) return 'No definida';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatDisplayDateTime(dateStr) {
  if (!dateStr) return 'No definida';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch {
    return dateStr;
  }
}

// Helper to calculate next monthly update date (+30 days)
export function calculateNextMonthlyUpdate(fromDays = 30) {
  const d = new Date();
  d.setDate(d.getDate() + fromDays);
  return d.toISOString().split('T')[0];
}

// Initial Realistic Seed Data
const INITIAL_SEED_TRAMITES = [
  // ── Viabilidad ──
  {
    id: 'VIA-2026-081',
    type: 'viabilidad',
    brandName: 'Solaria Coffee MX',
    clientName: 'Ana Lucía Morales',
    clientEmail: 'cliente@solaria.mx',
    clientPhone: '55 1234 5678',
    nizaClass: 'Clase 43 (Cafeterías y Restaurantes)',
    entryDate: '2026-09-12',
    deadlineDate: '2026-10-15',
    lastUpdateDate: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(26),
    currentStage: 'similitudes',
    comments: 'Se detectó una marca similar en clase 30 con baja probabilidad de conflicto fonético. Evaluando distintividad final en clase 43.',
    lawyer: 'Lic. Daniel Garza',
    expedienteSat: 'SAT-FOL-99824',
    history: [
      { stage: 'solicitud_recibida', date: '2026-09-12', note: 'Solicitud ingresada y radicada en radar legal.' },
      { stage: 'clasificacion', date: '2026-09-15', note: 'Asignada a clase NIZA 43 para servicios de preparación de café.' },
      { stage: 'busqueda', date: '2026-09-20', note: 'Barrido fonético 100% completado en las 45 clases oficiales.' },
      { stage: 'similitudes', date: '2026-09-26', note: 'Se detectó una marca similar en clase 30 con baja probabilidad de conflicto. Evaluando clase 43.' }
    ]
  },
  {
    id: 'VIA-2026-094',
    type: 'viabilidad',
    brandName: 'Kallpa Tech Logistics',
    clientName: 'Roberto Méndez Silva',
    clientEmail: 'roberto@kallpa.io',
    clientPhone: '81 8329 1100',
    nizaClass: 'Clase 39 (Transporte, Logística y Almacenamiento)',
    entryDate: '2026-09-22',
    deadlineDate: '2026-10-25',
    lastUpdateDate: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(29),
    currentStage: 'busqueda',
    comments: 'Iniciando barrido fonético profundo en la base oficial del IMPI para determinar anterioridades fonéticas en México y tratados internacionales.',
    lawyer: 'Lic. Daniel Garza',
    expedienteSat: 'SAT-FOL-99912',
    history: [
      { stage: 'solicitud_recibida', date: '2026-09-22', note: 'Ingreso confirmado.' },
      { stage: 'clasificacion', date: '2026-09-24', note: 'Validada para Clase 39 Logística.' },
      { stage: 'busqueda', date: '2026-09-27', note: 'Iniciando barrido fonético profundo.' }
    ]
  },
  {
    id: 'VIA-2026-062',
    type: 'viabilidad',
    brandName: 'Aura Botanicals Skincare',
    clientName: 'Carla Villarreal Treviño',
    clientEmail: 'carla@auraskincare.com',
    clientPhone: '33 2211 4455',
    nizaClass: 'Clase 03 (Cosméticos y Cuidado de la Piel)',
    entryDate: '2026-08-30',
    deadlineDate: '2026-09-30',
    lastUpdateDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(14),
    currentStage: 'resultado',
    comments: 'Dictamen de viabilidad altamente positivo (96% de viabilidad). Recomendamos proceder de inmediato al registro de Marca Mixta con su logotipo actual.',
    lawyer: 'Lic. Daniel Garza',
    expedienteSat: 'SAT-FOL-99645',
    history: [
      { stage: 'solicitud_recibida', date: '2026-08-30', note: 'Ingreso de expediente.' },
      { stage: 'clasificacion', date: '2026-09-02', note: 'Clase 03 validada.' },
      { stage: 'busqueda', date: '2026-09-08', note: 'Búsqueda completada.' },
      { stage: 'similitudes', date: '2026-09-14', note: 'Sin antecedentes idénticos vigentes.' },
      { stage: 'evaluacion', date: '2026-09-20', note: 'Evaluación jurídica favorable.' },
      { stage: 'resultado', date: '2026-09-25', note: 'Dictamen favorable emitido.' }
    ]
  },

  // ── Registros ──
  {
    id: 'REG-2026-419',
    type: 'registro',
    brandName: 'Nova Studio Arquitectura',
    clientName: 'Arq. Mateo Valenzuela',
    clientEmail: 'mateo@novastudio.mx',
    clientPhone: '55 9876 5432',
    nizaClass: 'Clase 42 (Servicios de Arquitectura y Diseño)',
    entryDate: '2026-06-15',
    deadlineDate: '2026-12-15',
    lastUpdateDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(28),
    currentStage: 'analisis_impi',
    comments: 'El expediente se encuentra en Examen de Fondo por el examinador de la Dirección Divisional de Marcas del IMPI. Plazo de respuesta estimado en 4 semanas.',
    lawyer: 'Lic. Daniel Garza',
    folioImpi: 'IMPI-2026-9482-MX',
    history: [
      { stage: 'preparacion', date: '2026-06-15', note: 'Expediente preparado con logotipo vectorial y poderes legales.' },
      { stage: 'presentacion', date: '2026-06-20', note: 'Presentación oficial radicada ante el IMPI con línea de captura SAT cubierta.' },
      { stage: 'publicacion', date: '2026-07-10', note: 'Publicado en la Gaceta de la Propiedad Industrial sin oposiciones de terceros.' },
      { stage: 'analisis_impi', date: '2026-09-15', note: 'En análisis de fondo por el examinador oficial.' }
    ]
  },
  {
    id: 'REG-2026-552',
    type: 'registro',
    brandName: 'BioVanguard Suplementos',
    clientName: 'Dra. Gabriela Fuentes',
    clientEmail: 'gabriela@biovanguard.com',
    clientPhone: '55 4433 2211',
    nizaClass: 'Clase 05 (Suplementos Alimenticios)',
    entryDate: '2026-07-02',
    deadlineDate: '2027-01-02',
    lastUpdateDate: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(27),
    currentStage: 'publicacion',
    comments: 'Solicitud publicada en la Gaceta Oficial del IMPI. Transcurriendo el periodo legal de 30 días hábiles para oposiciones.',
    lawyer: 'Lic. Daniel Garza',
    folioImpi: 'IMPI-2026-10492-MX',
    history: [
      { stage: 'preparacion', date: '2026-07-02', note: 'Integración de memoria de marca.' },
      { stage: 'presentacion', date: '2026-07-08', note: 'Depósito oficial IMPI formalizado.' },
      { stage: 'publicacion', date: '2026-08-12', note: 'Publicación en Gaceta Oficial.' }
    ]
  },
  {
    id: 'REG-2026-210',
    type: 'registro',
    brandName: 'Parrilla Norteña Bistecca',
    clientName: 'Héctor Garza Elizondo',
    clientEmail: 'hector@parrillanortena.mx',
    clientPhone: '81 1520 8899',
    nizaClass: 'Clase 43 (Restaurantes y Carnes)',
    entryDate: '2026-02-10',
    deadlineDate: '2026-08-10',
    lastUpdateDate: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    nextUpdateLimit: calculateNextMonthlyUpdate(12),
    currentStage: 'marca_registrada',
    comments: '¡FELICIDADES! Título de registro emitido formalmente por el IMPI. Tu marca cuenta con protección y exclusividad legal por 10 años en toda la República Mexicana.',
    lawyer: 'Lic. Daniel Garza',
    folioImpi: 'IMPI-2026-3829-MX',
    tituloRegistro: 'TIT-2498102-MX',
    history: [
      { stage: 'preparacion', date: '2026-02-10', note: 'Expediente preparado.' },
      { stage: 'presentacion', date: '2026-02-18', note: 'Presentación formal radicada.' },
      { stage: 'publicacion', date: '2026-03-25', note: 'Gaceta sin oposiciones.' },
      { stage: 'analisis_impi', date: '2026-05-10', note: 'Examen de fondo superado.' },
      { stage: 'resolucion', date: '2026-07-05', note: 'Resolución de concesión favorable.' },
      { stage: 'marca_registrada', date: '2026-08-01', note: 'Título de marca entregado.' }
    ]
  }
];

// Seed or retrieve from localStorage
export function getTramitesFromStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_TRAMITES));
      return INITIAL_SEED_TRAMITES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_TRAMITES));
      return INITIAL_SEED_TRAMITES;
    }
    return parsed;
  } catch (err) {
    console.error('[TramitesStore] Error loading:', err);
    return INITIAL_SEED_TRAMITES;
  }
}

export function saveTramitesToStore(tramites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tramites));
    window.dispatchEvent(new CustomEvent('dilo:tramites-updated', { detail: tramites }));
  } catch (err) {
    console.error('[TramitesStore] Error saving:', err);
  }
}

// Get by type: 'viabilidad' | 'registro'
export function getTramitesByType(type = 'viabilidad') {
  const all = getTramitesFromStore();
  return all.filter(t => t.type === type);
}

// Get for a specific client
export function getTramitesForClient(clientEmail) {
  const all = getTramitesFromStore();
  if (!clientEmail) return all;
  const lower = clientEmail.toLowerCase().trim();
  const matched = all.filter(t => t.clientEmail?.toLowerCase() === lower);
  return matched.length ? matched : all; // Fallback to all if demo
}

// Update a trámite (Called by the Registrar)
export function updateTramiteRecord(id, updates) {
  const all = getTramitesFromStore();
  const index = all.findIndex(t => t.id === id);
  if (index === -1) return null;

  const current = all[index];
  const now = new Date().toISOString();
  
  // Auto calculate monthly next update deadline if stage/comment updated
  const nextMonthly = updates.nextUpdateLimit || calculateNextMonthlyUpdate(30);

  const updated = {
    ...current,
    ...updates,
    lastUpdateDate: now,
    nextUpdateLimit: nextMonthly
  };

  // If stage changed, append to history
  if (updates.currentStage && updates.currentStage !== current.currentStage) {
    const history = updated.history ? [...updated.history] : [];
    history.push({
      stage: updates.currentStage,
      date: now.split('T')[0],
      note: updates.comments || `Etapa actualizada a ${updates.currentStage}`
    });
    updated.history = history;
  }

  all[index] = updated;
  saveTramitesToStore(all);
  return updated;
}

// Create new trámite
export function createNewTramite(data) {
  const all = getTramitesFromStore();
  const type = data.type === 'registro' ? 'registro' : 'viabilidad';
  const prefix = type === 'registro' ? 'REG' : 'VIA';
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  const id = `${prefix}-${year}-${randomNum}`;

  const initialStage = type === 'registro' ? 'preparacion' : 'solicitud_recibida';
  const now = new Date().toISOString();

  const newTramite = {
    id,
    type,
    brandName: data.brandName || 'Mi Marca',
    clientName: data.clientName || 'Cliente Dilo',
    clientEmail: data.clientEmail || 'cliente@dilodigital.com',
    clientPhone: data.clientPhone || '',
    nizaClass: data.nizaClass || 'Clase 35',
    entryDate: now.split('T')[0],
    deadlineDate: data.deadlineDate || calculateNextMonthlyUpdate(60),
    lastUpdateDate: now,
    nextUpdateLimit: calculateNextMonthlyUpdate(30),
    currentStage: data.currentStage || initialStage,
    comments: data.comments || 'Trámite ingresado al portal para gestión y dictamen oficial.',
    lawyer: data.lawyer || 'Lic. Daniel Garza',
    folioImpi: type === 'registro' ? `IMPI-${year}-${Math.floor(1000 + Math.random() * 9000)}-MX` : null,
    history: [
      {
        stage: data.currentStage || initialStage,
        date: now.split('T')[0],
        note: 'Ingreso inicial del trámite en el portal.'
      }
    ]
  };

  all.unshift(newTramite);
  saveTramitesToStore(all);
  return newTramite;
}

// Auth State Helpers
export function getActiveUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      // Default initial role: Registrador (so user can inspect and test immediately)
      const defaultUser = {
        name: 'Lic. Daniel Garza',
        email: 'dgarza@dilodigital.com',
        role: 'registrador',
        title: 'Equipo Legal & Registrador IMPI',
        avatarText: 'DG'
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return {
      name: 'Lic. Daniel Garza',
      email: 'dgarza@dilodigital.com',
      role: 'registrador',
      title: 'Equipo Legal & Registrador IMPI',
      avatarText: 'DG'
    };
  }
}

export function setActiveUser(user) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('dilo:auth-changed', { detail: user }));
  } catch (err) {
    console.error('[TramitesStore] Error saving auth:', err);
  }
}

export function switchRole(role = 'registrador') {
  if (role === 'registrador') {
    const regUser = {
      name: 'Lic. Daniel Garza',
      email: 'dgarza@dilodigital.com',
      role: 'registrador',
      title: 'Equipo Legal & Registrador IMPI',
      avatarText: 'DG'
    };
    setActiveUser(regUser);
    return regUser;
  } else {
    const clientUser = {
      name: 'Ana Lucía Morales',
      email: 'cliente@solaria.mx',
      role: 'client',
      title: 'Titular de Marca · Solaria Coffee MX',
      avatarText: 'AM'
    };
    setActiveUser(clientUser);
    return clientUser;
  }
}
