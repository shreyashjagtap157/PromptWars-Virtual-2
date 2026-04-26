"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const translateController_1 = require("../controllers/translateController");
const router = (0, express_1.Router)();
router.get('/', translateController_1.getTranslation);
exports.default = router;
//# sourceMappingURL=translateRoutes.js.map