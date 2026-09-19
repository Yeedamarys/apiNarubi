"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarProveedores = void 0;
class ListarProveedores {
    proveedorRepo;
    constructor(proveedorRepo) {
        this.proveedorRepo = proveedorRepo;
    }
    async ejecutar() {
        return await this.proveedorRepo.listar();
    }
}
exports.ListarProveedores = ListarProveedores;
