import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        
        const data = await AuthService.register(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
             res.status(400).json({ error: 'Email and password are required' });
             return;
        }
        
        const data = await AuthService.login(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
