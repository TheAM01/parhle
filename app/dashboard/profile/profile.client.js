"use client";

// import Input from "@/components/ui/input";
import {Upload, Pencil} from "lucide-react";
import {useState} from "react";
import SideBar from "@/components/ui/sidebar";
import {IconButton} from "@/components/ui/button";

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


    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar user={user} sidebarStatus={sidebarStatus}/>
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
                                <div className="text-3xl font-bold">{user.likes || 202}</div>
                                <div className="text-gray-dark text-sm">Likes</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.requests?.length || 2}</div>
                                <div className="text-gray-dark text-sm">Resolved Requests</div>
                            </div>

                        </div>

                        <div className="w-full border-b border-border-color mt-2 mb-2"></div>

                        <div className="justify-evenly w-full items-center">
                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.resources?.length || 50}</div>
                                <div className="text-gray-dark text-sm">Shared Resources</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.books?.length || 1}</div>
                                <div className="text-gray-dark text-sm">Shared Books</div>
                            </div>

                            <div className="flex-col items-center gap-2">
                                <div className="text-3xl font-bold">{user.contributions?.channels?.length || 5}</div>
                                <div className="text-gray-dark text-sm">Shared Channels</div>
                            </div>


                        </div>

                        <div className="w-full border-b border-border-color mt-2 mb-2"></div>

                        <div className="text-gray-dark text-sm">Member since {user.createdAt || "the OG days"}</div>

                    </div>

                    <div className="flex-col bg-gray-900 border border-border-color p-5 w-full gap-1">
                        <div className="font-semibold text-2xl mb-2">Profile Details</div>

                        <div className="text-sm font-semibold">Username</div>
                        <div className="mb-3 text-gray-medium">@{user.username}</div>

                        <div className="text-sm font-semibold">Name</div>
                        <div className="mb-3 text-gray-medium">{user.fullName}</div>

                        <div className="text-sm font-semibold">Enrolled Course</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.course}</div>

                        <div className="text-sm font-semibold">Current Semester</div>
                        <div className="mb-3 text-gray-medium">{user.academicDetails?.semester}</div>

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


    return (
        <div className={"w-full bg-black p-20 flex-row text-white min-h-screen min-w-screen justify-center"}>

            <div className="flex-col w-3/5 p-10">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Books
                </div>

                <div className="text-sm text-gray-dark mb-6">Index New Books</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    {/*<div className="font-semibold text-2xl">Upload New Book</div>*/}

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Title *</div>
                            <input
                                name={"title"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={profileData.title}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">Subject *</div>
                            <input
                                name={"subject"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={profileData.subject}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Semester *</div>
                            <select
                                name={"semester"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                value={profileData.semester}
                                required={true}
                                onChange={handleChange}
                            >
                                <option value={"non-specific"} >Non-Specific</option>
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
                        <div className="flex-col flex-1">
                            <div className="font-light">Book Author *</div>
                            <input
                                name={"bookAuthor"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={profileData.bookAuthor}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Author *</div>
                            <input
                                name={"author"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={profileData.author}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">University *</div>
                            <input
                                name={"university"}
                                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                                type={"text"}
                                value={profileData.university}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="flex-col flex-1">
                        <div className="font-light">Book URL *</div>
                        <input
                            name={"bookUrl"}
                            className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                            type={"url"}
                            value={profileData.bookUrl}
                            onChange={handleChange}
                            required={true}
                            placeholder={"https://..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Link to your Google Drive, Dropbox, or any other publicly accessible URL</div>
                    </div>

                    <button
                        className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                        onClick={handleSubmit}
                    >
                        <Upload size={18}/>
                        <div className="ml-2 text-sm">Upload Book</div>
                    </button>

                </div>
            </div>

        </div>
    )
}
