export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    order: number;
}

export interface ProcessResponse {
    mode: "general" | "region-specific";
    steps: ProcessStep[];
}

const PROCESS_CACHE_TTL_MS = 5 * 60 * 1000;
const PROCESS_ERROR_FALLBACK_TTL_MS = 60 * 1000;
const PROCESS_FETCH_TIMEOUT_MS = 8000;

const processResponseCache = new Map<string, { expiresAt: number; data: ProcessResponse }>();
const inFlightProcessRequests = new Map<string, Promise<ProcessResponse>>();

function normalizeRegionKey(region?: string): string {
    return (region || "").trim().toLowerCase();
}

function buildProcessUrl(region?: string): string {
    const trimmedRegion = region?.trim();
    return trimmedRegion ? `/api/process?region=${encodeURIComponent(trimmedRegion)}` : "/api/process";
}

function normalizeProcessResponse(data: ProcessResponse): ProcessResponse {
    return {
        mode: data.mode === "region-specific" ? "region-specific" : "general",
        steps: Array.isArray(data.steps)
            ? [...data.steps]
                .sort((left, right) => left.order - right.order)
                .map((step) => ({ ...step }))
            : [],
    };
}

function storeProcessResponse(cacheKey: string, data: ProcessResponse, ttlMs = PROCESS_CACHE_TTL_MS): void {
    processResponseCache.set(cacheKey, {
        expiresAt: Date.now() + ttlMs,
        data,
    });
}

export async function fetchProcessData(region?: string): Promise<ProcessResponse> {
    const cacheKey = normalizeRegionKey(region) || "general";
    const cached = processResponseCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.data;
    }

    const staleData = cached?.data ?? null;

    const inFlightRequest = inFlightProcessRequests.get(cacheKey);
    if (inFlightRequest) {
        return inFlightRequest;
    }

    const request = (async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), PROCESS_FETCH_TIMEOUT_MS);

        try {
            const response = await fetch(buildProcessUrl(region), { signal: controller.signal });
            if (!response.ok) {
                throw new Error("Backend unavailable");
            }

            const normalized = normalizeProcessResponse((await response.json()) as ProcessResponse);
            storeProcessResponse(cacheKey, normalized);
            return normalized;
        } catch (error) {
            if (staleData) {
                storeProcessResponse(cacheKey, staleData, PROCESS_ERROR_FALLBACK_TTL_MS);
                return staleData;
            }

            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    })().finally(() => {
        inFlightProcessRequests.delete(cacheKey);
    });

    inFlightProcessRequests.set(cacheKey, request);
    return request;
}

export async function fetchProcessStepCount(region?: string): Promise<number> {
    const data = await fetchProcessData(region);
    return data.steps.length;
}