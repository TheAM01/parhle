"use server";

import { redirect } from 'next/navigation';
import EditChannelClient from './edit-channel.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";
import {ObjectId} from "mongodb";

export default async function EditChannelPage({params}) {

    const { id } = await params;
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent(`dashboard/channels/edit/${id}`)}`);
    }

    const channel = await db.collection("channels").findOne({ _id: new ObjectId(id) });
    const channelCleaned = {
        ...channel,
        _id: channel._id.toString(),
    };

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <EditChannelClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false} channel={channelCleaned}/>;
}
