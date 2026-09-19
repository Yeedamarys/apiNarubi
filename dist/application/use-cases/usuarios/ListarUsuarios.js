"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarUsuarios = void 0;
class ListarUsuarios {
    usuarioRepo;
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    async ejecutar() {
        return await this.usuarioRepo.listar();
    }
}
exports.ListarUsuarios = ListarUsuarios;
