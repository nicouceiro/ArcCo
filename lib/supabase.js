// Supabase client — safe for the browser.
// The publishable key is PUBLIC by design; your data is protected by
// Row Level Security (RLS), which you MUST enable on every table.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: paste your two values from Supabase → Project → Connect (or Settings → API Keys)
const SUPABASE_URL = "https://uclwadtdbjzcrdcihfow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_CUZk4MEUq4EPWgVjx4bQ_A_XCfFemn8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
