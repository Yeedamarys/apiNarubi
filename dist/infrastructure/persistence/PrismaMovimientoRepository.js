"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMovimientoRepository = void 0;
const MovimientoInventario_1 = require("../../domain/entities/MovimientoInventario");
const prismaClient_1 = require("./prismaClient");
class PrismaMovimientoRepository {
    async guardar(movimiento) {
        const raw = await prismaClient_1.prisma.movimiento_inventario.create({
            data: {
                producto_id: movimiento.productoId,
                bodega_id: movimiento.bodegaId,
                tipo_movimiento: movimiento.tipoMovimiento,
                cantidad: movimiento.cantidad,
                referencia_id: movimiento.referenciaId,
                referencia_tipo: movimiento.referenciaTipo,
                motivo: movimiento.motivo,
                usuario_id: movimiento.usuarioId,
            },
        });
        return MovimientoInventario_1.MovimientoInventario.crear({
            id: raw.id,
            productoId: raw.producto_id,
            bodegaId: raw.bodega_id,
            tipoMovimiento: raw.tipo_movimiento,
            cantidad: Number(raw.cantidad),
            referenciaId: raw.referencia_id,
            referenciaTipo: raw.referencia_tipo,
            motivo: raw.motivo,
            fecha: raw.fecha,
            usuarioId: raw.usuario_id,
        });
    }
    async listarPorProducto(productoId, bodegaId) {
        const raws = await prismaClient_1.prisma.movimiento_inventario.findMany({
            where: {
                producto_id: productoId,
                ...(bodegaId && { bodega_id: bodegaId }),
            },
            include: {
                producto: true,
                bodega: true,
                usuario: true,
            },
            orderBy: {
                fecha: 'asc',
            },
        });
        return raws.map((raw) => ({
            id: raw.id,
            productoId: raw.producto_id,
            nombreProducto: raw.producto.nombre,
            bodegaId: raw.bodega_id,
            nombreBodega: raw.bodega.nombre,
            tipoMovimiento: raw.tipo_movimiento,
            cantidad: Number(raw.cantidad),
            referenciaId: raw.referencia_id,
            referenciaTipo: raw.referencia_tipo,
            motivo: raw.motivo,
            fecha: raw.fecha,
            usuarioId: raw.usuario_id,
            nombreUsuario: raw.usuario.nombre_completo,
        }));
    }
}
exports.PrismaMovimientoRepository = PrismaMovimientoRepository;
