import { Router } from 'express';
import { InventarioController } from '../controllers/InventarioController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const inventarioRouter = Router();
const inventarioController = new InventarioController();

inventarioRouter.use(authMiddleware);
inventarioRouter.use(roleMiddleware(['ADMINISTRADOR']));

inventarioRouter.post('/ajustes', inventarioController.registrarAjuste.bind(inventarioController));

export default inventarioRouter;
