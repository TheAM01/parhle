// app/api/login/route.js
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/getSession";

export async function POST(req) {
    const { email, password } = await req.json();
    const user = await db.collection("users").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const session = await getSession();
    session.user = { email };
    await session.save();

    return new Response(JSON.stringify({ message: "Logged in" }), { status: 200 });
}
