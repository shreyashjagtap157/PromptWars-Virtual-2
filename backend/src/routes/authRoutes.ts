import { Router } from 'express';
import { register } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';
import { createRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

const registerLimiter = createRateLimiter({
    keyPrefix: 'auth-register',
    windowMs: 60 * 1000,
    max: 10,
    message: 'Too many registration attempts. Please try again shortly.',
});

// POST /auth/register — requires Firebase ID token, creates Firestore profile
router.post('/register', verifyToken, registerLimiter, register);

export default router;
