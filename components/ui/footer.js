import Link from "next/link";
import {links} from "@/public/data";

export default function Footer() {
    return (
        <div className="flex-col bg-black">
            {/*<div className="text-white m-5 p-10">Parhle (ParhleFailHojayega) - Made with ❤ by Abdul Mueed.</div>*/}
            <div className="text-white m-5 p-10 justify-evenly">
                {
                    links.map((l, i) => (
                        <div className={"flex-col"} key={`y-${i}`}>
                            <div className="font-bold border-b-[4px] border-border-color border-double mb-5 text-xl" key={`s-${i}`}>{l.name}</div>
                            {
                                l.items.map((item, ii) => (
                                    <Link key={`x-${ii}-${i}`} href={item.href} className={"uppercase text-sm my-2 hover:text-gray-medium"}>
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="items-center justify-center p-5 text-white flex-col text-center">
                ⭐ Parhle (ParhleFailHojayega) - Made with ❤ by Abdul Mueed.

            </div>
            <div className="items-center justify-center p-5 text-white flex-col text-center">
                © 2025 Parhle. All rights reserved.
            </div>
        </div>
    )
}

