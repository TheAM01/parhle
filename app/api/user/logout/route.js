import { getSession } from "@/lib/get-session";

export async function POST() {
    const session = await getSession();
    session.destroy();
    return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
}
