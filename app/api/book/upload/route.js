import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, subject, semester, bookAuthor, author, university, bookUrl } = body;

        if (!title || !subject || !semester || !bookAuthor || !author || !university || !bookUrl) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const collection = db.collection("books");

        const newResource = {
            title,
            subject,
            semester,
            bookAuthor,
            author,
            university,
            bookUrl,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return NextResponse.json(
            { success: true, message: "Book uploaded successfully", insertedId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
