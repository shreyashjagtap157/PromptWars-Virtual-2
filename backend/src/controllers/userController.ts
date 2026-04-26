import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const uid = req.user!.uid;
        const profile = await UserService.getUserProfile(uid);
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

export const saveProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const uid = req.user!.uid;
        const { progress } = req.body;
        if (!progress || typeof progress !== 'object') {
            res.status(400).json({ error: 'Progress object is required' });
            return;
        }
        const result = await UserService.saveProgress(uid, progress);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const savePreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const uid = req.user!.uid;
        const { selectedRegion, selectedState, selectedDistrict, preferredLanguage } = req.body;
        const result = await UserService.savePreferences(uid, {
            selectedRegion, selectedState, selectedDistrict, preferredLanguage,
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
};
