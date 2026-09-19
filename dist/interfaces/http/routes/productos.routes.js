"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoController_1 = require("../controllers/ProductoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const productoRouter = (0, express_1.Router)();
const productoController = new ProductoController_1.ProductoController();
productoRouter.use(authMiddleware_1.authMiddleware);
// Rutas de consulta: abiertas a todos los roles autenticados
productoRouter.get('/', productoController.listar.bind(productoController));
productoRouter.get('/:id', productoController.obtenerPorId.bind(productoController));
// Rutas de administración: restringidas al rol ADMINISTRADOR
productoRouter.post('/', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), productoController.registrar.bind(productoController));
productoRouter.put('/:id', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), productoController.editar.bind(productoController));
productoRouter.patch('/:id/estado', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), productoController.cambiarEstado.bind(productoController));
exports.default = productoRouter;
