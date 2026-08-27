import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { HashPort } from '../../ports/HashPort';
import { Usuario } from '../../../domain/entities/Usuario';
import { RolUsuario } from '../../../domain/value-objects/RolUsuario';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface CrearUsuarioInput {
  nombreCompleto: string;
  correoElectronico: string;
  contrasena: string;
  rol: RolUsuario;
}

export class CrearUsuario {
  constructor(
    private readonly usuarioRepo: RepositorioUsuarioPort,
    private readonly hashService: HashPort
  ) {}

  public async ejecutar(input: CrearUsuarioInput): Promise<Usuario> {
    const existe = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
    if (existe) {
      throw new AppError('Ya existe un usuario registrado con este correo electrónico.', 400, 'CORREO_DUPLICADO');
    }

    const passwordHash = await this.hashService.hash(input.contrasena);

    const usuario = Usuario.crear({
      nombreCompleto: input.nombreCompleto,
      correoElectronico: input.correoElectronico,
      passwordHash,
      rol: input.rol,
    });

    return await this.usuarioRepo.guardar(usuario);
  }
}
