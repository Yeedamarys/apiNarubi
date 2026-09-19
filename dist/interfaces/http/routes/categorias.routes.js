"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_1 = require("../controllers/CategoriaController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const categoriaRouter = (0, express_1.Router)();
const categoriaController = new CategoriaController_1.CategoriaController();
// Todas las rutas requieren autenticación
categoriaRouter.use(authMiddleware_1.authMiddleware);
// Rutas de lectura: abiertas a todos los roles autenticados
categoriaRouter.get('/', categoriaController.listar.bind(categoriaController));
categoriaRouter.get('/:id', categoriaController.obtenerPorId.bind(categoriaController));
// Rutas de modificación: restringidas al rol ADMINISTRADOR
categoriaRouter.post('/', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), categoriaController.crear.bind(categoriaController));
categoriaRouter.put('/:id', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), categoriaController.editar.bind(categoriaController));
categoriaRouter.delete('/:id', (0, roleMiddleware_1.roleMiddleware)(['ADMINISTRADOR']), categoriaController.eliminar.bind(categoriaController));
exports.default = categoriaRouter;
