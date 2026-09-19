"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecepcionController = void 0;
const RegistrarRecepcion_1 = require("../../../application/use-cases/recepcion/RegistrarRecepcion");
const ListarRecepciones_1 = require("../../../application/use-cases/recepcion/ListarRecepciones");
const PrismaRecepcionRepository_1 = require("../../../infrastructure/persistence/PrismaRecepcionRepository");
const registrarRecepcion_dto_1 = require("../dtos/registrarRecepcion.dto");
const errorHandler_1 = require("../middlewares/errorHandler");
const recepcionRepo = new PrismaRecepcionRepository_1.PrismaRecepcionRepository();
const registrarRecepcionUseCase = new RegistrarRecepcion_1.RegistrarRecepcion(recepcionRepo);
const listarRecepcionesUseCase = new ListarRecepciones_1.ListarRecepciones(recepcionRepo);
class RecepcionController {
    async registrar(req, res, next) {
        try {
            if (!req.usuario) {
                throw new errorHandler_1.AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
            }
            const validBody = registrarRecepcion_dto_1.registrarRecepcionSchema.parse(req.body);
            const nuevaRecepcion = await registrarRecepcionUseCase.ejecutar({
                proveedorId: validBody.proveedorId,
                usuarioId: req.usuario.sub,
                bodegaId: validBody.bodegaId,
                numeroDocumento: validBody.numeroDocumento,
                detalles: validBody.detalles,
            });
            res.status(201).json({
                mensaje: 'Recepción de mercadería registrada exitosamente y stock incrementado en PostgreSQL.',
                recepcion: nuevaRecepcion,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listar(_req, res, next) {
        try {
            const recepciones = await listarRecepcionesUseCase.ejecutar();
            res.status(200).json(recepciones);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RecepcionController = RecepcionController;
