"use client";


import {Pencil} from "lucide-react";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";
import {HorizontalRule} from "@/components/ui/HorizontalRule";

export default function AddBook({user, sidebarStatus}) {
    const [profileData, setProfileData] = useState({
        course: "",
        fullName: "",
        semester: 0,
        university: ""
    })



    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { course, fullName, semester, university } = profileData;

        try {
            const response = await fetch("/api/profile/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ course, fullName, semester, university }),
            });

            if (!response.ok) {
                const err = await response.json();
                console.error("Failed to update profile:", err.message || "Unknown error");
                return;
            }

            // Optionally show success message
            console.log("Profile updated successfully");

            // Clear form only on success
            setProfileData({
                course: "",
                fullName: "",
                semester: 0,
                university: ""
            });
        } catch (error) {
            console.error("Network or server error:", error);
        }
    };

    const userDate = (new Date(user.createdAt)).toString().split(" ")

    console.log(user)
    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <Sidebar user={user} sidebarStatus={sidebarStatus}/>
            <div className="flex-col w-full lg:mx-30 p-4 lg:p-10">

                <div className="w-full justify-between">
                    <div className="text-4xl mb-3 font-bold">
                        Profile
                    </div>
                    <button onClick={() => {}} className={"flex items-center leading-none p-2 h-[2.5em] bg-gray-950 cursor-pointer hover:text-black duration-200 justify-center gap-2 border border-white hover:bg-white"}>
                        <Pencil size={15}/> Edit Profile
                    </button>
                </div>

                <div className="text-sm text-gray-dark mb-6">View/Edit your profile</div>

                <div className="flex-col lg:flex-row gap-6 mb-6">

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full items-center gap-1">

                        <img src={user.avatarImg} alt="avatar" className={"flex w-[125px] border-2 border-gray-700 bg-gray-800 mb-2"}/>

                        <div className="font-bold text-2xl">{user.fullName}</div>
                        <div className="text-gray-dark">@{user.username}</div>
                        <div className="text-gray-dark">{user.university}</div>

                        <div className="w-full border-b border-border-color mt-5 mb-2"></div>

                        <div className="justify-evenly w-full items-center">
                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.receivedLikes || 0}</div>
                                <div className="text-gray-dark text-sm">Likes</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.requests?.length || 0}</div>
                                <div className="text-gray-dark text-sm">Resolved Requests</div>
                            </div>

                        </div>

                        <HorizontalRule/>

                        <div className="justify-evenly w-full items-center">
                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.resources?.length || 0}</div>
                                <div className="text-gray-dark text-sm">Shared Resources</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.books?.length || 0}</div>
                                <div className="text-gray-dark text-sm">Shared Books</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.channels?.length || 0}</div>
                                <div className="text-gray-dark text-sm">Shared Channels</div>
                            </div>


                        </div>

                        <HorizontalRule/>

                        <div className="text-gray-dark text-sm">Member since {user.createdAt ? `${userDate[1]} ${userDate[3]}` : "the OG days"}</div>

                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full gap-1">
                        <div className="font-semibold text-2xl mb-2">Profile Details</div>

                        <div className="text-sm font-semibold">Username</div>
                        <div className="mb-3 text-gray-medium">@{user.username}</div>

                        <div className="text-sm font-semibold">Name</div>
                        <div className="mb-3 text-gray-medium">{user.fullName}</div>

                        <div className="text-sm font-semibold">Role</div>
                        <div className="mb-3 text-gray-medium">{user.role === "student" ? "Student" : "Administrator"}</div>

                        <div className="text-sm font-semibold">Enrolled Course</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.course}</div>

                        <div className="text-sm font-semibold">Current Semester</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.semester}</div>

                        <div className="text-sm font-semibold">Degree</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.degree}</div>

                        <div className="text-sm font-semibold">University</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.university}</div>
                    </div>

                </div>


                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full mb-6 gap-3">
                    <div className="font-semibold text-2xl mb-2">Account Preferences</div>

                    <div className="items-center w-full justify-between">
                        <div className="flex-col">
                            <div className="font-semibold">Email Notifications</div>
                            <div className="text-sm text-gray-dark">Receive notifications about new resources and messages</div>
                        </div>

                        [Y/N]

                    </div>

                    <div className="items-center w-full justify-between">
                        <div className="flex-col">
                            <div className="font-semibold">Public Profile</div>
                            <div className="text-sm text-gray-dark">Allow others to view your profile and contributions</div>
                        </div>

                        [Y/N]

                    </div>

                    <div className="items-center w-full justify-between">
                        <div className="flex-col">
                            <div className="font-semibold">Resource Recommendations</div>
                            <div className="text-sm text-gray-dark">Get personalized resource recommendations</div>
                        </div>

                        [Y/N]

                    </div>



                </div>


            </div>
        </div>
    )



}
