import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID || '2db3573e-2635-43b6-939b-8d52f78f8de9';
const TRAMITES_COLLECTION = 'Tramites';

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
    console.warn('[API Tramites] Note generating visitor tokens:', err?.message || err);
  }

  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Fetch trámites (optional filter by type or email)
  if (req.method === 'GET') {
    try {
      const { type, email } = req.query || {};
      const client = await getWixClient();
      let query = client.items.query(TRAMITES_COLLECTION).limit(100);

      if (type) query = query.eq('tipo', type);
      if (email) query = query.eq('email', email.trim().toLowerCase());

      const result = await query.find();
      return res.status(200).json({
        success: true,
        items: result.items || []
      });
    } catch (err) {
      console.warn('[API Tramites] Wix collection offline fallback:', err.message);
      return res.status(200).json({
        success: true,
        items: [],
        note: 'Using client-side store fallback'
      });
    }
  }

  // POST: Create a new trámite
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const client = await getWixClient();

      const payload = {
        title: `${body.id || 'VIA-2026'} — ${body.brandName || 'Marca'}`,
        codigo: body.id,
        tipo: body.type,
        marca: body.brandName,
        cliente: body.clientName,
        email: body.clientEmail,
        telefono: body.clientPhone || '',
        claseNiza: body.nizaClass || '',
        fechaIngreso: body.entryDate || new Date().toISOString().split('T')[0],
        fechaLimite: body.deadlineDate,
        ultimaActualizacion: new Date().toISOString(),
        siguienteActualizacion: body.nextUpdateLimit,
        etapaActual: body.currentStage,
        comentarios: body.comments || '',
        abogado: body.lawyer || 'Lic. Daniel Garza',
        folioImpi: body.folioImpi || ''
      };

      const result = await client.items.insert(TRAMITES_COLLECTION, payload);
      return res.status(201).json({ success: true, item: result });
    } catch (err) {
      console.warn('[API Tramites] Error inserting to Wix:', err.message);
      return res.status(200).json({ success: true, savedLocally: true, note: err.message });
    }
  }

  // PUT: Update an existing trámite stage/comments
  if (req.method === 'PUT') {
    try {
      const { id, updates } = req.body || {};
      if (!id) return res.status(400).json({ error: 'ID de trámite requerido' });

      const client = await getWixClient();
      const searchRes = await client.items.query(TRAMITES_COLLECTION).eq('codigo', id).find();

      if (searchRes.items && searchRes.items.length > 0) {
        const itemToUpdate = searchRes.items[0];
        const updated = {
          ...itemToUpdate,
          etapaActual: updates.currentStage || itemToUpdate.etapaActual,
          comentarios: updates.comments || itemToUpdate.comentarios,
          ultimaActualizacion: new Date().toISOString(),
          siguienteActualizacion: updates.nextUpdateLimit || itemToUpdate.siguienteActualizacion,
          fechaLimite: updates.deadlineDate || itemToUpdate.fechaLimite
        };
        const result = await client.items.update(TRAMITES_COLLECTION, updated);
        return res.status(200).json({ success: true, item: result });
      }

      return res.status(200).json({ success: true, note: 'Trámite no encontrado en Wix CMS, actualizado en store local' });
    } catch (err) {
      console.warn('[API Tramites] Error updating in Wix:', err.message);
      return res.status(200).json({ success: true, updatedLocally: true, note: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
