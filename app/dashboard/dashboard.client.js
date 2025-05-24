"use client";

import Sidebar from "@/components/layout/Sidebar";
import {FileText, Heart, SquareCheck} from "lucide-react";
import {DashboardNotification} from "@/components/ui/Notification";
import {HorizontalRule} from "@/components/ui/HorizontalRule";

export default function DashboardClient({user, sidebarStatus}) {
    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <div className="w-full h-screen overflow-y-scroll">

                <div className="flex-col w-full md:w-4/5 lg:w-3/5 p-4 lg:p-10 mx-auto">

                    <div className="text-4xl mb-3 font-bold">
                        Dashboard - Home
                    </div>

                    <div className="text-sm text-gray-dark mb-6">Welcome back, {user.fullName}</div>

                    <div className="flex-col justify-evenly gap-6 mb-6 sm:flex-row">

                        <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                            <div className="justify-between items-center w-full">
                                <div className="flex-col gap-2">
                                    <div className="text-sm text-gray-dark">Total Contributions</div>
                                    <div className="text-4xl font-bold">{user.contributions?.count || 0}</div>
                                </div>
                                <FileText className={"bg-gray-700 rounded-full p-2"} size={40}/>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                            <div className="justify-between items-center w-full">
                                <div className="flex-col gap-2">
                                    <div className="text-sm text-gray-dark">Total Likes</div>
                                    <div className="text-4xl font-bold">{user.receivedLikes || 0}</div>
                                </div>
                                <Heart className={"bg-gray-700 rounded-full p-2"} size={40}/>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
                            <div className="justify-between items-center w-full">
                                <div className="flex-col gap-2">
                                    <div className="text-sm text-gray-dark">Resolved Requests</div>
                                    <div className="text-4xl font-bold">{user.contributions?.requests?.length || 0}</div>
                                </div>
                                <SquareCheck className={"bg-gray-700 rounded-full p-2"} size={40}/>
                            </div>
                        </div>


                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mb-6">

                        <div className="text-2xl mb-1 font-bold">
                            Upcoming features
                        </div>

                        <div className="text-gray-dark mb-3">These are features that will probably be incorporated in the next update.</div>

                        <ul className={"list-disc ml-5"}>
                            <li className={"text-gray-medium mb-2"}>Ability to Edit & Delete items on "My ... " pages.</li>
                            <li className={"text-gray-medium mb-2"}>Ability to edit profile.</li>
                            <li className={"text-gray-medium mb-2"}>StatusToast messages on every page.</li>
                        </ul>

                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mb-6">

                        <div className="text-2xl mb-3 font-bold justify-between w-full">
                            Requests
                        </div>

                        <div className="bg-black p-3 text-sm text-gray-medium mb-2">
                            There are supposed to be pending requests here...
                        </div>

                        <div className="bg-black p-3 text-sm text-gray-medium">
                            There are no pending requests currently.
                        </div>

                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full gap-2 mb-6">

                        <div className="text-2xl mb-1 font-bold justify-between w-full">
                            Dev Notifications
                        </div>

                        <DashboardNotification
                            sender={"System"}
                            message={"Dashboard landing page successfully developed."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"\"My ...\" pages successfully developed."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"Successfully integrated cookies for saving sidebar's state."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"Successfully built page to list requests."}
                        />
                        <HorizontalRule/>
                        <div className="text-2xl mb-1 font-bold justify-between w-full">
                            Prod Notifications
                        </div>
                        <DashboardNotification
                            sender={"Contributions"}
                            message={<>Your request has been fulfilled by <div className="text-gray-dark font-semibold">Wahaj Ali Khan (wahaj)</div>.</>}
                        />
                        <DashboardNotification
                            sender={"Contributions"}
                            message={"Your resource now has 15 likes."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"You received 13 new profile views!"}
                        />
                        <DashboardNotification
                            sender={"Requests"}
                            message={<>Your request has been fulfilled by <div className="text-gray-dark font-semibold">M. Abdullah (abdullah)</div>.</>}
                        />

                    </div>


                </div>

            </div>

        </div>
    )
}