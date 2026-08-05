import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export function POST() {
  const cookie = removeAuthCookie();
  return NextResponse.json({ message: "Signed out." }, {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
