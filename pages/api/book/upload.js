import db from "@/lib/database";

export default async function upload(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const collection = db.collection("books");

        const { title, subject, semester, bookAuthor, author, university, bookUrl } = req.body;

        if (!title || !subject || !semester || !bookAuthor || !author || !university || !bookUrl) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newResource = {
            title,
            subject,
            semester,
            bookAuthor,
            author,
            university,
            bookUrl,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newResource);

        return res.status(201).json({ success: true, message: "Book uploaded successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
