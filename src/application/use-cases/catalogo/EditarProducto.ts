import { RepositorioProductoPort } from '../../ports/RepositorioProductoPort';
import { Producto, TipoVentaProducto } from '../../../domain/entities/Producto';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface EditarProductoInput {
  codigoBarras?: string;
  nombre?: string;
  descripcion?: string | null;
  categoriaId?: number;
  proveedorId?: number;
  tipoVenta?: TipoVentaProducto;
  unidadesPorPaquete?: number | null;
  precioPaquete?: number | null;
  precioLibra?: number | null;
  precioMayorista?: number | null;
  stockMinimo?: number;
  ivaTarifa?: number;
  activo?: boolean;
}

export class EditarProducto {
  constructor(private readonly productoRepo: RepositorioProductoPort) {}

  public async ejecutar(id: number, input: EditarProductoInput): Promise<Producto> {
    const productoExistente = await this.productoRepo.buscarPorId(id);
    if (!productoExistente) {
      throw new AppError(`No se encontró ningún producto con el ID ${id}.`, 404, 'NOT_FOUND');
    }

    if (input.codigoBarras && input.codigoBarras.trim() !== productoExistente.codigoBarras) {
      const duplicado = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras.trim());
      if (duplicado && duplicado.id !== id) {
        throw new AppError(
          `El código de barras '${input.codigoBarras}' ya pertenece a otro producto.`,
          400,
          'CODIGO_BARRAS_DUPLICADO'
        );
      }
    }

    const datosActualizacion: Partial<Producto> = {
      ...(input.codigoBarras && { codigoBarras: input.codigoBarras.trim() }),
      ...(input.nombre && { nombre: input.nombre.trim() }),
      ...(input.descripcion !== undefined && {
        descripcion: input.descripcion ? input.descripcion.trim() : null,
      }),
      ...(input.categoriaId && { categoriaId: input.categoriaId }),
      ...(input.proveedorId && { proveedorId: input.proveedorId }),
      ...(input.tipoVenta && { tipoVenta: input.tipoVenta }),
      ...(input.unidadesPorPaquete !== undefined && {
        unidadesPorPaquete: input.unidadesPorPaquete,
      }),
      ...(input.precioPaquete !== undefined && { precioPaquete: input.precioPaquete }),
      ...(input.precioLibra !== undefined && { precioLibra: input.precioLibra }),
      ...(input.precioMayorista !== undefined && { precioMayorista: input.precioMayorista }),
      ...(input.stockMinimo !== undefined && { stockMinimo: input.stockMinimo }),
      ...(input.ivaTarifa !== undefined && { ivaTarifa: input.ivaTarifa }),
      ...(input.activo !== undefined && { activo: input.activo }),
    };

    return await this.productoRepo.actualizar(id, datosActualizacion);
  }
}
