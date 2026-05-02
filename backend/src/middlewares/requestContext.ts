import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
    }
}

import { logger } from '../config/logger';

function normalizeRequestId(value: unknown): string {
    if (typeof value !== 'string') {
        return randomUUID();
    }

    const trimmed = value.trim().replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 64);
    return trimmed || randomUUID();
}

export const requestContext = (req: Request, res: Response, next: NextFunction): void => {
    const requestId = normalizeRequestId(req.headers['x-request-id']);
    req.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);

    const startedAt = Date.now();
    res.once('finish', () => {
        if (req.path === '/healthz') {
            return;
        }

        const durationMs = Date.now() - startedAt;
        logger.info(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`, {
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            durationMs,
        });
    });

    next();
};