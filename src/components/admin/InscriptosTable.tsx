import { Fragment } from "react";
import type { Inscripto } from "./types";
import { FamiliaresDetail } from "./FamiliaresDetail";

interface InscriptosTableProps {
  inscriptos: Inscripto[];
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
  onDelete: (id: number) => void;
}

export function InscriptosTable({ inscriptos, expandedId, onToggleExpand, onDelete }: InscriptosTableProps) {
  return (
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
          {inscriptos.map((i) => (
            <Fragment key={i.id}>
              <tr
                className="border-b border-[#2a2a2a]/50 hover:bg-[#1a1a1a]/50 cursor-pointer transition-colors"
                onClick={() => onToggleExpand(i.id)}
              >
                <td className="py-3 px-4 font-medium">{i.nombre_apellido}</td>
                <td className="py-3 px-4">{i.edad}</td>
                <td className="py-3 px-4 text-[#CCCCCC]">{i.telefono}</td>
                <td className="py-3 px-4 text-[#CCCCCC]">{i.ciudad}</td>
                <td className="py-3 px-4 text-[#CCCCCC]">{i.iglesia}</td>
                <td className="py-3 px-4">
                  {i.necesita_alojamiento ? (
                    <span className="text-dorado">Sí</span>
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
                      onDelete(i.id);
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
                    <FamiliaresDetail familiares={i.familiares} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
