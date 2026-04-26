"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const processRoutes_1 = __importDefault(require("./routes/processRoutes"));
const translateRoutes_1 = __importDefault(require("./routes/translateRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use('/process', processRoutes_1.default);
app.use('/translate', translateRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map