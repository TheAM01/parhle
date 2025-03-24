"use client";

import {useState} from "react";
import {Search, Filter, FileText} from "lucide-react";
import {motion} from "framer-motion";
import {notesData} from "@/public/data";
import Input from "@/components/ui/input";
import {ScreenSizeGetter} from "@/components/utility";

export default function Books() {

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedResource, setSelectedResource] = useState("All")

    const filteredNotes = notesData.filter(
        (note) =>
            (selectedResource === "All" || note.subject === selectedResource) &&
            (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.university.toLowerCase().includes(searchTerm.toLowerCase())),
    )


    return (
        <div className="flex-col min-h-screen texture-subtle-grid text-white pt-10 sm:pt-20 bg-black items-center">
            <div className="w-full md:w-3/5 flex-col p-3">
                <div className="font-bold text-4xl mb-3">Explore Notes</div>
                <div className="mb-5 flex-col md:flex-row">
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search/>}
                    />
                    <div className="flex-row-reverse mt-4 md:mt-0">
                        <div className="p-2">
                            <Filter/>
                        </div>
                        <select
                            value={selectedResource}
                            onChange={(e) => setSelectedResource(e.target.value)}
                            className="bg-gray-900 border border-border-color text-white rounded-none px-4 py-2 focus:ring-white focus:border-white w-full md:w-auto"
                        >
                            <option value="All">All Notes</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Economics">Economics</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                </div>

                <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                    {filteredNotes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className=" flex-col bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors"
                        >
                            <div className={"justify-between flex-1"}>
                                <div className={"text-xl font-semibold mb-2"}>{note.title}</div>
                                <FileText className={"text-gray-dark!"}/>
                            </div>
                            <div className={"text-gray-dark mb-4"}>{note.subject}</div>
                            <div className={"justify-between items-center"}>
                                <div className={""}>By {note.author} • {note.university}</div>
                                <div className={"text-gray-400 text-sm"}>{note.likes} Likes</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}