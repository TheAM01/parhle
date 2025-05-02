import db from "@/lib/database";

export default async function all(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("resources");
        const allResources = await collection.find({}).toArray();
        return res.status(200).json(allResources);
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}