"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnularVenta = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class AnularVenta {
    ventaRepo;
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
    }
    async ejecutar(id) {
        const venta = await this.ventaRepo.buscarPorId(id);
        if (!venta) {
            throw new errorHandler_1.AppError(`No se encontró la venta con ID ${id}.`, 404, 'NOT_FOUND');
        }
        if (venta.estado === 'ANULADA') {
            throw new errorHandler_1.AppError(`La venta ID ${id} ya se encuentra anulada.`, 400, 'VENTA_YA_ANULADA');
        }
        await this.ventaRepo.anularTransaccional(id);
    }
}
exports.AnularVenta = AnularVenta;
