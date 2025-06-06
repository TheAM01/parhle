"use client";

import {Check, Upload} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {DashboardScrollable, DashboardWorkspace, PageTitle} from "@/components/ui/Structure";
import StatusToast from "@/components/ui/StatusToast";

export default function AddBook({user, sidebarStatus}) {
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        semester: "non-specific",
        bookAuthor: "",
        author: user.username,
        university: "University of Karachi",
        bookUrl: "",
    });
    const [toast, setToast] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data
        const { title, subject, semester, bookAuthor, author, university, bookUrl } = formData;

        const response = await fetch("/api/book/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subject, semester, bookAuthor, author, university, bookUrl }),
        });

        const status = response.status;

        setFormData({
            title: "",
            subject: "",
            semester: "non-specific",
            bookAuthor: "",
            author: user.username,
            university: "University of Karachi",
            bookUrl: "",
        })
        setToast({ message: 'Upload successful!', icon: Check });
        return status;
    };

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>


                <DashboardWorkspace>
                    <PageTitle
                        heading={"Add Book"}
                        description={"Index New Books"}
                    />

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                        <div className="font-semibold text-2xl mb-2">Upload New Book</div>

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

                        <div className="flex-wrap gap-5 mb-5">
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
                    {toast && (
                        <StatusToast
                            message={toast.message}
                            type={toast.type}
                            icon={toast.icon}
                            onClose={() => setToast(null)}
                        />
                    )}
                </DashboardWorkspace>
            </DashboardScrollable>
        </div>
    )



}
