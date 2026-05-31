import { createClient } from "@supabase/supabase-js";

const env = import.meta.env;

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
