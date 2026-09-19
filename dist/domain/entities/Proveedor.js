"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
class Proveedor {
    id;
    razonSocial;
    ruc;
    telefono;
    email;
    direccion;
    constructor(props) {
        this.id = props.id;
        this.razonSocial = props.razonSocial;
        this.ruc = props.ruc;
        this.telefono = props.telefono ?? null;
        this.email = props.email ?? null;
        this.direccion = props.direccion ?? null;
    }
    static crear(props) {
        if (!props.razonSocial || props.razonSocial.trim().length === 0) {
            throw new Error('La razón social del proveedor es obligatoria.');
        }
        if (!props.ruc || props.ruc.trim().length !== 13) {
            throw new Error('El RUC del proveedor debe tener exactamente 13 dígitos.');
        }
        return new Proveedor({
            ...props,
            razonSocial: props.razonSocial.trim(),
            ruc: props.ruc.trim(),
            telefono: props.telefono ? props.telefono.trim() : null,
            email: props.email ? props.email.trim().toLowerCase() : null,
            direccion: props.direccion ? props.direccion.trim() : null,
        });
    }
}
exports.Proveedor = Proveedor;
