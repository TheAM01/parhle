"use client";

import {useState, Fragment} from "react";
import {
    BookOpen,
    Zap,
    ChevronRight,
    Star,
    MessageCircleQuestion,
    MessageCircle,
    Users,
    BookOpenText, PersonStanding, Search, CloudUpload, DownloadCloud, Heart, Shield, PackagePlus
} from "lucide-react";
import {DashboardHeading, DashboardWorkspace} from "@/components/ui/Structure";
import {HorizontalRule} from "@/components/ui/HorizontalRule";

export default function GuidePage({}) {
    const [activeSection, setActiveSection] = useState("getting-started");
    const features = [
        {
            title: "Smart Search",
            icon: <Search color={"#6d32a8"}/>,
            description: "Find resources quickly with our advanced search and filtering system"
        },
        {
            title: "Easy Upload",
            icon: <CloudUpload color={"#44a832"}/>,
            description: "Share your notes and resources with a simple, intuitive upload process"
        },
        {
            title: "Instant Download",
            icon: <DownloadCloud color={"#3275a8"}/>,
            description: "Access and download resources immediately after finding what you need"
        },
        {
            title: "Like & Save",
            icon: <Heart color={"#a83250"}/>,
            description: "Like helpful resources and save them to your personal collection"
        },
        {
            title: "Request System",
            icon: <MessageCircle color={"#d1cf45"}/>,
            description: "Request specific resources that you need but can't find"
        },
        {
            title: "Quality Control",
            icon: <Shield color={"#d1cf45"}/>,
            description: "All content is moderated to ensure high quality and relevance"
        }
    ]
    const newFeatures = [
        {
            title: "AURA Points",
            description: "Gain community points called \"AURA\" points in exchange for contributing."
        },
        {
            title: "Requests",
            description: "Users can request resources from the community and contributors can respond by sharing the requested resource."
        },
    ]
    const contributions = [
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Sharing & Outreach",
            description: "The biggest contribution you can make is spreading the word - sharing the website with your friends helps Parhle achieve its mission. Sharing in class groups or any other relevant places is highly appreciated.",
        },
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Tool Searching",
            description: "This site will soon feature a collection of powerful tools — such as scientific calculators, logic circuit visualizers, mathematical expression renderers, differentiation and integration solvers, and much more. " +
                "Since many of these tools already exist online and developing them from scratch would take significant time, I’m looking for contributors who can help curate and index these existing resources into the website."
        },
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Quality Assurance",
            description: "If you think you can find bugs and test websites for errors and suggest potential features, then you might just be the perfect candidate for helping out with suggesting new features for your fellow students. "
        },
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Finding Resource Archives",
            description: "I understand that posting and organizing resources can be time-consuming, and not everyone has the time or interest to do that. " +
                "If you have an archive or a collection of university-related resources that you believe should be available on the site - " +
                "but you’d rather not handle the uploading yourself — you’re welcome to share the entire collection with me, and I’ll take care of publishing it."
        },
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Community Moderation",
            description: "Help review and moderate uploaded content to ensure quality standards. Assist in maintaining a positive and helpful community environment by reporting inappropriate content and helping new users. "
        },
        {
            icon: <Star size={20}/>,
            difficulty: "Easy",
            title: "Content Creation",
            description: "Create original study materials, summaries, or guides that can help other students. High-quality original content is always in demand and greatly appreciated by the community."
        }
    ]
    const guides = [
        {
            title: "Finding Resources",
            instructions: [
                "Use the navigation bar to look for visit resources, books or channels page",
                "Search by title, university, semester, or subject",
                "Filter by relevant subject",
                "Click the visit resource button to open the resource",
                "Check the resource details before downloading",
            ]
        },
        {
            title: "Uploading Content",
            description: "We apologize if the upload process feels a bit lengthy. However, if you're comfortable with basic digital tools and know your way around a computer, it should be fairly straightforward. We've chosen Google Drive as the standard for now due to the high cost of cloud storage and the simplicity it offers when sharing folders with others. While it may not be perfect, Drive serves as a practical solution until the site grows enough to support its own CDN for hosting resources directly.",
            instructions: [
                "Login or Signup if haven't already",
                "Go to your Dashboard and in the Sidebar, click 'Add...'",
                "Fill in all required information (title, subject, etc.)",
                "Go to Google Drive, upload your file to Google Drive inside a folder (check our content guidelines)",
                "Right click the folder, click 'Share' then 'Share'",
                "In 'General Access', change 'Restricted' to 'Anyone with the link'",
                "Click 'Copy link' to copy sharing URL",
                "Come back to Parhle, paste the sharing URL in the URL input on the upload form",
                "Submit for review",
            ]
        },
        {
            title: "Making Requests",
            description: "Requests are still in BETA and might result in bugs or errors.",
            instructions: [
                "Visit the Request page",
                "Select the type of resource you need",
                "Provide detailed information about what you're looking for",
                "Include course, university, and semester",
                "Submit your request",
                "Check back regularly for responses",
            ]
        },
        {
            title: "Engaging in Community",
            instructions: [
                "Engaging with Community",
                "Like helpful resources to show appreciation",
                "Follow content guidelines when uploading",
                "Report inappropriate content",
                "Help others by fulfilling requests",
                "Contribute to the Parhle project",
            ]
        },
        {
            title: "Editing a Posted Resource",
            description: "Coming soon"
        },
        {
            title: "Updating your Profile",
            description: "Coming soon"
        }
    ]

    const sections = {
        "getting-started": {
            title: "Getting Started",
            icon: <Zap size={20}/>,
            content: (
                <div className={"flex-col gap-2 p-6"}>
                    <DashboardHeading>Welcome to <span className={"font-logo"}>Parhle</span> </DashboardHeading>
                    <div className={"text-gray-medium mb-2"}>
                        Parhle is a collaborative platform where university students share academic resources, notes, books, and study materials to help each other succeed academically.
                    </div>
                    <div className="grid! grid-cols-1 md:grid-cols-2 gap-6 p-4">

                        <div className="flex-col gap-2">
                            <div className="gap-2 items-center">
                                <Users/>
                                <div className="font-bold text-lg">Community Driven</div>
                            </div>
                            <div className="text-gray-medium">
                                Built by students, for students. Our community contributes and benefits from shared knowledge.
                            </div>
                        </div>

                        <div className="flex-col gap-2">
                            <div className="gap-2 items-center">
                                <BookOpenText/>
                                <div className="font-bold text-lg">Quality Resources</div>
                            </div>
                            <div className="text-gray-medium">
                                Access high-quality notes, textbooks, past papers, and study guides from various universities.
                            </div>
                        </div>

                        <div className="flex-col gap-2">
                            <div className="gap-2 items-center">
                                <PersonStanding/>
                                <div className="font-bold text-lg">Free, Forever!</div>
                            </div>
                            <div className="text-gray-medium">
                                Never pay even a single dime to access any kind of content, all our resources all always free of any kind of cost.
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex-col border border-blue-600 p-4 gap-2">
                        <div className="text-lg font-semibold text-blue-400">Quick Start Steps</div>
                        {[
                            "Create your account and complete your profile",
                            "Browse resources by subject, university, or semester",
                            "Download materials that help with your studies",
                            "Upload your own notes and resources to help others",
                            "Engage with the community through likes and requests",
                        ].map((step, i) => (
                            <div className={"items-center gap-2"} key={i}>
                                <div className="rounded-full items-center bg-white text-black flex-shrink-0 w-6 h-6 justify-center leading-none font-bold">{i+1}</div>
                                <div className="text-gray-medium">{step}</div>
                            </div>
                        ))}
                    </div>


                </div>
            )
        },
        "features": {
            title: "Features",
            icon: <Star size={20}/>,
            content: (
                <div className={"flex-col gap-2 p-6"}>
                    <DashboardHeading>Platform Features</DashboardHeading>
                    <div className={"text-gray-medium mb-2"}>
                        Discover all the tools and features that make Parhle the perfect study companion.
                    </div>
                    <div className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mb-6">
                        {features.map((feature, i) => (
                            <div className="flex-col gap-2" key={i}>
                                {feature.icon}
                                <div className="font-semibold">{feature.title}</div>
                                <div className="text-sm text-gray-medium">{feature.description}</div>
                            </div>
                        ))}
                    </div>
                    <div className="gap-4 p-4 flex-col">
                        <div className="text-lg font-bold">Dashboard Features</div>
                        <div className="gap-4 ">
                            <div className="flex-col flex-1">
                                <div className="font-semibold mb-2 text-green-400">For Contributors</div>
                                <li className={"text-gray-medium text-sm"}>Upload and manage your resources</li>
                                <li className={"text-gray-medium text-sm"}>Track views and likes on your content</li>
                                <li className={"text-gray-medium text-sm"}>See your contribution statistics</li>
                                <li className={"text-gray-medium text-sm"}>Manage your uploaded files</li>
                            </div>
                            <div className="flex-col flex-1">
                                <div className="font-semibold mb-2 text-blue-400">For Everyone</div>
                                <li className={"text-gray-medium text-sm"}>View your download history</li>
                                <li className={"text-gray-medium text-sm"}>Access your saved resources</li>
                                <li className={"text-gray-medium text-sm"}>Track your requests</li>
                                <li className={"text-gray-medium text-sm"}>Manage your profile settings</li>
                            </div>
                        </div>
                    </div>
                    <div className="gap-4 p-4 flex-col">
                        <div className="text-lg font-bold">New Features</div>
                        {newFeatures.map((feature, i) => (
                            <div className="flex-col gap-2" key={i+"xd"}>
                                <li className="font-semibold">{feature.title}</li>
                                <div className="text-sm text-gray-medium">{feature.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        "contribute": {
            title: "Contribute",
            icon: <PackagePlus size={20}/>,
            content: (
                <div className="flex-col gap-2 p-6">
                    <DashboardHeading>Contributions</DashboardHeading>
                    <div className={"text-gray-medium mb-4 gap-2 flex-col"}>
                        <p>
                            Parhle is a one-person project—every aspect is handled with care by a single individual.
                            From design, development, testing, and quality assurance to hosting, management, and even payments. Every step,
                            from problem-solving to delivering the final solution to you, is managed by a team of exactly 1 person, me! :)
                        </p>
                        <p>
                            If you’d like to support the project, here are some meaningful ways to contribute.
                            As a token of appreciation, your name and details will be proudly featured on our Supporters page. You can reach out directly via
                            our Contact page — I would love to hear from you!
                        </p>
                    </div>
                    <DashboardHeading>How You Can Contribute</DashboardHeading>
                    <div className={"text-gray-medium mb-2 gap-2 flex-col"}>
                        Parhle thrives because of community contributions. Here are various ways you can help make the platform better for everyone.
                    </div>
                    <div className="grid! grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            contributions.map((contribution, i) => (
                                <div className={"flex-col border border-gray-700 gap-2 p-4 bg-gray-800"} key={i+"si"}>
                                    <div className="justify-between items-center">
                                        {contribution.icon}
                                        <div className="text-xs text-green-800 bg-green-500 border border-green-700 rounded-xl items-center px-2 py-1">
                                            {contribution.difficulty}
                                        </div>
                                    </div>
                                    <div className="w-full text-white font-bold text-lg items-center">
                                        {contribution.title}
                                    </div>
                                    <div className="text-sm text-gray-medium">
                                        {contribution.description}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        },
        "how-to-use": {
            title: "How to Use",
            icon: <MessageCircleQuestion size={20}/>,
            content: (
                <div className={"flex-col gap-2 p-6"}>
                    <DashboardHeading>How to use Parhle</DashboardHeading>
                    <div className={"text-gray-medium mb-4 gap-2 flex-col"}>
                        Comprehensive step-by-step guides with pictures will be available soon.
                    </div>
                    <div className="gap-8 flex-col">
                        {
                            guides.map((guide, i) => (
                                <Fragment key={i}>
                                    <HowToList guide={guide} key={i+"+ni"}/>
                                    <HorizontalRule/>
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={"flex-col min-h-screen texture-mosaic text-white pt-12 sm:pt-30 bg-black items-center gap-4"}>
            <DashboardWorkspace extraClasses={"gap-6"}>
                <div className="w-full items-center flex-col gap-2">
                    <div className="text-4xl font-bold items-center gap-2">
                        <BookOpen size={30} className={"font-light"}/>
                        Parhle Guide
                    </div>
                    <div className="text-gray-dark text-center text-xl">
                        Everything you need to know about using Parhle effectively
                    </div>
                </div>
                <div className="gap-6 flex-col lg:flex-row ">
                    <div className="flex-col bg-gray-900 h-min p-2 gap-2 lg:sticky lg:top-27">
                        <div className="text-gray-dark uppercase text-sm">Guide Sections</div>
                        {
                            Object.entries(sections).map(([key, section]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveSection(key)}
                                    className={`flex p-2 gap-3 justify-between cursor-pointer text-nowrap ${
                                        activeSection === key
                                            ? "bg-white text-black"
                                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="gap-2">
                                        {section.icon}
                                        {section.title}
                                    </div>
                                    <ChevronRight size={20}/>
                                </button>
                            ))
                        }
                    </div>
                    <div className="bg-gray-900">
                        {sections[activeSection].content}
                    </div>
                </div>
            </DashboardWorkspace>
        </div>
    )
}

function HowToList({guide}) {
    return (
        <div className="flex-col gap-2">
            <div className="font-bold text-lg">
                {guide.title}
            </div>
            {guide.description && <div className="text-sm text-gray-dark">{guide.description}</div>}
            {guide.instructions && guide.instructions.map((instruction, i) => (
                <div className="gap-2 items-center" key={i+"lad"}>
                    <div className="rounded-full items-center bg-white text-black flex-shrink-0 w-6 h-6 justify-center leading-none font-bold">{i+1}</div>
                    <div className="text-gray-medium">{instruction}</div>
                </div>
            ))}
        </div>
    )
}