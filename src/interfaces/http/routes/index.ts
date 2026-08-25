import { Router } from 'express';
import swaggerRouter from '../docs/swagger.routes';

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

// Nota: Las siguientes rutas se irán conectando secuencialmente conforme se implementen sus casos de uso
// router.use('/api/auth', authRoutes);
// router.use('/api/usuarios', usuarioRoutes);
// router.use('/api/productos', productoRoutes);
// router.use('/api/stock', stockRoutes);
// router.use('/api/recepciones', recepcionRoutes);
// router.use('/api/ventas', ventaRoutes);
// router.use('/api/kardex', kardexRoutes);

export default router;
