"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Alojamiento = "si" | "no" | "";

type Familiar = {
  id: number;
  nombre: string;
  edad: string;
  parentesco: "Esposo/a" | "Hijo/a" | "Otro";
};

const inputClassName =
  "w-full bg-transparent border border-gris-oscuro px-4 py-3 font-mono text-sm text-foreground placeholder:text-gris-texto/50 focus:border-dorado focus:outline-none transition-colors";
const labelClassName =
  "mb-2 block font-sans text-xs font-bold tracking-wider text-foreground/80 uppercase";

export default function InscripcionPage() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("+54 9 ");
  const [ciudad, setCiudad] = useState("");
  const [iglesia, setIglesia] = useState("");
  const [alojamiento, setAlojamiento] = useState<Alojamiento>("");
  const [familiares, setFamiliares] = useState<Familiar[]>([]);
  const [nextFamiliarId, setNextFamiliarId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [alojamientoError, setAlojamientoError] = useState("");
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  const addFamiliar = () => {
    setFamiliares((prev) => [
      ...prev,
      { id: nextFamiliarId, nombre: "", edad: "", parentesco: "Esposo/a" },
    ]);
    setNextFamiliarId((prev) => prev + 1);
  };

  const removeFamiliar = (id: number) => {
    setFamiliares((prev) => prev.filter((familiar) => familiar.id !== id));
  };

  const updateFamiliar = (
    id: number,
    key: keyof Omit<Familiar, "id">,
    value: string,
  ) => {
    setFamiliares((prev) =>
      prev.map((familiar) =>
        familiar.id === id
          ? {
              ...familiar,
              [key]: value,
            }
          : familiar,
      ),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!alojamiento) {
      setAlojamientoError("Seleccioná si necesitás alojamiento.");
      return;
    }

    setAlojamientoError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          edad: Number(edad),
          telefono: telefono.trim(),
          ciudad: ciudad.trim(),
          iglesia: iglesia.trim(),
          alojamiento,
          familiares: familiares
            .filter(
              (familiar) =>
                familiar.nombre.trim() ||
                familiar.edad.trim() ||
                familiar.parentesco,
            )
            .map((familiar) => ({
              nombre: familiar.nombre.trim(),
              edad: familiar.edad ? Number(familiar.edad) : null,
              parentesco: familiar.parentesco,
            })),
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar la inscripción.");
      }

      setSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar la inscripción.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-negro-fondo py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <Link
          href="/#inscripcion"
          className="inline-flex min-h-11 items-center font-sans text-xs font-bold tracking-wider text-gris-texto transition-colors hover:text-dorado"
        >
          ← Volver al inicio
        </Link>

        {!success ? (
          <section className="mt-8 rounded-none bg-negro-suave p-6 sm:p-8">
            <header>
              <h1 className="font-serif text-3xl text-dorado sm:text-4xl">
                INSCRIPCIÓN
              </h1>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-dorado to-transparent" />
              <p className="mt-4 font-mono text-sm text-gris-texto">
                Al enviar tu inscripción recibirás un mensaje de WhatsApp de confirmación
              </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="nombre" className={labelClassName}>
                  Nombre y Apellido
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Nombre y Apellido"
                  className={inputClassName}
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="edad" className={labelClassName}>
                  Edad
                </label>
                <input
                  id="edad"
                  name="edad"
                  type="number"
                  required
                  min={1}
                  max={99}
                  placeholder="Edad"
                  className={inputClassName}
                  value={edad}
                  onChange={(event) => setEdad(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="telefono" className={labelClassName}>
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="+54 9 299 000-0000"
                  className={inputClassName}
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="ciudad" className={labelClassName}>
                  Ciudad
                </label>
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  required
                  placeholder="Ciudad"
                  className={inputClassName}
                  value={ciudad}
                  onChange={(event) => setCiudad(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="iglesia" className={labelClassName}>
                  Iglesia
                </label>
                <input
                  id="iglesia"
                  name="iglesia"
                  type="text"
                  required
                  placeholder="Iglesia"
                  className={inputClassName}
                  value={iglesia}
                  onChange={(event) => setIglesia(event.target.value)}
                />
              </div>

              <div>
                <p className={labelClassName}>¿Necesitás alojamiento?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`min-h-11 border px-4 py-2.5 font-sans text-xs font-bold tracking-wider transition-all ${
                      alojamiento === "si"
                        ? "border-dorado bg-dorado text-black"
                        : "border-gris-oscuro text-gris-texto"
                    }`}
                    onClick={() => {
                      setAlojamiento("si");
                      setAlojamientoError("");
                    }}
                  >
                    SÍ
                  </button>
                  <button
                    type="button"
                    className={`min-h-11 border px-4 py-2.5 font-sans text-xs font-bold tracking-wider transition-all ${
                      alojamiento === "no"
                        ? "border-dorado bg-dorado text-black"
                        : "border-gris-oscuro text-gris-texto"
                    }`}
                    onClick={() => {
                      setAlojamiento("no");
                      setAlojamientoError("");
                    }}
                  >
                    NO
                  </button>
                </div>
                {alojamientoError ? (
                  <p className="mt-2 font-mono text-sm text-red-400">
                    {alojamientoError}
                  </p>
                ) : null}
              </div>

              <div className="border-t border-gris-oscuro pt-6">
                <h2 className="font-serif text-xl text-dorado">Familiares</h2>
                <p className="mt-2 font-mono text-xs text-gris-texto">
                  Agregá a tu familia si vienen con vos (opcional)
                </p>
                <button
                  type="button"
                  onClick={addFamiliar}
                  className="mt-4 min-h-11 border border-dorado px-4 py-2.5 font-sans text-xs font-bold tracking-wider text-dorado transition-all hover:bg-dorado hover:text-black"
                >
                  + Agregar familiar
                </button>

                <div className="mt-4 space-y-6">
                  {familiares.map((familiar, idx) => (
                    <div
                      key={familiar.id}
                      className="relative border-l-2 border-dorado/40 bg-negro-fondo/60 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-sans text-xs font-bold tracking-wider text-dorado/70">FAMILIAR {idx + 1}</p>
                        <button
                          type="button"
                          aria-label="Eliminar familiar"
                          onClick={() => removeFamiliar(familiar.id)}
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
                            onChange={(event) =>
                              updateFamiliar(
                                familiar.id,
                                "nombre",
                                event.target.value,
                              )
                            }
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
                              onChange={(event) =>
                                updateFamiliar(familiar.id, "edad", event.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className={labelClassName}>Parentesco</label>
                            <select
                              className={inputClassName}
                              value={familiar.parentesco}
                              onChange={(event) =>
                                updateFamiliar(
                                  familiar.id,
                                  "parentesco",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="Esposo/a">Esposo/a</option>
                              <option value="Hijo/a">Hijo/a</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {submitError ? (
                <p className="font-mono text-sm text-red-400">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-dorado py-4 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro disabled:opacity-50"
              >
                {isSubmitting ? "ENVIANDO..." : "CONFIRMAR INSCRIPCIÓN"}
              </button>
            </form>
          </section>
        ) : (
          <section className="mt-8 flex min-h-[420px] flex-col items-center justify-center bg-negro-suave px-6 py-10 text-center sm:px-8">
            <div className="flex h-16 w-16 items-center justify-center border border-dorado">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-dorado"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-6 font-serif text-3xl text-dorado">
              ¡Inscripción confirmada!
            </h2>
            <p className="mt-3 font-mono text-gris-texto">
              Te contactaremos por WhatsApp para confirmar tu lugar.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex min-h-11 items-center border border-dorado px-6 py-2.5 font-sans text-xs font-bold tracking-wider text-dorado transition-all hover:bg-dorado hover:text-black"
            >
              VOLVER AL INICIO
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
