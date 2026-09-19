"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const RegistrarProducto_1 = require("../../../application/use-cases/catalogo/RegistrarProducto");
const ListarProductos_1 = require("../../../application/use-cases/catalogo/ListarProductos");
const ObtenerProductoPorId_1 = require("../../../application/use-cases/catalogo/ObtenerProductoPorId");
const EditarProducto_1 = require("../../../application/use-cases/catalogo/EditarProducto");
const PrismaProductoRepository_1 = require("../../../infrastructure/persistence/PrismaProductoRepository");
const registrarProducto_dto_1 = require("../dtos/registrarProducto.dto");
const editarProducto_dto_1 = require("../dtos/editarProducto.dto");
const productoRepo = new PrismaProductoRepository_1.PrismaProductoRepository();
const registrarProductoUseCase = new RegistrarProducto_1.RegistrarProducto(productoRepo);
const listarProductosUseCase = new ListarProductos_1.ListarProductos(productoRepo);
const obtenerProductoPorIdUseCase = new ObtenerProductoPorId_1.ObtenerProductoPorId(productoRepo);
const editarProductoUseCase = new EditarProducto_1.EditarProducto(productoRepo);
class ProductoController {
    async registrar(req, res, next) {
        try {
            const validBody = registrarProducto_dto_1.registrarProductoSchema.parse(req.body);
            const nuevoProducto = await registrarProductoUseCase.ejecutar(validBody);
            res.status(201).json({
                mensaje: 'Producto registrado exitosamente e inicializado en el inventario.',
                producto: nuevoProducto,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listar(req, res, next) {
        try {
            const categoriaId = req.query.categoriaId
                ? parseInt(req.query.categoriaId, 10)
                : undefined;
            const proveedorId = req.query.proveedorId
                ? parseInt(req.query.proveedorId, 10)
                : undefined;
            const tipoVenta = req.query.tipoVenta;
            const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;
            const productos = await listarProductosUseCase.ejecutar({
                categoriaId,
                proveedorId,
                tipoVenta,
                activo,
            });
            res.status(200).json(productos);
        }
        catch (error) {
            next(error);
        }
    }
    async obtenerPorId(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const producto = await obtenerProductoPorIdUseCase.ejecutar(id);
            res.status(200).json(producto);
        }
        catch (error) {
            next(error);
        }
    }
    async editar(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const validBody = editarProducto_dto_1.editarProductoSchema.parse(req.body);
            const productoEditado = await editarProductoUseCase.ejecutar(id, validBody);
            res.status(200).json({
                mensaje: 'Producto actualizado exitosamente.',
                producto: productoEditado,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async cambiarEstado(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductoController = ProductoController;
