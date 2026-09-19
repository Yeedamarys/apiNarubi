"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarVenta = void 0;
const Venta_1 = require("../../../domain/entities/Venta");
const errorHandler_1 = require("../../../interfaces/http/middlewares/errorHandler");
class RegistrarVenta {
    ventaRepo;
    stockRepo;
    constructor(ventaRepo, stockRepo) {
        this.ventaRepo = ventaRepo;
        this.stockRepo = stockRepo;
    }
    async ejecutar(input) {
        if (!input.detalles || input.detalles.length === 0) {
            throw new errorHandler_1.AppError('La venta debe incluir al menos un producto.', 400, 'DETALLES_REQUERIDOS');
        }
        // 1. Validar disponibilidad de stock por producto (RF-22)
        for (const item of input.detalles) {
            const cantidadSolicitada = item.cantidadPaquetes
                ? item.cantidadPaquetes
                : Number(item.pesoLibras || 0);
            if (cantidadSolicitada <= 0) {
                throw new errorHandler_1.AppError('La cantidad solicitada debe ser mayor a cero.', 400, 'CANTIDAD_INVALIDA');
            }
            const stockActual = await this.stockRepo.buscarPorProductoYBodega(item.productoId, input.bodegaId);
            const disponible = stockActual ? stockActual.cantidadDisponible : 0;
            if (disponible < cantidadSolicitada) {
                throw new errorHandler_1.AppError(`Stock insuficiente para el producto ID ${item.productoId}. Stock disponible: ${disponible}, solicitado: ${cantidadSolicitada}.`, 400, 'STOCK_INSUFICIENTE');
            }
        }
        // 2. Calcular Subtotal, IVA 15% y Total (RF-23)
        let subtotal = 0;
        for (const item of input.detalles) {
            const cantidad = item.cantidadPaquetes ? item.cantidadPaquetes : Number(item.pesoLibras || 0);
            subtotal += item.precioAplicado * cantidad;
        }
        subtotal = Number(subtotal.toFixed(2));
        const iva = Number((subtotal * 0.15).toFixed(2));
        const total = Number((subtotal + iva).toFixed(2));
        const secId = Date.now();
        const numeroSecuencial = `001-001-${String(secId).slice(-9)}`;
        const claveAccesoSri = Venta_1.Venta.generarClaveAccesoSRI(secId);
        const ventaEntity = Venta_1.Venta.crear({
            numeroSecuencial,
            clienteId: input.clienteId,
            usuarioId: input.usuarioId,
            bodegaId: input.bodegaId,
            modalidadVenta: input.modalidadVenta,
            subtotal,
            iva,
            total,
            detalles: input.detalles,
            claveAccesoSri,
        });
        return await this.ventaRepo.guardarTransaccional(ventaEntity);
    }
}
exports.RegistrarVenta = RegistrarVenta;
