import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: unknown) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: unknown) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  const isRootPage = req.nextUrl.pathname === "/";

  // If user is logged in and trying to access auth pages, redirect to home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If user is logged in and on root page, redirect to home
  if (session && isRootPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If user is not logged in and on root page, redirect to sign-in
  if (!session && isRootPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If user is not logged in and trying to access protected pages, redirect to sign-in
  if (!session && !isAuthPage && !isRootPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/play/:path*",
    "/favorites/:path*",
    "/watchlist/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
