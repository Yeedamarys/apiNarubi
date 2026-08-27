import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { Usuario } from '../../../domain/entities/Usuario';

export class ListarUsuarios {
  constructor(private readonly usuarioRepo: RepositorioUsuarioPort) {}

  public async ejecutar(): Promise<Usuario[]> {
    return await this.usuarioRepo.listar();
  }
}
