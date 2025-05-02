import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AddBookClient from './add-book.client'; // your client component

export default async function AddBookPage() {
    const cookieStore = await cookies();
    const session = await cookieStore.get('s-connect-id');

    if (!session) {
        redirect('/user/login');
    }

    return <AddBookClient />;
}
