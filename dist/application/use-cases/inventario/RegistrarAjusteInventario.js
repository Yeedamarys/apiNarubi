"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarAjusteInventario = void 0;
const Stock_1 = require("../../../domain/entities/Stock");
const MovimientoInventario_1 = require("../../../domain/entities/MovimientoInventario");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class RegistrarAjusteInventario {
    stockRepo;
    movimientoRepo;
    constructor(stockRepo, movimientoRepo) {
        this.stockRepo = stockRepo;
        this.movimientoRepo = movimientoRepo;
    }
    async ejecutar(input) {
        if (!input.motivo || input.motivo.trim().length === 0) {
            throw new errorHandler_1.AppError('El motivo del ajuste de inventario es obligatorio.', 400, 'MOTIVO_REQUERIDO');
        }
        if (input.cantidad === 0) {
            throw new errorHandler_1.AppError('La cantidad del ajuste no puede ser cero.', 400, 'CANTIDAD_INVALIDA');
        }
        const stockActual = await this.stockRepo.buscarPorProductoYBodega(input.productoId, input.bodegaId);
        const cantidadPrevia = stockActual ? stockActual.cantidadDisponible : 0;
        const nuevaCantidad = cantidadPrevia + input.cantidad;
        if (nuevaCantidad < 0) {
            throw new errorHandler_1.AppError(`No se puede realizar el ajuste. El stock actual es ${cantidadPrevia} y el ajuste de ${input.cantidad} resultaría en un stock negativo (${nuevaCantidad}).`, 400, 'STOCK_INSUFICIENTE');
        }
        const stockActualizado = Stock_1.Stock.crear({
            id: stockActual?.id,
            productoId: input.productoId,
            bodegaId: input.bodegaId,
            cantidadDisponible: nuevaCantidad,
        });
        const nuevoStock = await this.stockRepo.guardarOActualizar(stockActualizado);
        const movimiento = MovimientoInventario_1.MovimientoInventario.crear({
            productoId: input.productoId,
            bodegaId: input.bodegaId,
            tipoMovimiento: 'AJUSTE',
            cantidad: input.cantidad,
            referenciaTipo: 'AJUSTE_MANUAL',
            motivo: input.motivo.trim(),
            usuarioId: input.usuarioId,
        });
        const nuevoMovimiento = await this.movimientoRepo.guardar(movimiento);
        return {
            stockActualizado: nuevoStock,
            movimiento: nuevoMovimiento,
        };
    }
}
exports.RegistrarAjusteInventario = RegistrarAjusteInventario;
