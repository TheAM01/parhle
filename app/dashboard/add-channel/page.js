import { redirect } from 'next/navigation';
import AddChannelClient from './add-channel.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers"; // your client component

export default async function AddChannelPage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }

    return <AddChannelClient user={{username: session.user.username, email: session.user.email, avatarImg: session.user.avatarImg}} sidebarStatus={sidebarStatus}/>;
}
