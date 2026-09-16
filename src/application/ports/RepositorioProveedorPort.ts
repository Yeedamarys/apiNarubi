import { Proveedor } from '../../domain/entities/Proveedor';

export interface RepositorioProveedorPort {
  buscarPorId(id: number): Promise<Proveedor | null>;
  buscarPorRuc(ruc: string): Promise<Proveedor | null>;
  guardar(proveedor: Proveedor): Promise<Proveedor>;
  listar(): Promise<Proveedor[]>;
  actualizar(id: number, datos: Partial<Proveedor>): Promise<Proveedor>;
}
