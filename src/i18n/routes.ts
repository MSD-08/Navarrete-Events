export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Localised URL segments. Keys are stable route identifiers used across the codebase. */
export const routes = {
  home: { es: '', en: '' },
  portfolio: { es: 'portafolio', en: 'portfolio' },
  experience: { es: 'experiencia', en: 'experience' },
  studio: { es: 'estudio', en: 'studio' },
  journal: { es: 'journal', en: 'journal' },
  inquiry: { es: 'iniciar-proyecto', en: 'start-a-project' },
  contact: { es: 'contacto', en: 'contact' },
  privacy: { es: 'aviso-de-privacidad', en: 'privacy' },
  accessibility: { es: 'accesibilidad', en: 'accessibility' },
} as const;
export type RouteKey = keyof typeof routes;

export const path = (lang: Lang, key: RouteKey, slug?: string) => {
  const seg = routes[key][lang];
  return `/${lang}/` + (seg ? `${seg}/` : '') + (slug ? `${slug}/` : '');
};

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Primary navigation order (Spanish labels are the default). */
export const nav: RouteKey[] = ['home', 'portfolio', 'experience', 'studio', 'journal', 'inquiry', 'contact'];
