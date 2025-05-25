"use server";

import { redirect } from 'next/navigation';
import AddBookClient from './add-book.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";

export default async function AddBookPage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');


    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }
    return <AddBookClient
        user={session.user}
        sidebarStatus={sidebarStatus.value}
    />;
}