import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthCookie, signToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const token = signToken({ userId: user.id });
  const cookie = createAuthCookie(token);

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } }, {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
