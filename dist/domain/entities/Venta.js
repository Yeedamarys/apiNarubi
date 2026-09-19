"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
class Venta {
    id;
    numeroSecuencial;
    clienteId;
    usuarioId;
    bodegaId;
    fecha;
    modalidadVenta;
    subtotal;
    iva;
    total;
    estado;
    detalles;
    claveAccesoSri;
    constructor(props) {
        this.id = props.id;
        this.numeroSecuencial = props.numeroSecuencial;
        this.clienteId = props.clienteId ?? null;
        this.usuarioId = props.usuarioId;
        this.bodegaId = props.bodegaId;
        this.fecha = props.fecha ?? new Date();
        this.modalidadVenta = props.modalidadVenta;
        this.subtotal = props.subtotal;
        this.iva = props.iva;
        this.total = props.total;
        this.estado = props.estado ?? 'REGISTRADA';
        this.detalles = props.detalles;
        this.claveAccesoSri = props.claveAccesoSri;
    }
    static crear(props) {
        if (!props.bodegaId || props.bodegaId <= 0) {
            throw new Error('El ID de la bodega es obligatorio.');
        }
        if (!props.usuarioId || props.usuarioId <= 0) {
            throw new Error('El ID del usuario es obligatorio.');
        }
        if (!props.detalles || props.detalles.length === 0) {
            throw new Error('La venta debe contener al menos un detalle de producto.');
        }
        return new Venta(props);
    }
    /**
     * Genera la Clave de Acceso SRI de 49 dígitos según especificación del SRI (Ecuador)
     * Formato: fecha(8) + tipoComprobante(2: 01) + ruc(13) + ambiente(1: 1) + serie(6) + secuencial(9) + codigoNumerico(8) + tipoEmision(1: 1)
     */
    static generarClaveAccesoSRI(secuencialId, fecha = new Date()) {
        const d = fecha.toISOString().slice(0, 10).replace(/-/g, ''); // AAAAMMDD (8)
        const fecha8 = d.length === 8 ? d : '20260901';
        const tipoComprobante = '01'; // Factura (2)
        const rucEmisor = '1790000000001'; // RUC Emisor Narubi (13)
        const ambiente = '1'; // Pruebas (1)
        const serie = '001001'; // Establecimiento 001 - Punto Emision 001 (6)
        const secuencial9 = String(secuencialId).padStart(9, '0').slice(-9); // (9)
        const codigoNumerico8 = String(Math.floor(10000000 + Math.random() * 90000000)); // (8)
        const tipoEmision = '1'; // Normal (1)
        const base48 = `${fecha8}${tipoComprobante}${rucEmisor}${ambiente}${serie}${secuencial9}${codigoNumerico8}${tipoEmision}`;
        // Dígito verificador Módulo 11 (SRI)
        let suma = 0;
        let factor = 2;
        for (let i = base48.length - 1; i >= 0; i--) {
            suma += parseInt(base48.charAt(i), 10) * factor;
            factor = factor === 7 ? 2 : factor + 1;
        }
        const resto = suma % 11;
        let digitoVerificador = 11 - resto;
        if (digitoVerificador === 11)
            digitoVerificador = 0;
        if (digitoVerificador === 10)
            digitoVerificador = 1;
        return `${base48}${digitoVerificador}`;
    }
}
exports.Venta = Venta;
