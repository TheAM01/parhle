"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import StatusToast from "@/components/ui/StatusToast";
import Spinner from "@/components/ui/Spinner";
import { universityData} from "@/public/data";

export default function SignupClient() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        semester: "",
        degree: "",
        course: ""
    });
    const [error, setError] = useState("")
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignup = async () => {

        setLoading(true)

        if (Object.values(formData).some((val) => val.trim() === "")) {
            setLoading(false)
            return setError("All fields are required.");
        }


        const res = await fetch("/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/user/login"); // or wherever you want
        } else {
            setError(data.message)
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        console.log(formData)
        const { name, value } = e.target;

        // Generic update
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "username") {
            const filtered = value.replace(/[^a-zA-Z0-9_]/g, "");
            setFormData((prev) => ({
                ...prev,
                username: filtered,
            }));
            return;
        }

        if (name === "confirmPassword") {
            const same = formData.password === value;
            setError(same ? "" : "Passwords do not match");

            setFormData((prev) => ({
                ...prev,
                confirmPassword: value,
            }));
            return;
        }

        if (name === "password") {
            let error = "";

            if (value.length < 8) {
                error = "Password must be at least 8 characters long";
            } else if (formData.confirmPassword && formData.confirmPassword !== value) {
                error = "Passwords do not match";
            }

            setError(error);

            setFormData((prev) => ({
                ...prev,
                password: value,
            }));
            return;
        }
    };


    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white pt-14 sm:pt-24">
            <div className="bg-gray-900 p-4 border border-gray-700 flex flex-col w-4/5 md:w-2/5 lg:w-1/4">
                <div className="text-2xl font-bold mb-4">Sign up for Parhle</div>

                <label className="text-sm font-semibold mb-1">Name</label>
                <input
                    name={"fullName"}
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4 text-sm"
                />

                <label className="text-sm font-semibold mb-1">Username</label>
                <input
                    name={"username"}
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4 text-sm"
                />

                <label className="text-sm font-semibold mb-1">Email</label>
                <input
                    name={"email"}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4 text-sm"
                />

                <label className="text-sm font-semibold mb-1">Password</label>
                <input
                    name={"password"}
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4 text-sm"
                />

                <label className="text-sm font-semibold mb-1">Confirm Password</label>
                <input
                    name={"confirmPassword"}
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4 text-sm"
                />

                <HorizontalRule/>

                <label className="text-sm font-semibold mb-1">University</label>
                <select
                    name={"university"}
                    className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                    value={formData.university}
                    required={true}
                    onChange={handleChange}
                >
                    <option value="" disabled={true}>Select a university...</option>
                    {Object.keys(universityData).map((d, i) => (
                        <option value={d} key={i+"x"}>{universityData[d].name}</option>
                    ))}
                    <option value={"other"}>Other</option>
                </select>

                <label className="text-sm font-semibold mb-1">Semester</label>
                <select
                    name={"semester"}
                    className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                    value={formData.semester}
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

                <label className="text-sm font-semibold mb-1">Degree</label>
                <select
                    name={"degree"}
                    className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                    value={formData.degree}
                    required={true}
                    onChange={handleChange}
                >
                    <option value="" disabled={true}>Select a degree type...</option>
                    <option value={"bs"}>Bachelor of Science</option>
                    <option value={"be"}>Bachelor of Engineering</option>
                    <option value={"other"}>Other</option>
                    <option value={"non-specific"}>Non-Specific</option>
                </select>

                <label className="text-sm font-semibold mb-1">Course</label>
                <select
                    name={"course"}
                    className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm mb-4"}
                    value={formData.course}
                    required={true}
                    onChange={handleChange}
                >
                    <option value="" disabled={true}>Select a course...</option>
                    {universityData[formData.university] && universityData[formData.university].programs.map((course, i) => (
                        <option key={i} value={course.id}>{course.name}</option>
                    ))}
                    <option value={"other"}>Other</option>
                    <option value={"non-specific"}>Non-Specific</option>
                </select>

                {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

                <HorizontalRule/>

                {loading ?
                    <div className="justify-center">
                        <Spinner/>
                    </div>
                    :
                    <button
                        onClick={!loading && handleSignup}
                        className="bg-white text-black p-2 font-semibold hover:shadow-lg shadow-white/20"
                    >
                        Sign Up
                    </button>
                }

                {toast && (
                    <StatusToast
                        message={toast.message}
                        type={toast.type}
                        icon={toast.icon}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </div>
    );
}
