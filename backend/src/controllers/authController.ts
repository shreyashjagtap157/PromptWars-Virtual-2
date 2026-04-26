import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // req.user is set by verifyToken middleware — Firebase Client SDK already created the user
        const uid = req.user!.uid;
        const email = req.user!.email || req.body.email;
        const profile = await AuthService.createProfile(uid, email);
        res.json({ uid, profile });
    } catch (error) {
        next(error);
    }
};
