import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const COOKIE_NAME = "ai_change_token";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: { userId: number }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

export function createAuthCookie(token: string) {
  return cookie.stringifySetCookie(
    {
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
    {
      encode: (value) => encodeURIComponent(value),
    }
  );
}

export function removeAuthCookie() {
  return cookie.stringifySetCookie(
    {
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    },
    {
      encode: (value) => encodeURIComponent(value),
    }
  );
}

export function getTokenFromRequest(request: NextRequest | Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parseCookie(cookieHeader);
  return cookies[COOKIE_NAME] as string | undefined;
}
