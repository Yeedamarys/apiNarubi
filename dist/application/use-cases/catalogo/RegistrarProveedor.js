"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarProveedor = void 0;
const Proveedor_1 = require("../../../domain/entities/Proveedor");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class RegistrarProveedor {
    proveedorRepo;
    constructor(proveedorRepo) {
        this.proveedorRepo = proveedorRepo;
    }
    async ejecutar(input) {
        const existeRuc = await this.proveedorRepo.buscarPorRuc(input.ruc.trim());
        if (existeRuc) {
            throw new errorHandler_1.AppError(`Ya existe un proveedor registrado con el RUC '${input.ruc}'.`, 400, 'RUC_DUPLICADO');
        }
        const proveedor = Proveedor_1.Proveedor.crear({
            razonSocial: input.razonSocial,
            ruc: input.ruc,
            telefono: input.telefono,
            email: input.email,
            direccion: input.direccion,
        });
        return await this.proveedorRepo.guardar(proveedor);
    }
}
exports.RegistrarProveedor = RegistrarProveedor;
