export type TipoMovimiento = 'ENTRADA' | 'SALIDA' | 'AJUSTE';
export type ReferenciaMovimiento = 'VENTA' | 'RECEPCION' | 'AJUSTE_MANUAL';

export interface PropsMovimientoInventario {
  id?: number;
  productoId: number;
  bodegaId: number;
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
  referenciaId?: number | null;
  referenciaTipo: ReferenciaMovimiento;
  motivo?: string | null;
  fecha?: Date;
  usuarioId: number;
}

export class MovimientoInventario {
  public readonly id?: number;
  public readonly productoId: number;
  public readonly bodegaId: number;
  public readonly tipoMovimiento: TipoMovimiento;
  public readonly cantidad: number;
  public readonly referenciaId?: number | null;
  public readonly referenciaTipo: ReferenciaMovimiento;
  public readonly motivo?: string | null;
  public readonly fecha: Date;
  public readonly usuarioId: number;

  private constructor(props: PropsMovimientoInventario) {
    this.id = props.id;
    this.productoId = props.productoId;
    this.bodegaId = props.bodegaId;
    this.tipoMovimiento = props.tipoMovimiento;
    this.cantidad = props.cantidad;
    this.referenciaId = props.referenciaId ?? null;
    this.referenciaTipo = props.referenciaTipo;
    this.motivo = props.motivo ?? null;
    this.fecha = props.fecha ?? new Date();
    this.usuarioId = props.usuarioId;
  }

  public static crear(props: PropsMovimientoInventario): MovimientoInventario {
    if (!props.productoId || props.productoId <= 0) {
      throw new Error('El ID del producto es obligatorio.');
    }

    if (!props.bodegaId || props.bodegaId <= 0) {
      throw new Error('El ID de la bodega es obligatorio.');
    }

    if (!props.usuarioId || props.usuarioId <= 0) {
      throw new Error('El ID del usuario responsable es obligatorio.');
    }

    if (props.cantidad === 0) {
      throw new Error('La cantidad del movimiento no puede ser cero.');
    }

    return new MovimientoInventario({
      ...props,
      cantidad: Number(props.cantidad.toFixed(3)),
    });
  }
}
