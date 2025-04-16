"use client";

import {Upload} from "lucide-react";
import {useState} from "react";
import SideBar from "@/components/ui/sidebar";

export default function AddVideo() {

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        author: "n30nu11",
        university: "University of Karachi",
        description: "",
        videoUrl: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data
        const { title, subject, author, university, description, videoUrl } = formData;

        const response = await fetch("/api/video/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subject, author, university, description, videoUrl }),
        });

        const status = await response.status();

        setFormData({
            title: "",
            subject: "",
            author: "n30nu11",
            university: "University of Karachi",
            description: "",
            videoUrl: "",
        });

        return status;
    };

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar/>
            <div className="flex-col w-full md:w-4/5 lg:w-3/5 xl:w-2/5  p-4 lg:p-10 mx-auto">

                <div className="text-4xl mb-3 font-bold">
                    Add Videos and Playlists
                </div>

                <div className="text-sm text-gray-dark mb-6">Share a video or playlist of a specific lecture, problem, question, exercise, or any other helpful material.</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    <div className="font-semibold text-2xl mb-2">Share a video</div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Title *</div>
                            <input
                                name={"title"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.title}
                                onChange={handleChange}
                                required={true}
                                placeholder={"e.g. Binary multiplication with Booth's algorithm"}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">Subject *</div>
                            <input
                                name={"subject"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.subject}
                                onChange={handleChange}
                                required={true}
                                placeholder={"e.g. Digital Logic Design"}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Author *</div>
                            <input
                                name={"author"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.author}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">University *</div>
                            <input
                                name={"university"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2  text-sm"}
                                type={"text"}
                                value={formData.university}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-col flex-1 mb-3">
                        <div className="font-light">Video URL *</div>
                        <input
                            name={"videoUrl"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                            type={"url"}
                            value={formData.videoUrl}
                            onChange={handleChange}
                            required={true}
                            placeholder={"https://youtu.be/3ExvS5rXKUA"}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Link to a YouTube video, Google Drive, or any other publicly accessible URL</div>
                    </div>

                    <div className="flex-col flex-1">
                        <div className="font-light">Description</div>
                        <textarea
                            name={"description"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                            value={formData.description}
                            onChange={handleChange}
                            required={false}
                            rows={7}
                            placeholder={"(Optional) Describe in a few words about what this video/playlist does and why it's worth sharing..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Your peers appreciate more videos that are described about. Try adding a description to reach more people.</div>
                    </div>

                    <div className="w-full border-b border-border-color mt-5 mb-2"></div>

                    <button
                        className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                        onClick={handleSubmit}
                    >
                        <Upload size={18}/>
                        <div className="ml-2 text-sm">Share Video</div>
                    </button>

                </div>
            </div>
        </div>
    )


    return (
        <div className={"w-full bg-black p-20 flex-row text-white min-h-screen min-w-screen justify-center"}>

            <div className="flex-col w-3/5 p-10">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Books
                </div>

                <div className="text-sm text-gray-dark mb-6">Index New Books</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    {/*<div className="font-semibold text-2xl">Upload New Book</div>*/}

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Title *</div>
                            <input
                                name={"title"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.title}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">Subject *</div>
                            <input
                                name={"subject"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.subject}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Semester *</div>
                            <select
                                name={"semester"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                value={formData.semester}
                                required={true}
                                onChange={handleChange}
                            >
                                <option value={"non-specific"} >Non-Specific</option>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                                <option value={"6"}>6</option>
                                <option value={"7"}>7</option>
                                <option value={"8"}>8</option>
                            </select>
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">Book Author *</div>
                            <input
                                name={"bookAuthor"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.bookAuthor}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Author *</div>
                            <input
                                name={"author"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.author}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">University *</div>
                            <input
                                name={"university"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.university}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-col flex-1">
                        <div className="font-light">Book URL *</div>
                        <input
                            name={"bookUrl"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                            type={"url"}
                            value={formData.bookUrl}
                            onChange={handleChange}
                            required={true}
                            placeholder={"https://..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Link to your Google Drive, Dropbox, or any other publicly accessible URL</div>
                    </div>

                    <button
                        className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                        onClick={handleSubmit}
                    >
                        <Upload size={18}/>
                        <div className="ml-2 text-sm">Upload Book</div>
                    </button>

                </div>
            </div>

        </div>
    )
}
