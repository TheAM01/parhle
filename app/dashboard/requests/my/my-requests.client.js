"use client";

import {useEffect, useState} from "react";
import {
    Search,
    Filter,
    BookOpen,
    Calendar,
    AlertCircle,
    Layers,
    Heart,
    ListCheck, BookOpenText
} from "lucide-react";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/Inputs";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/layout/Sidebar";
import {
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    PageTitle
} from "@/components/ui/Structure";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {RequestsCard} from "@/components/ui/Cards";


export default function MyRequestsClient({user, sidebarStatus}) {

    const [selectedTab, setSelectedTab] = useState("all") // requested, solved
    const [requestsData, setRequestsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const tabs = {
        all: {
            name: "All",
            page: "all",
            description: "All requests that are requested & solved by the user."
        },
        requested: {
            name: "Requested",
            page: "requested",
            description: "All requests that are requested by the user."
        },
        solved: {
            name: "Solved",
            page: "solved",
            description: "All requests that are solved by the user."
        },
    };

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch(`/api/request/user/${user.username}`);
                const result = await response.json();
                setRequestsData(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchData();

    }, []);

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace extraClasses={"gap-2"}>
                    <PageTitle
                        heading={"My Requests"}
                        description={"My requested resources"}
                    />
                    <div className="border border-gray-800 w-min bg-gray-800 ">
                        {
                            Object.keys(tabs).map((t, i) => (
                                <div className={`w-min p-2 cursor-pointer hover:text-gray-dark duration-100 select-none`} key={i} onClick={() => setSelectedTab(tabs[t].page)} >{tabs[t].name}</div>
                            ))
                        }
                    </div>
                    <div className={"text-sm text-gray-dark mb-4"}>{tabs[selectedTab].description}</div>
                    {loading ? <Spinner/> :
                        selectedTab === "all" ?
                            Array.from(new Set([...requestsData.requested, ...requestsData.solved])).map((req, i) => (
                                <RequestsCard index={i} key={"ma"+i} request={req}/>
                            ))
                        :
                            requestsData[selectedTab].map((req, i) => (
                                <RequestsCard index={i} key={"lig"+i} request={req}/>
                            ))
                    }
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )
}

export function MyRequestsClient1({user, sidebarStatus}) {

    const [selectedTab, setSelectedTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState("All");
    const [requestsData, setRequestsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueSubjects, setUniqueSubjects] = useState([])

    const priorities = [
        "Not Urgent",
        "Somewhat Urgent",
        "Very Urgent",
    ];

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch(`/api/request/user/${user.username}`);
                const result = await response.json();
                const sorted = result.reverse()
                setRequestsData(sorted);
                const uniq = [...new Set(sorted.map(item => item.subject))];
                setUniqueSubjects(uniq)

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchData();

    }, []);

    const filteredRequests = requestsData.filter(
        (req) =>
            (selectedRequest === "All" || req.subject === selectedRequest) &&
            (req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const params = {searchTerm, setSearchTerm, selectedRequest, setSelectedRequest, uniqueSubjects, filteredRequests, loading, priorities};

    const tabs = [

        {
            name: "Requested",
            page: Open({user, params}),
            description: "All requests that are submitted by the user that are pending & yet to be fulfilled."
        },
        {
            name: "Solved",
            page: Closed({user, params}),
            description: "All requests that are submitted by the user that have been fulfilled."
        },
    ];

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace extraClasses={"gap-2"}>
                    <PageTitle
                        heading={"My Requests"}
                        description={"My requested resources"}
                    />
                    <div className="border border-gray-800 w-min bg-gray-800 ">
                        {
                            tabs.map((t, i) => (
                                <div className={`w-min p-2 cursor-pointer hover:text-gray-dark ${selectedTab === i && "bg-black"} duration-100 select-none`} key={i} onClick={() => setSelectedTab(i)} >{t.name}</div>
                            ))
                        }
                    </div>
                    <div className={"text-sm text-gray-dark mb-4"}>{tabs[selectedTab].description}</div>
                    {tabs[selectedTab].page}
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )

}

function All({user, params}) {

    const {searchTerm, setSearchTerm, selectedRequest, setSelectedRequest, uniqueSubjects, filteredRequests, loading, priorities} = params;

    return (
        <div className={"flex-col"}>

            <div className="mb-5 flex-col lg:flex-row">

                <Input
                    type="text"
                    placeholder="Search Requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search/>}
                />
                <div className="flex-row-reverse lg:flex-row mt-4 lg:mt-0 w-full lg:w-3/10">

                    <div className="p-2">
                        <Filter/>
                    </div>

                    <select
                        value={selectedRequest}
                        onChange={(e) => setSelectedRequest(e.target.value)}
                        className="bg-gray-900 border border-border-color text-white rounded-none px-4 py-2 focus:ring-white focus:border-white w-full lg:flex-1"
                    >

                        <option value="All">All Subjects</option>
                        {
                            uniqueSubjects.map((note, i) => (
                                <option value={note} key={i}>{note}</option>
                            ))
                        }

                    </select>

                </div>

            </div>

            <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6"} mt-2`}>
                {!loading ? filteredRequests.map((note, index) => <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors"
                >

                    <div className={"justify-between flex-1 items-center"}>
                        <div className={"text-xl font-semibold"}>{note.title}</div>
                        <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {note.likes ? note.likes : "2"}</div>
                    </div>

                    <div className={"flex-col mt-4"}>

                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <BookOpen size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.subject}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Calendar size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.semester}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Layers size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.resourceType}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <ListCheck size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.status || "Open"}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark">
                            <AlertCircle size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {priorities[note.priority.toLowerCase()]}
                            </div>
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className="text-base font-light items-center text-gray-dark">
                        <BookOpenText size={16}/>
                        <div className="flex-col ml-2 text-gray-dark text-sm">
                            {note.description}
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className={"gap-2"}>

                        <div className={"bg-white justify-center flex p-2 cursor-pointer flex-1 sm:flex-none sm:w-[100px] font-semibold text-sm text-gray-600 hover:text-black duration-100"}>Delete</div>
                    </div>
                </motion.div>) : <Spinner/>}
            </div>
        </div>
    )
}

function Open({user, params}) {
    const {searchTerm, setSearchTerm, selectedRequest, setSelectedRequest, uniqueSubjects, filteredRequests, loading, priorities} = params;
    const onlyPending = filteredRequests.filter(r => r.status?.toLowerCase() === "open");
    return (
        <div className={"flex-col"}>

            <div className="mb-5 flex-col lg:flex-row">

                <Input
                    type="text"
                    placeholder="Search Requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search/>}
                />
                <div className="flex-row-reverse lg:flex-row mt-4 lg:mt-0 w-full lg:w-3/10">

                    <div className="p-2">
                        <Filter/>
                    </div>

                    <select
                        value={selectedRequest}
                        onChange={(e) => setSelectedRequest(e.target.value)}
                        className="bg-gray-900 border border-border-color text-white rounded-none px-4 py-2 focus:ring-white focus:border-white w-full lg:flex-1"
                    >

                        <option value="All">All Subjects</option>
                        {
                            uniqueSubjects.map((note, i) => (
                                <option value={note} key={i}>{note}</option>
                            ))
                        }

                    </select>

                </div>

            </div>

            <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6"} mt-2`}>
                {!loading ? onlyPending.map((note, index) => <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors"
                >

                    <div className={"justify-between flex-1 items-center"}>
                        <div className={"text-xl font-semibold"}>{note.title}</div>
                        <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {note.likes ? note.likes : "2"}</div>
                    </div>

                    <div className={"flex-col mt-4"}>

                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <BookOpen size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.subject}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Calendar size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.semester}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Layers size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.resourceType}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <ListCheck size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.status || "Pending"}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark">
                            <AlertCircle size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {priorities[note.priority.toLowerCase()]}
                            </div>
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className="text-base font-light items-center text-gray-dark">
                        <BookOpenText size={16}/>
                        <div className="flex-col ml-2 text-gray-dark text-sm">
                            {note.description}
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className={"gap-2"}>

                        <div className={"bg-white justify-center flex p-2 cursor-pointer flex-1 sm:flex-none sm:w-[100px] font-semibold text-sm text-gray-600 hover:text-black duration-100"}>Delete</div>
                    </div>
                </motion.div>) : <Spinner/>}
            </div>
        </div>
    )
}

function Closed({user, params}) {
    const {searchTerm, setSearchTerm, selectedRequest, setSelectedRequest, uniqueSubjects, filteredRequests, loading, priorities} = params;
    const onlyPending = filteredRequests.filter(r => r.status?.toLowerCase() === "closed");
    return (
        <div className={"flex-col"}>

            <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6"} mt-2`}>
                {!loading ? onlyPending.map((note, index) => <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors"
                >

                    <div className={"justify-between flex-1 items-center"}>
                        <div className={"text-xl font-semibold"}>{note.title}</div>
                        <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {note.likes ? note.likes : "2"}</div>
                    </div>

                    <div className={"flex-col mt-4"}>

                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <BookOpen size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.subject}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Calendar size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.semester}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <Layers size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.resourceType}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark mb-3">
                            <ListCheck size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {note.status || "Pending"}
                            </div>
                        </div>
                        <div className="text-base font-light items-center text-gray-dark">
                            <AlertCircle size={16}/>
                            <div className="flex-col ml-2 text-gray-light text-sm">
                                {priorities[note.priority.toLowerCase()]}
                            </div>
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className="text-base font-light items-center text-gray-dark">
                        <BookOpenText size={16}/>
                        <div className="flex-col ml-2 text-gray-dark text-sm">
                            {note.description}
                        </div>
                    </div>
                    <HorizontalRule/>
                    <div className={"gap-2"}>

                        <div className={"bg-white justify-center flex p-2 cursor-pointer flex-1 sm:flex-none sm:w-[100px] font-semibold text-sm text-gray-600 hover:text-black duration-100"}>Delete</div>
                    </div>
                </motion.div>) : <Spinner/>}
            </div>
        </div>
    )
}
