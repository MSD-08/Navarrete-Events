import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Journal articles — one Markdown file per language in src/content/journal/<lang>/.
 * Articles that share a `translationKey` are linked by the language switcher.
 * Images inside the text use the photo library: ![Alt text](media:boda-ta/g05 "Optional caption")
 */
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['es', 'en']),
    slug: z.string(),
    translationKey: z.string(),
    dek: z.string(),
    category: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    /** Publication date. Leave empty while the article is a draft. */
    date: z.coerce.date().optional(),
    /** Drafts are labelled as such and can be hidden site-wide (src/data/site.ts → journal.showDrafts). */
    draft: z.boolean().default(true),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { journal };
