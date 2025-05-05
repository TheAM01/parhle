"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className={"flex-col items-center justify-center min-h-screen text-white texture-mosaic pt-14 sm:pt-24"}>
            <div className="bg-gray-900 p-4 border border-gray-700 flex-col w-9/10 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4">
                <div className="text-2xl font-bold">Login to Parhle</div>
                <div className="flex-col w-full mt-4">
                    <div className="text-sm font-semibold">Email</div>
                    <input
                        value={email}
                        name={"email"}
                        type={"email"}
                        required={true}
                        className={"flex bg-gray-800 p-2 flex-1 border border-gray-700 text-base"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex-col w-full mt-4">
                    <div className="text-sm font-semibold">Password</div>
                    <input
                        value={password}
                        name={"password"}
                        type={"password"}
                        required={true}
                        className={"flex bg-gray-800 p-2 flex-1 border border-gray-700 text-base"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className={"flex bg-white text-black text-sm items-center justify-center p-2 font-semibold text-center mt-4 cursor-pointer duration-200 hover:shadow-lg shadow-white/20"}
                >Login</button>
                <div className="text-base text-gray-dark font-semibold justify-center mt-5">Don't have an account? Sign up</div>
            </div>
        </div>
    )
}