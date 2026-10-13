/**
 * Portfolio projects
 * ------------------
 * Each project maps to a folder in /photos/<slug>. Editorial copy describes only
 * what is visible in the photographs; facts that have not been confirmed
 * (venue, city, date, client names) are left `null` and stay hidden on the site.
 *
 * Image ids are `<slug>/<filename-without-extension>` (see src/data/media.json).
 * Galleries are built automatically from every photo in the folder, in filename
 * order, minus `exclude`. Files named diptych-N-izq / diptych-N-der are shown as
 * side-by-side pairs.
 */
import type { Lang } from '../i18n/routes';

export type Category = 'weddings' | 'xv' | 'private';
type L = Record<Lang, string>;

export interface Project {
  slug: string;
  category: Category;
  /** Name as it appears in the photo library (initials or first name). `null` when unknown. */
  name: string | null;
  /** Editorial headline for the project. */
  title: L;
  /** One-line description for cards and metadata. */
  dek: L;
  /** Longer editorial introduction for the project page. */
  intro: L;
  /** Design notes visible in the photography. */
  elements: Record<Lang, string[]>;
  /** Image used on index cards (portrait crop). */
  cover: string;
  /** Opening image of the project page. */
  hero: string;
  /** Verified venue / location. Leave null until confirmed by the studio. */
  location: L | null;
  year: string | null;
  exclude?: string[];
  /** Optional transformation pair shown as a before/after comparison. */
  reveal?: { before: string; after: string; caption: L };
  /** Short description of the setting, used to compose alternative text. */
  altContext: L;
}

export const projects: Project[] = [
  {
    slug: 'boda-ta',
    category: 'weddings',
    name: 'T & A',
    title: { es: 'Luz de vela bajo la carpa', en: 'Candlelight beneath the canopy' },
    dek: {
      es: 'Una carpa drapeada, un candil de cristal y mesas imperiales encendidas a la luz de las velas.',
      en: 'A draped canopy, a crystal chandelier and long imperial tables lit only by candlelight.',
    },
    intro: {
      es: 'Una celebración construida a partir de la luz. El techo drapeado envuelve el salón como una carpa; bajo él, mesas imperiales se extienden entre candelabros, tulipanes blancos y cristalería fina. Un solo candil de cristal marca el centro de la composición, y la iluminación escénica dibuja haces de luz entre la bruma, para que cada fotografía parezca tomada en otra época.',
      en: 'A celebration built from light. Draped fabric wraps the room like a canopy; beneath it, imperial tables run between candelabra, white tulips and fine crystal. A single chandelier anchors the composition, while stage lighting draws beams through the haze, so every photograph feels as if it belongs to another era.',
    },
    elements: {
      es: ['Techo drapeado tipo carpa', 'Candil de cristal', 'Mesas imperiales', 'Tulipanes blancos', 'Luz de vela'],
      en: ['Draped canopy ceiling', 'Crystal chandelier', 'Imperial tables', 'White tulips', 'Candlelight'],
    },
    cover: 'boda-ta/hero',
    hero: 'boda-ta/hero',
    location: null,
    year: null,
    altContext: { es: 'Boda T & A: salón drapeado, mesas imperiales y luz de vela', en: 'T & A wedding: draped room, imperial tables and candlelight' },
  },
  {
    slug: 'boda-dm',
    category: 'weddings',
    name: 'D & M',
    title: { es: 'Terciopelo, arcos y oro viejo', en: 'Velvet, arches and old gold' },
    dek: {
      es: 'Terciopelo carmesí, arquitectura de arcos y mesas largas con velas rojas.',
      en: 'Crimson velvet, arched architecture and long tables set with red tapers.',
    },
    intro: {
      es: 'Un diseño que dialoga con la arquitectura del lugar: arcos ornamentados, muros dorados y un techo de terciopelo carmesí que cae en pliegues profundos. Las mesas largas reúnen flores en tonos otoñales, velas rojas, platos dorados y menús impresos con la ilustración del recinto. Una paleta cálida, casi cinematográfica, pensada para la noche.',
      en: 'A design in conversation with the architecture of the venue: ornate arches, golden walls and a crimson velvet ceiling falling in deep folds. Long tables gather autumnal florals, red tapers, gilded chargers and menus printed with an illustration of the building. A warm, almost cinematic palette, composed for the night.',
    },
    elements: {
      es: ['Techo de terciopelo carmesí', 'Arcos ornamentados', 'Velas rojas', 'Menús ilustrados', 'Mesa de quesos y pan'],
      en: ['Crimson velvet ceiling', 'Ornate arches', 'Red tapers', 'Illustrated menus', 'Grazing table'],
    },
    cover: 'boda-dm/g11',
    hero: 'boda-dm/g11',
    location: null,
    year: null,
    altContext: { es: 'Boda D & M: terciopelo carmesí, arcos y mesas a la luz de las velas', en: 'D & M wedding: crimson velvet, arches and candlelit tables' },
  },
  {
    slug: 'boda-ek',
    category: 'weddings',
    name: 'E & K',
    title: { es: 'Un estudio en blanco y negro', en: 'A study in black and white' },
    dek: {
      es: 'Cubos espejados, marcos de luz y columnas vegetales sobre un fondo negro.',
      en: 'Mirrored cubes, frames of light and living columns against a black ground.',
    },
    intro: {
      es: 'Una propuesta de contraste absoluto. Sobre un salón completamente negro, un plafón de cubos espejados multiplica la luz, mientras marcos iluminados y columnas de varillas cubiertas de follaje y flores blancas construyen una arquitectura propia. En las mesas, rosas, hortensias y cristal tallado mantienen la misma disciplina cromática: blanco, verde y luz.',
      en: 'A proposal of absolute contrast. In an entirely black room, a ceiling of mirrored cubes multiplies the light, while illuminated frames and slender columns wrapped in foliage and white flowers create an architecture of their own. On the tables, roses, hydrangeas and cut crystal keep the same discipline: white, green and light.',
    },
    elements: {
      es: ['Plafón de cubos espejados', 'Marcos iluminados', 'Columnas florales', 'Rosas y hortensias blancas', 'Cristal tallado'],
      en: ['Mirrored-cube ceiling', 'Illuminated frames', 'Floral columns', 'White roses and hydrangeas', 'Cut crystal'],
    },
    cover: 'boda-ek/hero',
    hero: 'boda-ek/hero',
    location: null,
    year: null,
    altContext: { es: 'Boda E & K: salón negro, cubos espejados y flores blancas', en: 'E & K wedding: black room, mirrored cubes and white flowers' },
  },
  {
    slug: 'boda-jc',
    category: 'weddings',
    name: 'J & C',
    title: { es: 'Orquídeas bajo un cielo de estrellas', en: 'Orchids beneath a sky of stars' },
    dek: {
      es: 'Cascadas de orquídeas blancas, un cielo estrellado y una luna como escenario.',
      en: 'Cascades of white orchids, a starlit ceiling and a moon as the stage.',
    },
    intro: {
      es: 'Una noche monocromática y escultórica. Un plafón de pequeñas luces evoca un cielo estrellado; debajo, una instalación de orquídeas blancas se eleva como un trazo caligráfico entre candelabros de cristal. Alcatraces, tulipanes y velas altas visten las mesas, y una luna monumental preside la pista, entre bruma y haces de luz.',
      en: 'A monochrome, sculptural night. A ceiling of tiny lights evokes a starlit sky; beneath it, an installation of white orchids rises like a calligraphic stroke between crystal candelabra. Calla lilies, tulips and tall tapers dress the tables, and a monumental moon presides over the dance floor through haze and beams of light.',
    },
    elements: {
      es: ['Instalación de orquídeas', 'Cielo estrellado', 'Luna escénica', 'Alcatraces y tulipanes', 'Candelabros de cristal'],
      en: ['Orchid installation', 'Starlit ceiling', 'Stage moon', 'Calla lilies and tulips', 'Crystal candelabra'],
    },
    cover: 'boda-jc/g15',
    hero: 'boda-jc/g15',
    location: null,
    year: null,
    altContext: { es: 'Boda J & C: orquídeas blancas, velas y cielo estrellado', en: 'J & C wedding: white orchids, candles and a starlit ceiling' },
  },
  {
    slug: 'boda-sf',
    category: 'weddings',
    name: 'S & F',
    title: { es: 'Arquitectura a la hora dorada', en: 'Architecture at golden hour' },
    dek: {
      es: 'Una pérgola abierta, arcos negros y un piso geométrico del atardecer a la noche.',
      en: 'An open pergola, black arches and a geometric floor, from sunset into night.',
    },
    intro: {
      es: 'Un diseño que entiende la luz natural como parte del programa. Bajo una pérgola de vigas negras, arcos monumentales enmarcan el paisaje y un piso de patrón geométrico ordena el espacio. Mesas en negro y lino arena, follaje abundante y portavelas de cristal acompañan la celebración desde la hora dorada hasta que los arcos se encienden con líneas de luz.',
      en: 'A design that treats natural light as part of the brief. Beneath a pergola of black beams, monumental arches frame the landscape and a geometric floor brings order to the space. Black and sand-linen tables, generous greenery and glass candle holders carry the celebration from golden hour until the arches are traced in lines of light.',
    },
    elements: {
      es: ['Pérgola de vigas negras', 'Arcos monumentales', 'Piso geométrico', 'Portavelas de cristal', 'Follaje verde'],
      en: ['Black-beamed pergola', 'Monumental arches', 'Geometric floor', 'Glass candle holders', 'Green foliage'],
    },
    cover: 'boda-sf/hero',
    hero: 'boda-sf/hero',
    location: null,
    year: null,
    altContext: { es: 'Boda S & F: pérgola, arcos negros y piso geométrico', en: 'S & F wedding: pergola, black arches and geometric floor' },
  },
  {
    slug: 'boda-xx',
    category: 'weddings',
    name: null,
    title: { es: 'Rosas al anochecer', en: 'Roses after dark' },
    dek: {
      es: 'Muros de rosas rojas y coral, una esfera vegetal suspendida y guirnaldas de luz.',
      en: 'Walls of red and coral roses, a suspended sphere of greenery and garlands of light.',
    },
    intro: {
      es: 'Una celebración íntima y romántica, de color profundo. Muros de rosas rojas, coral y durazno rodean la mesa principal; sobre la pista, una gran esfera de follaje suspendida irradia guirnaldas de luz cálida. Velas de distintas alturas, cristalería labrada y bruma baja para el primer baile completan una atmósfera que se vive de cerca.',
      en: 'An intimate, romantic celebration in deep colour. Walls of red, coral and peach roses surround the head table; above the dance floor, a great suspended sphere of greenery radiates garlands of warm light. Candles at varying heights, etched glassware and low haze for the first dance complete an atmosphere meant to be felt up close.',
    },
    elements: {
      es: ['Muros de rosas', 'Esfera vegetal suspendida', 'Guirnaldas de luz', 'Velas a distintas alturas', 'Bruma para el primer baile'],
      en: ['Rose walls', 'Suspended greenery sphere', 'Garlands of light', 'Candles at varying heights', 'Haze for the first dance'],
    },
    cover: 'boda-xx/hero',
    hero: 'boda-xx/hero',
    location: null,
    year: null,
    altContext: { es: 'Boda: muros de rosas rojas y guirnaldas de luz', en: 'Wedding: walls of red roses and garlands of light' },
  },
  {
    slug: 'xv-montse',
    category: 'xv',
    name: 'Montse',
    title: { es: 'Cristal, fachada y lluvia de luz', en: 'Crystal, façade and falling light' },
    dek: {
      es: 'Una fachada de inspiración europea, candiles monumentales y un cielo de cristales.',
      en: 'A European-inspired façade, monumental chandeliers and a ceiling of falling crystals.',
    },
    intro: {
      es: 'Unos XV años concebidos como una noche de gala. Una fachada de inspiración europea recibe a los invitados; adentro, candiles monumentales cuelgan de un cielo de cristales que caen como lluvia de luz. Centros de flores blancas, velas y mantelería en tonos marfil equilibran la escala escenográfica con detalles para ver de cerca.',
      en: 'A quinceañera conceived as a gala evening. A European-inspired façade welcomes the guests; inside, monumental chandeliers hang from a ceiling of crystals falling like rain. White florals, candles and ivory linens balance the theatrical scale with details meant to be seen up close.',
    },
    elements: {
      es: ['Fachada escenográfica', 'Candiles monumentales', 'Cortina de cristales', 'Flores blancas', 'Iluminación escénica'],
      en: ['Scenic façade', 'Monumental chandeliers', 'Crystal rain ceiling', 'White florals', 'Stage lighting'],
    },
    cover: 'xv-montse/g07',
    hero: 'xv-montse/g07',
    location: null,
    year: null,
    altContext: { es: 'XV años de Montse: candiles de cristal y flores blancas', en: 'Montse’s quinceañera: crystal chandeliers and white flowers' },
  },
  {
    slug: 'xv-ase',
    category: 'xv',
    name: 'ASE',
    title: { es: 'Rubor, mármol y oro', en: 'Blush, marble and gold' },
    dek: {
      es: 'Rosas en tonos rubor, superficies de mármol rosado, monograma dorado y cristal.',
      en: 'Blush roses, pink marble surfaces, a gilded monogram and crystal.',
    },
    intro: {
      es: 'Una paleta suave llevada con precisión. Arcos florales en rosa y durazno enmarcan un escenario de mármol rosado con monograma dorado; en el salón, un plafón floral flota sobre mesas vestidas con camino de rosas, platos de borde dorado, cristal tallado y torres de flores sobre bases de cristal. Delicado, pero nunca dulce en exceso.',
      en: 'A soft palette handled with precision. Floral arches in blush and peach frame a pink-marble stage with a gilded monogram; across the room, a floating floral ceiling hovers over tables dressed with rose runners, gold-rimmed plates, cut crystal and tall arrangements on glass stems. Delicate, but never too sweet.',
    },
    elements: {
      es: ['Arcos florales', 'Mármol rosado', 'Monograma dorado', 'Plafón floral', 'Torres de rosas'],
      en: ['Floral arches', 'Pink marble', 'Gilded monogram', 'Floating floral ceiling', 'Rose towers'],
    },
    cover: 'xv-ase/hero',
    hero: 'xv-ase/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años: rosas rubor, mármol rosado y detalles dorados', en: 'Quinceañera: blush roses, pink marble and gold details' },
  },
  {
    slug: 'xv-camila',
    category: 'xv',
    name: 'Camila',
    title: { es: 'Túneles de flores', en: 'Tunnels of flowers' },
    dek: {
      es: 'Túneles y arcos florales, mesas de cristal y una paleta de rosas, oro y violeta.',
      en: 'Floral tunnels and arches, glass tables and a palette of rose, gold and violet.',
    },
    intro: {
      es: 'Una celebración inmersiva en la que las flores se convierten en arquitectura. Túneles completamente cubiertos de rosas conducen a la pista; arcos concéntricos enmarcan el escenario y una ola de nube floral suspendida cruza el salón. En las mesas, cristal, oro, candelabros y arreglos en rosa pálido equilibran la intensidad del color.',
      en: 'An immersive celebration in which flowers become architecture. Tunnels covered entirely in roses lead to the dance floor; concentric arches frame the stage and a suspended wave of blossoms crosses the room. On the tables, crystal, gold, candelabra and pale-pink arrangements temper the intensity of the colour.',
    },
    elements: {
      es: ['Túneles florales', 'Arcos concéntricos', 'Instalación suspendida', 'Mesas de cristal', 'Pastel escultórico'],
      en: ['Floral tunnels', 'Concentric arches', 'Suspended installation', 'Glass tables', 'Sculptural cake'],
    },
    cover: 'xv-camila/hero',
    hero: 'xv-camila/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años de Camila: túneles y arcos de rosas', en: 'Camila’s quinceañera: tunnels and arches of roses' },
  },
  {
    slug: 'xv-allisson',
    category: 'xv',
    name: 'Allisson',
    title: { es: 'Una ciudad para una noche', en: 'A city for one night' },
    dek: {
      es: 'Una ceremonia de jardín al atardecer y una noche con fachadas, metro y Broadway en neón.',
      en: 'A garden ceremony at dusk, then a night of façades, subway signs and Broadway in neon.',
    },
    intro: {
      es: 'Dos capítulos para una misma celebración. Primero, un jardín abierto con un pasillo de flores rosadas que serpentea sobre el césped. Después, un salón transformado en ciudad: fachadas iluminadas en neón, una entrada de metro, una marquesina de Broadway, una galería de espejos y cabinas de fotografía. Un ejercicio de escenografía a escala completa, desde el montaje en blanco hasta el último detalle de mesa.',
      en: 'Two chapters for one celebration. First, an open garden with an aisle of pink flowers winding across the lawn. Then a room transformed into a city: neon-lit façades, a subway entrance, a Broadway marquee, a hall of mirrors and photo booths. Full-scale set design, from the empty floor to the last detail on the table.',
    },
    elements: {
      es: ['Pasillo floral en jardín', 'Fachadas en neón', 'Entrada de metro', 'Galería de espejos', 'Mesas con flores rosas y rojas'],
      en: ['Garden floral aisle', 'Neon façades', 'Subway entrance', 'Hall of mirrors', 'Pink and red floral tables'],
    },
    cover: 'xv-allisson/hero',
    hero: 'xv-allisson/hero',
    location: null,
    year: null,
    reveal: {
      before: '_reveal/allisson-before',
      after: '_reveal/allisson-after',
      caption: { es: 'Del montaje al resultado: el salón vacío y la ciudad terminada.', en: 'From build to reveal: the empty room and the finished city.' },
    },
    altContext: { es: 'XV años de Allisson: escenografía urbana en neón y flores', en: 'Allisson’s quinceañera: neon city set and flowers' },
  },
  {
    slug: 'xv-michelle',
    category: 'xv',
    name: 'Michelle',
    title: { es: 'Hacienda en terracota', en: 'A terracotta hacienda' },
    dek: {
      es: 'Muros de terracota, arcos con follaje, vasijas de barro y luz cálida.',
      en: 'Terracotta walls, arches dressed in greenery, clay vessels and warm light.',
    },
    intro: {
      es: 'Un espacio abierto y contemporáneo convertido en una hacienda. Muros en terracota, arcos cubiertos de follaje, vasijas de barro, palmas y luz cálida de apliques construyen un ambiente que parece haber existido siempre. Las mesas de madera reúnen flores en tonos durazno, velas rosadas y cristalería verde.',
      en: 'An open, contemporary space transformed into a hacienda. Terracotta walls, arches dressed in greenery, clay vessels, palms and the warm light of sconces build an atmosphere that feels as if it had always been there. Wooden tables gather peach-toned flowers, pink candles and green glassware.',
    },
    elements: {
      es: ['Muros de terracota', 'Arcos con follaje', 'Vasijas de barro', 'Mesas de madera', 'Cristalería verde'],
      en: ['Terracotta walls', 'Greenery-dressed arches', 'Clay vessels', 'Wooden tables', 'Green glassware'],
    },
    cover: 'xv-michelle/hero',
    hero: 'xv-michelle/hero',
    location: null,
    year: null,
    exclude: ['xv-michelle/before', 'xv-michelle/after'],
    reveal: {
      before: 'xv-michelle/before',
      after: 'xv-michelle/after',
      caption: { es: 'El lienzo en blanco y el resultado final.', en: 'The blank canvas and the finished result.' },
    },
    altContext: { es: 'XV años de Michelle: hacienda de terracota con flores y velas', en: 'Michelle’s quinceañera: terracotta hacienda with flowers and candles' },
  },
  {
    slug: 'xv-camila-2',
    category: 'xv',
    name: 'Camila',
    title: { es: 'Un jardín de celosías', en: 'A lattice garden' },
    dek: {
      es: 'Pabellones de celosía verde salvia, rosas de jardín y cortinas color durazno.',
      en: 'Sage-green lattice pavilions, garden roses and peach drapery.',
    },
    intro: {
      es: 'Un jardín interior construido con celosías. Pabellones verde salvia cubiertos de rosas, hortensias y follaje dividen el salón en espacios íntimos; las mesas de cristal y madera clara se visten con arreglos bajos en rosa y durazno, y cortinas cruzadas en tono durazno suavizan la luz.',
      en: 'An indoor garden built from latticework. Sage-green pavilions covered in roses, hydrangeas and greenery divide the room into intimate spaces; glass and pale-wood tables are dressed with low arrangements in pink and peach, and crossed drapery in a soft peach tone diffuses the light.',
    },
    elements: {
      es: ['Pabellones de celosía', 'Rosas y hortensias', 'Mesas de cristal', 'Cortinas cruzadas', 'Césped interior'],
      en: ['Lattice pavilions', 'Roses and hydrangeas', 'Glass tables', 'Crossed drapery', 'Indoor lawn'],
    },
    cover: 'xv-camila-2/hero',
    hero: 'xv-camila-2/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años de Camila: pabellones de celosía verde y rosas', en: 'Camila’s quinceañera: green lattice pavilions and roses' },
  },
  {
    slug: 'xv-nataly',
    category: 'xv',
    name: 'Nathaly',
    title: { es: 'Nathaly’s Coffee Shop', en: 'Nathaly’s Coffee Shop' },
    dek: {
      es: 'Una cafetería de cuento como escenografía, rosas y candiles de cristal.',
      en: 'A storybook coffee shop as a set, roses and crystal chandeliers.',
    },
    intro: {
      es: 'Unos XV años con una idea muy clara: una cafetería propia, con fachada, vitrinas y letrero dorado. Alrededor, un salón en rosa y marfil con plafón floral, candiles de cristal, columnas envueltas en flores y mesas de cristal con rosas, lisianthus y velas. Un concepto personal resuelto con elegancia.',
      en: 'A quinceañera with a very clear idea: a coffee shop of her own, complete with façade, shelves and a gilded sign. Around it, a room in pink and ivory with a floral ceiling, crystal chandeliers, columns wrapped in flowers and glass tables set with roses, lisianthus and candles. A personal concept, resolved with elegance.',
    },
    elements: {
      es: ['Fachada de cafetería', 'Letrero dorado', 'Plafón floral', 'Candiles de cristal', 'Columnas florales'],
      en: ['Coffee-shop façade', 'Gilded sign', 'Floral ceiling', 'Crystal chandeliers', 'Floral columns'],
    },
    cover: 'xv-nataly/hero',
    hero: 'xv-nataly/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años de Nathaly: cafetería escenográfica y rosas', en: 'Nathaly’s quinceañera: coffee-shop set and roses' },
  },
  {
    slug: 'xv-cielo',
    category: 'xv',
    name: 'Cielo',
    title: { es: 'Una boutique en rosa', en: 'A boutique in pink' },
    dek: {
      es: 'Un vestidor iluminado en neón, techos drapeados y flores de cerezo.',
      en: 'A neon-lit dressing room, draped ceilings and cherry blossoms.',
    },
    intro: {
      es: 'Un concepto de boutique llevado a toda la celebración. Un vestidor con iluminación de neón y la inicial de la quinceañera recibe a los invitados; en el salón, techos drapeados, ramas de cerezo, mesas redondas en blanco y una pista con monograma proyectado mantienen la paleta en un rosa envolvente y luminoso.',
      en: 'A boutique concept carried through the whole celebration. A neon-lit dressing room bearing her initial welcomes the guests; in the room, draped ceilings, cherry-blossom branches, white round tables and a dance floor with a projected monogram keep the palette in an enveloping, luminous pink.',
    },
    elements: {
      es: ['Vestidor en neón', 'Techos drapeados', 'Flores de cerezo', 'Monograma proyectado', 'Mesas blancas'],
      en: ['Neon dressing room', 'Draped ceilings', 'Cherry blossoms', 'Projected monogram', 'White tables'],
    },
    cover: 'xv-cielo/g00',
    hero: 'xv-cielo/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años de Cielo: salón rosa con techos drapeados y flores', en: 'Cielo’s quinceañera: pink room with draped ceilings and flowers' },
  },
  {
    slug: 'xv-gretel',
    category: 'xv',
    name: 'Gretel',
    title: { es: 'Pink Apex', en: 'Pink Apex' },
    dek: {
      es: 'Un concepto inspirado en las carreras, interpretado en rosa, neón y flores.',
      en: 'A motorsport-inspired concept, reinterpreted in pink, neon and flowers.',
    },
    intro: {
      es: 'Una pasión personal traducida a diseño. Curvas de pista iluminadas en neón, banderas a cuadros, un paddock con mercancía propia y un simulador conviven con flores, velas y mesas de banquete. El resultado es una celebración con identidad clara, donde cada rincón cuenta parte de la historia.',
      en: 'A personal passion translated into design. Neon-lit track curves, chequered flags, a paddock with custom merchandise and a racing simulator sit alongside flowers, candles and banquet tables. The result is a celebration with a clear identity, where every corner tells part of the story.',
    },
    elements: {
      es: ['Curvas en neón', 'Paddock personalizado', 'Simulador', 'Mesas de banquete', 'Paleta rosa'],
      en: ['Neon track curves', 'Custom paddock', 'Racing simulator', 'Banquet tables', 'Pink palette'],
    },
    cover: 'xv-gretel/hero',
    hero: 'xv-gretel/hero',
    location: null,
    year: null,
    altContext: { es: 'XV años de Gretel: concepto de carreras en rosa', en: 'Gretel’s quinceañera: racing concept in pink' },
  },
  {
    slug: 'graduacion-pflc-2024',
    category: 'private',
    name: 'PFLC 2024',
    title: { es: 'Una graduación a cielo abierto', en: 'A graduation under an open sky' },
    dek: {
      es: 'El patio de una escuela convertido en salón: mantelería negra, flores blancas y un cielo de luces.',
      en: 'A school courtyard turned ballroom: black linens, white flowers and a canopy of lights.',
    },
    intro: {
      es: 'Un evento de gran escala resuelto con la misma atención que una boda. El patio de la Preparatoria Federal Lázaro Cárdenas se transformó a partir de un plano de distribución preciso: mesas en negro, flores blancas, el escudo de la generación en cada lugar y un techo de luces cálidas sobre la pista. La vista aérea confirma el orden del trazo.',
      en: 'A large-scale event delivered with the same attention as a wedding. The courtyard of the Preparatoria Federal Lázaro Cárdenas was transformed from a precise floor plan: black-dressed tables, white flowers, the class crest at every place and a canopy of warm lights over the dance floor. The aerial view confirms the order of the layout.',
    },
    elements: {
      es: ['Plano de distribución', 'Mantelería negra', 'Flores blancas', 'Escudo de generación', 'Techo de luces'],
      en: ['Floor plan', 'Black linens', 'White flowers', 'Class crest', 'Canopy of lights'],
    },
    cover: 'graduacion-pflc-2024/g00',
    hero: 'graduacion-pflc-2024/g00',
    location: { es: 'Preparatoria Federal Lázaro Cárdenas, Tijuana', en: 'Preparatoria Federal Lázaro Cárdenas, Tijuana' },
    year: '2024',
    reveal: {
      before: '_reveal/pflc-before',
      after: '_reveal/pflc-after',
      caption: { es: 'Del plano a la noche del evento.', en: 'From floor plan to the night itself.' },
    },
    altContext: { es: 'Graduación PFLC 2024: mesas negras, flores blancas y luces', en: 'PFLC 2024 graduation: black tables, white flowers and lights' },
  },
  {
    slug: 'graduacion-pflc-2026',
    category: 'private',
    name: 'PFLC 2023–2026',
    title: { es: 'Terciopelo verde y oro', en: 'Green velvet and gold' },
    dek: {
      es: 'Drapeados de terciopelo verde, sillas doradas y un escenario encendido en rojo.',
      en: 'Green velvet drapery, gilded chairs and a stage lit in red.',
    },
    intro: {
      es: 'Para la generación 2023–2026, el jardín de la escuela se vistió de terciopelo verde y oro. Mesas negras con sillas doradas, candelabros altos y follaje tropical dialogan con los árboles del lugar; al fondo, un escenario circular en rojo marca el momento de la celebración.',
      en: 'For the class of 2023–2026, the school gardens were dressed in green velvet and gold. Black tables with gilded chairs, tall candelabra and tropical foliage converse with the existing trees; at the far end, a circular stage lit in red marks the moment of celebration.',
    },
    elements: {
      es: ['Terciopelo verde', 'Sillas doradas', 'Candelabros altos', 'Follaje tropical', 'Escenario circular'],
      en: ['Green velvet', 'Gilded chairs', 'Tall candelabra', 'Tropical foliage', 'Circular stage'],
    },
    cover: 'graduacion-pflc-2026/g03',
    hero: 'graduacion-pflc-2026/g03',
    location: { es: 'Preparatoria Federal Lázaro Cárdenas, Tijuana', en: 'Preparatoria Federal Lázaro Cárdenas, Tijuana' },
    year: '2026',
    exclude: ['graduacion-pflc-2026/g08'],
    altContext: { es: 'Graduación PFLC 2023–2026: terciopelo verde, oro y mesas negras', en: 'PFLC 2023–2026 graduation: green velvet, gold and black tables' },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectLabel = (p: Project, lang: Lang) =>
  p.name ?? (lang === 'es' ? 'Proyecto privado' : 'Private project');
