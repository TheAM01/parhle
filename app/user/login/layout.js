import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Log In",
    description:
        "Log in to Parhle to save resources, upload notes and manage your requests.",
    path: "/user/login",
    noIndex: true,
});

export default function Layout({ children }) {
    return children;
}
