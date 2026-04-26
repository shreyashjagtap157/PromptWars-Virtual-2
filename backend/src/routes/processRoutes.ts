import { Router } from 'express';
import { getProcess } from '../controllers/processController';

const router = Router();
router.get('/', getProcess);

export default router;
