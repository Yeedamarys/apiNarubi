import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { Usuario } from '../../../domain/entities/Usuario';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class ObtenerUsuarioPorId {
  constructor(private readonly usuarioRepo: RepositorioUsuarioPort) {}

  public async ejecutar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    if (!usuario) {
      throw new AppError(`No se encontró ningún usuario con el ID ${id}.`, 404, 'NOT_FOUND');
    }
    return usuario;
  }
}
