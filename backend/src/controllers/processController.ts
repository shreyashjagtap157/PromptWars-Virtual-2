import { Request, Response, NextFunction } from 'express';
import { ProcessService } from '../services/ProcessService';

/**
 * Controller for fetching election guides.
 * Supports auto-detection of region via IP if not explicitly provided.
 */
export const getProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let region = req.query.region as string | undefined;

        // If no region provided or explicitly 'null', attempt IP-based detection
        if (!region || region === 'null' || region === 'undefined') {
            try {
                // Get client IP (x-forwarded-for for Cloud Run/Proxy, remoteAddress for local)
                const rawIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
                const ip = rawIp.split(',')[0].trim();
                
                // Use the built-in fetch (available in Node.js 18+)
                // We use ip-api.com for lightweight, keyless country resolution
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country`);
                const geoData: any = await geoRes.json();
                
                if (geoData.status === 'success') {
                    region = geoData.country;
                    console.log(`[AutoDetect] IP ${ip} mapped to country: ${region}`);
                }
            } catch (ipErr) {
                console.error('[AutoDetect Warning] IP Geolocation fallback failed:', ipErr);
                // Fail silently to the ProcessService default (General guide)
            }
        }

        const processData = ProcessService.getProcessForRegion(region);
        res.json(processData);
    } catch (error) {
        next(error);
    }
};
