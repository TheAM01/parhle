// app/api/login/route.js
import db from "@/lib/database";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/get-session";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        const user = await db.collection("users").findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 400 });
        }

        const session = await getSession();
        session.user = { email: user.email, username: user.username };
        await session.save();

        return NextResponse.json({ success: true, message: "Logged in successfully", user: session.user }, { status: 201 });
    } catch (error) {
        console.error("Creation error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
