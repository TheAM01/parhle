"use client";

import {SignInButton, SignOutButton} from "@/components/ui/button";
import {useEffect} from "react";
import Spinner from "@/components/ui/spinner";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/?already-logged-in=true");
        }
    }, [status, router]);

    if (status === "loading" || status === "authenticated") {
        return (
            <div className="text-white h-screen items-center justify-center w-full">
                <Spinner/>
            </div>
        ) // 🔇 No render at all
    }

    // ✅ Only reaches here if user is unauthenticated
    return (
        <div className="text-white h-screen items-center justify-center w-full flex-col">
            <SignInButton/>
        </div>
    );
}