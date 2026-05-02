/**
 * Shared types for CivicGuide Election Roadmap
 */

export interface Step {
    id: string;
    title: string;
    description: string;
    order: number;
}

export type RoadmapMode = "general" | "region-specific";

export interface RoadmapResponse {
    mode: RoadmapMode;
    steps: Step[];
}

export interface TranslationResponse {
    translation: string;
}

export interface ErrorResponse {
    error: {
        message: string;
        status: number;
        requestId?: string;
    };
}
