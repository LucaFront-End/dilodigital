import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Expone las variables de .env (incluidas las privadas, sin prefijo VITE_)
  // a las funciones /api durante el desarrollo, igual que Vercel en producción.
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }

  return {
    plugins: [
      {
        name: 'dilo-api-dev-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url || !req.url.startsWith('/api/')) return next();

            const urlPath = req.url.split('?')[0];
            const routeName = urlPath.replace('/api/', '').replace(/\.js$/, '').replace(/\/+$/, '');

            const sendError = (status, message) => {
              if (res.headersSent) return;
              res.statusCode = status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, ok: false, error: message }));
            };

            // Igual que Vercel: carpetas con "_" (helpers) no son endpoints
            if (!/^[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/.test(routeName) || routeName.split('/').some((s) => s.startsWith('_'))) {
              return sendError(404, 'Not found');
            }

            let mod;
            try {
              mod = await import(`./api/${routeName}.js`);
            } catch (err) {
              if (err?.code === 'ERR_MODULE_NOT_FOUND' && String(err.message).includes(`api/${routeName}.js`)) {
                return sendError(404, 'Not found');
              }
              console.error(`[API Dev Error: ${routeName}]`, err);
              return sendError(500, err.message);
            }
            if (!mod?.default) return sendError(404, 'Not found');

            const parsedUrl = new URL(req.url, 'http://localhost:5173');
            req.query = Object.fromEntries(parsedUrl.searchParams.entries());

            // Express-like helpers
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            const run = async () => {
              try {
                await mod.default(req, res);
              } catch (err) {
                console.error(`[API Dev Error: ${routeName}]`, err);
                sendError(500, err.message);
              }
            };

            if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
              const chunks = [];
              req.on('data', (chunk) => chunks.push(chunk));
              req.on('end', async () => {
                const raw = Buffer.concat(chunks);
                req.rawBody = raw; // necesario para verificar firmas (webhooks)
                const text = raw.toString('utf8');
                if (mod.config?.api?.bodyParser === false) {
                  req.body = undefined;
                } else {
                  try {
                    req.body = text ? JSON.parse(text) : {};
                  } catch {
                    req.body = text;
                  }
                }
                await run();
              });
              return;
            }

            req.body = {};
            await run();
          });
        }
      }
    ]
  };
});
