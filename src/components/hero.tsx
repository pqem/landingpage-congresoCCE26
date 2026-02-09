"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-screen items-center justify-center"
    >
      {/* Title composition PNG - centered to match "primera vista" design */}
      <div className="relative z-10 w-full max-w-3xl px-6 lg:px-8">
        <Image
          src="/images/titulo-congreso.png"
          alt="CONGRESO CCE ARG. 2026 - MARZO 20 AL 23 - EXPANSIÓN SOBRENATURAL"
          width={1200}
          height={900}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
}
