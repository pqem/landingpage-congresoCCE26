"use client";

import { useState, useCallback } from "react";
import type { Inscripto } from "./types";

type Estado = "pendiente" | "confirmado" | "asignado";

const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  asignado: "Asignado",
};

const ESTADO_STYLES: Record<Estado, string> = {
  pendiente: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmado: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  asignado:   "bg-green-500/15 text-green-400 border-green-500/30",
};

const ESTADO_PRINT: Record<Estado, string> = {
  pendiente: "print-estado-pendiente",
  confirmado: "print-estado-confirmado",
  asignado:   "print-estado-asignado",
};

interface Props {
  inscriptos: Inscripto[];
  userRol: "editor" | "observador";
  onEstadoChange: (id: number, estado: Estado, nota: string) => Promise<void>;
}

function SummaryBar({ inscriptos }: { inscriptos: Inscripto[] }) {
  const totalFamilias = inscriptos.length;
  const totalPersonas = inscriptos.reduce((acc, i) => acc + 1 + (i.cantidad_familiares || 0), 0);
  const porEstado = {
    pendiente:  inscriptos.filter((i) => (i.alojamiento_estado ?? "pendiente") === "pendiente").length,
    confirmado: inscriptos.filter((i) => i.alojamiento_estado === "confirmado").length,
    asignado:   inscriptos.filter((i) => i.alojamiento_estado === "asignado").length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6 print:hidden">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-white">{totalFamilias}</p>
        <p className="text-[#666666] text-xs mt-1">Familias</p>
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-dorado">{totalPersonas}</p>
        <p className="text-[#666666] text-xs mt-1">Personas</p>
      </div>
      <div className="bg-[#1a1a1a] border border-yellow-500/20 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-yellow-400">{porEstado.pendiente}</p>
        <p className="text-[#666666] text-xs mt-1">Pendiente</p>
      </div>
      <div className="bg-[#1a1a1a] border border-blue-500/20 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-blue-400">{porEstado.confirmado}</p>
        <p className="text-[#666666] text-xs mt-1">Confirmado</p>
      </div>
      <div className="bg-[#1a1a1a] border border-green-500/20 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
        <p className="text-2xl font-bold text-green-400">{porEstado.asignado}</p>
        <p className="text-[#666666] text-xs mt-1">Asignado</p>
      </div>
    </div>
  );
}

function PrintHeader({ inscriptos }: { inscriptos: Inscripto[] }) {
  const totalPersonas = inscriptos.reduce((acc, i) => acc + 1 + (i.cantidad_familiares || 0), 0);
  return (
    <div className="hidden print:block mb-6">
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
        <div>
          <h1 className="text-xl font-bold">Congreso CCE Argentina 2026</h1>
          <h2 className="text-base font-semibold mt-0.5">Lista de Alojamiento</h2>
        </div>
        <div className="text-right text-sm">
          <p>{inscriptos.length} familias · {totalPersonas} personas</p>
          <p className="text-gray-500">{new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </div>
  );
}

// Fila editable (solo editor) con campo nota inline
function FilaEditor({ i, idx, loading, onGuardar }: {
  i: Inscripto;
  idx: number;
  loading: number | null;
  onGuardar: (id: number, estado: Estado, nota: string) => Promise<void>;
}) {
  const [estado, setEstado] = useState<Estado>(i.alojamiento_estado ?? "pendiente");
  const [nota, setNota] = useState(i.alojamiento_nota ?? "");
  const [dirty, setDirty] = useState(false);
  const totalPersonas = 1 + (i.cantidad_familiares || 0);

  return (
    <tr className="border-b border-[#1f1f1f] hover:bg-[#111] print:border-gray-300">
      <td className="py-3 px-2 text-[#666666] print:text-gray-500">{idx + 1}</td>
      <td className="py-3 px-2 text-white print:text-black font-medium">{i.nombre_apellido}</td>
      <td className="py-3 px-2 text-[#CCCCCC] print:text-black">{i.telefono}</td>
      <td className="py-3 px-2 text-[#CCCCCC] print:text-black">
        {i.iglesia === "Otros" && i.ciudad ? `Otros (${i.ciudad})` : i.iglesia}
      </td>
      <td className="py-3 px-2 text-center text-[#CCCCCC] print:text-black">{totalPersonas}</td>
      {/* Nota */}
      <td className="py-3 px-2 print:hidden">
        <input
          type="text"
          value={nota}
          placeholder="¿Dónde se hospeda?"
          onChange={(e) => { setNota(e.target.value); setDirty(true); }}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-2 py-1 text-xs text-[#CCCCCC] placeholder-[#444] focus:outline-none focus:border-dorado/50 transition-colors"
        />
      </td>
      <td className="py-3 px-2 print:text-black hidden print:table-cell text-xs text-gray-600">{nota || "—"}</td>
      {/* Estado + guardar */}
      <td className="py-3 px-2 print:hidden">
        <div className="flex items-center gap-2">
          <select
            value={estado}
            disabled={loading === i.id}
            onChange={(e) => { setEstado(e.target.value as Estado); setDirty(true); }}
            className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer bg-transparent transition-colors disabled:opacity-50 ${ESTADO_STYLES[estado]}`}
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="asignado">Asignado</option>
          </select>
          {dirty && (
            <button
              disabled={loading === i.id}
              onClick={async () => { await onGuardar(i.id, estado, nota); setDirty(false); }}
              className="text-xs bg-dorado text-black font-semibold px-2 py-1 rounded-lg hover:bg-dorado/80 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {loading === i.id ? "..." : "Guardar"}
            </button>
          )}
        </div>
      </td>
      <td className={`py-3 px-2 text-center hidden print:table-cell text-xs font-semibold ${ESTADO_PRINT[estado]}`}>
        {ESTADO_LABELS[estado]}
      </td>
    </tr>
  );
}

// Card mobile editable
function CardEditor({ i, loading, onGuardar }: {
  i: Inscripto;
  loading: number | null;
  onGuardar: (id: number, estado: Estado, nota: string) => Promise<void>;
}) {
  const [estado, setEstado] = useState<Estado>(i.alojamiento_estado ?? "pendiente");
  const [nota, setNota] = useState(i.alojamiento_nota ?? "");
  const [dirty, setDirty] = useState(false);
  const totalPersonas = 1 + (i.cantidad_familiares || 0);

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-white">{i.nombre_apellido}</h4>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ESTADO_STYLES[estado]}`}>
          {ESTADO_LABELS[estado]}
        </span>
      </div>
      <div className="space-y-1 text-sm mb-3">
        <p className="text-[#CCCCCC]">{i.telefono}</p>
        <p><span className="text-[#666666]">CCE: </span><span className="text-[#CCCCCC]">{i.iglesia === "Otros" && i.ciudad ? `Otros (${i.ciudad})` : i.iglesia}</span></p>
        <p><span className="text-[#666666]">Personas: </span><span className="text-dorado font-semibold">{totalPersonas}</span></p>
      </div>
      <input
        type="text"
        value={nota}
        placeholder="¿Dónde se hospeda?"
        onChange={(e) => { setNota(e.target.value); setDirty(true); }}
        className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#CCCCCC] placeholder-[#444] focus:outline-none focus:border-dorado/50 mb-3"
      />
      <div className="flex gap-1.5 pt-2 border-t border-[#2a2a2a]">
        {(["pendiente", "confirmado", "asignado"] as Estado[]).map((e) => (
          <button
            key={e}
            disabled={loading === i.id}
            onClick={() => { setEstado(e); setDirty(true); }}
            className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors disabled:opacity-40 ${
              estado === e ? ESTADO_STYLES[e] : "bg-transparent text-[#666666] border-[#2a2a2a] hover:bg-[#2a2a2a]"
            }`}
          >
            {ESTADO_LABELS[e]}
          </button>
        ))}
      </div>
      {dirty && (
        <button
          disabled={loading === i.id}
          onClick={async () => { await onGuardar(i.id, estado, nota); setDirty(false); }}
          className="w-full mt-2 text-sm bg-dorado text-black font-semibold py-2 rounded-lg hover:bg-dorado/80 disabled:opacity-50 transition-colors"
        >
          {loading === i.id ? "Guardando..." : "Guardar cambios"}
        </button>
      )}
    </div>
  );
}

// Fila solo lectura (observador)
function FilaObservador({ i, idx }: { i: Inscripto; idx: number }) {
  const estado: Estado = i.alojamiento_estado ?? "pendiente";
  const totalPersonas = 1 + (i.cantidad_familiares || 0);
  return (
    <tr className="border-b border-[#1f1f1f] print:border-gray-300">
      <td className="py-3 px-2 text-[#666666] print:text-gray-500">{idx + 1}</td>
      <td className="py-3 px-2 text-white print:text-black font-medium">{i.nombre_apellido}</td>
      <td className="py-3 px-2 text-[#CCCCCC] print:text-black">{i.telefono}</td>
      <td className="py-3 px-2 text-[#CCCCCC] print:text-black">
        {i.iglesia === "Otros" && i.ciudad ? `Otros (${i.ciudad})` : i.iglesia}
      </td>
      <td className="py-3 px-2 text-center text-[#CCCCCC] print:text-black">{totalPersonas}</td>
      <td className="py-3 px-2 text-[#666666] text-sm italic">{i.alojamiento_nota || "—"}</td>
      <td className="py-3 px-2 text-center print:hidden">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ESTADO_STYLES[estado]}`}>
          {ESTADO_LABELS[estado]}
        </span>
      </td>
      <td className={`py-3 px-2 text-center hidden print:table-cell text-xs font-semibold ${ESTADO_PRINT[estado]}`}>
        {ESTADO_LABELS[estado]}
      </td>
    </tr>
  );
}

// Card mobile solo lectura
function CardObservador({ i }: { i: Inscripto }) {
  const estado: Estado = i.alojamiento_estado ?? "pendiente";
  const totalPersonas = 1 + (i.cantidad_familiares || 0);
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-white">{i.nombre_apellido}</h4>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ESTADO_STYLES[estado]}`}>
          {ESTADO_LABELS[estado]}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-[#CCCCCC]">{i.telefono}</p>
        <p><span className="text-[#666666]">CCE: </span><span className="text-[#CCCCCC]">{i.iglesia === "Otros" && i.ciudad ? `Otros (${i.ciudad})` : i.iglesia}</span></p>
        <p><span className="text-[#666666]">Personas: </span><span className="text-dorado font-semibold">{totalPersonas}</span></p>
        {i.alojamiento_nota && (
          <p><span className="text-[#666666]">Alojamiento: </span><span className="text-[#CCCCCC] italic">{i.alojamiento_nota}</span></p>
        )}
      </div>
    </div>
  );
}

export function AlojamientoTab({ inscriptos, userRol, onEstadoChange }: Props) {
  const [filtro, setFiltro] = useState<"todos" | Estado>("todos");
  const [loading, setLoading] = useState<number | null>(null);
  const esEditor = userRol === "editor";

  const filtrados = filtro === "todos"
    ? inscriptos
    : inscriptos.filter((i) => (i.alojamiento_estado ?? "pendiente") === filtro);

  const handleGuardar = useCallback(async (id: number, estado: Estado, nota: string) => {
    setLoading(id);
    await onEstadoChange(id, estado, nota);
    setLoading(null);
  }, [onEstadoChange]);

  return (
    <div>
      <SummaryBar inscriptos={inscriptos} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 print:hidden">
        <div className="flex gap-1.5 w-full sm:w-auto">
          {(["todos", "pendiente", "confirmado", "asignado"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap ${
                filtro === f
                  ? "bg-dorado text-black border-dorado"
                  : "bg-[#1a1a1a] text-[#CCCCCC] border-[#2a2a2a] hover:bg-[#2a2a2a]"
              }`}
            >
              {f === "todos" ? "Todos" : ESTADO_LABELS[f]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {!esEditor && (
            <span className="text-[#666666] text-xs">Solo lectura</span>
          )}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm text-[#CCCCCC] border border-[#2a2a2a] hover:bg-[#2a2a2a] px-4 py-2 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Imprimir PDF
          </button>
        </div>
      </div>

      {/* Tabla desktop */}
      <div className="hidden md:block print:block">
        <PrintHeader inscriptos={filtrados} />
        <table className="w-full text-sm print:text-xs">
          <thead>
            <tr className="border-b border-[#2a2a2a] print:border-black">
              <th className="text-left py-3 px-2 text-[#666666] print:text-black font-semibold">#</th>
              <th className="text-left py-3 px-2 text-[#666666] print:text-black font-semibold">Nombre</th>
              <th className="text-left py-3 px-2 text-[#666666] print:text-black font-semibold">Teléfono</th>
              <th className="text-left py-3 px-2 text-[#666666] print:text-black font-semibold">CCE</th>
              <th className="text-center py-3 px-2 text-[#666666] print:text-black font-semibold">Pers.</th>
              <th className="text-left py-3 px-2 text-[#666666] print:text-black font-semibold">Alojamiento</th>
              <th className="text-center py-3 px-2 text-[#666666] print:text-black font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((i, idx) =>
              esEditor
                ? <FilaEditor key={i.id} i={i} idx={idx} loading={loading} onGuardar={handleGuardar} />
                : <FilaObservador key={i.id} i={i} idx={idx} />
            )}
          </tbody>
        </table>
      </div>

      {/* Cards mobile */}
      <div className="md:hidden space-y-3 print:hidden">
        {filtrados.map((i) =>
          esEditor
            ? <CardEditor key={i.id} i={i} loading={loading} onGuardar={handleGuardar} />
            : <CardObservador key={i.id} i={i} />
        )}
      </div>

      {filtrados.length === 0 && (
        <p className="text-center py-12 text-[#666666]">No hay registros con este filtro</p>
      )}
    </div>
  );
}
