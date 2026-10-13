/**
 * Navarrete Events — media pipeline
 * ----------------------------------
 * Reads the photo library in /photos and produces responsive, optimised
 * derivatives in /public/media (AVIF + JPEG at several widths), plus a
 * manifest (src/data/media.json) with dimensions and a dominant colour used
 * as an elegant placeholder while each image loads.
 *
 *   photos/<project-slug>/<name>.jpg  →  public/media/<project-slug>/<name>-<w>.{avif,jpg}
 *
 * Derivatives are cached: an image is only re-encoded when its source is newer.
 * To add a project, drop a folder of JPEGs into /photos and register it in
 * src/data/projects.ts. Run `npm run media` (or any dev/build command).
 */
import { readdir, mkdir, stat, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'photos');
const OUT = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'src', 'data', 'media.json');
const WIDTHS = [480, 960, 1440];

sharp.concurrency(1);

const isNewer = async (src, out) => {
  if (!existsSync(out)) return true;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return a.mtimeMs > b.mtimeMs;
};

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

async function processImage(dir, file) {
  const name = file.replace(/\.(jpe?g|png)$/i, '');
  const id = `${dir}/${name}`;
  const src = path.join(SRC, dir, file);
  const outDir = path.join(OUT, dir);
  await mkdir(outDir, { recursive: true });

  const img = sharp(src).rotate();
  const meta = await img.metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;
  const { dominant } = await sharp(src).resize(64).stats();

  const widths = WIDTHS.filter((x) => x < w);
  const top = Math.min(w, WIDTHS[WIDTHS.length - 1]);
  if (!widths.includes(top)) widths.push(top);

  let encoded = 0;
  for (const width of widths) {
    const base = path.join(outDir, `${name}-${width}`);
    if (await isNewer(src, `${base}.avif`)) {
      await sharp(src).rotate().resize({ width }).avif({ quality: 52, effort: 4 }).toFile(`${base}.avif`);
      encoded++;
    }
    if (await isNewer(src, `${base}.jpg`)) {
      await sharp(src).rotate().resize({ width }).jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`);
      encoded++;
    }
  }
  return { id, entry: { w, h, c: hex(dominant), v: widths }, encoded };
}

async function main() {
  const t0 = Date.now();
  const dirs = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const jobs = [];
  for (const dir of dirs) {
    const files = (await readdir(path.join(SRC, dir))).filter((f) => /\.jpe?g$/i.test(f)).sort();
    for (const f of files) jobs.push([dir, f]);
  }

  const manifest = {};
  let encoded = 0;
  let i = 0;
  const workers = Math.max(1, Math.min(os.cpus().length, 6));
  await Promise.all(
    Array.from({ length: workers }, async () => {
      while (i < jobs.length) {
        const [dir, f] = jobs[i++];
        const r = await processImage(dir, f);
        manifest[r.id] = r.entry;
        encoded += r.encoded;
      }
    }),
  );

  // Brand assets (logo is used as-is on dark grounds).
  const brandOut = path.join(ROOT, 'public', 'brand');
  await mkdir(brandOut, { recursive: true });
  const logoSrc = path.join(SRC, '_studio', 'logo.png');
  if (existsSync(logoSrc)) {
    if (await isNewer(logoSrc, path.join(brandOut, 'logo.png'))) await copyFile(logoSrc, path.join(brandOut, 'logo.png'));
    if (await isNewer(logoSrc, path.join(brandOut, 'monogram.png'))) {
      await sharp(logoSrc).extract({ left: 120, top: 0, width: 660, height: 300 }).png().toFile(path.join(brandOut, 'monogram.png'));
    }
  }

  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 0).replace(/},"/g, '},\n"') + '\n');
  console.log(`[media] ${Object.keys(sorted).length} images · ${encoded} files encoded · ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
