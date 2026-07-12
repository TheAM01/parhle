"use client";

import AddContentForm from "@/components/ui/AddContentForm";

export default function AddChannelClient({ user, sidebarStatus }) {
    return <AddContentForm type="channel" user={user} sidebarStatus={sidebarStatus} />;
}
