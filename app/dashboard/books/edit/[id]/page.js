"use server";

import { redirect } from 'next/navigation';
import EditBookClient from './edit-book.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";
import {ObjectId} from "mongodb";

export default async function EditBookPage({params}) {

    const { id } = await params;
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent(`dashboard/books/edit/${id}`)}`);
    }

    const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    const bookCleaned = {
        ...book,
        _id: book._id.toString(),
    };

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <EditBookClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false} book={bookCleaned}/>;
}
