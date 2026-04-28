import { db } from '../config/firebase';
import { StoredProfile, createDefaultProfile, isAlreadyExistsError, mergeProfileDefaults } from './profileHelpers';

const MAX_CACHE_ENTRIES = 1000;
const lastProgressSignatures = new Map<string, string>();
const lastPreferenceSignatures = new Map<string, string>();

function trimCache(cache: Map<string, string>): void {
    if (cache.size <= MAX_CACHE_ENTRIES) {
        return;
    }

    const oldestKey = cache.keys().next().value;
    if (oldestKey) {
        cache.delete(oldestKey);
    }
}

function createProgressSignature(progress: Record<string, string>): string {
    return Object.keys(progress)
        .sort()
        .map((stepId) => `${stepId}:${progress[stepId]}`)
        .join('|');
}

function createPreferenceSignature(preferences: {
    selectedRegion?: string;
    selectedState?: string;
    selectedDistrict?: string;
    preferredLanguage?: string;
}): string {
    return [
        preferences.selectedRegion || 'general',
        preferences.selectedState || '',
        preferences.selectedDistrict || '',
        preferences.preferredLanguage || 'en-US',
    ].join('|');
}

export class UserService {
    public static async getUserProfile(uid: string) {
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            const defaultProfile = createDefaultProfile();

            try {
                await userRef.create(defaultProfile);
                return defaultProfile;
            } catch (error) {
                if (!isAlreadyExistsError(error)) {
                    throw error;
                }

                const existingDoc = await userRef.get();
                return mergeProfileDefaults(existingDoc.data() as Partial<StoredProfile> | undefined);
            }
        }

        return mergeProfileDefaults(userDoc.data() as Partial<StoredProfile> | undefined);
    }

    public static async saveProgress(uid: string, progress: Record<string, string>) {
        const progressSignature = createProgressSignature(progress);
        if (lastProgressSignatures.get(uid) === progressSignature) {
            return { success: true, skipped: true };
        }

        await db.collection('users').doc(uid).set(
            { progress, updatedAt: new Date().toISOString() },
            { merge: true }
        );

        lastProgressSignatures.set(uid, progressSignature);
        trimCache(lastProgressSignatures);
        return { success: true };
    }

    public static async savePreferences(uid: string, preferences: {
        selectedRegion?: string;
        selectedState?: string;
        selectedDistrict?: string;
        preferredLanguage?: string;
    }) {
        const preferenceSignature = createPreferenceSignature(preferences);
        if (lastPreferenceSignatures.get(uid) === preferenceSignature) {
            return { success: true, skipped: true };
        }

        await db.collection('users').doc(uid).set(
            { ...preferences, updatedAt: new Date().toISOString() },
            { merge: true }
        );

        lastPreferenceSignatures.set(uid, preferenceSignature);
        trimCache(lastPreferenceSignatures);
        return { success: true };
    }
}
