"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Fragment } from "react";
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

interface Stats {
  total_inscriptos: number;
  necesitan_alojamiento: number;
  total_familiares: number;
  total_personas: number;
  por_ciudad: { ciudad: string; cantidad: number }[];
  por_iglesia: { iglesia: string; cantidad: number }[];
  por_dia: { fecha: string; cantidad: number }[];
}

interface Inscripto {
  id: number;
  nombre_apellido: string;
  edad: number;
  telefono: string;
  ciudad: string;
  iglesia: string;
  necesita_alojamiento: number;
  created_at: string;
  cantidad_familiares: number;
  familiares: { nombre_apellido: string; edad: number; parentesco: string }[];
}

interface PaginatedResponse {
  data: Inscripto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

const GOLD = "#E7BB70";
const GOLD_LIGHT = "#F0CC88";
const GOLD_DARK = "#C9A050";
const SURFACE = "#1a1a1a";
const BORDER = "#2a2a2a";
const PIE_COLORS = [GOLD, "#444444"];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#CCCCCC] text-xs">{label}</p>
        <p className="text-[#E7BB70] font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [inscriptos, setInscriptos] = useState<PaginatedResponse | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "inscriptos">("dashboard");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error cargando stats:", err);
    }
  }, []);

  const fetchInscriptos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/inscripciones?${params}`);
      const data = await res.json();
      setInscriptos(data);
    } catch (err) {
      console.error("Error cargando inscriptos:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchInscriptos()]);
    setLastUpdated(new Date());
    setRefreshing(false);
  }, [fetchStats, fetchInscriptos]);

  useEffect(() => {
    if (session) {
      refreshData();
    }
  }, [session, refreshData]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta inscripción?")) return;

    try {
      const res = await fetch(`/api/admin/inscripciones/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchInscriptos();
        fetchStats();
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/admin/export");
      const { data } = await res.json();

      const headers = ["ID", "Nombre", "Edad", "Teléfono", "Ciudad", "Iglesia", "Alojamiento", "Familiares", "Fecha"];
      const rows = data.map((i: Inscripto) => [
        i.id,
        i.nombre_apellido,
        i.edad,
        i.telefono,
        i.ciudad,
        i.iglesia,
        i.necesita_alojamiento ? "Sí" : "No",
        i.familiares?.map((f) => `${f.nombre_apellido} (${f.parentesco})`).join("; ") || "-",
        new Date(i.created_at).toLocaleDateString("es-AR"),
      ]);

      const csv = [headers.join(","), ...rows.map((r: (string | number)[]) => r.map((v) => `"${v}"`).join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inscriptos-congreso-cce-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } catch (err) {
      console.error("Error exportando:", err);
    }
  };

  // Data for pie chart
  const pieData = stats
    ? [
        { name: "Sí", value: stats.necesitan_alojamiento },
        { name: "No", value: stats.total_inscriptos - stats.necesitan_alojamiento },
      ]
    : [];

  // Format date for area chart
  const diaData = stats?.por_dia.map((d) => ({
    fecha: new Date(d.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "short" }),
    cantidad: d.cantidad,
  })) || [];

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo_cce_color_svg.svg" alt="CCE" style={{ height: '56px', width: 'auto' }} className="animate-pulse" />
          <p className="text-[#E7BB70]">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo_cce_color_svg.svg" alt="CCE" style={{ height: '48px', width: 'auto' }} />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold">Congreso CCE 2026</h1>
              <p className="text-[#E7BB70] text-xs">Expansión Sobrenatural</p>
            </div>
            {stats && (
              <span className="ml-2 bg-[#E7BB70]/15 text-[#E7BB70] text-xs font-semibold px-2.5 py-1 rounded-full">
                {stats.total_personas} personas
              </span>
            )}
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#999999] text-sm truncate max-w-[200px]">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-sm border border-[#2a2a2a] bg-transparent hover:bg-[#2a2a2a] text-[#CCCCCC] px-4 py-2 rounded-lg transition-colors"
            >
              Salir
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-[#CCCCCC] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-[#2a2a2a] space-y-3">
            <p className="text-[#999999] text-sm truncate">{session.user?.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full text-left text-sm text-[#CCCCCC] hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* TABS + REFRESH */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-[#E7BB70] text-black font-semibold"
                  : "bg-[#1a1a1a] text-[#CCCCCC] border border-[#2a2a2a] hover:bg-[#2a2a2a]"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("inscriptos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "inscriptos"
                  ? "bg-[#E7BB70] text-black font-semibold"
                  : "bg-[#1a1a1a] text-[#CCCCCC] border border-[#2a2a2a] hover:bg-[#2a2a2a]"
              }`}
            >
              Inscriptos
            </button>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-[#666666] text-xs">
                Actualizado: {lastUpdated.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="flex items-center gap-2 text-sm text-[#CCCCCC] border border-[#2a2a2a] hover:bg-[#2a2a2a] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={refreshing ? "animate-spin" : ""}
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              {refreshing ? "Actualizando..." : "Recargar"}
            </button>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-6">
            {/* Stat Cards - 1 col mobile, 2 col tablet, 4 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total inscriptos", value: stats.total_inscriptos, gold: false },
                { label: "Total personas", value: stats.total_personas, gold: false, sub: "inscriptos + familiares" },
                { label: "Familiares", value: stats.total_familiares, gold: false },
                { label: "Necesitan alojamiento", value: stats.necesitan_alojamiento, gold: true },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 transform transition-all duration-500 hover:border-[#E7BB70]/30"
                  style={{ animationDelay: `${idx * 100}ms`, animation: "fadeInUp 0.5s ease-out forwards", opacity: 0 }}
                >
                  <div className="h-0.5 bg-[#E7BB70] rounded-t-xl -mx-5 -mt-5 mb-4"></div>
                  <p className="text-[#999999] text-sm">{card.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${card.gold ? "text-[#E7BB70]" : "text-white"}`}>
                    {card.value}
                  </p>
                  {card.sub && <p className="text-[#666666] text-xs mt-1">{card.sub}</p>}
                </div>
              ))}
            </div>

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
          </div>
        )}

        {/* INSCRIPTOS TAB */}
        {activeTab === "inscriptos" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o teléfono..."
                className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#E7BB70] focus:border-[#E7BB70]"
              />
              <button
                onClick={handleExportCSV}
                className="bg-[#E7BB70] text-black font-semibold hover:bg-[#F0CC88] px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                Exportar CSV
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-6 w-6 text-[#E7BB70]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </div>
            ) : (
              <>
                {/* Desktop table - hidden on mobile */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2a2a2a]">
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Nombre</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Edad</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Teléfono</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Ciudad</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Iglesia</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Aloj.</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Fam.</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium">Fecha</th>
                        <th className="text-left py-3 px-4 text-[#999999] text-sm font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscriptos?.data.map((i) => (
                        <Fragment key={i.id}>
                          <tr
                            className="border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/50 cursor-pointer transition-colors"
                            onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                          >
                            <td className="py-3 px-4 font-medium">{i.nombre_apellido}</td>
                            <td className="py-3 px-4">{i.edad}</td>
                            <td className="py-3 px-4 text-[#CCCCCC]">{i.telefono}</td>
                            <td className="py-3 px-4 text-[#CCCCCC]">{i.ciudad}</td>
                            <td className="py-3 px-4 text-[#CCCCCC]">{i.iglesia}</td>
                            <td className="py-3 px-4">
                              {i.necesita_alojamiento ? (
                                <span className="text-[#E7BB70]">Sí</span>
                              ) : (
                                <span className="text-[#666666]">No</span>
                              )}
                            </td>
                            <td className="py-3 px-4">{i.cantidad_familiares || 0}</td>
                            <td className="py-3 px-4 text-[#999999] text-sm">
                              {new Date(i.created_at).toLocaleDateString("es-AR")}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(i.id);
                                }}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                          {expandedId === i.id && i.familiares && i.familiares.length > 0 && (
                            <tr>
                              <td colSpan={9} className="bg-[#0a0a0a] px-8 py-3">
                                <p className="text-[#999999] text-sm mb-2">Familiares:</p>
                                <div className="space-y-1">
                                  {i.familiares.map((f, idx) => (
                                    <p key={idx} className="text-sm text-[#CCCCCC]">
                                      {f.nombre_apellido} — {f.edad} años — {f.parentesco}
                                    </p>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards - visible only on mobile */}
                <div className="md:hidden space-y-3">
                  {inscriptos?.data.map((i) => (
                    <div
                      key={i.id}
                      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4"
                      onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{i.nombre_apellido}</h4>
                        <span className="text-[#999999] text-xs">
                          {new Date(i.created_at).toLocaleDateString("es-AR")}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                        <div>
                          <span className="text-[#666666]">Edad: </span>
                          <span className="text-[#CCCCCC]">{i.edad}</span>
                        </div>
                        <div>
                          <span className="text-[#666666]">Tel: </span>
                          <span className="text-[#CCCCCC]">{i.telefono}</span>
                        </div>
                        <div>
                          <span className="text-[#666666]">Ciudad: </span>
                          <span className="text-[#CCCCCC]">{i.ciudad}</span>
                        </div>
                        <div>
                          <span className="text-[#666666]">Iglesia: </span>
                          <span className="text-[#CCCCCC]">{i.iglesia}</span>
                        </div>
                        <div>
                          <span className="text-[#666666]">Aloj: </span>
                          {i.necesita_alojamiento ? (
                            <span className="text-[#E7BB70]">Sí</span>
                          ) : (
                            <span className="text-[#666666]">No</span>
                          )}
                        </div>
                        <div>
                          <span className="text-[#666666]">Familiares: </span>
                          <span className="text-[#CCCCCC]">{i.cantidad_familiares || 0}</span>
                        </div>
                      </div>

                      {/* Expanded familiares */}
                      {expandedId === i.id && i.familiares && i.familiares.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                          <p className="text-[#999999] text-xs mb-2">Familiares:</p>
                          {i.familiares.map((f, idx) => (
                            <p key={idx} className="text-xs text-[#CCCCCC] mb-1">
                              {f.nombre_apellido} — {f.edad} años — {f.parentesco}
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-end mt-3 pt-2 border-t border-[#2a2a2a]/50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(i.id);
                          }}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {inscriptos && inscriptos.pagination.total_pages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                    <p className="text-[#999999] text-sm">
                      Página {inscriptos.pagination.page} de{" "}
                      {inscriptos.pagination.total_pages} ({inscriptos.pagination.total} total)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg disabled:opacity-50 hover:bg-[#2a2a2a] transition-colors text-sm"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= inscriptos.pagination.total_pages}
                        className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg disabled:opacity-50 hover:bg-[#2a2a2a] transition-colors text-sm"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}

                {inscriptos?.data.length === 0 && (
                  <div className="text-center py-12 text-[#666666]">
                    {search ? "No se encontraron resultados" : "Aún no hay inscriptos"}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* CSS animation for cards */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
