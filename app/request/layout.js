import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Request Study Material",
    description:
        "Can't find the notes, book or past paper you need? Submit a request on Parhle and the community will help you find it.",
    path: "/request",
});

export default function Layout({ children }) {
    return children;
}
