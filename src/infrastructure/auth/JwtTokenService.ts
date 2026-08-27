import jwt from 'jsonwebtoken';
import { TokenPort, PayloadToken } from '../../application/ports/TokenPort';
import { AppError } from '../../interfaces/http/middlewares/errorHandler';

export class JwtTokenService implements TokenPort {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_key';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key';
  }

  public generarAccessToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: '8h' });
  }

  public generarRefreshToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
  }

  public verificar(token: string): PayloadToken {
    try {
      const decoded = (jwt.verify(token, this.accessSecret) as unknown) as PayloadToken;
      return decoded;
    } catch {
      throw new AppError('Token de autenticación inválido o expirado.', 401, 'INVALID_TOKEN');
    }
  }
}
