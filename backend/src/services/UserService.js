"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const firebase_1 = require("../config/firebase");
class UserService {
    static async getUserProfile(uid) {
        const userDoc = await firebase_1.db.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return userDoc.data();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map