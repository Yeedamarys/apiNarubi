"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarCategoria = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class EliminarCategoria {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async ejecutar(id) {
        const existente = await this.categoriaRepo.buscarPorId(id);
        if (!existente) {
            throw new errorHandler_1.AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        await this.categoriaRepo.eliminar(id);
    }
}
exports.EliminarCategoria = EliminarCategoria;
