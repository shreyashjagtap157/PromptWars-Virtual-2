"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const firebase_1 = require("../config/firebase");
const jwt = __importStar(require("jsonwebtoken"));
class AuthService {
    static async register(email, password) {
        // Mock user creation in terms of JWT, but also creates a Firestore object. 
        // We bypass real Firebase auth password flow since we need to mock login in this environment.
        const uid = `mock-uid-${Date.now()}`;
        await firebase_1.db.collection('users').doc(uid).set({
            email,
            selectedRegion: 'general',
            preferredLanguage: 'en',
            progress: {}
        });
        const token = jwt.sign({ uid, email }, process.env.JWT_SECRET || 'mock-secret-for-jwt-signing');
        return { uid, token };
    }
    static async login(email, password) {
        // Find user by email in mock db
        const snapshot = await firebase_1.db.collection('users').where('email', '==', email).limit(1).get();
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
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map