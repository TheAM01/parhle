import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";
import { sessionOptions, type SessionData } from "@/lib/session";

/**
 * Defense-in-depth auth gate (Next.js 16 "proxy" convention, formerly
 * "middleware"). Presence-only: the edge runtime has no DB access, so role
 * checks still happen inside each route/page via requireAdmin.
 *
 *  - /dashboard/*  → redirect to login when there is no session
 *  - /api/* writes → 401 JSON when there is no session
 *    (login/signup/logout are intentionally left open)
 */
const OPEN_API_PATHS = new Set([
    "/api/user/login",
    "/api/user/signup",
    "/api/user/logout",
    "/api/request/new", // anonymous visitors may submit resource requests
]);

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const isLoggedIn = Boolean(session.user?.username);

    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            const loginUrl = new URL("/user/login", req.url);
            loginUrl.searchParams.set("login-first", "true");
            loginUrl.searchParams.set("redirect-to", pathname.replace(/^\//, ""));
            return NextResponse.redirect(loginUrl);
        }
        return res;
    }

    if (pathname.startsWith("/api")) {
        const isWrite = req.method !== "GET" && req.method !== "HEAD";
        if (isWrite && !OPEN_API_PATHS.has(pathname) && !isLoggedIn) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};
