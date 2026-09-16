import { Request, Response, NextFunction } from 'express';
import { RegistrarProveedor } from '../../../application/use-cases/catalogo/RegistrarProveedor';
import { ListarProveedores } from '../../../application/use-cases/catalogo/ListarProveedores';
import { PrismaProveedorRepository } from '../../../infrastructure/persistence/PrismaProveedorRepository';
import { registrarProveedorSchema } from '../dtos/registrarProveedor.dto';

const proveedorRepo = new PrismaProveedorRepository();

const registrarProveedorUseCase = new RegistrarProveedor(proveedorRepo);
const listarProveedoresUseCase = new ListarProveedores(proveedorRepo);

export class ProveedorController {
  public async registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validBody = registrarProveedorSchema.parse(req.body);
      const nuevoProveedor = await registrarProveedorUseCase.ejecutar(validBody);

      res.status(201).json({
        mensaje: 'Proveedor registrado exitosamente.',
        proveedor: nuevoProveedor,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const proveedores = await listarProveedoresUseCase.ejecutar();
      res.status(200).json(proveedores);
    } catch (error) {
      next(error);
    }
  }
}
