import { redirect } from 'next/navigation';
import MyChannelsClient from './my-channels.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers"; // your client component

export default async function MyChannelsPage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fmy-resources');
    }

    return <MyChannelsClient user={session.user} sidebarStatus={sidebarStatus}/>;
}
