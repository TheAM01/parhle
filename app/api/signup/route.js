// app/api/signup/route.js
import db from "@/lib/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { fullName, username, email, password, confirmPassword, university, semester, course } = await req.json();

        if ( !fullName || !username || !email || !password || !confirmPassword || !university || !semester || !course ) {
            return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
        }

        const same = password !== confirmPassword;
        if (same) {
            return NextResponse.json({ success: false, message: "Passwords mismatch" }, { status: 400 });
        }

        const existingEmail = await db.collection("users").findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("users").insertOne({ fullName, username, email, password: hashedPassword, university, semester, course, avatarImg: `https://ui-avatars.com/api/?background=000&color=fff&name=${fullName.replaceAll(" ", "+")}` });

        return NextResponse.json({ success: true, message: "User registered successfully", user: username }, { status: 201 });
    } catch (error) {
        console.error("Creation error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
