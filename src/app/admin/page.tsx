"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import type { Stats, Inscripto, PaginatedResponse } from "@/components/admin/types";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCards } from "@/components/admin/StatCards";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { SearchBar } from "@/components/admin/SearchBar";
import { InscriptosTable } from "@/components/admin/InscriptosTable";
import { InscriptoCard } from "@/components/admin/InscriptoCard";
import { Pagination } from "@/components/admin/Pagination";

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
    if (status === "unauthenticated") router.push("/admin/login");
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
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
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
    if (session) refreshData();
  }, [session, refreshData]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta inscripción?")) return;
    try {
      const res = await fetch(`/api/admin/inscripciones/${id}`, { method: "DELETE" });
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
        i.id, i.nombre_apellido, i.edad, i.telefono, i.ciudad, i.iglesia,
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
      <AdminHeader session={session} stats={stats} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tabs + Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-3">
            {(["dashboard", "inscriptos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#E7BB70] text-black font-semibold"
                    : "bg-[#1a1a1a] text-[#CCCCCC] border border-[#2a2a2a] hover:bg-[#2a2a2a]"
                }`}
              >
                {tab === "dashboard" ? "Dashboard" : "Inscriptos"}
              </button>
            ))}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={refreshing ? "animate-spin" : ""}>
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              {refreshing ? "Actualizando..." : "Recargar"}
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-6">
            <StatCards stats={stats} />
            <DashboardCharts stats={stats} />
          </div>
        )}

        {/* Inscriptos Tab */}
        {activeTab === "inscriptos" && (
          <div>
            <SearchBar
              search={search}
              onSearchChange={(v) => { setSearch(v); setPage(1); }}
              onExportCSV={handleExportCSV}
            />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-6 w-6 text-[#E7BB70]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : (
              <>
                <InscriptosTable
                  inscriptos={inscriptos?.data ?? []}
                  expandedId={expandedId}
                  onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                  onDelete={handleDelete}
                />

                <div className="md:hidden space-y-3">
                  {inscriptos?.data.map((i) => (
                    <InscriptoCard
                      key={i.id}
                      inscripto={i}
                      expanded={expandedId === i.id}
                      onToggle={() => setExpandedId(expandedId === i.id ? null : i.id)}
                      onDelete={() => handleDelete(i.id)}
                    />
                  ))}
                </div>

                {inscriptos && (
                  <Pagination
                    page={inscriptos.pagination.page}
                    totalPages={inscriptos.pagination.total_pages}
                    total={inscriptos.pagination.total}
                    onPageChange={setPage}
                  />
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
    </div>
  );
}
