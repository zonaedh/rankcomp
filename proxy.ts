import { NextRequest, NextResponse } from "next/server";

// In-memory sliding window rate limiter for edge/server instances
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 35; // 35 requests/minute per client

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting strictly to /api routes
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (!rateLimit || now > rateLimit.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    } else {
      rateLimit.count += 1;
      if (rateLimit.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: "Too many audit requests. Please wait a minute before analyzing more domains.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": "60",
              "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetTime / 1000)),
            },
          }
        );
      }
    }

    // Clean up stale entries periodically
    if (rateLimitMap.size > 5000) {
      for (const [key, val] of rateLimitMap.entries()) {
        if (now > val.resetTime) rateLimitMap.delete(key);
      }
    }
  }

  return NextResponse.next();
}

export { proxy as middleware };

export const config = {
  matcher: ["/api/:path*"],
};
