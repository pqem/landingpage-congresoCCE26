"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Countdown } from "./countdown";

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative">
      {/* Verse + Countdown + CTA - transparent bg, fondo shows through */}
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 py-16 transition-all duration-1000 ease-out md:py-24 lg:px-12 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Bible verse - prominent with staggered entrance */}
        <div className="text-center">
          <p
            className={`font-mono text-xl font-light italic leading-relaxed text-white transition-all duration-1000 ease-out sm:text-2xl md:text-4xl md:leading-snug ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            &quot;No por el poder, ni por la fuerza,
            <br className="hidden sm:block" />
            sino por{" "}
            <span
              className={`font-serif font-bold not-italic text-dorado transition-all duration-1000 delay-700 ease-out ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } inline-block`}
            >
              mi Espíritu
            </span>
            &quot;
          </p>
          <div
            className={`mx-auto mt-4 h-px w-16 bg-dorado/40 transition-all duration-700 delay-1000 ease-out ${
              visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          />
          <p
            className={`mt-3 font-sans text-sm font-bold tracking-[0.3em] text-dorado transition-all duration-700 delay-[1200ms] ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            ZACARÍAS 4:6
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-10 flex justify-center">
          <Countdown />
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <a
            href="#inscripcion"
            className="animate-pulse-glow inline-block bg-dorado px-6 py-3 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro md:px-10 md:py-4 md:text-base"
          >
            INSCRIBITE AHORA
          </a>
        </div>
      </div>

      {/* Speakers group photo - transparent, no bg, fondo shows through */}
      <div className="relative mt-4 w-full">
        <div className="mx-auto max-w-6xl">
          <Image
            src="/images/oradores-juntos.png"
            alt="Oradores del Congreso CCE Argentina 2026"
            width={1600}
            height={400}
            className="h-auto w-full max-h-[180px] sm:max-h-[250px] md:max-h-none object-contain"
          />
        </div>
        <div className="h-[5px] w-full bg-dorado" />
      </div>
    </section>
  );
}
