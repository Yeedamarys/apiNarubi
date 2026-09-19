"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    correoElectronico: zod_1.z
        .string({ required_error: 'El correo electrónico es requerido.' })
        .email('Formato de correo electrónico inválido.'),
    contrasena: zod_1.z
        .string({ required_error: 'La contraseña es requerida.' })
        .min(1, 'La contraseña no puede estar vacía.'),
});
