"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarCategoria = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class EditarCategoria {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async ejecutar(id, input) {
        const existente = await this.categoriaRepo.buscarPorId(id);
        if (!existente) {
            throw new errorHandler_1.AppError(`No se encontró ninguna categoría con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        if (input.nombre && input.nombre.trim().toLowerCase() !== existente.nombre.toLowerCase()) {
            const duplicado = await this.categoriaRepo.buscarPorNombre(input.nombre.trim());
            if (duplicado && duplicado.id !== id) {
                throw new errorHandler_1.AppError(`Ya existe otra categoría registrada con el nombre '${input.nombre}'.`, 400, 'CATEGORIA_DUPLICADA');
            }
        }
        const datosActualizacion = {
            ...(input.nombre && { nombre: input.nombre.trim() }),
            ...(input.descripcion !== undefined && {
                descripcion: input.descripcion ? input.descripcion.trim() : null,
            }),
        };
        return await this.categoriaRepo.actualizar(id, datosActualizacion);
    }
}
exports.EditarCategoria = EditarCategoria;
