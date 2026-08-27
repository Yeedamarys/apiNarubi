import { Request, Response, NextFunction } from 'express';
import { CrearUsuario } from '../../../application/use-cases/usuarios/CrearUsuario';
import { ListarUsuarios } from '../../../application/use-cases/usuarios/ListarUsuarios';
import { ObtenerUsuarioPorId } from '../../../application/use-cases/usuarios/ObtenerUsuarioPorId';
import { EditarUsuario } from '../../../application/use-cases/usuarios/EditarUsuario';
import { EliminarUsuario } from '../../../application/use-cases/usuarios/EliminarUsuario';
import { PrismaUsuarioRepository } from '../../../infrastructure/persistence/PrismaUsuarioRepository';
import { BcryptHashService } from '../../../infrastructure/auth/BcryptHashService';
import { crearUsuarioSchema } from '../dtos/crearUsuario.dto';
import { editarUsuarioSchema } from '../dtos/editarUsuario.dto';
import { cambiarEstadoUsuarioSchema } from '../dtos/cambiarEstadoUsuario.dto';

const usuarioRepo = new PrismaUsuarioRepository();
const hashService = new BcryptHashService();

const crearUsuarioUseCase = new CrearUsuario(usuarioRepo, hashService);
const listarUsuariosUseCase = new ListarUsuarios(usuarioRepo);
const obtenerUsuarioPorIdUseCase = new ObtenerUsuarioPorId(usuarioRepo);
const editarUsuarioUseCase = new EditarUsuario(usuarioRepo, hashService);
const eliminarUsuarioUseCase = new EliminarUsuario(usuarioRepo);

export class UsuarioController {
  public async crear(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validBody = crearUsuarioSchema.parse(req.body);
      const nuevoUsuario = await crearUsuarioUseCase.ejecutar(validBody);

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente.',
        usuario: {
          id: nuevoUsuario.id,
          nombreCompleto: nuevoUsuario.nombreCompleto,
          correoElectronico: nuevoUsuario.correoElectronico,
          rol: nuevoUsuario.rol,
          activo: nuevoUsuario.activo,
          fechaCreacion: nuevoUsuario.fechaCreacion,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarios = await listarUsuariosUseCase.ejecutar();

      const resultado = usuarios.map((u) => ({
        id: u.id,
        nombreCompleto: u.nombreCompleto,
        correoElectronico: u.correoElectronico,
        rol: u.rol,
        activo: u.activo,
        fechaCreacion: u.fechaCreacion,
      }));

      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async obtenerPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const usuario = await obtenerUsuarioPorIdUseCase.ejecutar(id);

      res.status(200).json({
        id: usuario.id,
        nombreCompleto: usuario.nombreCompleto,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.rol,
        activo: usuario.activo,
        fechaCreacion: usuario.fechaCreacion,
      });
    } catch (error) {
      next(error);
    }
  }

  public async editar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const validBody = editarUsuarioSchema.parse(req.body);
      const usuarioEditado = await editarUsuarioUseCase.ejecutar(id, validBody);

      res.status(200).json({
        mensaje: 'Usuario actualizado exitosamente.',
        usuario: {
          id: usuarioEditado.id,
          nombreCompleto: usuarioEditado.nombreCompleto,
          correoElectronico: usuarioEditado.correoElectronico,
          rol: usuarioEditado.rol,
          activo: usuarioEditado.activo,
          fechaCreacion: usuarioEditado.fechaCreacion,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async cambiarEstado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { activo } = cambiarEstadoUsuarioSchema.parse(req.body);
      const usuarioActualizado = await editarUsuarioUseCase.ejecutar(id, { activo });

      res.status(200).json({
        mensaje: `Estado del usuario actualizado exitosamente a ${activo ? 'ACTIVO' : 'INACTIVO'}.`,
        usuario: {
          id: usuarioActualizado.id,
          nombreCompleto: usuarioActualizado.nombreCompleto,
          correoElectronico: usuarioActualizado.correoElectronico,
          rol: usuarioActualizado.rol,
          activo: usuarioActualizado.activo,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async eliminar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await eliminarUsuarioUseCase.ejecutar(id);

      res.status(200).json({
        mensaje: `Usuario con ID ${id} eliminado exitosamente de la base de datos.`,
      });
    } catch (error) {
      next(error);
    }
  }
}
