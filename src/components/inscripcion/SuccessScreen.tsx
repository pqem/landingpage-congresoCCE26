import Link from "next/link";

export function SuccessScreen() {
  return (
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
  );
}
