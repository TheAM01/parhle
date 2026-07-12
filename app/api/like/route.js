import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import db from "@/lib/database";
import { requireUser, getCurrentUser } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";
import { likeSchema, validate } from "@/lib/validation";
import { CONTENT_COLLECTION } from "@/lib/content";

const EMPTY = { resources: [], books: [], channels: [] };

// GET /api/like -> the current user's liked ids per type (empty sets when logged out).
// Public listing pages call this once to render the correct heart state.
export async function GET() {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ loggedIn: false, ...EMPTY });

    const liked = user.likedItems ?? EMPTY;
    return NextResponse.json({
        loggedIn: true,
        resources: (liked.resources ?? []).map(String),
        books: (liked.books ?? []).map(String),
        channels: (liked.channels ?? []).map(String),
    });
}

// POST /api/like { type, id } -> toggles the like. Updates the user's likedItems
// bucket, the content's like count, and the author's receivedLikes (self-likes
// don't inflate receivedLikes).
export async function POST(req) {
    try {
        const user = await requireUser();
        if (user instanceof NextResponse) return user;

        const parsed = validate(likeSchema, await req.json());
        if (!parsed.success) return fail(parsed.message, 400);

        const { type, id } = parsed.data;
        if (!ObjectId.isValid(id)) return fail("Invalid content id", 400);

        const collectionName = CONTENT_COLLECTION[type];
        const bucket = collectionName; // likedItems keys mirror the collection names
        const contentId = new ObjectId(id);

        const content = await db.collection(collectionName).findOne({ _id: contentId });
        if (!content) return fail("Content not found", 404);

        const likedIds = (user.likedItems?.[bucket] ?? []).map(String);
        const alreadyLiked = likedIds.includes(id);
        const delta = alreadyLiked ? -1 : 1;

        await db.collection("users").updateOne(
            { _id: user._id },
            alreadyLiked
                ? { $pull: { [`likedItems.${bucket}`]: contentId } }
                : { $addToSet: { [`likedItems.${bucket}`]: contentId } }
        );

        await db.collection(collectionName).updateOne(
            { _id: contentId },
            { $inc: { likes: delta } }
        );

        if (content.author && content.author !== user.username) {
            await db.collection("users").updateOne(
                { username: content.author },
                { $inc: { receivedLikes: delta } }
            );
        }

        const likes = Math.max(0, (content.likes ?? 0) + delta);
        return ok({ liked: !alreadyLiked, likes });
    } catch (error) {
        console.error("Like error:", error);
        return fail("Internal Server Error", 500);
    }
}
