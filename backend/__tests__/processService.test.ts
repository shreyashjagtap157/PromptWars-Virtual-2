import { describe, it, expect } from 'vitest';
import { ProcessService } from '../src/services/ProcessService';

describe('ProcessService', () => {
    it('should return India specific steps for "India" region', () => {
        const result = ProcessService.getProcessForRegion('India');
        expect(result.mode).toBe('region-specific');
        expect(result.steps.length).toBe(13);
        expect(result.steps[0].title).toContain('eci.gov.in');
    });

    it('should return USA specific steps for "USA" region', () => {
        const result = ProcessService.getProcessForRegion('USA');
        expect(result.mode).toBe('region-specific');
        expect(result.steps.length).toBe(10);
        expect(result.steps[0].title).toContain('Secretary of State');
    });

    it('should return USA specific steps for "United States" region', () => {
        const result = ProcessService.getProcessForRegion('United States');
        expect(result.mode).toBe('region-specific');
        expect(result.steps.length).toBe(10);
    });

    it('should return general steps for unknown regions', () => {
        const result = ProcessService.getProcessForRegion('Mars');
        expect(result.mode).toBe('general');
        expect(result.steps.length).toBe(7);
    });

    it('should handle undefined or null region', () => {
        const result = ProcessService.getProcessForRegion(undefined);
        expect(result.mode).toBe('general');
        expect(result.steps.length).toBe(7);
    });

    it('should be case insensitive', () => {
        const result = ProcessService.getProcessForRegion('india');
        expect(result.steps.length).toBe(13);
    });
});
