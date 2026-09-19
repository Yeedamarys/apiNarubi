"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StockController_1 = require("../controllers/StockController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const stockRouter = (0, express_1.Router)();
const stockController = new StockController_1.StockController();
stockRouter.use(authMiddleware_1.authMiddleware);
// Rutas de stock
stockRouter.get('/alertas', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR', 'BODEGA']), stockController.listarAlertas.bind(stockController));
stockRouter.get('/', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA']), stockController.listar.bind(stockController));
exports.default = stockRouter;
