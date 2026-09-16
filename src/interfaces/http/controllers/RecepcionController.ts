import { Response, NextFunction } from 'express';
import { RegistrarRecepcion } from '../../../application/use-cases/recepcion/RegistrarRecepcion';
import { ListarRecepciones } from '../../../application/use-cases/recepcion/ListarRecepciones';
import { PrismaRecepcionRepository } from '../../../infrastructure/persistence/PrismaRecepcionRepository';
import { registrarRecepcionSchema } from '../dtos/registrarRecepcion.dto';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { AppError } from '../middlewares/errorHandler';

const recepcionRepo = new PrismaRecepcionRepository();

const registrarRecepcionUseCase = new RegistrarRecepcion(recepcionRepo);
const listarRecepcionesUseCase = new ListarRecepciones(recepcionRepo);

export class RecepcionController {
  public async registrar(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
      }

      const validBody = registrarRecepcionSchema.parse(req.body);

      const nuevaRecepcion = await registrarRecepcionUseCase.ejecutar({
        proveedorId: validBody.proveedorId,
        usuarioId: req.usuario.sub,
        bodegaId: validBody.bodegaId,
        numeroDocumento: validBody.numeroDocumento,
        detalles: validBody.detalles,
      });

      res.status(201).json({
        mensaje: 'Recepción de mercadería registrada exitosamente y stock incrementado en PostgreSQL.',
        recepcion: nuevaRecepcion,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const recepciones = await listarRecepcionesUseCase.ejecutar();
      res.status(200).json(recepciones);
    } catch (error) {
      next(error);
    }
  }
}
