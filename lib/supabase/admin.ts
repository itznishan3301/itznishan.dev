import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for admin operations.
 * NEVER expose this to the browser.
 * Only use in server actions, API routes, or server components.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Check if a user email is the admin.
 */
export function isAdmin(email: string | undefined): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "itznishan3301@gmail.com";
  return email === adminEmail;
}
