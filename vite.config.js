import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'dilo-api-dev-handler',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/')) {
            const urlPath = req.url.split('?')[0];
            const routeName = urlPath.replace('/api/', '').replace(/\.js$/, '');
            try {
              const mod = await import(`./api/${routeName}.js`);
              if (mod && mod.default) {
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

                if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
                  let body = '';
                  req.on('data', (chunk) => { body += chunk; });
                  req.on('end', async () => {
                    try {
                      req.body = body ? JSON.parse(body) : {};
                    } catch {
                      req.body = body;
                    }
                    await mod.default(req, res);
                  });
                  return;
                }

                req.body = {};
                await mod.default(req, res);
                return;
              }
            } catch (err) {
              console.error(`[API Dev Error: ${routeName}]`, err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
              return;
            }
          }
          next();
        });
      }
    }
  ]
});
