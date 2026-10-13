/**
 * Navarrete Events — business information
 * ---------------------------------------
 * Single source of truth for contact details and integrations.
 * Anything left as `null` is hidden from the website automatically, so the
 * site never shows invented data. Fill these in as soon as they are confirmed.
 */
export const site = {
  name: 'Navarrete Events',
  /** Public production URL (used for canonical links, hreflang and the sitemap). Configured in astro.config.mjs via the SITE_URL environment variable. */
  url: (import.meta.env.SITE as string | undefined) ?? 'https://navarrete.events.example',

  location: {
    city: 'Tijuana',
    region: 'Baja California',
    regionCode: 'B.C.',
    country: 'México',
    countryEn: 'Mexico',
    countryCode: 'MX',
  },

  contact: {
    /** e.g. 'hola@tudominio.com' — pending confirmation. */
    email: null as string | null,
    /** International format without spaces or symbols, e.g. '5216641234567' — pending confirmation. */
    whatsapp: null as string | null,
    /** Display version of the phone number, e.g. '+52 664 123 4567'. */
    phoneDisplay: null as string | null,
  },

  social: {
    /** Handle taken from the watermark on Navarrete Events' own photographs (@navarrete.events). */
    instagram: { handle: '@navarrete.events', url: 'https://www.instagram.com/navarrete.events/' },
    facebook: null as { handle: string; url: string } | null,
    tiktok: null as { handle: string; url: string } | null,
    pinterest: null as { handle: string; url: string } | null,
  },

  inquiry: {
    /**
     * Endpoint that receives the inquiry form as JSON (POST, `Accept: application/json`).
     * Compatible with Formspree, Basin, Getform, a Netlify/Vercel function, etc.
     * Configure through the PUBLIC_INQUIRY_ENDPOINT environment variable.
     * When empty, the form never pretends to send: it prepares the message so the
     * visitor can deliver it through the channels that do exist (Instagram, email, WhatsApp).
     */
    endpoint: (import.meta.env.PUBLIC_INQUIRY_ENDPOINT as string | undefined) ?? '',
  },

  journal: {
    /** Show articles marked `draft: true`, labelled as drafts. Set to false before launch to hide them. */
    showDrafts: true,
  },

  /** Founder / studio lead as named in the supplied photo library. */
  lead: 'Gaby Navarrete',
};

export const whatsappLink = (text = '') =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null;

export const mailLink = (subject = '', body = '') =>
  site.contact.email
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
    : null;
