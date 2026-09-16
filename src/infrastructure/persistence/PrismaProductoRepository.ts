import { RepositorioProductoPort, FiltrosProducto, ProductoConDetalle } from '../../application/ports/RepositorioProductoPort';
import { Producto, TipoVentaProducto } from '../../domain/entities/Producto';
import { prisma } from './prismaClient';
import { tipo_venta_enum as PrismaTipoVenta } from '@prisma/client';
import { AppError } from '../../interfaces/http/middlewares/errorHandler';

export class PrismaProductoRepository implements RepositorioProductoPort {
  public async buscarPorId(id: number): Promise<Producto | null> {
    const raw = await prisma.producto.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return Producto.crear({
      id: raw.id,
      codigoBarras: raw.codigo_barras,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
      categoriaId: raw.categoria_id,
      proveedorId: raw.proveedor_id,
      tipoVenta: raw.tipo_venta as TipoVentaProducto,
      unidadesPorPaquete: raw.unidades_por_paquete,
      precioPaquete: raw.precio_paquete ? Number(raw.precio_paquete) : null,
      precioLibra: raw.precio_libra ? Number(raw.precio_libra) : null,
      precioMayorista: raw.precio_mayorista ? Number(raw.precio_mayorista) : null,
      stockMinimo: Number(raw.stock_minimo),
      ivaTarifa: Number(raw.iva_tarifa),
      activo: raw.activo,
    });
  }

  public async buscarPorCodigoBarras(codigoBarras: string): Promise<Producto | null> {
    const raw = await prisma.producto.findUnique({
      where: { codigo_barras: codigoBarras },
    });

    if (!raw) return null;

    return Producto.crear({
      id: raw.id,
      codigoBarras: raw.codigo_barras,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
      categoriaId: raw.categoria_id,
      proveedorId: raw.proveedor_id,
      tipoVenta: raw.tipo_venta as TipoVentaProducto,
      unidadesPorPaquete: raw.unidades_por_paquete,
      precioPaquete: raw.precio_paquete ? Number(raw.precio_paquete) : null,
      precioLibra: raw.precio_libra ? Number(raw.precio_libra) : null,
      precioMayorista: raw.precio_mayorista ? Number(raw.precio_mayorista) : null,
      stockMinimo: Number(raw.stock_minimo),
      ivaTarifa: Number(raw.iva_tarifa),
      activo: raw.activo,
    });
  }

  public async guardarConStockInicial(producto: Producto, bodegaIdInicial?: number): Promise<Producto> {
    // 1. Validar existencia de Categoría
    const categoriaExiste = await prisma.categoria.findUnique({ where: { id: producto.categoriaId } });
    if (!categoriaExiste) {
      throw new AppError(
        `No existe ninguna categoría registrada con el ID ${producto.categoriaId}. Por favor, ingresa una categoría válida o créala en /api/categorias.`,
        400,
        'CATEGORIA_NO_ENCONTRADA'
      );
    }

    // 2. Validar existencia de Proveedor
    const proveedorExiste = await prisma.proveedor.findUnique({ where: { id: producto.proveedorId } });
    if (!proveedorExiste) {
      throw new AppError(
        `No existe ningún proveedor registrado con el ID ${producto.proveedorId}. Por favor, ingresa un proveedor válido o créalo en /api/proveedores.`,
        400,
        'PROVEEDOR_NO_ENCONTRADO'
      );
    }

    try {
      return await prisma.$transaction(async (tx) => {
        const rawProd = await tx.producto.create({
          data: {
            codigo_barras: producto.codigoBarras,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria_id: producto.categoriaId,
            proveedor_id: producto.proveedorId,
            tipo_venta: producto.tipoVenta as PrismaTipoVenta,
            unidades_por_paquete: producto.unidadesPorPaquete,
            precio_paquete: producto.precioPaquete,
            precio_libra: producto.precioLibra,
            precio_mayorista: producto.precioMayorista,
            stock_minimo: producto.stockMinimo,
            iva_tarifa: producto.ivaTarifa,
            activo: producto.activo,
          },
        });

        // Obtener bodega inicial o usar/crear la primera bodega registrada
        let targetBodegaId = bodegaIdInicial;
        if (!targetBodegaId) {
          const primeraBodega = await tx.bodega.findFirst();
          if (primeraBodega) {
            targetBodegaId = primeraBodega.id;
          } else {
            const nuevaBodega = await tx.bodega.create({
              data: {
                nombre: 'Bodega Principal',
                direccion: 'Matriz Principal',
              },
            });
            targetBodegaId = nuevaBodega.id;
          }
        }

        // Inicializar el registro de stock en 0 para esa bodega
        await tx.stock.create({
          data: {
            producto_id: rawProd.id,
            bodega_id: targetBodegaId,
            cantidad_disponible: 0,
          },
        });

        return Producto.crear({
          id: rawProd.id,
          codigoBarras: rawProd.codigo_barras,
          nombre: rawProd.nombre,
          descripcion: rawProd.descripcion,
          categoriaId: rawProd.categoria_id,
          proveedorId: rawProd.proveedor_id,
          tipoVenta: rawProd.tipo_venta as TipoVentaProducto,
          unidadesPorPaquete: rawProd.unidades_por_paquete,
          precioPaquete: rawProd.precio_paquete ? Number(rawProd.precio_paquete) : null,
          precioLibra: rawProd.precio_libra ? Number(rawProd.precio_libra) : null,
          precioMayorista: rawProd.precio_mayorista ? Number(rawProd.precio_mayorista) : null,
          stockMinimo: Number(rawProd.stock_minimo),
          ivaTarifa: Number(rawProd.iva_tarifa),
          activo: rawProd.activo,
        });
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new AppError(`El código de barras '${producto.codigoBarras}' ya pertenece a otro producto.`, 400, 'CODIGO_BARRAS_DUPLICADO');
      }
      throw error;
    }
  }

  public async listar(filtros?: FiltrosProducto): Promise<ProductoConDetalle[]> {
    const raws = await prisma.producto.findMany({
      where: {
        ...(filtros?.categoriaId && { categoria_id: filtros.categoriaId }),
        ...(filtros?.proveedorId && { proveedor_id: filtros.proveedorId }),
        ...(filtros?.tipoVenta && { tipo_venta: filtros.tipoVenta as PrismaTipoVenta }),
        ...(filtros?.activo !== undefined && { activo: filtros.activo }),
      },
      include: {
        categoria: true,
        proveedor: true,
      },
      orderBy: { id: 'asc' },
    });

    return raws.map((raw) => ({
      id: raw.id,
      codigoBarras: raw.codigo_barras,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
      categoriaId: raw.categoria_id,
      nombreCategoria: raw.categoria.nombre,
      proveedorId: raw.proveedor_id,
      razonSocialProveedor: raw.proveedor.razon_social,
      tipoVenta: raw.tipo_venta,
      unidadesPorPaquete: raw.unidades_por_paquete,
      precioPaquete: raw.precio_paquete ? Number(raw.precio_paquete) : null,
      precioLibra: raw.precio_libra ? Number(raw.precio_libra) : null,
      precioMayorista: raw.precio_mayorista ? Number(raw.precio_mayorista) : null,
      stockMinimo: Number(raw.stock_minimo),
      ivaTarifa: Number(raw.iva_tarifa),
      activo: raw.activo,
    }));
  }

  public async actualizar(id: number, datos: Partial<Producto>): Promise<Producto> {
    const raw = await prisma.producto.update({
      where: { id },
      data: {
        ...(datos.codigoBarras && { codigo_barras: datos.codigoBarras }),
        ...(datos.nombre && { nombre: datos.nombre }),
        ...(datos.descripcion !== undefined && { descripcion: datos.descripcion }),
        ...(datos.categoriaId && { categoria_id: datos.categoriaId }),
        ...(datos.proveedorId && { proveedor_id: datos.proveedorId }),
        ...(datos.tipoVenta && { tipo_venta: datos.tipoVenta as PrismaTipoVenta }),
        ...(datos.unidadesPorPaquete !== undefined && { unidades_por_paquete: datos.unidadesPorPaquete }),
        ...(datos.precioPaquete !== undefined && { precio_paquete: datos.precioPaquete }),
        ...(datos.precioLibra !== undefined && { precio_libra: datos.precioLibra }),
        ...(datos.precioMayorista !== undefined && { precio_mayorista: datos.precioMayorista }),
        ...(datos.stockMinimo !== undefined && { stock_minimo: datos.stockMinimo }),
        ...(datos.ivaTarifa !== undefined && { iva_tarifa: datos.ivaTarifa }),
        ...(datos.activo !== undefined && { activo: datos.activo }),
      },
    });

    return Producto.crear({
      id: raw.id,
      codigoBarras: raw.codigo_barras,
      nombre: raw.nombre,
      descripcion: raw.descripcion,
      categoriaId: raw.categoria_id,
      proveedorId: raw.proveedor_id,
      tipoVenta: raw.tipo_venta as TipoVentaProducto,
      unidadesPorPaquete: raw.unidades_por_paquete,
      precioPaquete: raw.precio_paquete ? Number(raw.precio_paquete) : null,
      precioLibra: raw.precio_libra ? Number(raw.precio_libra) : null,
      precioMayorista: raw.precio_mayorista ? Number(raw.precio_mayorista) : null,
      stockMinimo: Number(raw.stock_minimo),
      ivaTarifa: Number(raw.iva_tarifa),
      activo: raw.activo,
    });
  }

  public async cambiarEstado(id: number, activo: boolean): Promise<void> {
    await prisma.producto.update({
      where: { id },
      data: { activo },
    });
  }
}
