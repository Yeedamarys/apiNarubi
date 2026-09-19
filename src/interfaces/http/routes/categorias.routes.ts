import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const categoriaRouter = Router();
const categoriaController = new CategoriaController();

// Todas las rutas requieren autenticación
categoriaRouter.use(authMiddleware);

// Rutas de lectura: abiertas a todos los roles autenticados
categoriaRouter.get('/', categoriaController.listar.bind(categoriaController));
categoriaRouter.get('/:id', categoriaController.obtenerPorId.bind(categoriaController));

// Rutas de modificación: restringidas al rol ADMINISTRADOR
categoriaRouter.post(
  '/',
  roleMiddleware(['ADMINISTRADOR']),
  categoriaController.crear.bind(categoriaController)
);
categoriaRouter.put(
  '/:id',
  roleMiddleware(['ADMINISTRADOR']),
  categoriaController.editar.bind(categoriaController)
);
categoriaRouter.delete(
  '/:id',
  roleMiddleware(['ADMINISTRADOR']),
  categoriaController.eliminar.bind(categoriaController)
);

export default categoriaRouter;
