// ================================================================
// DILO DIGITAL — CMS LEADS REPOSITORY (CLIENT & INTAKE STORAGE)
// Stores inquiries, phonetic radar scans & IMPI requirement cases
// ================================================================

import { sendLeadToWix } from '../lib/wixClient.js';

const STORAGE_KEY = 'dilo_leads_cms';

export function saveLeadToCms(leadData) {
  try {
    const existing = getLeadsFromCms();
    const newLead = {
      id: 'LEAD-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
      timestamp: new Date().toISOString(),
      dateFormatted: new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'America/Mexico_City'
      }).format(new Date()),
      name: leadData.name?.trim() || 'Sin nombre',
      phone: leadData.phone?.trim() || 'Sin teléfono',
      email: leadData.email?.trim() || 'Sin email',
      brandName: leadData.brandName?.trim() || 'Sin marca',
      nizaClass: leadData.nizaClass || 'No especificada',
      source: leadData.source || window.location.hash || '#/registro-marca',
      type: leadData.type || 'coincidencias', // 'coincidencias' | 'rechazo_impi' | 'chat_inquiry' | 'checkout'
      statusScenario: leadData.statusScenario || 'verde', // 'verde' | 'amarillo' | 'rojo'
      notes: leadData.notes || '',
      syncedToCrm: true,
      wixStatus: 'pending_sync'
    };

    existing.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // Live sync to Wix Headless CMS in background
    sendLeadToWix(newLead)
      .then(res => {
        if (res?.success) {
          newLead.wixStatus = 'synced_wix';
          newLead.wixId = res.item?._id || res.item?.id;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
          console.log(`[DILO CMS] ☁️ Sincronizado en Wix Headless CMS: ${newLead.brandName}`);
        } else {
          newLead.wixStatus = 'cached_offline';
        }
      })
      .catch(err => {
        newLead.wixStatus = 'cached_offline';
        console.warn('[DILO CMS] Wix Headless sync offline/fallback:', err);
      });

    // Dispatch global event for live monitoring/debugging
    window.dispatchEvent(new CustomEvent('dilo:new-lead', { detail: newLead }));
    
    console.group(`[DILO CMS] 📋 Nuevo Lead Registrado: ${newLead.brandName} (${newLead.name})`);
    console.log('ID:', newLead.id);
    console.log('Contacto:', `${newLead.phone} | ${newLead.email}`);
    console.log('Escenario:', newLead.statusScenario);
    console.log('Tipo:', newLead.type);
    console.log('Total Leads en CMS:', existing.length);
    console.groupEnd();

    return newLead;
  } catch (error) {
    console.error('[DILO CMS Error] No se pudo guardar el lead:', error);
    return null;
  }
}

export function getLeadsFromCms() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[DILO CMS Error] Error leyendo leads:', error);
    return [];
  }
}

export function getLeadCount() {
  return getLeadsFromCms().length;
}
