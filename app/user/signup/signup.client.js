"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupClient() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/user/login"); // or wherever you want
        } else {
            if (res.status === 400) {
                console.log("USer already exists")
            }
        }
    };

    function handleUsername(e) {
        const filtered = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
        setUsername(filtered);
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white pt-14 sm:pt-24">
            <div className="bg-gray-900 p-4 border border-gray-700 flex flex-col w-4/5 md:w-2/5 lg:w-1/4">
                <div className="text-2xl font-bold mb-4">Sign up for Parhle</div>
                <label className="text-sm font-semibold mb-1">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />
                <label className="text-sm font-semibold mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />
                <label className="text-sm font-semibold mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 p-2 border border-gray-700 mb-4"
                />
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
