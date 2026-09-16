import { RepositorioStockPort } from '../../ports/RepositorioStockPort';
import { RepositorioMovimientoPort } from '../../ports/RepositorioMovimientoPort';
import { Stock } from '../../../domain/entities/Stock';
import { MovimientoInventario } from '../../../domain/entities/MovimientoInventario';
import { AppError } from '../../../interfaces/http/middlewares/errorHandler';

export interface RegistrarAjusteInput {
  productoId: number;
  bodegaId: number;
  cantidad: number;
  motivo: string;
  usuarioId: number;
}

export class RegistrarAjusteInventario {
  constructor(
    private readonly stockRepo: RepositorioStockPort,
    private readonly movimientoRepo: RepositorioMovimientoPort
  ) {}

  public async ejecutar(input: RegistrarAjusteInput): Promise<{ stockActualizado: Stock; movimiento: MovimientoInventario }> {
    if (!input.motivo || input.motivo.trim().length === 0) {
      throw new AppError('El motivo del ajuste de inventario es obligatorio.', 400, 'MOTIVO_REQUERIDO');
    }

    if (input.cantidad === 0) {
      throw new AppError('La cantidad del ajuste no puede ser cero.', 400, 'CANTIDAD_INVALIDA');
    }

    const stockActual = await this.stockRepo.buscarPorProductoYBodega(input.productoId, input.bodegaId);
    const cantidadPrevia = stockActual ? stockActual.cantidadDisponible : 0;
    const nuevaCantidad = cantidadPrevia + input.cantidad;

    if (nuevaCantidad < 0) {
      throw new AppError(
        `No se puede realizar el ajuste. El stock actual es ${cantidadPrevia} y el ajuste de ${input.cantidad} resultaría en un stock negativo (${nuevaCantidad}).`,
        400,
        'STOCK_INSUFICIENTE'
      );
    }

    const stockActualizado = Stock.crear({
      id: stockActual?.id,
      productoId: input.productoId,
      bodegaId: input.bodegaId,
      cantidadDisponible: nuevaCantidad,
    });

    const nuevoStock = await this.stockRepo.guardarOActualizar(stockActualizado);

    const movimiento = MovimientoInventario.crear({
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
