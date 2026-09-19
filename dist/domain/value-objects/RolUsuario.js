"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES_PERMITIDOS = void 0;
exports.esRolValido = esRolValido;
exports.ROLES_PERMITIDOS = ['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'];
function esRolValido(rol) {
    return exports.ROLES_PERMITIDOS.includes(rol);
}
