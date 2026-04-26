import { db } from '../config/firebase';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    public static async register(email: string, password?: string) {
        // Mock user creation in terms of JWT, but also creates a Firestore object. 
        // We bypass real Firebase auth password flow since we need to mock login in this environment.
        const uid = `mock-uid-${Date.now()}`;
        
        await db.collection('users').doc(uid).set({
            email,
            selectedRegion: 'general',
            preferredLanguage: 'en',
            progress: {}
        });

        const token = jwt.sign({ uid, email }, process.env.JWT_SECRET || 'mock-secret-for-jwt-signing');
        return { uid, token };
    }

    public static async login(email: string, password?: string) {
        // Find user by email in mock db
        const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
        
        if (snapshot.empty) {
            throw new Error('Invalid credentials');
        }
        
        const userDoc = snapshot.docs[0];
        const uid = userDoc.id;
        
        // Return signed JWT imitating Firebase token
        const token = jwt.sign({ uid, email }, process.env.JWT_SECRET || 'mock-secret-for-jwt-signing');
        return { uid, token };
    }
}
