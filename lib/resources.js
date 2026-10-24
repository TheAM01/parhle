import { cache } from "react";
import { ObjectId } from "mongodb";
import db from "@/lib/database";

// Mongo docs -> plain JSON-safe objects (ObjectId/Date become strings).
const plain = (doc) => (doc ? JSON.parse(JSON.stringify(doc)) : null);

// Cached per request so generateMetadata and the page share one DB call.
export const getResource = cache(async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const doc = await db.collection("resources").findOne({ _id: new ObjectId(id) });
    return plain(doc);
});

export async function getRelatedResources(resource, limit = 6) {
    const docs = await db
        .collection("resources")
        .find({ subject: resource.subject, _id: { $ne: new ObjectId(resource._id) } })
        .project({ title: 1, teacher: 1, semester: 1, university: 1 })
        .sort({ likes: -1, createdAt: -1 })
        .limit(limit)
        .toArray();
    return plain(docs);
}

export async function getSolvedRequest(requestData) {
    if (!requestData || !ObjectId.isValid(String(requestData))) return null;
    const doc = await db
        .collection("requests")
        .findOne({ _id: new ObjectId(String(requestData)) }, { projection: { title: 1 } });
    return plain(doc);
}

export function formatSemester(semester) {
    if (semester === undefined || semester === null || semester === "") return null;
    const value = String(semester).trim();
    if (/^\d+$/.test(value)) return `Semester ${value}`;
    if (/non[- ]?specific|any|n\/a/i.test(value)) return "Any semester";
    return value;
}

export function describeResource(r) {
    const semester = formatSemester(r.semester);
    const context = [semester !== "Any semester" && semester, r.university].filter(Boolean).join(", ");
    let text = `${r.title}: ${r.subject} study material`;
    if (r.teacher) text += ` by ${r.teacher}`;
    if (context) text += ` (${context})`;
    text += ". Free to view and download on Parhle.";
    return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}
