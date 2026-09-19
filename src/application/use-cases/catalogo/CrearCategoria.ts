import { RepositorioCategoriaPort } from '../../ports/RepositorioCategoriaPort';
import { Categoria } from '../../../domain/entities/Categoria';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface CrearCategoriaInput {
  nombre: string;
  descripcion?: string | null;
}

export class CrearCategoria {
  constructor(private readonly categoriaRepo: RepositorioCategoriaPort) {}

  public async ejecutar(input: CrearCategoriaInput): Promise<Categoria> {
    const existe = await this.categoriaRepo.buscarPorNombre(input.nombre.trim());
    if (existe) {
      throw new AppError(
        `Ya existe una categoría registrada con el nombre '${input.nombre}'.`,
        400,
        'CATEGORIA_DUPLICADA'
      );
    }

    const categoria = Categoria.crear({
      nombre: input.nombre,
      descripcion: input.descripcion,
    });

    return await this.categoriaRepo.guardar(categoria);
  }
}
