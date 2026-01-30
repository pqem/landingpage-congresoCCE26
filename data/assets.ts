/**
 * Rutas y uso de imágenes y recursos del Congreso CCE ARG. 2026.
 * Todas las rutas son relativas a / (public/ en build).
 */

const BASE = "/images";

/** Logo CCE: versión blanco (fondos oscuros) y color/dorado. Usar .svg si existe, si no .png */
export const LOGO = {
  blanco: `${BASE}/logo/logo-cce-blanco.png`,
  blancoSvg: `${BASE}/logo/logo-cce-blanco.svg`,
  color: `${BASE}/logo/logo-cce-color.png`,
  colorSvg: `${BASE}/logo/logo-cce-color.svg`,
} as const;

/** Hero: formas doradas decorativas y composición de título (referencia). Usar .svg si existe */
export const HERO = {
  formasDoradas: `${BASE}/hero/formas-doradas.png`,
  formasDoradasSvg: `${BASE}/hero/formas-doradas.svg`,
  composicionTitulo: `${BASE}/hero/composicion-titulo.png`,
} as const;

/** Fotos de oradores: pares (con nombre en imagen) y versiones "only" (solo foto, borde dorado) */
export const ORADORES = {
  /** Foto conjunta de los 8 oradores en fila (banda dorada abajo) */
  juntos: `${BASE}/oradores/oradores-juntos.png`,
  /** Cuadro/composición con todas las fotos y nombres */
  cuadro: `${BASE}/oradores/oradores-cuadro.png`,
  /** Aps. Daniel y Patricia Cattaneo */
  cattaneo: `${BASE}/oradores/cattaneo-daniel-patricia.png`,
  cattaneoOnly: `${BASE}/oradores/cattaneo-only.png`,
  /** Prs. Ale y Maria Chamorro */
  chamorroAleMaria: `${BASE}/oradores/chamorro-ale-maria.png`,
  chamorroAleMariaOnly: `${BASE}/oradores/chamorro-ale-maria-only.png`,
  /** Aps. Daniel y Rosita Chamorro */
  chamorroDanielRosita: `${BASE}/oradores/chamorro-daniel-rosita.png`,
  chamorroDanielRositaOnly: `${BASE}/oradores/chamorro-daniel-rosita-only.png`,
  /** Prs. Sergio Belart y Alejandro Rodriguez */
  belartRodriguez: `${BASE}/oradores/belart-rodriguez.png`,
  belartSergio: `${BASE}/oradores/belart-sergio.png`,
  rodriguezAlejandro: `${BASE}/oradores/rodriguez-alejandro.png`,
} as const;

/** Map: clave de ponente(s) → imagen recomendada para la landing */
export const ORADORES_POR_PONENTE = [
  { keys: ["cattaneo"], image: ORADORES.cattaneo, imageOnly: ORADORES.cattaneoOnly },
  { keys: ["chamorro-ale-maria"], image: ORADORES.chamorroAleMaria, imageOnly: ORADORES.chamorroAleMariaOnly },
  { keys: ["chamorro-daniel-rosita"], image: ORADORES.chamorroDanielRosita, imageOnly: ORADORES.chamorroDanielRositaOnly },
  { keys: ["belart", "rodriguez"], image: ORADORES.belartRodriguez, imageOnly: null },
] as const;
