import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../data/site';
import type { Lang } from '../i18n/routes';

export type Article = CollectionEntry<'journal'>;

export async function getArticles(lang: Lang): Promise<Article[]> {
  const all = await getCollection('journal', (e) => e.data.lang === lang && (site.journal.showDrafts || !e.data.draft));
  return all.sort((a, b) => {
    if (a.data.draft !== b.data.draft) return a.data.draft ? 1 : -1;
    return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || a.data.title.localeCompare(b.data.title);
  });
}

export async function getTranslation(article: Article): Promise<Article | undefined> {
  const all = await getCollection('journal');
  return all.find((e) => e.data.translationKey === article.data.translationKey && e.data.lang !== article.data.lang);
}

export const readingTime = (body = '') => Math.max(2, Math.round(body.split(/\s+/).length / 210));

export const formatDate = (d: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
