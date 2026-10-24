import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Announcements",
    description:
        "Latest news, updates and maintenance announcements from Parhle.",
    path: "/announcements",
    noIndex: true,
});

export default function Layout({ children }) {
    return children;
}
