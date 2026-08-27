import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class EliminarUsuario {
  constructor(private readonly usuarioRepo: RepositorioUsuarioPort) {}

  public async ejecutar(id: number): Promise<void> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    if (!usuario) {
      throw new AppError(`No se encontró ningún usuario con el ID ${id}.`, 404, 'NOT_FOUND');
    }

    await this.usuarioRepo.eliminar(id);
  }
}
