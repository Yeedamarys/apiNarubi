import { RepositorioVentaPort, VentaConDetalle } from '../../application/ports/RepositorioVentaPort';
import { Venta } from '../../domain/entities/Venta';
import { prisma } from './prismaClient';
import { modalidad_venta_enum as PrismaModalidadVenta } from '@prisma/client';

export class PrismaVentaRepository implements RepositorioVentaPort {
  public async guardarTransaccional(venta: Venta): Promise<VentaConDetalle> {
    return await prisma.$transaction(async (tx) => {
      // 1. Crear la cabecera de la venta
      const rawVenta = await tx.venta.create({
        data: {
          numero_secuencial: venta.numeroSecuencial,
          cliente_id: venta.clienteId,
          usuario_id: venta.usuarioId,
          bodega_id: venta.bodegaId,
          fecha: venta.fecha,
          modalidad_venta: venta.modalidadVenta as PrismaModalidadVenta,
          subtotal: venta.subtotal,
          iva: venta.iva,
          total: venta.total,
          estado: 'REGISTRADA',
        },
      });

      const detallesRes = [];

      // 2. Procesar ítems y descontar stock transaccionalmente
      for (const item of venta.detalles) {
        const cantidad = item.cantidadPaquetes ? item.cantidadPaquetes : Number(item.pesoLibras || 0);
        const itemSubtotal = Number((item.precioAplicado * cantidad).toFixed(2));

        const rawDetalle = await tx.detalle_venta.create({
          data: {
            venta_id: rawVenta.id,
            producto_id: item.productoId,
            cantidad_paquetes: item.cantidadPaquetes,
            peso_libras: item.pesoLibras,
            precio_aplicado: item.precioAplicado,
            subtotal: itemSubtotal,
          },
          include: {
            producto: true,
          },
        });

        // Decrementar stock en PostgreSQL
        await tx.stock.update({
          where: {
            producto_id_bodega_id: {
              producto_id: item.productoId,
              bodega_id: venta.bodegaId,
            },
          },
          data: {
            cantidad_disponible: {
              decrement: cantidad,
            },
            actualizado_en: new Date(),
          },
        });

        // Generar movimiento en Kardex (SALIDA / VENTA)
        await tx.movimiento_inventario.create({
          data: {
            producto_id: item.productoId,
            bodega_id: venta.bodegaId,
            tipo_movimiento: 'SALIDA',
            cantidad: cantidad,
            referencia_id: rawVenta.id,
            referencia_tipo: 'VENTA',
            motivo: `Venta POS #${rawVenta.numero_secuencial}`,
            usuario_id: venta.usuarioId,
          },
        });

        detallesRes.push({
          id: rawDetalle.id,
          productoId: rawDetalle.producto_id,
          nombreProducto: rawDetalle.producto.nombre,
          tipoVenta: rawDetalle.producto.tipo_venta,
          cantidadPaquetes: rawDetalle.cantidad_paquetes,
          pesoLibras: rawDetalle.peso_libras ? Number(rawDetalle.peso_libras) : null,
          precioAplicado: Number(rawDetalle.precio_aplicado),
          subtotal: Number(rawDetalle.subtotal),
        });
      }

      // 3. Crear comprobante electrónico SRI de 49 dígitos
      const claveSri = venta.claveAccesoSri || Venta.generarClaveAccesoSRI(rawVenta.id);
      const rawComprobante = await tx.comprobante_electronico.create({
        data: {
          venta_id: rawVenta.id,
          clave_acceso: claveSri,
          estado: 'PENDIENTE',
        },
      });

      const usuarioObj = await tx.usuario.findUnique({ where: { id: venta.usuarioId } });
      const bodegaObj = await tx.bodega.findUnique({ where: { id: venta.bodegaId } });

      return {
        id: rawVenta.id,
        numeroSecuencial: rawVenta.numero_secuencial,
        clienteId: rawVenta.cliente_id,
        nombreCliente: null,
        usuarioId: rawVenta.usuario_id,
        nombreUsuario: usuarioObj?.nombre_completo || 'Usuario',
        bodegaId: rawVenta.bodega_id,
        nombreBodega: bodegaObj?.nombre || 'Bodega',
        fecha: rawVenta.fecha,
        modalidadVenta: rawVenta.modalidad_venta,
        subtotal: Number(rawVenta.subtotal),
        iva: Number(rawVenta.iva),
        total: Number(rawVenta.total),
        estado: rawVenta.estado,
        claveAccesoSri: rawComprobante.clave_acceso,
        estadoComprobante: rawComprobante.estado,
        detalles: detallesRes,
      };
    });
  }

  public async anularTransaccional(id: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const rawVenta = await tx.venta.findUnique({
        where: { id },
        include: { detalle_venta: true },
      });

      if (!rawVenta) return;

      // Cambiar estado a ANULADA
      await tx.venta.update({
        where: { id },
        data: { estado: 'ANULADA' },
      });

      // Revertir el stock de cada producto
      for (const item of rawVenta.detalle_venta) {
        const cantidad = item.cantidad_paquetes ? item.cantidad_paquetes : Number(item.peso_libras || 0);

        await tx.stock.update({
          where: {
            producto_id_bodega_id: {
              producto_id: item.producto_id,
              bodega_id: rawVenta.bodega_id,
            },
          },
          data: {
            cantidad_disponible: {
              increment: cantidad,
            },
            actualizado_en: new Date(),
          },
        });

        // Registrar movimiento de reversión en Kardex (ENTRADA / VENTA)
        await tx.movimiento_inventario.create({
          data: {
            producto_id: item.producto_id,
            bodega_id: rawVenta.bodega_id,
            tipo_movimiento: 'ENTRADA',
            cantidad: cantidad,
            referencia_id: rawVenta.id,
            referencia_tipo: 'VENTA',
            motivo: `Anulación de Venta #${rawVenta.numero_secuencial}`,
            usuario_id: rawVenta.usuario_id,
          },
        });
      }
    });
  }

  public async listar(): Promise<VentaConDetalle[]> {
    const raws = await prisma.venta.findMany({
      include: {
        cliente: true,
        usuario: true,
        bodega: true,
        comprobante_electronico: true,
        detalle_venta: {
          include: { producto: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });

    return raws.map((raw) => ({
      id: raw.id,
      numeroSecuencial: raw.numero_secuencial,
      clienteId: raw.cliente_id,
      nombreCliente: raw.cliente?.razon_social ?? null,
      usuarioId: raw.usuario_id,
      nombreUsuario: raw.usuario.nombre_completo,
      bodegaId: raw.bodega_id,
      nombreBodega: raw.bodega.nombre,
      fecha: raw.fecha,
      modalidadVenta: raw.modalidad_venta,
      subtotal: Number(raw.subtotal),
      iva: Number(raw.iva),
      total: Number(raw.total),
      estado: raw.estado,
      claveAccesoSri: raw.comprobante_electronico?.clave_acceso ?? null,
      estadoComprobante: raw.comprobante_electronico?.estado ?? null,
      detalles: raw.detalle_venta.map((d) => ({
        id: d.id,
        productoId: d.producto_id,
        nombreProducto: d.producto.nombre,
        tipoVenta: d.producto.tipo_venta,
        cantidadPaquetes: d.cantidad_paquetes,
        pesoLibras: d.peso_libras ? Number(d.peso_libras) : null,
        precioAplicado: Number(d.precio_aplicado),
        subtotal: Number(d.subtotal),
      })),
    }));
  }

  public async buscarPorId(id: number): Promise<VentaConDetalle | null> {
    const raw = await prisma.venta.findUnique({
      where: { id },
      include: {
        cliente: true,
        usuario: true,
        bodega: true,
        comprobante_electronico: true,
        detalle_venta: {
          include: { producto: true },
        },
      },
    });

    if (!raw) return null;

    return {
      id: raw.id,
      numeroSecuencial: raw.numero_secuencial,
      clienteId: raw.cliente_id,
      nombreCliente: raw.cliente?.razon_social ?? null,
      usuarioId: raw.usuario_id,
      nombreUsuario: raw.usuario.nombre_completo,
      bodegaId: raw.bodega_id,
      nombreBodega: raw.bodega.nombre,
      fecha: raw.fecha,
      modalidadVenta: raw.modalidad_venta,
      subtotal: Number(raw.subtotal),
      iva: Number(raw.iva),
      total: Number(raw.total),
      estado: raw.estado,
      claveAccesoSri: raw.comprobante_electronico?.clave_acceso ?? null,
      estadoComprobante: raw.comprobante_electronico?.estado ?? null,
      detalles: raw.detalle_venta.map((d) => ({
        id: d.id,
        productoId: d.producto_id,
        nombreProducto: d.producto.nombre,
        tipoVenta: d.producto.tipo_venta,
        cantidadPaquetes: d.cantidad_paquetes,
        pesoLibras: d.peso_libras ? Number(d.peso_libras) : null,
        precioAplicado: Number(d.precio_aplicado),
        subtotal: Number(d.subtotal),
      })),
    };
  }
}
