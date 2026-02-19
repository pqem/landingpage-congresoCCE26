"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Evento", href: "#evento" },
  { label: "Oradores", href: "#oradores" },
  { label: "Programa", href: "#programa" },
  { label: "Ubicación", href: "#ubicacion" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-40 transition-all duration-500 md:top-6 ${
        scrolled
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-negro-fondo/80 px-4 py-3 backdrop-blur-md md:justify-center lg:px-8">
        {/* Mobile hamburger - top left */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 font-mono text-sm font-medium tracking-wide text-[#CCCCCC] transition-colors hover:text-dorado"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
          <a
            href="#inscripcion"
            className="bg-dorado px-6 py-2.5 font-sans text-sm font-bold tracking-wider text-negro-fondo transition-all hover:bg-dorado-claro"
          >
            INSCRIBITE
          </a>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col items-center gap-6 bg-negro-fondo/90 px-4 py-8 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-base font-medium tracking-wide text-[#CCCCCC] transition-colors hover:text-dorado"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
          <a
            href="#inscripcion"
            onClick={() => setMobileOpen(false)}
            className="bg-dorado px-8 py-3 font-sans text-sm font-bold tracking-wider text-negro-fondo transition-all hover:bg-dorado-claro"
          >
            INSCRIBITE
          </a>
        </nav>
      )}
    </header>
  );
}
