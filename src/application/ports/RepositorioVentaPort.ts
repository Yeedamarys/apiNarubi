import { Venta } from '../../domain/entities/Venta';

export interface VentaConDetalle {
  id: number;
  numeroSecuencial: string;
  clienteId?: number | null;
  nombreCliente?: string | null;
  usuarioId: number;
  nombreUsuario: string;
  bodegaId: number;
  nombreBodega: string;
  fecha: Date;
  modalidadVenta: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  claveAccesoSri?: string | null;
  estadoComprobante?: string | null;
  detalles: Array<{
    id: number;
    productoId: number;
    nombreProducto: string;
    tipoVenta: string;
    cantidadPaquetes?: number | null;
    pesoLibras?: number | null;
    precioAplicado: number;
    subtotal: number;
  }>;
}

export interface RepositorioVentaPort {
  guardarTransaccional(venta: Venta): Promise<VentaConDetalle>;
  anularTransaccional(id: number): Promise<void>;
  listar(): Promise<VentaConDetalle[]>;
  buscarPorId(id: number): Promise<VentaConDetalle | null>;
}
