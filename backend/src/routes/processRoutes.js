"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const processController_1 = require("../controllers/processController");
const router = (0, express_1.Router)();
router.get('/', processController_1.getProcess);
exports.default = router;
//# sourceMappingURL=processRoutes.js.map