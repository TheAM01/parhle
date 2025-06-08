"use server";

import { redirect } from 'next/navigation';
import MyChannelsClient from './my-channels.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";

export default async function MyChannelsPage() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent("dashboard/channels/my")}`);
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <MyChannelsClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false}/>;
}
