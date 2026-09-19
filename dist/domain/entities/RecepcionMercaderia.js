"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecepcionMercaderia = void 0;
class RecepcionMercaderia {
    id;
    proveedorId;
    usuarioId;
    bodegaId;
    fecha;
    numeroDocumento;
    detalles;
    constructor(props) {
        this.id = props.id;
        this.proveedorId = props.proveedorId;
        this.usuarioId = props.usuarioId;
        this.bodegaId = props.bodegaId;
        this.fecha = props.fecha ?? new Date();
        this.numeroDocumento = props.numeroDocumento ?? null;
        this.detalles = props.detalles;
    }
    static crear(props) {
        if (!props.proveedorId || props.proveedorId <= 0) {
            throw new Error('El ID del proveedor es obligatorio.');
        }
        if (!props.bodegaId || props.bodegaId <= 0) {
            throw new Error('El ID de la bodega es obligatorio.');
        }
        if (!props.detalles || props.detalles.length === 0) {
            throw new Error('La recepción debe contener al menos un detalle de producto.');
        }
        for (const d of props.detalles) {
            if (!d.productoId || d.productoId <= 0) {
                throw new Error('Cada detalle de recepción debe tener un ID de producto válido.');
            }
            const tieneCantidad = (d.cantidadPaquetes && d.cantidadPaquetes > 0) || (d.pesoLibras && d.pesoLibras > 0);
            if (!tieneCantidad) {
                throw new Error('Cada detalle debe especificar cantidad en paquetes (>0) o peso en libras (>0).');
            }
        }
        return new RecepcionMercaderia(props);
    }
}
exports.RecepcionMercaderia = RecepcionMercaderia;
