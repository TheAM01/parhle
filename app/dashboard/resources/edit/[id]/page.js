"use server";


import { redirect } from 'next/navigation';
import EditResourceClient from './edit-resource.client';
import {getSession} from "@/lib/get-session";
import {cookies} from "next/headers";
import db from "@/lib/database";
import {ObjectId} from "mongodb";


export default async function EditResourcePage({params}) {
    const { id } = await params;
    const session = await getSession()
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect(`/user/login?login-first=true&redirect-to=${encodeURIComponent(`dashboard/resources/edit/${id}`)}`);
    }

    const resource = await db.collection("resources").findOne({ _id: new ObjectId(id) });
    const resourceCleaned = {
        ...resource,
        _id: resource._id.toString(),
    };

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <EditResourceClient user={JSON.parse(JSON.stringify(userData))} sidebarStatus={sidebarStatus?.value || false} resource={resourceCleaned}/>;
}
