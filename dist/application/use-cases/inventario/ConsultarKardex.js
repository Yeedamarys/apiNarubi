"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultarKardex = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class ConsultarKardex {
    movimientoRepo;
    constructor(movimientoRepo) {
        this.movimientoRepo = movimientoRepo;
    }
    async ejecutar(productoId, bodegaId) {
        if (!productoId || productoId <= 0) {
            throw new errorHandler_1.AppError('El ID del producto es inválido.', 400, 'INVALID_PRODUCT_ID');
        }
        return await this.movimientoRepo.listarPorProducto(productoId, bodegaId);
    }
}
exports.ConsultarKardex = ConsultarKardex;
