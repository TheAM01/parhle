import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AddChannelClient from './add-channel.client'; // your client component

export default async function AddChannelPage() {
    const cookieStore = await cookies();
    const session = await cookieStore.get('s-connect-id');

    if (!session) {
        redirect('/user//login');
    }

    return <AddChannelClient />;
}
