import { Translate } from '@google-cloud/translate/build/src/v2';
import { logger } from '../config/logger';

// The Translate client will automatically look for GOOGLE_APPLICATION_CREDENTIALS env var
const translateClient = new Translate();

const TRANSLATION_CACHE_TTL_MS = 15 * 60 * 1000;
const FAILED_TRANSLATION_CACHE_TTL_MS = 60 * 1000;
const MAX_TRANSLATION_CACHE_ENTRIES = 500;

const translationCache = new Map<string, { translation: string; expiresAt: number }>();
const inFlightTranslations = new Map<string, Promise<string>>();

function getTranslationCacheKey(text: string, targetLanguage: string): string {
    return `${targetLanguage.trim().toLowerCase()}::${text}`;
}

function getCachedTranslation(cacheKey: string): string | null {
    const cached = translationCache.get(cacheKey);
    if (!cached) {
        return null;
    }

    if (cached.expiresAt <= Date.now()) {
        translationCache.delete(cacheKey);
        return null;
    }

    return cached.translation;
}

function storeTranslation(cacheKey: string, translation: string, ttlMs = TRANSLATION_CACHE_TTL_MS): void {
    if (translationCache.size >= MAX_TRANSLATION_CACHE_ENTRIES) {
        const oldestKey = translationCache.keys().next().value;
        if (oldestKey) {
            translationCache.delete(oldestKey);
        }
    }

    translationCache.set(cacheKey, {
        translation,
        expiresAt: Date.now() + ttlMs,
    });
}

export class TranslateService {
    public static async translateText(text: string, targetLanguage: string): Promise<string> {
        const cacheKey = getTranslationCacheKey(text, targetLanguage);
        const cachedTranslation = getCachedTranslation(cacheKey);
        if (cachedTranslation) {
            return cachedTranslation;
        }

        const inFlight = inFlightTranslations.get(cacheKey);
        if (inFlight) {
            return inFlight;
        }

        const translationPromise = (async () => {
            const requestedLanguage = targetLanguage.trim();

            try {
                const [translation] = await translateClient.translate(text, requestedLanguage);
                const resolvedTranslation = typeof translation === 'string' ? translation : String(translation);
                storeTranslation(cacheKey, resolvedTranslation);
                return resolvedTranslation;
            } catch (error) {
                logger.error('Real Google Translation failed, falling back to mock trace', { error, text, targetLanguage: requestedLanguage });
                const fallbackTranslation = `[Live-Error-Fallback to ${requestedLanguage}]: ${text}`;
                storeTranslation(cacheKey, fallbackTranslation, FAILED_TRANSLATION_CACHE_TTL_MS);
                return fallbackTranslation;
            } finally {
                inFlightTranslations.delete(cacheKey);
            }
        })();

        inFlightTranslations.set(cacheKey, translationPromise);
        return translationPromise;
    }
}
