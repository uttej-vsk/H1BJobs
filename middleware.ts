import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/(auth)/lib/session";

// Authentication routes
const protectedRoutes = ["/jobs", "/post-job"];
const publicRoutes = ["/login", "/signup", "/"];

// Public asset paths that should always be accessible
const publicAssetPaths = [
  "/images/",
  "/assets/",
  "/fonts/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

const allAvailableRoutes = [...protectedRoutes, ...publicRoutes];

// Security: List of suspicious user agents (old Chrome versions)
const SUSPICIOUS_USER_AGENTS = [
  /Chrome\/39/,
  /Chrome\/40/,
  /Chrome\/41/,
  /Chrome\/42/,
  /Chrome\/43/,
  /Chrome\/44/,
  /Chrome\/45/,
  /Chrome\/46/,
  /Chrome\/47/,
  /Chrome\/48/,
  /Chrome\/49/,
  /Chrome\/50/,
  /Chrome\/51/,
  /Chrome\/52/,
  /Chrome\/53/,
  /Chrome\/54/,
  /Chrome\/55/,
  /Chrome\/56/,
  /Chrome\/57/,
  /Chrome\/58/,
  /Chrome\/59/,
  /Chrome\/60/,
  /Chrome\/61/,
  /Chrome\/62/,
  /Chrome\/63/,
  /Chrome\/64/,
  /Chrome\/65/,
  /Chrome\/66/,
  /Chrome\/67/,
  /Chrome\/68/,
  /Chrome\/69/,
  /Chrome\/70/,
  /Chrome\/71/,
  /Chrome\/72/,
  /Chrome\/73/,
  /Chrome\/74/,
  /Chrome\/75/,
  /Chrome\/76/,
  /Chrome\/77/,
  /Chrome\/78/,
  /Chrome\/79/,
  /Chrome\/80/,
  /Chrome\/81/,
  /Chrome\/82/,
  /Chrome\/83/,
  /Chrome\/84/,
  /Chrome\/85/,
  /Chrome\/86/,
  /Chrome\/87/,
  /Chrome\/88/,
  /Chrome\/89/,
  /Chrome\/90/,
  /Chrome\/91/,
  /Chrome\/92/,
  /Chrome\/93/,
  /Chrome\/94/,
  /Chrome\/95/,
  /Chrome\/96/,
  /Chrome\/97/,
  /Chrome\/98/,
  /Chrome\/99/,
  /Chrome\/100/,
  /Chrome\/101/,
  /Chrome\/102/,
  /Chrome\/103/,
  /Chrome\/104/,
  /Chrome\/105/,
  /Chrome\/106/,
  /Chrome\/107/,
  /Chrome\/108/,
  /Chrome\/109/,
  /Chrome\/110/,
  /Chrome\/111/,
  /Chrome\/112/,
  /Chrome\/113/,
  /Chrome\/114/,
  /Chrome\/115/,
  /Chrome\/116/,
  /Chrome\/117/,
  /Chrome\/118/,
  /Chrome\/119/,
  /Chrome\/120/,
  /Chrome\/121/,
  /Chrome\/122/,
  /Chrome\/123/,
  /Chrome\/124/,
  /Chrome\/125/,
  /Chrome\/126/,
  /Chrome\/127/,
  /Chrome\/128/,
  /Chrome\/129/,
  /Chrome\/130/,
  /Chrome\/131/,
  /Chrome\/132/,
  /Chrome\/133/,
];

// Helper function to add security headers
function addSecurityHeaders(response: NextResponse): NextResponse {
  const headers = response.headers;

  // Add security headers
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  headers.set("Cache-Control", "max-age=300, immutable");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

// Helper function to check if path is allowed
function isPathAllowed(path: string): boolean {
  if (publicAssetPaths.some((assetPath) => path.startsWith(assetPath))) {
    return true;
  }
  return allAvailableRoutes.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`)
  );
}

// Helper function to create error response
function createErrorResponse(
  status: number,
  message: string,
  headers: Record<string, string> = {}
): NextResponse {
  return new NextResponse(
    JSON.stringify({
      error: message,
      status,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      statusText: message,
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff",
        ...headers,
      },
    }
  );
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const userAgent = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Security: Check if path is allowed
  if (!isPathAllowed(path)) {
    console.log(
      `Blocked request to ${path} from ${ip} with user agent ${userAgent}`
    );
    return createErrorResponse(403, "Access forbidden");
  }

  // Security: Check for suspicious user agents
  const isSuspiciousUserAgent = SUSPICIOUS_USER_AGENTS.some((pattern) =>
    pattern.test(userAgent)
  );
  if (isSuspiciousUserAgent) {
    console.log(`Blocked suspicious user agent: ${userAgent}`);
    return createErrorResponse(403, "Suspicious user agent detected");
  }

  // Authentication: Check protected and public routes
  const isProtectedRoutes = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);

  const session = (await cookies()).get("session")?.value;
  const decyrpted_session = await decrypt(session);

  let response: NextResponse;

  if (isProtectedRoutes && !decyrpted_session?.userId) {
    response = NextResponse.redirect(new URL("/login", req.nextUrl));
  } else if (isPublicRoutes && decyrpted_session?.userId) {
    response = NextResponse.redirect(new URL("/", req.nextUrl));
  } else {
    response = NextResponse.next();
  }

  // Add security headers to all responses
  return addSecurityHeaders(response);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|images|fonts).*)",
  ],
};
