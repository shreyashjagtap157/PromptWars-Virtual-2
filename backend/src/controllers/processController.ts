import { Request, Response, NextFunction } from 'express';
import { ProcessService } from '../services/ProcessService';

export const getProcess = (req: Request, res: Response, next: NextFunction) => {
    try {
        const region = req.query.region as string | undefined;
        const processData = ProcessService.getProcessForRegion(region);
        res.json(processData);
    } catch (error) {
        next(error);
    }
};
