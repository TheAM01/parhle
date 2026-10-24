import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, User, University, Upload, Clock, ChevronLeft, ExternalLink } from "lucide-react";
import { DashboardWorkspace } from "@/components/ui/Structure";
import { HorizontalRule } from "@/components/ui/HorizontalRule";
import { VisitResourceButton } from "@/components/ui/Buttons";
import { SolutionBadge } from "@/components/ui/Cards";
import ResourceLike from "./resource-like.client";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
    getResource,
    getRelatedResources,
    getSolvedRequest,
    formatSemester,
    describeResource,
} from "@/lib/resources";

// Rebuild each page at most every 10 minutes; like state is loaded in the browser.
export const revalidate = 600;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const resource = await getResource(id);
    if (!resource) return { title: "Resource not found", robots: { index: false } };

    const title = `${resource.title} - ${resource.subject}`;
    const description = describeResource(resource);
    const path = `/resources/${resource._id}`;
    const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: resource.title };

    return {
        // absolute: the /resources layout's title would otherwise block the root "| Parhle" template
        title: { absolute: `${title} | ${SITE_NAME}` },
        description,
        keywords: [resource.subject, resource.title, resource.teacher, resource.university, "notes", "study material"].filter(Boolean),
        alternates: { canonical: path },
        openGraph: {
            type: "article",
            title: `${title} | ${SITE_NAME}`,
            description,
            url: path,
            siteName: SITE_NAME,
            images: [ogImage],
            ...(resource.createdAt && { publishedTime: resource.createdAt }),
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
            images: [ogImage.url],
        },
    };
}

function Detail({ icon, label, value }) {
    if (!value) return null;
    return (
        <div className="items-center text-gray-dark mb-3">
            {icon}
            <div className="ml-2 text-sm">
                <span className="text-gray-dark mr-2">{label}:</span>
                <span className="text-white">{value}</span>
            </div>
        </div>
    );
}

export default async function ResourcePage({ params }) {
    const { id } = await params;
    const resource = await getResource(id);
    if (!resource) notFound();

    const [related, solvedRequest] = await Promise.all([
        getRelatedResources(resource),
        resource.solution?.isSolution ? getSolvedRequest(resource.solution.requestData) : null,
    ]);

    const semester = formatSemester(resource.semester);
    const uploaded = resource.createdAt
        ? new Date(resource.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        : null;
    const pageUrl = `${SITE_URL}/resources/${resource._id}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LearningResource",
                "@id": `${pageUrl}#resource`,
                name: resource.title,
                description: describeResource(resource),
                url: pageUrl,
                about: resource.subject,
                educationalLevel: semester && semester !== "Any semester" ? semester : undefined,
                inLanguage: "en",
                isAccessibleForFree: true,
                ...(resource.createdAt && { datePublished: resource.createdAt }),
                author: resource.teacher ? { "@type": "Person", name: resource.teacher } : undefined,
                contributor: resource.author ? { "@type": "Person", name: resource.author } : undefined,
                sourceOrganization: resource.university
                    ? { "@type": "CollegeOrUniversity", name: resource.university }
                    : undefined,
                interactionStatistic: {
                    "@type": "InteractionCounter",
                    interactionType: "https://schema.org/LikeAction",
                    userInteractionCount: resource.likes || 0,
                },
                publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
                    { "@type": "ListItem", position: 3, name: resource.title, item: pageUrl },
                ],
            },
        ],
    };

    return (
        <div className="flex-col min-h-screen texture-mosaic text-white pt-10 sm:pt-20 bg-black items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />
            <DashboardWorkspace>
                <nav aria-label="Breadcrumb" className="text-sm text-gray-dark mb-6 items-center gap-2 flex-wrap">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <span>/</span>
                    <Link href="/resources" className="hover:text-white">Resources</Link>
                    <span>/</span>
                    <span className="text-gray-medium truncate max-w-[60vw]">{resource.title}</span>
                </nav>

                <article className="flex-col bg-gray-900 border border-border-color p-6 lg:p-10">
                    {resource.solution?.isSolution && <SolutionBadge extraClasses="mb-3" />}

                    <div className="justify-between items-start gap-4">
                        <h1 className="text-3xl sm:text-4xl font-bold break-words">{resource.title}</h1>
                        <ResourceLike id={resource._id} initialCount={resource.likes || 0} />
                    </div>
                    <p className="text-gray-medium mt-2 mb-6">
                        {resource.subject} study material{resource.teacher ? ` by ${resource.teacher}` : ""}
                        {resource.university ? `, ${resource.university}` : ""}.
                    </p>

                    <div className="flex-col">
                        <Detail icon={<BookOpen size={16} />} label="Subject" value={resource.subject} />
                        <Detail icon={<Calendar size={16} />} label="Semester" value={semester} />
                        <Detail icon={<User size={16} />} label="Teacher" value={resource.teacher} />
                        <Detail icon={<University size={16} />} label="University" value={resource.university} />
                        <Detail icon={<Upload size={16} />} label="Uploaded by" value={resource.author} />
                        <Detail icon={<Clock size={16} />} label="Uploaded on" value={uploaded} />
                    </div>

                    {solvedRequest && (
                        <p className="text-sm text-gray-medium mt-2">
                            Uploaded in answer to the request &ldquo;{solvedRequest.title}&rdquo;.
                        </p>
                    )}

                    <HorizontalRule />
                    <VisitResourceButton href={resource.url} extraClasses="sm:w-max px-6">
                        View Resource <ExternalLink size={14} />
                    </VisitResourceButton>
                </article>

                {related.length > 0 && (
                    <section className="flex-col mt-10">
                        <h2 className="text-2xl font-semibold mb-4">More {resource.subject} resources</h2>
                        <div className="grid! grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {related.map((r) => (
                                <Link
                                    key={r._id}
                                    href={`/resources/${r._id}`}
                                    className="flex-col bg-gray-900 p-4 border border-border-color hover:border-gray-700 transition-colors"
                                >
                                    <span className="font-semibold">{r.title}</span>
                                    <span className="text-xs text-gray-dark mt-1">
                                        {[r.teacher, formatSemester(r.semester), r.university].filter(Boolean).join(" · ")}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <Link href="/resources" className="items-center gap-1 text-gray-medium hover:text-white mt-10 w-max">
                    <ChevronLeft size={16} /> All resources
                </Link>
            </DashboardWorkspace>
        </div>
    );
}
