import { RepositorioRecepcionPort, RecepcionConDetalle } from '../../ports/RepositorioRecepcionPort';

export class ListarRecepciones {
  constructor(private readonly recepcionRepo: RepositorioRecepcionPort) {}

  public async ejecutar(): Promise<RecepcionConDetalle[]> {
    return await this.recepcionRepo.listar();
  }
}
