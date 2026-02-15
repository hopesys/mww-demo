import { createClient } from "@/lib/supabase/server";
import { getServiceRoleClient } from "@/lib/supabase/server-service";

export type UserRole = "user" | "admin";

/**
 * Get current user's role from public.users. Returns null if not logged in or user row missing.
 * Uses service_role to read role when available so RLS/cookie issues do not block admin access.
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const serviceClient = getServiceRoleClient();
  const client = serviceClient ?? supabase;

  const { data: row } = await client
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = row?.role as UserRole | undefined;
  if (role !== "user" && role !== "admin") return null;
  return role;
}

/**
 * Require admin role; returns true if admin, false otherwise (caller should redirect).
 */
export async function requireAdmin(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "admin";
}
