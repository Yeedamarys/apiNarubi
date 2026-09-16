import { RepositorioCategoriaPort } from '../../ports/RepositorioCategoriaPort';
import { Categoria } from '../../../domain/entities/Categoria';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface EditarCategoriaInput {
  nombre?: string;
  descripcion?: string | null;
}

export class EditarCategoria {
  constructor(private readonly categoriaRepo: RepositorioCategoriaPort) {}

  public async ejecutar(id: number, input: EditarCategoriaInput): Promise<Categoria> {
    const existente = await this.categoriaRepo.buscarPorId(id);
    if (!existente) {
      throw new AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
    }

    if (input.nombre && input.nombre.trim().toLowerCase() !== existente.nombre.toLowerCase()) {
      const duplicado = await this.categoriaRepo.buscarPorNombre(input.nombre.trim());
      if (duplicado && duplicado.id !== id) {
        throw new AppError(`Ya existe otra categoría registrada con el nombre '${input.nombre}'.`, 400, 'CATEGORIA_DUPLICADA');
      }
    }

    const datosActualizacion: Partial<Categoria> = {
      ...(input.nombre && { nombre: input.nombre.trim() }),
      ...(input.descripcion !== undefined && { descripcion: input.descripcion ? input.descripcion.trim() : null }),
    };

    return await this.categoriaRepo.actualizar(id, datosActualizacion);
  }
}
