import { Router } from 'express';
import swaggerRouter from '../docs/swagger.routes';
import authRouter from './auth.routes';
import usuarioRouter from './usuarios.routes';

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

// Rutas de la API por módulo
router.use('/api/auth', authRouter);
router.use('/api/usuarios', usuarioRouter);

// Nota: Las siguientes rutas se irán conectando secuencialmente conforme se implementen sus módulos
// router.use('/api/productos', productoRoutes);
// router.use('/api/stock', stockRoutes);
// router.use('/api/recepciones', recepcionRoutes);
// router.use('/api/ventas', ventaRoutes);
// router.use('/api/kardex', kardexRoutes);

export default router;
