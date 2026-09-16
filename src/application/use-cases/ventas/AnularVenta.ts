import { RepositorioVentaPort } from '../../ports/RepositorioVentaPort';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class AnularVenta {
  constructor(private readonly ventaRepo: RepositorioVentaPort) {}

  public async ejecutar(id: number): Promise<void> {
    const venta = await this.ventaRepo.buscarPorId(id);
    if (!venta) {
      throw new AppError(`No se encontró la venta con ID ${id}.`, 404, 'NOT_FOUND');
    }

    if (venta.estado === 'ANULADA') {
      throw new AppError(`La venta ID ${id} ya se encuentra anulada.`, 400, 'VENTA_YA_ANULADA');
    }

    await this.ventaRepo.anularTransaccional(id);
  }
}
