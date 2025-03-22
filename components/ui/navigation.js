import Link from "next/link";
import {LinkButton} from "@/components/ui/button";

export default function Navigation() {
    return (
        <div className={"p-3.5 align-center flex justify-evenly w-screen items-center sticky top-0 bg-black border-solid border-border border-b border-border-color z-10"}>

            <a className={"text-2xl text-gray-medium select-none font-logo hover:cursor-pointer sm:hidden"} href={"/"}>
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