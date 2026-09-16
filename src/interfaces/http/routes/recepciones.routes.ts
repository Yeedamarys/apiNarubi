import { Router } from 'express';
import { RecepcionController } from '../controllers/RecepcionController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const recepcionRouter = Router();
const recepcionController = new RecepcionController();

recepcionRouter.use(authMiddleware);

recepcionRouter.get('/', roleMiddleware(['ADMINISTRADOR', 'BODEGA']), recepcionController.listar.bind(recepcionController));
recepcionRouter.post('/', roleMiddleware(['ADMINISTRADOR', 'BODEGA']), recepcionController.registrar.bind(recepcionController));

export default recepcionRouter;
