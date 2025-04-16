import db from "@/utils/database";

export default async function upload(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("videos");

        const { title, subject, author, university, description, videoUrl } = req.body;

        console.log({ title, subject, author, university, description, videoUrl })

        if (!title || !subject || !author || !university || !description || !videoUrl) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newResource = {
            title,
            subject,
            author,
            university,
            description,
            videoUrl,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return res.status(201).json({ success: true, message: "Video uploaded successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
