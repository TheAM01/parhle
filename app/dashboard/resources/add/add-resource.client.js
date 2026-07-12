"use client";

import AddContentForm from "@/components/ui/AddContentForm";

export default function AddResourceClient({ user, sidebarStatus }) {
    return <AddContentForm type="resource" user={user} sidebarStatus={sidebarStatus} />;
}
