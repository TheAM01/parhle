import db from "@/lib/database";
import { ok, fail } from "@/lib/api-response";
import { requestNewSchema, validate } from "@/lib/validation";

export async function POST(req) {
    try {
        const parsed = validate(requestNewSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { title, subject, university, semester, resourceType, author, priority, description } = parsed.data;

        const newRequest = {
            title,
            subject,
            university,
            semester,
            resourceType,
            author,
            priority,
            description,
            status: "Open",
            createdAt: new Date(),
        };

        const result = await db.collection("requests").insertOne(newRequest);

        if (author !== "anonymous") {
            // Best-effort: legacy users may have contributions.requests stored as
            // an array, which makes this dotted push fail. Don't let request
            // tracking fail the creation itself.
            try {
                await db.collection("users").updateOne(
                    { username: author },
                    { $push: { "contributions.requests.created": result.insertedId } }
                );
            } catch (err) {
                console.warn("Could not record created request (legacy contributions shape):", err.message);
            }
        }

        return ok({ message: "Request added successfully", insertedId: result.insertedId }, 201);
    } catch (error) {
        console.error("Error adding request:", error);
        return fail("Internal Server Error", 500);
    }
}
