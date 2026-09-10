/**
 * Express Full-Stack Server Entry Point (Phase 7)
 * Serves /api/contact and integrates Vite middleware in dev or static files in production.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleContactInquiry } from './src/api/contactHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'pratiksha-portfolio-backend' });
  });

  // Contact inquiry submission API
  app.post('/api/contact', async (req, res) => {
    try {
      const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
      const result = await handleContactInquiry(req.body, clientIp);
      return res.status(result.status).json(result.data);
    } catch (err) {
      console.error('Server error handling /api/contact:', err?.message || err);
      return res.status(500).json({
        success: false,
        error: 'Internal server error processing inquiry. Please try again.',
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
