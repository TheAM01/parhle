import { getSession } from "@/lib/get-session";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import DashboardClient from "./dashboard.client";

export default async function Dashboard() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');
    console.log(sidebarStatus)

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard');
    }
    return <DashboardClient sidebarStatus={ sidebarStatus?.value || false } user={session.user}/>

}

