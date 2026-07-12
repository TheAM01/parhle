import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import db from "@/lib/database";
import { requireUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";
import { rewards } from "@/public/data";
import { CONTENT_COLLECTION } from "@/lib/content";
import { bookUploadSchema, resourceUploadSchema, channelUploadSchema, validate } from "@/lib/validation";

const SCHEMA = {
    resource: resourceUploadSchema,
    book: bookUploadSchema,
    channel: channelUploadSchema,
};

function buildDoc(type, data, username, requestId) {
    const solution = { isSolution: true, requestData: requestId };
    if (type === "book") {
        return { title: data.title, subject: data.subject, semester: data.semester, bookAuthor: data.bookAuthor, author: username, university: data.university, url: data.url, likes: 0, createdAt: new Date(), solution };
    }
    if (type === "channel") {
        return { title: data.title, subject: data.subject, author: username, university: data.university, description: data.description, url: data.url, likes: 0, createdAt: new Date(), solution };
    }
    return { title: data.title, subject: data.subject, semester: data.semester, teacher: data.teacher, author: username, university: data.university, url: data.url, likes: 0, createdAt: new Date(), solution };
}

// Best-effort: legacy users may have contributions.requests stored as an array
// (schema drift) which makes the dotted $addToSet fail. Don't let request
// tracking sink the whole fulfilment.
async function recordSolved(userId, requestId) {
    try {
        await db.collection("users").updateOne(
            { _id: userId },
            { $addToSet: { "contributions.requests.solved": requestId } }
        );
    } catch (err) {
        console.warn("Could not record solved request (legacy contributions shape):", err.message);
    }
}

export async function POST(req, { params }) {
    try {
        const user = await requireUser();
        if (user instanceof NextResponse) return user;

        const { id } = await params;
        if (!ObjectId.isValid(id)) return fail("Invalid request id", 400);

        const request = await db.collection("requests").findOne({ _id: new ObjectId(id) });
        if (!request) return fail("Request not found", 404);
        if ((request.status || "").toLowerCase() === "closed") return fail("This request has already been fulfilled", 400);

        const type = (request.resourceType || "").toLowerCase();
        const collectionName = CONTENT_COLLECTION[type];
        if (!collectionName) return fail("Unknown request type", 400);

        const requestId = request._id;
        const priority = (request.priority || "low").toLowerCase();
        const bonus = rewards.request?.[priority] ?? 0;

        const body = await req.json();
        const mode = body.mode === "link" ? "link" : "new";

        let contentId;

        if (mode === "link") {
            if (!ObjectId.isValid(body.contentId)) return fail("Please select one of your uploads", 400);
            const content = await db.collection(collectionName).findOne({ _id: new ObjectId(body.contentId) });
            if (!content) return fail("Selected content not found", 404);
            if (content.author !== user.username) return fail("You can only link your own uploads", 403);

            contentId = content._id;
            await db.collection(collectionName).updateOne(
                { _id: contentId },
                { $set: { solution: { isSolution: true, requestData: requestId } } }
            );
            // Linking already-uploaded content only earns the request bonus
            // (the upload reward was granted when it was first added).
            await db.collection("users").updateOne(
                { _id: user._id },
                { $inc: { aura: bonus } }
            );
            await recordSolved(user._id, requestId);
        } else {
            const parsed = validate(SCHEMA[type], body);
            if (!parsed.success) return fail(parsed.message, 400);

            const doc = buildDoc(type, parsed.data, user.username, requestId);
            const result = await db.collection(collectionName).insertOne(doc);
            contentId = result.insertedId;

            await db.collection("users").updateOne(
                { _id: user._id },
                {
                    $push: { [`contributions.${collectionName}`]: contentId },
                    $inc: { "contributions.count": 1, aura: (rewards[type] ?? 0) + bonus },
                }
            );
            await recordSolved(user._id, requestId);
        }

        await db.collection("requests").updateOne(
            { _id: requestId },
            { $set: { solution: contentId, status: "Closed", solvedAt: new Date() } }
        );

        return ok({ message: "Request fulfilled successfully", insertedId: contentId }, 201);
    } catch (error) {
        console.error("Fulfill error:", error);
        return fail("Internal Server Error", 500);
    }
}
