import db from "@/lib/database";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { ok, fail } from "@/lib/api-response";

export async function POST() {
    try {
        const admin = await requireAdmin();
        if (admin instanceof NextResponse) return admin;

        const result = await db.collection("users").updateMany(
            { "academicDetails.semester": { $gt: 1 } },
            { $inc: { "academicDetails.semester": -1 } }
        );

        return ok({ message: "Semesters decremented", modified: result.modifiedCount });
    } catch (error) {
        console.error("Semester decrement error:", error);
        return fail("Internal Server Error", 500);
    }
}
