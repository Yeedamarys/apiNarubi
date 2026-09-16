import { RepositorioVentaPort, VentaConDetalle } from '../../ports/RepositorioVentaPort';

export class ListarVentas {
  constructor(private readonly ventaRepo: RepositorioVentaPort) {}

  public async ejecutar(): Promise<VentaConDetalle[]> {
    return await this.ventaRepo.listar();
  }
}
