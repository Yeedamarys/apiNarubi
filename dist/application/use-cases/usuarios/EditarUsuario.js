"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarUsuario = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class EditarUsuario {
    usuarioRepo;
    hashService;
    constructor(usuarioRepo, hashService) {
        this.usuarioRepo = usuarioRepo;
        this.hashService = hashService;
    }
    async ejecutar(id, input) {
        const usuarioExistente = await this.usuarioRepo.buscarPorId(id);
        if (!usuarioExistente) {
            throw new errorHandler_1.AppError(`No se encontró ningún usuario con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        if (input.correoElectronico &&
            input.correoElectronico.trim().toLowerCase() !== usuarioExistente.correoElectronico) {
            const otroConMismoCorreo = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
            if (otroConMismoCorreo && otroConMismoCorreo.id !== id) {
                throw new errorHandler_1.AppError('El correo electrónico ingresado ya pertenece a otro usuario.', 400, 'CORREO_DUPLICADO');
            }
        }
        let passwordHashNuevo = undefined;
        if (input.contrasena && input.contrasena.trim().length > 0) {
            passwordHashNuevo = await this.hashService.hash(input.contrasena);
        }
        const datosActualizacion = {
            ...(input.nombreCompleto && { nombreCompleto: input.nombreCompleto.trim() }),
            ...(input.correoElectronico && {
                correoElectronico: input.correoElectronico.trim().toLowerCase(),
            }),
            ...(passwordHashNuevo && { passwordHash: passwordHashNuevo }),
            ...(input.rol && { rol: input.rol }),
            ...(input.activo !== undefined && { activo: input.activo }),
        };
        return await this.usuarioRepo.actualizar(id, datosActualizacion);
    }
}
exports.EditarUsuario = EditarUsuario;
