import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Best YouTube Channels for Studying",
    description:
        "Hand-picked educational YouTube channels for every subject, recommended by students. Find the best lectures and tutorials for your courses.",
    path: "/channels",
});

export default function Layout({ children }) {
    return children;
}
