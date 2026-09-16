import { Router } from 'express';
import { VentaController } from '../controllers/VentaController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const ventaRouter = Router();
const ventaController = new VentaController();

ventaRouter.use(authMiddleware);

// Rutas de punto de venta (POS)
ventaRouter.get('/', roleMiddleware(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.listar.bind(ventaController));
ventaRouter.get('/:id', roleMiddleware(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.obtenerPorId.bind(ventaController));
ventaRouter.post('/', roleMiddleware(['ADMINISTRADOR', 'PUNTO_VENTA']), ventaController.registrar.bind(ventaController));
ventaRouter.patch('/:id/anular', roleMiddleware(['ADMINISTRADOR']), ventaController.anular.bind(ventaController));

export default ventaRouter;
