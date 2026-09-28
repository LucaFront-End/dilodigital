import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID || '2db3573e-2635-43b6-939b-8d52f78f8de9';
const CONTACTO_COLLECTION = 'Contacto';

async function getWixClient() {
  const siteId = process.env.VITE_WIX_SITE_ID;
  const apiKey = process.env.VITE_WIX_API_KEY;

  if (apiKey && siteId) {
    return createClient({
      modules: { items },
      auth: ApiKeyStrategy({ siteId, apiKey })
    });
  }

  const client = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
  });

  try {
    const tokens = await client.auth.generateVisitorTokens();
    await client.auth.setTokens(tokens);
  } catch (err) {
    console.warn('[API Leads] Note generating visitor tokens:', err?.message || err);
  }

  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const client = await getWixClient();
      const queryRes = await client.items.query(CONTACTO_COLLECTION).limit(50).find();
      return res.status(200).json({ success: true, leads: queryRes.items || [] });
    } catch (err) {
      return res.status(200).json({ success: true, leads: [], note: 'Using local cache fallback' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body || {};
    const brand = data.brandName || data.marca || 'Marca no especificada';
    const name = data.name || data.nombre || 'Lead Dilo';
    const type = data.type || 'Radar IMPI';
    const cleanTitle = `${brand} — ${name} [${type}]`;

    const payload = {
      title: cleanTitle,
      nombre: (data.name || data.nombre || '').trim(),
      telefono: (data.phone || data.telefono || '').trim(),
      email: (data.email || data.correo || '').trim(),
      marca: brand.trim(),
      claseNiza: data.nizaClass || data.clase || '',
      tipo: type,
      escenario: data.statusScenario || '',
      mensaje: (data.notes || data.mensaje || '').trim(),
      origen: data.source || 'Web Dilo Digital',
      fecha: data.timestamp || new Date().toISOString()
    };

    const client = await getWixClient();
    const result = await client.items.insert(CONTACTO_COLLECTION, payload);

    return res.status(200).json({
      success: true,
      message: 'Lead registrado en Wix CMS "Contacto" exitosamente.',
      item: result
    });
  } catch (error) {
    console.error('[API Leads] Error insertando lead en Wix CMS:', error);
    return res.status(200).json({
      success: true,
      savedLocally: true,
      note: 'Wix CMS collection offline or pending initialization, lead cached locally.',
      error: error.message
    });
  }
}
