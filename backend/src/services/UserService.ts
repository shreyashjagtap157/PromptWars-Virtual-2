import { db } from '../config/firebase';

export class UserService {
    public static async getUserProfile(uid: string) {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            // Auto-create a default profile if it doesn't exist
            const defaultProfile = {
                selectedRegion: 'general',
                selectedState: '',
                selectedDistrict: '',
                preferredLanguage: 'en-US',
                progress: {},
                createdAt: new Date().toISOString(),
            };
            await db.collection('users').doc(uid).set(defaultProfile);
            return defaultProfile;
        }
        return userDoc.data();
    }

    public static async saveProgress(uid: string, progress: Record<string, string>) {
        await db.collection('users').doc(uid).set(
            { progress, updatedAt: new Date().toISOString() },
            { merge: true }
        );
        return { success: true };
    }

    public static async savePreferences(uid: string, preferences: {
        selectedRegion?: string;
        selectedState?: string;
        selectedDistrict?: string;
        preferredLanguage?: string;
    }) {
        await db.collection('users').doc(uid).set(
            { ...preferences, updatedAt: new Date().toISOString() },
            { merge: true }
        );
        return { success: true };
    }
}
