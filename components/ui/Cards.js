"use client";

import {BookOpen, Calendar, Heart, Layers, MapPin, University, User, X, Zap} from "lucide-react";
import {HorizontalRule} from "@/components/ui/HorizontalRule";
import {DisabledButton, VisitResourceButton} from "@/components/ui/Buttons";
import {motion} from "framer-motion";
import {priorities, requestStatuses, rewards} from "@/public/data";
import {SmallIconTextButton} from "@/components/ui/Structure";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner";

export const RequestsCard = ({request, index}) => {
    const priority = priorities[request.priority.toLowerCase()];
    const status = requestStatuses.find(rs => rs.name.toLowerCase() === request.status.toLowerCase());
    const [modalDisplayed, setModalDisplayed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [solutionData, setSolutionData] = useState({});





    async function fetchData() {
        if (request.status.toLowerCase() !== "closed") return;

        try {

            const response = await fetch(`/api/${request.resourceType.toLowerCase()}/get/${request.solution}`);
            const result = await response.json();
            console.log("randi ka bacha", result)
            setSolutionData(JSON.parse(JSON.stringify(result)));

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <motion.div
            key={request._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex-col bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors hover:cursor-pointer gap-2"
        >

            <div className="justify-between">
                <div className="gap-1.5 text-sm">
                    <priority.icon size={20}/>
                    <div className={`${priority.classes} text-xs items-center font-bold rounded-full px-2`}>{priority.alt}</div>
                </div>
                <div className="gap-1.5 text-sm">
                    <status.icon size={20}/>
                    <div className={`${status.classes} text-xs items-center font-bold rounded-full px-2`}>{status.alt}</div>
                </div>
            </div>

            <div className="flex-col gap-1">
                <div className={"text-xl font-semibold"}>{request.title}</div>
                <div className="hover:underline text-gray-dark text-sm">
                    {request.author}
                </div>
            </div>

            <HorizontalRule/>

            <div className="text-sm items-center bg-black text-gray-medium font-semibold p-2">
                {request.description}
            </div>

            <HorizontalRule/>

            <div className={"flex-col gap-3"}>

                <div className="text-base font-light items-center text-gray-dark leading-none">
                    <MapPin size={16}/>
                    <div className="flex-row ml-2 text-gray-dark text-sm inline-block! space-x-1">
                        <span>{request.university}</span> <span>•</span> <span>{request.semester}</span>
                    </div>
                </div>
                <div className="text-base font-light items-center text-gray-dark leading-none">
                    <Calendar size={16}/>
                    <div className="flex-col ml-2 text-gray-dark text-sm inline-block! space-x-1">
                        <span>{request.resourceType}</span> <span>•</span> <span>{request.subject}</span>
                    </div>
                </div>
                <div className="text-base font-light items-center text-gray-dark leading-none">
                    <Zap size={16}/>
                    <div className="flex-col ml-2 text-gray-dark text-sm">
                        + {rewards[request.resourceType.toLowerCase()] + priority.reward} AURA
                    </div>
                </div>

                <HorizontalRule/>
                <div className="w-full  gap-2">
                    <SmallIconTextButton text={"View Details"} extraClasses={"flex-1 justify-center items-center"} onClick={() => {
                        fetchData()
                        setModalDisplayed(true)
                    }}/>
                    {request.status.toLowerCase() === "closed" ? <DisabledButton text={`Solved`} extraClasses={"flex-1"}/> :
                        <VisitResourceButton
                            href={`/dashboard/requests/fulfill/${request._id}`}
                            openInNew={false}
                            extraClasses={"flex-1 "}
                        >Fulfill Request
                        </VisitResourceButton>
                    }
                </div>

            </div>

            {modalDisplayed && (
                <motion.div
                    className="w-screen h-screen bg-black/60 fixed! top-0 left-0 cursor-default select-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="bg-gray-900 border border-gray-800 w-3/5 m-auto p-6 flex-col gap-2">

                        <div className="justify-between w-full text-gray-medium text-sm">
                            <div className="inline! space-x-1">
                                Posted by <span className={"text-gray-dark"}>{request.author}</span>
                                on <span className={"text-gray-dark"}>{new Date(request.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <button className={"text-gray-dark cursor-pointer"} onClick={() => setModalDisplayed(false)}><X/></button>
                        </div>
                        {request.status.toLowerCase() === "closed" &&
                            <div className="inline! space-x-1 text-sm text-gray-medium">
                                Solved by <span className={"text-gray-dark"}>{solutionData.author}</span>
                                on <span className={"text-gray-dark"}>{new Date(request.solvedAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                            </div>
                        }
                        <div className="text-4xl font-bold">{request.title}</div>
                        <div className="gap-4">
                            <div className="gap-1.5 text-sm items-center">
                                <div className="items-center">
                                    Priority
                                </div>
                                <div className={`${priority.classes} text-xs items-center font-bold rounded-full px-2`}>{priority.alt}</div>
                            </div>
                            <div className="gap-1.5 text-sm items-center">
                                <div className="items-center">
                                    Status
                                </div>
                                <div className={`${status.classes} text-xs items-center font-bold rounded-full px-2`}>{status.alt}</div>
                            </div>
                        </div>
                        <HorizontalRule/>
                        <div className="p-2 bg-black text-semibold text-gray-medium">{request.description}</div>
                        <HorizontalRule/>
                        <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 text-gray-medium">
                            <div className="flex-col">
                                <div className="gap-2 items-center leading-none">
                                    <University color={"white"} size={20}/>
                                    University: {request.university}
                                </div>
                            </div>
                            <div className="flex-col">
                                <div className="gap-2 items-center leading-none">
                                    <Calendar color={"white"} size={20}/>
                                    Semester: {request.semester}
                                </div>
                            </div>
                            <div className="flex-col">
                                <div className="gap-2 items-center leading-none">
                                    <Layers color={"white"} size={20}/>
                                    Resource Type: {request.resourceType}
                                </div>
                            </div>
                            <div className="flex-col">
                                <div className="gap-2 items-center leading-none">
                                    <Zap color={"white"} size={20}/>
                                    Reward: + {rewards[request.resourceType.toLowerCase()] + priority.reward} AURA
                                </div>
                            </div>
                        </div>
                        <HorizontalRule/>
                        <div className="text-sm text-gray-dark">
                            You can gain {rewards[request.resourceType.toLowerCase()] + priority.reward} AURA by finishing this task. If you have the relevant resource, click on "Fulfill Request" and follow the instructions on the proceeding page to upload your reward. You response will be publicly posted onto the relevant page and the requester (if not anonymous) will be notified of your response. AURA are fictional points used on this site as a rewards system.
                        </div>
                        <HorizontalRule/>
                        <div className={"gap-4"}>

                            {request.status.toLowerCase() === "closed" ? (
                                !loading && solutionData?.url ? (
                                    <VisitResourceButton href={solutionData.url}>
                                        See Solution
                                    </VisitResourceButton>
                                ) : (
                                    <Spinner />
                                )
                            ) : (
                                <VisitResourceButton
                                    href={`/dashboard/requests/fulfill/${request._id}`}
                                    openInNew={false}
                                >
                                    Fulfill Request
                                </VisitResourceButton>
                            )}

                            <div className="items-center text-yellow-600 text-sm">+ {rewards[request.resourceType.toLowerCase()] + priority.reward} AURA</div>
                        </div>
                    </div>
                </motion.div>
            )}

        </motion.div>
    )
}

export const BooksCard = ({book, index}) => {
    return (
        <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={"flex-row justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors hover:cursor-pointer w-full gap-2"}
        >
            <div className="flex-col gap-2">
                <div className={"text-xl font-semibold"}>{book.title}</div>
                <div className="text-sm text-gray-dark mb-2">{book.bookAuthor}</div>
                <div className="space-x-2 inline-block!">
                    <span>{book.university}</span>
                    <span>•</span>
                    <span>{book.subject}</span>
                    <span>•</span>
                    <span className={"text-gray-dark hover:underline"}>{book.author}</span>
                </div>
            </div>

            <div className="items-center">
                <VisitResourceButton href={book.url} extraClasses={"h-min"}>View Book</VisitResourceButton>
            </div>
        </motion.div>
    )
}

export const ChannelCard = ({channel, index}) => {
    return (
        <motion.a
            download
            target="_blank"
            rel="noopener noreferrer"
            href={channel.url}
            key={channel._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`overflow-x-auto relative flex-col justify-between bg-gray-900 p-6 border border-border-color hover:border-gray-700 transition-colors hover:cursor-pointer`}

        >
            {/*     ${channel.url === "https://www.youtube.com/@VaneezaTanveer" ? "after:content-['⭐'] after:absolute after:top-1 after:right-1 after:text-yellow-400 after:text-sm after:animate-pulse" : ""}*/}
            <div className={"justify-between flex-1 items-center"}>

                <div className={"text-xl font-semibold"}>{channel.title}</div>
            </div>

            <span className="text-gray-dark text-xs mb-4">{channel.author}</span>

            <div className={"flex-col mt-4"}>

                <div className="text-base font-light items-center text-gray-dark mb-3">
                    <BookOpen size={16}/>
                    <div className="flex-col ml-2 text-gray-light text-sm">
                        {channel.subject}
                    </div>
                </div>

                <div className="text-base font-light items-center text-gray-dark">
                    <University size={16}/>
                    <div className="flex-col ml-2 text-gray-light text-sm">
                        {channel.university}
                    </div>
                </div>

                <HorizontalRule/>

                <div className="text-sm font-light items-center text-gray-dark break-all">
                    {channel.description}
                </div>
            </div>
        </motion.a>
    )
}