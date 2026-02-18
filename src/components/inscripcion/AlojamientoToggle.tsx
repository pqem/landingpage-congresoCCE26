import type { Alojamiento } from "./types";
import { labelClassName } from "./styles";

interface AlojamientoToggleProps {
  value: Alojamiento;
  onChange: (value: Alojamiento) => void;
  error: string;
  onClearError: () => void;
}

export function AlojamientoToggle({ value, onChange, error, onClearError }: AlojamientoToggleProps) {
  const handleSelect = (option: "si" | "no") => {
    onChange(option);
    onClearError();
  };

  return (
    <div>
      <p className={labelClassName}>¿Necesitás alojamiento?</p>
      <div className="grid grid-cols-2 gap-3">
        {(["si", "no"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={`min-h-11 border px-4 py-2.5 font-sans text-xs font-bold tracking-wider transition-all ${
              value === option
                ? "border-dorado bg-dorado text-black"
                : "border-gris-oscuro text-gris-texto"
            }`}
            onClick={() => handleSelect(option)}
          >
            {option === "si" ? "SÍ" : "NO"}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 font-mono text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
