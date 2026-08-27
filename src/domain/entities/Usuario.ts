import { RolUsuario, esRolValido } from '../value-objects/RolUsuario';

export interface PropsUsuario {
  id?: number;
  nombreCompleto: string;
  correoElectronico: string;
  passwordHash: string;
  rol: RolUsuario;
  activo?: boolean;
  fechaCreacion?: Date;
}

export class Usuario {
  public readonly id?: number;
  public readonly nombreCompleto: string;
  public readonly correoElectronico: string;
  public readonly passwordHash: string;
  public readonly rol: RolUsuario;
  public readonly activo: boolean;
  public readonly fechaCreacion: Date;

  private constructor(props: PropsUsuario) {
    this.id = props.id;
    this.nombreCompleto = props.nombreCompleto;
    this.correoElectronico = props.correoElectronico;
    this.passwordHash = props.passwordHash;
    this.rol = props.rol;
    this.activo = props.activo ?? true;
    this.fechaCreacion = props.fechaCreacion ?? new Date();
  }

  public static crear(props: PropsUsuario): Usuario {
    if (!props.nombreCompleto || props.nombreCompleto.trim().length === 0) {
      throw new Error('El nombre completo del usuario es obligatorio.');
    }

    if (!props.correoElectronico || !props.correoElectronico.includes('@')) {
      throw new Error('El correo electrónico proporcionado es inválido.');
    }

    if (!props.passwordHash || props.passwordHash.trim().length === 0) {
      throw new Error('El hash de contraseña es obligatorio.');
    }

    if (!esRolValido(props.rol)) {
      throw new Error(`El rol '${props.rol}' no es válido en el sistema.`);
    }

    return new Usuario({
      ...props,
      nombreCompleto: props.nombreCompleto.trim(),
      correoElectronico: props.correoElectronico.trim().toLowerCase(),
    });
  }
}
