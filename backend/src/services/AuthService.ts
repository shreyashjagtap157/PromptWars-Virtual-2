import { db } from '../config/firebase';

export class AuthService {
    // Called after Firebase Client SDK creates the user — this creates the Firestore profile
    public static async createProfile(uid: string, email: string) {
        const userRef = db.collection('users').doc(uid);
        const existing = await userRef.get();
        if (existing.exists) {
            return existing.data();
        }

        const profile = {
            email,
            selectedRegion: 'general',
            selectedState: '',
            selectedDistrict: '',
            preferredLanguage: 'en-US',
            progress: {},
            createdAt: new Date().toISOString(),
        };

        await userRef.set(profile);
        return profile;
    }
}
