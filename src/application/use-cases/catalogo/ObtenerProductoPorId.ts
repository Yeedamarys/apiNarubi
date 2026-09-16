import { RepositorioProductoPort } from '../../ports/RepositorioProductoPort';
import { Producto } from '../../../domain/entities/Producto';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class ObtenerProductoPorId {
  constructor(private readonly productoRepo: RepositorioProductoPort) {}

  public async ejecutar(id: number): Promise<Producto> {
    const producto = await this.productoRepo.buscarPorId(id);
    if (!producto) {
      throw new AppError(`No se encontró ningún producto con el ID ${id}.`, 404, 'NOT_FOUND');
    }
    return producto;
  }
}
