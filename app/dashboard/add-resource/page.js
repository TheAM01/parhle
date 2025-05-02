import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AddResourceClient from './add-resource.client'; // your client component

export default async function AddResourcePage() {
    const cookieStore = await cookies();
    const session = await cookieStore.get('s-connect-id');

    if (!session) {
        redirect('/user//login');
    }

    return <AddResourceClient />;
}
