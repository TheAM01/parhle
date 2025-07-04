'use client';


import ContentGuidelines, {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock,
    ExpandableTextAreaGroup,
    ExpandableTextInputGroup,
    PageTitle,
    SmallIconTextButton
} from "@/components/ui/Structure";
import {Check, Save} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import {useState} from "react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import StatusToast from "@/components/ui/StatusToast";
import Spinner from "@/components/ui/Spinner";
import {useRouter} from "next/navigation";
import axios from "axios";
import {ChannelGuidelines} from "@/components/ui/Guidelines";


export default function EditChannelClient({user, sidebarStatus, channel}) {
    const router = useRouter()
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: channel.title,
        subject: channel.subject,
        description: channel.description,
        university: channel.university,
        url: channel.url,
    });


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
        setLoading(true);
        if (!url) return;

        try {
            const res = await axios.post('/api/channel/scrape', { url });
            return res.data.channelName;
        } catch (err) {
            console.log('Error:', err.message);
            console.log('Could not fetch name');
            return null;
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true);
        try {
            const response = await fetch(`/api/channel/edit/${channel._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Channel updated successfully!", icon: Check})
                router.push("/dashboard/channels/my");
            } else {
                setError(result.message || "Update failed.");
            }
        } catch (error) {
            console.error("Error updating channel:", error);
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
                        heading={`Edit Channel`}
                        description={"Make changes to the channel below"}
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
