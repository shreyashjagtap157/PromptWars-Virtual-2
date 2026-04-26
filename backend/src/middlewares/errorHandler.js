"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = require("express");
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map