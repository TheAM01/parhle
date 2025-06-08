import db from "@/lib/database";
import { NextResponse } from "next/server";
import {getIronSession} from "iron-session";
import {sessionOptions} from "@/lib/session";
import {ObjectId} from "mongodb";
import {priorities, rewards} from "@/public/data";

export async function POST(req, {params}) {

    const {id} = await params;
    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: "Invalid channel ID" }, { status: 400 });
    }

    const body = await req.json();

    const { type } = body
    if (type !== "resource" && type !== "book" && type !== "channel") return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });

    // return await updateUsers(db)
    // return console.log(body.request)

    try {

        let result;
        if (type === "resource") {
            result = await handleResourceUpload(body, session);
        } else if (type === "channel") {
            result = await handleChannelUpload(body, session);
        } else {
            result = await handleBookUpload(body, session);
        }

        const { request } = body;

        await db.collection("requests").updateOne(
            {_id: new ObjectId(request._id)},
            {
                $set: {
                    "solution": result.insertedId,
                    'status': 'Closed',
                    'solvedAt': new Date(),
                }
            }
        )

        return NextResponse.json({ success: true, message: "Request fulfilled successfully", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

async function handleResourceUpload(body, session) {
    try {
        const author = session.user;

        const {title, subject, semester, teacher, university, url} = body;

        if (!title || !subject || !semester || !teacher || !university || !url) {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }

        const collection = db.collection("resources");

        const newResource = {
            title,
            subject,
            semester,
            teacher,
            author: author.username,
            university,
            url,
            likes: 0,
            createdAt: new Date(),
            solution: {
                isSolution: true,
                requestData: new ObjectId(body.request._id),
            }
        };

        const result = await collection.insertOne(newResource);
        const id = result.insertedId;

        const user = await db.collection("users").findOne({username: author.username})

        if (!user) {
            return NextResponse.json({success: false, message: "User not found"}, {status: 404});
        }

        await db.collection('users').updateOne(
            {_id: user._id},
            {
                $push: {
                    'contributions.resources': id,
                    'contributions.requests.solved': new ObjectId(body.request._id)
                },
                $inc: {
                    'contributions.count': 1,
                    'aura': (rewards[body.type] + rewards.request[body.request.priority.toLowerCase()])
                },
            }
        );

        return result;
    } catch (error) {
        console.error(error)
    }
}

async function handleBookUpload(body, session) {
    try {
        const author = session.user;

        const {title, subject, semester, bookAuthor, university, url} = body

        if (!title || !subject || !semester || !bookAuthor || !university || !url) {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }

        const collection = db.collection("books");

        const newBook = {
            title,
            subject,
            semester,
            bookAuthor,
            author: author.username,
            university,
            url,
            createdAt: new Date(),
            solution: {
                isSolution: true,
                requestData: new ObjectId(body.request._id),
            }
        };

        const result = await collection.insertOne(newBook);
        const id = result.insertedId;

        const user = await db.collection("users").findOne({username: author.username})

        if (!user) {
            return NextResponse.json({success: false, message: "User not found"}, {status: 404});
        }

        await db.collection('users').updateOne(
            {_id: user._id},
            {
                $push: {
                    'contributions.books': id,
                    'contributions.requests.solved': new ObjectId(body.request._id)
                },
                $inc: {
                    'contributions.count': 1,
                    'aura': (rewards[body.type] + rewards.request[body.request.priority.toLowerCase()])
                },
            }
        );
        return result;
    } catch (error) {
        console.error(error)
    }

}

async function handleChannelUpload(body, session) {
    try {
        const author = session.user;
        const { title, subject, university, description, url } = body;
        if (!title || !subject || !university || !description || !url) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        const collection = db.collection("channels");

        const newChannel = {
            title,
            subject,
            author: author.username,
            university,
            description,
            url,
            createdAt: new Date(),
            solution: {
                isSolution: true,
                requestData: new ObjectId(body.request._id),
            }
        };

        const result = await collection.insertOne(newChannel);
        const id = result.insertedId;

        const user = await db.collection("users").findOne({username: author.username});

        if (!user) {
            return NextResponse.json({success: false, message: "User not found"}, {status: 404});
        }

        await db.collection('users').updateOne(
            {_id: user._id},
            {
                $push: {
                    'contributions.channels': id,
                    'contributions.requests.solved': new ObjectId(body.request._id)
                },
                $inc: {
                    'contributions.count': 1,
                    'aura': (rewards[body.type] + rewards.request[body.request.priority.toLowerCase()])
                },
            }
        );
        return result;
    } catch (error) {
        console.error(error)
    }
}

async function updateUsers(db) {
    return;
    try {
        const resources = db.collection("channels");

        const cursor = resources.find({});
        while (await cursor.hasNext()) {
            const resource = await cursor.next();


            await resources.updateOne(
                { _id: resource._id },
                { $set: { solution: { isSolution: false, requestData: null} } }
            );

            console.log(`✅ ${resource._id} updated.`);
        }

        console.log("🎉 Finished updating all resources.");

    } catch (error) {
        console.error("❌ Error updating users:", error);
    }
}