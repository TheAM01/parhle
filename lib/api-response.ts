import { NextResponse } from "next/server";

/** Standard success envelope: { success: true, ...data }. */
export function ok(data: Record<string, unknown> = {}, status = 200) {
    return NextResponse.json({ success: true, ...data }, { status });
}

/** Standard error envelope: { success: false, message }. */
export function fail(message: string, status = 400) {
    return NextResponse.json({ success: false, message }, { status });
}
