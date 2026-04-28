import { db } from '../config/firebase';
import { createDefaultProfile, isAlreadyExistsError, mergeProfileDefaults } from './profileHelpers';

export class AuthService {
    // Called after Firebase Client SDK creates the user — this creates the Firestore profile
    public static async createProfile(uid: string, email: string) {
        const userRef = db.collection('users').doc(uid);
        const profile = createDefaultProfile(email);

        try {
            await userRef.create(profile);
            return profile;
        } catch (error) {
            if (!isAlreadyExistsError(error)) {
                throw error;
            }

            const existing = await userRef.get();
            return mergeProfileDefaults(existing.data());
        }
    }
}
