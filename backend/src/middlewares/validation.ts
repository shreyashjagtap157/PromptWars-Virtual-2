import { NextFunction, Request, Response } from 'express';

const MAX_REGION_LENGTH = 100;
const MAX_TRANSLATION_TEXT_LENGTH = 5000;
const MAX_TRANSLATION_LANGUAGE_LENGTH = 20;
const MAX_PROGRESS_ENTRIES = 250;
const MAX_STEP_ID_LENGTH = 100;
const MAX_PREFERENCE_FIELD_LENGTH = 100;
const VALID_PROGRESS_STATUSES = new Set(['pending', 'active', 'completed']);
const LANGUAGE_TAG_PATTERN = /^[A-Za-z]{2,3}(?:[-_][A-Za-z0-9]{2,8})*$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function rejectWithMessage(res: Response, statusCode: number, message: string): void {
    res.status(statusCode).json({ error: message });
}

export const validateProcessQuery = (req: Request, res: Response, next: NextFunction): void => {
    const region = req.query.region;

    if (typeof region === 'undefined' || region === null) {
        next();
        return;
    }

    if (typeof region !== 'string') {
        rejectWithMessage(res, 400, 'region must be a string');
        return;
    }

    const normalizedRegion = region.trim();
    if (normalizedRegion.length > MAX_REGION_LENGTH) {
        rejectWithMessage(res, 400, `region must be ${MAX_REGION_LENGTH} characters or fewer`);
        return;
    }

    (req.query as Record<string, string>).region = normalizedRegion;
    next();
};

export const validateTranslationQuery = (req: Request, res: Response, next: NextFunction): void => {
    const text = req.query.text;
    const targetLanguage = req.query.targetLanguage;

    if (typeof text !== 'string' || !text.trim()) {
        rejectWithMessage(res, 400, 'Text is required');
        return;
    }

    if (typeof targetLanguage !== 'string' || !targetLanguage.trim()) {
        rejectWithMessage(res, 400, 'targetLanguage is required');
        return;
    }

    const normalizedText = text.trim();
    const normalizedLanguage = targetLanguage.trim();

    if (normalizedText.length > MAX_TRANSLATION_TEXT_LENGTH) {
        rejectWithMessage(res, 413, `Text must be ${MAX_TRANSLATION_TEXT_LENGTH} characters or fewer`);
        return;
    }

    if (normalizedLanguage.length > MAX_TRANSLATION_LANGUAGE_LENGTH || !LANGUAGE_TAG_PATTERN.test(normalizedLanguage)) {
        rejectWithMessage(res, 400, 'targetLanguage must be a valid language tag');
        return;
    }

    (req.query as Record<string, string>).text = normalizedText;
    (req.query as Record<string, string>).targetLanguage = normalizedLanguage;
    next();
};

export const validateProgressBody = (req: Request, res: Response, next: NextFunction): void => {
    const progress = req.body?.progress;

    if (!isPlainObject(progress)) {
        rejectWithMessage(res, 400, 'Progress object is required');
        return;
    }

    const entries = Object.entries(progress);
    if (entries.length > MAX_PROGRESS_ENTRIES) {
        rejectWithMessage(res, 400, `Progress cannot contain more than ${MAX_PROGRESS_ENTRIES} entries`);
        return;
    }

    const normalizedProgress: Record<string, 'pending' | 'active' | 'completed'> = {};
    for (const [stepId, status] of entries) {
        if (typeof stepId !== 'string' || !stepId.trim() || stepId.trim().length > MAX_STEP_ID_LENGTH) {
            rejectWithMessage(res, 400, 'Progress step IDs must be non-empty strings under 100 characters');
            return;
        }

        if (typeof status !== 'string' || !VALID_PROGRESS_STATUSES.has(status)) {
            rejectWithMessage(res, 400, 'Progress entries must be pending, active, or completed');
            return;
        }

        const normalizedStatus = status as 'pending' | 'active' | 'completed';
        normalizedProgress[stepId.trim()] = normalizedStatus;
    }

    req.body.progress = normalizedProgress;
    next();
};

export const validatePreferencesBody = (req: Request, res: Response, next: NextFunction): void => {
    if (!isPlainObject(req.body)) {
        rejectWithMessage(res, 400, 'Request body must be an object');
        return;
    }

    const stringFields = ['selectedRegion', 'selectedState', 'selectedDistrict', 'preferredLanguage'] as const;
    for (const field of stringFields) {
        const value = req.body[field];

        if (typeof value === 'undefined' || value === null) {
            continue;
        }

        if (typeof value !== 'string') {
            rejectWithMessage(res, 400, `${field} must be a string if provided`);
            return;
        }

        const normalizedValue = value.trim();
        if (normalizedValue.length > MAX_PREFERENCE_FIELD_LENGTH) {
            rejectWithMessage(res, 400, `${field} must be ${MAX_PREFERENCE_FIELD_LENGTH} characters or fewer`);
            return;
        }

        if (field === 'preferredLanguage' && normalizedValue && (normalizedValue.length > MAX_TRANSLATION_LANGUAGE_LENGTH || !LANGUAGE_TAG_PATTERN.test(normalizedValue))) {
            rejectWithMessage(res, 400, 'preferredLanguage must be a valid language tag');
            return;
        }

        req.body[field] = normalizedValue;
    }

    next();
};