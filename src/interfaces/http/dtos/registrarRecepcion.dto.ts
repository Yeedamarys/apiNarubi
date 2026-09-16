import { z } from 'zod';

const detalleItemSchema = z.object({
  productoId: z.number({ required_error: 'El ID del producto es requerido.' }).int().positive(),
  cantidadPaquetes: z.number().int().positive().optional().nullable(),
  pesoLibras: z.number().positive().optional().nullable(),
  costoUnitario: z.number().nonnegative().optional().nullable(),
});

export const registrarRecepcionSchema = z.object({
  proveedorId: z.number({ required_error: 'El ID del proveedor es requerido.' }).int().positive(),
  bodegaId: z.number({ required_error: 'El ID de la bodega es requerida.' }).int().positive(),
  numeroDocumento: z.string().max(100).optional().nullable(),
  detalles: z
    .array(detalleItemSchema, { required_error: 'Los detalles de la recepción son requeridos.' })
    .min(1, 'Debe incluir al menos un producto en la recepción.'),
});

export type RegistrarRecepcionDTO = z.infer<typeof registrarRecepcionSchema>;
