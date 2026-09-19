"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentaController_1 = require("../controllers/VentaController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const ventaRouter = (0, express_1.Router)();
const ventaController = new VentaController_1.VentaController();
ventaRouter.use(authMiddleware_1.authMiddleware);
// Rutas de punto de venta (POS)
ventaRouter.get('/', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.listar.bind(ventaController));
ventaRouter.get('/:id', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.obtenerPorId.bind(ventaController));
ventaRouter.post('/', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.registrar.bind(ventaController));
ventaRouter.patch('/:id/anular', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), ventaController.anular.bind(ventaController));
exports.default = ventaRouter;
