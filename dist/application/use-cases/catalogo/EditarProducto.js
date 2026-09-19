"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarProducto = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class EditarProducto {
    productoRepo;
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    async ejecutar(id, input) {
        const productoExistente = await this.productoRepo.buscarPorId(id);
        if (!productoExistente) {
            throw new errorHandler_1.AppError(`No se encontró ningún producto con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        if (input.codigoBarras && input.codigoBarras.trim() !== productoExistente.codigoBarras) {
            const duplicado = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras.trim());
            if (duplicado && duplicado.id !== id) {
                throw new errorHandler_1.AppError(`El código de barras '${input.codigoBarras}' ya pertenece a otro producto.`, 400, 'CODIGO_BARRAS_DUPLICADO');
            }
        }
        const datosActualizacion = {
            ...(input.codigoBarras && { codigoBarras: input.codigoBarras.trim() }),
            ...(input.nombre && { nombre: input.nombre.trim() }),
            ...(input.descripcion !== undefined && {
                descripcion: input.descripcion ? input.descripcion.trim() : null,
            }),
            ...(input.categoriaId && { categoriaId: input.categoriaId }),
            ...(input.proveedorId && { proveedorId: input.proveedorId }),
            ...(input.tipoVenta && { tipoVenta: input.tipoVenta }),
            ...(input.unidadesPorPaquete !== undefined && {
                unidadesPorPaquete: input.unidadesPorPaquete,
            }),
            ...(input.precioPaquete !== undefined && { precioPaquete: input.precioPaquete }),
            ...(input.precioLibra !== undefined && { precioLibra: input.precioLibra }),
            ...(input.precioMayorista !== undefined && { precioMayorista: input.precioMayorista }),
            ...(input.stockMinimo !== undefined && { stockMinimo: input.stockMinimo }),
            ...(input.ivaTarifa !== undefined && { ivaTarifa: input.ivaTarifa }),
            ...(input.activo !== undefined && { activo: input.activo }),
        };
        return await this.productoRepo.actualizar(id, datosActualizacion);
    }
}
exports.EditarProducto = EditarProducto;
