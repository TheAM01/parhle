import SideBar from "@/components/ui/sidebar";
import { getSession } from "@/lib/get-session";
import {redirect} from "next/navigation";

export default async function Dashboard() {

    const session = await getSession();
    console.log(session)
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard');
    }

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar/>

            <div className="flex-col w-full lg:mx-30 p-4 lg:p-10">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Home
                </div>

                <div className="text-sm text-gray-dark mb-6">Welcome back</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    TODOs:

                    <ul className={"list-disc"}>
                        <li>Change author for every add page</li>
                        <li>Add current user details in dashboard and logout button</li>
                    </ul>

                </div>
            </div>

        </div>
    )
}
