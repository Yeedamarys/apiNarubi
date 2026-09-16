import { RepositorioCategoriaPort } from '../../ports/RepositorioCategoriaPort';
import { Categoria } from '../../../domain/entities/Categoria';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class ObtenerCategoriaPorId {
  constructor(private readonly categoriaRepo: RepositorioCategoriaPort) {}

  public async ejecutar(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.buscarPorId(id);
    if (!categoria) {
      throw new AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
    }
    return categoria;
  }
}
