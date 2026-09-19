import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.use(authMiddleware);

// Rutas de consulta: abiertas a todos los roles autenticados
productoRouter.get('/', productoController.listar.bind(productoController));
productoRouter.get('/:id', productoController.obtenerPorId.bind(productoController));

// Rutas de administración: restringidas al rol ADMINISTRADOR
productoRouter.post(
  '/',
  roleMiddleware(['ADMINISTRADOR']),
  productoController.registrar.bind(productoController)
);
productoRouter.put(
  '/:id',
  roleMiddleware(['ADMINISTRADOR']),
  productoController.editar.bind(productoController)
);
productoRouter.patch(
  '/:id/estado',
  roleMiddleware(['ADMINISTRADOR']),
  productoController.cambiarEstado.bind(productoController)
);

export default productoRouter;
