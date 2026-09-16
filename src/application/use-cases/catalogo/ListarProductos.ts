import { RepositorioProductoPort, FiltrosProducto, ProductoConDetalle } from '../../ports/RepositorioProductoPort';

export class ListarProductos {
  constructor(private readonly productoRepo: RepositorioProductoPort) {}

  public async ejecutar(filtros?: FiltrosProducto): Promise<ProductoConDetalle[]> {
    return await this.productoRepo.listar(filtros);
  }
}
