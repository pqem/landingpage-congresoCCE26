"use client";

import { useEffect, useRef } from "react";
import type { Stats } from "./types";

function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) ref.current.textContent = Math.floor(eased * target).toString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [target, duration]);
  return ref;
}

function HeroCard({ value }: { value: number }) {
  const ref = useCountUp(value, 1500);
  return (
    <div className="bg-[#1a1a1a] border border-dorado/40 rounded-xl p-8 animate-admin-fade-in text-center">
      <p className="text-[#999999] text-sm uppercase tracking-widest mb-3">Total asistentes</p>
      <p className="text-7xl sm:text-8xl font-bold text-dorado tabular-nums leading-none">
        <span ref={ref}>0</span>
      </p>
      <p className="text-[#666666] text-xs mt-3">inscriptos + familiares</p>
    </div>
  );
}

function FamiliasCard({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useCountUp(value);
  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 animate-admin-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-0.5 bg-dorado rounded-t-xl -mx-5 -mt-5 mb-4" />
      <p className="text-[#999999] text-sm">Familias inscriptas</p>
      <p className="text-3xl font-bold text-white mt-1 tabular-nums">
        <span ref={ref}>0</span>
      </p>
      <p className="text-[#666666] text-xs mt-1">formularios completados</p>
    </div>
  );
}

function AlojamientoCard({ stats, delay = 0 }: { stats: Stats; delay?: number }) {
  const ref = useCountUp(stats.necesitan_alojamiento);
  const pct = stats.total_inscriptos > 0
    ? Math.round((stats.necesitan_alojamiento / stats.total_inscriptos) * 100)
    : 0;

  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 animate-admin-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-0.5 bg-dorado rounded-t-xl -mx-5 -mt-5 mb-4" />
      <p className="text-[#999999] text-sm">Necesitan alojamiento</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-3xl font-bold text-dorado tabular-nums">
          <span ref={ref}>0</span>
        </p>
        <p className="text-[#666666] text-sm mb-1">{pct}% del total</p>
      </div>
      <div className="mt-3 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className="h-full bg-dorado rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function StatCards({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-4">
      <HeroCard value={stats.total_personas} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FamiliasCard value={stats.total_inscriptos} delay={100} />
        <AlojamientoCard stats={stats} delay={200} />
      </div>
    </div>
  );
}
