import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title, subject, author, university, description, url } = await req.json();

    if (!title || !subject || !author || !university || !description || !url) {
        return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    try {
        const collection = db.collection("channels");

        const newResource = {
            title,
            subject,
            author,
            university,
            description,
            url,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return NextResponse.json({ success: true, message: "Video uploaded successfully", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
