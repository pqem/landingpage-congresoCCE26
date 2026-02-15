import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inscripciones/${id}`,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inscripciones/${id}`,
    {
      method: "DELETE",
      headers: {
        "X-API-Key": process.env.ADMIN_API_KEY!,
        "X-Admin-Email": session.user.email,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
