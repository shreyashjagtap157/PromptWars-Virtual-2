import { Request, Response, NextFunction } from 'express';
import { ProcessService } from '../services/ProcessService';

/**
 * Controller for fetching election guides.
 * Supports auto-detection of region via IP if not explicitly provided.
 */
const GEO_LOOKUP_CACHE_TTL_MS = 60 * 60 * 1000;
const geoLookupCache = new Map<string, { country: string; expiresAt: number }>();

function getClientIp(req: Request): string {
    return req.ip || (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() || req.socket.remoteAddress || '';
}

function isPrivateIp(ip: string): boolean {
    return !ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('::ffff:127.') || ip.startsWith('::ffff:10.') || ip.startsWith('::ffff:192.168.');
}

async function resolveCountryFromIp(ip: string): Promise<string | null> {
    if (isPrivateIp(ip)) {
        return null;
    }

    const cached = geoLookupCache.get(ip);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.country;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    try {
        const geoRes = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country`, {
            signal: controller.signal,
        });

        if (!geoRes.ok) {
            return null;
        }

        const geoData: { status?: string; country?: string } = await geoRes.json();
        if (geoData.status === 'success' && geoData.country) {
            geoLookupCache.set(ip, {
                country: geoData.country,
                expiresAt: Date.now() + GEO_LOOKUP_CACHE_TTL_MS,
            });
            return geoData.country;
        }
    } catch (error) {
        console.error('[AutoDetect Warning] IP geolocation fallback failed:', error);
    } finally {
        clearTimeout(timeoutId);
    }

    return null;
}

export const getProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let region = req.query.region as string | undefined;
        const hasExplicitRegion = Boolean(region && region !== 'null' && region !== 'undefined');

        if (!hasExplicitRegion) {
            const ip = getClientIp(req);
            const detectedCountry = await resolveCountryFromIp(ip);

            if (detectedCountry) {
                region = detectedCountry;
                console.log(`[${req.requestId || 'no-request-id'}] [AutoDetect] IP ${ip} mapped to country: ${region}`);
            }
        }

        const processData = ProcessService.getProcessForRegion(region);
        res.setHeader('Cache-Control', `${hasExplicitRegion ? 'public' : 'private'}, max-age=300, stale-while-revalidate=86400`);
        res.json(processData);
    } catch (error) {
        next(error);
    }
};
