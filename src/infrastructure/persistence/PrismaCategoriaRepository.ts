import { RepositorioCategoriaPort } from '../../application/ports/RepositorioCategoriaPort';
import { Categoria } from '../../domain/entities/Categoria';
import { prisma } from './prismaClient';
import { AppError } from '../../interfaces/http/middlewares/errorHandler';

export class PrismaCategoriaRepository implements RepositorioCategoriaPort {
  public async buscarPorId(id: number): Promise<Categoria | null> {
    const raw = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return Categoria.crear({
      id: raw.id,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
    });
  }

  public async buscarPorNombre(nombre: string): Promise<Categoria | null> {
    const raws = await prisma.categoria.findMany({
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive',
        },
      },
    });

    if (raws.length === 0) return null;
    const raw = raws[0];

    return Categoria.crear({
      id: raw.id,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
    });
  }

  public async guardar(categoria: Categoria): Promise<Categoria> {
    const raw = await prisma.categoria.create({
      data: {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
    });

    return Categoria.crear({
      id: raw.id,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
    });
  }

  public async listar(): Promise<Categoria[]> {
    const raws = await prisma.categoria.findMany({
      orderBy: { id: 'asc' },
    });

    return raws.map((raw) =>
      Categoria.crear({
        id: raw.id,
        nombre: raw.nombre,
        descripcion: raw.descripcion,
      })
    );
  }

  public async actualizar(id: number, datos: Partial<Categoria>): Promise<Categoria> {
    const raw = await prisma.categoria.update({
      where: { id },
      data: {
        ...(datos.nombre && { nombre: datos.nombre }),
        ...(datos.descripcion !== undefined && { descripcion: datos.descripcion }),
      },
    });

    return Categoria.crear({
      id: raw.id,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
    });
  }

  public async eliminar(id: number): Promise<void> {
    try {
      await prisma.categoria.delete({
        where: { id },
      });
    } catch {
      throw new AppError(
        `No se puede eliminar la categoría con ID ${id} porque tiene productos asociados en el sistema.`,
        400,
        'FOREIGN_KEY_CONSTRAINT'
      );
    }
  }
}
