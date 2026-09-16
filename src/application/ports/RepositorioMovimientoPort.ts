import { MovimientoInventario } from '../../domain/entities/MovimientoInventario';

export interface MovimientoKardexDetalle {
  id: number;
  productoId: number;
  nombreProducto: string;
  bodegaId: number;
  nombreBodega: string;
  tipoMovimiento: string;
  cantidad: number;
  referenciaId?: number | null;
  referenciaTipo: string;
  motivo?: string | null;
  fecha: Date;
  usuarioId: number;
  nombreUsuario: string;
}

export interface RepositorioMovimientoPort {
  guardar(movimiento: MovimientoInventario): Promise<MovimientoInventario>;
  listarPorProducto(productoId: number, bodegaId?: number): Promise<MovimientoKardexDetalle[]>;
}
