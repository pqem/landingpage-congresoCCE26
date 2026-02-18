interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onExportCSV: () => void;
}

export function SearchBar({ search, onSearchChange, onExportCSV }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nombre o teléfono..."
        className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#E7BB70] focus:border-[#E7BB70]"
      />
      <button
        onClick={onExportCSV}
        className="bg-[#E7BB70] text-black font-semibold hover:bg-[#F0CC88] px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
      >
        Exportar CSV
      </button>
    </div>
  );
}
