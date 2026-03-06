"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Alojamiento, Familiar } from "@/components/inscripcion/types";
import { inputClassName, labelClassName } from "@/components/inscripcion/styles";
import { SuccessScreen } from "@/components/inscripcion/SuccessScreen";
import { AlojamientoToggle } from "@/components/inscripcion/AlojamientoToggle";
import { FamiliaresSection } from "@/components/inscripcion/FamiliaresSection";

// Funciones helper para validación de teléfono argentino
function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function formatPhoneInput(value: string): string {
  const digits = extractDigits(value);

  // Limitar a máximo 11 dígitos para Argentina
  if (digits.length > 11) {
    return formatPhoneInput(digits.slice(0, 11));
  }

  // Si no hay dígitos, retornar vacío
  if (digits.length === 0) return "";

  // Formatear según cantidad de dígitos
  if (digits.length <= 4) {
    return `+54 9 ${digits}`;
  } else {
    // 5-11 dígitos: +54 9 XXXX XXXXX
    return `+54 9 ${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
}

function isValidPhoneDigits(value: string): boolean {
  const digits = extractDigits(value);
  // Argentina: teléfonos válidos tienen 10 o 11 dígitos
  return digits.length === 10 || digits.length === 11;
}

export default function InscripcionPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [iglesia, setIglesia] = useState("");
  const [alojamiento, setAlojamiento] = useState<Alojamiento>("");
  const [familiares, setFamiliares] = useState<Familiar[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [alojamientoError, setAlojamientoError] = useState("");
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [aceptaMenor, setAceptaMenor] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [stepErrors, setStepErrors] = useState<Record<number, string>>({});

  const esMenor = Number(edad) > 0 && Number(edad) < 18;

  // Validación por paso
  const validateStep = (step: number): boolean => {
    const errors: Record<number, string> = {};

    if (step === 1) {
      if (!nombre.trim() || nombre.trim().length < 2) errors[1] = "Nombre debe tener al menos 2 caracteres";
      if (!apellido.trim() || apellido.trim().length < 2) errors[1] = errors[1] || "Apellido debe tener al menos 2 caracteres";
      if (!edad || Number(edad) < 1 || Number(edad) > 99) errors[1] = errors[1] || "Edad debe estar entre 1 y 99";
      if (!isValidPhoneDigits(telefono)) errors[1] = errors[1] || "Teléfono debe tener 10 o 11 dígitos";
    }

    if (step === 2) {
      if (!iglesia) errors[2] = "Seleccioná tu localidad";
      if (iglesia === "Otra" && (!ciudad.trim() || ciudad.trim().length < 2)) errors[2] = "Ciudad es obligatoria";
    }

    if (step === 3) {
      if (!alojamiento) errors[3] = "Seleccioná si necesitás alojamiento";
    }

    if (step === 4) {
      if (!aceptaPrivacidad) errors[4] = "Debés aceptar la política de privacidad";
      if (esMenor && !aceptaMenor) errors[4] = errors[4] || "Debés confirmar que tenés autorización de tu tutor";
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validateStep(4)) return;

    setAlojamientoError("");
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/inscripcion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_apellido: `${nombre.trim()} ${apellido.trim()}`,
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

      if (response.status === 409) {
        throw new Error("¡Ya estás inscripto!");
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

  const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const stepLabels = ["Tus datos", "Tu iglesia", "Logística", "Confirmación"];

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
            {/* Header */}
            <header className="text-center">
              <h1 className="font-serif text-3xl text-dorado sm:text-4xl">
                INSCRIPCIÓN
              </h1>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-dorado to-transparent" />
              <p className="mt-4 font-mono text-sm text-gris-texto">
                Paso {currentStep} de 4
              </p>
            </header>

            {/* Step Indicator */}
            <div className="mt-6 flex items-center justify-between gap-2 sm:gap-4">
              {stepLabels.map((label, idx) => {
                const step = idx + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                  <div key={step} className="flex flex-1 items-center gap-2">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? "bg-dorado text-black"
                          : isCompleted
                            ? "border border-dorado bg-dorado/10 text-dorado"
                            : "border border-gris-oscuro text-gris-texto"
                      }`}
                    >
                      {isCompleted ? "✓" : step}
                    </div>
                    {idx < stepLabels.length - 1 && (
                      <div
                        className={`h-px flex-1 transition-colors ${
                          isCompleted ? "bg-dorado" : "bg-gris-oscuro"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <motion.div
              className="mt-4 h-1 bg-dorado"
              initial={{ scaleX: 0.25 }}
              animate={{ scaleX: currentStep / 4 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />

            {/* Form - Honeypot */}
            <form onSubmit={handleSubmit} className="mt-8">
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

              {/* Steps Container */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-5"
                >
                  {/* STEP 1: Datos Personales */}
                  {currentStep === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label htmlFor="nombre" className={labelClassName}>
                            Nombre
                          </label>
                          <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            required
                            placeholder="Nombre"
                            className={inputClassName}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="apellido" className={labelClassName}>
                            Apellido
                          </label>
                          <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            required
                            placeholder="Apellido"
                            className={inputClassName}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="col-span-1">
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
                            onChange={(e) => setEdad(e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="telefono" className={labelClassName}>
                            Teléfono
                          </label>
                          <input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            required
                            placeholder="+54 9 XXXX XXXXX"
                            className={inputClassName}
                            value={telefono}
                            onChange={(e) => setTelefono(formatPhoneInput(e.target.value))}
                          />
                        </div>
                      </div>

                      {stepErrors[1] && (
                        <p className="font-mono text-sm text-red-400">{stepErrors[1]}</p>
                      )}
                    </>
                  )}

                  {/* STEP 2: Procedencia */}
                  {currentStep === 2 && (
                    <>
                      <div>
                        <label htmlFor="iglesia" className={labelClassName}>
                          Localidad de tu iglesia
                        </label>
                        <select
                          id="iglesia"
                          name="iglesia"
                          required
                          className={`${inputClassName} cursor-pointer`}
                          value={iglesia}
                          onChange={(e) => {
                            setIglesia(e.target.value);
                            setCiudad("");
                          }}
                        >
                          <option value="" disabled>
                            Seleccioná tu localidad
                          </option>
                          <option value="Caleta Olivia">Caleta Olivia</option>
                          <option value="Centenario">Centenario</option>
                          <option value="Esquel">Esquel</option>
                          <option value="Gaiman">Gaiman</option>
                          <option value="La Plata">La Plata</option>
                          <option value="Mar del Plata">Mar del Plata</option>
                          <option value="Neuquén">Neuquén</option>
                          <option value="Plottier">Plottier</option>
                          <option value="Puerto Madryn">Puerto Madryn</option>
                          <option value="Santa Fe">Santa Fe</option>
                          <option value="Senillosa">Senillosa</option>
                          <option value="Trelew">Trelew</option>
                          <option value="Trevelin">Trevelin</option>
                          <option value="Viedma">Viedma</option>
                          <option value="Zapala">Zapala</option>
                          <option value="Otra">Otra</option>
                        </select>
                      </div>

                      {iglesia === "Otra" && (
                        <div>
                          <label htmlFor="ciudad" className={labelClassName}>
                            ¿De qué ciudad venís?
                          </label>
                          <input
                            id="ciudad"
                            name="ciudad"
                            type="text"
                            required
                            placeholder="Tu ciudad"
                            className={inputClassName}
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                          />
                        </div>
                      )}

                      {stepErrors[2] && (
                        <p className="font-mono text-sm text-red-400">{stepErrors[2]}</p>
                      )}
                    </>
                  )}

                  {/* STEP 3: Alojamiento y Familiares */}
                  {currentStep === 3 && (
                    <>
                      <AlojamientoToggle
                        value={alojamiento}
                        onChange={setAlojamiento}
                        error={alojamientoError}
                        onClearError={() => setAlojamientoError("")}
                      />

                      <FamiliaresSection familiares={familiares} onChange={setFamiliares} />

                      {stepErrors[3] && (
                        <p className="font-mono text-sm text-red-400">{stepErrors[3]}</p>
                      )}
                    </>
                  )}

                  {/* STEP 4: Confirmación */}
                  {currentStep === 4 && (
                    <>
                      {esMenor && (
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={aceptaMenor}
                            onChange={(e) => setAceptaMenor(e.target.checked)}
                            className="mt-0.5 shrink-0 accent-dorado"
                          />
                          <span className="font-mono text-xs text-gris-texto">
                            Soy menor de edad y cuento con autorización de mi padre, madre o tutor legal para participar del congreso y para el tratamiento de mis datos personales.
                          </span>
                        </label>
                      )}

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={aceptaPrivacidad}
                          onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                          className="mt-0.5 shrink-0 accent-dorado"
                        />
                        <span className="font-mono text-xs text-gris-texto">
                          Acepto que CCE Esperanza almacene mis datos para gestionar mi inscripción y enviarme comunicaciones del evento.{" "}
                          <a href="/privacidad" target="_blank" className="text-dorado hover:underline">
                            Política de Privacidad
                          </a>
                        </span>
                      </label>

                      {submitError && (
                        <p className="font-mono text-sm text-red-400">{submitError}</p>
                      )}

                      {stepErrors[4] && (
                        <p className="font-mono text-sm text-red-400">{stepErrors[4]}</p>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 px-4 py-2 font-sans text-sm font-bold text-gris-texto border border-gris-oscuro hover:bg-gris-oscuro/20 transition-colors rounded"
                  >
                    ← Atrás
                  </button>
                )}

                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-dorado py-4 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro disabled:opacity-50"
                  >
                    Continuar →
                  </button>
                )}

                {currentStep === 4 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-dorado py-4 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro disabled:opacity-50"
                  >
                    {isSubmitting ? "ENVIANDO..." : "CONFIRMAR INSCRIPCIÓN"}
                  </button>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
