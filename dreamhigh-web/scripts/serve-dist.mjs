import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');

function normalizeApiBase(raw) {
  if (typeof raw !== 'string') return '';
  const t = raw.trim().replace(/\/$/, '');
  if (t === '') return '';
  if (!/^https?:\/\//i.test(t)) {
    console.error(
      '[serve-dist] VITE_API_URL / PUBLIC_API_URL must start with http:// or https:// — got:',
      t.slice(0, 80),
    );
    return '';
  }
  return t;
}

/**
 * On Render, env vars are available at runtime but not always at Vite build time.
 * Write dist/runtime-config.js and patch dist/index.html once per process start.
 */
function injectRuntimeApiBase() {
  if (!existsSync(indexPath)) {
    console.error('[serve-dist] dist/index.html not found. Run npm run build first.');
    process.exit(1);
  }

  const fromEnv = normalizeApiBase(
    process.env.VITE_API_URL || process.env.PUBLIC_API_URL || '',
  );
  if (!fromEnv) {
    return;
  }

  const runtimePath = join(distDir, 'runtime-config.js');
  const payload = `window.__DH_API_BASE__=${JSON.stringify(fromEnv)};\n`;
  writeFileSync(runtimePath, payload, 'utf8');

  let html = readFileSync(indexPath, 'utf8');
  if (html.includes('runtime-config.js')) {
    return;
  }

  const tag = '<script src="/runtime-config.js"></script>';
  const needle = '<script type="module"';
  const idx = html.indexOf(needle);
  if (idx === -1) {
    console.error('[serve-dist] Could not find module script tag in dist/index.html');
    process.exit(1);
  }
  html = html.slice(0, idx) + tag + '\n    ' + html.slice(idx);
  writeFileSync(indexPath, html, 'utf8');
  console.log('[serve-dist] Injected runtime API base from environment.');
}

injectRuntimeApiBase();

const raw = process.env.PORT;
if (raw === undefined || raw === '') {
  console.error(
    'PORT is not set. On Render it is provided automatically; locally use: PORT=4173 npm start',
  );
  process.exit(1);
}

const port = Number(raw);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be an integer from 1 to 65535.');
  process.exit(1);
}

const server = await preview({
  preview: {
    port,
    strictPort: true,
    host: '0.0.0.0',
  },
});

server.printUrls();
