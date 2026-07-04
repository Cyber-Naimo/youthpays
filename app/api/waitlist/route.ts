import { NextResponse } from "next/server";
import { brand } from "@/config/brand";

/* In-memory store — resets on server restart.
   Swap for Supabase / a DB when the backend is ready:
   the response shape { success, position, ref } is all the client needs. */
const signups = new Map<string, { name: string; age: string; position: number; ref: string }>();

function makeRef() {
  return (
    brand.name.toLowerCase().replace(/\s/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

export async function POST(req: Request) {
  let body: { name?: string; age?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const age = (body.age || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (!name || !age || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  const existing = signups.get(email);
  if (existing) {
    return NextResponse.json({ success: true, position: existing.position, ref: existing.ref, duplicate: true });
  }

  const position = brand.waitlistSeed + signups.size + 1;
  const ref = makeRef();
  signups.set(email, { name, age, position, ref });

  return NextResponse.json({ success: true, position, ref });
}
