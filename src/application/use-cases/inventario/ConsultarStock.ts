import { RepositorioStockPort, StockConDetalle } from '../../ports/RepositorioStockPort';

export class ConsultarStock {
  constructor(private readonly stockRepo: RepositorioStockPort) {}

  public async ejecutar(bodegaId?: number): Promise<StockConDetalle[]> {
    return await this.stockRepo.listarStockConDetalle(bodegaId);
  }
}
