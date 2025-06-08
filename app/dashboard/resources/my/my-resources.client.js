"use client";


import {useEffect, useState} from "react";
import {Search, Filter, BookOpen, Heart, Calendar, University, User, Link as LinkIcon} from "lucide-react";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/Inputs";
import Spinner from "@/components/ui/Spinner";
import Sidebar from "@/components/layout/Sidebar";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {DashboardScrollable, DashboardWorkspace, PageTitle, SmallIconTextButton} from "@/components/ui/Structure";
import Link from "next/link"


export default function MyResourcesClient({user, sidebarStatus}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResource, setSelectedResource] = useState("All");
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueSubjects, setUniqueSubjects] = useState([])

    useEffect(() => {
        // return console.log(user.username)

        async function fetchData() {

            try {

                const response = await fetch(`/api/resource/user/${user.username}`);
                const result = await response.json();
                const sorted = result.reverse()
                setNotesData(sorted);
                const uniq = [...new Set(sorted.map(item => item.subject))];
                console.log(uniq);
                setUniqueSubjects(uniq)

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchData();

    }, []);

    const filteredNotes = notesData.filter(
        (note) =>
            (selectedResource === "All" || note.subject === selectedResource) &&
            (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"My Resources"}
                        description={"Resources shared by you"}
                    />

                    <div className="mb-5 flex-col lg:flex-row">

                        <Input
                            type="text"
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search/>}
                        />
                        <div className="flex-row-reverse lg:flex-row mt-4 lg:mt-0 w-full lg:w-3/10">

                            <div className="p-2">
                                <Filter/>
                            </div>

                            <select
                                value={selectedResource}
                                onChange={(e) => setSelectedResource(e.target.value)}
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
                        {!loading ? filteredNotes.map((note, index) => <motion.div
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
                                        <User size={16}/>
                                        <div className="flex-col ml-2 text-gray-light text-sm">
                                            {note.teacher}
                                        </div>
                                    </div>
                                    <div className="text-base font-light items-center text-gray-dark mb-3">
                                        <University size={16}/>
                                        <div className="flex-col ml-2 text-gray-light text-sm">
                                            {note.university}
                                        </div>
                                    </div>
                                    <div className="text-base font-light items-center text-gray-dark">
                                        <LinkIcon size={16}/>
                                        <div className="flex-col ml-2 text-gray-light text-sm">
                                            {note.url}
                                        </div>
                                    </div>
                                </div>
                                <HorizontalRule/>
                                <div className={"gap-2"}>
                                    <Link href={`/dashboard/resources/edit/${note._id}`} className={"bg-white justify-center flex p-2 cursor-pointer flex-1 sm:flex-none sm:w-[100px] font-semibold text-sm text-gray-600 hover:text-black duration-100"}>Edit</Link>
                                    <Link href={note.url} className={"bg-white justify-center flex p-2 cursor-pointer flex-1 sm:flex-none sm:w-[100px] font-semibold text-sm text-gray-600 hover:text-black duration-100"}>View</Link>
                                </div>
                            </motion.div>) : <Spinner/>}
                    </div>

                </DashboardWorkspace>
            </DashboardScrollable>
        </div>
    )
}