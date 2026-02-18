"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Alojamiento, Familiar } from "@/components/inscripcion/types";
import { inputClassName, labelClassName } from "@/components/inscripcion/styles";
import { SuccessScreen } from "@/components/inscripcion/SuccessScreen";
import { AlojamientoToggle } from "@/components/inscripcion/AlojamientoToggle";
import { FamiliaresSection } from "@/components/inscripcion/FamiliaresSection";

export default function InscripcionPage() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("+54 9 ");
  const [ciudad, setCiudad] = useState("");
  const [iglesia, setIglesia] = useState("");
  const [alojamiento, setAlojamiento] = useState<Alojamiento>("");
  const [familiares, setFamiliares] = useState<Familiar[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [alojamientoError, setAlojamientoError] = useState("");
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/inscripcion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_apellido: nombre.trim(),
          edad: Number(edad),
          telefono: telefono.trim(),
          ciudad: ciudad.trim(),
          iglesia: iglesia.trim(),
          necesita_alojamiento: alojamiento === "si",
          _honeypot: honeypot,
          familiares: familiares
            .filter((f) => f.nombre.trim() || f.edad.trim() || f.parentesco)
            .map((f) => ({
              nombre_apellido: f.nombre.trim(),
              edad: f.edad ? Number(f.edad) : null,
              parentesco: f.parentesco,
            })),
        }),
      });

      if (response.status === 429) {
        throw new Error("Demasiadas solicitudes, intentá más tarde.");
      }

      const data = (await response.json()) as { success?: boolean; error?: string; message?: string; detalles?: string[] };

      if (!response.ok || !data.success) {
        const errorMsg = data.detalles?.join(", ") || data.error || "No se pudo enviar la inscripción.";
        throw new Error(errorMsg);
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

        {success ? (
          <SuccessScreen />
        ) : (
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
              {/* Honeypot anti-bot */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <input
                  type="text"
                  name="_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="nombre" className={labelClassName}>Nombre y Apellido</label>
                <input id="nombre" name="nombre" type="text" required placeholder="Nombre y Apellido" className={inputClassName} value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>

              <div>
                <label htmlFor="edad" className={labelClassName}>Edad</label>
                <input id="edad" name="edad" type="number" required min={1} max={99} placeholder="Edad" className={inputClassName} value={edad} onChange={(e) => setEdad(e.target.value)} />
              </div>

              <div>
                <label htmlFor="telefono" className={labelClassName}>Teléfono</label>
                <input id="telefono" name="telefono" type="tel" required placeholder="+54 9 299 000-0000" className={inputClassName} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>

              <div>
                <label htmlFor="ciudad" className={labelClassName}>Ciudad</label>
                <input id="ciudad" name="ciudad" type="text" required placeholder="Ciudad" className={inputClassName} value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>

              <div>
                <label htmlFor="iglesia" className={labelClassName}>Iglesia</label>
                <input id="iglesia" name="iglesia" type="text" required placeholder="Iglesia" className={inputClassName} value={iglesia} onChange={(e) => setIglesia(e.target.value)} />
              </div>

              <AlojamientoToggle
                value={alojamiento}
                onChange={setAlojamiento}
                error={alojamientoError}
                onClearError={() => setAlojamientoError("")}
              />

              <FamiliaresSection familiares={familiares} onChange={setFamiliares} />

              {submitError && (
                <p className="font-mono text-sm text-red-400">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dorado py-4 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro disabled:opacity-50"
              >
                {isSubmitting ? "ENVIANDO..." : "CONFIRMAR INSCRIPCIÓN"}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
