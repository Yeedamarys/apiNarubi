"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarProductos = void 0;
class ListarProductos {
    productoRepo;
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    async ejecutar(filtros) {
        return await this.productoRepo.listar(filtros);
    }
}
exports.ListarProductos = ListarProductos;
