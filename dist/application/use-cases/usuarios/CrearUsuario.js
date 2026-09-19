"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearUsuario = void 0;
const Usuario_1 = require("../../../domain/entities/Usuario");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class CrearUsuario {
    usuarioRepo;
    hashService;
    constructor(usuarioRepo, hashService) {
        this.usuarioRepo = usuarioRepo;
        this.hashService = hashService;
    }
    async ejecutar(input) {
        const existe = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
        if (existe) {
            throw new errorHandler_1.AppError('Ya existe un usuario registrado con este correo electrónico.', 400, 'CORREO_DUPLICADO');
        }
        const passwordHash = await this.hashService.hash(input.contrasena);
        const usuario = Usuario_1.Usuario.crear({
            nombreCompleto: input.nombreCompleto,
            correoElectronico: input.correoElectronico,
            passwordHash,
            rol: input.rol,
        });
        return await this.usuarioRepo.guardar(usuario);
    }
}
exports.CrearUsuario = CrearUsuario;
