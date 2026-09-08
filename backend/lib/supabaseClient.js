import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/*  Supabase client — downgraded from service_role to anon key        */
/*                                                                    */
/*  Previously: used SUPABASE_SERVICE_ROLE_KEY, which bypasses Row    */
/*  Level Security entirely and grants full admin access to the       */
/*  entire Supabase project (auth, database, storage). If the backend */
/*  was compromised (and Phase 1 found several ways it could be),    */
/*  the attacker gained full Supabase project control.               */
/*                                                                    */
/*  Now: prefers SUPABASE_ANON_KEY (respects RLS). Falls back to      */
/*  service_role key ONLY if explicitly set via                      */
/*  SUPABASE_ALLOW_SERVICE_ROLE=true (for migrations/seeding that    */
/*  genuinely need elevated access). In production, set up a         */
/*  Storage bucket with public-read RLS policies and use the anon     */
/*  key — it can INSERT/SELECT files but can't touch auth or DB.     */
/* ------------------------------------------------------------------ */
const SUPABASE_URL = process.env.SUPABASE_URL;

// Prefer anon key (respects RLS). Fall back to service_role only
// when explicitly allowed (for seeding/migrations).
const SUPABASE_KEY =
  process.env.SUPABASE_ANON_KEY ||
  (process.env.SUPABASE_ALLOW_SERVICE_ROLE === "true"
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : undefined);

export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-uploads";

// Warn at startup if service_role is being used in production
const isProd = process.env.NODE_ENV === "production";
if (isProd && process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_ANON_KEY) {
  console.warn(
    "[supabase] WARNING: Using SUPABASE_SERVICE_ROLE_KEY without setting " +
      "SUPABASE_ANON_KEY. The service_role key bypasses Row Level Security " +
      "and grants full admin access to your Supabase project. Set " +
      "SUPABASE_ANON_KEY instead (with proper RLS policies on your storage " +
      "bucket), or set SUPABASE_ALLOW_SERVICE_ROLE=true to acknowledge " +
      "this risk."
  );
}

// Storage uploads only work when both URL and key are set. When they're
// missing (e.g. local dev without a Supabase project configured), the
// upload route falls back to writing to backend/uploads/ on local disk.
export const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false },
      })
    : null;

export const isSupabaseStorageConfigured = () => supabase !== null;
