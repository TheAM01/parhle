import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Study Notes & Past Papers",
    description:
        "Browse free university study notes, past papers, assignments and solutions shared by students. Search and filter by subject, then view or download instantly.",
    path: "/resources",
});

export default function Layout({ children }) {
    return children;
}
