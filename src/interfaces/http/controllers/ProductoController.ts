import { Request, Response, NextFunction } from 'express';
import { RegistrarProducto } from '../../../application/use-cases/catalogo/RegistrarProducto';
import { ListarProductos } from '../../../application/use-cases/catalogo/ListarProductos';
import { ObtenerProductoPorId } from '../../../application/use-cases/catalogo/ObtenerProductoPorId';
import { EditarProducto } from '../../../application/use-cases/catalogo/EditarProducto';
import { PrismaProductoRepository } from '../../../infrastructure/persistence/PrismaProductoRepository';
import { registrarProductoSchema } from '../dtos/registrarProducto.dto';
import { editarProductoSchema } from '../dtos/editarProducto.dto';

const productoRepo = new PrismaProductoRepository();

const registrarProductoUseCase = new RegistrarProducto(productoRepo);
const listarProductosUseCase = new ListarProductos(productoRepo);
const obtenerProductoPorIdUseCase = new ObtenerProductoPorId(productoRepo);
const editarProductoUseCase = new EditarProducto(productoRepo);

export class ProductoController {
  public async registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validBody = registrarProductoSchema.parse(req.body);
      const nuevoProducto = await registrarProductoUseCase.ejecutar(validBody);

      res.status(201).json({
        mensaje: 'Producto registrado exitosamente e inicializado en el inventario.',
        producto: nuevoProducto,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoriaId = req.query.categoriaId
        ? parseInt(req.query.categoriaId as string, 10)
        : undefined;
      const proveedorId = req.query.proveedorId
        ? parseInt(req.query.proveedorId as string, 10)
        : undefined;
      const tipoVenta = req.query.tipoVenta as string | undefined;
      const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;

      const productos = await listarProductosUseCase.ejecutar({
        categoriaId,
        proveedorId,
        tipoVenta,
        activo,
      });

      res.status(200).json(productos);
    } catch (error) {
      next(error);
    }
  }

  public async obtenerPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const producto = await obtenerProductoPorIdUseCase.ejecutar(id);

      res.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  }

  public async editar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const validBody = editarProductoSchema.parse(req.body);
      const productoEditado = await editarProductoUseCase.ejecutar(id, validBody);

      res.status(200).json({
        mensaje: 'Producto actualizado exitosamente.',
        producto: productoEditado,
      });
    } catch (error) {
      next(error);
    }
  }

  public async cambiarEstado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { activo } = req.body;
      const productoActualizado = await editarProductoUseCase.ejecutar(id, {
        activo: Boolean(activo),
      });

      res.status(200).json({
        mensaje: `Estado del producto actualizado a ${activo ? 'ACTIVO' : 'INACTIVO'}.`,
        producto: productoActualizado,
      });
    } catch (error) {
      next(error);
    }
  }
}
