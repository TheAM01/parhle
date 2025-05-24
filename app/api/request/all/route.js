// app/api/books/route.js
import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const collection = db.collection("requests");
        const allResources = await collection.find({}).toArray();
        return NextResponse.json(allResources);
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
