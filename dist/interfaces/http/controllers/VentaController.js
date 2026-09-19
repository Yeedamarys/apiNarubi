"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaController = void 0;
const RegistrarVenta_1 = require("../../../application/use-cases/ventas/RegistrarVenta");
const ListarVentas_1 = require("../../../application/use-cases/ventas/ListarVentas");
const AnularVenta_1 = require("../../../application/use-cases/ventas/AnularVenta");
const PrismaVentaRepository_1 = require("../../../infrastructure/persistence/PrismaVentaRepository");
const PrismaStockRepository_1 = require("../../../infrastructure/persistence/PrismaStockRepository");
const registrarVenta_dto_1 = require("../dtos/registrarVenta.dto");
const errorHandler_1 = require("../middlewares/errorHandler");
const ventaRepo = new PrismaVentaRepository_1.PrismaVentaRepository();
const stockRepo = new PrismaStockRepository_1.PrismaStockRepository();
const registrarVentaUseCase = new RegistrarVenta_1.RegistrarVenta(ventaRepo, stockRepo);
const listarVentasUseCase = new ListarVentas_1.ListarVentas(ventaRepo);
const anularVentaUseCase = new AnularVenta_1.AnularVenta(ventaRepo);
class VentaController {
    async registrar(req, res, next) {
        try {
            if (!req.usuario) {
                throw new errorHandler_1.AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
            }
            const validBody = registrarVenta_dto_1.registrarVentaSchema.parse(req.body);
            const nuevaVenta = await registrarVentaUseCase.ejecutar({
                clienteId: validBody.clienteId,
                usuarioId: req.usuario.sub,
                bodegaId: validBody.bodegaId,
                modalidadVenta: validBody.modalidadVenta,
                detalles: validBody.detalles,
            });
            res.status(201).json({
                mensaje: 'Venta registrada exitosamente, stock actualizado y comprobante electrónico SRI generado.',
                venta: nuevaVenta,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listar(_req, res, next) {
        try {
            const ventas = await listarVentasUseCase.ejecutar();
            res.status(200).json(ventas);
        }
        catch (error) {
            next(error);
        }
    }
    async obtenerPorId(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const venta = await ventaRepo.buscarPorId(id);
            if (!venta) {
                throw new errorHandler_1.AppError(`No se encontró la venta con ID ${id}.`, 404, 'NOT_FOUND');
            }
            res.status(200).json(venta);
        }
        catch (error) {
            next(error);
        }
    }
    async anular(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            await anularVentaUseCase.ejecutar(id);
            res.status(200).json({
                mensaje: `Venta con ID ${id} anulada exitosamente y stock devuelto a PostgreSQL.`,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VentaController = VentaController;
