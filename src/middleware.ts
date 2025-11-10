import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Simple cookie-based auth check (faster and no network calls)
  const hasAuthCookie = req.cookies.has("sb-vzpqfyipmbrsmlkthlms-auth-token");

  // Protect specific routes
  if (
    pathname.startsWith("/home") ||
    pathname.startsWith("/play") ||
    pathname.startsWith("/tv-shows") ||
    pathname.startsWith("/movies") ||
    pathname.startsWith("/new-and-popular") ||
    pathname.startsWith("/my-list") ||
    pathname.startsWith("/browse-by-language")
  ) {
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Redirect root to appropriate page
  if (pathname === "/") {
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    // Let unauthenticated users see the landing page
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/play/:path*",
    "/tv-shows/:path*",
    "/movies/:path*",
    "/new-and-popular/:path*",
    "/my-list/:path*",
    "/browse-by-language/:path*",
  ],
};
