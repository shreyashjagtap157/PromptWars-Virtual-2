import { Router } from 'express';
import { handleTranslation } from '../controllers/translateController';
import { createRateLimiter } from '../middlewares/rateLimiter';
import { validateTranslationQuery } from '../middlewares/validation';

const router = Router();

const translationLimiter = createRateLimiter({
    keyPrefix: 'translate',
    windowMs: 60 * 1000,
    max: 60,
    message: 'Too many translation requests. Please try again shortly.',
});

router.post('/', validateTranslationQuery, translationLimiter, handleTranslation);

export default router;
