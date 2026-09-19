"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarProveedorSchema = void 0;
const zod_1 = require("zod");
exports.registrarProveedorSchema = zod_1.z.object({
    razonSocial: zod_1.z
        .string({ required_error: 'La razón social es requerida.' })
        .min(2, 'La razón social debe tener al menos 2 caracteres.')
        .max(150, 'La razón social no puede superar los 150 caracteres.'),
    ruc: zod_1.z
        .string({ required_error: 'El RUC es requerido.' })
        .length(13, 'El RUC debe tener exactamente 13 dígitos.'),
    telefono: zod_1.z.string().max(30).optional().nullable(),
    email: zod_1.z.string().email('El correo electrónico no es válido.').optional().nullable(),
    direccion: zod_1.z.string().max(255).optional().nullable(),
});
