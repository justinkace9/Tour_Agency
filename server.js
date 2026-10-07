import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Health check endpoint for Cloud Run
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
}

// Single Page Application (SPA) client-side routing fallback
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Application is compiling, please refresh shortly.');
  }
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`[Production Server] Listening on http://0.0.0.0:${PORT}`);
});

export default app;
