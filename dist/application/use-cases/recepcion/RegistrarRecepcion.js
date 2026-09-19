"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarRecepcion = void 0;
const RecepcionMercaderia_1 = require("../../../domain/entities/RecepcionMercaderia");
class RegistrarRecepcion {
    recepcionRepo;
    constructor(recepcionRepo) {
        this.recepcionRepo = recepcionRepo;
    }
    async ejecutar(input) {
        const recepcion = RecepcionMercaderia_1.RecepcionMercaderia.crear({
            proveedorId: input.proveedorId,
            usuarioId: input.usuarioId,
            bodegaId: input.bodegaId,
            numeroDocumento: input.numeroDocumento,
            detalles: input.detalles,
        });
        return await this.recepcionRepo.guardarTransaccional(recepcion);
    }
}
exports.RegistrarRecepcion = RegistrarRecepcion;
