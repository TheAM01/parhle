"use client";

// import Input from "@/components/ui/input";
import {Upload} from "lucide-react";
import {useState} from "react";
import SideBar from "@/components/ui/sidebar";


export default function Dashboard() {


    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic"}>

            <SideBar/>

            <div className="flex-col w-full lg:mx-30 p-4 lg:p-10">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Home
                </div>

                <div className="text-sm text-gray-dark mb-6">Welcome back</div>

                <div className="flex-col bg-gray-900 border border-border-color p-5 w-full">

                    TODOs:

                    <ul className={"list-disc"}>
                        <li>Find and add books</li>
                        <li>Find a use for dashboard and remove unnecessary stuff</li>
                        <li>Add authentication</li>
                    </ul>

                </div>
            </div>

        </div>
    )
}
