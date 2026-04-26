"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_1 = require("express");
const AuthService_1 = require("../services/AuthService");
const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const data = await AuthService_1.AuthService.register(email, password);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const data = await AuthService_1.AuthService.login(email, password);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map