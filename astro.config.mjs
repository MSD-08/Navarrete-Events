// @ts-check
import { defineConfig } from 'astro/config';
import rehypeMedia from './plugins/rehype-media.mjs';

// Production URL — set SITE_URL in the hosting environment (e.g. https://www.navarrete-events.com).
const site = process.env.SITE_URL || 'https://navarrete.events.example';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  markdown: { rehypePlugins: [rehypeMedia] },
});
