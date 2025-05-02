// app/api/signup/route.js
import db from "@/lib/database";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { email, password } = await req.json();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
}
