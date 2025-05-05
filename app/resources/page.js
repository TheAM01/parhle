"use client";

import {useEffect, useState} from "react";
import {Search, Filter, BookOpen, Heart, Calendar, University, User} from "lucide-react";
import {motion} from "framer-motion";
// import {notesData} from "@/public/data";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";


export default function Resources() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResource, setSelectedResource] = useState("All");
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueSubjects, setUniqueSubjects] = useState([])

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/resource/all");
                const result = await response.json();
                setNotesData(result);
                const uniq = [...new Set(result.map(item => item.subject))];
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
        <div className="flex-col min-h-screen texture-mosaic text-white pt-10 sm:pt-20 bg-black items-center ">
            <div className="w-full md:w-4/5 flex-col p-3">
                <div className="font-bold text-4xl mb-5 md:mb-10">Explore Resources</div>
                <div className="text-xl mb-5 md:mb-10">Click on card to open resource</div>

                {/* Search and filter */}

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



                <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} mt-2`}>
                    {(!loading ? filteredNotes.map((note, index) => (
                        <motion.a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={note.resourceUrl}
                            key={note._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors hover:cursor-pointer"
                        >

                            <div className={"justify-between flex-1 items-center"}>
                                <div className={"text-xl font-semibold"}>{note.title}</div>
                                <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {note.likes ? note.likes : "2"}</div>
                            </div>

                            <span className="text-gray-dark text-xs mb-4">{note.author}</span>

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
                                <div className="text-base font-light items-center text-gray-dark">
                                    <University size={16}/>
                                    <div className="flex-col ml-2 text-gray-light text-sm">
                                        {note.university}
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    )) : <Spinner/>)}
                </div>
            </div>
        </div>
    )
}