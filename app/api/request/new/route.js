// app/api/requests/route.js
import db from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, subject, university,  semester, resourceType, author, priority, description } = await req.json();

        if (!title || !subject || !university || !semester || !resourceType || !author || !priority || !description) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const collection = db.collection("requests");

        const newRequest = {
            title,
            subject,
            university,
            semester,
            resourceType,
            author,
            priority,
            description,
            createdAt: new Date(),
        };
        // return console.log(newRequest)
        const result = await collection.insertOne(newRequest);

        return NextResponse.json({ success: true, message: "Request added successfully", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error adding request:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
