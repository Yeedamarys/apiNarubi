import { z } from 'zod';

export const registrarAjusteSchema = z.object({
  productoId: z
    .number({ required_error: 'El ID del producto es requerido.' })
    .int()
    .positive('El ID del producto debe ser un entero positivo.'),
  bodegaId: z
    .number({ required_error: 'El ID de la bodega es requerido.' })
    .int()
    .positive('El ID de la bodega debe ser un entero positivo.'),
  cantidad: z
    .number({ required_error: 'La cantidad de ajuste es requerida.' })
    .refine((val) => val !== 0, 'La cantidad de ajuste no puede ser cero.'),
  motivo: z
    .string({ required_error: 'El motivo del ajuste es requerido.' })
    .min(5, 'El motivo debe tener al menos 5 caracteres descriptivos.')
    .max(255, 'El motivo no puede exceder los 255 caracteres.'),
});

export type RegistrarAjusteDTO = z.infer<typeof registrarAjusteSchema>;
