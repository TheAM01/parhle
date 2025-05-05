import { redirect } from 'next/navigation';
import AddBookClient from './add-book.client';
import {getSession} from "@/lib/get-session"; // your client component

export default async function AddBookPage() {
    const session = await getSession()

    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }
    console.log(session)
    return <AddBookClient user={{username: session.user.username, email: session.user.email}}/>;
}
