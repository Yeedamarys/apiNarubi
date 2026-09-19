import {
  RepositorioMovimientoPort,
  MovimientoKardexDetalle,
} from '../../application/ports/RepositorioMovimientoPort';
import { MovimientoInventario } from '../../domain/entities/MovimientoInventario';
import { prisma } from './prismaClient';
import {
  tipo_movimiento_enum as PrismaTipoMovimiento,
  referencia_movimiento_enum as PrismaReferenciaMovimiento,
} from '@prisma/client';

export class PrismaMovimientoRepository implements RepositorioMovimientoPort {
  public async guardar(movimiento: MovimientoInventario): Promise<MovimientoInventario> {
    const raw = await prisma.movimiento_inventario.create({
      data: {
        producto_id: movimiento.productoId,
        bodega_id: movimiento.bodegaId,
        tipo_movimiento: movimiento.tipoMovimiento as PrismaTipoMovimiento,
        cantidad: movimiento.cantidad,
        referencia_id: movimiento.referenciaId,
        referencia_tipo: movimiento.referenciaTipo as PrismaReferenciaMovimiento,
        motivo: movimiento.motivo,
        usuario_id: movimiento.usuarioId,
      },
    });

    return MovimientoInventario.crear({
      id: raw.id,
      productoId: raw.producto_id,
      bodegaId: raw.bodega_id,
      tipoMovimiento: raw.tipo_movimiento as any,
      cantidad: Number(raw.cantidad),
      referenciaId: raw.referencia_id,
      referenciaTipo: raw.referencia_tipo as any,
      motivo: raw.motivo,
      fecha: raw.fecha,
      usuarioId: raw.usuario_id,
    });
  }

  public async listarPorProducto(
    productoId: number,
    bodegaId?: number
  ): Promise<MovimientoKardexDetalle[]> {
    const raws = await prisma.movimiento_inventario.findMany({
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
