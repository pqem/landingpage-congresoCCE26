/**
 * Datos extraídos del diseño gráfico del Congreso CCE ARG. 2026
 * Fuente: análisis de piezas gráficas (carteles, banners, paneles)
 */

export const CONGRESO = {
  nombre: "CONGRESO CCE ARG. 2026",
  tituloPrincipal: "CONGRESO",
  tituloSecundario: "CCE ARG.",
  año: "2026",
  fechas: "MARZO 20 AL 23",
  tema: "EXPANSIÓN SOBRENATURAL",
  temporada: "TEMPORADA DE EXPANSIÓN SOBRENATURAL",
  añosTemporada: "2026 - 2030",
} as const;

export const ORGANIZADOR = {
  nombre: "CENTRO CRISTIANO ESPERANZA",
} as const;

export const MENSAJE = {
  cita: "No por el poder ni por la fuerza sino por Mi Espíritu",
  referencia: "ZACARÍAS 4.6",
} as const;

export const CONTACTO = {
  web: "https://www.ccesperanza.org",
  webDisplay: "WWW.CCESPERANZA.ORG",
  hashtag: "#EXPANSIÓN SOBRENATURAL",
  redes: "@CCEPlottier",
  redesSociales: [
    { nombre: "Facebook", handle: "@CCEPlottier" },
    { nombre: "Instagram", handle: "@CCEPlottier" },
    { nombre: "YouTube", handle: "@CCEPlottier" },
    { nombre: "X (Twitter)", handle: "@CCEPlottier" },
    { nombre: "WhatsApp", handle: "@CCEPlottier" },
  ],
} as const;

export const PONENTES = [
  { titulo: "Aps.", nombre: "Daniel Cattaneo" },
  { titulo: "Aps.", nombre: "Patricia Cattaneo" },
  { titulo: "Prs.", nombre: "Ale Chamorro" },
  { titulo: "Prs.", nombre: "Maria Chamorro" },
  { titulo: "Aps.", nombre: "Daniel Chamorro" },
  { titulo: "Aps.", nombre: "Rosita Chamorro" },
  { titulo: "Prs.", nombre: "Sergio Belart" },
  { titulo: "Prs.", nombre: "Alejandro Rodriguez" },
] as const;

/** Paleta de colores (aproximada a partir del diseño) */
export const COLORES = {
  fondo: "#000000",
  fondoGradienteFin: "#332B1A",
  fondoGradienteFinAlt: "#332f2b",
  blanco: "#FFFFFF",
  dorado: "#D4AF37",
  doradoOscuro: "#B2975B",
  doradoClaro: "#EADDA6",
  doradoBronce: "#A0875C",
  doradoOcre: "#C19E5D",
} as const;

/**
 * Fuentes utilizadas en el diseño gráfico del congreso.
 * Uso en web: Montserrat (Google Fonts). Resto: archivos en public/fonts/ + @font-face en public/fonts/fonts.css.
 * Instancia privada/demo: se pueden usar las fuentes (incl. Trial) para mostrar el diseño; ONG/iglesia suele tener opciones de licencia para producción.
 */
export const FUENTES = {
  /** Título principal: "CONGRESO CCE ARG." */
  tituloPrincipal: "Druk XCond Super Trial",
  /** Año pegado al título: "2026" */
  año: "Mango Grotesque Thin",
  /** Subtítulos: "EXPANSIÓN SOBRENATURAL", fechas, lema, etc. */
  subtitulos: "Montserrat",
  /** Nombres de oradores en las fotos */
  oradores: "Gotham Pro",
} as const;

/** Referencias tipográficas (mapeo uso → fuente) */
export const TIPOGRAFIA = {
  titulo: FUENTES.tituloPrincipal,
  año: FUENTES.año,
  fechasYSubtitulo: FUENTES.subtitulos,
  oradores: FUENTES.oradores,
  /** Organizador / créditos: puede usar Montserrat o Gotham según el diseño */
  organizador: FUENTES.subtitulos,
} as const;
