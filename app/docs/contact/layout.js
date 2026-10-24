import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Contact",
    description:
        "Get in touch with the Parhle team by email or community channels for questions, feedback, bug reports or contributions.",
    path: "/docs/contact",
});

export default function Layout({ children }) {
    return children;
}
