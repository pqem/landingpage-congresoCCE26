"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/**
 * FloatingInscripcionCTA
 * Botón flotante que aparece después de "Sobre el Evento" y se oculta
 * cuando el usuario llega a la sección de inscripción.
 *
 * Usa Intersection Observer para detectar scroll sin impactar performance.
 */
export function FloatingInscripcionCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const sobreEventoRef = useRef<HTMLDivElement>(null);
  const inscripcionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Observer para mostrar el botón (después de "Sobre el Evento")
    const sobreEventoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Cuando "Sobre el Evento" sale de la vista (user scrolleó hacia abajo)
          setIsVisible(!entry.isIntersecting || entry.boundingClientRect.top < 0);
        } else if (entry.boundingClientRect.top < 0) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );

    // Observer para ocultar el botón (cuando llega a inscripción)
    const inscripcionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    // Encontrar los elementos en el DOM
    const sobreEvento = document.querySelector("[data-sobre-evento]");
    const inscripcion = document.querySelector("#inscripcion");

    if (sobreEvento) sobreEventoObserver.observe(sobreEvento);
    if (inscripcion) inscripcionObserver.observe(inscripcion);

    return () => {
      if (sobreEvento) sobreEventoObserver.unobserve(sobreEvento);
      if (inscripcion) inscripcionObserver.unobserve(inscripcion);
    };
  }, []);

  if (isClosed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Botón flotante */}
        <Link
          href="/inscripcion"
          className="flex items-center justify-center w-14 h-14 bg-dorado hover:bg-dorado-claro text-negro-fondo font-bold text-xs rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
          title="Ir al formulario de inscripción"
        >
          <span className="text-center leading-tight px-1">Inscribite</span>
        </Link>

        {/* Botón cerrar */}
        <button
          onClick={() => setIsClosed(true)}
          className="flex items-center justify-center w-10 h-10 text-dorado hover:text-dorado-claro transition-colors"
          aria-label="Cerrar botón de inscripción"
          title="Cerrar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
