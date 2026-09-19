"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioController = void 0;
const RegistrarAjusteInventario_1 = require("../../../application/use-cases/inventario/RegistrarAjusteInventario");
const PrismaStockRepository_1 = require("../../../infrastructure/persistence/PrismaStockRepository");
const PrismaMovimientoRepository_1 = require("../../../infrastructure/persistence/PrismaMovimientoRepository");
const ajusteInventario_dto_1 = require("../dtos/ajusteInventario.dto");
const errorHandler_1 = require("../middlewares/errorHandler");
const stockRepo = new PrismaStockRepository_1.PrismaStockRepository();
const movimientoRepo = new PrismaMovimientoRepository_1.PrismaMovimientoRepository();
const registrarAjusteUseCase = new RegistrarAjusteInventario_1.RegistrarAjusteInventario(stockRepo, movimientoRepo);
class InventarioController {
    async registrarAjuste(req, res, next) {
        try {
            if (!req.usuario) {
                throw new errorHandler_1.AppError('Usuario no autenticado.', 401, 'UNAUTHORIZED');
            }
            const validBody = ajusteInventario_dto_1.registrarAjusteSchema.parse(req.body);
            const resultado = await registrarAjusteUseCase.ejecutar({
                productoId: validBody.productoId,
                bodegaId: validBody.bodegaId,
                cantidad: validBody.cantidad,
                motivo: validBody.motivo,
                usuarioId: req.usuario.sub,
            });
            res.status(201).json({
                mensaje: 'Ajuste manual de inventario registrado exitosamente.',
                stockActualizado: {
                    productoId: resultado.stockActualizado.productoId,
                    bodegaId: resultado.stockActualizado.bodegaId,
                    cantidadDisponible: resultado.stockActualizado.cantidadDisponible,
                    actualizadoEn: resultado.stockActualizado.actualizadoEn,
                },
                movimientoKardex: {
                    id: resultado.movimiento.id,
                    tipoMovimiento: resultado.movimiento.tipoMovimiento,
                    cantidad: resultado.movimiento.cantidad,
                    referenciaTipo: resultado.movimiento.referenciaTipo,
                    motivo: resultado.movimiento.motivo,
                    fecha: resultado.movimiento.fecha,
                    usuarioId: resultado.movimiento.usuarioId,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.InventarioController = InventarioController;
