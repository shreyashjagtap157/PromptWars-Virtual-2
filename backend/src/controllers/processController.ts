import { Request, Response, NextFunction } from 'express';
import { ProcessService } from '../services/ProcessService';
import fetch from 'node-fetch';

export const getProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let region = req.query.region as string | undefined;

        // If no region provided, attempt IP-based detection
        if (!region || region === 'null' || region === 'undefined') {
            try {
                // Get client IP (handling proxy headers)
                const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
                const ipClean = ip.split(',')[0].trim();
                
                // Fallback IP intelligence (ip-api.com is free for non-commercial use)
                const geoRes = await fetch(`http://ip-api.com/json/${ipClean}?fields=status,country`);
                const geoData: any = await geoRes.json();
                
                if (geoData.status === 'success') {
                    region = geoData.country;
                    console.log(`[AutoDetect] Resolved IP ${ipClean} to country: ${region}`);
                }
            } catch (ipErr) {
                console.error('[AutoDetect] IP Geolocation failed:', ipErr);
                // Fallback to general if IP detection fails
            }
        }

        const processData = ProcessService.getProcessForRegion(region);
        res.json(processData);
    } catch (error) {
        next(error);
    }
};
