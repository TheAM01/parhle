"use client";


import {Pencil, Save, Trash, X, Check} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {degreeData, universityData} from "@/public/data";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import Preference from "@/components/ui/Preference";
import StatusToast from "@/components/ui/StatusToast";
import {
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock
} from "@/components/ui/Structure";

export default function ProfileClient({user, sidebarStatus}) {

    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const [formData, setFormData] = useState({
        fullName: user.fullName,
        username: user.username,
        university: user.academicDetails.university,
        semester: user.academicDetails.semester,
        degree: user.academicDetails.degree,
        course: user.academicDetails.course,
        uniId: "",
    });

    const handleChange = (e) => {
        if (!editing) return;

        const { name, value } = e.target;
        let cleanedValue = value;

        if (name === "username") {
            cleanedValue = value.replace(/[^a-zA-Z0-9_]/g, "");
            setFormData((prev) => ({ ...prev, username: cleanedValue }));
            return;
        }

        if (name === "university") {
            const uni = universityData[value];
            if (uni) {
                setFormData((prev) => ({
                    ...prev,
                    university: uni.name,
                    uniId: value,
                }));
            }
            return;
        }

        if (name === "course") {
            const course = universityData[formData.uniId].programs.find(c => c.id === value);
            if (course) {
                setFormData((prev) => ({
                    ...prev,
                    course: course.name
                }))
            }
            return;
        }

        if (name === "degree") {
            const degree = degreeData[value];
            if (degree) {
                setFormData((prev) => ({
                    ...prev,
                    degree: degree
                }))
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    };


    const handleEdit = async () => {
        setLoading(true);

        if (Object.values(formData).some((val) => String(val).trim() === "")) {
            setLoading(false);
            return setError("All fields are required.");
        }

        try {
            const res = await fetch("/api/user/edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, currentUsername: user.username }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong.");
            } else {
                setEditing(false);
                setToast({message: "Profile updated successfully", icon: Check})
                router.push('/dashboard/profile')
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setToast({message: "Error", icon: X})
            setError("Failed to update user. Please try again later.");
        } finally {
            setLoading(false);

        }
    };


    const userDate = (new Date(user.createdAt)).toString().split(" ");

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <DashboardScrollable>
                <DashboardWorkspace>
                    <div className="w-full justify-between">
                        <div className="text-4xl mb-3 font-bold">
                            Profile
                        </div>
                        <button onClick={() => setEditing(true)} className={"flex items-center leading-none p-2 h-[2.5em] bg-gray-950 cursor-pointer hover:text-black duration-200 justify-center gap-2 border border-white hover:bg-white"}>
                            <Pencil size={15}/> Edit Profile
                        </button>
                    </div>

                    <div className="text-sm text-gray-dark mb-6">View/Edit your profile</div>
                    <div className="gap-6 flex-col">
                        <div className="gap-6 flex-col md:flex-row">
                            <DashboardWorkspaceBlock extraClasses={"items-center"}>
                                <img src={user.avatarImg} alt="avatar" className={"flex w-[125px] border-2 border-gray-700 bg-gray-800 mb-2"}/>

                                <div className="font-bold text-2xl">{editing ? formData.fullName : user.fullName}</div>
                                <div className="text-gray-dark">@{editing ? formData.username : user.username}</div>
                                <div className="text-gray-dark">
                                    {
                                        editing
                                            ? (formData.university === "other"
                                                ? "Other"
                                                : universityData[formData.university]?.name || user.academicDetails.university)
                                            : user.academicDetails.university
                                    }
                                </div>

                                <div className="w-full border-b border-border-color mt-5 mb-2"></div>

                                <div className="justify-between w-full items-center px-4">
                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.aura || 0}</div>
                                        <div className="text-gray-dark text-sm">AURA</div>
                                    </div>

                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.receivedLikes || 0}</div>
                                        <div className="text-gray-dark text-sm">Likes</div>
                                    </div>

                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.contributions?.requests?.length || 0}</div>
                                        <div className="text-gray-dark text-sm">Resolved Requests</div>
                                    </div>

                                </div>

                                <HorizontalRule/>

                                <div className="justify-between w-full items-center px-4">
                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.contributions?.resources?.length || 0}</div>
                                        <div className="text-gray-dark text-sm">Shared Resources</div>
                                    </div>

                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.contributions?.books?.length || 0}</div>
                                        <div className="text-gray-dark text-sm">Shared Books</div>
                                    </div>

                                    <div className="flex-col items-center gap-2 w-1/4 text-center">
                                        <div className="text-3xl font-bold">{user.contributions?.channels?.length || 0}</div>
                                        <div className="text-gray-dark text-sm">Shared Channels</div>
                                    </div>


                                </div>

                                <HorizontalRule/>

                                <div className="text-gray-dark text-sm">Member since {user.createdAt ? `${userDate[1]} ${userDate[3]}` : "the OG days"}</div>
                            </DashboardWorkspaceBlock>
                            <DashboardWorkspaceBlock extraClasses={"gap-1"}>
                                {editing ? (
                                    <>
                                        <div className="font-semibold text-2xl mb-2">Profile Details</div>

                                        <div className="text-sm font-semibold">Username</div>
                                        <StdInput name={"username"} placeholder={"e.g. johndoe01"} value={formData.username} onChange={handleChange}/>

                                        <div className="text-sm font-semibold">Name</div>
                                        <StdInput name={"fullName"} placeholder={"e.g. John Doe"} value={formData.fullName} onChange={handleChange}/>

                                        <div className="text-sm font-semibold">University</div>
                                        <select
                                            name={"university"}
                                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                                            defaultValue={""}
                                            required={true}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled={true}>Select a university...</option>
                                            {Object.keys(universityData).map((d, i) => (
                                                <option value={d} key={i+"x"}>{universityData[d].name}</option>
                                            ))}
                                            <option value={"other"}>Other</option>
                                        </select>

                                        <div className="text-sm font-semibold">Current Semester</div>
                                        <select
                                            name={"semester"}
                                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                                            defaultValue={""}
                                            required={true}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled={true}>Select a semester...</option>
                                            <option value={"1"}>1</option>
                                            <option value={"2"}>2</option>
                                            <option value={"3"}>3</option>
                                            <option value={"4"}>4</option>
                                            <option value={"5"}>5</option>
                                            <option value={"6"}>6</option>
                                            <option value={"7"}>7</option>
                                            <option value={"8"}>8</option>
                                            <option value={"non-specific"}>Non-Specific</option>
                                        </select>

                                        <div className="text-sm font-semibold">Degree</div>
                                        <select
                                            name={"degree"}
                                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                                            required={true}
                                            onChange={handleChange}
                                            defaultValue={""}
                                        >
                                            <option value="" disabled={true}>Select a degree type...</option>
                                            <option value={"bs"}>Bachelor of Science</option>
                                            <option value={"be"}>Bachelor of Engineering</option>
                                            <option value={"other"}>Other</option>
                                            <option value={"non-specific"}>Non-Specific</option>
                                        </select>

                                        <div className="text-sm font-semibold">Enrolled Course</div>
                                        <select
                                            name={"course"}
                                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                                            defaultValue={""}
                                            required={true}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled={true}>Select a course...</option>
                                            {universityData[formData.uniId] && universityData[formData.uniId].programs.map((course, i) => (
                                                <option key={i} value={course.id}>{course.name}</option>
                                            ))}
                                            <option value={"other"}>Other</option>
                                            <option value={"non-specific"}>Non-Specific</option>
                                        </select>

                                        {!!error &&
                                            <div className="text-sm text-red-500">{error}</div>
                                        }

                                        {loading ? <Spinner/> :
                                            <div className="w-full justify-end gap-2">
                                                <button onClick={() => setEditing(false)}
                                                        className={"flex items-center leading-none p-2 h-[2.5em] bg-transparent cursor-pointer hover:text-black duration-200 justify-center gap-2 border border-white hover:bg-white"}>
                                                    <Trash size={15}/> Cancel
                                                </button>
                                                <button onClick={handleEdit}
                                                        className={"flex items-center leading-none p-2 h-[2.5em] bg-transparent cursor-pointer hover:text-black duration-200 justify-center gap-2 border border-white hover:bg-white"}>
                                                    <Save size={15}/> Save
                                                </button>
                                            </div>
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold text-2xl mb-2">Profile Details</div>

                                        <div className="text-sm font-semibold">Username</div>
                                        <div className="mb-3 text-gray-medium">@{user.username}</div>

                                        <div className="text-sm font-semibold">Name</div>
                                        <div className="mb-3 text-gray-medium">{user.fullName}</div>

                                        <div className="text-sm font-semibold">Role</div>
                                        <div
                                            className="mb-3 text-gray-medium">{user.role === "student" ? "Student" : "Administrator"}</div>

                                        <div className="text-sm font-semibold">University</div>
                                        <div className="mb-3 text-gray-medium">{user.academicDetails?.university}</div>

                                        <div className="text-sm font-semibold">Current Semester</div>
                                        <div className="mb-3 text-gray-medium">{user.academicDetails?.semester}</div>

                                        <div className="text-sm font-semibold">Degree</div>
                                        <div className="mb-3 text-gray-medium">{user.academicDetails?.degree}</div>

                                        <div className="text-sm font-semibold">Enrolled Course</div>
                                        <div className="mb-3 text-gray-medium">{user.academicDetails?.course}</div>
                                    </>
                                ) }
                            </DashboardWorkspaceBlock>
                        </div>
                        <DashboardWorkspaceBlock extraClasses={"gap-3"}>
                            <div className="font-semibold text-2xl mb-2">Account Preferences</div>

                            <Preference
                                title={"Email Notifications"}
                                description={"Receive notifications about new resources and messages"}
                                defaultChecked={true}
                            />

                            <Preference
                                title={"Public Profile"}
                                description={"Allow others to view your profile and contributions"}
                            />
                        </DashboardWorkspaceBlock>
                    </div>
                    {toast && (
                        <StatusToast
                            marginTop={10}
                            message={toast.message}
                            type={toast.type}
                            icon={toast.icon}
                            onClose={() => setToast(null)}
                        />
                    )}
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    )
}

function StdInput({name, placeholder = "Input", value, onChange}) {
    return <input
        type={"text"}
        placeholder={placeholder}
        className={"mb-3 p-2 bg-gray-800 border border-gray-700 text-sm"}
        value={value}
        onChange={onChange}
        name={name}
    />
}