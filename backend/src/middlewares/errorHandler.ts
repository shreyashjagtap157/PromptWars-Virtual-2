import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = typeof err?.statusCode === 'number' ? err.statusCode : 500;
    const isProduction = process.env.NODE_ENV === 'production';
    const message = statusCode >= 500 && isProduction ? 'Internal Server Error' : err?.message || 'Internal Server Error';

    logger.error(`${req.method} ${req.originalUrl} - ${err?.message || 'Unknown error'}`, {
        requestId: req.requestId,
        statusCode,
        stack: isProduction ? undefined : err?.stack,
    });

    // In express 5, you have to return to avoid unhandled promises issues if not careful, 
    // but sending response terminates it perfectly.
    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
            requestId: req.requestId,
        }
    });
};
