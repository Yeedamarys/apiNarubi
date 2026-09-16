import { RepositorioCategoriaPort } from '../../ports/RepositorioCategoriaPort';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export class EliminarCategoria {
  constructor(private readonly categoriaRepo: RepositorioCategoriaPort) {}

  public async ejecutar(id: number): Promise<void> {
    const existente = await this.categoriaRepo.buscarPorId(id);
    if (!existente) {
      throw new AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
    }

    await this.categoriaRepo.eliminar(id);
  }
}
