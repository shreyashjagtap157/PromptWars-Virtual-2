import { Router } from 'express';
import { register } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// POST /auth/register — requires Firebase ID token, creates Firestore profile
router.post('/register', verifyToken, register);

export default router;
