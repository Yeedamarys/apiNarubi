export type TipoVentaProducto = 'PAQUETE' | 'PESO';

export interface PropsProducto {
  id?: number;
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
  activo?: boolean;
}

export class Producto {
  public readonly id?: number;
  public readonly codigoBarras: string;
  public readonly nombre: string;
  public readonly descripcion?: string | null;
  public readonly categoriaId: number;
  public readonly proveedorId: number;
  public readonly tipoVenta: TipoVentaProducto;
  public readonly unidadesPorPaquete?: number | null;
  public readonly precioPaquete?: number | null;
  public readonly precioLibra?: number | null;
  public readonly precioMayorista?: number | null;
  public readonly stockMinimo: number;
  public readonly ivaTarifa: number;
  public readonly activo: boolean;

  private constructor(props: PropsProducto) {
    this.id = props.id;
    this.codigoBarras = props.codigoBarras;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion ?? null;
    this.categoriaId = props.categoriaId;
    this.proveedorId = props.proveedorId;
    this.tipoVenta = props.tipoVenta;
    this.unidadesPorPaquete = props.unidadesPorPaquete ?? null;
    this.precioPaquete = props.precioPaquete ?? null;
    this.precioLibra = props.precioLibra ?? null;
    this.precioMayorista = props.precioMayorista ?? null;
    this.stockMinimo = props.stockMinimo ?? 0;
    this.ivaTarifa = props.ivaTarifa ?? 15.0;
    this.activo = props.activo ?? true;
  }

  public static crear(props: PropsProducto): Producto {
    if (!props.codigoBarras || props.codigoBarras.trim().length === 0) {
      throw new Error('El código de barras del producto es obligatorio.');
    }

    if (!props.nombre || props.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es obligatorio.');
    }

    if (!props.categoriaId || props.categoriaId <= 0) {
      throw new Error('El ID de la categoría es obligatorio.');
    }

    if (!props.proveedorId || props.proveedorId <= 0) {
      throw new Error('El ID del proveedor es obligatorio.');
    }

    if (props.tipoVenta === 'PAQUETE') {
      if (!props.unidadesPorPaquete || props.unidadesPorPaquete <= 0) {
        throw new Error(
          'Para productos por PAQUETE, las unidades por paquete son obligatorias y deben ser mayores a 0.'
        );
      }
      if (
        props.precioPaquete === undefined ||
        props.precioPaquete === null ||
        props.precioPaquete < 0
      ) {
        throw new Error(
          'Para productos por PAQUETE, el precio por paquete es obligatorio y no puede ser negativo.'
        );
      }
    } else if (props.tipoVenta === 'PESO') {
      if (props.precioLibra === undefined || props.precioLibra === null || props.precioLibra < 0) {
        throw new Error(
          'Para productos por PESO, el precio por libra es obligatorio y no puede ser negativo.'
        );
      }
    } else {
      throw new Error(
        `El tipo de venta '${props.tipoVenta}' no es válido. Debe ser PAQUETE o PESO.`
      );
    }

    return new Producto({
      ...props,
      codigoBarras: props.codigoBarras.trim(),
      nombre: props.nombre.trim(),
      descripcion: props.descripcion ? props.descripcion.trim() : null,
    });
  }
}
