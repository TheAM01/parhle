"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export function LinkButton({href, children}) {
    return (
        <Link href={href} className={"flex items-center leading-none px-3.5 py-2.5 capitalize bg-white text-black sm:text-gray-dark duration-100 text-sm font-semibold no-underline hover:scale-105 hover:text-black transition-transform"}>{children}</Link>
    )
}

export function Button({children}) {
    return (
        <button className={"px-3.5 py-2.5 capitalize bg-white text-gray-dark duration-100 text-sm font-semibold no-underline border-0 hover:text-black hover:cursor-pointer"}>{children}</button>
    )
}

export function LogOutButton() {

    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/user/signin' });
        await router.push('/user/signin'); // Redirect to the sign-in page after logout
    };

    return (
        <button
            onClick={handleLogout()}
            className="flex items-center space-x-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
    );

}