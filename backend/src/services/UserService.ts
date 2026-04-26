import { db } from '../config/firebase';

export class UserService {
    public static async getUserProfile(uid: string) {
        const userDoc = await db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return userDoc.data();
    }
}
