// "use client";

import {useState} from "react";
import Link from "next/link";
import {LinkButton} from "@/components/ui/button";
import {Menu, LayoutDashboard, LogIn} from "lucide-react";
import { motion } from "framer-motion";
import {useSession} from "next-auth/react";

export default function Navigation() {
    const { data: session, status} = useSession();
    let button = <></>;

    if (!session) {
        button = <LinkButton href={"/signin"}> <LogIn size={17} className={"mr-2"} />Join Now</LinkButton>
    } else {
        button = <LinkButton href={"/dashboard"}> <LayoutDashboard size={17} className={"mr-2"} />Dashboard</LinkButton>
    }

    // 38.5 px for mobiles
    // 70 px for sm+

    const navigationItems = [
        <Link key={"1"} href={"/books"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Books</Link>,
        <Link key={"2"} href={"/notes"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Notes</Link>,
        <Link key={"3"} href={"/resources"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Resources</Link>,
        // <Link key={"4"} href={"/dashboard"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Dashboard</Link>,
        <Link key={"5"} href={"/request"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Request</Link>,
        <Link key={"6"} href={"/about"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>About</Link>,
    ]


    const [open, setOpen] = useState(false)
    return (
        <div className="align-center flex-col w-screen fixed top-0 bg-black border-solid border-border border-b border-border-color z-10" id={"navigation"}>
            <div className={"p-1.5 flex-1 justify-between sm:p-3.5 sm:justify-evenly items-center"}>
                <a className={"text-2xl text-gray-medium select-none font-logo hover:cursor-pointer"} href={"/"}>
                    Parhle
                </a>
                <div className="w-min z-10 sm:hidden!">
                    <button
                        className=" text-3xl focus:outline-none text-white bg-black rounded-sm items-center"
                        onClick={() => setOpen(!open)}
                    >
                        <Menu/>
                    </button>
                </div>

                <div className={"hidden! sm:flex!"}>
                    {navigationItems}
                </div>
                <div className="hidden! sm:flex!">
                    {button}
                </div>

            </div>

            {open && (
                <div className="flex-col sm:hidden top-11 absolute w-full bg-black text-white border-solid border-border border-b border-border-color z-10">
                    {navigationItems}
                    {button}
                </div>
            )}

        </div>
    )
}

function Niggavation() {
    const [open, setOpen] = useState(false)
    return (
        <div className={"p-3.5 align-center flex justify-evenly w-screen items-center sticky top-0 bg-black border-solid border-border border-b border-border-color z-10"}>

            <a className={"text-2xl text-gray-medium select-none font-logo hover:cursor-pointer hidden sm:flex"} href={"/"}>
                Parhle
            </a>
            <div className={"flex"}>
                <Link href={"/books"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Books</Link>
                <Link href={"/notes"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Notes</Link>
                <Link href={"/resources"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Resources</Link>
                <Link href={"/about"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>About</Link>
            </div>
            <div className="flex">
                <LinkButton href={"/signup"}>Join Now</LinkButton>
            </div>

        </div>
    )
}