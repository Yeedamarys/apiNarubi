import { z } from 'zod';

export const editarCategoriaSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100, 'El nombre no puede superar los 100 caracteres.')
    .optional(),
  descripcion: z
    .string()
    .max(255, 'La descripción no puede superar los 255 caracteres.')
    .optional()
    .nullable(),
});

export type EditarCategoriaDTO = z.infer<typeof editarCategoriaSchema>;
