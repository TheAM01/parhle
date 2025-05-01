import db from "@/utils/database";

export default async function all(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("channels");
        const allChannels = await collection.find({}).toArray();
        console.log(allChannels)
        return res.status(200).json(allChannels);
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}