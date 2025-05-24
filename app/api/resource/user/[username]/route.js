import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { username } = await params;

    try {
        const resources = await db.collection("resources").find({ author: username }).toArray();
        return NextResponse.json(resources, { status: 200 });
    } catch (error) {
        console.error("Error fetching user resources:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
