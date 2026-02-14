import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Missing env NEXT_PUBLIC_SUPABASE_URL");
  }
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error("Missing env NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return key;
}

/**
 * Supabase client for server (Server Components, Route Handlers, Server Actions).
 * Use cookies() from next/headers for getAll/setAll.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll can throw in Server Component render; middleware handles refresh
        }
      },
    },
  });
}
