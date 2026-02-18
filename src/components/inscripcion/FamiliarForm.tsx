import type { Familiar } from "./types";
import { inputClassName, labelClassName } from "./styles";

interface FamiliarFormProps {
  familiar: Familiar;
  index: number;
  onUpdate: (id: number, key: keyof Omit<Familiar, "id">, value: string) => void;
  onRemove: (id: number) => void;
}

export function FamiliarForm({ familiar, index, onUpdate, onRemove }: FamiliarFormProps) {
  return (
    <div className="relative border-l-2 border-dorado/40 bg-negro-fondo/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-sans text-xs font-bold tracking-wider text-dorado/70">
          FAMILIAR {index + 1}
        </p>
        <button
          type="button"
          aria-label="Eliminar familiar"
          onClick={() => onRemove(familiar.id)}
          className="inline-flex h-11 w-11 items-center justify-center font-sans text-xs font-bold text-gris-texto transition-colors hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className={labelClassName}>Nombre y Apellido</label>
          <input
            type="text"
            placeholder="Nombre y Apellido"
            className={inputClassName}
            value={familiar.nombre}
            onChange={(e) => onUpdate(familiar.id, "nombre", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClassName}>Edad</label>
            <input
              type="number"
              min={1}
              max={99}
              placeholder="Edad"
              className={inputClassName}
              value={familiar.edad}
              onChange={(e) => onUpdate(familiar.id, "edad", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClassName}>Parentesco</label>
            <select
              className={inputClassName}
              value={familiar.parentesco}
              onChange={(e) => onUpdate(familiar.id, "parentesco", e.target.value)}
            >
              <option value="Esposo/a">Esposo/a</option>
              <option value="Hijo/a">Hijo/a</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
