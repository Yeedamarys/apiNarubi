import { RepositorioRecepcionPort } from '../../ports/RepositorioRecepcionPort';
import {
  RecepcionMercaderia,
  DetalleRecepcionInput,
} from '../../../domain/entities/RecepcionMercaderia';

export interface RegistrarRecepcionInput {
  proveedorId: number;
  usuarioId: number;
  bodegaId: number;
  numeroDocumento?: string | null;
  detalles: DetalleRecepcionInput[];
}

export class RegistrarRecepcion {
  constructor(private readonly recepcionRepo: RepositorioRecepcionPort) {}

  public async ejecutar(input: RegistrarRecepcionInput): Promise<RecepcionMercaderia> {
    const recepcion = RecepcionMercaderia.crear({
      proveedorId: input.proveedorId,
      usuarioId: input.usuarioId,
      bodegaId: input.bodegaId,
      numeroDocumento: input.numeroDocumento,
      detalles: input.detalles,
    });

    return await this.recepcionRepo.guardarTransaccional(recepcion);
  }
}
