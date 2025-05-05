// app/api/resources/route.js
import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const collection = db.collection("resources");
        const allResources = await collection.find({}).toArray();
        return NextResponse.json(allResources, { status: 200 });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
