import db from "@/lib/database";
import { NextResponse } from "next/server";
import {getSession} from "@/lib/get-session";
import {rewards} from "@/public/data";

export async function POST(req) {
    try {

        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const author = session.user;

        const { title, subject, semester, teacher, university, url } = await req.json();

        if (!title || !subject || !semester || !teacher || !university || !url) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const collection = db.collection("resources");

        const newResource = {
            title,
            subject,
            semester,
            teacher,
            author: author.username,
            university,
            url,
            likes: 0,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);
        const id = result.insertedId;

        const user = await db.collection("users").findOne({username: author.username})

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $push: { 'contributions.resources': id },
                $inc: {
                    'contributions.count': 1,
                    aura: rewards.resource
                }
            }
        );

        return NextResponse.json({ success: true, message: "Resource uploaded successfully", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
