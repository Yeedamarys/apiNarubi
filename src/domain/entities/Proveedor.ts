export interface PropsProveedor {
  id?: number;
  razonSocial: string;
  ruc: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
}

export class Proveedor {
  public readonly id?: number;
  public readonly razonSocial: string;
  public readonly ruc: string;
  public readonly telefono?: string | null;
  public readonly email?: string | null;
  public readonly direccion?: string | null;

  private constructor(props: PropsProveedor) {
    this.id = props.id;
    this.razonSocial = props.razonSocial;
    this.ruc = props.ruc;
    this.telefono = props.telefono ?? null;
    this.email = props.email ?? null;
    this.direccion = props.direccion ?? null;
  }

  public static crear(props: PropsProveedor): Proveedor {
    if (!props.razonSocial || props.razonSocial.trim().length === 0) {
      throw new Error('La razón social del proveedor es obligatoria.');
    }

    if (!props.ruc || props.ruc.trim().length !== 13) {
      throw new Error('El RUC del proveedor debe tener exactamente 13 dígitos.');
    }

    return new Proveedor({
      ...props,
      razonSocial: props.razonSocial.trim(),
      ruc: props.ruc.trim(),
      telefono: props.telefono ? props.telefono.trim() : null,
      email: props.email ? props.email.trim().toLowerCase() : null,
      direccion: props.direccion ? props.direccion.trim() : null,
    });
  }
}
