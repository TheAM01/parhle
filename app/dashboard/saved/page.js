"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/get-session";
import db from "@/lib/database";
import SavedClient from "./saved.client";

export default async function SavedPage() {
    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get("sidebar-status");

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent("dashboard/saved")}`);
    }

    const userData = await db.collection("users").findOne({ username: session.user.username });
    delete userData.password;

    const liked = userData.likedItems || { resources: [], books: [], channels: [] };
    const toIds = (arr) => (arr || []).filter((x) => ObjectId.isValid(x)).map((x) => new ObjectId(x));

    const [resources, books, channels] = await Promise.all([
        db.collection("resources").find({ _id: { $in: toIds(liked.resources) } }).toArray(),
        db.collection("books").find({ _id: { $in: toIds(liked.books) } }).toArray(),
        db.collection("channels").find({ _id: { $in: toIds(liked.channels) } }).toArray(),
    ]);

    const data = {
        resources: JSON.parse(JSON.stringify(resources)),
        books: JSON.parse(JSON.stringify(books)),
        channels: JSON.parse(JSON.stringify(channels)),
    };

    return (
        <SavedClient
            user={JSON.parse(JSON.stringify(userData))}
            sidebarStatus={sidebarStatus?.value || false}
            data={data}
        />
    );
}
