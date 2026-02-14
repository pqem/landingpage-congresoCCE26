import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type InscripcionPayload = {
  nombre?: string;
  edad?: number;
  telefono?: string;
  ciudad?: string;
  iglesia?: string;
  alojamiento?: "si" | "no";
  familiares?: Array<{
    nombre?: string;
    edad?: number | null;
    parentesco?: string;
  }>;
};

type InscripcionRecord = {
  id: number;
  fecha: string;
  nombre: string;
  edad: number;
  telefono: string;
  ciudad: string;
  iglesia: string;
  alojamiento: "si" | "no";
  familiares: Array<{
    nombre: string;
    edad: number | null;
    parentesco: string;
  }>;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "inscripciones.json");

async function readInscripciones(): Promise<InscripcionRecord[]> {
  try {
    const file = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InscripcionPayload;

    const nombre = body.nombre?.trim() ?? "";
    const telefono = body.telefono?.trim() ?? "";
    const ciudad = body.ciudad?.trim() ?? "";
    const iglesia = body.iglesia?.trim() ?? "";
    const alojamiento = body.alojamiento;
    const edad = Number(body.edad);

    if (
      !nombre ||
      !telefono ||
      !ciudad ||
      !iglesia ||
      !alojamiento ||
      !Number.isFinite(edad) ||
      edad < 1
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios o son inválidos." },
        { status: 400 },
      );
    }

    const familiares = Array.isArray(body.familiares)
      ? body.familiares
          .filter((familiar) => familiar?.nombre?.trim())
          .map((familiar) => ({
            nombre: familiar.nombre?.trim() ?? "",
            edad:
              familiar.edad === null || familiar.edad === undefined
                ? null
                : Number(familiar.edad),
            parentesco: familiar.parentesco?.trim() || "Otro",
          }))
      : [];

    await fs.mkdir(dataDir, { recursive: true });
    const inscripciones = await readInscripciones();
    const nextId =
      inscripciones.length > 0
        ? Math.max(...inscripciones.map((inscripcion) => inscripcion.id)) + 1
        : 1;

    const newInscripcion: InscripcionRecord = {
      id: nextId,
      fecha: new Date().toISOString(),
      nombre,
      edad,
      telefono,
      ciudad,
      iglesia,
      alojamiento,
      familiares,
    };

    inscripciones.push(newInscripcion);
    await fs.writeFile(dataFile, JSON.stringify(inscripciones, null, 2), "utf-8");

    return NextResponse.json({ success: true, id: nextId });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la inscripción." },
      { status: 500 },
    );
  }
}
