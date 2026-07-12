import { z } from "zod";

/** Run a zod schema over a request body; returns parsed data or a list of messages. */
export function validate<T>(
    schema: z.ZodType<T>,
    body: unknown
): { success: true; data: T } | { success: false; message: string } {
    const result = schema.safeParse(body);
    if (result.success) return { success: true, data: result.data };
    const first = result.error.issues[0];
    return { success: false, message: first?.message ?? "Invalid request body" };
}

const username = z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-z0-9_.]+$/, "Username may only contain lowercase letters, numbers, '.' and '_'");

const semester = z.coerce.number().int().min(1).max(8);

export const loginSchema = z.object({
    username: z.string().trim().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
    .object({
        fullName: z.string().trim().min(1, "Full name is required").max(100),
        username,
        email: z.string().trim().email("A valid email is required"),
        password: z.string().min(8, "Password must be at least 8 characters").max(200),
        confirmPassword: z.string(),
        university: z.string().min(1, "University is required"),
        semester,
        degree: z.string().min(1, "Degree is required"),
        course: z.string().min(1, "Course is required"),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const editUserSchema = z.object({
    currentUsername: z.string().trim().min(1),
    username,
    fullName: z.string().trim().min(1).max(100),
    university: z.string().min(1),
    semester,
    degree: z.string().min(1),
    course: z.string().min(1),
});

export const bookUploadSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    subject: z.string().trim().min(1, "Subject is required").max(120),
    semester: z.union([semester, z.string().min(1)]),
    bookAuthor: z.string().trim().min(1, "Author is required").max(120),
    university: z.string().trim().min(1, "University is required"),
    url: z.string().trim().url("A valid URL is required"),
});

export const channelUploadSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    subject: z.string().trim().min(1, "Subject is required").max(120),
    university: z.string().trim().min(1, "University is required"),
    description: z.string().trim().min(1, "Description is required").max(2000),
    url: z.string().trim().url("A valid URL is required"),
});

export const resourceUploadSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    subject: z.string().trim().min(1, "Subject is required").max(120),
    semester: z.union([semester, z.string().min(1)]),
    teacher: z.string().trim().min(1, "Teacher is required").max(120),
    university: z.string().trim().min(1, "University is required"),
    url: z.string().trim().url("A valid URL is required"),
});

export const likeSchema = z.object({
    type: z.enum(["resource", "book", "channel"]),
    id: z.string().min(1, "Content id is required"),
});

export const requestNewSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    subject: z.string().trim().min(1, "Subject is required").max(120),
    university: z.string().trim().min(1, "University is required"),
    semester: z.union([semester, z.string().min(1)]),
    resourceType: z.string().trim().min(1, "Resource type is required"),
    author: z.string().trim().min(1, "Author is required"),
    priority: z.preprocess(
        (v) => (typeof v === "string" ? v.toLowerCase() : v),
        z.enum(["low", "medium", "high"])
    ),
    description: z.string().trim().min(1, "Description is required").max(2000),
});
