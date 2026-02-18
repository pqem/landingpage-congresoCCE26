import type { Familiar } from "./types";

interface FamiliaresDetailProps {
  familiares: Familiar[];
  compact?: boolean;
}

export function FamiliaresDetail({ familiares, compact = false }: FamiliaresDetailProps) {
  if (familiares.length === 0) return null;

  return (
    <div>
      <p className={`text-[#999999] mb-2 ${compact ? "text-xs" : "text-sm"}`}>Familiares:</p>
      <div className={compact ? "" : "space-y-1"}>
        {familiares.map((f, idx) => (
          <p key={idx} className={`text-[#CCCCCC] ${compact ? "text-xs mb-1" : "text-sm"}`}>
            {f.nombre_apellido} — {f.edad} años — {f.parentesco}
          </p>
        ))}
      </div>
    </div>
  );
}
