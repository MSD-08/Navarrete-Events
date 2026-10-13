# Navarrete Events — sitio web

Sitio bilingüe (español por defecto / inglés) de **Navarrete Events**, estudio de planeación y diseño de celebraciones en Tijuana, Baja California.

Construido con [Astro](https://astro.build) como sitio estático: HTML pre-renderizado, CSS propio y muy poco JavaScript (sólo para el menú, la secuencia de portada, el filtro del portafolio, el visor de fotografías, el comparador antes/después y el formulario).

## Puesta en marcha

```bash
npm install
npm run dev      # genera las imágenes optimizadas y abre http://localhost:4321
npm run build    # sitio final en /dist
npm run preview  # previsualiza /dist
```

La primera ejecución procesa toda la fototeca (≈380 fotografías → AVIF + JPEG en 3 tamaños) y tarda varios minutos; después sólo se procesan las fotos nuevas o modificadas.

Se puede publicar en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages…). Comando de build: `npm run build` · carpeta de salida: `dist`.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `SITE_URL` | Dominio definitivo (p. ej. `https://www.navarrete-events.com`). Se usa en enlaces canónicos, `hreflang`, Open Graph y `sitemap.xml`. **Obligatoria antes de publicar.** |
| `PUBLIC_INQUIRY_ENDPOINT` | URL que recibe el formulario “Iniciar proyecto” como JSON (Formspree, Basin, Getform, una función serverless…). |

Vea `.env.example`.

## Pendientes de información (nada de esto se inventó)

Edite **`src/data/site.ts`**. Todo lo que esté en `null` se oculta automáticamente.

- **Correo** y **WhatsApp / teléfono**: aún no proporcionados. Al llenarlos aparecen en el pie de página, Contacto, Iniciar proyecto y como opciones de envío del formulario.
- **Instagram**: `@navarrete.events`, tomado de la marca de agua de las propias fotografías. Confirmar.
- **Facebook, TikTok, Pinterest**: agregar sólo si existen cuentas oficiales.
- **Dominio** (`SITE_URL`).
- **Semblanza de Gaby Navarrete** (`src/copy/studio.ts` → `leadNote`).
- **Rangos de inversión** del formulario (`src/copy/inquiry.ts` → `budget`): son una propuesta editable.
- **Servicios** (`src/copy/services.ts`): redactados a partir de la descripción del estudio; ajústelos a la oferta real.
- **Aviso de privacidad** (`src/copy/legal.ts`): plantilla basada en la LFPDPPP con datos entre [corchetes] por completar; debe revisarla un asesor legal.
- **Proyectos**: lugar, año y nombres de los clientes sólo se muestran cuando están confirmados (`location`, `year` en `src/data/projects.ts`). Hoy sólo las graduaciones PFLC tienen lugar, tomado del plano de distribución incluido en las fotos.

## Formulario “Iniciar proyecto”

- Con `PUBLIC_INQUIRY_ENDPOINT` configurado, el formulario envía un JSON (campos + `message` con un resumen legible) y sólo muestra “Gracias, recibimos su solicitud” si el servidor responde correctamente.
- **Sin endpoint**, el sitio **no** finge el envío: prepara el mensaje y ofrece copiarlo y mandarlo por Instagram (y por correo/WhatsApp cuando estén configurados).
- Incluye validación accesible, preguntas condicionales, campo trampa anti-spam y guardado temporal del borrador en la pestaña.

Ejemplo con Formspree: cree un formulario, copie su URL `https://formspree.io/f/xxxx` en `PUBLIC_INQUIRY_ENDPOINT` y vuelva a publicar.

## Estructura

```
photos/                    Fototeca original (fuente de verdad)
  <proyecto>/hero.jpg      Imagen principal del proyecto
  <proyecto>/gNN.jpg       Galería, en orden
  <proyecto>/diptych-N-izq.jpg / -der.jpg   Pares que se muestran lado a lado
  _studio/                 Logo, retrato y foto del equipo
  _reveal/                 Antes/después y pósters de video
public/video/              Películas (reel y montaje), sin audio
scripts/build-media.mjs    Genera public/media/* y src/data/media.json
src/data/site.ts           Datos del negocio e integraciones
src/data/projects.ts       Proyectos del portafolio (textos ES/EN, portada, exclusiones)
src/copy/*.ts              Textos de cada página en ES y EN
src/content/journal/{es,en}/*.md   Artículos del Journal
src/i18n/routes.ts         URLs localizadas (/es/portafolio/ ↔ /en/portfolio/)
src/views/                 Plantillas de página (compartidas por ambos idiomas)
src/components/            Componentes reutilizables
src/styles/global.css      Sistema de diseño (paleta, tipografía, espaciado)
```

### Agregar o editar un proyecto

1. Cree `photos/<slug>/` con `hero.jpg`, `g00.jpg`, `g01.jpg`… (opcional: `diptych-0-izq.jpg` + `diptych-0-der.jpg`).
2. Agregue el proyecto en `src/data/projects.ts` (categoría, títulos y textos en ambos idiomas, portada).
3. `npm run build`. La galería se compone automáticamente con un ritmo editorial; use `exclude` para omitir fotografías.

### Publicar en el Journal

Cree un archivo por idioma en `src/content/journal/es/` y `src/content/journal/en/` con el mismo `translationKey`. Las fotos de la fototeca se insertan así:

```md
![Texto alternativo](media:boda-ta/g05 "Pie de foto opcional")
```

Dos imágenes en el mismo párrafo se muestran como par. Los artículos con `draft: true` se etiquetan como **Borrador editorial**, no se indexan y no aparecen en el sitemap; para ocultarlos por completo ponga `journal.showDrafts: false` en `src/data/site.ts`. Los cuatro artículos incluidos son **borradores de muestra** pendientes de revisión.

## Curaduría de la fototeca

- 17 proyectos: 6 bodas, 9 XV años (los dos ZIP de XV se unieron en una sola categoría) y 2 graduaciones.
- Las imágenes `Extra/Main` (520 px) son versiones reducidas de las portadas; no se usaron porque existen originales de mayor calidad en cada proyecto.
- Excluidas: `graduacion-pflc-2026/g08` (prácticamente negra). `xv-michelle/before|after` se usan en el comparador, no en la galería.
- Las fotos conservan su proporción original en galerías; los recortes de portada usan `object-fit` con encuadre controlado.
- La mayoría de las fotografías traen la marca de agua `@navarrete.events`. Si existen versiones sin marca, basta con reemplazar los archivos en `photos/` y volver a compilar.

## Privacidad, cookies y accesibilidad

- Sin analítica, sin cookies de rastreo y sin servicios de terceros en el navegador (las tipografías se sirven desde el propio sitio). Por eso no hay banner de cookies; el aviso de privacidad explica el único almacenamiento local (idioma y borrador del formulario). Si se agrega analítica, habrá que añadir consentimiento.
- Referencia WCAG 2.2 AA: HTML semántico, foco visible, navegación por teclado, textos alternativos, control para pausar la secuencia de portada, `prefers-reduced-motion`, objetivos táctiles de 44 px.
