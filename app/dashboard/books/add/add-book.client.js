"use client";

import AddContentForm from "@/components/ui/AddContentForm";

export default function AddBookClient({ user, sidebarStatus }) {
    return <AddContentForm type="book" user={user} sidebarStatus={sidebarStatus} />;
}
