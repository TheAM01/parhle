import db from "@/utils/database";

export default async function upload(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("channels");

        const { title, subject, author, university, description, url } = req.body;


        if (!title || !subject || !author || !university || !description || !url) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newResource = {
            title,
            subject,
            author,
            university,
            description,
            url,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return res.status(201).json({ success: true, message: "Video uploaded successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
