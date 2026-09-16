import { Producto } from '../../domain/entities/Producto';

export interface FiltrosProducto {
  categoriaId?: number;
  proveedorId?: number;
  tipoVenta?: string;
  activo?: boolean;
}

export interface ProductoConDetalle {
  id: number;
  codigoBarras: string;
  nombre: string;
  descripcion?: string | null;
  categoriaId: number;
  nombreCategoria: string;
  proveedorId: number;
  razonSocialProveedor: string;
  tipoVenta: string;
  unidadesPorPaquete?: number | null;
  precioPaquete?: number | null;
  precioLibra?: number | null;
  precioMayorista?: number | null;
  stockMinimo: number;
  ivaTarifa: number;
  activo: boolean;
}

export interface RepositorioProductoPort {
  buscarPorId(id: number): Promise<Producto | null>;
  buscarPorCodigoBarras(codigoBarras: string): Promise<Producto | null>;
  guardarConStockInicial(producto: Producto, bodegaId?: number): Promise<Producto>;
  listar(filtros?: FiltrosProducto): Promise<ProductoConDetalle[]>;
  actualizar(id: number, datos: Partial<Producto>): Promise<Producto>;
  cambiarEstado(id: number, activo: boolean): Promise<void>;
}
