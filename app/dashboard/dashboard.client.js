"use client";


import Sidebar from "@/components/layout/Sidebar";
import {FileText, Heart, SquareCheck} from "lucide-react";
import {DashboardNotification} from "@/components/ui/Notification";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardStatsBlock,
    DashboardWorkspace, DashboardWorkspaceBlock,
    PageTitle
} from "@/components/ui/Structure";


export default function DashboardClient({user, sidebarStatus}) {
    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"Dashboard - Home"}
                        description={`Welcome back, ${user.fullName}`}
                    />
                    <div className="gap-6 flex-col">
                        <div className="gap-6 flex-wrap">
                            <DashboardStatsBlock
                                title={"Total Contributions"}
                                count={user.contributions?.count || 0}
                                Icon={FileText}
                            />
                            <DashboardStatsBlock
                                title={"Total Likes"}
                                count={user.receivedLikes || 0}
                                Icon={Heart}
                            />
                            <DashboardStatsBlock
                                title={"Resolved Requests"}
                                count={user.contributions?.requests?.solved?.length || 0}
                                Icon={SquareCheck}
                            />
                        </div>

                        <DashboardWorkspaceBlock extraClasses={"gap-2"}>
                            <DashboardHeading>To Do</DashboardHeading>
                            <div className="text-gray-dark mb-3">These are automatically generated suggestions.</div>
                            <div className={"flex-col "}>
                                {/*<li className={"text-gray-medium mb-2"}>[Optional] Announcements page, Aura Leaderboard</li>*/}
                                {/*<li className={"text-gray-medium mb-2"}>my-requests.client.js, uske baad sirf utils ko sahi jaga rakhna phir uske baad guidlins sahi se likhniin, guidelines ka alag se page banana, announcements banana (optional), notifications add krna, (optional leaderboard), baqi abad me abi mujhe kutta neend arahi, </li>*/}
                                <li className={"text-gray-medium mb-2"}>Read the Guide.</li>
                                <li className={"text-gray-medium mb-2"}>Add new resources.</li>
                                <li className={"text-gray-medium mb-2"}>Check requests and try to resolve some to gain community points.</li>
                                <li className={"text-gray-medium mb-2"}>Join the community Discord Server!</li>
                            </div>
                        </DashboardWorkspaceBlock>

                        <DashboardWorkspaceBlock extraClasses={"gap-2"}>
                            <DashboardHeading>Requests</DashboardHeading>
                            <div className="bg-black p-3 text-sm text-gray-medium">
                                Requests are temporarily disabled while we review submissions.
                            </div>
                        </DashboardWorkspaceBlock>

                        <DashboardWorkspaceBlock extraClasses={"gap-2"}>
                            <DashboardHeading>Notifications</DashboardHeading>
                            <DashboardNotification
                                sender={"System"}
                                message={"Made an addition of a section to the homepage."}
                            />
                            <DashboardNotification
                                sender={"System"}
                                message={"Added a contact page."}
                            />
                            <DashboardNotification
                                sender={"System"}
                                message={"Fixed a minor login bug."}
                            />
                            <DashboardNotification
                                sender={"System"}
                                message={"Added 'Guide' page."}
                            />
                        </DashboardWorkspaceBlock>
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    );
}