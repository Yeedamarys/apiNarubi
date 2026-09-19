"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const RolUsuario_1 = require("../value-objects/RolUsuario");
class Usuario {
    id;
    nombreCompleto;
    correoElectronico;
    passwordHash;
    rol;
    activo;
    fechaCreacion;
    constructor(props) {
        this.id = props.id;
        this.nombreCompleto = props.nombreCompleto;
        this.correoElectronico = props.correoElectronico;
        this.passwordHash = props.passwordHash;
        this.rol = props.rol;
        this.activo = props.activo ?? true;
        this.fechaCreacion = props.fechaCreacion ?? new Date();
    }
    static crear(props) {
        if (!props.nombreCompleto || props.nombreCompleto.trim().length === 0) {
            throw new Error('El nombre completo del usuario es obligatorio.');
        }
        if (!props.correoElectronico || !props.correoElectronico.includes('@')) {
            throw new Error('El correo electrónico proporcionado es inválido.');
        }
        if (!props.passwordHash || props.passwordHash.trim().length === 0) {
            throw new Error('El hash de contraseña es obligatorio.');
        }
        if (!(0, RolUsuario_1.esRolValido)(props.rol)) {
            throw new Error(`El rol '${props.rol}' no es válido en el sistema.`);
        }
        return new Usuario({
            ...props,
            nombreCompleto: props.nombreCompleto.trim(),
            correoElectronico: props.correoElectronico.trim().toLowerCase(),
        });
    }
}
exports.Usuario = Usuario;
