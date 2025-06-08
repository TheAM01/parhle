import SignupClient from "./signup.client";
import {getSession} from "@/lib/get-session";
import {redirect} from "next/navigation";

export default async function SignupPage() {
    const session = await getSession()
    if (!!session.user) {
        return redirect('/user/profile?already-logged-in=true');
    }
    return <SignupClient/>
}