"use client";

import {DashboardWorkspace} from "@/components/ui/Structure";
import {ContactMeCard} from "@/components/ui/Cards";
import {Camera, Clock, GitCommit, Link2, Mail, MapPin, MessageCircle, Phone} from "lucide-react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {QuestionCircle} from "@geist-ui/icons";

export default function ContactPage({}) {

    const contactMethods = [
        {
            title: "Email",
            icon: <Mail/>,
            description: "Send me an email for detailed enquiries",
            contact: "premaloneoriginal@gmail.com",
            url: "mailto:premaloneoriginal@gmail.com"
        },
        {
            title: "Discord",
            icon: <MessageCircle/>,
            description: "Join our community server for quick chat",
            contact: "@??????????",
            url: "#"
        },
        {
            title: "Instagram",
            icon: <Camera/>,
            description: "Chat with me",
            contact: "@??????????.???",
            url: "#"
        },
        {
            title: "Github",
            icon: <GitCommit/>,
            description: "Report bugs or contribute to the project",
            contact: "@???????",
            url: "#"
        },
        {
            title: "LinkedIn",
            icon: <Link2/>,
            description: "Connect with me professionally",
            contact: "????? ?????",
            url: "https://www.linkedin.com/in/????????/"
        },
        {
            title: "?",
            icon: <QuestionCircle/>,
            description: "Will update my personal info after some time",
            contact: "????? ?????",
            url: "#"
        },
    ];

    const contactDetails = [
        {
            icon: <Clock/>,
            description: "I typically respond within 12-24 hours"
        },
        {
            icon: <MapPin/>,
            description: "GMT+5 (Pakistan Standard Time)"
        },
        {
            icon: <Phone/>,
            description: "Best reached via email or Discord"
        }
    ];


    return (
        <div className={"flex-col min-h-screen text-black pt-10 sm:pt-20 bg-white items-center gap-4 "}>
            <div className="w-full bg-black items-center flex-col gap-2 py-15 text-white">
                <div className="text-5xl font-bold">Get in Touch</div>
                <div className="text-gray-300 w-full justify-center text-center lg:w-3/5 xl:w-2/5 md:text-lg ">
                    Have questions, suggestions, or want to contribute? I'd love to hear from you. Choose your preferred method below to reach me.
                </div>
            </div>
            <DashboardWorkspace>
                <div className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-15">
                    {contactMethods.map((m, i) => (
                        <ContactMeCard method={m} key={i}/>
                    ))}
                </div>

                <div className="my-10">
                    <HorizontalRule/>
                </div>

                <div className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contactDetails.map((m, i) => (
                        <div className="bg-gray-100 flex-col items-center gap-2 p-4" key={i+"ku"}>
                            <div className="bg-black text-white p-2">
                                {m.icon}
                            </div>
                            <div className="text-black">
                                {m.description}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-10">
                    <HorizontalRule/>
                </div>

                <div className="bg-gray-100 p-4 flex-col gap-6">
                    <div className="w-full font-bold text-xl justify-center text-center">Before You Contact</div>

                    <div className="gap-6 flex-col md:flex-row">
                        <div className="flex-col flex-1">
                            <div className="font-semibold">For Bug Reports</div>
                            <li>Include your browser and device info</li>
                            <li>Describe steps to reproduce the issue</li>
                            <li>Screenshots are very helpful</li>
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-semibold">For Feature Requests</div>
                            <li>Explain the problem you're trying to solve</li>
                            <li>Describe your proposed solution</li>
                            <li>Consider how it benefits other students</li>
                        </div>
                    </div>

                    <div className="gap-6 flex-col md:flex-row">
                        <div className="flex-col flex-1">
                            <div className="font-semibold">For Contributions</div>
                            <li>Check the Guide page for contribution methods</li>
                            <li>Mention your skills and availability</li>
                            <li>Include examples of previous work if relevant</li>
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-semibold">For General Inquiries</div>
                            <li>Be specific about what you need help with</li>
                            <li>Check the FAQ section first</li>
                            <li>Include relevant context or background</li>
                        </div>
                    </div>

                </div>

                <div className="mt-10 mb-15">
                    <HorizontalRule/>
                </div>
            </DashboardWorkspace>
        </div>

    )
}
//Before You Contact
// For Bug Reports:
// • Include your browser and device info
// • Describe steps to reproduce the issue
// • Screenshots are very helpful
// For Feature Requests:
// • Explain the problem you're trying to solve
// • Describe your proposed solution
// • Consider how it benefits other students
// For Contributions:
// • Check the Guide page for contribution methods
// • Mention your skills and availability
// • Include examples of previous work if relevant
// For General Inquiries:
// • Be specific about what you need help with
// • Check the FAQ section first
// • Include relevant context or background