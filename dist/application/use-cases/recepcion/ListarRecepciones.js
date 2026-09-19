"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarRecepciones = void 0;
class ListarRecepciones {
    recepcionRepo;
    constructor(recepcionRepo) {
        this.recepcionRepo = recepcionRepo;
    }
    async ejecutar() {
        return await this.recepcionRepo.listar();
    }
}
exports.ListarRecepciones = ListarRecepciones;
