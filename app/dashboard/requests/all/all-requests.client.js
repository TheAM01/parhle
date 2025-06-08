"use client";

import {useEffect, useState} from "react";
import {Search, Filter} from "lucide-react";
import {Input} from "@/components/ui/Inputs";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/layout/Sidebar";
import {DashboardParent, DashboardScrollable, DashboardWorkspace, PageTitle} from "@/components/ui/Structure";
import {RequestsCard} from "@/components/ui/Cards";

export default function AllRequestsClient({user, sidebarStatus}) {
    const [filter, setFilter] = useState("");
    const tabs = [
        {
            filter: "",
            name: "All",
            page: () => {
                setFilter("");
            },
            description: "All requests that were ever submitted by users"
        },
        {
            filter: "open",
            name: "Pending",
            page: () => {
                setFilter("open");
            },
            description: "All requests that are submitted by users that are pending & yet to be fulfilled."
        },
        {
            filter: "closed",
            name: "Fulfilled",
            page: () => {
                setFilter("closed");
            },
            description: "All requests that have been fulfilled."
        },
    ];

    const [requestsData, setRequestsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/request/all");
                const result = await response.json();
                setRequestsData(result);


            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchData();

    }, []);

    const filteredRequests = requestsData.filter((req) => (filter === "" || req.status.toLowerCase() === filter));

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"All Requests"}
                        description={"Resources requested by users that aren't available on the site currently"}
                    />
                    <div className="border border-gray-800 w-min bg-gray-800 ">
                        {
                            tabs.map((t, i) => (
                                <div className={`w-min p-2 cursor-pointer hover:text-gray-dark ${t.filter === filter && "bg-black"} duration-100 select-none`} key={i} onClick={() => t.page()} >{t.name}</div>
                            ))
                        }
                    </div>
                    <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"} mt-2`}>
                        {(!loading ? filteredRequests.map((request, index) => (
                            <RequestsCard request={JSON.parse(JSON.stringify(request))} index={index} key={index}/>
                        )) : <Spinner/>)}
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    );
}