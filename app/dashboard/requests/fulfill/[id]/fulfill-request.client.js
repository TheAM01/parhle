'use client';


import ContentGuidelines, {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace, DashboardWorkspaceBlock, ExpandableSelectInputGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import {Calendar, Check, Layers, Save, University, X, Zap} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import {useState} from "react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import StatusToast from "@/components/ui/StatusToast";
import Spinner from "@/components/ui/Spinner";
import {useRouter} from "next/navigation";
import {priorities, requestStatuses} from "@/public/data";
import {ScreenSizeGetter} from "@/components/utility";
import {BookGuidelines, ChannelGuidelines, ResourceGuidelines} from "@/components/ui/Guidelines";
import axios from "axios";


export default function FulfillRequestClient({user, sidebarStatus, request}) {
    const router = useRouter()

    const requestType = {
        resource: {
            guidelines: <ResourceGuidelines />,
            formData: {
                type: "resource",
                title: "",
                subject: "",
                semester: "",
                teacher: "",
                author: user.username,
                university: "University of Karachi",
                url: "",
                request
            },
            getForm: (formData, setFormData, handleChange) => <ResourceForm formData={formData} setFormData={setFormData} handleChange={handleChange}/>,
        },
        book: {
            guidelines: <BookGuidelines />,
            formData: {
                type: "book",
                title: "",
                subject: "",
                semester: "",
                bookAuthor: "",
                author: user.username,
                university: "",
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
                subject: "",
                author: user.username,
                university: "University of Karachi",
                description: "",
                url: "",
                request: JSON.parse(JSON.stringify(request))
            },
            getForm: (formData, setFormData, handleChange) => <ChannelForm formData={formData} setFormData={setFormData} handleChange={handleChange}/>,
        },
    }[request.resourceType.toLowerCase()];

    if (!requestType) router.push("/dashboard/requests/my?error=true");

    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(() => requestType.formData);
    const priority = priorities[request.priority.toLowerCase()];
    const status = requestStatuses.find(rs => rs.name.toLowerCase() === request.status.toLowerCase());

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true);
        console.log(formData)
        try {
            const response = await fetch(`/api/request/fulfill/${request._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Request fulfilled successfully!", icon: Check})
                router.push("/dashboard/requests/my");
            } else {
                setError("Backend resp: "+result.message || "Update failed.");
            }
        } catch (error) {
            console.error("Error updating resource:", error);
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
                        description={"Fulfill a request"}
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
                                        Reward: + {priority.reward} AURA
                                    </div>
                                </div>
                            </div>
                        </DashboardWorkspaceBlock>

                        <ScreenSizeGetter/>

                        <DashboardWorkspaceBlock>
                            <DashboardHeading>Response</DashboardHeading>

                            {requestType.getForm(formData, setFormData, handleChange)}

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
        console.log("fetcing...")
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
                                title: channelName, // autofill "author" field with channel name
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