import {getSession} from "@/lib/get-session";
import {redirect} from "next/navigation";

export default async function Profile() {
    const session = await getSession()
    if (!session.user) {
        return redirect('/user/login?login-first=true');
    }
    return <div>Dead</div>
}