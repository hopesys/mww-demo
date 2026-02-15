/**
 * Create admin user in Supabase Auth and set role in public.users.
 * Run once: bun run create-admin
 * If you get "Invalid login credentials", run again to reset admin password.
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (from Supabase Dashboard → Settings → API → service_role)
 *
 * Supabase: Authentication → Providers → Email must be enabled for password sign-in.
 *
 * Login: admin@example.com / P@ssw0rd (or the ADMIN_EMAIL you set)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv(): void {
  const cwd = process.cwd();
  const paths = [resolve(cwd, ".env"), resolve(cwd, "..", ".env")];
  for (const envPath of paths) {
    if (!existsSync(envPath)) continue;
    try {
      const content = readFileSync(envPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim().replace(/\r$/, "");
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1).trim();
        }
        if (!process.env[key]) process.env[key] = value;
      }
      break;
    } catch {
      // ignore read errors
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\r$/, "") ?? "";

// Use a valid email format (Supabase may reject .local); you can change to your domain.
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "P@ssw0rd";
const ADMIN_DISPLAY_NAME = "Admin";

async function main(): Promise<void> {
  if (!SUPABASE_URL?.trim()) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL in environment.");
    process.exit(1);
  }
  if (!SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env");
    console.error("  1. Open Supabase Dashboard → your project → Settings → API");
    console.error("  2. Copy the 'service_role' key (secret, not anon)");
    console.error("  3. Add to .env: SUPABASE_SERVICE_ROLE_KEY=paste-here");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const {
    data: { user },
    error: createError,
  } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: ADMIN_DISPLAY_NAME },
  });

  if (createError) {
    if (createError.message.includes("already been registered")) {
      const { data: existing } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      const adminUser = existing?.users?.find((u) => u.email === ADMIN_EMAIL);
      if (adminUser) {
        const { error: updateErr } = await supabase.auth.admin.updateUserById(
          adminUser.id,
          { password: ADMIN_PASSWORD }
        );
        if (updateErr) {
          console.warn("Could not reset admin password:", updateErr.message);
        } else {
          console.log("Admin password reset to P@ssw0rd.");
        }
        await ensureAdminRole(supabase, adminUser.id);
        console.log("Admin already exists. Updated public.users role to admin.");
        console.log("Login: %s / %s", ADMIN_EMAIL, ADMIN_PASSWORD);
        return;
      }
    }
    const msg = createError.message.toLowerCase();
    if (
      msg.includes("bearer token") ||
      msg.includes("valid bearer") ||
      msg.includes("user not allowed") ||
      msg.includes("not_admin") ||
      msg.includes("service_role")
    ) {
      console.error("Failed to create admin user:", createError.message);
      console.error("");
      console.error("Use the SERVICE_ROLE key (secret), not the anon/publishable key.");
      console.error("  Supabase Dashboard → Settings → API → Project API keys");
      console.error("  Copy 'service_role' (click Reveal), then in .env:");
      console.error("  SUPABASE_SERVICE_ROLE_KEY=<paste the long secret key>");
    } else {
      console.error("Failed to create admin user:", createError.message);
    }
    process.exit(1);
  }

  if (!user) {
    console.error("Created user but no user object returned.");
    process.exit(1);
  }

  await ensureAdminRole(supabase, user.id);
  console.log("Admin user created.");
  console.log("Login: %s / %s", ADMIN_EMAIL, ADMIN_PASSWORD);
}

async function ensureAdminRole(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("users")
    .upsert(
      {
        id: userId,
        email: ADMIN_EMAIL,
        full_name: ADMIN_DISPLAY_NAME,
        role: "admin",
        vote_credits: 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Failed to set admin role in public.users:", error.message);
    process.exit(1);
  }
}

main();
