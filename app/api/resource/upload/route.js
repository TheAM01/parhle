// app/api/resources/upload/route.js
import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, subject, semester, teacher, author, university, resourceUrl } = await req.json();

        if (!title || !subject || !semester || !teacher || !university || !resourceUrl) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const collection = db.collection("resources");

        const newResource = {
            title,
            subject,
            semester,
            teacher,
            author,
            university,
            resourceUrl,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return NextResponse.json({ success: true, message: "Resource uploaded successfully", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
