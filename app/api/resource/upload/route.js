import { NextResponse } from "next/server";
import db from "@/lib/database";
import { requireUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";
import { resourceUploadSchema, validate } from "@/lib/validation";
import { rewards } from "@/public/data";

export async function POST(req) {
    try {
        const user = await requireUser();
        if (user instanceof NextResponse) return user;

        const parsed = validate(resourceUploadSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { title, subject, semester, teacher, university, url } = parsed.data;

        const newResource = {
            title,
            subject,
            semester,
            teacher,
            author: user.username,
            university,
            url,
            likes: 0,
            createdAt: new Date(),
            solution: { isSolution: false, requestData: null },
        };

        const result = await db.collection("resources").insertOne(newResource);

        await db.collection("users").updateOne(
            { _id: user._id },
            {
                $push: { "contributions.resources": result.insertedId },
                $inc: { "contributions.count": 1, aura: rewards.resource },
            }
        );

        return ok({ message: "Resource uploaded successfully", insertedId: result.insertedId }, 201);
    } catch (error) {
        console.error("Resource upload error:", error);
        return fail("Internal Server Error", 500);
    }
}
