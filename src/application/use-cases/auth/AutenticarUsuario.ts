import { RepositorioUsuarioPort } from '../../ports/RepositorioUsuarioPort';
import { HashPort } from '../../ports/HashPort';
import { TokenPort } from '../../ports/TokenPort';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface AuthInput {
  correoElectronico: string;
  contrasena: string;
}

export interface AuthOutput {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: number;
    nombreCompleto: string;
    correoElectronico: string;
    rol: string;
  };
}

export class AutenticarUsuario {
  constructor(
    private readonly usuarioRepo: RepositorioUsuarioPort,
    private readonly hashService: HashPort,
    private readonly tokenService: TokenPort
  ) {}

  public async ejecutar(input: AuthInput): Promise<AuthOutput> {
    const errorGenerico = new AppError('Credenciales incorrectas o usuario inactivo.', 401, 'INVALID_CREDENTIALS');

    const usuario = await this.usuarioRepo.buscarPorCorreo(input.correoElectronico.trim().toLowerCase());
    if (!usuario || !usuario.activo) {
      throw errorGenerico;
    }

    const passwordValida = await this.hashService.comparar(input.contrasena, usuario.passwordHash);
    if (!passwordValida) {
      throw errorGenerico;
    }

    const payload = {
      sub: usuario.id!,
      rol: usuario.rol,
      nombre: usuario.nombreCompleto,
    };

    const accessToken = this.tokenService.generarAccessToken(payload);
    const refreshToken = this.tokenService.generarRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id!,
        nombreCompleto: usuario.nombreCompleto,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.rol,
      },
    };
  }
}
