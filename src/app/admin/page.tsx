"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Fragment } from "react";

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

  useEffect(() => {
    if (session) {
      fetchStats();
      fetchInscriptos();
    }
  }, [session, fetchStats, fetchInscriptos]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta inscripción?")) return;

    try {
      const res = await fetch(`/api/admin/inscripciones/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchInscriptos();
        fetchStats();
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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Congreso CCE 2026</h1>
            <p className="text-gray-400 text-sm">Panel de administración</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("inscriptos")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "inscriptos"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Inscriptos
          </button>
        </div>

        {activeTab === "dashboard" && stats && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Total inscriptos</p>
                <p className="text-3xl font-bold mt-1">{stats.total_inscriptos}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Total personas</p>
                <p className="text-3xl font-bold mt-1">{stats.total_personas}</p>
                <p className="text-gray-500 text-xs mt-1">inscriptos + familiares</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Familiares</p>
                <p className="text-3xl font-bold mt-1">{stats.total_familiares}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Necesitan alojamiento</p>
                <p className="text-3xl font-bold mt-1 text-amber-400">{stats.necesitan_alojamiento}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="font-semibold mb-4">Por ciudad</h3>
                {stats.por_ciudad.length === 0 ? (
                  <p className="text-gray-500">Sin datos aún</p>
                ) : (
                  <div className="space-y-2">
                    {stats.por_ciudad.map((c) => (
                      <div key={c.ciudad} className="flex justify-between">
                        <span className="text-gray-300">{c.ciudad}</span>
                        <span className="font-medium">{c.cantidad}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="font-semibold mb-4">Por iglesia</h3>
                {stats.por_iglesia.length === 0 ? (
                  <p className="text-gray-500">Sin datos aún</p>
                ) : (
                  <div className="space-y-2">
                    {stats.por_iglesia.map((ig) => (
                      <div key={ig.iglesia} className="flex justify-between">
                        <span className="text-gray-300">{ig.iglesia}</span>
                        <span className="font-medium">{ig.cantidad}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mt-6">
              <h3 className="font-semibold mb-4">Inscripciones por día</h3>
              {stats.por_dia.length === 0 ? (
                <p className="text-gray-500">Sin datos aún</p>
              ) : (
                <div className="space-y-2">
                  {stats.por_dia.map((d) => (
                    <div key={d.fecha} className="flex justify-between">
                      <span className="text-gray-300">
                        {new Date(d.fecha).toLocaleDateString("es-AR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="font-medium">{d.cantidad}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "inscriptos" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o teléfono..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleExportCSV}
                className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Exportar CSV
              </button>
            </div>

            {loading ? (
              <p className="text-gray-400">Cargando...</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Nombre</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Edad</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Teléfono</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Ciudad</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Iglesia</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Aloj.</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Fam.</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Fecha</th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscriptos?.data.map((i) => (
                        <Fragment key={i.id}>
                          <tr
                            className="border-b border-gray-800/50 hover:bg-gray-900/50 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === i.id ? null : i.id)}
                          >
                            <td className="py-3 px-4 font-medium">{i.nombre_apellido}</td>
                            <td className="py-3 px-4">{i.edad}</td>
                            <td className="py-3 px-4 text-gray-300">{i.telefono}</td>
                            <td className="py-3 px-4 text-gray-300">{i.ciudad}</td>
                            <td className="py-3 px-4 text-gray-300">{i.iglesia}</td>
                            <td className="py-3 px-4">
                              {i.necesita_alojamiento ? (
                                <span className="text-amber-400">Sí</span>
                              ) : (
                                <span className="text-gray-500">No</span>
                              )}
                            </td>
                            <td className="py-3 px-4">{i.cantidad_familiares || 0}</td>
                            <td className="py-3 px-4 text-gray-400 text-sm">
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
                              <td colSpan={9} className="bg-gray-900/30 px-8 py-3">
                                <p className="text-gray-400 text-sm mb-2">Familiares:</p>
                                <div className="space-y-1">
                                  {i.familiares.map((f, idx) => (
                                    <p key={idx} className="text-sm text-gray-300">
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

                {inscriptos && inscriptos.pagination.total_pages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-gray-400 text-sm">
                      Mostrando página {inscriptos.pagination.page} de{" "}
                      {inscriptos.pagination.total_pages} ({inscriptos.pagination.total} total)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= inscriptos.pagination.total_pages}
                        className="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}

                {inscriptos?.data.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
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
