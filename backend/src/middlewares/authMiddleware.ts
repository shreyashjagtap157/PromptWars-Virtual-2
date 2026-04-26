import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    // In a real production Firebase app:
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // For this mock local setup fulfilling the POST /auth/login request:
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-for-jwt-signing');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};
