"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerProductoPorId = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class ObtenerProductoPorId {
    productoRepo;
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    async ejecutar(id) {
        const producto = await this.productoRepo.buscarPorId(id);
        if (!producto) {
            throw new errorHandler_1.AppError(`No se encontró ningún producto con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        return producto;
    }
}
exports.ObtenerProductoPorId = ObtenerProductoPorId;
