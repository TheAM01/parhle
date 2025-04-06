import db from "@/utils/database";

export default async function newRequest(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("requests");

        const { title, subject, semester, resourceType, priority, description } = req.body;

        if ( !title || !subject || !semester || !resourceType || !priority || !description) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newResource = {
            title,
            subject,
            semester,
            resourceType,
            priority,
            description,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return res.status(201).json({ success: true, message: "Request added successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
