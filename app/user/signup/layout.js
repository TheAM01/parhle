import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Sign Up",
    description:
        "Create a free Parhle account to save study materials, share your notes and request resources.",
    path: "/user/signup",
    noIndex: true,
});

export default function Layout({ children }) {
    return children;
}
