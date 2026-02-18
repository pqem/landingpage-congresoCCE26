import type { Stats } from "./types";

interface StatCardsProps {
  stats: Stats;
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    { label: "Total inscriptos", value: stats.total_inscriptos, gold: false },
    { label: "Total personas", value: stats.total_personas, gold: false, sub: "inscriptos + familiares" },
    { label: "Familiares", value: stats.total_familiares, gold: false },
    { label: "Necesitan alojamiento", value: stats.necesitan_alojamiento, gold: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 animate-admin-fade-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="h-0.5 bg-dorado rounded-t-xl -mx-5 -mt-5 mb-4"></div>
          <p className="text-[#999999] text-sm">{card.label}</p>
          <p className={`text-3xl font-bold mt-1 ${card.gold ? "text-dorado" : "text-white"}`}>
            {card.value}
          </p>
          {card.sub && <p className="text-[#666666] text-xs mt-1">{card.sub}</p>}
        </div>
      ))}
    </div>
  );
}
