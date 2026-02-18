interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
      <p className="text-[#999999] text-sm">
        Página {page} de {totalPages} ({total} total)
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg disabled:opacity-50 hover:bg-[#2a2a2a] transition-colors text-sm"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg disabled:opacity-50 hover:bg-[#2a2a2a] transition-colors text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
