import { Response, NextFunction } from 'express';
import { RegistrarAjusteInventario } from '../../../application/use-cases/inventario/RegistrarAjusteInventario';
import { PrismaStockRepository } from '../../../infrastructure/persistence/PrismaStockRepository';
import { PrismaMovimientoRepository } from '../../../infrastructure/persistence/PrismaMovimientoRepository';
import { registrarAjusteSchema } from '../dtos/ajusteInventario.dto';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { AppError } from '../middlewares/errorHandler';

const stockRepo = new PrismaStockRepository();
const movimientoRepo = new PrismaMovimientoRepository();

const registrarAjusteUseCase = new RegistrarAjusteInventario(stockRepo, movimientoRepo);

export class InventarioController {
  public async registrarAjuste(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.usuario) {
        throw new AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
      }

      const validBody = registrarAjusteSchema.parse(req.body);

      const resultado = await registrarAjusteUseCase.ejecutar({
        productoId: validBody.productoId,
        bodegaId: validBody.bodegaId,
        cantidad: validBody.cantidad,
        motivo: validBody.motivo,
        usuarioId: req.usuario.sub,
      });

      res.status(201).json({
        mensaje: 'Ajuste manual de inventario registrado exitosamente.',
        stockActualizado: {
          productoId: resultado.stockActualizado.productoId,
          bodegaId: resultado.stockActualizado.bodegaId,
          cantidadDisponible: resultado.stockActualizado.cantidadDisponible,
          actualizadoEn: resultado.stockActualizado.actualizadoEn,
        },
        movimientoKardex: {
          id: resultado.movimiento.id,
          tipoMovimiento: resultado.movimiento.tipoMovimiento,
          cantidad: resultado.movimiento.cantidad,
          referenciaTipo: resultado.movimiento.referenciaTipo,
          motivo: resultado.movimiento.motivo,
          fecha: resultado.movimiento.fecha,
          usuarioId: resultado.movimiento.usuarioId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
