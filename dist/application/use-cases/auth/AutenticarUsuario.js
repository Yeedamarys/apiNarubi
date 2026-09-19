"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticarUsuario = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class AutenticarUsuario {
    usuarioRepo;
    hashService;
    tokenService;
    constructor(usuarioRepo, hashService, tokenService) {
        this.usuarioRepo = usuarioRepo;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }
    async ejecutar(input) {
        const errorGenerico = new errorHandler_1.AppError('Credenciales incorrectas o usuario inactivo.', 401, 'INVALID_CREDENTIALS');
        const usuario = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
        if (!usuario || !usuario.activo) {
            throw errorGenerico;
        }
        const passwordValida = await this.hashService.comparar(input.contrasena, usuario.passwordHash);
        if (!passwordValida) {
            throw errorGenerico;
        }
        const payload = {
            sub: usuario.id,
            rol: usuario.rol,
            nombre: usuario.nombreCompleto,
        };
        const accessToken = this.tokenService.generarAccessToken(payload);
        const refreshToken = this.tokenService.generarRefreshToken(payload);
        return {
            accessToken,
            refreshToken,
            usuario: {
                id: usuario.id,
                nombreCompleto: usuario.nombreCompleto,
                correoElectronico: usuario.correoElectronico,
                rol: usuario.rol,
            },
        };
    }
}
exports.AutenticarUsuario = AutenticarUsuario;
