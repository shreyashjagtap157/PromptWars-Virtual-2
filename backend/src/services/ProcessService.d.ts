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
export declare class ProcessService {
    static getProcessForRegion(region?: string): ProcessResponse;
}
export {};
//# sourceMappingURL=ProcessService.d.ts.map