/**
 * Rehype plugin: turns Markdown images that point to the photo library
 *   ![Alt text](media:boda-ta/g05 "Caption")
 * into responsive <figure><picture> markup (AVIF + JPEG, srcset, dimensions, lazy loading).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('src/data/media.json');
let manifest;
const load = () => (manifest ??= JSON.parse(readFileSync(manifestPath, 'utf8')));

const h = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });

function walk(node, fn, parent) {
  if (node.children) for (let i = 0; i < node.children.length; i++) walk(node.children[i], fn, node);
  fn(node, parent);
}

export default function rehypeMedia() {
  return (tree) => {
    const media = load();
    walk(tree, (node, parent) => {
      if (node.type !== 'element' || node.tagName !== 'p' || !parent) return;
      const imgs = node.children.filter((c) => c.type === 'element' && c.tagName === 'img');
      const others = node.children.filter((c) => !(c.type === 'element' && c.tagName === 'img') && !(c.type === 'text' && !c.value.trim()));
      if (!imgs.length || others.length || !imgs.every((i) => String(i.properties.src).startsWith('media:'))) return;

      const pictures = imgs.map((img) => {
        const id = String(img.properties.src).slice(6);
        const m = media[id];
        if (!m) throw new Error(`[rehype-media] Unknown image id "${id}"`);
        const set = (ext) => m.v.map((w) => `/media/${id}-${w}.${ext} ${w}w`).join(', ');
        const sizes = imgs.length > 1 ? '(min-width: 900px) 34vw, 46vw' : '(min-width: 900px) 60vw, 92vw';
        const fallback = m.v.find((w) => w >= 960) ?? m.v[m.v.length - 1];
        return {
          title: img.properties.title,
          el: h('picture', { style: `--c:${m.c}` }, [
            h('source', { type: 'image/avif', srcSet: set('avif'), sizes }),
            h('img', {
              src: `/media/${id}-${fallback}.jpg`,
              srcSet: set('jpg'),
              sizes,
              width: m.w,
              height: m.h,
              alt: img.properties.alt ?? '',
              loading: 'lazy',
              decoding: 'async',
              style: `background-color:${m.c}`,
            }),
          ]),
        };
      });

      const caption = pictures.map((p) => p.title).filter(Boolean).join(' · ');
      const figure = h('figure', { className: ['article-figure', pictures.length > 1 ? 'article-figure--pair' : 'article-figure--single'] }, [
        h('div', { className: ['article-figure__media'] }, pictures.map((p) => p.el)),
        ...(caption ? [h('figcaption', { className: ['fig'] }, [{ type: 'text', value: caption }])] : []),
      ]);
      const idx = parent.children.indexOf(node);
      parent.children.splice(idx, 1, figure);
    });
  };
}
