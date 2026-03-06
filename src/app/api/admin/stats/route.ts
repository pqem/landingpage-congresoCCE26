import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
    {
      headers: {
        "X-API-Key": process.env.ADMIN_API_KEY!,
        "X-Admin-Email": session.user.email,
      },
    }
  );

  const data = await res.json() as {
    total_inscriptos: number;
    con_alojamiento: number;
    total_familiares: number;
    por_ciudad: { ciudad: string; total: number }[];
    por_iglesia: { iglesia: string; total: number }[];
    por_dia: { dia: string; total: number }[];
    grupos_etarios?: {
      bebes: number;
      ninos: number;
      jovenes_adolescentes: number;
      matrimonios: number;
    };
  };

  const transformed = {
    total_inscriptos: data.total_inscriptos ?? 0,
    necesitan_alojamiento: data.con_alojamiento ?? 0,
    total_familiares: data.total_familiares ?? 0,
    total_personas: (data.total_inscriptos ?? 0) + (data.total_familiares ?? 0),
    por_ciudad: (data.por_ciudad ?? []).map((d) => ({ ciudad: d.ciudad, cantidad: d.total })),
    por_iglesia: (data.por_iglesia ?? []).map((d) => ({ iglesia: d.iglesia, cantidad: d.total })),
    por_dia: (data.por_dia ?? [])
      .map((d) => ({ fecha: d.dia, cantidad: d.total }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha)),
    grupos_etarios: data.grupos_etarios,
  };

  return NextResponse.json(transformed, { status: res.status });
}
