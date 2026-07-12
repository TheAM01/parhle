import db from "@/lib/database";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";

export async function POST() {
    try {
        const admin = await requireAdmin();
        if (admin instanceof NextResponse) return admin;

        const result = await db.collection("users").updateMany(
            { "academicDetails.semester": { $lt: 8 } },
            { $inc: { "academicDetails.semester": 1 } }
        );

        return ok({ message: "Semesters incremented", modified: result.modifiedCount });
    } catch (error) {
        console.error("Semester increment error:", error);
        return fail("Internal Server Error", 500);
    }
}
