"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarCategoriaSchema = void 0;
const zod_1 = require("zod");
exports.editarCategoriaSchema = zod_1.z.object({
    nombre: zod_1.z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(100, 'El nombre no puede superar los 100 caracteres.')
        .optional(),
    descripcion: zod_1.z
        .string()
        .max(255, 'La descripción no puede superar los 255 caracteres.')
        .optional()
        .nullable(),
});
