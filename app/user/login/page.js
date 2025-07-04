"use server";


import LoginClient from "./login.client";
import {getSession} from "@/lib/get-session";
import {redirect} from "next/navigation";


export default async function LoginPage() {

    const session = await getSession()
    if (!!session.user) {
        return redirect('/dashboard/profile?already-logged-in=true');
    }
    return <LoginClient/>
}