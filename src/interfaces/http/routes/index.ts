import { Router } from 'express';
import swaggerRouter from '../docs/swagger.routes';
import authRouter from './auth.routes';
import usuarioRouter from './usuarios.routes';
import categoriaRouter from './categorias.routes';
import proveedorRouter from './proveedores.routes';
import productoRouter from './productos.routes';
import stockRouter from './stock.routes';
import kardexRouter from './kardex.routes';
import inventarioRouter from './inventario.routes';
import recepcionRouter from './recepciones.routes';
import ventaRouter from './ventas.routes';

const router = Router();

// Endpoint de Healthcheck
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'API NARUBI POS & Inventario',
  });
});

// Documentación de la API (Swagger UI)
router.use('/api-docs', swaggerRouter);

// Rutas completas de la API por módulo
router.use('/api/auth', authRouter);
router.use('/api/usuarios', usuarioRouter);
router.use('/api/categorias', categoriaRouter);
router.use('/api/proveedores', proveedorRouter);
router.use('/api/productos', productoRouter);
router.use('/api/stock', stockRouter);
router.use('/api/kardex', kardexRouter);
router.use('/api/inventario', inventarioRouter);
router.use('/api/recepciones', recepcionRouter);
router.use('/api/ventas', ventaRouter);

export default router;
