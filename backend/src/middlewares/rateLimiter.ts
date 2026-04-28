import { NextFunction, Request, Response } from 'express';

type RateLimitBucket = {
    count: number;
    windowStart: number;
    expiresAt: number;
    lastSeen: number;
};

type RateLimitOptions = {
    keyPrefix: string;
    windowMs: number;
    max: number;
    message: string;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();
const MAX_TRACKED_BUCKETS = 5000;

function getClientIdentifier(req: Request): string {
    const forwardedFor = req.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
        return forwardedFor.split(',')[0].trim();
    }

    if (Array.isArray(forwardedFor) && forwardedFor.length > 0 && forwardedFor[0].trim()) {
        return forwardedFor[0].split(',')[0].trim();
    }

    return req.ip || req.socket.remoteAddress || 'unknown';
}

function getRateLimitKey(req: Request, keyPrefix: string): string {
    const identity = req.user?.uid || getClientIdentifier(req);
    return `${keyPrefix}:${identity}`;
}

function trimRateLimitBuckets(now: number): void {
    if (rateLimitBuckets.size <= MAX_TRACKED_BUCKETS) {
        return;
    }

    for (const [key, bucket] of rateLimitBuckets.entries()) {
        if (bucket.expiresAt <= now) {
            rateLimitBuckets.delete(key);
        }

        if (rateLimitBuckets.size <= MAX_TRACKED_BUCKETS) {
            return;
        }
    }

    let oldestKey: string | undefined;
    let oldestSeen = Number.POSITIVE_INFINITY;
    for (const [key, bucket] of rateLimitBuckets.entries()) {
        if (bucket.lastSeen < oldestSeen) {
            oldestSeen = bucket.lastSeen;
            oldestKey = key;
        }
    }

    if (oldestKey) {
        rateLimitBuckets.delete(oldestKey);
    }
}

export function createRateLimiter(options: RateLimitOptions) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const now = Date.now();
        const bucketKey = getRateLimitKey(req, options.keyPrefix);
        const existingBucket = rateLimitBuckets.get(bucketKey);
        const bucket = existingBucket || {
            count: 0,
            windowStart: now,
            expiresAt: now + options.windowMs,
            lastSeen: now,
        };

        if (now >= bucket.expiresAt) {
            bucket.count = 0;
            bucket.windowStart = now;
            bucket.expiresAt = now + options.windowMs;
        }

        bucket.count += 1;
        bucket.lastSeen = now;
        rateLimitBuckets.set(bucketKey, bucket);
        trimRateLimitBuckets(now);

        const remaining = Math.max(0, options.max - bucket.count);
        res.setHeader('X-RateLimit-Limit', String(options.max));
        res.setHeader('X-RateLimit-Remaining', String(remaining));
        res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.expiresAt / 1000)));

        if (bucket.count > options.max) {
            const retryAfterSeconds = Math.max(1, Math.ceil((bucket.expiresAt - now) / 1000));
            res.setHeader('Retry-After', String(retryAfterSeconds));
            console.warn(`[RateLimit] ${req.method} ${req.originalUrl} blocked for ${bucketKey}`);
            res.status(429).json({
                error: {
                    message: options.message,
                    status: 429,
                    retryAfterSeconds,
                },
            });
            return;
        }

        next();
    };
}