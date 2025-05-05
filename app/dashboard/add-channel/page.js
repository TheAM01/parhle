import { redirect } from 'next/navigation';
import AddChannelClient from './add-channel.client';
import {getSession} from "@/lib/get-session"; // your client component

export default async function AddChannelPage() {
    const session = await getSession()

    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard%2Fadd-book');
    }

    return <AddChannelClient user={{username: session.user.username, email: session.user.email}}/>;
}
