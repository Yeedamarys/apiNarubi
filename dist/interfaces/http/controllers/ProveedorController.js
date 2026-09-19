"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorController = void 0;
const RegistrarProveedor_1 = require("../../../application/use-cases/catalogo/RegistrarProveedor");
const ListarProveedores_1 = require("../../../application/use-cases/catalogo/ListarProveedores");
const PrismaProveedorRepository_1 = require("../../../infrastructure/persistence/PrismaProveedorRepository");
const registrarProveedor_dto_1 = require("../dtos/registrarProveedor.dto");
const proveedorRepo = new PrismaProveedorRepository_1.PrismaProveedorRepository();
const registrarProveedorUseCase = new RegistrarProveedor_1.RegistrarProveedor(proveedorRepo);
const listarProveedoresUseCase = new ListarProveedores_1.ListarProveedores(proveedorRepo);
class ProveedorController {
    async registrar(req, res, next) {
        try {
            const validBody = registrarProveedor_dto_1.registrarProveedorSchema.parse(req.body);
            const nuevoProveedor = await registrarProveedorUseCase.ejecutar(validBody);
            res.status(201).json({
                mensaje: 'Proveedor registrado exitosamente.',
                proveedor: nuevoProveedor,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listar(_req, res, next) {
        try {
            const proveedores = await listarProveedoresUseCase.ejecutar();
            res.status(200).json(proveedores);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProveedorController = ProveedorController;
