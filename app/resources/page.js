"use client";

import {useEffect, useState} from "react";
import {Search, Filter, BookOpen, Heart, Calendar, University, User} from "lucide-react";
import {motion} from "framer-motion";
// import {notesData} from "@/public/data";
import Input from "@/components/ui/input";


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
        <div className="flex-col min-h-screen texture-subtle-grid text-white pt-16 bg-black items-center">
            <div className="w-3/5 flex-col">
                <div className="font-bold text-4xl mb-5">Explore Resources</div>
                <div className="text-xl mb-10">Click on card to view resource</div>
                <div className=" mb-5">
                    <Input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search/>}
                    />
                    <div className="p-2">
                        <Filter/>
                    </div>
                    <select
                        value={selectedResource}
                        onChange={(e) => setSelectedResource(e.target.value)}
                        className="bg-gray-900 border border-border-color text-white rounded-none px-4 py-2 focus:ring-white focus:border-white w-full md:w-auto"
                    >
                        <option value="All">All Subjects</option>
                        {
                            uniqueSubjects.map((note, i) => (
                                <option value={note} key={i}>{note}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                    {filteredNotes.map((note, index) => (
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

                            <div className={"justify-between flex-1 items-center mb-2"}>
                                <div className={"text-xl font-semibold mb-2"}>{note.title}</div>
                                <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {note.likes ? note.likes : "2"}</div>
                            </div>

                            <div className={"flex-col"}>

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
                                    <University size={16}/>
                                    <div className="flex-col ml-2 text-gray-light text-sm">
                                        {note.teacher}
                                    </div>
                                </div>
                                <div className="text-base font-light items-center text-gray-dark">
                                    <User size={16}/>
                                    <div className="flex-col ml-2 text-gray-light text-sm">
                                        <span>{note.author}</span>
                                        <span className="text-gray-dark">{note.university}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    )
}