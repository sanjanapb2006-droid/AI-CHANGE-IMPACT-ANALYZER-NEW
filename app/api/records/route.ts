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

  const records = await prisma.record.findMany({
    where: { userId: payload.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { action, description } = body as { action: string; description: string };

  if (!action || !description) {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const record = await prisma.record.create({
    data: {
      action,
      description,
      userId: payload.userId,
    },
  });

  return NextResponse.json({ record }, { status: 201 });
}
