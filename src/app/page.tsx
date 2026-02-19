import { Header } from "@/components/header";
import { FixedBackground } from "@/components/fixed-background";
import { FloatingParticles } from "@/components/floating-particles";
import { Hero } from "@/components/hero";
import { HeroContent } from "@/components/hero-content";
import { SobreEvento } from "@/components/sobre-evento";
import { Countdown } from "@/components/countdown";
import { Descubrimientos } from "@/components/descubrimientos";
import { OradoresPuzzle } from "@/components/oradores-puzzle";
import { Programa } from "@/components/programa";
import { Ubicacion } from "@/components/ubicacion";
import { Inscripcion } from "@/components/inscripcion";
import { RedesSociales } from "@/components/redes-sociales";
import { Footer } from "@/components/footer";
import ScrollSVGPath from "@/components/scroll-svg-path";

export default function Home() {
  return (
    <>
      {/* Layer 1: Fixed background (z-0) - always visible */}
      <FixedBackground />

      {/* Floating particles (z-10) */}
      <FloatingParticles />

      {/* Layer 2: Scrollable content (z-20) */}
      <div className="relative z-20 overflow-x-hidden">
        <Hero />

        {/* Verse + Countdown + CTA + Oradores juntos: transparent bg */}
        <HeroContent />

        {/* Sections with opaque backgrounds to cover the fixed bg */}
        <SobreEvento />
        <div className="flex justify-center bg-negro-fondo py-12 md:py-16">
          <Countdown />
        </div>
        {/* Wrapper: línea dorada scroll-driven que conecta tarjetas con oradores (mobile) */}
        <div className="relative">
          <ScrollSVGPath
            d="M 5500 200 C 4000 600, 1800 900, 2500 1600 S 5200 2000, 5800 2600 C 5400 3200, 2500 3400, 1500 4000 S 4800 4800, 5600 5200 C 5200 5800, 3500 6000, 3000 6500 S 5200 7200, 5500 7600 C 5600 7800, 5800 7900, 6000 8000"
            pathLength={30000}
            stroke="var(--color-dorado)"
            strokeWidth={350}
            viewBox="0 0 6000 8000"
            scrollRange={[0.12, 0.72]}
            className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-[60%] md:hidden"
            svgClassName="h-full w-full opacity-90"
            preserveAspectRatio="none"
          />
          <Descubrimientos />
          <OradoresPuzzle />
        </div>
        <Programa />
        <Ubicacion />
        <Inscripcion />
        <RedesSociales />
        <Footer />
      </div>

      {/* Header: hidden until scroll past hero */}
      <Header />

    </>
  );
}
