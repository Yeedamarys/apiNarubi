import { Router } from 'express';
import { ProveedorController } from '../controllers/ProveedorController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const proveedorRouter = Router();
const proveedorController = new ProveedorController();

proveedorRouter.use(authMiddleware);

proveedorRouter.get('/', proveedorController.listar.bind(proveedorController));
proveedorRouter.post('/', roleMiddleware(['ADMINISTRADOR']), proveedorController.registrar.bind(proveedorController));

export default proveedorRouter;
