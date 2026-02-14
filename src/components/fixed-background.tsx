"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function FixedBackground() {
  const [textVisible, setTextVisible] = useState(true);
  // "Centro Cristiano Esperanza" fade cycle every ~30s
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => setTextVisible(true), 1500);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background gradient (replaces fondo.jpg — CSS is instant, 0 bytes) */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at 20% 100%, rgba(178,151,91,0.55) 0%, transparent 55%)",
            "radial-gradient(ellipse at 80% 100%, rgba(178,151,91,0.55) 0%, transparent 55%)",
            "linear-gradient(to bottom, #000000 45%, #3a3120 90%, #8b7340 100%)",
          ].join(", "),
        }}
      />

      {/* Logo CCE - top right, preserving original aspect ratio (724x820) */}
      <div className="absolute right-6 top-6 z-10 md:right-12 md:top-10">
        <Image
          src="/images/logo-cce-color.png"
          alt="CCE"
          width={724}
          height={820}
          className="h-12 w-auto md:h-16"
        />
      </div>

      {/* "Centro Cristiano Esperanza" - bottom left */}
      <div
        className={`absolute bottom-6 left-6 z-10 transition-opacity duration-1000 ease-in-out md:bottom-10 md:left-10 ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-sans text-[10px] font-extrabold uppercase leading-tight tracking-[0.2em] text-white md:text-xs">
          Centro
          <br />
          Cristiano
          <br />
          Esperanza
        </p>
      </div>

      {/* Golden line - bottom right (cursor blink animation) */}
      <div className="absolute bottom-8 right-8 z-10 md:bottom-10 md:right-12">
        <div className="animate-cursor-blink h-[2px] w-8 bg-dorado md:w-10" />
      </div>
    </div>
  );
}
