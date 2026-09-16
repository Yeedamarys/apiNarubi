import { Request, Response, NextFunction } from 'express';
import { CrearCategoria } from '../../../application/use-cases/catalogo/CrearCategoria';
import { ListarCategorias } from '../../../application/use-cases/catalogo/ListarCategorias';
import { ObtenerCategoriaPorId } from '../../../application/use-cases/catalogo/ObtenerCategoriaPorId';
import { EditarCategoria } from '../../../application/use-cases/catalogo/EditarCategoria';
import { EliminarCategoria } from '../../../application/use-cases/catalogo/EliminarCategoria';
import { PrismaCategoriaRepository } from '../../../infrastructure/persistence/PrismaCategoriaRepository';
import { crearCategoriaSchema } from '../dtos/crearCategoria.dto';
import { editarCategoriaSchema } from '../dtos/editarCategoria.dto';

const categoriaRepo = new PrismaCategoriaRepository();

const crearCategoriaUseCase = new CrearCategoria(categoriaRepo);
const listarCategoriasUseCase = new ListarCategorias(categoriaRepo);
const obtenerCategoriaPorIdUseCase = new ObtenerCategoriaPorId(categoriaRepo);
const editarCategoriaUseCase = new EditarCategoria(categoriaRepo);
const eliminarCategoriaUseCase = new EliminarCategoria(categoriaRepo);

export class CategoriaController {
  public async crear(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validBody = crearCategoriaSchema.parse(req.body);
      const nuevaCategoria = await crearCategoriaUseCase.ejecutar(validBody);

      res.status(201).json({
        mensaje: 'Categoría registrada exitosamente.',
        categoria: {
          id: nuevaCategoria.id,
          nombre: nuevaCategoria.nombre,
          descripcion: nuevaCategoria.descripcion,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categorias = await listarCategoriasUseCase.ejecutar();

      const resultado = categorias.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        descripcion: c.descripcion,
      }));

      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async obtenerPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const categoria = await obtenerCategoriaPorIdUseCase.ejecutar(id);

      res.status(200).json({
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      });
    } catch (error) {
      next(error);
    }
  }

  public async editar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const validBody = editarCategoriaSchema.parse(req.body);
      const categoriaEditada = await editarCategoriaUseCase.ejecutar(id, validBody);

      res.status(200).json({
        mensaje: 'Categoría actualizada exitosamente.',
        categoria: {
          id: categoriaEditada.id,
          nombre: categoriaEditada.nombre,
          descripcion: categoriaEditada.descripcion,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async eliminar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await eliminarCategoriaUseCase.ejecutar(id);

      res.status(200).json({
        mensaje: `Categoría con ID ${id} eliminada exitosamente de la base de datos.`,
      });
    } catch (error) {
      next(error);
    }
  }
}
