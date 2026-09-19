"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarVentas = void 0;
class ListarVentas {
    ventaRepo;
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
    }
    async ejecutar() {
        return await this.ventaRepo.listar();
    }
}
exports.ListarVentas = ListarVentas;
