"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRecepcionRepository = void 0;
const RecepcionMercaderia_1 = require("../../domain/entities/RecepcionMercaderia");
const prismaClient_1 = require("./prismaClient");
class PrismaRecepcionRepository {
    async guardarTransaccional(recepcion) {
        return await prismaClient_1.prisma.$transaction(async (tx) => {
            // 1. Crear cabecera de recepcion_mercaderia
            const rawCabecera = await tx.recepcion_mercaderia.create({
                data: {
                    proveedor_id: recepcion.proveedorId,
                    usuario_id: recepcion.usuarioId,
                    bodega_id: recepcion.bodegaId,
                    fecha: recepcion.fecha,
                    numero_documento: recepcion.numeroDocumento,
                },
            });
            // 2. Procesar cada detalle de recepcion
            for (const item of recepcion.detalles) {
                await tx.detalle_recepcion.create({
                    data: {
                        recepcion_id: rawCabecera.id,
                        producto_id: item.productoId,
                        cantidad_paquetes: item.cantidadPaquetes,
                        peso_libras: item.pesoLibras,
                        costo_unitario: item.costoUnitario,
                    },
                });
                const cantidadSumar = item.cantidadPaquetes
                    ? item.cantidadPaquetes
                    : Number(item.pesoLibras || 0);
                // Incrementar stock en PostgreSQL
                await tx.stock.upsert({
                    where: {
                        producto_id_bodega_id: {
                            producto_id: item.productoId,
                            bodega_id: recepcion.bodegaId,
                        },
                    },
                    update: {
                        cantidad_disponible: {
                            increment: cantidadSumar,
                        },
                        actualizado_en: new Date(),
                    },
                    create: {
                        producto_id: item.productoId,
                        bodega_id: recepcion.bodegaId,
                        cantidad_disponible: cantidadSumar,
                    },
                });
                // Registrar movimiento de Kardex (ENTRADA / RECEPCION)
                await tx.movimiento_inventario.create({
                    data: {
                        producto_id: item.productoId,
                        bodega_id: recepcion.bodegaId,
                        tipo_movimiento: 'ENTRADA',
                        cantidad: cantidadSumar,
                        referencia_id: rawCabecera.id,
                        referencia_tipo: 'RECEPCION',
                        motivo: `Recepción de mercadería de proveedor ID ${recepcion.proveedorId}`,
                        usuario_id: recepcion.usuarioId,
                    },
                });
            }
            return RecepcionMercaderia_1.RecepcionMercaderia.crear({
                id: rawCabecera.id,
                proveedorId: rawCabecera.proveedor_id,
                usuarioId: rawCabecera.usuario_id,
                bodegaId: rawCabecera.bodega_id,
                fecha: rawCabecera.fecha,
                numeroDocumento: rawCabecera.numero_documento,
                detalles: recepcion.detalles,
            });
        });
    }
    async listar() {
        const raws = await prismaClient_1.prisma.recepcion_mercaderia.findMany({
            include: {
                proveedor: true,
                bodega: true,
                usuario: true,
                detalle_recepcion: {
                    include: {
                        producto: true,
                    },
                },
            },
            orderBy: { fecha: 'desc' },
        });
        return raws.map((raw) => ({
            id: raw.id,
            proveedorId: raw.proveedor_id,
            razonSocialProveedor: raw.proveedor.razon_social,
            bodegaId: raw.bodega_id,
            nombreBodega: raw.bodega.nombre,
            usuarioId: raw.usuario_id,
            nombreUsuario: raw.usuario.nombre_completo,
            fecha: raw.fecha,
            numeroDocumento: raw.numero_documento,
            detalles: raw.detalle_recepcion.map((d) => ({
                id: d.id,
                productoId: d.producto_id,
                nombreProducto: d.producto.nombre,
                tipoVenta: d.producto.tipo_venta,
                cantidadPaquetes: d.cantidad_paquetes,
                pesoLibras: d.peso_libras ? Number(d.peso_libras) : null,
                costoUnitario: d.costo_unitario ? Number(d.costo_unitario) : null,
            })),
        }));
    }
    async buscarPorId(id) {
        const raw = await prismaClient_1.prisma.recepcion_mercaderia.findUnique({
            where: { id },
            include: {
                proveedor: true,
                bodega: true,
                usuario: true,
                detalle_recepcion: {
                    include: {
                        producto: true,
                    },
                },
            },
        });
        if (!raw)
            return null;
        return {
            id: raw.id,
            proveedorId: raw.proveedor_id,
            razonSocialProveedor: raw.proveedor.razon_social,
            bodegaId: raw.bodega_id,
            nombreBodega: raw.bodega.nombre,
            usuarioId: raw.usuario_id,
            nombreUsuario: raw.usuario.nombre_completo,
            fecha: raw.fecha,
            numeroDocumento: raw.numero_documento,
            detalles: raw.detalle_recepcion.map((d) => ({
                id: d.id,
                productoId: d.producto_id,
                nombreProducto: d.producto.nombre,
                tipoVenta: d.producto.tipo_venta,
                cantidadPaquetes: d.cantidad_paquetes,
                pesoLibras: d.peso_libras ? Number(d.peso_libras) : null,
                costoUnitario: d.costo_unitario ? Number(d.costo_unitario) : null,
            })),
        };
    }
}
exports.PrismaRecepcionRepository = PrismaRecepcionRepository;
