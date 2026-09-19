"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarUsuarioSchema = void 0;
const zod_1 = require("zod");
exports.editarUsuarioSchema = zod_1.z.object({
    nombreCompleto: zod_1.z
        .string()
        .min(3, 'El nombre completo debe tener al menos 3 caracteres.')
        .optional(),
    correoElectronico: zod_1.z.string().email('Formato de correo electrónico inválido.').optional(),
    contrasena: zod_1.z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.').optional(),
    rol: zod_1.z
        .enum(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'], {
        invalid_type_error: 'El rol debe ser ADMINISTRADOR, PUNTO_VENTA o BODEGA.',
    })
        .optional(),
    activo: zod_1.z.boolean().optional(),
});
