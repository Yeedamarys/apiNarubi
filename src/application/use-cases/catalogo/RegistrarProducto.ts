import { RepositorioProductoPort } from '../../ports/RepositorioProductoPort';
import { Producto, TipoVentaProducto } from '../../../domain/entities/Producto';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface RegistrarProductoInput {
  codigoBarras: string;
  nombre: string;
  descripcion?: string | null;
  categoriaId: number;
  proveedorId: number;
  tipoVenta: TipoVentaProducto;
  unidadesPorPaquete?: number | null;
  precioPaquete?: number | null;
  precioLibra?: number | null;
  precioMayorista?: number | null;
  stockMinimo?: number;
  ivaTarifa?: number;
  bodegaIdInicial?: number;
}

export class RegistrarProducto {
  constructor(private readonly productoRepo: RepositorioProductoPort) {}

  public async ejecutar(input: RegistrarProductoInput): Promise<Producto> {
    const existeCodigo = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras.trim());
    if (existeCodigo) {
      throw new AppError(
        `Ya existe un producto registrado con el código de barras '${input.codigoBarras}'.`,
        400,
        'CODIGO_BARRAS_DUPLICADO'
      );
    }

    const producto = Producto.crear({
      codigoBarras: input.codigoBarras,
      nombre: input.nombre,
      descripcion: input.descripcion,
      categoriaId: input.categoriaId,
      proveedorId: input.proveedorId,
      tipoVenta: input.tipoVenta,
      unidadesPorPaquete: input.unidadesPorPaquete,
      precioPaquete: input.precioPaquete,
      precioLibra: input.precioLibra,
      precioMayorista: input.precioMayorista,
      stockMinimo: input.stockMinimo,
      ivaTarifa: input.ivaTarifa,
    });

    return await this.productoRepo.guardarConStockInicial(producto, input.bodegaIdInicial);
  }
}
