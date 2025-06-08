import db from "@/lib/database";

export async function GET() {
    try {
        const collection = db.collection("books");
        const allBooks = await collection.find({}).toArray();

        const allChannels = await db.collection("channels").find({}).toArray();
        // for (const channel of allChannels) {
        //
        //     await db.collection("users").updateOne(
        //        {username: channel.author},
        //         {
        //             $push: { "contributions.channels": channel._id },
        //             $inc: { "contributions.count": 1 }
        //         }
        //     );
        // }


        return Response.json(allBooks, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
