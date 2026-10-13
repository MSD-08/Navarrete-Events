import manifest from '../data/media.json';
import { projects, type Project } from '../data/projects';
import type { Lang } from '../i18n/routes';

export interface MediaEntry {
  w: number;
  h: number;
  /** Dominant colour, used as placeholder background. */
  c: string;
  /** Available widths. */
  v: number[];
}

const media = manifest as Record<string, MediaEntry>;

export function getMedia(id: string): MediaEntry {
  const m = media[id];
  if (!m) throw new Error(`[media] Unknown image id "${id}". Run \`npm run media\` or check the id.`);
  return m;
}

export const src = (id: string, w: number, ext: 'avif' | 'jpg') => `/media/${id}-${w}.${ext}`;
export const srcset = (id: string, ext: 'avif' | 'jpg') =>
  getMedia(id)
    .v.map((w) => `${src(id, w, ext)} ${w}w`)
    .join(', ');

export const largest = (id: string) => {
  const m = getMedia(id);
  return src(id, m.v[m.v.length - 1], 'jpg');
};

export const isLandscape = (id: string) => {
  const m = getMedia(id);
  return m.w / m.h > 1.15;
};

export type GalleryRow =
  | { kind: 'single'; ids: [string]; variant: 'center' | 'left' | 'right' }
  | { kind: 'wide'; ids: [string] }
  | { kind: 'pair'; ids: [string, string]; variant: 'even' | 'stagger' }
  | { kind: 'diptych'; ids: [string, string] }
  | { kind: 'trio'; ids: [string, string, string] };

/** All photos of a project in display order (excluding the hero, excluded files and diptych halves). */
export function projectPhotos(p: Project) {
  const prefix = `${p.slug}/`;
  const all = Object.keys(media).filter((k) => k.startsWith(prefix));
  const excluded = new Set([...(p.exclude ?? []), p.hero]);
  const singles = all.filter((k) => !excluded.has(k) && !/\/diptych-/.test(k) && !/\/(before|after)$/.test(k));
  const diptychs: [string, string][] = [];
  for (const k of all.filter((k) => /\/diptych-\d+-izq$/.test(k))) {
    const pair = k.replace(/-izq$/, '-der');
    if (media[pair]) diptychs.push([k, pair]);
  }
  return { singles, diptychs };
}

/**
 * Builds an editorial rhythm for a gallery: alternating centred singles, staggered pairs,
 * offset singles and trios, with diptychs and landscape photographs given full-width rows.
 */
export function buildGallery(p: Project): GalleryRow[] {
  const { singles, diptychs } = projectPhotos(p);
  const queue = [...singles];
  const rows: GalleryRow[] = [];
  const pattern = ['pair-stagger', 'single-center', 'trio', 'single-right', 'pair-even', 'single-left'] as const;
  let step = 0;
  let sinceDiptych = 0;
  const dQueue = [...diptychs];

  while (queue.length) {
    if (dQueue.length && sinceDiptych >= 3) {
      rows.push({ kind: 'diptych', ids: dQueue.shift()! });
      sinceDiptych = 0;
      continue;
    }
    const next = queue[0];
    if (isLandscape(next)) {
      rows.push({ kind: 'wide', ids: [queue.shift()!] });
      sinceDiptych++;
      continue;
    }
    const kind = pattern[step % pattern.length];
    step++;
    sinceDiptych++;
    const portraitsAhead = (n: number) => queue.slice(0, n).length === n && queue.slice(0, n).every((id) => !isLandscape(id));
    if (kind === 'trio' && portraitsAhead(3)) {
      rows.push({ kind: 'trio', ids: [queue.shift()!, queue.shift()!, queue.shift()!] });
    } else if ((kind === 'pair-stagger' || kind === 'pair-even' || kind === 'trio') && portraitsAhead(2)) {
      rows.push({ kind: 'pair', ids: [queue.shift()!, queue.shift()!], variant: kind === 'pair-even' ? 'even' : 'stagger' });
    } else {
      const variant = kind === 'single-left' ? 'left' : kind === 'single-right' ? 'right' : 'center';
      rows.push({ kind: 'single', ids: [queue.shift()!], variant });
    }
  }
  for (const d of dQueue) rows.push({ kind: 'diptych', ids: d });
  return rows;
}

export const photoAlt = (p: Project, lang: Lang, n: number, total: number) =>
  `${p.altContext[lang]} — ${lang === 'es' ? 'fotografía' : 'photograph'} ${n} ${lang === 'es' ? 'de' : 'of'} ${total}`;

export const countPhotos = (p: Project) => {
  const { singles, diptychs } = projectPhotos(p);
  return singles.length + diptychs.length * 2 + 1;
};

export const allProjects = projects;
