import { NextResponse } from "next/server";
import db from "@/lib/database";
import { requireUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";
import { bookUploadSchema, validate } from "@/lib/validation";
import { rewards } from "@/public/data";

export async function POST(req) {
    try {
        const user = await requireUser();
        if (user instanceof NextResponse) return user;

        const parsed = validate(bookUploadSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { title, subject, semester, bookAuthor, university, url } = parsed.data;

        const newBook = {
            title,
            subject,
            semester,
            bookAuthor,
            author: user.username,
            university,
            url,
            likes: 0,
            createdAt: new Date(),
            solution: { isSolution: false, requestData: null },
        };

        const result = await db.collection("books").insertOne(newBook);

        await db.collection("users").updateOne(
            { _id: user._id },
            {
                $push: { "contributions.books": result.insertedId },
                $inc: { "contributions.count": 1, aura: rewards.book },
            }
        );

        return ok({ message: "Book uploaded successfully", insertedId: result.insertedId }, 201);
    } catch (error) {
        console.error("Book upload error:", error);
        return fail("Internal Server Error", 500);
    }
}
