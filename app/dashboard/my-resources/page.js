import { redirect } from 'next/navigation';
import MyResourcesClient from './my-resources.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers"; // your client component

export default async function MyResourcesPage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fmy-resources');
    }

    return <MyResourcesClient user={session.user} sidebarStatus={sidebarStatus}/>;
}
