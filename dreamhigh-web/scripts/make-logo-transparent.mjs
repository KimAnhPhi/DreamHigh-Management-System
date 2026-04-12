/**
 * Tách nền đen / gần đen khỏi logo PNG → alpha trong suốt.
 * Chạy: node scripts/make-logo-transparent.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = process.env.LOGO_SRC || join(__dirname, 'source-logo.png');
const outDir = join(root, 'public', 'brand');
const outFile = join(outDir, 'dreamhigh-logo.png');

async function main() {
  await mkdir(outDir, { recursive: true });

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const px = new Uint8ClampedArray(data);

  for (let i = 0; i < px.length; i += channels) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // Nền đen / xám đậm ít màu → trong suốt (giữ vàng/cận vàng)
    const isDarkBg = lum < 52 && sat < 0.35;
    const isPureBlack = r < 40 && g < 40 && b < 40;

    if (isPureBlack || isDarkBg) {
      px[i + 3] = 0;
    }
  }

  await sharp(Buffer.from(px), {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outFile);

  console.log('Wrote', outFile, `${width}x${height}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
