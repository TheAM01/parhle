"use client";

import { Upload, Check } from "lucide-react";
import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
    DashboardHeading,
    DashboardParent,
    DashboardScrollable,
    DashboardWorkspace,
    DashboardWorkspaceBlock,
    ExpandableSelectInputGroup,
    ExpandableTextAreaGroup,
    ExpandableTextInputGroup,
    PageTitle,
    SmallIconTextButton,
} from "@/components/ui/Structure";
import StatusToast from "@/components/ui/StatusToast";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import Spinner from "@/components/ui/Spinner";
import { BookGuidelines, ResourceGuidelines, ChannelGuidelines } from "@/components/ui/Guidelines";

const SEMESTER_OPTIONS = [
    { name: "Non Specific", value: "non-specific" },
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
    { name: 6, value: 6 },
    { name: 7, value: 7 },
    { name: 8, value: 8 },
];

// Per-type configuration. `fromProfile` pre-fills the field from the logged-in
// user's academicDetails so they don't retype what we already know.
const CONFIG = {
    resource: {
        pageTitle: "Add Resource",
        pageDescription: "Index new resources",
        heading: "Upload New Resource",
        endpoint: "/api/resource/upload",
        successMessage: "Resource uploaded successfully!",
        Guidelines: ResourceGuidelines,
        fields: [
            { name: "title", title: "Title", kind: "text", placeholder: "e.g. Past Paper Discrete Mathematics MKR 2022" },
            { name: "subject", title: "Subject", kind: "text", placeholder: "Discrete Mathematics" },
            { name: "teacher", title: "Teacher", kind: "text", placeholder: "e.g. Mukesh Kumar" },
            { name: "semester", title: "Semester", kind: "semester" },
            { name: "university", title: "University", kind: "text", placeholder: "e.g. University of Karachi", fromProfile: "university" },
            { name: "url", title: "Resource URL", kind: "text", placeholder: "https://...", fullWidth: true },
        ],
    },
    book: {
        pageTitle: "Add Book",
        pageDescription: "Index new books",
        heading: "Upload New Book",
        endpoint: "/api/book/upload",
        successMessage: "Book uploaded successfully!",
        Guidelines: BookGuidelines,
        fields: [
            { name: "title", title: "Title", kind: "text", placeholder: "e.g. Digital Computer Electronics 3rd Edition" },
            { name: "bookAuthor", title: "Author", kind: "text", placeholder: "e.g. Albert P. Malvino" },
            { name: "subject", title: "Subject", kind: "text", placeholder: "e.g. Digital Logic Design" },
            { name: "semester", title: "Semester", kind: "semester" },
            { name: "university", title: "University", kind: "text", placeholder: "e.g. University of Karachi", fromProfile: "university" },
            { name: "url", title: "Book URL", kind: "text", placeholder: "https://...", fullWidth: true },
        ],
    },
    channel: {
        pageTitle: "Add Channel",
        pageDescription: "Share YouTube channels",
        heading: "Upload New Channel",
        endpoint: "/api/channel/upload",
        successMessage: "Channel uploaded successfully!",
        Guidelines: ChannelGuidelines,
        scrapeTitleFromUrl: true,
        fields: [
            { name: "url", title: "Channel URL", kind: "text", placeholder: "https://youtube.com/@channel", fullWidth: true },
            { name: "title", title: "Title", kind: "text", placeholder: "Auto-filled from the channel URL", readOnly: true, fullWidth: true },
            { name: "subject", title: "Subject", kind: "text", placeholder: "e.g. Digital Logic Design" },
            { name: "university", title: "University", kind: "text", placeholder: "e.g. University of Karachi", fromProfile: "university" },
            { name: "description", title: "Description", kind: "textarea", placeholder: "What is this channel about?", fullWidth: true },
        ],
    },
};

function buildInitial(config, user) {
    const data = {};
    for (const f of config.fields) {
        if (f.kind === "semester") {
            data[f.name] = user?.academicDetails?.semester ?? "non-specific";
        } else if (f.fromProfile) {
            data[f.name] = user?.academicDetails?.[f.fromProfile] ?? "";
        } else {
            data[f.name] = "";
        }
    }
    return data;
}

export default function AddContentForm({ type, user, sidebarStatus }) {
    const config = CONFIG[type];
    const initialData = useMemo(() => buildInitial(config, user), [config, user]);

    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [formKey, setFormKey] = useState(0); // bump to reset uncontrolled <select>s

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (config.scrapeTitleFromUrl && name === "url" && value) {
            try {
                const res = await fetch("/api/channel/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: value }),
                });
                const data = await res.json();
                if (res.ok && data.channelName) {
                    setFormData((prev) => ({ ...prev, title: data.channelName }));
                }
            } catch {
                // non-fatal: user can still type/submit; server validates
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(config.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.success) {
                setToast({ message: config.successMessage, icon: Check });
                setFormData(buildInitial(config, user));
                setFormKey((k) => k + 1);
            } else {
                setError(result.message || "Upload failed.");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const { Guidelines } = config;

    return (
        <DashboardParent>
            <Sidebar user={user} sidebarStatus={sidebarStatus} />
            <DashboardScrollable>
                <DashboardWorkspace>
                    <PageTitle heading={config.pageTitle} description={config.pageDescription} />
                    <div className="flex-col gap-6">
                        <DashboardWorkspaceBlock extraClasses={"gap-3"}>
                            <DashboardHeading>{config.heading}</DashboardHeading>

                            <div key={formKey} className="grid! grid-cols-1 md:grid-cols-2 gap-4">
                                {config.fields.map((f) => {
                                    const cls = f.fullWidth ? "md:col-span-2 flex" : "flex";
                                    if (f.kind === "semester") {
                                        return (
                                            <div className={cls} key={f.name}>
                                                <ExpandableSelectInputGroup
                                                    name={f.name}
                                                    title={f.title}
                                                    isRequired={true}
                                                    onChange={handleChange}
                                                    defaultValue={formData[f.name]}
                                                    options={SEMESTER_OPTIONS}
                                                />
                                            </div>
                                        );
                                    }
                                    if (f.kind === "textarea") {
                                        return (
                                            <div className={cls} key={f.name}>
                                                <ExpandableTextAreaGroup
                                                    name={f.name}
                                                    title={f.title}
                                                    value={formData[f.name]}
                                                    onChange={handleChange}
                                                    isRequired={true}
                                                    placeholder={f.placeholder}
                                                />
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className={cls} key={f.name}>
                                            <ExpandableTextInputGroup
                                                name={f.name}
                                                title={f.title}
                                                value={formData[f.name]}
                                                onChange={handleChange}
                                                isRequired={true}
                                                readonly={!!f.readOnly}
                                                placeholder={f.placeholder}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="py-2 flex-col">
                                <HorizontalRule />
                                {!!error && <div className="text-sm text-red-500">{error}</div>}
                            </div>

                            {loading ? (
                                <Spinner />
                            ) : (
                                <SmallIconTextButton Icon={Upload} text={`Upload ${type}`} onClick={handleSubmit} />
                            )}
                        </DashboardWorkspaceBlock>
                        <Guidelines />
                    </div>
                </DashboardWorkspace>
            </DashboardScrollable>
            {toast && (
                <StatusToast
                    marginTop={10}
                    message={toast.message}
                    type={toast.type}
                    icon={toast.icon}
                    onClose={() => setToast(null)}
                />
            )}
        </DashboardParent>
    );
}
