"use server";

import { redirect } from 'next/navigation';
import MyResourcesClient from './my-resources.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";

export default async function MyResourcesPage() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent("dashboard/resources/my")}`);
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <MyResourcesClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false}/>;
}