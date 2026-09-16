import { RepositorioCategoriaPort } from '../../ports/RepositorioCategoriaPort';
import { Categoria } from '../../../domain/entities/Categoria';

export class ListarCategorias {
  constructor(private readonly categoriaRepo: RepositorioCategoriaPort) {}

  public async ejecutar(): Promise<Categoria[]> {
    return await this.categoriaRepo.listar();
  }
}
