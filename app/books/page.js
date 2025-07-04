"use client";

import {useEffect, useState} from "react";
import {Search, Filter} from "lucide-react";
import {Input} from "@/components/ui/Inputs";
import Spinner from "@/components/ui/Spinner";
import {DashboardWorkspace} from "@/components/ui/Structure";
import {BooksCard} from "@/components/ui/Cards";


export default function BooksPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResource, setSelectedResource] = useState("All");
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uniqueSubjects, setUniqueSubjects] = useState([])

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/book/all");
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
                note.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );




    return (
        <div className="flex-col min-h-screen texture-mosaic text-white pt-10 sm:pt-20 bg-black items-center ">

            <DashboardWorkspace>
                <div className="font-bold text-4xl mb-5 md:mb-10">Explore Books</div>
                <div className="text-xl mb-5 md:mb-10">Click on card to open book in new tab</div>

                {/* Search and filter */}

                <div className="mb-5 flex-col lg:flex-row">

                    <Input
                        type="text"
                        placeholder="Search books..."
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

                <div className={`${loading ? "justify-center pt-10" : "flex-col gap-6"} mt-2`}>
                    {(!loading ? filteredNotes.map((book, index) => (
                        <BooksCard book={book} index={index} key={index}/>
                    )) : <Spinner/>)}
                </div>
            </DashboardWorkspace>
        </div>
    )
}