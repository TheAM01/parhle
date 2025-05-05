import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('s-connect-id');

    if (!session) {
        return NextResponse.json({ loggedIn: false });
    }

    return NextResponse.json({ loggedIn: true, session: session.value });
}
