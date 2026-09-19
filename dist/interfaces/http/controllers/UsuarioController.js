"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const CrearUsuario_1 = require("../../../application/use-cases/usuarios/CrearUsuario");
const ListarUsuarios_1 = require("../../../application/use-cases/usuarios/ListarUsuarios");
const ObtenerUsuarioPorId_1 = require("../../../application/use-cases/usuarios/ObtenerUsuarioPorId");
const EditarUsuario_1 = require("../../../application/use-cases/usuarios/EditarUsuario");
const EliminarUsuario_1 = require("../../../application/use-cases/usuarios/EliminarUsuario");
const PrismaUsuarioRepository_1 = require("../../../infrastructure/persistence/PrismaUsuarioRepository");
const BcryptHashService_1 = require("../../../infrastructure/auth/BcryptHashService");
const crearUsuario_dto_1 = require("../dtos/crearUsuario.dto");
const editarUsuario_dto_1 = require("../dtos/editarUsuario.dto");
const cambiarEstadoUsuario_dto_1 = require("../dtos/cambiarEstadoUsuario.dto");
const usuarioRepo = new PrismaUsuarioRepository_1.PrismaUsuarioRepository();
const hashService = new BcryptHashService_1.BcryptHashService();
const crearUsuarioUseCase = new CrearUsuario_1.CrearUsuario(usuarioRepo, hashService);
const listarUsuariosUseCase = new ListarUsuarios_1.ListarUsuarios(usuarioRepo);
const obtenerUsuarioPorIdUseCase = new ObtenerUsuarioPorId_1.ObtenerUsuarioPorId(usuarioRepo);
const editarUsuarioUseCase = new EditarUsuario_1.EditarUsuario(usuarioRepo, hashService);
const eliminarUsuarioUseCase = new EliminarUsuario_1.EliminarUsuario(usuarioRepo);
class UsuarioController {
    async crear(req, res, next) {
        try {
            const validBody = crearUsuario_dto_1.crearUsuarioSchema.parse(req.body);
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
        }
        catch (error) {
            next(error);
        }
    }
    async listar(_req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async obtenerPorId(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async editar(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const validBody = editarUsuario_dto_1.editarUsuarioSchema.parse(req.body);
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
        }
        catch (error) {
            next(error);
        }
    }
    async cambiarEstado(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { activo } = cambiarEstadoUsuario_dto_1.cambiarEstadoUsuarioSchema.parse(req.body);
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
        }
        catch (error) {
            next(error);
        }
    }
    async eliminar(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            await eliminarUsuarioUseCase.ejecutar(id);
            res.status(200).json({
                mensaje: `Usuario con ID ${id} eliminado exitosamente de la base de datos.`,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UsuarioController = UsuarioController;
