"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarVentaSchema = void 0;
const zod_1 = require("zod");
const detalleVentaItemSchema = zod_1.z.object({
    productoId: zod_1.z.number({ required_error: 'El ID del producto es requerido.' }).int().positive(),
    cantidadPaquetes: zod_1.z.number().int().positive().optional().nullable(),
    pesoLibras: zod_1.z.number().positive().optional().nullable(),
    precioAplicado: zod_1.z.number({ required_error: 'El precio aplicado es requerido.' }).positive(),
});
exports.registrarVentaSchema = zod_1.z.object({
    clienteId: zod_1.z.number().int().positive().optional().nullable(),
    bodegaId: zod_1.z.number({ required_error: 'El ID de la bodega es requerida.' }).int().positive(),
    modalidadVenta: zod_1.z.enum(['AL_POR_MENOR', 'AL_POR_MAYOR'], {
        required_error: 'La modalidad de venta es requerida (AL_POR_MENOR o AL_POR_MAYOR).',
    }),
    detalles: zod_1.z
        .array(detalleVentaItemSchema, { required_error: 'Los detalles de la venta son requeridos.' })
        .min(1, 'Debe incluir al menos un producto en la venta.'),
});
