"use client";


import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";
import {HorizontalRule} from "@/components/ui/HorizontalRule";


export default function LoginClient() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        const res = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert(data.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className={"flex-col items-center justify-center min-h-screen text-white texture-mosaic pt-14 sm:pt-24"}>
            <div className="bg-gray-900 p-4 border border-gray-700 flex-col w-9/10 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4">
                <div className="text-2xl font-bold">Login to Parhle</div>
                <div className="flex-col w-full mt-4">
                    <div className="text-sm font-semibold">Username</div>
                    <input
                        value={username}
                        name={"username"}
                        type={"username"}
                        required={true}
                        className={"flex bg-gray-800 p-2 flex-1 border border-gray-700 text-base"}
                        onChange={(e) => setUsername(e.target.value)}
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
                <HorizontalRule/>
                {
                    loading ?
                        <div className="flex-1 justify-center p-2"><Spinner/></div>
                        :
                        <button
                            onClick={handleLogin}
                            className={"flex bg-white text-black text-sm items-center justify-center p-2 font-semibold text-center mt-4 cursor-pointer duration-200 hover:shadow-lg shadow-white/20"}
                        >Login</button>
                }
                <div className="text-base text-gray-dark font-semibold justify-center mt-5 gap-1">Don't have an account? <Link href={"/user/signup"} className={"hover:text-white duration-150 text-gray-medium"}>Sign up</Link></div>
            </div>
        </div>
    )
}