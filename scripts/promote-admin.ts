/**
 * Set an existing user as admin by email.
 * Run: bun run scripts/promote-admin.ts <email>
 * Example: bun run scripts/promote-admin.ts chalermporn.po@gmail.com
 *
 * Requires in .env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
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
      // ignore
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/\r$/, "") ?? "";

async function main(): Promise<void> {
  const email = process.argv[2]?.trim();
  if (!email) {
    console.error("Usage: bun run scripts/promote-admin.ts <email>");
    console.error("Example: bun run scripts/promote-admin.ts user@example.com");
    process.exit(1);
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: users } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const authUser = users?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!authUser) {
    console.error("No Auth user found with email:", email);
    process.exit(1);
  }

  const { error } = await supabase
    .from("users")
    .upsert(
      {
        id: authUser.id,
        email: authUser.email ?? email,
        full_name: authUser.user_metadata?.full_name ?? null,
        role: "admin",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Failed to set admin:", error.message);
    process.exit(1);
  }

  console.log("Done. User", email, "is now admin. Refresh /admin");
}

main();
