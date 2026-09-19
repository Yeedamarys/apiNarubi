"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearCategoria = void 0;
const Categoria_1 = require("../../../domain/entities/Categoria");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class CrearCategoria {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async ejecutar(input) {
        const existe = await this.categoriaRepo.buscarPorNombre(input.nombre.trim());
        if (existe) {
            throw new errorHandler_1.AppError(`Ya existe una categoría registrada con el nombre '${input.nombre}'.`, 400, 'CATEGORIA_DUPLICADA');
        }
        const categoria = Categoria_1.Categoria.crear({
            nombre: input.nombre,
            descripcion: input.descripcion,
        });
        return await this.categoriaRepo.guardar(categoria);
    }
}
exports.CrearCategoria = CrearCategoria;
