"use client";

import {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock,
    PageTitle
} from "@/components/ui/Structure";
import Sidebar from "@/components/layout/Sidebar";
import {Button} from "@/components/ui/Buttons";
import {CalendarMinus, CalendarPlus, SquareDashed} from "lucide-react";

export default function AdminClient({user, sidebarStatus}) {


    const log = (message) => {

    }
    return (
        <DashboardParent>
            <Sidebar sidebarStatus={sidebarStatus} user={user}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"Site Admin Controls"}
                        description={`Welcome back, ${user.fullName}`}
                    />
                    <div className="gap-6 flex-col">
                        <DashboardWorkspaceBlock>
                            <DashboardHeading>Logs</DashboardHeading>
                            <div className="bg-black p-3 text-sm text-gray-medium">
                                [Default] Welcome. Perform an action to display logs.

                            </div>
                        </DashboardWorkspaceBlock>
                        <DashboardWorkspaceBlock>
                            <DashboardHeading>User Controls</DashboardHeading>
                            <div className="gap-4">
                                <Button eventOnClick={() => {}}>
                                    <CalendarPlus size={17}/>
                                    Increment Users' Semesters
                                </Button>
                                <Button eventOnClick={() => {}}>
                                    <CalendarMinus size={17}/>
                                    Decrement Users' Semesters
                                </Button>
                                <Button eventOnClick={() => {}}>
                                    <SquareDashed size={17}/>
                                    Placeholder
                                </Button>
                            </div>
                        </DashboardWorkspaceBlock>
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )
}