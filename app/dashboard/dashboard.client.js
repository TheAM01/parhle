"use client";


import Sidebar from "@/components/layout/Sidebar";
import {FileText, Heart, SquareCheck} from "lucide-react";
import {DashboardNotification} from "@/components/ui/Notification";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {DashboardScrollable, DashboardWorkspace, PageTitle} from "@/components/ui/Structure";


export default function DashboardClient({user, sidebarStatus}) {
    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"Dashboard - Home"}
                        description={`Welcome back, ${user.fullName}`}
                    />

                    <div className="flex-col justify-evenly gap-6 mb-6 sm:flex-row flex-wrap">

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
                            <li className={"text-gray-medium mb-2"}>Notifications</li>
                            <li className={"text-gray-medium mb-2"}>An announcements page.</li>
                            <li className={"text-gray-medium mb-2"}>Ability to Edit & Delete items on "My ... " pages.</li>
                        </ul>

                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mb-6">

                        <div className="text-2xl mb-3 font-bold justify-between w-full">
                            Requests
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
                            message={"Added the ability to edit profile."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"Dropdowns added on SignUp page."}
                        />
                        <DashboardNotification
                            sender={"System"}
                            message={"Components incorporated in most pages."}
                        />
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
                            Notifications
                        </div>
                        <DashboardNotification
                            sender={"Contributions"}
                            message={
                                <span>
                                    Your request has been fulfilled by{" "}
                                    <span className="text-gray-dark font-semibold">Wahaj Ali Khan (@wahaj)</span>.
                                </span>
                            }
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
                            message={
                                <span>
                                    Your request has been fulfilled by{" "}
                                    <span className="text-gray-dark font-semibold">M. Abdullah (@abdullah)</span>.
                                </span>
                            }
                        />
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
        </div>
    )
}