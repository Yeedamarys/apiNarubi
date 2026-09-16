import { z } from 'zod';

export const editarProductoSchema = z.object({
  codigoBarras: z.string().min(1).max(100).optional(),
  nombre: z.string().min(2).max(150).optional(),
  descripcion: z.string().max(255).optional().nullable(),
  categoriaId: z.number().int().positive().optional(),
  proveedorId: z.number().int().positive().optional(),
  tipoVenta: z.enum(['PAQUETE', 'PESO']).optional(),
  unidadesPorPaquete: z.number().int().positive().optional().nullable(),
  precioPaquete: z.number().nonnegative().optional().nullable(),
  precioLibra: z.number().nonnegative().optional().nullable(),
  precioMayorista: z.number().nonnegative().optional().nullable(),
  stockMinimo: z.number().nonnegative().optional(),
  ivaTarifa: z.number().nonnegative().optional(),
  activo: z.boolean().optional(),
});

export type EditarProductoDTO = z.infer<typeof editarProductoSchema>;
