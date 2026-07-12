/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Note: state lives in the process, so in a multi-instance / serverless
 * deployment each instance keeps its own counters. It meaningfully slows
 * brute-force attempts against a single instance; for hard guarantees across
 * instances, back this with Redis/Upstash. Kept dependency-free on purpose.
 */
type Bucket = { count: number; reset: number };

const store = new Map<string, Bucket>();

export interface RateLimitResult {
    ok: boolean;
    remaining: number;
    retryAfter: number; // seconds until the window resets
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const bucket = store.get(key);

    if (!bucket || now > bucket.reset) {
        store.set(key, { count: 1, reset: now + windowMs });
        return { ok: true, remaining: limit - 1, retryAfter: 0 };
    }

    if (bucket.count >= limit) {
        return { ok: false, remaining: 0, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
    }

    bucket.count += 1;
    return { ok: true, remaining: limit - bucket.count, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (Vercel/NGINX set these). */
export function clientIp(req: Request): string {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}
