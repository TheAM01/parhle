import db from "@/lib/database";
import { SITE_URL, PUBLIC_ROUTES } from "@/lib/site";

// Regenerate hourly so new uploads show up without a redeploy.
export const revalidate = 3600;

async function resourceEntries() {
    try {
        const docs = await db
            .collection("resources")
            .find({}, { projection: { _id: 1, createdAt: 1 } })
            .toArray();
        return docs.map((doc) => ({
            url: `${SITE_URL}/resources/${doc._id}`,
            lastModified: doc.createdAt ? new Date(doc.createdAt) : undefined,
            changeFrequency: "monthly",
            priority: 0.7,
        }));
    } catch (error) {
        // Never fail the whole sitemap because the database is unreachable.
        console.error("Sitemap: could not load resources:", error);
        return [];
    }
}

export default async function sitemap() {
    const lastModified = new Date();
    const staticEntries = PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
        url: `${SITE_URL}${path === "/" ? "" : path}`,
        lastModified,
        changeFrequency,
        priority,
    }));
    return [...staticEntries, ...(await resourceEntries())];
}
