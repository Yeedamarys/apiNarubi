import { RepositorioProveedorPort } from '../../application/ports/RepositorioProveedorPort';
import { Proveedor } from '../../domain/entities/Proveedor';
import { prisma } from './prismaClient';

export class PrismaProveedorRepository implements RepositorioProveedorPort {
  public async buscarPorId(id: number): Promise<Proveedor | null> {
    const raw = await prisma.proveedor.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return Proveedor.crear({
      id: raw.id,
      razonSocial: raw.razon_social,
      ruc: raw.ruc,
      telefono: raw.telefono,
      email: raw.email,
      direccion: raw.direccion,
    });
  }

  public async buscarPorRuc(ruc: string): Promise<Proveedor | null> {
    const raw = await prisma.proveedor.findUnique({
      where: { ruc },
    });

    if (!raw) return null;

    return Proveedor.crear({
      id: raw.id,
      razonSocial: raw.razon_social,
      ruc: raw.ruc,
      telefono: raw.telefono,
      email: raw.email,
      direccion: raw.direccion,
    });
  }

  public async guardar(proveedor: Proveedor): Promise<Proveedor> {
    const raw = await prisma.proveedor.create({
      data: {
        razon_social: proveedor.razonSocial,
        ruc: proveedor.ruc,
        telefono: proveedor.telefono,
        email: proveedor.email,
        direccion: proveedor.direccion,
      },
    });

    return Proveedor.crear({
      id: raw.id,
      razonSocial: raw.razon_social,
      ruc: raw.ruc,
      telefono: raw.telefono,
      email: raw.email,
      direccion: raw.direccion,
    });
  }

  public async listar(): Promise<Proveedor[]> {
    const raws = await prisma.proveedor.findMany({
      orderBy: { id: 'asc' },
    });

    return raws.map((raw) =>
      Proveedor.crear({
        id: raw.id,
        razonSocial: raw.razon_social,
        ruc: raw.ruc,
        telefono: raw.telefono,
        email: raw.email,
        direccion: raw.direccion,
      })
    );
  }

  public async actualizar(id: number, datos: Partial<Proveedor>): Promise<Proveedor> {
    const raw = await prisma.proveedor.update({
      where: { id },
      data: {
        ...(datos.razonSocial && { razon_social: datos.razonSocial }),
        ...(datos.ruc && { ruc: datos.ruc }),
        ...(datos.telefono !== undefined && { telefono: datos.telefono }),
        ...(datos.email !== undefined && { email: datos.email }),
        ...(datos.direccion !== undefined && { direccion: datos.direccion }),
      },
    });

    return Proveedor.crear({
      id: raw.id,
      razonSocial: raw.razon_social,
      ruc: raw.ruc,
      telefono: raw.telefono,
      email: raw.email,
      direccion: raw.direccion,
    });
  }
}
