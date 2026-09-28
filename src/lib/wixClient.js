/**
 * ================================================================
 * DILO DIGITAL — WIX HEADLESS CLIENT & CMS ADAPTER
 * Client ID: 2db3573e-2635-43b6-939b-8d52f78f8de9
 * Connects Viabilidad, Registro IMPI, Leads and Portal to Wix CMS
 * ================================================================
 */

import { createClient, OAuthStrategy, EMPTY_TOKENS } from '@wix/sdk';
import { items } from '@wix/data';

export const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || '2db3573e-2635-43b6-939b-8d52f78f8de9';
export const TOKEN_KEY = 'dilo_wix_tokens';
export const MEMBER_KEY = 'dilo_wix_member';
export const CONTACTO_COLLECTION = 'Contacto';
export const TRAMITES_COLLECTION = 'Tramites';

let memoryTokens = null;
let cachedClient = null;

// ── Token Storage (Syncs with localStorage & Memory) ───────────
function createTokenStorage() {
  return {
    getTokens() {
      if (typeof window === 'undefined') return memoryTokens || EMPTY_TOKENS;
      try {
        const raw = localStorage.getItem(TOKEN_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.accessToken?.value && parsed?.refreshToken?.value) {
            return parsed;
          }
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      }
      return memoryTokens || EMPTY_TOKENS;
    },
    setTokens(tokens) {
      memoryTokens = tokens;
      if (typeof window === 'undefined') return;
      try {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
      } catch (e) {
        console.warn('[Wix Client] Error guardando tokens en localStorage:', e);
      }
    },
  };
}

/**
 * Retorna o inicializa el cliente Wix Headless singleton con OAuth
 */
export async function getWixClient() {
  if (cachedClient) return cachedClient;

  cachedClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: WIX_CLIENT_ID,
      tokenStorage: createTokenStorage(),
    }),
  });

  // Asegurar tokens válidos (generando visitor tokens si aún no existen)
  try {
    const tokens = await cachedClient.auth.getTokens();
    const hasTokens = tokens?.accessToken?.value && tokens?.refreshToken?.value;
    if (!hasTokens) {
      const visitorTokens = await cachedClient.auth.generateVisitorTokens();
      await cachedClient.auth.setTokens(visitorTokens);
      console.log('[Wix Client] ✅ Visitor tokens generados exitosamente para Dilo Digital');
    }
  } catch (err) {
    console.warn('[Wix Client] Aviso inicializando visitor tokens:', err?.message || err);
  }

  return cachedClient;
}

/**
 * Formatea URLs de Wix Media (wix:image://) a HTTPS público
 */
export function formatWixImageUrl(wixUrl) {
  if (!wixUrl) return '';
  if (wixUrl.startsWith('http://') || wixUrl.startsWith('https://')) return wixUrl;
  if (wixUrl.startsWith('wix:image://v1/')) {
    const match = wixUrl.match(/wix:image:\/\/v1\/([^/#]+)/);
    if (match && match[1]) {
      return `https://static.wixstatic.com/media/${match[1]}`;
    }
  }
  return wixUrl;
}

/**
 * ================================================================
 * LEADS & INTAKE CMS INTEGRATION (Wix CMS: "Contacto")
 * ================================================================
 */
export async function sendLeadToWix(leadData) {
  const brand = leadData.brandName || leadData.marca || 'Marca no especificada';
  const name = leadData.name || leadData.nombre || 'Lead Dilo';
  const type = leadData.type || 'Radar IMPI';
  const cleanTitle = `${brand} — ${name} [${type}]`;

  const payload = {
    title: cleanTitle,
    nombre: (leadData.name || leadData.nombre || '').trim(),
    telefono: (leadData.phone || leadData.telefono || '').trim(),
    email: (leadData.email || leadData.correo || '').trim(),
    marca: brand.trim(),
    claseNiza: leadData.nizaClass || leadData.clase || '',
    tipo: type,
    escenario: leadData.statusScenario || '',
    mensaje: (leadData.notes || leadData.mensaje || '').trim(),
    origen: leadData.source || window.location.hash || 'Web Dilo Digital',
    fecha: leadData.timestamp || new Date().toISOString()
  };

  try {
    const client = await getWixClient();
    console.log('[Wix CMS] 🚀 Insertando lead en colección "Contacto":', payload);

    const res = await client.items.insert(CONTACTO_COLLECTION, payload);
    console.log('[Wix CMS] ✅ Lead guardado exitosamente en Wix:', res);
    return { success: true, item: res };
  } catch (err) {
    console.warn(`[Wix CMS] Primer intento falló (${err?.message || err}), renovando visitor token...`);
    try {
      const client = await getWixClient();
      const freshTokens = await client.auth.generateVisitorTokens();
      await client.auth.setTokens(freshTokens);
      const retryRes = await client.items.insert(CONTACTO_COLLECTION, payload);
      console.log('[Wix CMS] ✅ Reintento exitoso, guardado en colección "Contacto":', retryRes);
      return { success: true, item: retryRes };
    } catch (retryErr) {
      console.warn('[Wix CMS] Aviso enviando a Wix (se mantiene en local):', retryErr?.message || retryErr);
      return { success: false, error: retryErr?.message || retryErr };
    }
  }
}

/**
 * ================================================================
 * TRAMITES & EXPEDIENTES CMS INTEGRATION (Wix CMS: "Tramites")
 * ================================================================
 */

/**
 * Consulta trámites desde la colección Wix CMS "Tramites"
 */
export async function fetchTramitesFromWix() {
  try {
    const client = await getWixClient();
    const queryRes = await client.items.query(TRAMITES_COLLECTION).limit(100).find();
    if (queryRes && Array.isArray(queryRes.items) && queryRes.items.length > 0) {
      console.log(`[Wix CMS] ✅ ${queryRes.items.length} trámites recuperados desde Wix`);
      return queryRes.items;
    }
  } catch (err) {
    console.warn('[Wix CMS] No se pudo conectar con la colección "Tramites" de Wix (usando datos locales):', err?.message || err);
  }
  return null;
}

/**
 * Inserta o guarda un nuevo trámite en Wix CMS
 */
export async function saveTramiteToWix(tramite) {
  try {
    const client = await getWixClient();
    const payload = {
      title: `${tramite.id} — ${tramite.brandName}`,
      codigo: tramite.id,
      tipo: tramite.type,
      marca: tramite.brandName,
      cliente: tramite.clientName,
      email: tramite.clientEmail,
      telefono: tramite.clientPhone || '',
      claseNiza: tramite.nizaClass || '',
      fechaIngreso: tramite.entryDate,
      fechaLimite: tramite.deadlineDate,
      ultimaActualizacion: tramite.lastUpdateDate,
      siguienteActualizacion: tramite.nextUpdateLimit,
      etapaActual: tramite.currentStage,
      comentarios: tramite.comments,
      abogado: tramite.lawyer || 'Lic. Daniel Garza',
      folioImpi: tramite.folioImpi || ''
    };

    const res = await client.items.insert(TRAMITES_COLLECTION, payload);
    console.log('[Wix CMS] ✅ Trámite sincronizado en Wix:', res);
    return { success: true, item: res };
  } catch (err) {
    console.warn('[Wix CMS] Aviso al sincronizar trámite con Wix:', err?.message || err);
    return { success: false, error: err?.message || err };
  }
}

/**
 * Actualiza la etapa, comentarios o fechas de un trámite en Wix CMS
 */
export async function updateTramiteInWix(tramiteId, updates) {
  try {
    const client = await getWixClient();
    // Buscar el item por código de trámite
    const searchRes = await client.items.query(TRAMITES_COLLECTION).eq('codigo', tramiteId).find();
    if (searchRes.items && searchRes.items.length > 0) {
      const itemToUpdate = searchRes.items[0];
      const updatedFields = {
        ...itemToUpdate,
        etapaActual: updates.currentStage || itemToUpdate.etapaActual,
        comentarios: updates.comments || itemToUpdate.comentarios,
        ultimaActualizacion: new Date().toISOString(),
        siguienteActualizacion: updates.nextUpdateLimit || itemToUpdate.siguienteActualizacion,
        fechaLimite: updates.deadlineDate || itemToUpdate.fechaLimite
      };
      const res = await client.items.update(TRAMITES_COLLECTION, updatedFields);
      console.log(`[Wix CMS] ✅ Trámite ${tramiteId} actualizado en Wix:`, res);
      return { success: true, item: res };
    }
  } catch (err) {
    console.warn(`[Wix CMS] Aviso actualizando trámite ${tramiteId} en Wix:`, err?.message || err);
  }
  return { success: false };
}

/**
 * ================================================================
 * AUTH & PORTAL ACCOUNTS (Members & Role Management)
 * ================================================================
 */

export const DEFAULT_REGISTRADOR = {
  name: 'Lic. Daniel Garza',
  email: 'dgarza@dilodigital.com',
  role: 'registrador',
  title: 'Equipo Legal & Registrador IMPI',
  phone: '55 8421 9900',
  city: 'CDMX',
  avatarText: 'DG'
};

export const DEFAULT_CLIENT = {
  name: 'Ana Lucía Morales',
  email: 'cliente@solaria.mx',
  role: 'client',
  title: 'Titular de Marca · Solaria Coffee MX',
  phone: '55 1234 5678',
  city: 'Guadalajara',
  avatarText: 'AM'
};

export function getWixCurrentMember() {
  if (typeof window === 'undefined') return DEFAULT_REGISTRADOR;
  try {
    const raw = localStorage.getItem(MEMBER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_REGISTRADOR;
}

export function setWixCurrentMember(user) {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(MEMBER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(MEMBER_KEY);
    }
  } catch {}
}

export default getWixClient;
