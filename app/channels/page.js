"use client";

import {useEffect, useState} from "react";
import {Search, Filter, BookOpen, Heart, Calendar, University, User} from "lucide-react";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/Inputs";
import axios from "axios";
import Spinner from "@/components/ui/Spinner";
import {HorizontalRule} from "@/components/ui/HorizontalRule";


export default function Resources() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResource, setSelectedResource] = useState("All");
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueSubjects, setUniqueSubjects] = useState([])

    const fetchChannelName = async (url) => {
        if (!url) return;

        try {
            const res = await axios.post('/api/channel/scrape', { url });
            return res.data.channelName;
        } catch (err) {
            console.log('Error:', err.message);
            console.log('Could not fetch name');
            return null;
        }
    }


    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/channel/all");
                const result = await response.json();
                setNotesData(result);
                const uniq = [...new Set(result.map(item => item.subject))];
                setUniqueSubjects(uniq)
                fetchChannelName(result[0].url)
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
                note.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    return (
        <div className="flex-col min-h-screen texture-mosaic text-white pt-10 sm:pt-20 bg-black items-center ">
            <div className="w-full md:w-4/5 flex-col p-3">

                <div className="font-bold text-4xl mb-3">Explore Channels</div>
                <div className="text-sm text-gray-dark mb-6">Browse YouTube channels for lectures, guides and other miscellaneous videos for all subjects</div>

                {/* Search and filter */}

                <div className="mb-5 flex-col lg:flex-row">

                    <Input
                        type="text"
                        placeholder="Search..."
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
                    {(!loading ? filteredNotes.map((channel, index) => (

                        <motion.a
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            href={channel.url}
                            key={channel._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`relative flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors hover:cursor-pointer ${channel.url === "https://www.youtube.com/@VaneezaTanveer" ? "after:content-['⭐'] after:absolute after:top-1 after:right-1 after:text-yellow-400 after:text-sm after:animate-pulse" : ""}`}
                        >

                            <div className={"justify-between flex-1 items-center"}>

                                <div className={"text-xl font-semibold"}>{channel.title}</div>
                                <div className={"text-gray-400 text-sm"}><Heart size={14} className={"mr-1"}/> {channel.likes ? channel.likes : "8"}</div>
                            </div>

                            <span className="text-gray-dark text-xs mb-4">{channel.author}</span>

                            <div className={"flex-col mt-4"}>

                                <div className="text-base font-light items-center text-gray-dark mb-3">
                                    <BookOpen size={16}/>
                                    <div className="flex-col ml-2 text-gray-light text-sm">
                                        {channel.subject}
                                    </div>
                                </div>

                                <div className="text-base font-light items-center text-gray-dark">
                                    <University size={16}/>
                                    <div className="flex-col ml-2 text-gray-light text-sm">
                                        {channel.university}
                                    </div>
                                </div>

                                <HorizontalRule/>

                                <div className="text-sm font-light items-center text-gray-dark ">
                                        {channel.description}
                                </div>
                            </div>
                        </motion.a>
                    )) : <Spinner/>)}
                </div>
            </div>
        </div>
    )
}