import db from "@/lib/database";

export async function GET() {
    try {
        const collection = db.collection("users");

        await collection.updateMany(
            {
                "academicDetails.semester": { $lt: 8 }
            },
            {
                $inc: {
                    "academicDetails.semester": 1
                }
            }
        )

        return Response.json("Success", { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
