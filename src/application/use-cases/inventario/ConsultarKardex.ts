import { RepositorioMovimientoPort, MovimientoKardexDetalle } from '../../ports/RepositorioMovimientoPort';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class ConsultarKardex {
  constructor(private readonly movimientoRepo: RepositorioMovimientoPort) {}

  public async ejecutar(productoId: number, bodegaId?: number): Promise<MovimientoKardexDetalle[]> {
    if (!productoId || productoId <= 0) {
      throw new AppError('El ID del producto es inválido.', 400, 'INVALID_PRODUCT_ID');
    }

    return await this.movimientoRepo.listarPorProducto(productoId, bodegaId);
  }
}
