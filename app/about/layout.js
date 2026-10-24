import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "About",
    description:
        "How Parhle started as an inside joke and became a free study-notes platform for university students. Learn what we offer and why it's free.",
    path: "/about",
});

export default function Layout({ children }) {
    return children;
}
