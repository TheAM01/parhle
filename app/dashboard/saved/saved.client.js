"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, University, User } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import {
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    PageTitle,
} from "@/components/ui/Structure";
import { BooksCard, ChannelCard, SolutionBadge } from "@/components/ui/Cards";
import { VisitResourceButton } from "@/components/ui/Buttons";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import LikeButton from "@/components/ui/LikeButton";

const TABS = [
    { key: "resources", label: "Resources" },
    { key: "books", label: "Books" },
    { key: "channels", label: "Channels" },
];

function ResourceCard({ note, index }) {
    return (
        <motion.div
            key={note._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex-col justify-between bg-gray-900 p-4 border border-border-color hover:border-gray-700 transition-colors"
        >
            <div className="justify-between flex-1 items-center gap-2">
                <div className="text-xl font-semibold">{note.title}</div>
                <LikeButton type="resource" id={note._id} initialLiked={true} initialCount={note.likes || 0} />
            </div>
            <span className="text-gray-dark text-xs mb-2 hover:underline">{note.author}</span>
            {note.solution?.isSolution && <SolutionBadge extraClasses={"mb-2"} />}
            <div className="flex-col mt-2 gap-3">
                <div className="text-base font-light items-center text-gray-dark">
                    <BookOpen size={16} />
                    <div className="flex-col ml-2 text-white text-sm">{note.subject}</div>
                </div>
                <div className="text-base font-light items-center text-gray-dark">
                    <Calendar size={16} />
                    <div className="flex-col ml-2 text-white text-sm">{note.semester}</div>
                </div>
                <div className="text-base font-light items-center text-gray-dark">
                    <User size={16} />
                    <div className="flex-col ml-2 text-white text-sm">{note.teacher}</div>
                </div>
                <div className="text-base font-light items-center text-gray-dark">
                    <University size={16} />
                    <div className="flex-col ml-2 text-white text-sm">{note.university}</div>
                </div>
                <HorizontalRule />
                <VisitResourceButton href={note.url}>View Resource</VisitResourceButton>
            </div>
        </motion.div>
    );
}

export default function SavedClient({ user, sidebarStatus, data }) {
    const [tab, setTab] = useState("resources");
    const total = data.resources.length + data.books.length + data.channels.length;
    const items = data[tab] || [];

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus} />
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle heading={"Saved"} description={"Resources, books and channels you've liked"} />

                    <div className="gap-2 mb-6 flex-wrap">
                        {TABS.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`px-4 py-2 text-sm font-semibold cursor-pointer duration-150 ${
                                    tab === t.key ? "bg-white text-black" : "bg-gray-900 text-gray-medium hover:text-white border border-border-color"
                                }`}
                            >
                                {t.label} ({data[t.key].length})
                            </button>
                        ))}
                    </div>

                    {total === 0 && (
                        <div className="text-gray-dark text-sm">
                            You haven&apos;t liked anything yet. Tap the heart on any resource, book, or channel to save it here.
                        </div>
                    )}

                    {tab === "resources" && (
                        <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {items.map((note, index) => (
                                <ResourceCard note={note} index={index} key={note._id} />
                            ))}
                        </div>
                    )}

                    {tab === "books" && (
                        <div className="flex-col gap-6">
                            {items.map((book, index) => (
                                <BooksCard book={book} index={index} key={book._id} liked={true} loggedIn={true} />
                            ))}
                        </div>
                    )}

                    {tab === "channels" && (
                        <div className="grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {items.map((channel, index) => (
                                <ChannelCard channel={channel} index={index} key={channel._id} liked={true} loggedIn={true} />
                            ))}
                        </div>
                    )}

                    {total > 0 && items.length === 0 && (
                        <div className="text-gray-dark text-sm">No saved {tab} yet.</div>
                    )}
                </DashboardWorkspace>
            </DashboardScrollable>
        </DashboardParent>
    );
}
