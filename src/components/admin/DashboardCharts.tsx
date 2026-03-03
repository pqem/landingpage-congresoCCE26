"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Stats } from "./types";
import type { Inscripto } from "./types";

const GOLD = "var(--color-dorado)";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#CCCCCC] text-xs">{label}</p>
        <p className="text-dorado font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

function CSSBar({ label, count, max, gold = false }: { label: string; count: number; max: number; gold?: boolean }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-28 truncate text-sm text-[#999999] shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: gold ? "var(--color-dorado)" : "var(--color-dorado-oscuro, #8a6a1f)" }}
        />
      </div>
      <span className="w-6 text-right text-sm font-mono text-[#CCCCCC] shrink-0">{count}</span>
    </div>
  );
}

function AlojamientoRing({ necesitan, total }: { necesitan: number; total: number }) {
  const pct = total > 0 ? necesitan / total : 0;
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const dash = pct * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#2a2a2a" strokeWidth="12" />
          <circle
            cx="70" cy="70" r={r}
            fill="none"
            stroke="var(--color-dorado)"
            strokeWidth="12"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-dorado">{Math.round(pct * 100)}%</p>
          <p className="text-[10px] text-[#666666] uppercase tracking-wider">del total</p>
        </div>
      </div>
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-dorado" />
          <span className="text-[#CCCCCC]">Sí ({necesitan})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="text-[#CCCCCC]">No ({total - necesitan})</span>
        </div>
      </div>
    </div>
  );
}

function RecentInscriptos({ inscriptos }: { inscriptos: Inscripto[] }) {
  if (inscriptos.length === 0) {
    return <p className="text-[#666666] text-center py-8 text-sm">Sin inscripciones aún</p>;
  }

  return (
    <div className="space-y-3">
      {inscriptos.map((i) => {
        const mins = Math.round((Date.now() - new Date(i.created_at).getTime()) / 60000);
        const timeAgo = mins < 60
          ? `hace ${mins} min`
          : mins < 1440
          ? `hace ${Math.round(mins / 60)}h`
          : `hace ${Math.round(mins / 1440)}d`;

        return (
          <div key={i.id} className="flex items-start justify-between gap-3 py-2 border-b border-[#2a2a2a] last:border-0">
            <div>
              <p className="text-sm font-medium text-white">{i.nombre_apellido}</p>
              <p className="text-xs text-[#666666]">{i.iglesia} · {i.ciudad}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-[#666666]">{timeAgo}</p>
              {i.necesita_alojamiento ? (
                <span className="text-[10px] text-dorado">alojamiento</span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface DashboardChartsProps {
  stats: Stats;
  recentInscriptos?: Inscripto[];
}

export function DashboardCharts({ stats, recentInscriptos = [] }: DashboardChartsProps) {
  const diaData = stats.por_dia.map((d) => ({
    fecha: new Date(d.fecha + "T00:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "short" }),
    cantidad: d.cantidad,
  }));

  const maxCiudad = Math.max(...stats.por_ciudad.map((d) => d.cantidad), 1);
  const maxIglesia = Math.max(...stats.por_iglesia.map((d) => d.cantidad), 1);

  return (
    <>
      {/* Fila 1: Alojamiento ring + Tendencia temporal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-dorado font-semibold mb-4">Alojamiento</h3>
          {stats.total_inscriptos === 0 ? (
            <p className="text-[#666666] text-center py-8 text-sm">Sin datos aún</p>
          ) : (
            <AlojamientoRing necesitan={stats.necesitan_alojamiento} total={stats.total_inscriptos} />
          )}
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-dorado font-semibold mb-4">Tendencia de inscripciones</h3>
          {diaData.length === 0 ? (
            <p className="text-[#666666] text-center py-8 text-sm">Sin datos aún</p>
          ) : (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={diaData}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOLD} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="fecha" stroke="#444" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#444" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cantidad" stroke={GOLD} fillOpacity={1} fill="url(#goldGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Fila 2: Por ciudad + Por localidad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-dorado font-semibold mb-4">Por ciudad</h3>
          {stats.por_ciudad.length === 0 ? (
            <p className="text-[#666666] text-center py-8 text-sm">Sin datos aún</p>
          ) : (
            <div className="space-y-0.5">
              {[...stats.por_ciudad].sort((a, b) => b.cantidad - a.cantidad).map((d) => (
                <CSSBar key={d.ciudad} label={d.ciudad} count={d.cantidad} max={maxCiudad} gold />
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-dorado font-semibold mb-4">Por localidad de iglesia</h3>
          {stats.por_iglesia.length === 0 ? (
            <p className="text-[#666666] text-center py-8 text-sm">Sin datos aún</p>
          ) : (
            <div className="space-y-0.5">
              {[...stats.por_iglesia].sort((a, b) => b.cantidad - a.cantidad).map((d) => (
                <CSSBar key={d.iglesia} label={d.iglesia} count={d.cantidad} max={maxIglesia} gold={false} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fila 3: Inscripciones recientes */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
        <h3 className="text-dorado font-semibold mb-4">Inscripciones recientes</h3>
        <RecentInscriptos inscriptos={recentInscriptos.slice(0, 5)} />
      </div>
    </>
  );
}
