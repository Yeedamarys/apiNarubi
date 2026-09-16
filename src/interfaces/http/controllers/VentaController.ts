import { Response, NextFunction } from 'express';
import { RegistrarVenta } from '../../../application/use-cases/ventas/RegistrarVenta';
import { ListarVentas } from '../../../application/use-cases/ventas/ListarVentas';
import { AnularVenta } from '../../../application/use-cases/ventas/AnularVenta';
import { PrismaVentaRepository } from '../../../infrastructure/persistence/PrismaVentaRepository';
import { PrismaStockRepository } from '../../../infrastructure/persistence/PrismaStockRepository';
import { registrarVentaSchema } from '../dtos/registrarVenta.dto';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { AppError } from '../middlewares/errorHandler';

const ventaRepo = new PrismaVentaRepository();
const stockRepo = new PrismaStockRepository();

const registrarVentaUseCase = new RegistrarVenta(ventaRepo, stockRepo);
const listarVentasUseCase = new ListarVentas(ventaRepo);
const anularVentaUseCase = new AnularVenta(ventaRepo);

export class VentaController {
  public async registrar(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
      }

      const validBody = registrarVentaSchema.parse(req.body);

      const nuevaVenta = await registrarVentaUseCase.ejecutar({
        clienteId: validBody.clienteId,
        usuarioId: req.usuario.sub,
        bodegaId: validBody.bodegaId,
        modalidadVenta: validBody.modalidadVenta,
        detalles: validBody.detalles,
      });

      res.status(201).json({
        mensaje: 'Venta registrada exitosamente, stock actualizado y comprobante electrónico SRI generado.',
        venta: nuevaVenta,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const ventas = await listarVentasUseCase.ejecutar();
      res.status(200).json(ventas);
    } catch (error) {
      next(error);
    }
  }

  public async obtenerPorId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const venta = await ventaRepo.buscarPorId(id);

      if (!venta) {
        throw new AppError(`No se encontró la venta con ID ${id}.`, 404, 'NOT_FOUND');
      }

      res.status(200).json(venta);
    } catch (error) {
      next(error);
    }
  }

  public async anular(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await anularVentaUseCase.ejecutar(id);

      res.status(200).json({
        mensaje: `Venta con ID ${id} anulada exitosamente y stock devuelto a PostgreSQL.`,
      });
    } catch (error) {
      next(error);
    }
  }
}
