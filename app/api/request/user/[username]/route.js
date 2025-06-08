import db from "@/lib/database";
import { NextResponse } from "next/server";
import {ObjectId} from "mongodb";

export async function GET(_, { params }) {
    const { username } = await params;

    try {
        const user = await db.collection("users").findOne({username});

        const requested = await db.collection("requests").find({ author: username }).toArray();
        const solved = [];
        const solvedIds = user.contributions.requests.solved;

        for (const sol of solvedIds) {
            solved.push(
                await db.collection("requests").findOne({_id: new ObjectId(sol)})
            );
        }

        return NextResponse.json({requested, solved}, { status: 200 });
    } catch (error) {
        console.error("Error fetching user resources:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}