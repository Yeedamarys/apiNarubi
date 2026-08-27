import { RepositorioUsuarioPort } from '../../application/ports/RepositorioUsuarioPort';
import { Usuario } from '../../domain/entities/Usuario';
import { RolUsuario } from '../../domain/value-objects/RolUsuario';
import { prisma } from './prismaClient';
import { rol_usuario as PrismaRolUsuario } from '@prisma/client';

export class PrismaUsuarioRepository implements RepositorioUsuarioPort {
  public async buscarPorCorreo(correoElectronico: string): Promise<Usuario | null> {
    const raw = await prisma.usuario.findUnique({
      where: { correo_electronico: correoElectronico },
    });

    if (!raw) return null;

    return Usuario.crear({
      id: raw.id,
      nombreCompleto: raw.nombre_completo,
      correoElectronico: raw.correo_electronico,
      passwordHash: raw.password_hash,
      rol: raw.rol as RolUsuario,
      activo: raw.activo,
      fechaCreacion: raw.fecha_creacion,
    });
  }

  public async buscarPorId(id: number): Promise<Usuario | null> {
    const raw = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return Usuario.crear({
      id: raw.id,
      nombreCompleto: raw.nombre_completo,
      correoElectronico: raw.correo_electronico,
      passwordHash: raw.password_hash,
      rol: raw.rol as RolUsuario,
      activo: raw.activo,
      fechaCreacion: raw.fecha_creacion,
    });
  }

  public async guardar(usuario: Usuario): Promise<Usuario> {
    const raw = await prisma.usuario.create({
      data: {
        nombre_completo: usuario.nombreCompleto,
        correo_electronico: usuario.correoElectronico,
        password_hash: usuario.passwordHash,
        rol: usuario.rol as PrismaRolUsuario,
        activo: usuario.activo,
      },
    });

    return Usuario.crear({
      id: raw.id,
      nombreCompleto: raw.nombre_completo,
      correoElectronico: raw.correo_electronico,
      passwordHash: raw.password_hash,
      rol: raw.rol as RolUsuario,
      activo: raw.activo,
      fechaCreacion: raw.fecha_creacion,
    });
  }

  public async listar(): Promise<Usuario[]> {
    const raws = await prisma.usuario.findMany({
      orderBy: { id: 'asc' },
    });

    return raws.map((raw) =>
      Usuario.crear({
        id: raw.id,
        nombreCompleto: raw.nombre_completo,
        correoElectronico: raw.correo_electronico,
        passwordHash: raw.password_hash,
        rol: raw.rol as RolUsuario,
        activo: raw.activo,
        fechaCreacion: raw.fecha_creacion,
      })
    );
  }

  public async actualizar(id: number, datos: Partial<Usuario>): Promise<Usuario> {
    const raw = await prisma.usuario.update({
      where: { id },
      data: {
        ...(datos.nombreCompleto && { nombre_completo: datos.nombreCompleto }),
        ...(datos.correoElectronico && { correo_electronico: datos.correoElectronico }),
        ...(datos.passwordHash && { password_hash: datos.passwordHash }),
        ...(datos.rol && { rol: datos.rol as PrismaRolUsuario }),
        ...(datos.activo !== undefined && { activo: datos.activo }),
      },
    });

    return Usuario.crear({
      id: raw.id,
      nombreCompleto: raw.nombre_completo,
      correoElectronico: raw.correo_electronico,
      passwordHash: raw.password_hash,
      rol: raw.rol as RolUsuario,
      activo: raw.activo,
      fechaCreacion: raw.fecha_creacion,
    });
  }

  public async desactivar(id: number): Promise<void> {
    await prisma.usuario.update({
      where: { id },
      data: { activo: false },
    });
  }

  public async eliminar(id: number): Promise<void> {
    try {
      // Intenta eliminación física de la fila en PostgreSQL
      await prisma.usuario.delete({
        where: { id },
      });
    } catch {
      // Si el usuario ya tiene registros asociados (ventas, recepciones, kardex), realiza desactivación lógica
      await this.desactivar(id);
    }
  }
}
