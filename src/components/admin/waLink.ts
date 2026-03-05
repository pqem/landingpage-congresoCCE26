/**
 * Genera un link wa.me/ con mensaje pre-armado para confirmación de inscripción.
 * La secretaria solo toca el link y envía.
 */
export function waLink(telefono: string, nombre: string): string {
  const numero = telefono.replace(/[\s\-\+\(\)]/g, "");
  const mensaje = `Hola ${nombre}! Confirmamos tu inscripción al Congreso CCE Argentina 2026, 20-22 de Marzo en Plottier. ¡Te esperamos!`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
