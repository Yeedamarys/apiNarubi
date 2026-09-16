import { RepositorioStockPort, AlertaStock } from '../../ports/RepositorioStockPort';

export class ConsultarAlertasStock {
  constructor(private readonly stockRepo: RepositorioStockPort) {}

  public async ejecutar(): Promise<AlertaStock[]> {
    return await this.stockRepo.listarAlertas();
  }
}
