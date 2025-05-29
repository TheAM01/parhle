import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import db from "@/lib/database";
import { NextResponse } from "next/server";
import {getSession} from "@/lib/get-session";


export async function POST(req) {

    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { currentUsername, username, fullName, university, semester, degree, course } = await req.json();
        // return console.log({ currentUsername, username, fullName, university, semester, degree, course })
        // Validate required fields
        if (!currentUsername || !username || !fullName || !university || !semester || !degree || !course) {
            return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
        }

        // Check if current user exists
        const existingUser = await db.collection("users").findOne({ username: currentUsername });
        if (!existingUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Check if new username is already taken (by someone else)
        if (currentUsername !== username) {
            const usernameTaken = await db.collection("users").findOne({ username });
            if (usernameTaken) {
                return NextResponse.json({ success: false, message: "Username already exists" }, { status: 400 });
            }
        }

        // Perform update
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
                    avatarImg: `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(username)}&eyebrowsColor=ffffff&eyesColor=ffffff&mouthColor=ffffff&noseColor=ffffff&glassesColor=ffffff&backgroundColor=1d1d1d`
                }
            }
        );

        const newUser = await db.collection("users").findOne({username});

        const session = await getSession();
        session.user = newUser;
        await session.save();

        return NextResponse.json({ success: true, message: "User data updated successfully" }, {
            status: 200,
            headers: res.headers, // ⚠️ Important: carries the Set-Cookie
        });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
