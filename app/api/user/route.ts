import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
}
