import db from "@/lib/database";

export async function GET() {
    try {
        const collection = db.collection("books");
        const allBooks = await collection.find({}).toArray();



        return Response.json(allBooks, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
