import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for redirects and security
 *
 * Features:
 * - WWW to non-WWW redirect (301 permanent)
 * - Security headers enforcement
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host");

  // Redirect www to non-www (301 permanent redirect)
  if (hostname?.startsWith("www.")) {
    url.host = hostname.replace("www.", "");
    url.protocol = "https";

    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Continue with request
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)).*)",
  ],
};
