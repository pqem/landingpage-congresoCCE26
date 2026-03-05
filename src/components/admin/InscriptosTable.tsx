import { Fragment } from "react";
import type { Inscripto } from "./types";
import { FamiliaresDetail } from "./FamiliaresDetail";
import { waLink } from "./waLink";

interface InscriptosTableProps {
  inscriptos: Inscripto[];
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
  onDelete: (id: number) => void;
  userRol: string;
}

export function InscriptosTable({ inscriptos, expandedId, onToggleExpand, onDelete, userRol }: InscriptosTableProps) {
  const esEditor = userRol === "editor";
  return (
    <>
    {!esEditor && (
      <div className="flex items-center gap-3 bg-[#1a1a1a] border border-dorado/30 rounded-xl px-4 py-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-dorado shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-sm text-[#CCCCCC]">
          Solo <span className="text-dorado font-semibold">giseavit@gmail.com</span> puede eliminar inscriptos.
        </p>
      </div>
    )}
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
          {inscriptos.map((i) => {
            const hayFamiliares = i.familiares && i.familiares.length > 0;
            const expandido = expandedId === i.id;
            return (
              <Fragment key={i.id}>
                <tr className="border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{i.nombre_apellido}</td>
                  <td className="py-3 px-4">{i.edad}</td>
                  <td className="py-3 px-4">
                    <a
                      href={waLink(i.telefono, i.nombre_apellido)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CCCCCC] hover:text-green-400 transition-colors"
                    >
                      {i.telefono}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-[#CCCCCC]">{i.ciudad}</td>
                  <td className="py-3 px-4 text-[#CCCCCC]">{i.iglesia}</td>
                  <td className="py-3 px-4">
                    {i.necesita_alojamiento ? (
                      <span className="text-dorado">Sí</span>
                    ) : (
                      <span className="text-[#666666]">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {hayFamiliares ? (
                      <button
                        onClick={() => onToggleExpand(i.id)}
                        className="flex items-center gap-2 text-dorado hover:text-dorado-claro transition-colors cursor-pointer font-medium"
                        title="Click para ver/ocultar familiares"
                      >
                        <span className="text-sm leading-none">
                          {expandido ? "▼" : "▶"}
                        </span>
                        <span>{i.cantidad_familiares || 0}</span>
                      </button>
                    ) : (
                      <span className="text-[#CCCCCC]">{i.cantidad_familiares || 0}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#999999] text-sm">
                    {new Date(i.created_at).toLocaleDateString("es-AR")}
                  </td>
                  <td className="py-3 px-4">
                    {esEditor && (
                      <button
                        onClick={() => onDelete(i.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
                {expandido && hayFamiliares && (
                  <tr>
                    <td colSpan={9} className="bg-[#0a0a0a] px-8 py-3">
                      <FamiliaresDetail familiares={i.familiares} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
