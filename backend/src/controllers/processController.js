"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcess = void 0;
const express_1 = require("express");
const ProcessService_1 = require("../services/ProcessService");
const getProcess = (req, res, next) => {
    try {
        const region = req.query.region;
        const processData = ProcessService_1.ProcessService.getProcessForRegion(region);
        res.json(processData);
    }
    catch (error) {
        next(error);
    }
};
exports.getProcess = getProcess;
//# sourceMappingURL=processController.js.map