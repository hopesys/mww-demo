import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isApply = request.nextUrl.pathname.startsWith("/apply");
  const isLogin = request.nextUrl.pathname.startsWith("/login");

  if (isApply && !user) {
    const redirectTo = new URL("/login", request.url);
    redirectTo.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectTo);
  }

  if (isLogin && user) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const destination = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/apply";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/apply/:path*", "/login"],
};
