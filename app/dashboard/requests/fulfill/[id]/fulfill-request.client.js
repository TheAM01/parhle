'use client';


import {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace, DashboardWorkspaceBlock, ExpandableSelectInputGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import {Calendar, Check, Layers, Save, University, Zap} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import {useEffect, useState} from "react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import StatusToast from "@/components/ui/StatusToast";
import Spinner from "@/components/ui/Spinner";
import {useRouter} from "next/navigation";
import {priorities, requestStatuses} from "@/public/data";
import {BookGuidelines, ChannelGuidelines, ResourceGuidelines} from "@/components/ui/Guidelines";
import axios from "axios";


export default function FulfillRequestClient({user, sidebarStatus, request}) {
    const router = useRouter()

    const type = request.resourceType.toLowerCase();

    // New-upload form is pre-filled from the request so the fulfiller doesn't
    // retype what the requester already provided.
    const requestType = {
        resource: {
            guidelines: <ResourceGuidelines />,
            formData: {
                type: "resource",
                title: request.title || "",
                subject: request.subject || "",
                semester: request.semester || "non-specific",
                teacher: "",
                author: user.username,
                university: request.university || "",
                url: "",
                request
            },
            getForm: (formData, setFormData, handleChange) => <ResourceForm formData={formData} setFormData={setFormData} handleChange={handleChange}/>,
        },
        book: {
            guidelines: <BookGuidelines />,
            formData: {
                type: "book",
                title: request.title || "",
                subject: request.subject || "",
                semester: request.semester || "non-specific",
                bookAuthor: "",
                author: user.username,
                university: request.university || "",
                url: "",
                request: JSON.parse(JSON.stringify(request))
            },
            getForm: (formData, setFormData, handleChange) => <BookForm formData={formData} setFormData={setFormData} handleChange={handleChange}/>,
        },
        channel: {
            guidelines: <ChannelGuidelines />,
            formData: {
                type: "channel",
                title: "",
                subject: request.subject || "",
                author: user.username,
                university: request.university || "",
                description: "",
                url: "",
                request: JSON.parse(JSON.stringify(request))
            },
            getForm: (formData, setFormData, handleChange) => <ChannelForm formData={formData} setFormData={setFormData} handleChange={handleChange}/>,
        },
    }[type];

    if (!requestType) router.push("/dashboard/requests/my?error=true");

    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(() => requestType.formData);
    const [mode, setMode] = useState("link"); // "link" | "new"
    const [myUploads, setMyUploads] = useState([]);
    const [uploadsLoading, setUploadsLoading] = useState(true);
    const [selectedContentId, setSelectedContentId] = useState("");
    const priority = priorities[request.priority.toLowerCase()];
    const status = requestStatuses.find(rs => rs.name.toLowerCase() === request.status.toLowerCase());

    // Load the fulfiller's own uploads of this type so they can link one directly.
    useEffect(() => {
        async function loadUploads() {
            try {
                const res = await fetch(`/api/${type}/user/${user.username}`);
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                setMyUploads(list);
                if (list.length === 0) setMode("new");
            } catch (err) {
                console.error("Error loading uploads:", err);
                setMode("new");
            } finally {
                setUploadsLoading(false);
            }
        }
        loadUploads();
    }, [type, user.username]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")

        if (mode === "link" && !selectedContentId) {
            setError("Please select one of your uploads, or switch to Upload new.");
            return;
        }

        setLoading(true);
        try {
            const payload = mode === "link"
                ? { mode: "link", contentId: selectedContentId }
                : { mode: "new", ...formData };

            const response = await fetch(`/api/request/fulfill/${request._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Request fulfilled successfully!", icon: Check})
                router.push("/dashboard/requests/my");
            } else {
                setError(result.message || "Failed to fulfill request.");
            }
        } catch (error) {
            console.error("Error fulfilling request:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle
                        heading={`Fulfill Request`}
                        description={"Attach an existing upload or add a new one to answer this request"}
                    />
                    <div className="gap-6 flex-col">
                        <DashboardWorkspaceBlock extraClasses={"gap-2"}>
                            <div className="flex-col">
                                <DashboardHeading>Requested Data</DashboardHeading>
                                <div className="inline! space-x-1 text-sm mb-1">
                                    Posted by <span className={"text-gray-dark"}>{request.author}</span>
                                    on <span className={"text-gray-dark"}>{new Date(request.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>


                            <HorizontalRule/>

                            <div className="flex-col gap-2 md:flex-row md:justify-between">
                                <div className="text-2xl font-bold gap-1">
                                    {request.title}
                                </div>
                                <div className="gap-4">
                                    <div className="gap-1.5 text-sm items-center">
                                        <div className="items-center">
                                            Priority
                                        </div>
                                        <div className={`${priority.classes} text-xs items-center font-bold rounded-full px-2`}>{priority.alt}</div>
                                    </div>
                                    <div className="gap-1.5 text-sm items-center">
                                        <div className="items-center">
                                            Status
                                        </div>
                                        <div className={`${status.classes} text-xs items-center font-bold rounded-full px-2`}>{status.alt}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 bg-gray-950 text-semibold text-white mt-2">{request.description}</div>

                            <HorizontalRule/>
                            <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 text-gray-medium">
                                <div className="flex-col">
                                    <div className="gap-2 items-center leading-none">
                                        <University color={"white"} size={20}/>
                                        University: {request.university}
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <div className="gap-2 items-center leading-none">
                                        <Calendar color={"white"} size={20}/>
                                        Semester: {request.semester}
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <div className="gap-2 items-center leading-none">
                                        <Layers color={"white"} size={20}/>
                                        Resource Type: {request.resourceType}
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <div className="gap-2 items-center leading-none">
                                        <Zap color={"white"} size={20}/>
                                        Reward: + {priority.reward} AURA{mode === "new" ? " + upload reward" : ""}
                                    </div>
                                </div>
                            </div>
                        </DashboardWorkspaceBlock>


                        <DashboardWorkspaceBlock>
                            <DashboardHeading>Your Response</DashboardHeading>

                            {/* Mode toggle */}
                            <div className="gap-2 mb-4 flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => setMode("link")}
                                    className={`px-4 py-2 text-sm font-semibold cursor-pointer duration-150 ${mode === "link" ? "bg-white text-black" : "bg-gray-900 text-gray-medium hover:text-white border border-border-color"}`}
                                >
                                    Link one of my uploads
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("new")}
                                    className={`px-4 py-2 text-sm font-semibold cursor-pointer duration-150 ${mode === "new" ? "bg-white text-black" : "bg-gray-900 text-gray-medium hover:text-white border border-border-color"}`}
                                >
                                    Upload new
                                </button>
                            </div>

                            {mode === "link" ? (
                                <div className="flex-col gap-2">
                                    {uploadsLoading ? (
                                        <Spinner/>
                                    ) : myUploads.length === 0 ? (
                                        <div className="text-sm text-gray-dark">
                                            You have no {type} uploads yet. Switch to <span className="text-white">Upload new</span> to add one.
                                        </div>
                                    ) : (
                                        <div className="flex-col flex-1">
                                            <div className="font-light gap-1">Select one of your {type}s <div className="text-red-500">*</div></div>
                                            <select
                                                className="text-sm flex-1 flex border-gray-700 border bg-gray-800 text-white p-2"
                                                value={selectedContentId}
                                                onChange={(e) => setSelectedContentId(e.target.value)}
                                            >
                                                <option value="">Please select</option>
                                                {myUploads.map((item) => (
                                                    <option key={item._id} value={item._id}>{item.title}</option>
                                                ))}
                                            </select>
                                            <div className="mt-1 text-gray-dark text-xs">Only your own uploads can be linked.</div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                requestType.getForm(formData, setFormData, handleChange)
                            )}

                            <div className="py-2 flex-col">
                                <HorizontalRule/>
                                {!!error &&
                                    <div className="text-sm text-red-500">{error}</div>
                                }
                            </div>

                            {loading ? <Spinner/> :
                                <SmallIconTextButton
                                    Icon={Save}
                                    text={"Fulfill Request"}
                                    onClick={handleSubmit}
                                />
                            }

                        </DashboardWorkspaceBlock>

                        {requestType.guidelines}
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
            {toast && (
                <StatusToast
                    marginTop={10}
                    message={toast.message}
                    type={toast.type}
                    icon={toast.icon}
                    onClose={() => setToast(null)}
                />
            )}
        </DashboardParent>
    );
}


function ResourceForm({formData, handleChange}) {
    return (
        <div className="gap-4 flex-col">
            <div className={"gap-4 flex-col md:flex-row"}>
                <ExpandableTextInputGroup
                    title={"Title"}
                    isRequired={true}
                    name={"title"}
                    onChange={handleChange}
                    value={formData.title}
                    placeholder={"e.g. Past Papers Automata Theory HB 2025"}
                />
                <ExpandableTextInputGroup
                    title={"Subject"}
                    isRequired={true}
                    name={"subject"}
                    onChange={handleChange}
                    value={formData.subject}
                    placeholder={"e.g. Automata Theory"}
                />
            </div>
            <div className={"gap-4 flex-col md:flex-row"}>
                <ExpandableSelectInputGroup
                    title={"Semester"}
                    isRequired={true}
                    name={"semester"}
                    onChange={handleChange}
                    options={[
                        {name: "Non Specific", value: "non-specific"},
                        {name: 1, value: 1},
                        {name: 2, value: 2},
                        {name: 3, value: 3},
                        {name: 4, value: 4},
                        {name: 5, value: 5},
                        {name: 6, value: 6},
                        {name: 7, value: 7},
                        {name: 8, value: 8},
                    ]}
                    defaultValue={
                        [0,1,2,3,4,5,6,7,8].includes(Number(formData.semester))
                            ? Number(formData.semester)
                            : formData.semester
                    }
                />
                <ExpandableTextInputGroup
                    title={"Teacher"}
                    isRequired={true}
                    name={"teacher"}
                    onChange={handleChange}
                    value={formData.teacher}
                    placeholder={"e.g. Humaira Basheer"}
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
                title={"Resource URL"}
                isRequired={true}
                name={"url"}
                onChange={handleChange}
                value={formData.url}
                placeholder={"https://..."}
            />
        </div>
    )
}

function BookForm({formData, handleChange}) {
    return (
        <div className="gap-4 flex-col">
            <div className={"gap-4 flex-col md:flex-row"}>
                <ExpandableTextInputGroup
                    title={"Title"}
                    isRequired={true}
                    name={"title"}
                    onChange={handleChange}
                    value={formData.title}
                    placeholder={"e.g. Software Engineering 10th Edition"}
                />
                <ExpandableTextInputGroup
                    title={"Book Author"}
                    isRequired={true}
                    name={"bookAuthor"}
                    onChange={handleChange}
                    value={formData.bookAuthor}
                    placeholder={"e.g. Ian Sommerville"}
                />
            </div>
            <div className={"gap-4 flex-col md:flex-row"}>
                <ExpandableTextInputGroup
                    title={"Subject"}
                    isRequired={true}
                    name={"subject"}
                    onChange={handleChange}
                    value={formData.subject}
                    placeholder={"e.g. Software Engineering Fundamentals"}
                />
                <ExpandableSelectInputGroup
                    title={"Semester"}
                    isRequired={true}
                    name={"semester"}
                    onChange={handleChange}
                    options={[
                        {name: "Non Specific", value: "non-specific"},
                        {name: 1, value: 1},
                        {name: 2, value: 2},
                        {name: 3, value: 3},
                        {name: 4, value: 4},
                        {name: 5, value: 5},
                        {name: 6, value: 6},
                        {name: 7, value: 7},
                        {name: 8, value: 8},
                    ]}
                    defaultValue={
                        [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(Number(formData.semester))
                            ? Number(formData.semester)
                            : formData.semester
                    }
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
                title={"Book URL"}
                isRequired={true}
                name={"url"}
                onChange={handleChange}
                value={formData.url}
                placeholder={"https://..."}
            />
        </div>
    )
}

function ChannelForm({formData, setFormData, handleChange}) {

    const fetchChannelName = async (url) => {
        if (!url) return;

        try {
            const res = await axios.post('/api/channel/scrape', { url });
            return res.data.channelName;
        } catch (err) {
            console.log('Error:', err.message);
            return null;
        }
    }

    return (
        <div className={"flex-col"}>
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
                    onChange={async (e) => {
                        handleChange(e);
                        const channelName = await fetchChannelName(e.target.value);
                        if (channelName) {
                            setFormData((prev) => ({
                                ...prev,
                                title: channelName, // autofill title with channel name
                                url: e.target.value
                            }));
                        }
                    }}
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
        </div>
    )
}
