"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./interfaces/http/routes"));
const errorHandler_1 = require("./interfaces/http/middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas principales y Swagger UI
app.use(routes_1.default);
// Middleware final de manejo centralizado de errores
app.use(errorHandler_1.errorHandler);
// Arranque del servidor
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 API NARUBI corriendo en http://localhost:${PORT}`);
        console.log(`📚 Documentación Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
}
exports.default = app;
