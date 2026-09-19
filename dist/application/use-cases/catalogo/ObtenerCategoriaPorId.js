"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerCategoriaPorId = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class ObtenerCategoriaPorId {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async ejecutar(id) {
        const categoria = await this.categoriaRepo.buscarPorId(id);
        if (!categoria) {
            throw new errorHandler_1.AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        return categoria;
    }
}
exports.ObtenerCategoriaPorId = ObtenerCategoriaPorId;
