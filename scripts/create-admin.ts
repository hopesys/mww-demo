/**
 * Create admin user in Supabase Auth and set role in public.users.
 * Run once: bun run scripts/create-admin.ts
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (from Supabase Dashboard → Settings → API → service_role)
 *
 * Login: admin@mww.local / P@ssw0rd
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ADMIN_EMAIL = "admin@mww.local";
const ADMIN_PASSWORD = "P@ssw0rd";
const ADMIN_DISPLAY_NAME = "Admin";

async function main(): Promise<void> {
  if (!SUPABASE_URL?.trim()) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL in environment.");
    process.exit(1);
  }
  if (!SERVICE_ROLE_KEY?.trim()) {
    console.error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Get it from Supabase Dashboard → Settings → API → service_role (secret)."
    );
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
      const { data: existing } = await supabase.auth.admin.listUsers();
      const adminUser = existing?.users?.find((u) => u.email === ADMIN_EMAIL);
      if (adminUser) {
        await ensureAdminRole(supabase, adminUser.id);
        console.log("Admin already exists. Updated public.users role to admin.");
        console.log("Login: %s / %s", ADMIN_EMAIL, ADMIN_PASSWORD);
        return;
      }
    }
    console.error("Failed to create admin user:", createError.message);
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
