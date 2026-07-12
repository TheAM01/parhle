import type { NextResponse } from "next/server";
import type { WithId, Document } from "mongodb";
import db from "./database";
import { getSession } from "./get-session";
import { fail } from "./api-response";

/**
 * Resolve the current user from the session cookie, then re-read the fresh
 * record from the database. Role/permission decisions must use THIS record,
 * never the cookie, so a demotion takes effect immediately. Returns null when
 * there is no valid session or the user no longer exists.
 */
export async function getCurrentUser(): Promise<WithId<Document> | null> {
    const session = await getSession();
    const username = session.user?.username;
    if (!username) return null;

    const user = await db.collection("users").findOne({ username });
    if (!user) return null;

    delete (user as Record<string, unknown>).password;
    return user;
}

/** Returns the current user, or a 401 response to short-circuit the handler. */
export async function requireUser(): Promise<WithId<Document> | NextResponse> {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);
    return user;
}

/** Returns the current admin user, or a 401/403 response. */
export async function requireAdmin(): Promise<WithId<Document> | NextResponse> {
    const user = await getCurrentUser();
    if (!user) return fail("Unauthorized", 401);
    if (user.role !== "admin") return fail("Forbidden", 403);
    return user;
}
