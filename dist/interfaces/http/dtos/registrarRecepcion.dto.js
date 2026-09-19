"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarRecepcionSchema = void 0;
const zod_1 = require("zod");
const detalleItemSchema = zod_1.z.object({
    productoId: zod_1.z.number({ required_error: 'El ID del producto es requerido.' }).int().positive(),
    cantidadPaquetes: zod_1.z.number().int().positive().optional().nullable(),
    pesoLibras: zod_1.z.number().positive().optional().nullable(),
    costoUnitario: zod_1.z.number().nonnegative().optional().nullable(),
});
exports.registrarRecepcionSchema = zod_1.z.object({
    proveedorId: zod_1.z.number({ required_error: 'El ID del proveedor es requerido.' }).int().positive(),
    bodegaId: zod_1.z.number({ required_error: 'El ID de la bodega es requerida.' }).int().positive(),
    numeroDocumento: zod_1.z.string().max(100).optional().nullable(),
    detalles: zod_1.z
        .array(detalleItemSchema, { required_error: 'Los detalles de la recepción son requeridos.' })
        .min(1, 'Debe incluir al menos un producto en la recepción.'),
});
