"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    id;
    codigoBarras;
    nombre;
    descripcion;
    categoriaId;
    proveedorId;
    tipoVenta;
    unidadesPorPaquete;
    precioPaquete;
    precioLibra;
    precioMayorista;
    stockMinimo;
    ivaTarifa;
    activo;
    constructor(props) {
        this.id = props.id;
        this.codigoBarras = props.codigoBarras;
        this.nombre = props.nombre;
        this.descripcion = props.descripcion ?? null;
        this.categoriaId = props.categoriaId;
        this.proveedorId = props.proveedorId;
        this.tipoVenta = props.tipoVenta;
        this.unidadesPorPaquete = props.unidadesPorPaquete ?? null;
        this.precioPaquete = props.precioPaquete ?? null;
        this.precioLibra = props.precioLibra ?? null;
        this.precioMayorista = props.precioMayorista ?? null;
        this.stockMinimo = props.stockMinimo ?? 0;
        this.ivaTarifa = props.ivaTarifa ?? 15.0;
        this.activo = props.activo ?? true;
    }
    static crear(props) {
        if (!props.codigoBarras || props.codigoBarras.trim().length === 0) {
            throw new Error('El código de barras del producto es obligatorio.');
        }
        if (!props.nombre || props.nombre.trim().length === 0) {
            throw new Error('El nombre del producto es obligatorio.');
        }
        if (!props.categoriaId || props.categoriaId <= 0) {
            throw new Error('El ID de la categoría es obligatorio.');
        }
        if (!props.proveedorId || props.proveedorId <= 0) {
            throw new Error('El ID del proveedor es obligatorio.');
        }
        if (props.tipoVenta === 'PAQUETE') {
            if (!props.unidadesPorPaquete || props.unidadesPorPaquete <= 0) {
                throw new Error('Para productos por PAQUETE, las unidades por paquete son obligatorias y deben ser mayores a 0.');
            }
            if (props.precioPaquete === undefined ||
                props.precioPaquete === null ||
                props.precioPaquete < 0) {
                throw new Error('Para productos por PAQUETE, el precio por paquete es obligatorio y no puede ser negativo.');
            }
        }
        else if (props.tipoVenta === 'PESO') {
            if (props.precioLibra === undefined || props.precioLibra === null || props.precioLibra < 0) {
                throw new Error('Para productos por PESO, el precio por libra es obligatorio y no puede ser negativo.');
            }
        }
        else {
            throw new Error(`El tipo de venta '${props.tipoVenta}' no es válido. Debe ser PAQUETE o PESO.`);
        }
        return new Producto({
            ...props,
            codigoBarras: props.codigoBarras.trim(),
            nombre: props.nombre.trim(),
            descripcion: props.descripcion ? props.descripcion.trim() : null,
        });
    }
}
exports.Producto = Producto;
