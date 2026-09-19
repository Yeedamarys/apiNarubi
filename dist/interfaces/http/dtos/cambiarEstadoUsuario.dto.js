"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarEstadoUsuarioSchema = void 0;
const zod_1 = require("zod");
exports.cambiarEstadoUsuarioSchema = zod_1.z.object({
    activo: zod_1.z.boolean({
        required_error: 'El estado activo es requerido (true o false).',
        invalid_type_error: 'El estado activo debe ser un valor booleano (true o false).',
    }),
});
