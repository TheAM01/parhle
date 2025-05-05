"use client";

// import Input from "@/components/ui/input";
import {Upload} from "lucide-react";
import {useState} from "react";
import SideBar from "@/components/ui/sidebar";
import {ScreenSizeGetter} from "@/components/utility";

export default function AddResource({user}) {

    console.log("AddResource rendered");


    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        semester: "non-specific",
        teacher: "",
        author: user.username,
        university: "University of Karachi",
        resourceUrl: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data
        const { title, subject, semester, teacher, author, university, resourceUrl } = formData;

        const response = await fetch("/api/resource/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subject, semester, teacher, author, university, resourceUrl }),
        });

        const result = await response.json();
        console.log(result);

        setFormData({
            title: "",
            subject: "",
            semester: "non-specific",
            teacher: "",
            author: user.username,
            university: "University of Karachi",
            resourceUrl: "",
        });


    };


    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar/>
            <div className="flex-col w-full lg:mx-30 p-4 lg:p-10">

                <div className="text-4xl mb-3 font-bold">
                    Add Resource
                </div>

                <div className="text-sm text-gray-dark mb-6">Index New Resources</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    <div className="font-semibold text-2xl">Upload New Resource</div>

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
                                placeholder={"[Resource Type] [Subject] [Teacher] [Year]"}
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
                                placeholder={"e.g. Software Requirements Engineering"}
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
                            <div className="font-light">Teacher *</div>
                            <input
                                name={"teacher"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={formData.teacher}
                                onChange={handleChange}
                                required={true}
                                placeholder={"e.g. Sir Asim Ali"}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
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
                        <div className="font-light">Resource URL *</div>
                        <input
                            name={"resourceUrl"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                            type={"url"}
                            value={formData.resourceUrl}
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
                        <div className="ml-2 text-sm">Upload Resource</div>
                    </button>

                </div>
            </div>
        </div>
    )
}
