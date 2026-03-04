import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/export`,
    {
      headers: {
        "X-API-Key": process.env.ADMIN_API_KEY!,
        "X-Admin-Email": session.user.email,
      },
    }
  );

  const raw = await res.json() as {
    inscriptos: Record<string, unknown>[];
    familiares: { inscripto_id: number; nombre_apellido: string; edad: number; parentesco: string }[];
  };

  // Adjuntar familiares a cada inscripto
  const familiaresMap = (raw.familiares ?? []).reduce<Record<number, typeof raw.familiares>>((acc, f) => {
    if (!acc[f.inscripto_id]) acc[f.inscripto_id] = [];
    acc[f.inscripto_id].push(f);
    return acc;
  }, {});

  const data = (raw.inscriptos ?? []).map((i) => ({
    ...i,
    familiares: familiaresMap[(i.id as number)] ?? [],
  }));

  return NextResponse.json({ data }, { status: res.status });
}
