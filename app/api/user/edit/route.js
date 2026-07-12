import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { sessionOptions } from "@/lib/session";
import db from "@/lib/database";
import { fail } from "@/lib/api-response";
import { editUserSchema, validate } from "@/lib/validation";

export async function POST(req) {
    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
        return fail("Unauthorized", 401);
    }

    try {
        const parsed = validate(editUserSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { currentUsername, username, fullName, university, semester, degree, course } = parsed.data;

        // A user may only edit their own account.
        if (session.user.username !== currentUsername) {
            return fail("Forbidden", 403);
        }

        const existingUser = await db.collection("users").findOne({ username: currentUsername });
        if (!existingUser) return fail("User not found", 404);

        if (currentUsername !== username) {
            const usernameTaken = await db.collection("users").findOne({ username });
            if (usernameTaken) return fail("Username already exists", 400);
        }

        await db.collection("users").updateOne(
            { username: currentUsername },
            {
                $set: {
                    username,
                    fullName,
                    "academicDetails.university": university,
                    "academicDetails.semester": semester,
                    "academicDetails.degree": degree,
                    "academicDetails.course": course,
                    avatarImg: `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(username)}&eyebrowsColor=ffffff&eyesColor=ffffff&mouthColor=ffffff&noseColor=ffffff&glassesColor=ffffff&backgroundColor=1d1d1d`,
                },
            }
        );

        // Keep the (slim) session in sync with the new username.
        session.user = { username, role: session.user.role };
        await session.save();

        return NextResponse.json(
            { success: true, message: "User data updated successfully" },
            { status: 200, headers: res.headers } // carries the refreshed Set-Cookie
        );
    } catch (error) {
        console.error("Update error:", error);
        return fail("Internal Server Error", 500);
    }
}
