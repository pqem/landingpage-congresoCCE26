import type { Inscripto } from "./types";
import { FamiliaresDetail } from "./FamiliaresDetail";

interface InscriptoCardProps {
  inscripto: Inscripto;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function InscriptoCard({ inscripto: i, expanded, onToggle, onDelete }: InscriptoCardProps) {
  return (
    <div
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4"
      onClick={onToggle}
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

      {expanded && i.familiares && i.familiares.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
          <FamiliaresDetail familiares={i.familiares} compact />
        </div>
      )}

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
    </div>
  );
}
