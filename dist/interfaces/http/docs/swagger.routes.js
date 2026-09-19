"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./swagger.config");
const swaggerRouter = (0, express_1.Router)();
// Servir la interfaz gráfica interactiva de Swagger UI
swaggerRouter.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec));
// Servir el archivo JSON de la especificación para herramientas externas
swaggerRouter.get('/json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_config_1.swaggerSpec);
});
exports.default = swaggerRouter;
