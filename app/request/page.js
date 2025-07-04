"use server";


import RequestClient from './request.client';
import {getSession} from "@/lib/get-session";
import db from "@/lib/database";


export default async function RequestPage() {

    const session = await getSession();

    if (!session.user) {
        return <RequestClient user={null}/>;
    }

    const userData = await db.collection("users").findOne({username: session.user.username});
    delete userData.password;

    return <RequestClient
        user={JSON.parse(JSON.stringify(userData))}
    />;
}