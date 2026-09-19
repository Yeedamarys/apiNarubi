"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const usuarioRouter = (0, express_1.Router)();
const usuarioController = new UsuarioController_1.UsuarioController();
// Rutas protegidas: requieren autenticación y rol ADMINISTRADOR
usuarioRouter.use(authMiddleware_1.authMiddleware);
usuarioRouter.use((0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']));
usuarioRouter.get('/', usuarioController.listar.bind(usuarioController));
usuarioRouter.post('/', usuarioController.crear.bind(usuarioController));
usuarioRouter.get('/:id', usuarioController.obtenerPorId.bind(usuarioController));
usuarioRouter.put('/:id', usuarioController.editar.bind(usuarioController));
usuarioRouter.patch('/:id/estado', usuarioController.cambiarEstado.bind(usuarioController));
usuarioRouter.patch('/:id', usuarioController.editar.bind(usuarioController));
usuarioRouter.delete('/:id', usuarioController.eliminar.bind(usuarioController));
exports.default = usuarioRouter;
