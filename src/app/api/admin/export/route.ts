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

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
