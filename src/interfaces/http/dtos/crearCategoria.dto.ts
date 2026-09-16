import { z } from 'zod';

export const crearCategoriaSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre de la categoría es requerido.' })
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),
  descripcion: z
    .string()
    .max(255, 'La descripción no puede superar los 255 caracteres.')
    .optional()
    .nullable(),
});

export type CrearCategoriaDTO = z.infer<typeof crearCategoriaSchema>;
