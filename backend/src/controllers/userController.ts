import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uid = req.user.uid;
        const profile = await UserService.getUserProfile(uid);
        res.json(profile);
    } catch (error) {
        next(error);
    }
};
