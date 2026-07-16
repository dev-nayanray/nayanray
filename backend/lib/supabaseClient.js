import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-uploads";

// Storage uploads only work when both vars are set. When they're missing
// (e.g. local dev without a Supabase project configured), the upload route
// falls back to writing to backend/uploads/ on local disk instead.
export const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

export const isSupabaseStorageConfigured = () => supabase !== null;
