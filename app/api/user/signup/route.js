import db from "@/lib/database";
import bcrypt from "bcrypt";
import { User } from "@/lib/schemas";
import { ok, fail } from "@/lib/api-response";
import { signupSchema, validate } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req) {
    try {
        const limit = rateLimit(`signup:${clientIp(req)}`, 5, 60 * 60 * 1000);
        if (!limit.ok) {
            return fail(`Too many attempts. Try again in ${limit.retryAfter}s.`, 429);
        }

        const parsed = validate(signupSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { fullName, username, email, password, university, semester, degree, course } = parsed.data;
        const normalizedUsername = username.toLowerCase();

        const existingEmail = await db.collection("users").findOne({ email });
        if (existingEmail) return fail("Email already exists", 400);

        const existingUser = await db.collection("users").findOne({ username: normalizedUsername });
        if (existingUser) return fail("Username already exists", 400);

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = new User(
            fullName, normalizedUsername, email, hashedPassword, university, semester, degree, course, "student"
        );
        await db.collection("users").insertOne(createdUser);

        return ok({ message: "User registered successfully", user: normalizedUsername }, 201);
    } catch (error) {
        console.error("Signup error:", error);
        return fail("Internal Server Error", 500);
    }
}
