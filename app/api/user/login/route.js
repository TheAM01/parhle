import db from "@/lib/database";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/get-session";
import { ok, fail } from "@/lib/api-response";
import { loginSchema, validate } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req) {
    try {
        const limit = rateLimit(`login:${clientIp(req)}`, 10, 15 * 60 * 1000);
        if (!limit.ok) {
            return fail(`Too many attempts. Try again in ${limit.retryAfter}s.`, 429);
        }

        const parsed = validate(loginSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { username, password } = parsed.data;
        const user = await db.collection("users").findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return fail("Invalid credentials", 400);
        }

        const session = await getSession();
        session.user = { username: user.username, role: user.role };
        await session.save();

        return ok({ message: "Logged in successfully", user: session.user }, 201);
    } catch (error) {
        console.error("Login error:", error);
        return fail("Internal Server Error", 500);
    }
}
