import type { Inscripto } from "./types";
import { FamiliaresDetail } from "./FamiliaresDetail";

interface InscriptoCardProps {
  inscripto: Inscripto;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  userRol: string;
}

export function InscriptoCard({ inscripto: i, expanded, onToggle, onDelete, userRol }: InscriptoCardProps) {
  const esEditor = userRol === "editor";
  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4"
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-white">{i.nombre_apellido}</h4>
        <span className="text-[#999999] text-xs shrink-0 ml-2">
          {new Date(i.created_at).toLocaleDateString("es-AR")}
        </span>
      </div>
      <div className="space-y-1.5 text-sm">
        <p className="text-[#CCCCCC]">{i.telefono}</p>
        <p>
          <span className="text-[#666666]">Edad: </span>
          <span className="text-[#CCCCCC]">{i.edad}</span>
        </p>
        <p>
          <span className="text-[#666666]">CCE: </span>
          <span className="text-[#CCCCCC]">
            {i.iglesia === "Otros" && i.ciudad ? `Otros (${i.ciudad})` : i.iglesia}
          </span>
        </p>
        <p>
          <span className="text-[#666666]">Alojamiento: </span>
          {i.necesita_alojamiento ? (
            <span className="text-dorado">Sí</span>
          ) : (
            <span className="text-[#666666]">No</span>
          )}
        </p>
        {(i.cantidad_familiares || 0) > 0 && (
          <p>
            <span className="text-[#666666]">Familiares: </span>
            <span className="text-[#CCCCCC]">{i.cantidad_familiares}</span>
          </p>
        )}
      </div>

      {expanded && i.familiares && i.familiares.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
          <FamiliaresDetail familiares={i.familiares} compact />
        </div>
      )}

      {esEditor && (
        <div className="flex justify-end mt-3 pt-2 border-t border-[#2a2a2a]/50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-400 hover:text-red-300 text-xs"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
