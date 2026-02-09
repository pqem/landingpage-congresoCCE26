"use client";

import { Header } from "@/components/header";
import { FixedBackground } from "@/components/fixed-background";
import { FloatingParticles } from "@/components/floating-particles";
import { Hero } from "@/components/hero";
import { HeroContent } from "@/components/hero-content";
import { SobreEvento } from "@/components/sobre-evento";
import { OradoresPuzzle } from "@/components/oradores-puzzle";
import { Programa } from "@/components/programa";
import { Ubicacion } from "@/components/ubicacion";
import { Inscripcion } from "@/components/inscripcion";
import { RedesSociales } from "@/components/redes-sociales";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <>
      {/* Layer 1: Fixed background (z-0) - always visible */}
      <FixedBackground />

      {/* Floating particles (z-10) */}
      <FloatingParticles />

      {/* Layer 2: Scrollable content (z-20) */}
      <div className="relative z-20">
        {/* Hero: just title PNG, transparent bg → fondo shows through */}
        <Hero />

        {/* Verse + Countdown + CTA + Oradores juntos: transparent bg */}
        <HeroContent />

        {/* Sections with opaque backgrounds to cover the fixed bg */}
        <SobreEvento />
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
