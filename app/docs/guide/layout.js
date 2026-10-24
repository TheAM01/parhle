import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "User Guide",
    description:
        "Learn how to use Parhle: search and download resources, upload your own notes, save favourites and request study material.",
    path: "/docs/guide",
});

export default function Layout({ children }) {
    return children;
}
