import { Router } from 'express';
import { getProfile, saveProgress, savePreferences } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/profile', verifyToken, getProfile);
router.put('/progress', verifyToken, saveProgress);
router.put('/preferences', verifyToken, savePreferences);

export default router;
