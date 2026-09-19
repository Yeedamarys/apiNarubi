import { Request, Response, NextFunction } from 'express';
import { ConsultarStock } from '../../../application/use-cases/inventario/ConsultarStock';
import { ConsultarAlertasStock } from '../../../application/use-cases/inventario/ConsultarAlertasStock';
import { PrismaStockRepository } from '../../../infrastructure/persistence/PrismaStockRepository';

const stockRepo = new PrismaStockRepository();

const consultarStockUseCase = new ConsultarStock(stockRepo);
const consultarAlertasStockUseCase = new ConsultarAlertasStock(stockRepo);

export class StockController {
  public async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bodegaIdQuery = req.query.bodegaId
        ? parseInt(req.query.bodegaId as string, 10)
        : undefined;
      const stock = await consultarStockUseCase.ejecutar(bodegaIdQuery);

      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  }

  public async listarAlertas(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alertas = await consultarAlertasStockUseCase.ejecutar();

      res.status(200).json(alertas);
    } catch (error) {
      next(error);
    }
  }
}
