"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupClient() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        semester: "",
        course: ""
    });
    const [error, setError] = useState("")
    const router = useRouter();

    const handleSignup = async () => {

        if (Object.values(formData).some((val) => val.trim() === "")) {
            return setError("All fields are required.");
        }


        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        // const data = await res.json();

        if (res.ok) {
            router.push("/user/login"); // or wherever you want
        } else {
            if (res.status === 400) {
                console.log("USer already exists")
            }
        }
    };

    const handleChange = (e) => {
        console.log(formData)
        const { name, value } = e.target;
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
            const same = formData.confirmPassword === value;
            setError(same ? "" : "Passwords do not match");

            setFormData((prev) => ({
                ...prev,
                password: value,
            }));
            return;
        }


    }

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
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Username</label>
                <input
                    name={"username"}
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Email</label>
                <input
                    name={"email"}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Password</label>
                <input
                    name={"password"}
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Confirm Password</label>
                <input
                    name={"confirmPassword"}
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <div className="w-full border-b border-border-color mt-5 mb-2"></div>

                <label className="text-sm font-semibold mb-1">University</label>
                <input
                    name={"university"}
                    type="text"
                    value={formData.university}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Semester</label>
                <input
                    name={"semester"}
                    type="text"
                    value={formData.semester}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />

                <label className="text-sm font-semibold mb-1">Course</label>
                <input
                    name={"course"}
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />
                {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
                <button
                    onClick={handleSignup}
                    className="bg-white text-black p-2 font-semibold hover:shadow-lg shadow-white/20"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
