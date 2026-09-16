export interface PropsStock {
  id?: number;
  productoId: number;
  bodegaId: number;
  cantidadDisponible: number;
  actualizadoEn?: Date;
}

export class Stock {
  public readonly id?: number;
  public readonly productoId: number;
  public readonly bodegaId: number;
  public readonly cantidadDisponible: number;
  public readonly actualizadoEn: Date;

  private constructor(props: PropsStock) {
    this.id = props.id;
    this.productoId = props.productoId;
    this.bodegaId = props.bodegaId;
    this.cantidadDisponible = props.cantidadDisponible;
    this.actualizadoEn = props.actualizadoEn ?? new Date();
  }

  public static crear(props: PropsStock): Stock {
    if (!props.productoId || props.productoId <= 0) {
      throw new Error('El ID del producto es obligatorio.');
    }

    if (!props.bodegaId || props.bodegaId <= 0) {
      throw new Error('El ID de la bodega es obligatorio.');
    }

    if (props.cantidadDisponible < 0) {
      throw new Error('La cantidad disponible de stock no puede ser negativa.');
    }

    return new Stock({
      ...props,
      cantidadDisponible: Number(props.cantidadDisponible.toFixed(3)),
    });
  }
}
