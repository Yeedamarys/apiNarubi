import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

// Rutas protegidas: requieren autenticación y rol ADMINISTRADOR
usuarioRouter.use(authMiddleware);
usuarioRouter.use(roleMiddleware(['ADMINISTRADOR']));

usuarioRouter.get('/', usuarioController.listar.bind(usuarioController));
usuarioRouter.post('/', usuarioController.crear.bind(usuarioController));
usuarioRouter.get('/:id', usuarioController.obtenerPorId.bind(usuarioController));
usuarioRouter.put('/:id', usuarioController.editar.bind(usuarioController));
usuarioRouter.patch('/:id/estado', usuarioController.cambiarEstado.bind(usuarioController));
usuarioRouter.patch('/:id', usuarioController.editar.bind(usuarioController));
usuarioRouter.delete('/:id', usuarioController.eliminar.bind(usuarioController));

export default usuarioRouter;
