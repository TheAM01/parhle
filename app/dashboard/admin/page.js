"use server";

import { redirect } from 'next/navigation';
import AdminClient from './admin.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";

export default async function MyChannelsPage() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent("dashboard/admin")}`);
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    if (userData.role !== "admin")
        return redirect("dashboard");

    return <AdminClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false}/>;
}
