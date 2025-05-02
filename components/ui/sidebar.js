"use client";

import Link from "next/link"
import {BookOpen, BookPlus, File, FilePlus, NotebookText, SquarePlus, ChevronLeft, ChevronRight, LogOut, ListVideo, LibraryBig, Layers, Home, ListTodo, GitPullRequestArrow, MonitorPlay, CirclePlus} from "lucide-react";
import {usePathname} from "next/navigation";
import {useState} from "react";
import { motion } from "framer-motion";

export default function SideBar() {
    const pathname = usePathname();

    const pages = [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Home",
                    href: "/dashboard",
                    icon: Home
                },
                {
                    title: "Exit Dashboard",
                    href: "/",
                    icon: LogOut
                }
            ]
        },
        {
            title: 'Resources',
            items: [
                {
                    title: "Add Resources",
                    href: "/dashboard/add-resource",
                    icon: FilePlus
                },
                {
                    title: "My Resources",
                    href: "/dashboard/my-resources",
                    icon: File
                },
                {
                    title: "All Resources",
                    href: "/resources",
                    icon: Layers
                },
            ]
        },
        {
            title: "Books",
            items: [
                {
                    title: "Add Books",
                    href: "/dashboard/add-book",
                    icon: BookPlus
                },
                {
                    title: "My Books",
                    href: "/dashboard/my-books",
                    icon: BookOpen
                },
                {
                    title: "All Books",
                    href: "/books",
                    icon: LibraryBig
                },
            ]
        },
        {
            title: "Channels",
            items: [
                {
                    title: "Add Channels",
                    href: "/dashboard/add-channel",
                    icon: SquarePlus
                },
                {
                    title: "My Channels",
                    href: "/dashboard/my-channels",
                    icon: ListVideo
                },
                {
                    title: "All Channels",
                    href: "/channels",
                    icon: MonitorPlay
                },
            ]
        },
        {
            title: "Requests",
            items: [
                {
                    title: "Add Request",
                    href: "/request",
                    icon: GitPullRequestArrow
                },
                {
                    title: "My Requests",
                    href: "/request",
                    icon: GitPullRequestArrow
                },
                {
                    title: "All Requests",
                    href: "/requests",
                    icon: ListTodo
                }
            ]
        }
    ]

    const [isOpen, setIsOpen] = useState(true);

    const sidebarVariants = {
        open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
        closed: { x: "-200%", opacity: 1, transition: { type: "tween", duration: 0.3 } }
    };

    // initial={"closed"}
    // animate={isOpen ? "open" : "closed"}
    //  variants={sidebarVariants}


    return (
        <>

            {!isOpen && (
                <div className={"fixed top-0 w-screen h-min flex-1 border-b border-border-color bg-black items-center lg:hidden!"}>
                    <button onClick={() => setIsOpen(!isOpen)} className={"flex p-1 items-center"}>
                        <ChevronRight className={"duration-100 hover:cursor-pointer"} size={30}/>
                    </button>
                </div>
            )}

            <div className={`${isOpen ? "flex! pt-2" : "hidden! lg:flex! w-min!"} shadow-[0px_5px_15px_rgba(0,0,0,0.35)] flex-col fixed lg:static top-0 w-3/5 lg:w-2/7 xl:w-2/10 2xl:w-1/7 bg-gray-900 md:w-1/4 lg:border-r lg:border-border-color h-screen overflow-x-hidden`}>

                <div className={`font-logo  text-gray-medium font-light text-2xl lg:text-4xl p-2 ${isOpen ? "border-b" : ""} border-border-color justify-between items-center`}>

                    <span className={isOpen ? "flex!" : "hidden!"}>Parhle</span>

                    <button onClick={() => setIsOpen(!isOpen)} className={"flex items-center justify-center"}>

                        {isOpen ? (
                            <ChevronLeft className="hover:bg-gray-800 duration-100 p-1 hover:cursor-pointer -translate-x-0.25  text-white rounded-md" size={30} />
                        ) : (
                            <ChevronRight className="hover:bg-gray-800 duration-100 p-1 hover:cursor-pointer -translate-x-0.25  text-white rounded-md" size={30} />
                        )}
                    </button>

                </div>

                <div className="flex-col py-2 my-2">
                    {pages.map((page, i) => (
                        <div className={`flex-col ${isOpen ? "mb-4" : "items-center"}`} key={`div-${i + 1}`}>
                            <SideBarHeading display={isOpen}>{page.title}</SideBarHeading>
                            {
                                page.items.map((route, ii) => (

                                    <SideBarLink href={route.href} icon={route.icon} key={`sbl-${i}-${ii + 32}`}
                                                 isSelected={pathname === route.href} showText={isOpen}>{route.title}</SideBarLink>
                                ))
                            }
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}


function SideBarHeading({display, children}) {
    return (
        <div className={`mx-2 uppercase text-sm text-gray-dark ${display ? "flex!" : "hidden!"}`}>{children}</div>
    )
}


function SideBarLink({icon: Icon, href, isSelected, showText, children}) {
    return (
        <Link href={href} className={`text-gray-medium items-center flex ${showText ? "px-4 py-3" : "p-2"} duration-150 text-base ${isSelected ? "bg-white text-black!": "hover:bg-gray-800 hover:text-white!"} my-1 mx-2`}>
            <span className={`${showText ? "mr-2" : ""} items-center flex`}>
                <Icon size={showText ? 18 : 22}/>
            </span>
            <span className={showText ? "flex!" : "hidden!"}>
                {children}
            </span>
        </Link>
    )
}