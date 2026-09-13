import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  // getUser() is recommended over getSession() for server-side
  await supabase.auth.getUser();

  // Admin route protection
  const url = request.nextUrl.clone();
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isAuthRoute = url.pathname.startsWith("/auth");

  if (isAdminRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Not authenticated — redirect to login
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Check if user is admin
    const adminEmail = process.env.ADMIN_EMAIL || "itznishan3301@gmail.com";
    if (user.email !== adminEmail) {
      // Authenticated but not admin — redirect to home
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
