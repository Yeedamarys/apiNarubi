import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config';

const swaggerRouter = Router();

// Servir la interfaz gráfica interactiva de Swagger UI
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir el archivo JSON de la especificación para herramientas externas
swaggerRouter.get('/json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default swaggerRouter;
