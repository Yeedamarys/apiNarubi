"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioSchema = void 0;
const zod_1 = require("zod");
exports.crearUsuarioSchema = zod_1.z.object({
    nombreCompleto: zod_1.z
        .string({ required_error: 'El nombre completo es requerido.' })
        .min(3, 'El nombre completo debe tener al menos 3 caracteres.'),
    correoElectronico: zod_1.z
        .string({ required_error: 'El correo electrónico es requerido.' })
        .email('Formato de correo electrónico inválido.'),
    contrasena: zod_1.z
        .string({ required_error: 'La contraseña es requerida.' })
        .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    rol: zod_1.z.enum(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'], {
        required_error: 'El rol es requerido.',
        invalid_type_error: 'El rol debe ser ADMINISTRADOR, PUNTO_VENTA o BODEGA.',
    }),
});
