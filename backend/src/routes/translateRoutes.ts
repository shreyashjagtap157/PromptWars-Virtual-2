import { Router } from 'express';
import { getTranslation } from '../controllers/translateController';

const router = Router();
router.get('/', getTranslation);

export default router;
