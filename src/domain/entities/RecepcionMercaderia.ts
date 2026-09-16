export interface DetalleRecepcionInput {
  productoId: number;
  cantidadPaquetes?: number | null;
  pesoLibras?: number | null;
  costoUnitario?: number | null;
}

export interface PropsRecepcionMercaderia {
  id?: number;
  proveedorId: number;
  usuarioId: number;
  bodegaId: number;
  fecha?: Date;
  numeroDocumento?: string | null;
  detalles: DetalleRecepcionInput[];
}

export class RecepcionMercaderia {
  public readonly id?: number;
  public readonly proveedorId: number;
  public readonly usuarioId: number;
  public readonly bodegaId: number;
  public readonly fecha: Date;
  public readonly numeroDocumento?: string | null;
  public readonly detalles: DetalleRecepcionInput[];

  private constructor(props: PropsRecepcionMercaderia) {
    this.id = props.id;
    this.proveedorId = props.proveedorId;
    this.usuarioId = props.usuarioId;
    this.bodegaId = props.bodegaId;
    this.fecha = props.fecha ?? new Date();
    this.numeroDocumento = props.numeroDocumento ?? null;
    this.detalles = props.detalles;
  }

  public static crear(props: PropsRecepcionMercaderia): RecepcionMercaderia {
    if (!props.proveedorId || props.proveedorId <= 0) {
      throw new Error('El ID del proveedor es obligatorio.');
    }

    if (!props.bodegaId || props.bodegaId <= 0) {
      throw new Error('El ID de la bodega es obligatorio.');
    }

    if (!props.detalles || props.detalles.length === 0) {
      throw new Error('La recepción debe contener al menos un detalle de producto.');
    }

    for (const d of props.detalles) {
      if (!d.productoId || d.productoId <= 0) {
        throw new Error('Cada detalle de recepción debe tener un ID de producto válido.');
      }
      const tieneCantidad = (d.cantidadPaquetes && d.cantidadPaquetes > 0) || (d.pesoLibras && d.pesoLibras > 0);
      if (!tieneCantidad) {
        throw new Error('Cada detalle debe especificar cantidad en paquetes (>0) o peso en libras (>0).');
      }
    }

    return new RecepcionMercaderia(props);
  }
}
