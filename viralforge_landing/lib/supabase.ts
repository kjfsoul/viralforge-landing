// viralforge_landing/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// For client components (browser). Uses NEXT_PUBLIC_* (required)
export const supabaseBrowser = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// For API routes / server code (reads server-only first, falls back to public if needed)
export const supabaseServer = () =>
  createClient(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// Admin-only (writes/maintenance). Use ONLY in server routes (never import in client files).
export const supabaseAdmin = () =>
  createClient(
    (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
