import { Request, Response, NextFunction } from 'express';
import { AutenticarUsuario } from '../../../application/use-cases/auth/AutenticarUsuario';
import { PrismaUsuarioRepository } from '../../../infrastructure/persistence/PrismaUsuarioRepository';
import { BcryptHashService } from '../../../infrastructure/auth/BcryptHashService';
import { JwtTokenService } from '../../../infrastructure/auth/JwtTokenService';
import { loginSchema } from '../dtos/auth.dto';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

const usuarioRepo = new PrismaUsuarioRepository();
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

const autenticarUsuarioUseCase = new AutenticarUsuario(usuarioRepo, hashService, tokenService);

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validBody = loginSchema.parse(req.body);
      const resultado = await autenticarUsuarioUseCase.ejecutar(validBody);

      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.usuario) {
        res.status(401).json({ error: 'No autenticado' });
        return;
      }

      res.status(200).json({
        usuario: req.usuario,
      });
    } catch (error) {
      next(error);
    }
  }
}
