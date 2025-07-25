"use client";

import {useCallback, useEffect, useState} from "react";

import Link from "next/link";
import {LinkButton} from "@/components/ui/Buttons";
import {Menu, LayoutDashboard, LogIn} from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export default function Navigation({}) {

    const [open, setOpen] = useState(false);
    const [session, setSession] = useState(null);

    const toggleMenu = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);


    useEffect(() => {
        fetch('/api/session')
            .then(res => res.json())
            .then(data => {
                if (!data.loggedIn) {
                    setSession(null)
                } else {
                    setSession(data.session);
                }
            });
    }, []);

    const button = (!session ?
        <LinkButton href="/user/login">
            <LogIn size={16} /> Join Now
        </LinkButton>
        :
        <LinkButton href="/dashboard">
            <LayoutDashboard size={16} /> Dashboard
        </LinkButton>
    )

    const navigationItemTailwindClass = "flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"

    const navigationItems = [
        <Link key={"1"} href={"/books"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>Books</Link>,
        <Link key={"2"} href={"/channels"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>Channels</Link>,
        <Link key={"3"} href={"/resources"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>Resources</Link>,
        <Link key={"5"} href={"/request"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>Request</Link>,
        <Link key={"6"} href={"/docs/guide"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>Guide</Link>,
        <Link key={"7"} href={"/about"} onClick={() => setOpen(false)} className={navigationItemTailwindClass}>About</Link>
    ];

    return (
        <div className="align-center flex-col w-screen fixed top-0 bg-black border-solid border-border border-b border-border-color z-10" id={"navigation"}>
            <div className={"p-1.5 flex-1 justify-between sm:p-3.5 sm:justify-evenly items-center"}>
                <a className={"text-2xl text-gray-medium select-none font-logo hover:cursor-pointer"} href={"/"}>
                    Parhle
                </a>
                <div className="w-min z-10 sm:hidden!">
                    <button
                        className=" text-3xl focus:outline-none text-white bg-black rounded-sm items-center"
                        onClick={toggleMenu}
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
                <div className="flex-col sm:hidden top-11 absolute w-full bg-black text-white border-solid border-border border-b border-border-color z-10" onClick={() => setOpen(false)}>
                    {navigationItems}
                    {button}
                </div>
            )}

        </div>
    )
}