"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientoInventario = void 0;
class MovimientoInventario {
    id;
    productoId;
    bodegaId;
    tipoMovimiento;
    cantidad;
    referenciaId;
    referenciaTipo;
    motivo;
    fecha;
    usuarioId;
    constructor(props) {
        this.id = props.id;
        this.productoId = props.productoId;
        this.bodegaId = props.bodegaId;
        this.tipoMovimiento = props.tipoMovimiento;
        this.cantidad = props.cantidad;
        this.referenciaId = props.referenciaId ?? null;
        this.referenciaTipo = props.referenciaTipo;
        this.motivo = props.motivo ?? null;
        this.fecha = props.fecha ?? new Date();
        this.usuarioId = props.usuarioId;
    }
    static crear(props) {
        if (!props.productoId || props.productoId <= 0) {
            throw new Error('El ID del producto es obligatorio.');
        }
        if (!props.bodegaId || props.bodegaId <= 0) {
            throw new Error('El ID de la bodega es obligatorio.');
        }
        if (!props.usuarioId || props.usuarioId <= 0) {
            throw new Error('El ID del usuario responsable es obligatorio.');
        }
        if (props.cantidad === 0) {
            throw new Error('La cantidad del movimiento no puede ser cero.');
        }
        return new MovimientoInventario({
            ...props,
            cantidad: Number(props.cantidad.toFixed(3)),
        });
    }
}
exports.MovimientoInventario = MovimientoInventario;
