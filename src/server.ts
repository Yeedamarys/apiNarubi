import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './interfaces/http/routes';
import { errorHandler } from './interfaces/http/middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales y Swagger UI
app.use(router);

// Middleware final de manejo centralizado de errores
app.use(errorHandler);

// Arranque del servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 API NARUBI corriendo en http://localhost:${PORT}`);
    console.log(`📚 Documentación Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  });
}

export default app;
