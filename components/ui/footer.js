import Link from "next/link";
import {links} from "@/public/data";

export default function Footer() {
    return (
        <div className="flex-col bg-black border-t border-border-color pt-5" id={"footer"}>
            {/*<div className="text-white m-5 p-10">Parhle (ParhleFailHojayega) - Made with ❤ by Abdul Mueed.</div>*/}
            <div className="text-white  p-3 sm:p-5 md:p-10 justify-evenly flex-wrap sm:flex-row">
                {
                    links.map((l, i) => (
                        <div className={"flex-col mb-5 w-1/2 sm:w-max text-center sm:text-left"} key={`y-${i}`}>
                            <div className="font-bold mb-1 md:mb-5 sm:text-xl justify-center! sm:justify-start!" key={`s-${i}`}>{l.name}</div>
                            {
                                l.items.map((item, ii) => (
                                    <Link key={`x-${ii}-${i}`} href={item.href} className={"uppercase text-xs my-2 hover:text-gray-medium text-gray-medium md:text-white md:text-sm"}>
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="items-center justify-center p-3 sm:p-5 text-white flex-col text-center text-xs sm:text-sm md:text-base">
                ⭐ Parhle (ParhleFailHojayega) - Made with ❤ by TheAM.

            </div>
            <div className="items-center justify-center p-3 sm:p-5 text-white flex-col text-center text-xs sm:text-sm md:text-base">
                © 2025 Parhle. All rights reserved.
            </div>
        </div>
    )
}

