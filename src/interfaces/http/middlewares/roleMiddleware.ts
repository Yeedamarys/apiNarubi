import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import { RolUsuario } from '../../../domain/value-objects/RolUsuario';
import { AppError } from './errorHandler';

export const roleMiddleware = (rolesPermitidos: RolUsuario[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.usuario) {
      throw new AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      throw new AppError(
        `Acceso denegado. El rol '${req.usuario.rol}' no tiene permisos suficientes para este recurso.`,
        403,
        'FORBIDDEN'
      );
    }

    next();
  };
};
