import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function GET() {
    try {
        const collection = db.collection("channels");
        const allChannels = await collection.find({}).toArray();
        console.log(allChannels);
        return NextResponse.json(allChannels, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
