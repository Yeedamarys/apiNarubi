import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../../../infrastructure/auth/JwtTokenService';
import { AppError } from './errorHandler';
import { PayloadToken } from '../../../application/ports/TokenPort';

export interface AuthenticatedRequest extends Request {
  usuario?: PayloadToken;
}

const tokenService = new JwtTokenService();

export const authMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Acceso no autorizado. Token no proporcionado.', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.substring(7);
  const payload = tokenService.verificar(token);
  req.usuario = payload;

  next();
};
