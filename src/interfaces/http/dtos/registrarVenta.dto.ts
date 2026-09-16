import { z } from 'zod';

const detalleVentaItemSchema = z.object({
  productoId: z.number({ required_error: 'El ID del producto es requerido.' }).int().positive(),
  cantidadPaquetes: z.number().int().positive().optional().nullable(),
  pesoLibras: z.number().positive().optional().nullable(),
  precioAplicado: z.number({ required_error: 'El precio aplicado es requerido.' }).positive(),
});

export const registrarVentaSchema = z.object({
  clienteId: z.number().int().positive().optional().nullable(),
  bodegaId: z.number({ required_error: 'El ID de la bodega es requerida.' }).int().positive(),
  modalidadVenta: z.enum(['AL_POR_MENOR', 'AL_POR_MAYOR'], {
    required_error: 'La modalidad de venta es requerida (AL_POR_MENOR o AL_POR_MAYOR).',
  }),
  detalles: z
    .array(detalleVentaItemSchema, { required_error: 'Los detalles de la venta son requeridos.' })
    .min(1, 'Debe incluir al menos un producto en la venta.'),
});

export type RegistrarVentaDTO = z.infer<typeof registrarVentaSchema>;
