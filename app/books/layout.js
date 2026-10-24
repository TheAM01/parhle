import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Free Textbooks & PDF Books",
    description:
        "Find free textbooks and reference books in PDF for your university courses. Search by subject and download the books your classmates recommend.",
    path: "/books",
});

export default function Layout({ children }) {
    return children;
}
