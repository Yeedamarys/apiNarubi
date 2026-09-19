"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const JwtTokenService_1 = require("../../../infrastructure/auth/JwtTokenService");
const errorHandler_1 = require("./errorHandler");
const tokenService = new JwtTokenService_1.JwtTokenService();
const authMiddleware = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new errorHandler_1.AppError('Acceso no autorizado. Token no proporcionado.', 401, 'UNAUTHORIZED');
    }
    const token = authHeader.substring(7);
    const payload = tokenService.verificar(token);
    req.usuario = payload;
    next();
};
exports.authMiddleware = authMiddleware;
