// lib/getSession.js
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";
import { cookies } from "next/headers";

export async function getSession() {
    let cookie = await cookies()
    const session = await getIronSession(cookie, sessionOptions);
    return session;
}
