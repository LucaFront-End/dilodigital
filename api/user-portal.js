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
    console.warn('[API User Portal] Visitor token note:', err?.message || err);
  }

  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, role } = req.query || {};
  const queryEmail = (email || '').trim().toLowerCase();

  try {
    const client = await getWixClient();
    let query = client.items.query(TRAMITES_COLLECTION).limit(100);

    if (queryEmail && role !== 'registrador') {
      query = query.eq('email', queryEmail);
    }

    const wixRes = await query.find();

    return res.status(200).json({
      success: true,
      tramites: wixRes.items || [],
      user: {
        email: queryEmail || 'cliente@dilodigital.com',
        role: role || (queryEmail.includes('dilo') ? 'registrador' : 'client')
      }
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      tramites: [],
      note: 'Wix CMS collection offline or empty, client using resilient local store fallback'
    });
  }
}
