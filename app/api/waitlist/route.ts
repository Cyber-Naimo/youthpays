import { NextResponse } from "next/server";
import { brand } from "@/config/brand";
import { supabaseAdmin } from "@/lib/supabase";

const TABLE = "waitlist";

function makeRef() {
  return brand.name.toLowerCase().replace(/\s/g, "") + "-" + Math.random().toString(36).slice(2, 8);
}

/* GET /api/waitlist → how many have signed up (real count once Supabase is set) */
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ configured: false, count: 0, displayed: brand.waitlistSeed });
  }
  const { count, error } = await supabaseAdmin.from(TABLE).select("*", { count: "exact", head: true });
  if (error) return NextResponse.json({ configured: true, count: 0, displayed: brand.waitlistSeed, error: error.message });
  const c = count ?? 0;
  return NextResponse.json({ configured: true, count: c, displayed: brand.waitlistSeed + c });
}

/* POST /api/waitlist → save a signup, lock a seat, return queue position */
export async function POST(req: Request) {
  let body: { name?: string; age?: string; email?: string; referred_by?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const age = (body.age || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const referredBy = (body.referred_by || "").trim() || null;
  if (!name || !age || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  // no backend configured yet → don't hard-fail the UI
  if (!supabaseAdmin) {
    return NextResponse.json({ success: true, position: brand.waitlistSeed + 1, ref: makeRef(), stored: false });
  }

  const ref = makeRef();
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert({ name, age, email, ref, referred_by: referredBy })
    .select("id")
    .single();

  if (error) {
    // duplicate email (unique violation) → return their existing seat
    if (error.code === "23505") {
      const { data: existing } = await supabaseAdmin.from(TABLE).select("id, ref").eq("email", email).single();
      if (existing) {
        return NextResponse.json({ success: true, position: brand.waitlistSeed + existing.id, ref: existing.ref, duplicate: true, stored: true });
      }
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, position: brand.waitlistSeed + data.id, ref, stored: true });
}
