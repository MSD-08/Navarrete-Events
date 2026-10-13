import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { path, type RouteKey } from '../i18n/routes';
import { projects } from '../data/projects';
import { site } from '../data/site';

/** Bilingual sitemap with hreflang alternates for every page. */
export const GET: APIRoute = async ({ site: astroSite }) => {
  const base = (astroSite?.href ?? site.url).replace(/\/$/, '');
  const pairs: { es: string; en: string }[] = [];
  const keys: RouteKey[] = ['home', 'portfolio', 'experience', 'studio', 'journal', 'inquiry', 'contact', 'privacy', 'accessibility'];
  for (const k of keys) pairs.push({ es: path('es', k), en: path('en', k) });
  for (const p of projects) pairs.push({ es: path('es', 'portfolio', p.slug), en: path('en', 'portfolio', p.slug) });

  // Drafts are noindex, so only published articles are listed.
  const articles = await getCollection('journal', (e) => !e.data.draft);
  const byKey = new Map<string, { es?: string; en?: string }>();
  for (const a of articles) {
    const entry = byKey.get(a.data.translationKey) ?? {};
    entry[a.data.lang] = path(a.data.lang, 'journal', a.data.slug);
    byKey.set(a.data.translationKey, entry);
  }

  const url = (loc: string, alts: { es?: string; en?: string }) => `
  <url>
    <loc>${base}${loc}</loc>${alts.es ? `
    <xhtml:link rel="alternate" hreflang="es" href="${base}${alts.es}"/>` : ''}${alts.en ? `
    <xhtml:link rel="alternate" hreflang="en" href="${base}${alts.en}"/>` : ''}${alts.es ? `
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${alts.es}"/>` : ''}
  </url>`;

  let body = '';
  for (const p of pairs) body += url(p.es, p) + url(p.en, p);
  for (const alts of byKey.values()) for (const loc of [alts.es, alts.en]) if (loc) body += url(loc, alts);

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
