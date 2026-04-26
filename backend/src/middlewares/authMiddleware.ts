import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; email?: string };
    }
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = { uid: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    return;
  }
};

// Optional auth — sets req.user if token present, but doesn't block
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = { uid: decodedToken.uid, email: decodedToken.email };
  } catch {
    // Token invalid — proceed as guest
  }
  next();
};
