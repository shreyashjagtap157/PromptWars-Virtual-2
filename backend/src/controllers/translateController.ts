import { Request, Response, NextFunction } from 'express';
import { TranslateService } from '../services/TranslateService';

export const getTranslation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const text = req.query.text as string;
        const targetLanguage = req.query.targetLanguage as string;
        
        if (!text || !targetLanguage) {
            res.status(400).json({ error: 'Text and targetLanguage are required' });
            return;
        }

        const translatedText = await TranslateService.translateText(text, targetLanguage);
        res.json({ translation: translatedText });
    } catch (error) {
        next(error);
    }
};
