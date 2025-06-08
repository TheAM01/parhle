"use server";

import { redirect } from 'next/navigation';
import AddBookClient from './add-book.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";

export default async function AddResourcePage() {

    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent("dashboard/books/my")}`);
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <AddBookClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false}/>;
}
