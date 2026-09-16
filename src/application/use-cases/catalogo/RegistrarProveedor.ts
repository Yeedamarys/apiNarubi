import { RepositorioProveedorPort } from '../../ports/RepositorioProveedorPort';
import { Proveedor } from '../../../domain/entities/Proveedor';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface RegistrarProveedorInput {
  razonSocial: string;
  ruc: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
}

export class RegistrarProveedor {
  constructor(private readonly proveedorRepo: RepositorioProveedorPort) {}

  public async ejecutar(input: RegistrarProveedorInput): Promise<Proveedor> {
    const existeRuc = await this.proveedorRepo.buscarPorRuc(input.ruc.trim());
    if (existeRuc) {
      throw new AppError(`Ya existe un proveedor registrado con el RUC '${input.ruc}'.`, 400, 'RUC_DUPLICADO');
    }

    const proveedor = Proveedor.crear({
      razonSocial: input.razonSocial,
      ruc: input.ruc,
      telefono: input.telefono,
      email: input.email,
      direccion: input.direccion,
    });

    return await this.proveedorRepo.guardar(proveedor);
  }
}
