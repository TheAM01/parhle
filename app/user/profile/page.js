"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/spinner.js"
import { SignOutButton } from "@/components/ui/button";

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/user/signin?login-first=true&redirect-to=%2Fuser%2Fprofile");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="text-white h-screen items-center justify-center w-full">
                <Spinner/>
            </div>
        )
    }

    return (
        <div className="text-white h-screen items-center justify-center w-full flex-col">
            Signed in as {session.user.email}<br/>
            <SignOutButton/>
        </div>
    );

}
