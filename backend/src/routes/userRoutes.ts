import { Router } from 'express';
import { getProfile, saveProgress, savePreferences } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';
import { createRateLimiter } from '../middlewares/rateLimiter';
import { validatePreferencesBody, validateProgressBody } from '../middlewares/validation';

const router = Router();

const userReadLimiter = createRateLimiter({
    keyPrefix: 'user-read',
    windowMs: 60 * 1000,
    max: 60,
    message: 'Too many profile lookups. Please try again shortly.',
});

const userWriteLimiter = createRateLimiter({
    keyPrefix: 'user-write',
    windowMs: 60 * 1000,
    max: 120,
    message: 'Too many profile updates. Please wait a moment.',
});

router.get('/profile', verifyToken, userReadLimiter, getProfile);
router.put('/progress', verifyToken, validateProgressBody, userWriteLimiter, saveProgress);
router.put('/preferences', verifyToken, validatePreferencesBody, userWriteLimiter, savePreferences);

export default router;
