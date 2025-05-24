"use client";

import {Send} from "lucide-react";
import {useState} from "react";
import {RadioGroup} from "@/components/ui/Inputs";
import {HorizontalRule} from "@/components/ui/HorizontalRule";

export default function RequestResource({user}) {

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        university: "",
        semester: "non-specific",
        resourceType: "",
        author: (user?.username || "anonymous"),
        priority: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();

        // Extract form data
        const { title, subject, university, semester, resourceType, author, priority, description } = formData;

        const response = await fetch("/api/request/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subject, university, semester, resourceType, author, priority, description }),
        });

        const result = await response.json();
        console.log(result);

        setFormData({
            title: "",
            subject: "",
            university: "",
            semester: "non-specific",
            resourceType: "",
            author: (user?.username || "anonymous"),
            priority: "",
            description: ""
        })
    };

    return (
        <div className={"flex-col w-screen bg-black text-white min-h-screen pt-10 sm:pt-20 items-center texture-mosaic"}>

            <div className="flex-col w-full md:w-4/5 lg:w-3/5 xl:w-2/5 lg:mx-30 p-4 lg:p-10">

                <div className="text-4xl mb-3 font-bold">
                    Request a Resource
                </div>

                <div className="text-sm text-gray-dark mb-6">If you can’t find a resource you need, request it here! Our contributors will review your request and add it to the platform if possible. Please visit our guidelines for requesting a resource.</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    <div className="font-semibold text-xl mb-2">What type of resource are you looking for?</div>

                    <RadioGroup
                        options={[
                            { name: "Notes", value: "Notes" },
                            { name: "Books", value: "Books" },
                            { name: "Past Papers", value: "Past Papers" },
                            { name: "Slides", value: "Slides" },
                            { name: "Lectures", value: "Lectures" },
                            { name: "Other", value: "Other" }
                        ]}
                        name="resourceType"
                        value={formData.resourceType}
                        onChange={handleChange}
                    />

                    <div className="flex-wrap gap-5 my-4">
                        <div className="flex-col flex-1">
                            <div className="font-light">Title *</div>
                            <input
                                name={"title"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.title}
                                onChange={handleChange}
                                placeholder={"e.g. Past Papers Sir Mukesh 2024"}
                                required={true}
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
                                placeholder={"e.g. Discrete Mathematics"}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Semester *</div>
                            <select
                                name={"semester"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                value={formData.semester}
                                required={true}
                                onChange={handleChange}
                            >
                                <option value={"non-specific"}>Non-Specific</option>
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

                    </div>

                    <div className="flex-wrap gap-5 mb-4">
                        <div className="flex-col flex-1">
                            <div className="font-light">University *</div>
                            <input
                                name={"university"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.university}
                                onChange={handleChange}
                                placeholder={"e.g. University of Karachi"}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-col flex-1">
                        <div className="font-light">Description *</div>
                        <textarea
                            name={"description"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                            value={formData.description}
                            onChange={handleChange}
                            required={true}
                            rows={7}
                            placeholder={"Describe in detail about your request..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Your request is 80% more likely to be accepted if your description is concise & informative. Requests with vague descriptions will be rejected.</div>
                    </div>

                    <div className="mt-4 mb-2 text-sm">How urgent is your request?</div>

                    <RadioGroup
                        options={[
                            { name: "Not Urgent", value: "1" },
                            { name: "Somewhat Urgent", value: "2" },
                            { name: "Very Urgent", value: "3" }
                        ]}
                        name="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        extraClasses={"mb-3"}
                    />

                    <HorizontalRule/>
                    {/*<div className="w-full border-b border-border-color mt-5 mb-2"></div>*/}

                    <button
                        className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-semibold"}
                        onClick={handleSubmit}
                    >
                        <Send size={18}/>
                        <div className="ml-2 text-sm">Submit Request</div>
                    </button>

                </div>


                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mt-7">
                    <div className="text-2xl mb-2">How Resource Requests Work</div>

                    <div className="items-center my-2">
                        <div className="rounded-full bg-white text-black p-1 flex-shrink-0 w-6 h-6 justify-center leading-none font-bold mr-3">1</div>
                        Submit your request with as much detail as possible
                    </div>

                    <div className="items-center my-2">
                        <div className="rounded-full bg-white text-black p-1 flex-shrink-0 w-6 h-6 justify-center leading-none font-bold mr-3">2</div>
                        Moderators will validate your request
                    </div>

                    <div className="items-center my-2">
                        <div className="rounded-full bg-white text-black p-1 flex-shrink-0 w-6 h-6 justify-center leading-none font-bold mr-3">3</div>
                        Moderators, community members and contributors will look for the resource
                    </div>

                    <div className="items-center my-2">
                        <div className="rounded-full bg-white text-black p-1 flex-shrink-0 w-6 h-6 justify-center leading-none font-bold mr-3">4</div>
                        Resource will be uploaded and you'll be notified
                    </div>

                </div>
            </div>
        </div>
    );
}
