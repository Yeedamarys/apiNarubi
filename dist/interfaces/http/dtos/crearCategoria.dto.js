"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearCategoriaSchema = void 0;
const zod_1 = require("zod");
exports.crearCategoriaSchema = zod_1.z.object({
    nombre: zod_1.z
        .string({ required_error: 'El nombre de la categoría es requerido.' })
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(100, 'El nombre no puede superar los 100 caracteres.'),
    descripcion: zod_1.z
        .string()
        .max(255, 'La descripción no puede superar los 255 caracteres.')
        .optional()
        .nullable(),
});
