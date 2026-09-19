"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
class Stock {
    id;
    productoId;
    bodegaId;
    cantidadDisponible;
    actualizadoEn;
    constructor(props) {
        this.id = props.id;
        this.productoId = props.productoId;
        this.bodegaId = props.bodegaId;
        this.cantidadDisponible = props.cantidadDisponible;
        this.actualizadoEn = props.actualizadoEn ?? new Date();
    }
    static crear(props) {
        if (!props.productoId || props.productoId <= 0) {
            throw new Error('El ID del producto es obligatorio.');
        }
        if (!props.bodegaId || props.bodegaId <= 0) {
            throw new Error('El ID de la bodega es obligatorio.');
        }
        if (props.cantidadDisponible < 0) {
            throw new Error('La cantidad disponible de stock no puede ser negativa.');
        }
        return new Stock({
            ...props,
            cantidadDisponible: Number(props.cantidadDisponible.toFixed(3)),
        });
    }
}
exports.Stock = Stock;
