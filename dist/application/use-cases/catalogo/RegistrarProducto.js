"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarProducto = void 0;
const Producto_1 = require("../../../domain/entities/Producto");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class RegistrarProducto {
    productoRepo;
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    async ejecutar(input) {
        const existeCodigo = await this.productoRepo.buscarPorCodigoBarras(input.codigoBarras.trim());
        if (existeCodigo) {
            throw new errorHandler_1.AppError(`Ya existe un producto registrado con el código de barras '${input.codigoBarras}'.`, 400, 'CODIGO_BARRAS_DUPLICADO');
        }
        const producto = Producto_1.Producto.crear({
            codigoBarras: input.codigoBarras,
            nombre: input.nombre,
            descripcion: input.descripcion,
            categoriaId: input.categoriaId,
            proveedorId: input.proveedorId,
            tipoVenta: input.tipoVenta,
            unidadesPorPaquete: input.unidadesPorPaquete,
            precioPaquete: input.precioPaquete,
            precioLibra: input.precioLibra,
            precioMayorista: input.precioMayorista,
            stockMinimo: input.stockMinimo,
            ivaTarifa: input.ivaTarifa,
        });
        return await this.productoRepo.guardarConStockInicial(producto, input.bodegaIdInicial);
    }
}
exports.RegistrarProducto = RegistrarProducto;
