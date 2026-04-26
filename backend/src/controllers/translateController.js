"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslation = void 0;
const express_1 = require("express");
const TranslateService_1 = require("../services/TranslateService");
const getTranslation = async (req, res, next) => {
    try {
        const text = req.query.text;
        const targetLanguage = req.query.targetLanguage;
        if (!text || !targetLanguage) {
            res.status(400).json({ error: 'Text and targetLanguage are required' });
            return;
        }
        const translatedText = await TranslateService_1.TranslateService.translateText(text, targetLanguage);
        res.json({ translation: translatedText });
    }
    catch (error) {
        next(error);
    }
};
exports.getTranslation = getTranslation;
//# sourceMappingURL=translateController.js.map