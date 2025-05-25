"use client";

import {DashboardWorkspace} from "@/components/ui/Structure";

export default function About() {

    return (
        <div className={"w-full h-full bg-black items-center flex-col text-white pt-10 sm:pt-30 min-h-screen texture-mosaic justify-center"}>

            <DashboardWorkspace extraClasses={"bg-gray-900 border border-gray-800"}>

                <div className="text-4xl mb-6 font-bold">
                    About <span className={"font-logo mx-2 text-gray-medium font-light!"}>Parhle</span>:
                </div>

                <div className="text-lg flex-col font-light">

                    <div className="text-2xl font-semibold mt-5">How It Started</div>
                    
                    <p className={"mb-4"}>
                        It all began as an inside joke between me and my study partner — Parhle, fail hojayega! What started as a simple website for sharing notes quickly became something bigger. Initially, it was just for us, but soon our teacher found out, shared it with the whole class, and suddenly, everyone was using it.
                    </p>
                    <p className={"mb-4"}>
                        Life got busy, and the site had to be taken down. But now, in university, Parhle is back—this time, better than ever. The goal remains the same: <span className="font-bold">make studying easier for everyone</span>.
                    </p>

                    <div className="text-2xl font-semibold mt-5">What we offer</div>

                    <p className={"mb-4"}>
                        Finding good study materials online can be a struggle. The easiest solution? Buying notes from a local store. But Parhle solves this problem for free. We provide high-quality notes from trusted sources that you can download, print, or study digitally—without spending a single rupee.
                    </p>
                    <p className={"mb-4"}>
                        We keep everything sorted by category, so you can find what you need in seconds. Signing up isn’t required, but if you do, you’ll get extra features like saving materials for later. Want to know where we get our content? Check out our Sources page.
                    </p>
                    <p className={"mb-4"}>
                        Since we continuously update the site, there may be occasional downtime—no worries! You can always check our Discord server for status updates and scheduled maintenance.
                    </p>
                </div>

            </DashboardWorkspace>

        </div>
    )
}