"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarCategorias = void 0;
class ListarCategorias {
    categoriaRepo;
    constructor(categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }
    async ejecutar() {
        return await this.categoriaRepo.listar();
    }
}
exports.ListarCategorias = ListarCategorias;
