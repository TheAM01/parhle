"use server";

import { redirect } from 'next/navigation';
import FulfillRequestClient from './fulfill-request.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";
import {ObjectId} from "mongodb";

export default async function FulfillRequestPage({params}) {
    const { id } = await params;
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent(`dashboard/request/fulfill/${id}`)}`);
    }

    const request = await db.collection("requests").findOne({ _id: new ObjectId(id) });

    if (request.status.toLowerCase() === "closed") return redirect('/dashboard/requests/my')

    const requestCleaned = {
        ...request,
        _id: request._id.toString(),
    };

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <FulfillRequestClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false} request={requestCleaned}/>;
}
