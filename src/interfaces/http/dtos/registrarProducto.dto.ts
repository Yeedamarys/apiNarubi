import { z } from 'zod';

export const registrarProductoSchema = z
  .object({
    codigoBarras: z
      .string({ required_error: 'El código de barras es requerido.' })
      .min(1, 'El código de barras no puede estar vacío.')
      .max(100, 'El código de barras no puede exceder 100 caracteres.'),
    nombre: z
      .string({ required_error: 'El nombre del producto es requerido.' })
      .min(2, 'El nombre debe tener al menos 2 caracteres.')
      .max(150, 'El nombre no puede exceder 150 caracteres.'),
    descripcion: z.string().max(255).optional().nullable(),
    categoriaId: z
      .number({ required_error: 'El ID de la categoría es requerido.' })
      .int('El ID de la categoría debe ser un entero.')
      .positive('El ID de la categoría debe ser un número positivo.'),
    proveedorId: z
      .number({ required_error: 'El ID del proveedor es requerido.' })
      .int('El ID del proveedor debe ser un entero.')
      .positive('El ID del proveedor debe ser un número positivo.'),
    tipoVenta: z.enum(['PAQUETE', 'PESO'], {
      required_error: 'El tipo de venta es requerido (PAQUETE o PESO).',
    }),
    unidadesPorPaquete: z.number().int().positive().optional().nullable(),
    precioPaquete: z.number().nonnegative().optional().nullable(),
    precioLibra: z.number().nonnegative().optional().nullable(),
    precioMayorista: z.number().nonnegative().optional().nullable(),
    stockMinimo: z.number().nonnegative().default(0),
    ivaTarifa: z.number().nonnegative().default(15.0),
    bodegaIdInicial: z.number().int().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipoVenta === 'PAQUETE') {
      if (
        data.unidadesPorPaquete === undefined ||
        data.unidadesPorPaquete === null ||
        data.unidadesPorPaquete <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Para productos por PAQUETE, unidadesPorPaquete es obligatorio y debe ser mayor a 0.',
          path: ['unidadesPorPaquete'],
        });
      }
      if (
        data.precioPaquete === undefined ||
        data.precioPaquete === null ||
        data.precioPaquete < 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Para productos por PAQUETE, precioPaquete es obligatorio y no puede ser negativo.',
          path: ['precioPaquete'],
        });
      }
    } else if (data.tipoVenta === 'PESO') {
      if (data.precioLibra === undefined || data.precioLibra === null || data.precioLibra < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Para productos por PESO, precioLibra es obligatorio y no puede ser negativo.',
          path: ['precioLibra'],
        });
      }
    }
  });

export type RegistrarProductoDTO = z.infer<typeof registrarProductoSchema>;
