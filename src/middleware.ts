import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages any visitor may view WITHOUT logging in. Everything else (dashboard,
// properties, property-details, profile, bidders, my-claims, reports, messaging,
// support, add/edit pages, etc.) requires a valid session — logged-out visitors
// are redirected to /login. API routes are NOT handled here; each API route does
// its own check (session / shared secret / intentionally public).
const PUBLIC_PATHS = [
  "/",                 // landing page
  "/about",
  "/faq",
  "/contact",
  "/news",
  "/privacy-policy",
  "/terms-condition",
  "/login",
  "/register",
  "/verify-otp",
  "/logout",
  "/auth",             // /auth/invite-login (magic-link landing)
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // send them back after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all page routes; skip API, Next internals, and static assets
  // (anything with a file extension, plus the /assets folder).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.).*)",
  ],
};
