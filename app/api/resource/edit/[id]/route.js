import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import db from "@/lib/database";
import { NextResponse } from "next/server";
import {ObjectId} from "mongodb";


export async function POST(req, {params}) {
    const {id} = await params;
    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: "Invalid resource ID" }, { status: 400 });
    }

    try {
        const { title, subject, semester, teacher, university, url } = await req.json();

        if (!title || !subject || !semester || !teacher || !university || !url) {
            return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
        }

        const existingResource = await db.collection("resources").findOne({ _id: new ObjectId(id) });
        if (!existingResource) {
            return NextResponse.json({ success: false, message: "Resource not found" }, { status: 404 });
        }

        // Perform update
        await db.collection("resources").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    title,
                    subject,
                    semester,
                    teacher,
                    university,
                    url
                }
            }
        );

        return NextResponse.json({ success: true, message: "Resource data updated successfully" }, {
            status: 200,
        });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
