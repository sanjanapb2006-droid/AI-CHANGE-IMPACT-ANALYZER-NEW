import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthCookie, hashPassword, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body as { name: string; email: string; password: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ message: "A user with that email already exists." }, { status: 409 });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
  const token = signToken({ userId: user.id });
  const cookie = createAuthCookie(token);

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } }, {
    status: 201,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
