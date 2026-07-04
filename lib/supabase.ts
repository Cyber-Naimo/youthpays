import { createClient } from "@supabase/supabase-js";

/* Server-only Supabase client (uses the service-role key — never expose to the browser).
   If env vars are missing, `supabaseAdmin` is null and the API falls back gracefully. */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(url && serviceKey);

export const supabaseAdmin = supabaseConfigured
  ? createClient(url as string, serviceKey as string, { auth: { persistSession: false } })
  : null;
