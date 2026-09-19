"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AutenticarUsuario_1 = require("../../../application/use-cases/auth/AutenticarUsuario");
const PrismaUsuarioRepository_1 = require("../../../infrastructure/persistence/PrismaUsuarioRepository");
const BcryptHashService_1 = require("../../../infrastructure/auth/BcryptHashService");
const JwtTokenService_1 = require("../../../infrastructure/auth/JwtTokenService");
const auth_dto_1 = require("../dtos/auth.dto");
const usuarioRepo = new PrismaUsuarioRepository_1.PrismaUsuarioRepository();
const hashService = new BcryptHashService_1.BcryptHashService();
const tokenService = new JwtTokenService_1.JwtTokenService();
const autenticarUsuarioUseCase = new AutenticarUsuario_1.AutenticarUsuario(usuarioRepo, hashService, tokenService);
class AuthController {
    async login(req, res, next) {
        try {
            const validBody = auth_dto_1.loginSchema.parse(req.body);
            const resultado = await autenticarUsuarioUseCase.ejecutar(validBody);
            res.status(200).json(resultado);
        }
        catch (error) {
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            if (!req.usuario) {
                res.status(401).json({ error: 'No autenticado' });
                return;
            }
            res.status(200).json({
                usuario: req.usuario,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
