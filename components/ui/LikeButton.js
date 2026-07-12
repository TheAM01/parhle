"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Toggling heart. Optimistically updates, calls POST /api/like, and reconciles
 * with the server's authoritative count. Stops event propagation so it can live
 * inside cards that are themselves links.
 *
 * Props: type ("resource"|"book"|"channel"), id, initialLiked, initialCount, loggedIn
 */
export default function LikeButton({ type, id, initialLiked = false, initialCount = 0, loggedIn = true }) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [busy, setBusy] = useState(false);
    const router = useRouter();

    const toggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!loggedIn) {
            router.push("/user/login?login-first=true");
            return;
        }
        if (busy) return;
        setBusy(true);

        const wasLiked = liked;
        const nextLiked = !wasLiked;
        // optimistic
        setLiked(nextLiked);
        setCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)));

        try {
            const res = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, id }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Failed");
            setLiked(data.liked);
            setCount(data.likes);
        } catch {
            // revert
            setLiked(wasLiked);
            setCount((c) => Math.max(0, c + (nextLiked ? -1 : 1)));
        } finally {
            setBusy(false);
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
            className={`gap-1 items-center text-sm flex cursor-pointer duration-150 disabled:opacity-60 ${
                liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
            disabled={busy}
        >
            <Heart size={14} className="mr-1" fill={liked ? "currentColor" : "none"} />
            {count}
        </button>
    );
}
