/** Shared mapping between a content "type" and its Mongo collection / user liked-bucket key. */
export const CONTENT_COLLECTION = {
    resource: "resources",
    book: "books",
    channel: "channels",
} as const;

export type ContentType = keyof typeof CONTENT_COLLECTION;

export const CONTENT_TYPES = Object.keys(CONTENT_COLLECTION) as ContentType[];
