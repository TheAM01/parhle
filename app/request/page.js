"use server";

import RequestClient from './request.client';
import {getSession} from "@/lib/get-session";

export default async function AddBookPage() {
    const session = await getSession()

    return <RequestClient
        user={session?.user}
    />;
}