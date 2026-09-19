import { Request, Response, NextFunction } from 'express';
import { ConsultarKardex } from '../../../application/use-cases/inventario/ConsultarKardex';
import { PrismaMovimientoRepository } from '../../../infrastructure/persistence/PrismaMovimientoRepository';

const movimientoRepo = new PrismaMovimientoRepository();
const consultarKardexUseCase = new ConsultarKardex(movimientoRepo);

export class KardexController {
  public async consultarPorProducto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productoId = parseInt(req.params.productoId, 10);
      const bodegaIdQuery = req.query.bodegaId
        ? parseInt(req.query.bodegaId as string, 10)
        : undefined;

      const movimientos = await consultarKardexUseCase.ejecutar(productoId, bodegaIdQuery);

      res.status(200).json(movimientos);
    } catch (error) {
      next(error);
    }
  }
}
