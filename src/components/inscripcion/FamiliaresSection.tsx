"use client";

import { useState } from "react";
import type { Familiar } from "./types";
import { FamiliarForm } from "./FamiliarForm";

interface FamiliaresSectionProps {
  familiares: Familiar[];
  onChange: (familiares: Familiar[]) => void;
}

export function FamiliaresSection({ familiares, onChange }: FamiliaresSectionProps) {
  const [nextId, setNextId] = useState(1);

  const addFamiliar = () => {
    onChange([...familiares, { id: nextId, nombre: "", edad: "", parentesco: "Esposo/a" }]);
    setNextId((prev) => prev + 1);
  };

  const removeFamiliar = (id: number) => {
    onChange(familiares.filter((f) => f.id !== id));
  };

  const updateFamiliar = (id: number, key: keyof Omit<Familiar, "id">, value: string) => {
    onChange(familiares.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  return (
    <div className="border-t border-gris-oscuro pt-6">
      <h2 className="font-serif text-xl text-dorado">Familiares</h2>
      <p className="mt-2 font-mono text-xs text-gris-texto">
        Agregá a tu familia si vienen con vos (opcional)
      </p>
      <div className="mt-4 space-y-6">
        {familiares.map((familiar, idx) => (
          <FamiliarForm
            key={familiar.id}
            familiar={familiar}
            index={idx}
            onUpdate={updateFamiliar}
            onRemove={removeFamiliar}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addFamiliar}
        className="mt-4 min-h-11 border border-dorado px-4 py-2.5 font-sans text-xs font-bold tracking-wider text-dorado transition-all hover:bg-dorado hover:text-black"
      >
        + Agregar familiar
      </button>
    </div>
  );
}
