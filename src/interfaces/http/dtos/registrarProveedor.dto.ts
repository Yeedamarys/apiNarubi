import { z } from 'zod';

export const registrarProveedorSchema = z.object({
  razonSocial: z
    .string({ required_error: 'La razón social es requerida.' })
    .min(2, 'La razón social debe tener al menos 2 caracteres.')
    .max(150, 'La razón social no puede superar los 150 caracteres.'),
  ruc: z
    .string({ required_error: 'El RUC es requerido.' })
    .length(13, 'El RUC debe tener exactamente 13 dígitos.'),
  telefono: z.string().max(30).optional().nullable(),
  email: z.string().email('El correo electrónico no es válido.').optional().nullable(),
  direccion: z.string().max(255).optional().nullable(),
});

export type RegistrarProveedorDTO = z.infer<typeof registrarProveedorSchema>;
