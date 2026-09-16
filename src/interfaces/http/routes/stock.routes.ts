import { Router } from 'express';
import { StockController } from '../controllers/StockController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.use(authMiddleware);

// Rutas de stock
stockRouter.get('/alertas', roleMiddleware(['ADMINISTRADOR', 'BODEGA']), stockController.listarAlertas.bind(stockController));
stockRouter.get('/', roleMiddleware(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA']), stockController.listar.bind(stockController));

export default stockRouter;
