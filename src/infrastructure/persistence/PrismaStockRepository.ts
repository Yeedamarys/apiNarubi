import {
  RepositorioStockPort,
  StockConDetalle,
  AlertaStock,
} from '../../application/ports/RepositorioStockPort';
import { Stock } from '../../domain/entities/Stock';
import { prisma } from './prismaClient';

export class PrismaStockRepository implements RepositorioStockPort {
  public async buscarPorProductoYBodega(
    productoId: number,
    bodegaId: number
  ): Promise<Stock | null> {
    const raw = await prisma.stock.findUnique({
      where: {
        producto_id_bodega_id: {
          producto_id: productoId,
          bodega_id: bodegaId,
        },
      },
    });

    if (!raw) return null;

    return Stock.crear({
      id: raw.id,
      productoId: raw.producto_id,
      bodegaId: raw.bodega_id,
      cantidadDisponible: Number(raw.cantidad_disponible),
      actualizadoEn: raw.actualizado_en,
    });
  }

  public async guardarOActualizar(stock: Stock): Promise<Stock> {
    const raw = await prisma.stock.upsert({
      where: {
        producto_id_bodega_id: {
          producto_id: stock.productoId,
          bodega_id: stock.bodegaId,
        },
      },
      update: {
        cantidad_disponible: stock.cantidadDisponible,
        actualizado_en: new Date(),
      },
      create: {
        producto_id: stock.productoId,
        bodega_id: stock.bodegaId,
        cantidad_disponible: stock.cantidadDisponible,
      },
    });

    return Stock.crear({
      id: raw.id,
      productoId: raw.producto_id,
      bodegaId: raw.bodega_id,
      cantidadDisponible: Number(raw.cantidad_disponible),
      actualizadoEn: raw.actualizado_en,
    });
  }

  public async listarStockConDetalle(bodegaId?: number): Promise<StockConDetalle[]> {
    const raws = await prisma.stock.findMany({
      where: {
        ...(bodegaId && { bodega_id: bodegaId }),
      },
      include: {
        producto: true,
        bodega: true,
      },
      orderBy: {
        producto_id: 'asc',
      },
    });

    return raws.map((raw) => {
      const cantidad = Number(raw.cantidad_disponible);
      const esPaquete = raw.producto.tipo_venta === 'PAQUETE';
      const unidadMedida = esPaquete
        ? `${Math.floor(cantidad)} paquetes`
        : `${cantidad.toFixed(2)} libras`;

      return {
        id: raw.id,
        productoId: raw.producto_id,
        codigoBarras: raw.producto.codigo_barras,
        nombreProducto: raw.producto.nombre,
        tipoVenta: raw.producto.tipo_venta,
        bodegaId: raw.bodega_id,
        nombreBodega: raw.bodega.nombre,
        cantidadDisponible: cantidad,
        unidadMedida,
        stockMinimo: Number(raw.producto.stock_minimo),
        actualizadoEn: raw.actualizado_en,
      };
    });
  }

  public async listarAlertas(): Promise<AlertaStock[]> {
    const raws = await prisma.stock.findMany({
      include: {
        producto: true,
        bodega: true,
      },
    });

    const alertas = raws.filter(
      (raw) => Number(raw.cantidad_disponible) <= Number(raw.producto.stock_minimo)
    );

    return alertas.map((raw) => {
      const cantidad = Number(raw.cantidad_disponible);
      const esPaquete = raw.producto.tipo_venta === 'PAQUETE';
      const unidadMedida = esPaquete
        ? `${Math.floor(cantidad)} paquetes`
        : `${cantidad.toFixed(2)} libras`;

      return {
        productoId: raw.producto_id,
        codigoBarras: raw.producto.codigo_barras,
        nombreProducto: raw.producto.nombre,
        tipoVenta: raw.producto.tipo_venta,
        bodegaId: raw.bodega_id,
        nombreBodega: raw.bodega.nombre,
        cantidadDisponible: cantidad,
        unidadMedida,
        stockMinimo: Number(raw.producto.stock_minimo),
      };
    });
  }
}
