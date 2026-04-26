"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const express_1 = require("express");
const UserService_1 = require("../services/UserService");
const getProfile = async (req, res, next) => {
    try {
        const uid = req.user.uid;
        const profile = await UserService_1.UserService.getUserProfile(uid);
        res.json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=userController.js.map