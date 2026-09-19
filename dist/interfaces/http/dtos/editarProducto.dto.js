"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarProductoSchema = void 0;
const zod_1 = require("zod");
exports.editarProductoSchema = zod_1.z.object({
    codigoBarras: zod_1.z.string().min(1).max(100).optional(),
    nombre: zod_1.z.string().min(2).max(150).optional(),
    descripcion: zod_1.z.string().max(255).optional().nullable(),
    categoriaId: zod_1.z.number().int().positive().optional(),
    proveedorId: zod_1.z.number().int().positive().optional(),
    tipoVenta: zod_1.z.enum(['PAQUETE', 'PESO']).optional(),
    unidadesPorPaquete: zod_1.z.number().int().positive().optional().nullable(),
    precioPaquete: zod_1.z.number().nonnegative().optional().nullable(),
    precioLibra: zod_1.z.number().nonnegative().optional().nullable(),
    precioMayorista: zod_1.z.number().nonnegative().optional().nullable(),
    stockMinimo: zod_1.z.number().nonnegative().optional(),
    ivaTarifa: zod_1.z.number().nonnegative().optional(),
    activo: zod_1.z.boolean().optional(),
});
