"use client";

import { useEffect, useState } from "react";
import LikeButton from "@/components/ui/LikeButton";

// The page itself is cached, so the viewer's own like state is fetched here.
export default function ResourceLike({ id, initialCount }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        fetch("/api/like")
            .then((res) => res.json())
            .then((data) => setState({ liked: (data.resources || []).includes(id), loggedIn: !!data.loggedIn }))
            .catch(() => setState({ liked: false, loggedIn: false }));
    }, [id]);

    if (!state) return <div className="w-12 h-8" aria-hidden />;
    return (
        <LikeButton type="resource" id={id} initialLiked={state.liked} initialCount={initialCount} loggedIn={state.loggedIn} />
    );
}
