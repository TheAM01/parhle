"use client";

import Link from "next/link";

export function LinkButton({href, children}) {
    return (
        <Link href={href} className={"flex items-center leading-none px-3.5 py-2.5 capitalize bg-white text-black sm:text-gray-dark duration-100 text-sm font-semibold no-underline hover:scale-105 hover:text-black transition-transform gap-2"}>{children}</Link>
    )
}

export function VisitResourceButton({ href, extraClasses, children, openInNew = true }) {
    const commonProps = {
        href,
        className: `${extraClasses} flex items-center leading-none p-3 justify-center capitalize bg-white text-black sm:text-gray-dark text-sm font-semibold no-underline duration-200! hover:text-black transition-transform gap-2`,
        ...(openInNew ? { target: "_blank", rel: "noopener noreferrer" } : {})
    };

    return <Link {...commonProps}>{children}</Link>;
}

export const DisabledButton = ({text, extraClasses}) => {
    return <div className={`justify-center items-center leading-none bg-black text-sm p-3 text-gray-medium cursor-not-allowed font-semibold ${extraClasses}`}>{text}</div>
}

export function Button({children, onClick}) {
    return (
        <button onClick={onClick} className={"px-3.5 py-2.5 capitalize bg-white text-gray-dark duration-100 text-sm font-semibold no-underline border-0 hover:text-black hover:cursor-pointer"}>{children}</button>
    )
}

export function IconLinkButton({href, Icon}) {
    return (
        <Link href={href} className={"flex flex-1 items-center leading-none p-2 h-[2.5em] bg-gray-950 cursor-pointer hover:bg-gray-800 duration-100 justify-center "}>{<Icon size={15}/>}</Link>
    )
}

export function IconButton({eventOnClick, Icon}) {
    return (
        <button onClick={eventOnClick} className={"flex flex-1 items-center leading-none p-2 h-[2.5em] bg-gray-950 cursor-pointer hover:bg-gray-800 duration-100 justify-center "}>{<Icon size={15}/>}</button>
    )
}



