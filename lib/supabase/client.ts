"use client";

import { createBrowserClient } from "@supabase/ssr";

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
 * Supabase client for browser (client components).
 * Session is stored in cookies and kept in sync via middleware refresh.
 */
export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
