import { Usuario } from '../../domain/entities/Usuario';

export interface RepositorioUsuarioPort {
  buscarPorCorreo(correoElectronico: string): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
  guardar(usuario: Usuario): Promise<Usuario>;
  listar(): Promise<Usuario[]>;
  actualizar(id: number, datos: Partial<Usuario>): Promise<Usuario>;
  desactivar(id: number): Promise<void>;
  eliminar(id: number): Promise<void>;
}
