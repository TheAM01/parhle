import db from "@/lib/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import {User} from "@/lib/schemas";

export async function POST(req) {
    try {
        const { fullName, username, email, password, confirmPassword, university, semester, degree, course } = await req.json();

        if ( !fullName || !username || !email || !password || !confirmPassword || !university || !semester || !degree || !course ) {
            return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
        }

        const same = password !== confirmPassword;
        if (same) {
            return NextResponse.json({ success: false, message: "Passwords mismatch" }, { status: 400 });
        }

        const existingEmail = await db.collection("users").findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
        }

        const existingUser = await db.collection("users").findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "Username already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new User(fullName, username.toLowerCase(), email, hashedPassword, university, semester, degree, course, "student")
        await db.collection("users").insertOne(createdUser);

        return NextResponse.json({ success: true, message: "User registered successfully", user: username }, { status: 201 });
    } catch (error) {
        console.error("Creation error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
