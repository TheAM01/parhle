import { getSession } from "@/lib/get-session";
import { ok } from "@/lib/api-response";

export async function POST() {
    const session = await getSession();
    session.destroy();
    return ok({ message: "Logged out" });
}
