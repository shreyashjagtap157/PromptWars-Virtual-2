import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();
router.get('/profile', verifyToken, getProfile);

export default router;
