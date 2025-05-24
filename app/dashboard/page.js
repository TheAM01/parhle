import SideBar from "@/components/ui/sidebar";
import { getSession } from "@/lib/get-session";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {FileText, Heart, Plus, SquareCheck} from "lucide-react";
import {LinkButton} from "@/components/ui/button";

export default async function Dashboard() {

    const session = await getSession();
    const cookieStore = await cookies();
    let sidebarStatus = cookieStore.get('sidebar-status');

    if (sidebarStatus !== undefined) sidebarStatus.value = sidebarStatus.value !== "false";
    if (!session.user) {
        return redirect('/user/login?login-first=true&redirect-to=dashboard');
    }

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar user={session.user} sidebarStatus={sidebarStatus}/>

            <div className="flex-col w-full md:w-4/5 lg:w-3/5 p-4 lg:p-10 mx-auto">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Home
                </div>

                <div className="text-sm text-gray-dark mb-6">Welcome back, {session.user.fullName}</div>

                <div className="flex-col justify-evenly gap-6 mb-6 sm:flex-row">

                    <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                        <div className="justify-between items-center w-full">
                            <div className="flex-col gap-2">
                                <div className="text-sm text-gray-dark">Total Contributions</div>
                                <div className="text-4xl font-bold">{session.user.contributions?.count || 9}</div>
                            </div>
                            <FileText className={"bg-gray-700 rounded-full p-2"} size={40}/>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                        <div className="justify-between items-center w-full">
                            <div className="flex-col gap-2">
                                <div className="text-sm text-gray-dark">Total Likes</div>
                                <div className="text-4xl font-bold">{session.user.contributions?.count || 21}</div>
                            </div>
                            <Heart className={"bg-gray-700 rounded-full p-2"} size={40}/>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                        <div className="justify-between items-center w-full">
                            <div className="flex-col gap-2">
                                <div className="text-sm text-gray-dark">Resolved Requests</div>
                                <div className="text-4xl font-bold">{session.user.contributions?.count || 2}</div>
                            </div>
                            <SquareCheck className={"bg-gray-700 rounded-full p-2"} size={40}/>
                        </div>
                    </div>


                </div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mb-6">

                    <div className="text-2xl mb-3 font-bold">
                        TO DOs
                    </div>

                    <ul className={"list-disc ml-5"}>
                        <li className={"text-gray-medium mb-2"}>Add "MY STUFF" pages</li>
                        <li className={"text-gray-medium mb-2"}>Finish dashboard</li>
                        <li className={"text-gray-medium mb-2"}>Set cookie for dashboard sidebar open</li>
                        <li className={"text-gray-medium mb-2"}>Add profile editing options</li>
                        <li className={"text-gray-medium mb-2"}>Make the dashboard landing page</li>
                        <li className={"text-gray-medium mb-2"}>Make a list requests page</li>
                    </ul>

                </div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    <div className="text-2xl mb-3 font-bold justify-between w-full">
                        Requests
                    </div>

                    <div className="bg-black p-3 text-sm text-gray-medium">
                        There are supposed to be pending requests here...
                    </div>


                </div>


            </div>

        </div>
    )
}

