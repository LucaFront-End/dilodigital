import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID || '2db3573e-2635-43b6-939b-8d52f78f8de9';

const DEFAULT_ACCOUNTS = {
  'dgarza@dilodigital.com': {
    email: 'dgarza@dilodigital.com',
    name: 'Lic. Daniel Garza',
    role: 'registrador',
    title: 'Equipo Legal & Registrador IMPI',
    phone: '55 8421 9900',
    city: 'CDMX',
    avatarText: 'DG'
  },
  'cliente@solaria.mx': {
    email: 'cliente@solaria.mx',
    name: 'Ana Lucía Morales',
    role: 'client',
    title: 'Titular de Marca · Solaria Coffee MX',
    phone: '55 1234 5678',
    city: 'Guadalajara',
    avatarText: 'AM'
  }
};

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
    console.warn('[API Auth] Note generating visitor tokens:', err?.message || err);
  }

  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query || {};
  const body = req.body || {};
  const requestedAction = action || body.action || 'login';

  // 1. LOGIN
  if (requestedAction === 'login') {
    const email = (body.email || '').trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ error: 'Correo electrónico requerido.' });
    }

    // Check predefined account or detect role
    if (DEFAULT_ACCOUNTS[email]) {
      return res.status(200).json({
        success: true,
        user: DEFAULT_ACCOUNTS[email]
      });
    }

    const isRegistrador = email.includes('dilo') || email.includes('abogado') || email.includes('admin') || email.includes('garza');
    const userObj = {
      email,
      name: email.split('@')[0].replace('.', ' '),
      role: isRegistrador ? 'registrador' : 'client',
      title: isRegistrador ? 'Equipo Legal & Registrador IMPI' : 'Titular de Marca',
      phone: body.phone || '',
      city: body.city || 'México',
      avatarText: email.slice(0, 2).toUpperCase()
    };

    return res.status(200).json({
      success: true,
      user: userObj
    });
  }

  // 2. REGISTER
  if (requestedAction === 'register') {
    const { name, email, phone, city, role } = body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y correo son requeridos.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const isRegistrador = role === 'registrador' || cleanEmail.includes('dilo');

    const newUser = {
      email: cleanEmail,
      name: name.trim(),
      role: isRegistrador ? 'registrador' : 'client',
      title: isRegistrador ? 'Equipo Legal & Registrador IMPI' : 'Titular de Marca',
      phone: phone || '',
      city: city || 'México',
      avatarText: name.trim().slice(0, 2).toUpperCase()
    };

    // Optionally record to Wix CMS
    try {
      const client = await getWixClient();
      await client.items.insert('CuentasUsuarios', {
        title: cleanEmail,
        nombre: newUser.name,
        email: cleanEmail,
        telefono: newUser.phone,
        rol: newUser.role
      });
    } catch {}

    return res.status(201).json({
      success: true,
      user: newUser
    });
  }

  return res.status(400).json({ error: 'Acción no soportada.' });
}
