"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const errorHandler_1 = require("./errorHandler");
const roleMiddleware = (rolesPermitidos) => {
    return (req, _res, next) => {
        if (!req.usuario) {
            throw new errorHandler_1.AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
        }
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            throw new errorHandler_1.AppError(`Acceso denegado. El rol '${req.usuario.rol}' no tiene permisos suficientes para este recurso.`, 403, 'FORBIDDEN');
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
