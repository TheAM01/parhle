import { redirect } from 'next/navigation';
import MyBooksClient from './my-books.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers"; // your client component

export default async function MyBooksPage() {
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fmy-books');
    }

    return <MyBooksClient user={session.user} sidebarStatus={sidebarStatus}/>;
}
