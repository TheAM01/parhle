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
import {CalendarPlus} from "lucide-react";

export default function AdminClient({user, sidebarStatus}) {
    
    
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
                            <DashboardHeading>User Controls</DashboardHeading>
                            <div className="gap-4">
                                <Button eventOnClick={() => {}}>
                                    <CalendarPlus size={17}/>
                                    Increment Users' Semesters
                                </Button>
                                <Button eventOnClick={() => {}}>
                                    <CalendarPlus size={17}/>
                                    Increment Users' Semesters
                                </Button>
                                <Button eventOnClick={() => {}}>
                                    <CalendarPlus size={17}/>
                                    Increment Users' Semesters
                                </Button>
                            </div>
                        </DashboardWorkspaceBlock>
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )
}