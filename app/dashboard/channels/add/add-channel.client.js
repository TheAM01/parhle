"use client";

import {Upload, Check, X, Save} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import axios from "axios";
import StatusToast from "@/components/ui/StatusToast";
import {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock, ExpandableTextAreaGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import Spinner from "@/components/ui/Spinner";
import {ChannelGuidelines} from "@/components/ui/Guidelines";

export default function AddChannelClient({user, sidebarStatus}) {

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        author: user.username,
        university: "",
        description: "",
        url: "",
    });

    const [toast, setToast] = useState(null); // { message: '', icon: </>}
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "url") {
            const channelName = await fetchChannelName(value);

            if (channelName) {
                setFormData((prev) => ({
                    ...prev,
                    title: channelName, // autofill "author" field with channel name
                    url: value
                }));
            }
        }
    };

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


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data
        const { title, subject, author, university, description, url } = formData;

        if (!title || !subject || !author || !university || !description || !url) {
            return setToast({ message: 'Missing fields!', icon: X });
        }

        const response = await fetch("/api/channel/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subject, author, university, description, url }),
        });

        const status = response.status;

        setFormData({
            title: "",
            subject: "",
            author: user.username,
            university: "University of Karachi",
            description: "",
            url: "",
        });

        setToast({ message: 'Upload successful!', icon: Check });

        return status;
    };

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={"Add YouTube Channels"}
                        description={"Share a channel about a specific subject, lecture, problem, question, exercise, book or any other helpful material."}
                    />

                    <div className="gap-6 flex-col">
                        <DashboardWorkspaceBlock>
                            <DashboardHeading>Details</DashboardHeading>
                            <div className="gap-4 flex-col">
                                <div className={"gap-4 flex-col md:flex-row"}>
                                    <ExpandableTextInputGroup
                                        title={"Title"}
                                        isRequired={true}
                                        name={"title"}
                                        onChange={handleChange}
                                        value={formData.title}
                                        placeholder={"e.g. Linus Tech Tips"}
                                        readonly={true}
                                    />
                                    <ExpandableTextInputGroup
                                        title={"Subject"}
                                        isRequired={true}
                                        name={"subject"}
                                        onChange={handleChange}
                                        value={formData.subject}
                                        placeholder={"e.g. Digital Logic Design"}
                                    />
                                </div>
                                <ExpandableTextInputGroup
                                    title={"University"}
                                    isRequired={true}
                                    name={"university"}
                                    onChange={handleChange}
                                    value={formData.university}
                                    placeholder={"e.g. University of Karachi"}
                                />
                                <ExpandableTextInputGroup
                                    title={"Channel URL"}
                                    isRequired={true}
                                    name={"url"}
                                    onChange={handleChange}
                                    value={formData.url}
                                    placeholder={"https://youtube.com/@LinusTechTips"}
                                />
                                <ExpandableTextAreaGroup
                                    title={"Description"}
                                    name={"description"}
                                    onChange={handleChange}
                                    isRequired={false}
                                    placeholder={"(Optional) Describe in a few words about what this video/playlist does and why it's worth sharing..."}
                                    value={formData.description}
                                />
                            </div>

                            <div className="py-2 flex-col">
                                <HorizontalRule/>
                                {!!error &&
                                    <div className="text-sm text-red-500">{error}</div>
                                }
                            </div>

                            {loading ? <Spinner/> :
                                <SmallIconTextButton
                                    Icon={Save}
                                    text={"Save Changes"}
                                    onClick={handleSubmit}
                                />
                            }
                        </DashboardWorkspaceBlock>
                        <ChannelGuidelines/>
                    </div>

                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>

                    <PageTitle
                        heading={"Add YouTube Channels"}
                        description={"Share a channel about a specific subject, lecture, problem, question, exercise, book or any other helpful material."}
                    />

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                        <div className="font-semibold text-2xl mb-2">Share a Channel</div>

                        <div className="flex-wrap gap-5 mb-5">
                            <div className="flex-col flex-1">
                                <div className="font-light">Title</div>
                                <input
                                    name={"title"}
                                    className={"flex-1 flex border-gray-700 border bg-gray-700 text-white placeholder-gray-medium p-2 text-sm"}
                                    type={"text"}
                                    value={formData.title}
                                    onChange={handleChange}
                                    required={true}
                                    placeholder={"e.g. Linus Tech Tips"}
                                    readOnly={true}
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
                            <div className="font-light">URL *</div>
                            <input
                                name={"url"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"url"}
                                value={formData.url}
                                onChange={handleChange}
                                required={true}
                                placeholder={"e.g. https://youtube.com/@LinusTechTips"}
                            />
                            <div className="mt-1 text-gray-dark text-xs">Link to a YouTube channel</div>
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
                            <div className="mt-1 text-gray-dark text-xs">Your peers appreciate channels that are described about more. Try adding a description to reach more people.</div>
                        </div>


                        <div className="w-full border-b border-border-color mt-5 mb-2"></div>

                        <button
                            className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                            onClick={handleSubmit}
                        >
                            <Upload size={18}/>
                            <div className="ml-2 text-sm">Share Channel</div>
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
