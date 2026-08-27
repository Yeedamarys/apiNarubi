import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { HashPort } from '../../ports/HashPort';
import { Usuario } from '../../../domain/entities/Usuario';
import { RolUsuario } from '../../../domain/value-objects/RolUsuario';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface EditarUsuarioInput {
  nombreCompleto?: string;
  correoElectronico?: string;
  contrasena?: string;
  rol?: RolUsuario;
  activo?: boolean;
}

export class EditarUsuario {
  constructor(
    private readonly usuarioRepo: RepositorioUsuarioPort,
    private readonly hashService: HashPort
  ) {}

  public async ejecutar(id: number, input: EditarUsuarioInput): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);
    if (!usuarioExistente) {
      throw new AppError(`No se encontró ningún usuario con el ID ${id}.`, 404, 'NOT_FOUND');
    }

    if (input.correoElectronico && input.correoElectronico.trim().toLowerCase() !== usuarioExistente.correoElectronico) {
      const otroConMismoCorreo = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
      if (otroConMismoCorreo && otroConMismoCorreo.id !== id) {
        throw new AppError('El correo electrónico ingresado ya pertenece a otro usuario.', 400, 'CORREO_DUPLICADO');
      }
    }

    let passwordHashNuevo: string | undefined = undefined;
    if (input.contrasena && input.contrasena.trim().length > 0) {
      passwordHashNuevo = await this.hashService.hash(input.contrasena);
    }

    const datosActualizacion: Partial<Usuario> = {
      ...(input.nombreCompleto && { nombreCompleto: input.nombreCompleto.trim() }),
      ...(input.correoElectronico && { correoElectronico: input.correoElectronico.trim().toLowerCase() }),
      ...(passwordHashNuevo && { passwordHash: passwordHashNuevo }),
      ...(input.rol && { rol: input.rol }),
      ...(input.activo !== undefined && { activo: input.activo }),
    };

    return await this.usuarioRepo.actualizar(id, datosActualizacion);
  }
}
