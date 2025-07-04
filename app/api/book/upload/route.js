import { NextResponse } from "next/server";
import db from "@/lib/database";
import {getSession} from "@/lib/get-session";
import {rewards} from "@/public/data";

export async function POST(req) {
    try {
        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const author = session.user;

        const body = await req.json();
        const { title, subject, semester, bookAuthor, university, url } = body;

        if (!title || !subject || !semester || !bookAuthor || !author || !university || !url) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const collection = db.collection("books");

        const newBook = {
            title,
            subject,
            semester,
            bookAuthor,
            author: author.username,
            university,
            url,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newBook);
        const id = result.insertedId;

        const user = await db.collection("users").findOne({username: author.username})

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $push: { 'contributions.books': id },
                $inc: {
                    'contributions.count': 1,
                    aura: rewards.book
                }
            }
        );

        return NextResponse.json(
            { success: true, message: "Book uploaded successfully", insertedId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
