"use client";

import Link from "next/link";

export function LinkButton({href, children}) {
    return (
        <Link href={href} className={"flex items-center leading-none px-3.5 py-2.5 capitalize bg-white text-black sm:text-gray-dark duration-100 text-sm font-semibold no-underline hover:scale-105 hover:text-black transition-transform"}>{children}</Link>
    )
}

export function Button({children, onClick}) {
    return (
        <button onClick={onClick} className={"px-3.5 py-2.5 capitalize bg-white text-gray-dark duration-100 text-sm font-semibold no-underline border-0 hover:text-black hover:cursor-pointer"}>{children}</button>
    )
}


export function LoginButton() {
  return <Button onClick={() => {}}>Sign In</Button>
}

export function SignOutButton() {
    return <Button onClick={() => {}}>Sign Out</Button>
}

