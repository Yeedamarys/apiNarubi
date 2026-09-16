import { Stock } from '../../domain/entities/Stock';

export interface StockConDetalle {
  id: number;
  productoId: number;
  codigoBarras: string;
  nombreProducto: string;
  tipoVenta: string;
  bodegaId: number;
  nombreBodega: string;
  cantidadDisponible: number;
  unidadMedida: string;
  stockMinimo: number;
  actualizadoEn: Date;
}

export interface AlertaStock {
  productoId: number;
  codigoBarras: string;
  nombreProducto: string;
  tipoVenta: string;
  bodegaId: number;
  nombreBodega: string;
  cantidadDisponible: number;
  unidadMedida: string;
  stockMinimo: number;
}

export interface RepositorioStockPort {
  buscarPorProductoYBodega(productoId: number, bodegaId: number): Promise<Stock | null>;
  guardarOActualizar(stock: Stock): Promise<Stock>;
  listarStockConDetalle(bodegaId?: number): Promise<StockConDetalle[]>;
  listarAlertas(): Promise<AlertaStock[]>;
}
