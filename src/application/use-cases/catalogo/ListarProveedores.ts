import { RepositorioProveedorPort } from '../../ports/RepositorioProveedorPort';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class ListarProveedores {
  constructor(private readonly proveedorRepo: RepositorioProveedorPort) {}

  public async ejecutar(): Promise<Proveedor[]> {
    return await this.proveedorRepo.listar();
  }
}
