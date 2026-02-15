import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service_role key.
 * Use only for trusted server operations (e.g. reading user role for auth check).
 * Never expose this client or the key to the client bundle.
 */
export function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\r$/, "");
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
