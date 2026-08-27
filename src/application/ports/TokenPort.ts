import { RolUsuario } from '../../domain/value-objects/RolUsuario';

export interface PayloadToken {
  sub: number;
  rol: RolUsuario;
  nombre: string;
}

export interface TokenPort {
  generarAccessToken(payload: PayloadToken): string;
  generarRefreshToken(payload: PayloadToken): string;
  verificar(token: string): PayloadToken;
}
