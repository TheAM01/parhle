// lib/getSession.js
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";
import { cookies } from "next/headers";

export async function getSession() {
    const session = await getIronSession(cookies(), sessionOptions);
    return session;
}
