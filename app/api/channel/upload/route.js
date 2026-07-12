import { NextResponse } from "next/server";
import db from "@/lib/database";
import { requireUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";
import { channelUploadSchema, validate } from "@/lib/validation";
import { rewards } from "@/public/data";

export async function POST(req) {
    try {
        const user = await requireUser();
        if (user instanceof NextResponse) return user;

        const parsed = validate(channelUploadSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { title, subject, university, description, url } = parsed.data;

        const newChannel = {
            title,
            subject,
            author: user.username,
            university,
            description,
            url,
            likes: 0,
            createdAt: new Date(),
            solution: {
                isSolution: false,
                requestData: null,
            },
        };

        const result = await db.collection("channels").insertOne(newChannel);

        await db.collection("users").updateOne(
            { _id: user._id },
            {
                $push: { "contributions.channels": result.insertedId },
                $inc: { "contributions.count": 1, aura: rewards.channel },
            }
        );

        return ok({ message: "Video uploaded successfully", insertedId: result.insertedId }, 201);
    } catch (error) {
        console.error("Channel upload error:", error);
        return fail("Internal Server Error", 500);
    }
}
