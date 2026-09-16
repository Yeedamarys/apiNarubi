import { Categoria } from '../../domain/entities/Categoria';

export interface RepositorioCategoriaPort {
  buscarPorId(id: number): Promise<Categoria | null>;
  buscarPorNombre(nombre: string): Promise<Categoria | null>;
  guardar(categoria: Categoria): Promise<Categoria>;
  listar(): Promise<Categoria[]>;
  actualizar(id: number, datos: Partial<Categoria>): Promise<Categoria>;
  eliminar(id: number): Promise<void>;
}
