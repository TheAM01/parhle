import db from "@/lib/database";
import {ObjectId} from "mongodb";

export async function GET(req, {params}) {

    const {id} = await params;

    try {

        const collection = db.collection("channels");
        const book = await collection.findOne({_id: new ObjectId(id)})
        return Response.json(book, { status: 200 });

    } catch (error) {
        console.error("Fetch error:", error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
