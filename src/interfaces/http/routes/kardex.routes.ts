import { Router } from 'express';
import { KardexController } from '../controllers/KardexController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const kardexRouter = Router();
const kardexController = new KardexController();

kardexRouter.use(authMiddleware);
kardexRouter.use(roleMiddleware(['ADMINISTRADOR', 'BODEGA']));

kardexRouter.get('/:productoId', kardexController.consultarPorProducto.bind(kardexController));

export default kardexRouter;
