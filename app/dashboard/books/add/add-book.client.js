"use client";


import {Check, Upload} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import ContentGuidelines, {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace, DashboardWorkspaceBlock, ExpandableSelectInputGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import StatusToast from "@/components/ui/StatusToast";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import Spinner from "@/components/ui/Spinner";
import {BookGuidelines} from "@/components/ui/Guidelines";


export default function AddBookClient({user, sidebarStatus}) {

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        semester: "non-specific",
        bookAuthor: "",
        author: user.username,
        university: "University of Karachi",
        url: "",
    });
    const [toast, setToast] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true);


        try {
            const response = await fetch("/api/book/upload", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Book uploaded successfully!", icon: Check});
                setFormData({
                    title: "",
                    subject: "",
                    semester: "non-specific",
                    bookAuthor: "",
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
                        heading={"Add Book"}
                        description={"Index New Books"}
                    />
                    <div className="flex-col gap-6">
                        <DashboardWorkspaceBlock extraClasses={"gap-3"}>
                            <DashboardHeading>Upload New Book</DashboardHeading>
                            <div className="flex-col md:flex-row gap-4">
                                <ExpandableTextInputGroup
                                    title={"Title"}
                                    value={formData.title}
                                    onChange={handleChange}
                                    isRequired={true}
                                    name={"title"}
                                    placeholder={"e.g. Digital Computer Electronics 3rd Edition"}
                                />
                                <ExpandableTextInputGroup
                                    title={"Author"}
                                    isRequired={true}
                                    name={"bookAuthor"}
                                    placeholder={"e.g. Albert P. Malvino, Jerald A. Brown"}
                                    value={formData.bookAuthor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-col md:flex-row gap-4">
                                <ExpandableTextInputGroup
                                    title={"Subject"}
                                    isRequired={true}
                                    name={"subject"}
                                    placeholder={"e.g. Digital Logic Design"}
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                <ExpandableSelectInputGroup
                                    name={"semester"}
                                    isRequired={true}
                                    onChange={handleChange}
                                    title={"Semester"}
                                    defaultValue={"non-specific"}
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
                                title={"University"}
                                isRequired={true}
                                name={"university"}
                                placeholder={"e.g. University of Karachi"}
                                value={formData.university}
                                onChange={handleChange}
                            />
                            <ExpandableTextInputGroup
                                title={"Book URL"}
                                isRequired={true}
                                name={"url"}
                                placeholder={"https://..."}
                                value={formData.url}
                                onChange={handleChange}
                            />

                            <div className="py-2 flex-col">
                                <HorizontalRule/>
                                {!!error &&
                                    <div className="text-sm text-red-500">{error}</div>
                                }
                            </div>
                            {loading ? <Spinner/> :
                                <SmallIconTextButton
                                    onClick={handleSubmit}
                                    text={"Upload Book"}
                                    Icon={Upload}
                                />
                            }
                        </DashboardWorkspaceBlock>
                        <BookGuidelines/>
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
    )

}
