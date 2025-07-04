"use client";


import {Check, Upload} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
    DashboardHeading, DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock, ExpandableSelectInputGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import StatusToast from "@/components/ui/StatusToast";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import Spinner from "@/components/ui/Spinner";
import {ResourceGuidelines} from "@/components/ui/Guidelines";


export default function AddResourceClient({user, sidebarStatus}) {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        semester: "",
        teacher: "",
        author: user.username,
        university: "",
        url: "",
    });


    const handleChange = (e) => {
        console.log("detected change")
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true);

        try {

            const response = await fetch("/api/resource/upload", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Resource uploaded successfully!", icon: Check});
                setFormData({
                    title: "",
                    subject: "",
                    semester: "non-specific",
                    teacher: "",
                    author: user.username,
                    university: "University of Karachi",
                    url: "",
                });
            } else {
                setError(result.message || "Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading book:", error);
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
                        heading={"Add Resource"}
                        description={"Index New Resources"}
                    />
                    <div className="flex-col gap-6">
                        <DashboardWorkspaceBlock extraClasses={"gap-3"}>
                            <DashboardHeading>Upload New Resource</DashboardHeading>
                            <div className="flex-col md:flex-row gap-4">
                                <ExpandableTextInputGroup
                                    name={"title"}
                                    title={"Title"}
                                    value={formData.title}
                                    onChange={handleChange}
                                    isRequired={true}
                                    placeholder={"e.g. Past Paper Discrete Mathematics MKR 2022"}
                                />
                                <ExpandableTextInputGroup
                                    name={"subject"}
                                    title={"Subject"}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    isRequired={true}
                                    placeholder={"Discrete Mathematics"}
                                />
                            </div>
                            <div className="flex-col md:flex-row gap-4">
                                <ExpandableTextInputGroup
                                    name={"teacher"}
                                    title={"Teacher"}
                                    value={formData.teacher}
                                    onChange={handleChange}
                                    isRequired={true}
                                    placeholder={"e.g. Mukesh Kumar"}
                                />
                                <ExpandableSelectInputGroup
                                    name={"semester"}
                                    defaultValue={"non-specific"}
                                    isRequired={true}
                                    onChange={handleChange}
                                    title={"Semester"}
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
                                />
                            </div>
                            <ExpandableTextInputGroup
                                name={"university"}
                                title={"University"}
                                value={formData.university}
                                onChange={handleChange}
                                isRequired={true}
                                placeholder={"e.g. University of Karachi"}
                            />
                            <ExpandableTextInputGroup
                                name={"url"}
                                title={"Resource URL"}
                                value={formData.url}
                                onChange={handleChange}
                                isRequired={true}
                                placeholder={"https://..."}
                            />

                            <div className="py-2 flex-col">
                                <HorizontalRule/>
                                {!!error &&
                                    <div className="text-sm text-red-500">{error}</div>
                                }
                            </div>


                            {loading ? <Spinner/> :
                                <SmallIconTextButton
                                    Icon={Upload}
                                    text={"Upload Resource"}
                                    onClick={handleSubmit}
                                />
                            }
                        </DashboardWorkspaceBlock>
                        <ResourceGuidelines/>
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