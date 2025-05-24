import { redirect } from 'next/navigation';
import AddResourceClient from './add-resource.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers"; // your client component

export default async function AddResourcePage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }

    return <AddResourceClient user={session.user} sidebarStatus={sidebarStatus}/>;
}
