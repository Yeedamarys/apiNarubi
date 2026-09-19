"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarAjusteSchema = void 0;
const zod_1 = require("zod");
exports.registrarAjusteSchema = zod_1.z.object({
    productoId: zod_1.z
        .number({ required_error: 'El ID del producto es requerido.' })
        .int()
        .positive('El ID del producto debe ser un entero positivo.'),
    bodegaId: zod_1.z
        .number({ required_error: 'El ID de la bodega es requerido.' })
        .int()
        .positive('El ID de la bodega debe ser un entero positivo.'),
    cantidad: zod_1.z
        .number({ required_error: 'La cantidad de ajuste es requerida.' })
        .refine((val) => val !== 0, 'La cantidad de ajuste no puede ser cero.'),
    motivo: zod_1.z
        .string({ required_error: 'El motivo del ajuste es requerido.' })
        .min(5, 'El motivo debe tener al menos 5 caracteres descriptivos.')
        .max(255, 'El motivo no puede exceder los 255 caracteres.'),
});
