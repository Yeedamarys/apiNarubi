"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerUsuarioPorId = void 0;
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class ObtenerUsuarioPorId {
    usuarioRepo;
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    async ejecutar(id) {
        const usuario = await this.usuarioRepo.buscarPorId(id);
        if (!usuario) {
            throw new errorHandler_1.AppError(`No se encontró ningún usuario con el ID ${id}.`, 404, 'NOT_FOUND');
        }
        return usuario;
    }
}
exports.ObtenerUsuarioPorId = ObtenerUsuarioPorId;
