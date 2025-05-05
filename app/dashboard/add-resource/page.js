import { redirect } from 'next/navigation';
import AddResourceClient from './add-resource.client';
import {getSession} from "@/lib/get-session"; // your client component

export default async function AddResourcePage() {
    const session = await getSession()

    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }

    return <AddResourceClient user={{username: session.user.username, email: session.user.email}}/>;
}
