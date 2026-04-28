import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = typeof err?.statusCode === 'number' ? err.statusCode : 500;
    const isProduction = process.env.NODE_ENV === 'production';
    const message = statusCode >= 500 && isProduction ? 'Internal Server Error' : err?.message || 'Internal Server Error';

    console.error(`[Error${req.requestId ? ` ${req.requestId}` : ''}] ${req.method} ${req.originalUrl} - ${err?.message || 'Unknown error'}`);

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
