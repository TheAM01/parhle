"use client";

import Link from "next/link"
import {
    BookOpen,
    BookPlus,
    File,
    FilePlus,
    SquarePlus,
    ChevronLeft,
    ChevronRight,
    LogOut,
    ListVideo,
    LibraryBig,
    Layers,
    Home,
    ListTodo,
    LayoutDashboard,
    MonitorPlay,
    Pencil,
    User, Send, ClipboardList, FileText, Upload, FilePenLine, BadgeCheck, Bell
} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import Cookies from "js-cookie";
import {IconButton, IconLinkButton} from "@/components/ui/Buttons";

export default function Sidebar({user, sidebarStatus}) {
    const pathname = usePathname();
    const router = useRouter();
    console.log(user)
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
                  title: "Guide",
                  href: "/docs/guide",
                  icon: BadgeCheck,
                },
                {
                    title: "Exit Dashboard",
                    href: "/",
                    icon: LogOut
                }
            ]
        },
        {
            title: "User",
            items: [
                {
                    title: "Profile",
                    href: "/dashboard/profile",
                    icon: User
                },
                {
                    title: "Notifications",
                    href: "#",
                    icon: Bell,
                }
            ]
        },
        {
            title: 'Resources',
            items: [
                {
                    title: "Add Resources",
                    href: "/dashboard/resources/add",
                    icon: FilePlus
                },
                {
                    title: "My Resources",
                    href: "/dashboard/resources/my",
                    icon: FileText,
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
                    href: "/dashboard/books/add",
                    icon: BookPlus
                },
                {
                    title: "My Books",
                    href: "/dashboard/books/my",
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
                    href: "/dashboard/channels/add",
                    icon: Upload
                },
                {
                    title: "My Channels",
                    href: "/dashboard/channels/my",
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
                    icon: FilePenLine,
                },
                {
                    title: "My Requests",
                    href: "/dashboard/requests/my",
                    icon: ClipboardList
                },
                {
                    title: "All Requests",
                    href: "/dashboard/requests/all",
                    icon: ListTodo
                }
            ]
        }
    ];

    if (user.role === "admin")
        pages[1].items.push(
            {
                title: "Admin Panel",
                href: "/dashboard/admin",
                icon: LayoutDashboard
            }
        )

    const toggleSidebar = () => {
        const newStatus = !isOpen;
        setIsOpen(newStatus);
        Cookies.set("sidebar-status", newStatus, { expires: 365 });
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: 'POST',
            });

            if (res.ok) {
                router.push('/?logout-successful=true');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };


    const [isOpen, setIsOpen] = useState(sidebarStatus);

    return (
        <>

            {!isOpen && (
                <div className={"z-200 fixed top-0 w-screen h-min flex-1 border-b border-border-color bg-black items-center lg:hidden!"}>
                    <button onClick={toggleSidebar} className={"flex p-1 items-center"}>
                        <ChevronRight className={"duration-100 hover:cursor-pointer"} size={30}/>
                    </button>
                </div>
            )}

            <div className={`${isOpen ? "flex! pt-2" : "hidden! lg:flex! w-min!"} shadow-[0px_5px_15px_rgba(0,0,0,0.35)] flex-col fixed lg:static top-0 w-3/5 lg:w-2/7 xl:w-2/10 2xl:w-1/7 md:w-1/4 bg-gray-900 lg:border-r lg:border-border-color h-screen overflow-x-hidden z-200`}>

                <div className={`font-logo  text-gray-medium font-light text-2xl lg:text-4xl p-2 ${isOpen ? "border-b" : ""} border-border-color justify-between items-center`}>

                    <span className={isOpen ? "flex!" : "hidden!"}>Parhle</span>

                    <button onClick={toggleSidebar} className={"flex items-center justify-center"}>

                        {isOpen ? (
                            <ChevronLeft className="hover:bg-gray-800 duration-100 p-1 hover:cursor-pointer -translate-x-0.25  text-white rounded-md" size={30} />
                        ) : (
                            <ChevronRight className="hover:bg-gray-800 duration-100 p-1 hover:cursor-pointer -translate-x-0.25  text-white rounded-md" size={30} />
                        )}
                    </button>

                </div>

                <div className="flex-col py-2 my-2 justify-between">
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

                <div className={` ${!isOpen ? "p-1" : "p-3"} sticky bottom-0 bg-gray-900 text-gray-medium border-t-2 border-gray-800 w-full flex-col mt-auto mb-0 gap-2`}>

                    <div className="gap-4 items-center justify-between flex-1">
                        <img src={user.avatarImg} alt="avatar_img" className="flex h-[2.5em] rounded-full border-3 border-gray-800"/>
                        <div className={`${!isOpen ? "hidden!" : "flex!"}  flex-col overflow-x-hidden flex-1`}>
                            <div className="text-gray-medium font-semibold ">{user.fullName || "John Doe"}</div>
                            <div className="text-gray-dark text-sm">@{user.username}</div>
                        </div>
                    </div>

                    <div className={`${!isOpen ? "hidden!" : "flex!"} gap-2`}>
                        <IconButton Icon={LogOut} eventOnClick={handleLogout}/>
                        <IconLinkButton Icon={Pencil} href={"/dashboard/profile"}/>
                    </div>

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
            <span className={showText ? "flex! text-nowrap" : "hidden!"}>
                {children}
            </span>
        </Link>
    )
}