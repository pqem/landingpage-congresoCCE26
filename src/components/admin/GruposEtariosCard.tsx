import type { Stats } from "./types";

interface GruposEtariosCardProps {
  stats: Stats;
}

export function GruposEtariosCard({ stats }: GruposEtariosCardProps) {
  const grupos = stats.grupos_etarios;

  if (!grupos) return null;

  const total = grupos.bebes + grupos.ninos_adol_jovenes + grupos.matrimonios;
  const porcentajeNinos = total > 0 ? Math.round((grupos.ninos_adol_jovenes / total) * 100) : 0;
  const porcentajeMatrimonios = total > 0 ? Math.round((grupos.matrimonios / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {/* Bebés */}
      {grupos.bebes > 0 && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
          <p className="text-[#999999] text-xs sm:text-sm font-medium">Bebés (0-2)</p>
          <p className="text-white text-lg sm:text-xl font-semibold mt-1">{grupos.bebes}</p>
        </div>
      )}

      {/* Niños/Adolescentes/Jóvenes */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
        <p className="text-[#999999] text-xs sm:text-sm font-medium">Niños/Adol/Jóv</p>
        <p className="text-dorado text-lg sm:text-xl font-semibold mt-1">{grupos.ninos_adol_jovenes}</p>
        <p className="text-[#666666] text-xs mt-1">{porcentajeNinos}%</p>
      </div>

      {/* Matrimonios */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
        <p className="text-[#999999] text-xs sm:text-sm font-medium">Matrimonios 31+</p>
        <p className="text-dorado text-lg sm:text-xl font-semibold mt-1">{grupos.matrimonios}</p>
        <p className="text-[#666666] text-xs mt-1">{porcentajeMatrimonios}%</p>
      </div>
    </div>
  );
}
