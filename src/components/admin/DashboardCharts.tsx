"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Stats } from "./types";

const GOLD = "#E7BB70";
const GOLD_DARK = "#C9A050";
const PIE_COLORS = [GOLD, "#444444"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#CCCCCC] text-xs">{label}</p>
        <p className="text-[#E7BB70] font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

interface DashboardChartsProps {
  stats: Stats;
}

export function DashboardCharts({ stats }: DashboardChartsProps) {
  const pieData = [
    { name: "Sí", value: stats.necesitan_alojamiento },
    { name: "No", value: stats.total_inscriptos - stats.necesitan_alojamiento },
  ];

  const diaData = stats.por_dia.map((d) => ({
    fecha: new Date(d.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "short" }),
    cantidad: d.cantidad,
  }));

  return (
    <>
      {/* Charts Row - Pie + Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Alojamiento */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-[#E7BB70] font-semibold mb-4">Alojamiento</h3>
          {stats.total_inscriptos === 0 ? (
            <p className="text-[#666666] text-center py-8">Sin datos aún</p>
          ) : (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 -mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E7BB70]"></div>
                  <span className="text-[#CCCCCC] text-xs">Sí ({pieData[0]?.value})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#444444]"></div>
                  <span className="text-[#CCCCCC] text-xs">No ({pieData[1]?.value})</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Area Chart - Inscripciones por día */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-[#E7BB70] font-semibold mb-4">Tendencia de inscripciones</h3>
          {diaData.length === 0 ? (
            <p className="text-[#666666] text-center py-8">Sin datos aún</p>
          ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={diaData}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="fecha" stroke="#666666" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#666666" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cantidad" stroke={GOLD} fillOpacity={1} fill="url(#goldGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Bar Charts - Ciudad + Iglesia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Por ciudad */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-[#E7BB70] font-semibold mb-4">Por ciudad</h3>
          {stats.por_ciudad.length === 0 ? (
            <p className="text-[#666666] text-center py-8">Sin datos aún</p>
          ) : (
            <div style={{ height: Math.max(200, stats.por_ciudad.length * 40) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.por_ciudad} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
                  <XAxis type="number" stroke="#666666" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="ciudad" stroke="#666666" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cantidad" fill={GOLD} radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Bar Chart - Por iglesia */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-[#E7BB70] font-semibold mb-4">Por iglesia</h3>
          {stats.por_iglesia.length === 0 ? (
            <p className="text-[#666666] text-center py-8">Sin datos aún</p>
          ) : (
            <div style={{ height: Math.max(200, stats.por_iglesia.length * 40) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.por_iglesia} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
                  <XAxis type="number" stroke="#666666" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="iglesia" stroke="#666666" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cantidad" fill={GOLD_DARK} radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
