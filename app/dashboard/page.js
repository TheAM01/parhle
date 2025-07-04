"use server";


import { getSession } from "@/lib/get-session";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import DashboardClient from "./dashboard.client";
import db from "@/lib/database";


export default async function DashboardPage() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard');
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <DashboardClient sidebarStatus={ sidebarStatus?.value || false } user={JSON.parse(JSON.stringify(userData))}/>

}

