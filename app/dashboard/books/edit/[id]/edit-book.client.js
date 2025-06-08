'use client';


import ContentGuidelines, {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace, DashboardWorkspaceBlock, ExpandableSelectInputGroup, ExpandableTextInputGroup,
    PageTitle, SmallIconTextButton
} from "@/components/ui/Structure";
import {Check, Save} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import {useState} from "react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import StatusToast from "@/components/ui/StatusToast";
import Spinner from "@/components/ui/Spinner";
import {useRouter} from "next/navigation";
import {BookGuidelines} from "@/components/ui/Guidelines";


export default function EditBookClient({user, sidebarStatus, book}) {
    const router = useRouter()
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: book.title,
        subject: book.subject,
        semester: book.semester,
        bookAuthor: book.bookAuthor,
        university: book.university,
        url: book.url,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        setLoading(true);
        try {
            const response = await fetch(`/api/book/edit/${book._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setToast({message: "Book updated successfully!", icon: Check})
                router.push("/dashboard/books/my");
            } else {
                setError(result.message || "Update failed.");
            }
        } catch (error) {
            console.error("Error updating book:", error);
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
                        heading={`Edit Book`}
                        description={"Make changes to the book below"}
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
                                            [0,1,2,3,4,5,6,7,8].includes(Number(formData.semester))
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
    );
}
