import { preview } from 'vite';

const raw = process.env.PORT;
if (raw === undefined || raw === '') {
  console.error(
    'PORT is not set. On Render it is provided automatically; locally use: PORT=4173 npm start'
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
