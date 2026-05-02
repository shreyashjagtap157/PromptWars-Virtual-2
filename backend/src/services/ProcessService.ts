import fs from 'fs';
import path from 'path';

// Load roadmap data synchronously
// Note: Using path.join with __dirname is safe here as we are in a CommonJS-compatible build environment
const roadmapPath = path.join(__dirname, '..', 'data', 'roadmaps.json');
const roadmapData = JSON.parse(fs.readFileSync(roadmapPath, 'utf8'));

interface Step {
    id: string;
    title: string;
    description: string;
    order: number;
}

interface ProcessResponse {
    mode: "general" | "region-specific";
    steps: Step[];
}

function normalizeRegion(region?: string): string {
    return (region || '').toLowerCase().trim();
}

export class ProcessService {
    public static getProcessForRegion(region?: string): ProcessResponse {
        const cleanRegion = normalizeRegion(region);
        
        // Dynamic region matching
        if (cleanRegion.includes('india')) {
            return roadmapData.india as ProcessResponse;
        }

        if (cleanRegion.includes('usa') || cleanRegion.includes('united states') || cleanRegion === 'us') {
            return roadmapData.usa as ProcessResponse;
        }

        return roadmapData.general as ProcessResponse;
    }
}
