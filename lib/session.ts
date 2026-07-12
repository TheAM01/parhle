import type { SessionOptions } from "iron-session";

/** Minimal identity we persist in the encrypted session cookie. */
export interface SessionUser {
    username: string;
    role: string;
}

export interface SessionData {
    user?: SessionUser;
}

const password = process.env.SESSION_PASSWORD;
if (!password || password.length < 32) {
    throw new Error(
        "❌ SESSION_PASSWORD is missing or shorter than 32 characters. Set it in .env.local (see .env.example)."
    );
}

export const sessionOptions: SessionOptions = {
    password,
    cookieName: "s-connect-id",
    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    },
};
