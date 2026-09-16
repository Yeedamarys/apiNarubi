import { RecepcionMercaderia } from '../../domain/entities/RecepcionMercaderia';

export interface RecepcionConDetalle {
  id: number;
  proveedorId: number;
  razonSocialProveedor: string;
  bodegaId: number;
  nombreBodega: string;
  usuarioId: number;
  nombreUsuario: string;
  fecha: Date;
  numeroDocumento?: string | null;
  detalles: Array<{
    id: number;
    productoId: number;
    nombreProducto: string;
    tipoVenta: string;
    cantidadPaquetes?: number | null;
    pesoLibras?: number | null;
    costoUnitario?: number | null;
  }>;
}

export interface RepositorioRecepcionPort {
  guardarTransaccional(recepcion: RecepcionMercaderia): Promise<RecepcionMercaderia>;
  listar(): Promise<RecepcionConDetalle[]>;
  buscarPorId(id: number): Promise<RecepcionConDetalle | null>;
}
