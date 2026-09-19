"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../../interfaces/http/middlewares/errorHandler");
class JwtTokenService {
    accessSecret;
    refreshSecret;
    constructor() {
        this.accessSecret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_key';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key';
    }
    generarAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, { expiresIn: '8h' });
    }
    generarRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshSecret, { expiresIn: '7d' });
    }
    verificar(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.accessSecret);
            return decoded;
        }
        catch {
            throw new errorHandler_1.AppError('Token de autenticación inválido o expirado.', 401, 'INVALID_TOKEN');
        }
    }
}
exports.JwtTokenService = JwtTokenService;
