"use client";

import {useState} from "react";
import Link from "next/link";
import {LinkButton} from "@/components/ui/button";
import {Menu} from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {


    // 38.5 px for mobiles
    // 70 px for sm+


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
                    <Link href={"/books"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Books</Link>
                    <Link href={"/notes"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Notes</Link>
                    <Link href={"/resources"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Resources</Link>
                    <Link href={"/dashboard/add-resource"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Dashboard</Link>
                    <Link href={"/about"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>About</Link>
                </div>
                <div className="hidden! sm:flex!">
                    <LinkButton href={"/signup"}>Join Now</LinkButton>
                </div>

            </div>

            {open && (
                <div className="flex-col sm:hidden top-11 absolute w-full bg-black text-white border-solid border-border border-b border-border-color z-10">
                    <Link href={"/books"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Books</Link>
                    <Link href={"/notes"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Notes</Link>
                    <Link href={"/resources"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Resources</Link>
                    <Link href={"/dashboard/add-resource"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Dashboard</Link>
                    <Link href={"/about"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>About</Link>
                    <LinkButton href={"/signup"}>Join Now</LinkButton>
                </div>
            )}

        </div>
    )
}

// <>
//             <div className="fixed top-2 left-2 w-min z-10">
//                 <button
//                     className="sm:hidden  text-3xl focus:outline-none text-white bg-black rounded-sm items-center"
//                     onClick={() => setOpen(!open)}
//                 >
//                     <Menu/>
//                 </button>
//             </div>
//             {open && (
//                 <div className={"flex-col sm:hidden fixed top-0 w-full bg-black text-white"}>
//                     <Link href={"/books"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Books</Link>
//                     <Link href={"/notes"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Notes</Link>
//                     <Link href={"/resources"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>Resources</Link>
//                     <Link href={"/about"} className={"flex m-3.5 uppercase text-base no-underline text-gray-light font-normal duration-100 hover:text-gray-medium"}>About</Link>
//                 </div>
//             )}
//         </>

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