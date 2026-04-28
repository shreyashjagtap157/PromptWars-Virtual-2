import { Router } from 'express';
import { getProcess } from '../controllers/processController';
import { createRateLimiter } from '../middlewares/rateLimiter';
import { validateProcessQuery } from '../middlewares/validation';

const router = Router();

const processLimiter = createRateLimiter({
    keyPrefix: 'process',
    windowMs: 60 * 1000,
    max: 120,
    message: 'Too many process requests. Please try again shortly.',
});

router.get('/', validateProcessQuery, processLimiter, getProcess);

export default router;
