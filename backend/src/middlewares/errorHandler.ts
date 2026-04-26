import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.message}`);
    const statusCode = err.statusCode || 500;
    
    // In express 5, you have to return to avoid unhandled promises issues if not careful, 
    // but sending response terminates it perfectly.
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
        }
    });
};
