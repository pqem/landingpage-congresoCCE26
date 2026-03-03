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

function KPICard({ label, value, sub, gold = false, delay = 0 }: {
  label: string;
  value: number;
  sub?: string;
  gold?: boolean;
  delay?: number;
}) {
  const ref = useCountUp(value);
  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 animate-admin-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-0.5 bg-dorado rounded-t-xl -mx-5 -mt-5 mb-4" />
      <p className="text-[#999999] text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-1 tabular-nums ${gold ? "text-dorado" : "text-white"}`}>
        <span ref={ref}>0</span>
      </p>
      {sub && <p className="text-[#666666] text-xs mt-1">{sub}</p>}
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
      className="bg-[#1a1a1a] border border-dorado/30 rounded-xl p-5 animate-admin-fade-in"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard label="Total inscriptos" value={stats.total_inscriptos} delay={0} />
      <KPICard label="Total personas" value={stats.total_personas} sub="inscriptos + familiares" delay={100} />
      <KPICard label="Familiares" value={stats.total_familiares} delay={200} />
      <AlojamientoCard stats={stats} delay={300} />
    </div>
  );
}
