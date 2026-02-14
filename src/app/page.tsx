"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { FixedBackground } from "@/components/fixed-background";
import { FloatingParticles } from "@/components/floating-particles";
import { Hero } from "@/components/hero";
import { HeroContent } from "@/components/hero-content";
import { SobreEvento } from "@/components/sobre-evento";
import { Descubrimientos } from "@/components/descubrimientos";
import { OradoresPuzzle } from "@/components/oradores-puzzle";
import { Programa } from "@/components/programa";
import { Ubicacion } from "@/components/ubicacion";
import { Inscripcion } from "@/components/inscripcion";
import { RedesSociales } from "@/components/redes-sociales";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  const [curveVisible, setCurveVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCurveVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Layer 1: Fixed background (z-0) - always visible */}
      <FixedBackground />

      {/* Floating particles (z-10) */}
      <FloatingParticles />

      {/* Layer 2: Scrollable content (z-20) */}
      <div className="relative z-20 overflow-x-hidden">
        {/* Golden decorative curve - anchored to hero, proportional on all screens */}
        <div className="absolute -left-[60%] top-0 z-[5] h-[100svh] pointer-events-none sm:-left-[25%] md:-left-[10%]">
          <svg
            viewBox="0 0 18718 28729.7"
            className="h-[110%] w-auto opacity-90 sm:h-[130%] md:h-[156%]"
            preserveAspectRatio="xMinYMin meet"
            aria-hidden="true"
          >
            <path
              d="M3190.54 7829.2c5862.87,-2682.06 7942.95,-2561.9 8262.79,-2037.11 464.71,762.45 -3075.18,3341.58 -6537.99,7434.03 7626.8,-2329.01 11235.37,-4774.93 12305.66,-2218.89 1539.6,3676.86 -10353.84,9592.05 -15866.51,12241.84"
              fill="none"
              stroke="#E7BB70"
              strokeWidth="1270"
              strokeMiterlimit="22.9256"
              strokeLinecap="round"
              strokeDasharray="60000"
              strokeDashoffset={curveVisible ? "0" : "60000"}
              style={{
                transition: "stroke-dashoffset 0.75s ease-in-out",
              }}
            />
          </svg>
        </div>

        {/* Hero: just title PNG, transparent bg → fondo shows through */}
        <Hero />

        {/* Verse + Countdown + CTA + Oradores juntos: transparent bg */}
        <HeroContent />

        {/* Sections with opaque backgrounds to cover the fixed bg */}
        <SobreEvento />
        <Descubrimientos />
        <OradoresPuzzle />
        <Programa />
        <Ubicacion />
        <Inscripcion />
        <RedesSociales />
        <Footer />
      </div>

      {/* Header: hidden until scroll past hero */}
      <Header />

      <WhatsAppButton />
    </>
  );
}
