import { Request, Response, NextFunction } from 'express';
import { TranslateService } from '../services/TranslateService';

const MAX_TRANSLATION_INPUT_LENGTH = 5000;

export const handleTranslation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';
        const targetLanguage = typeof req.body.targetLanguage === 'string' ? req.body.targetLanguage.trim() : '';

        if (!text || !targetLanguage) {
            res.status(400).json({ error: 'Text and targetLanguage are required' });
            return;
        }

        if (text.length > MAX_TRANSLATION_INPUT_LENGTH) {
            res.status(413).json({ error: `Text must be ${MAX_TRANSLATION_INPUT_LENGTH} characters or fewer` });
            return;
        }

        const translatedText = await TranslateService.translateText(text, targetLanguage);
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.json({ translation: translatedText });
    } catch (error) {
        next(error);
    }
};
